// Global state
let currentUser = null;
let allMembers = [];
let searchTimeout = null;

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initLogin();
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
            
            // Load members after login
            await loadAllMembers();
            
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
    allMembers = [];
    document.getElementById('loginScreen').style.display = 'flex';
    document.getElementById('mainApp').style.display = 'none';
    document.getElementById('loginForm').reset();
    document.getElementById('searchInput').value = '';
    document.getElementById('membersTableBody').innerHTML = '';
});

// Load all members
async function loadAllMembers() {
    try {
        const response = await fetch('/api/members');
        allMembers = await response.json();
        document.getElementById('resultsCount').textContent = `Total: ${allMembers.length} socios disponibles`;
        displayMembers([]); // Inicialmente no muestra nada hasta que busquen
    } catch (error) {
        console.error('Error loading members:', error);
        document.getElementById('resultsCount').textContent = 'Error al cargar los datos';
    }
}

// Search functionality - búsqueda automática mientras escribes
const searchInput = document.getElementById('searchInput');
const clearBtn = document.getElementById('clearBtn');

searchInput.addEventListener('input', (e) => {
    const query = e.target.value.trim();
    
    // Mostrar/ocultar botón de limpiar
    if (query.length > 0) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
    
    // Búsqueda con debounce (espera 300ms después de que el usuario deje de escribir)
    clearTimeout(searchTimeout);
    
    if (query.length === 0) {
        document.getElementById('resultsCount').textContent = 'Escribe para buscar...';
        displayMembers([]);
        return;
    }
    
    if (query.length < 2) {
        document.getElementById('resultsCount').textContent = 'Escribe al menos 2 caracteres...';
        displayMembers([]);
        return;
    }
    
    searchTimeout = setTimeout(() => {
        performSearch(query);
    }, 300);
});

// Búsqueda al presionar Enter
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        clearTimeout(searchTimeout);
        const query = e.target.value.trim();
        if (query.length >= 2) {
            performSearch(query);
        }
    }
});

// Limpiar búsqueda
clearBtn.addEventListener('click', () => {
    searchInput.value = '';
    clearBtn.style.display = 'none';
    document.getElementById('resultsCount').textContent = `Total: ${allMembers.length} socios disponibles`;
    displayMembers([]);
});

async function performSearch(query) {
    if (!query || query.trim() === '') {
        return;
    }
    
    try {
        const response = await fetch('/api/search', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query: query.trim(), searchType: 'all' })
        });
        
        const results = await response.json();
        document.getElementById('resultsCount').textContent = `Encontrados: ${results.length} ${results.length === 1 ? 'socio' : 'socios'}`;
        displayMembers(results);
    } catch (error) {
        console.error('Error searching:', error);
        document.getElementById('resultsCount').textContent = 'Error al realizar la búsqueda';
    }
}

// Display members in table
function displayMembers(members) {
    const tbody = document.getElementById('membersTableBody');
    tbody.innerHTML = '';
    
    if (members.length === 0) {
        tbody.innerHTML = '<tr><td colspan="5" style="text-align: center; padding: 40px; color: #666;">No se encontraron resultados. Intenta con otros términos de búsqueda.</td></tr>';
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

