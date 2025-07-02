// Variables globales
let currentUser = null;
let editingNoteId = null;

// Función autoejecutable para inicializar la aplicación
(function() {
    // Inicializar datos por defecto
    initializeDefaultData();
    
    // Verificar sesión existente
    checkExistingSession();
    
    // Configurar event listeners
    setupEventListeners();
    
    // Mostrar página de login por defecto
    showPage('login');
})();

// Función para inicializar datos por defecto
function initializeDefaultData() {
    // Crear usuario admin por defecto si no existe
    let users = getFromStorage('users') || [];
    
    if (!users.find(user => user.email === 'admin@crudzocial.com')) {
        const adminUser = {
            id: generateId(),
            name: 'Administrador',
            lastName: 'Sistema',
            email: 'admin@crudzocial.com',
            password: 'admin123',
            phone: '3001234567',
            country: 'Colombia',
            city: 'Medellín',
            address: 'Calle Admin 123',
            postalCode: '050001',
            role: 'admin',
            createdAt: new Date().toISOString()
        };
        
        users.push(adminUser);
        saveToStorage('users', users);
        
        // Log de creación del admin
        addLog('system', 'crear', 'Usuario administrador creado automáticamente');
    }
}

// Función para verificar sesión existente
function checkExistingSession() {
    const sessionUser = getFromSessionStorage('currentUser');
    if (sessionUser) {
        currentUser = sessionUser;
        showMainInterface();
        showPage('images');
    }
}

// Función para configurar event listeners
function setupEventListeners() {
    // Login form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }

    // Register form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }

    // Navigation
    const showRegisterLink = document.getElementById('showRegister');
    if (showRegisterLink) {
        showRegisterLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('register');
        });
    }

    const backToLoginLink = document.getElementById('backToLogin');
    if (backToLoginLink) {
        backToLoginLink.addEventListener('click', function(e) {
            e.preventDefault();
            showPage('login');
        });
    }

    // Logout
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }

    // Navigation links
    document.querySelectorAll('.nav-link[data-page]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const page = this.getAttribute('data-page');
            showPage(page);
        });
    });

    // Profile form
    const profileForm = document.getElementById('profileForm');
    if (profileForm) {
        profileForm.addEventListener('submit', handleProfileUpdate);
    }

    // Image modal buttons
    const addImageBtn = document.getElementById('addImageBtn');
    if (addImageBtn) {
        addImageBtn.addEventListener('click', function() {
            new bootstrap.Modal(document.getElementById('imageModal')).show();
        });
    }

    const saveImageBtn = document.getElementById('saveImageBtn');
    if (saveImageBtn) {
        saveImageBtn.addEventListener('click', handleImageSave);
    }

    const cancelImageBtn = document.getElementById('cancelImageBtn');
    if (cancelImageBtn) {
        cancelImageBtn.addEventListener('click', function() {
            bootstrap.Modal.getInstance(document.getElementById('imageModal')).hide();
        });
    }

    // Note modal buttons
    const addNoteBtn = document.getElementById('addNoteBtn');
    if (addNoteBtn) {
        addNoteBtn.addEventListener('click', function() {
            new bootstrap.Modal(document.getElementById('noteModal')).show();
        });
    }

    const saveNoteBtn = document.getElementById('saveNoteBtn');
    if (saveNoteBtn) {
        saveNoteBtn.addEventListener('click', handleNoteSave);
    }

    const cancelNoteBtn = document.getElementById('cancelNoteBtn');
    if (cancelNoteBtn) {
        cancelNoteBtn.addEventListener('click', function() {
            bootstrap.Modal.getInstance(document.getElementById('noteModal')).hide();
        });
    }

    // Modal reset listeners
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        imageModal.addEventListener('hidden.bs.modal', resetImageModal);
    }

    const noteModal = document.getElementById('noteModal');
    if (noteModal) {
        noteModal.addEventListener('hidden.bs.modal', resetNoteModal);
    }
}

// Función para manejar el login
function handleLogin(e) {
    e.preventDefault();
    
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    
    const users = getFromStorage('users') || [];
    const user = users.find(u => u.email === email && u.password === password);
    
    if (user) {
        currentUser = user;
        saveToSessionStorage('currentUser', user);
        
        // Log de login
        addLog(user.id, 'login', 'Inicio de sesión exitoso');
        
        showMainInterface();
        showPage('images');
        
        // Limpiar errores
        const loginError = document.getElementById('loginError');
        if (loginError) {
            loginError.style.display = 'none';
        }
    } else {
        showError('loginError', 'Email o contraseña incorrectos');
    }
}

// Función para manejar el registro
function handleRegister(e) {
    e.preventDefault();
    
    const email = document.getElementById('regEmail').value;
    const users = getFromStorage('users') || [];
    
    // Verificar si el email ya existe
    if (users.find(u => u.email === email)) {
        showError('registerError', 'El email ya está registrado');
        return;
    }
    
    const newUser = {
        id: generateId(),
        name: document.getElementById('regName').value,
        lastName: document.getElementById('regLastName').value,
        email: email,
        password: document.getElementById('regPassword').value,
        phone: document.getElementById('regPhone').value,
        country: document.getElementById('regCountry').value,
        city: document.getElementById('regCity').value,
        address: document.getElementById('regAddress').value,
        postalCode: document.getElementById('regPostalCode').value,
        role: 'user',
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveToStorage('users', users);
    
    // Log de registro
    addLog(newUser.id, 'crear', 'Nueva cuenta creada');
    
    // Mostrar mensaje de éxito y volver al login
    alert('Registro exitoso. Ahora puedes iniciar sesión.');
    showPage('login');
}

// Función para manejar el logout
function handleLogout() {
    if (currentUser) {
        addLog(currentUser.id, 'logout', 'Sesión cerrada');
    }
    
    currentUser = null;
    removeFromSessionStorage('currentUser');
    showPage('login');
    hideMainInterface();
}

// Función para mostrar la interfaz principal
function showMainInterface() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.display = 'block';
    }
    
    // Mostrar panel admin si es administrador
    if (currentUser && currentUser.role === 'admin') {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'block';
        }
    } else {
        const adminPanel = document.getElementById('adminPanel');
        if (adminPanel) {
            adminPanel.style.display = 'none';
        }
    }
}

// Función para ocultar la interfaz principal
function hideMainInterface() {
    const navbar = document.getElementById('navbar');
    if (navbar) {
        navbar.style.display = 'none';
    }
}

// Función para mostrar páginas
function showPage(pageName) {
    // Ocultar todas las páginas
    const pages = ['loginPage', 'registerPage', 'imagesPage', 'notesPage', 'profilePage', 'usersPage'];
    pages.forEach(page => {
        const element = document.getElementById(page);
        if (element) {
            element.style.display = 'none';
        }
    });
    
    // Mostrar página solicitada
    if (pageName === 'login') {
        const loginPage = document.getElementById('loginPage');
        if (loginPage) {
            loginPage.style.display = 'block';
        }
        hideMainInterface();
    } else if (pageName === 'register') {
        const registerPage = document.getElementById('registerPage');
        if (registerPage) {
            registerPage.style.display = 'block';
        }
        hideMainInterface();
    } else {
        // Verificar autenticación para páginas protegidas
        if (!currentUser) {
            showPage('login');
            return;
        }
        
        // Verificar permisos de admin
        if (pageName === 'users' && currentUser.role !== 'admin') {
            showPage('images');
            return;
        }
        
        showMainInterface();
        const targetPage = document.getElementById(pageName + 'Page');
        if (targetPage) {
            targetPage.style.display = 'block';
        }
        
        // Cargar contenido específico de la página
        switch(pageName) {
            case 'images':
                loadImages();
                break;
            case 'notes':
                loadNotes();
                break;
            case 'profile':
                loadProfile();
                break;
            case 'users':
                loadUsersAdmin();
                break;
        }
    }
}

// Función para cargar imágenes
function loadImages() {
    const images = getFromStorage('images') || [];
    const container = document.getElementById('imagesContainer');
    if (!container) return;
    
    let userImages = images;
    if (currentUser.role !== 'admin') {
        userImages = images.filter(img => img.userId === currentUser.id);
    }
    
    if (userImages.length === 0) {
        container.innerHTML = '<div class="col-12"><div class="alert alert-info">No hay imágenes para mostrar.</div></div>';
        return;
    }
    
    let html = '';
    userImages.forEach(image => {
        const user = getUserById(image.userId);
        html += `
            <div class="col-md-4 mb-4">
                <div class="card image-card">
                    <img src="${image.url}" alt="${image.title || 'Imagen'}" 
                         onerror="this.src='https://via.placeholder.com/300x200?text=Error+al+cargar'">
                    <div class="card-body">
                        <h6 class="card-title">${image.title || 'Sin título'}</h6>
                        ${currentUser.role === 'admin' ? `<small class="text-muted">Por: ${user ? user.name + ' ' + user.lastName : 'Usuario desconocido'}</small>` : ''}
                        <p class="card-text">
                            <small class="text-muted">Agregada: ${formatDate(image.createdAt)}</small>
                        </p>
                    </div>
                    <div class="image-overlay">
                        <button class="btn btn-danger btn-sm" onclick="deleteImage('${image.id}')">
                            <i class="bi bi-trash"></i> Eliminar
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar notas
function loadNotes() {
    const notes = getFromStorage('notes') || [];
    const container = document.getElementById('notesContainer');
    if (!container) return;
    
    let userNotes = notes;
    if (currentUser.role !== 'admin') {
        userNotes = notes.filter(note => note.userId === currentUser.id);
    }
    
    if (userNotes.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay notas para mostrar.</div>';
        return;
    }
    
    let html = '';
    userNotes.forEach(note => {
        const user = getUserById(note.userId);
        html += `
            <div class="card note-card mb-3">
                <div class="card-body">
                    <div class="d-flex justify-content-between align-items-start">
                        <div class="flex-grow-1">
                            <h5 class="note-title">${note.title}</h5>
                            <p class="note-content">${note.content}</p>
                            <div class="note-meta">
                                ${currentUser.role === 'admin' ? `<span class="badge bg-secondary me-2">${user ? user.name + ' ' + user.lastName : 'Usuario desconocido'}</span>` : ''}
                                <small>Creada: ${formatDate(note.createdAt)}</small>
                                ${note.updatedAt ? `<small> | Actualizada: ${formatDate(note.updatedAt)}</small>` : ''}
                            </div>
                        </div>
                        <div class="ms-3">
                            <button class="btn btn-sm btn-outline-primary me-1" onclick="editNote('${note.id}')">
                                <i class="bi bi-pencil"></i>
                            </button>
                            <button class="btn btn-sm btn-outline-danger" onclick="deleteNote('${note.id}')">
                                <i class="bi bi-trash"></i>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar perfil
function loadProfile() {
    if (!currentUser) return;
    
    // Cargar datos del usuario en el formulario
    const fields = ['Name', 'LastName', 'Email', 'Phone', 'Country', 'City', 'Address', 'PostalCode'];
    fields.forEach(field => {
        const element = document.getElementById(`profile${field}`);
        if (element) {
            element.value = currentUser[field.toLowerCase()] || '';
        }
    });
    
    // Cargar logs del usuario
    loadUserLogs();
}

// Función para cargar logs del usuario
function loadUserLogs() {
    const logs = getFromStorage('logs') || [];
    const container = document.getElementById('userLogs');
    if (!container) return;
    
    const userLogs = logs.filter(log => log.userId === currentUser.id).slice(-10);
    
    if (userLogs.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay actividad reciente.</div>';
        return;
    }
    
    let html = '';
    userLogs.reverse().forEach(log => {
        html += `
            <div class="log-entry log-${log.action}">
                <div class="log-action">${log.description}</div>
                <div class="log-time">${formatDate(log.timestamp)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar panel de administración
function loadUsersAdmin() {
    if (currentUser.role !== 'admin') return;
    
    loadAllUsers();
    loadAllLogs();
    loadAllImages();
    loadAllNotes();
}

// Función para cargar todos los usuarios (admin)
function loadAllUsers() {
    const users = getFromStorage('users') || [];
    const container = document.getElementById('usersContainer');
    if (!container) return;
    
    let html = '';
    users.forEach(user => {
        const initials = (user.name.charAt(0) + user.lastName.charAt(0)).toUpperCase();
        html += `
            <div class="user-card">
                <div class="user-info">
                    <div class="user-avatar">${initials}</div>
                    <div class="user-details">
                        <h6>${user.name} ${user.lastName}</h6>
                        <small>${user.email}</small>
                        ${user.role === 'admin' ? '<span class="admin-badge">ADMIN</span>' : ''}
                    </div>
                </div>
                <div class="mt-2">
                    <small class="text-muted">Registrado: ${formatDate(user.createdAt)}</small>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar todos los logs (admin)
function loadAllLogs() {
    const logs = getFromStorage('logs') || [];
    const container = document.getElementById('allLogs');
    if (!container) return;
    
    if (logs.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay logs disponibles.</div>';
        return;
    }
    
    let html = '';
    logs.slice(-20).reverse().forEach(log => {
        const user = getUserById(log.userId);
        html += `
            <div class="log-entry log-${log.action}">
                <div class="log-user">${user ? user.name + ' ' + user.lastName : 'Sistema'}</div>
                <div class="log-action">${log.description}</div>
                <div class="log-time">${formatDate(log.timestamp)}</div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar todas las imágenes (admin)
function loadAllImages() {
    const images = getFromStorage('images') || [];
    const container = document.getElementById('allImagesContainer');
    if (!container) return;
    
    if (images.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay imágenes disponibles.</div>';
        return;
    }
    
    let html = '';
    images.slice(-6).forEach(image => {
        const user = getUserById(image.userId);
        html += `
            <div class="d-flex align-items-center mb-2 p-2 border rounded">
                <img src="${image.url}" alt="${image.title}" style="width: 50px; height: 50px; object-fit: cover; border-radius: 4px;"
                     onerror="this.src='https://via.placeholder.com/50x50?text=Error'">
                <div class="ms-3 flex-grow-1">
                    <h6 class="mb-0">${image.title || 'Sin título'}</h6>
                    <small class="text-muted">Por: ${user ? user.name + ' ' + user.lastName : 'Usuario desconocido'}</small>
                </div>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteImage('${image.id}')">
                    <i class="bi bi-trash"></i>
                </button>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para cargar todas las notas (admin)
function loadAllNotes() {
    const notes = getFromStorage('notes') || [];
    const container = document.getElementById('allNotesContainer');
    if (!container) return;
    
    if (notes.length === 0) {
        container.innerHTML = '<div class="alert alert-info">No hay notas disponibles.</div>';
        return;
    }
    
    let html = '';
    notes.slice(-5).forEach(note => {
        const user = getUserById(note.userId);
        html += `
            <div class="border rounded p-3 mb-2">
                <h6 class="mb-1">${note.title}</h6>
                <p class="mb-2 text-truncate">${note.content}</p>
                <div class="d-flex justify-content-between align-items-center">
                    <small class="text-muted">Por: ${user ? user.name + ' ' + user.lastName : 'Usuario desconocido'}</small>
                    <div>
                        <button class="btn btn-sm btn-outline-primary me-1" onclick="editNote('${note.id}')">
                            <i class="bi bi-pencil"></i>
                        </button>
                        <button class="btn btn-sm btn-outline-danger" onclick="deleteNote('${note.id}')">
                            <i class="bi bi-trash"></i>
                        </button>
                    </div>
                </div>
            </div>
        `;
    });
    
    container.innerHTML = html;
}

// Función para manejar actualización de perfil
function handleProfileUpdate(e) {
    e.preventDefault();
    
    const updatedUser = {
        ...currentUser,
        name: document.getElementById('profileName').value,
        lastName: document.getElementById('profileLastName').value,
        phone: document.getElementById('profilePhone').value,
        country: document.getElementById('profileCountry').value,
        city: document.getElementById('profileCity').value,
        address: document.getElementById('profileAddress').value,
        postalCode: document.getElementById('profilePostalCode').value,
        updatedAt: new Date().toISOString()
    };
    
    // Actualizar en el almacenamiento
    const users = getFromStorage('users') || [];
    const userIndex = users.findIndex(u => u.id === currentUser.id);
    if (userIndex !== -1) {
        users[userIndex] = updatedUser;
        saveToStorage('users', users);
        
        // Actualizar usuario actual
        currentUser = updatedUser;
        saveToSessionStorage('currentUser', updatedUser);
        
        // Log de actualización
        addLog(currentUser.id, 'editar', 'Perfil actualizado');
        
        alert('Perfil actualizado exitosamente');
        loadUserLogs(); // Recargar logs
    }
}

// Función para manejar guardado de imagen
function handleImageSave() {
    const url = document.getElementById('imageUrl').value;
    const title = document.getElementById('imageTitle').value;
    
    if (!url) {
        alert('Por favor ingresa una URL válida');
        return;
    }
    
    const newImage = {
        id: generateId(),
        userId: currentUser.id,
        url: url,
        title: title,
        createdAt: new Date().toISOString()
    };
    
    const images = getFromStorage('images') || [];
    images.push(newImage);
    saveToStorage('images', images);
    
    // Log de creación
    addLog(currentUser.id, 'crear', `Nueva imagen agregada: ${title || 'Sin título'}`);
    
    // Cerrar modal y recargar
    const imageModal = document.getElementById('imageModal');
    if (imageModal) {
        bootstrap.Modal.getInstance(imageModal).hide();
    }
    loadImages();
}

// Función para manejar guardado de nota
function handleNoteSave() {
    const title = document.getElementById('noteTitle').value;
    const content = document.getElementById('noteContent').value;
    
    if (!title || !content) {
        alert('Por favor completa todos los campos');
        return;
    }
    
    const notes = getFromStorage('notes') || [];
    
    if (editingNoteId) {
        // Editar nota existente
        const noteIndex = notes.findIndex(n => n.id === editingNoteId);
        if (noteIndex !== -1) {
            notes[noteIndex] = {
                ...notes[noteIndex],
                title: title,
                content: content,
                updatedAt: new Date().toISOString()
            };
            
            addLog(currentUser.id, 'editar', `Nota editada: ${title}`);
        }
        editingNoteId = null;
    } else {
        // Crear nueva nota
        const newNote = {
            id: generateId(),
            userId: currentUser.id,
            title: title,
            content: content,
            createdAt: new Date().toISOString()
        };
        
        notes.push(newNote);
        addLog(currentUser.id, 'crear', `Nueva nota creada: ${title}`);
    }
    
    saveToStorage('notes', notes);
    
    // Cerrar modal y recargar
    const noteModal = document.getElementById('noteModal');
    if (noteModal) {
        bootstrap.Modal.getInstance(noteModal).hide();
    }
    loadNotes();
}

// Función para eliminar imagen
function deleteImage(imageId) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta imagen?')) {
        return;
    }
    
    const images = getFromStorage('images') || [];
    const imageIndex = images.findIndex(img => img.id === imageId);
    
    if (imageIndex !== -1) {
        const image = images[imageIndex];
        
        // Verificar permisos
        if (currentUser.role === 'admin' || image.userId === currentUser.id) {
            const imageTitle = image.title || 'Sin título';
            images.splice(imageIndex, 1);
            saveToStorage('images', images);
            
            addLog(currentUser.id, 'eliminar', `Imagen eliminada: ${imageTitle}`);
            
            // Recargar según la página actual
            if (document.getElementById('imagesPage').style.display !== 'none') {
                loadImages();
            }
            if (document.getElementById('usersPage').style.display !== 'none') {
                loadAllImages();
            }
        } else {
            alert('No tienes permisos para eliminar esta imagen');
        }
    }
}

// Función para eliminar nota
function deleteNote(noteId) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta nota?')) {
        return;
    }
    
    const notes = getFromStorage('notes') || [];
    const noteIndex = notes.findIndex(note => note.id === noteId);
    
    if (noteIndex !== -1) {
        const note = notes[noteIndex];
        
        // Verificar permisos
        if (currentUser.role === 'admin' || note.userId === currentUser.id) {
            const noteTitle = note.title;
            notes.splice(noteIndex, 1);
            saveToStorage('notes', notes);
            
            addLog(currentUser.id, 'eliminar', `Nota eliminada: ${noteTitle}`);
            
            // Recargar según la página actual
            if (document.getElementById('notesPage').style.display !== 'none') {
                loadNotes();
            }
            if (document.getElementById('usersPage').style.display !== 'none') {
                loadAllNotes();
            }
        } else {
            alert('No tienes permisos para eliminar esta nota');
        }
    }
}

// Función para editar nota
function editNote(noteId) {
    const notes = getFromStorage('notes') || [];
    const note = notes.find(n => n.id === noteId);
    
    if (!note) return;
    
    // Verificar permisos
    if (currentUser.role !== 'admin' && note.userId !== currentUser.id) {
        alert('No tienes permisos para editar esta nota');
        return;
    }
    
    // Llenar modal con datos de la nota
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteModalTitle = document.getElementById('noteModalTitle');
    
    if (noteTitle && noteContent && noteModalTitle) {
        noteTitle.value = note.title;
        noteContent.value = note.content;
        noteModalTitle.textContent = 'Editar Nota';
    }
    
    editingNoteId = noteId;
    
    // Mostrar modal
    const noteModal = document.getElementById('noteModal');
    if (noteModal) {
        new bootstrap.Modal(noteModal).show();
    }
}

// Función para resetear modal de imagen
function resetImageModal() {
    const imageUrl = document.getElementById('imageUrl');
    const imageTitle = document.getElementById('imageTitle');
    if (imageUrl) imageUrl.value = '';
    if (imageTitle) imageTitle.value = '';
}

// Función para resetear modal de nota
function resetNoteModal() {
    const noteTitle = document.getElementById('noteTitle');
    const noteContent = document.getElementById('noteContent');
    const noteModalTitle = document.getElementById('noteModalTitle');
    
    if (noteTitle) noteTitle.value = '';
    if (noteContent) noteContent.value = '';
    if (noteModalTitle) noteModalTitle.textContent = 'Nueva Nota';
    editingNoteId = null;
}

// Funciones de utilidad

// Función para generar ID único
function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

// Función para formatear fechas
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString('es-CO', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    });
}

// Función para obtener usuario por ID
function getUserById(userId) {
    const users = getFromStorage('users') || [];
    return users.find(user => user.id === userId);
}

// Función para agregar log
function addLog(userId, action, description) {
    const logs = getFromStorage('logs') || [];
    const newLog = {
        id: generateId(),
        userId: userId,
        action: action,
        description: description,
        timestamp: new Date().toISOString()
    };
    
    logs.push(newLog);
    saveToStorage('logs', logs);
}

// Función para mostrar errores
function showError(elementId, message) {
    const errorElement = document.getElementById(elementId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // Ocultar después de 5 segundos
        setTimeout(() => {
            errorElement.style.display = 'none';
        }, 5000);
    }
}

// Funciones de almacenamiento

// Función para guardar en localStorage
function saveToStorage(key, data) {
    try {
        localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}

// Función para obtener de localStorage
function getFromStorage(key) {
    try {
        const data = localStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error al leer de localStorage:', error);
        return null;
    }
}

// Función para guardar en sessionStorage
function saveToSessionStorage(key, data) {
    try {
        sessionStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar en sessionStorage:', error);
    }
}

// Función para obtener de sessionStorage
function getFromSessionStorage(key) {
    try {
        const data = sessionStorage.getItem(key);
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error al leer de sessionStorage:', error);
        return null;
    }
}

// Función para eliminar de sessionStorage
function removeFromSessionStorage(key) {
    try {
        sessionStorage.removeItem(key);
    } catch (error) {
        console.error('Error al eliminar de sessionStorage:', error);
    }
}