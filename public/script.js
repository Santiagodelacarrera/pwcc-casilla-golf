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
    const msg = message.toLowerCase();
    
    // Detect change keywords
    const changeKeywords = ['cambiar', 'modificar', 'actualizar', 'mover', 'editar', 'poner', 'asignar'];
    const hasChangeKeyword = changeKeywords.some(keyword => msg.includes(keyword));
    
    if (!hasChangeKeyword) {
        return { 
            response: 'Por favor indica el cambio a realizar. Ejemplos:\n' +
                      '• "Cambiar locker de [nombre] del A-1 al B-16"\n' +
                      '• "Cambiar elemento de [nombre] a CM"\n' +
                      '• "Cambiar número de socio de [nombre] a 1234"\n' +
                      '• "Cambiar observación de [nombre] a Nueva observación"'
        };
    }
    
    // Extract member identifier (name or number)
    let memberIdentifier = null;
    
    // Try to find by number first
    const numberMatch = message.match(/(?:n°|numero|número|socio)\s*[:\-]?\s*(\d+)/i);
    if (numberMatch) {
        memberIdentifier = numberMatch[1];
    }
    
    // Try to find by name
    if (!memberIdentifier) {
        const namePatterns = [
            /(?:socio|de|del)\s+([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)/i,
            /([A-ZÁÉÍÓÚÑ][a-záéíóúñ]+(?:\s+[A-ZÁÉÍÓÚÑ][a-záéíóúñ]+)+)(?:\s+(?:tiene|está|locker|elemento))/i
        ];
        
        for (const pattern of namePatterns) {
            const match = message.match(pattern);
            if (match) {
                memberIdentifier = match[1].trim();
                break;
            }
        }
    }
    
    if (!memberIdentifier) {
        return { response: 'No pude identificar el socio. Por favor indica el nombre completo o número de socio.' };
    }
    
    // Build update object based on detected changes
    const updateData = {};
    let changeDescription = '';
    
    // 1. Detect locker/ubicación changes
    const lockerPatterns = [
        /(?:locker|casilla|ubicación|ubicacion|pasillo)\s+([A-Z]\s*-\s*\d+)/gi,
        /(?:locker|casilla|ubicación|ubicacion|pasillo)\s+([A-Z]\d+)/gi,
        /([A-Z]\s*-\s*\d+)/gi
    ];
    
    const locations = [];
    for (const pattern of lockerPatterns) {
        const matches = message.matchAll(pattern);
        for (const match of matches) {
            const loc = match[1].replace(/\s+/g, '');
            if (loc && !locations.includes(loc)) {
                locations.push(loc);
            }
        }
    }
    
    if (locations.length >= 1) {
        // If only one location, assume it's the new one
        const newLocation = locations.length === 1 ? locations[0] : locations[locations.length - 1];
        updateData.ubicacion = 'Pasillo ' + newLocation;
        changeDescription = `ubicación a ${newLocation}`;
    }
    
    // 2. Detect elemento changes
    const elementoPatterns = [
        /(?:elemento|element)\s+[:\-]?\s*(?:a|es|sea)\s*(Bolso|CM|CMB|CEB)/i,
        /(?:cambiar|poner|asignar)\s+elemento\s+(?:a|como)\s*(Bolso|CM|CMB|CEB)/i,
        /elemento\s+(Bolso|CM|CMB|CEB)/i
    ];
    
    for (const pattern of elementoPatterns) {
        const match = message.match(pattern);
        if (match) {
            updateData.elemento = match[1];
            changeDescription = changeDescription ? changeDescription + `, elemento a ${match[1]}` : `elemento a ${match[1]}`;
            break;
        }
    }
    
    // 3. Detect número de socio changes
    const newSocioPattern = /(?:número|numero|n°)\s+de\s+socio\s+(?:a|es|sea|como)\s*(\d+)/i;
    const newSocioMatch = message.match(newSocioPattern);
    if (newSocioMatch) {
        updateData.numeroSocio = newSocioMatch[1];
        changeDescription = changeDescription ? changeDescription + `, número de socio a ${newSocioMatch[1]}` : `número de socio a ${newSocioMatch[1]}`;
    }
    
    // 4. Detect observación changes
    const obsPatterns = [
        /(?:observación|observacion|observaciones)\s+[:\-]?\s*(?:a|es|sea|como)\s*(.+?)(?:\s+\.|$)/i,
        /(?:cambiar|poner|asignar)\s+observaci[oó]n\s+(?:a|como)\s*(.+?)(?:\s+\.|$)/i
    ];
    
    for (const pattern of obsPatterns) {
        const match = message.match(pattern);
        if (match) {
            updateData.observacion = match[1].trim();
            changeDescription = changeDescription ? changeDescription + `, observación actualizada` : `observación actualizada`;
            break;
        }
    }
    
    // If no specific changes detected, try to infer from context
    if (Object.keys(updateData).length === 0) {
        // Maybe it's a locker change with "de X a Y" format
        const deAPattern = /de\s+([A-Z]\s*-\s*\d+)\s+a\s+([A-Z]\s*-\s*\d+)/i;
        const deAMatch = message.match(deAPattern);
        if (deAMatch) {
            updateData.ubicacion = 'Pasillo ' + deAMatch[2].replace(/\s+/g, '');
            changeDescription = `ubicación de ${deAMatch[1]} a ${deAMatch[2]}`;
        } else {
            return { 
                response: 'No pude identificar qué cambiar. Por favor especifica:\n' +
                          '• Ubicación/locker: "cambiar locker a A-1"\n' +
                          '• Elemento: "cambiar elemento a CM"\n' +
                          '• Número de socio: "cambiar número de socio a 1234"\n' +
                          '• Observación: "cambiar observación a Nueva nota"'
            };
        }
    }
    
    // Make the update
    try {
        const response = await fetch('/api/update-member', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                memberIdentifier,
                updateData
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            // Reload members
            loadAllMembers();
            return { 
                response: `✓ Cambio realizado exitosamente.\n` +
                         `Socio: ${data.member.nombres}\n` +
                         `Cambios: ${changeDescription || 'Actualizado'}\n` +
                         `${Object.keys(updateData).length > 0 ? '✓ Datos actualizados en la base de datos.' : ''}`
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
            const response = await fetch('/api/users', {
                headers: {
                    'X-Current-User': currentUser.username
                }
            });
            
            if (!response.ok) {
                const error = await response.json();
                alert(error.message || 'No tienes permisos para ver usuarios');
                return;
            }
            
            const users = await response.json();
            displayUsers(users);
        } catch (error) {
            console.error('Error loading users:', error);
            alert('Error al cargar usuarios');
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
                'Content-Type': 'application/json',
                'X-Current-User': currentUser.username
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
            method: 'DELETE',
            headers: {
                'X-Current-User': currentUser.username
            }
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

