// Global state
let currentUser = null;
let allMembers = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
    loadAllMembers();
});

// Login functionality
function initLogin() {
    const loginForm = document.getElementById('loginForm');
    loginForm.addEventListener('submit', handleLogin);
}

async function handleLogin(e) {
    e.preventDefault();
    
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const errorDiv = document.getElementById('loginError');
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        
        const data = await response.json();
        
        if (data.success) {
            currentUser = data.user;
            document.getElementById('loginScreen').style.display = 'none';
            document.getElementById('mainApp').style.display = 'block';
            document.getElementById('currentUser').textContent = `Usuario: ${currentUser.username}`;
            
            // Show admin panel if admin
            if (currentUser.role === 'admin') {
                document.getElementById('adminPanel').style.display = 'block';
                initAdminPanel();
            }
            
            errorDiv.classList.remove('show');
        } else {
            errorDiv.textContent = 'Credenciales incorrectas';
            errorDiv.classList.add('show');
        }
    } catch (error) {
        errorDiv.textContent = 'Error de conexión con el servidor';
        errorDiv.classList.add('show');
    }
}

// Logout
document.getElementById('logoutBtn').addEventListener('click', () => {
    currentUser = null;
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginForm').reset();
});

// Load all members
async function loadAllMembers() {
    try {
        const response = await fetch('/api/members');
        allMembers = await response.json();
        document.getElementById('totalMembers').textContent = allMembers.length;
        displayMembers(allMembers);
    } catch (error) {
        console.error('Error loading members:', error);
    }
}

// Search functionality
document.getElementById('searchBtn').addEventListener('click', performSearch);
document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    displayMembers(allMembers);
    document.getElementById('resultsCount').textContent = `Total: ${allMembers.length} socios`;
});

document.getElementById('searchInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        performSearch();
    }
});

async function performSearch() {
    const query = document.getElementById('searchInput').value;
    const searchType = document.getElementById('searchType').value;
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query, searchType })
        });
        
        const results = await response.json();
        document.getElementById('resultsCount').textContent = `Encontrados: ${results.length} socios`;
        displayMembers(results);
    } catch (error) {
        console.error('Error searching:', error);
    }
}

// Display members in table
function displayMembers(members) {
    const tbody = document.getElementById('membersTableBody');
    tbody.innerHTML = '';
    
    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px;">No se encontraron resultados</td></tr>';
        return;
    }
    
    members.forEach(member => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${member.numeroSocio || '-'}</td>
            <td>${member.nombres || '-'}</td>
            <td>${member.elemento || '-'}</td>
            <td>${member.ubicacion || '-'}</td>
            <td>${member.observacion || '-'}</td>
        `;
        tbody.appendChild(row);
    });
}

// Chatbot functionality
document.getElementById('chatbotToggle').addEventListener('click', () => {
    const panel = document.getElementById('chatbotPanel');
    const icon = document.querySelector('.toggle-icon');
    
    if (panel.style.display === 'none') {
        panel.style.display = 'block';
        icon.classList.add('rotated');
    } else {
        panel.style.display = 'none';
        icon.classList.remove('rotated');
    }
});

document.getElementById('sendChatBtn').addEventListener('click', handleChatMessage);
document.getElementById('chatInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
        handleChatMessage();
    }
});

async function handleChatMessage() {
    const input = document.getElementById('chatInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    addMessage('user', message);
    input.value = '';
    
    // Parse the message to find member and changes
    try {
        const result = await processChatMessage(message);
        addMessage('bot', result.response);
    } catch (error) {
        addMessage('bot', 'Lo siento, hubo un error procesando tu solicitud. Por favor intenta de nuevo.');
    }
}

function addMessage(sender, text) {
    const messagesDiv = document.getElementById('chatMessages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    messageDiv.textContent = text;
    messagesDiv.appendChild(messageDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

async function processChatMessage(message) {
    // Simple parsing for locker changes
    const changeKeywords = ['cambiar', 'modificar', 'actualizar', 'mover'];
    const hasChangeKeyword = changeKeywords.some(keyword => 
        message.toLowerCase().includes(keyword)
    );
    
    if (!hasChangeKeyword) {
        return { 
            response: 'Por favor indica el cambio a realizar. Por ejemplo: "Cambiar locker de [nombre del socio] del locker A-1 al locker B-16"' 
        };
    }
    
    // Extract member name or number
    const memberMatch = message.match(/(?:socio|nombre)\s+([^,(\d]+)/i) || 
                      message.match(/(?:n°|numero|número)\s+socio\s+(\d+)/i);
    
    if (!memberMatch) {
        return { response: 'No pude identificar el socio. Por favor indica el nombre o número de socio.' };
    }
    
    const memberIdentifier = memberMatch[1].trim();
    
    // Extract old and new locker locations
    const lockerPatterns = [
        /locker\s*([A-Z]\s*-\s*\d+)/gi,
        /pasillo\s*([A-Z]\d*\.?\d*\s*-\s*\d+)/gi,
        /casilla\s*([A-Z]\d*\.?\d*\s*-\s*\d+)/gi
    ];
    
    const locations = [];
    lockerPatterns.forEach(pattern => {
        const matches = message.matchAll(pattern);
        for (const match of matches) {
            locations.push(match[1].replace(/\s+/g, ''));
        }
    });
    
    if (locations.length < 2) {
        return { response: 'No pude identificar ambas ubicaciones (origen y destino). Por favor especifica ambas ubicaciones.' };
    }
    
    const oldLocation = 'Pasillo ' + locations[0];
    const newLocation = 'Pasillo ' + locations[1];
    
    // Make the update
    try {
        const response = await fetch('/api/update-member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberIdentifier,
                updateData: { ubicacion: newLocation }
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reload members
            loadAllMembers();
            return { 
                response: `✓ Cambio realizado exitosamente. ${data.member.nombres} ahora está en ${newLocation}.` 
            };
        } else {
            return { response: data.message || 'No se pudo realizar el cambio.' };
        }
    } catch (error) {
        return { response: 'Error al comunicar con el servidor.' };
    }
}

// Admin Panel
function initAdminPanel() {
    document.getElementById('showUsersBtn').addEventListener('click', loadUsers);
    document.getElementById('addUserBtn').addEventListener('click', addUser);
}

async function loadUsers() {
    const userManagement = document.getElementById('userManagement');
    
    if (userManagement.style.display === 'none') {
        userManagement.style.display = 'block';
        
        try {
            const response = await fetch('/api/users');
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error loading users:', error);
        }
    } else {
        userManagement.style.display = 'none';
    }
}

function displayUsers(users) {
    const usersList = document.getElementById('usersList');
    usersList.innerHTML = '';
    
    users.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.className = 'user-item';
        userDiv.innerHTML = `
            <div>
                <strong>${user.username}</strong> 
                <span style="margin-left: 10px; color: #666;">(${user.role})</span>
            </div>
            ${user.username !== 'ADMINPWCC' ? 
                `<button class="btn-delete-user" onclick="deleteUser('${user.username}')">Eliminar</button>` : 
                '<span style="color: #999;">No se puede eliminar</span>'
            }
        `;
        usersList.appendChild(userDiv);
    });
}

async function addUser() {
    const username = document.getElementById('newUsername').value.trim();
    const password = document.getElementById('newPassword').value.trim();
    const role = document.getElementById('newUserRole').value;
    
    if (!username || !password) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    try {
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, role })
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Usuario agregado exitosamente');
            document.getElementById('newUsername').value = '';
            document.getElementById('newPassword').value = '';
            loadUsers();
        } else {
            alert(data.message || 'Error al agregar usuario');
        }
    } catch (error) {
        alert('Error de conexión');
    }
}

async function deleteUser(username) {
    if (!confirm(`¿Estás seguro de eliminar el usuario ${username}?`)) {
        return;
    }
    
    try {
        const response = await fetch(`/api/users/${username}`, {
            method: 'DELETE'
        });
        
        const data = await response.json();
        
        if (data.success) {
            alert('Usuario eliminado exitosamente');
            loadUsers();
        } else {
            alert(data.message || 'Error al eliminar usuario');
        }
    } catch (error) {
        alert('Error de conexión');
    }
}

// Make deleteUser available globally
window.deleteUser = deleteUser;

