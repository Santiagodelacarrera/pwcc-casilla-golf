const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public'));

// Helper function to read JSON file
function readJSONFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf8');
        return JSON.parse(data);
    } catch (error) {
        return [];
    }
}

// Helper function to write JSON file
function writeJSONFile(filename, data) {
    fs.writeFileSync(filename, JSON.stringify(data, null, 2));
}

// Authentication endpoints
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    const users = readJSONFile('data/users.json');
    
    const user = users.find(u => u.username === username && u.password === password);
    
    if (user) {
        // Remove password from response
        const { password: _, ...userWithoutPassword } = user;
        res.json({ success: true, user: userWithoutPassword });
    } else {
        res.status(401).json({ success: false, message: 'Credenciales incorrectas' });
    }
});

// Get all members (protected)
app.get('/api/members', (req, res) => {
    const members = readJSONFile('data/members.json');
    res.json(members);
});

// Search members
app.post('/api/search', (req, res) => {
    const { query, searchType } = req.body;
    const members = readJSONFile('data/members.json');
    
    let results = members;
    
    if (query && query.trim() !== '') {
        const searchQuery = query.toLowerCase().trim();
        
        switch(searchType) {
            case 'nombre':
                results = members.filter(m => 
                    m.nombres?.toLowerCase().includes(searchQuery)
                );
                break;
            case 'apellido':
                results = members.filter(m => 
                    m.nombres?.toLowerCase().includes(searchQuery) ||
                    m.apellido?.toLowerCase().includes(searchQuery)
                );
                break;
            case 'socio':
                results = members.filter(m => 
                    m.numeroSocio?.toString().includes(searchQuery)
                );
                break;
            case 'locker':
                results = members.filter(m => 
                    m.ubicacion?.toLowerCase().includes(searchQuery)
                );
                break;
            default:
                // Search in all fields
                results = members.filter(m => 
                    m.nombres?.toLowerCase().includes(searchQuery) ||
                    m.numeroSocio?.toString().includes(searchQuery) ||
                    m.ubicacion?.toLowerCase().includes(searchQuery) ||
                    m.elemento?.toLowerCase().includes(searchQuery)
                );
        }
    }
    
    res.json(results);
});

// Update member (for chatbot changes)
app.post('/api/update-member', (req, res) => {
    const { memberIdentifier, updateData } = req.body;
    const members = readJSONFile('data/members.json');
    
    // Find member by name or member number
    const memberIndex = members.findIndex(m => 
        m.nombres?.toLowerCase().includes(memberIdentifier.toLowerCase()) ||
        m.numeroSocio?.toString() === memberIdentifier
    );
    
    if (memberIndex !== -1) {
        // Update the member
        members[memberIndex] = { ...members[memberIndex], ...updateData };
        writeJSONFile('data/members.json', members);
        
        res.json({ success: true, member: members[memberIndex] });
    } else {
        res.status(404).json({ success: false, message: 'Socio no encontrado' });
    }
});

// User management (admin only)
app.get('/api/users', (req, res) => {
    const users = readJSONFile('data/users.json');
    const usersWithoutPasswords = users.map(({ password, ...rest }) => rest);
    res.json(usersWithoutPasswords);
});

app.post('/api/users', (req, res) => {
    const { username, password, role } = req.body;
    const users = readJSONFile('data/users.json');
    
    if (users.find(u => u.username === username)) {
        return res.status(400).json({ success: false, message: 'Usuario ya existe' });
    }
    
    users.push({ username, password, role: role || 'user' });
    writeJSONFile('data/users.json', users);
    
    res.json({ success: true });
});

app.delete('/api/users/:username', (req, res) => {
    const { username } = req.params;
    const users = readJSONFile('data/users.json');
    
    if (username === 'ADMINPWCC') {
        return res.status(400).json({ success: false, message: 'No se puede eliminar el admin principal' });
    }
    
    const filteredUsers = users.filter(u => u.username !== username);
    writeJSONFile('data/users.json', filteredUsers);
    
    res.json({ success: true });
});

// Serve index page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Acceso desde la red local en: http://[TU_IP]:${PORT}`);
});

