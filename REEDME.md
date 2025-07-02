<div align="center">
  <img src="https://cdn-icons-png.flaticon.com/512/5968/5968292.png" alt="JavaScript Logo" width="120"/>
  <h1>📱 Crudzocial en JavaScript</h1>
  <p>Escenario para poner a prueba tu destreza con el lenguaje de programación.</p>

  <p>
    <img src="https://img.shields.io/badge/JavaScript-ES6-yellow?logo=javascript&logoColor=white" alt="JavaScript Badge"/>
    <img src="https://img.shields.io/badge/Estado-%20Finalizado-green" alt="Estado Badge"/>
  </p>
</div>

# 📸 Crudzocial

**Crudzocial** es una aplicación web CRUD educativa desarrollada con HTML, CSS, y JavaScript puro, que permite a los usuarios registrarse, iniciar sesión y gestionar imágenes, notas personales y su perfil. Los administradores tienen acceso a funcionalidades adicionales de gestión de usuarios, logs, imágenes y notas.

---

## 📁 Estructura del Proyecto

> ⚠️ Nota: Aunque existen archivos `.html` separados, **la aplicación es de página única (SPA)**. Toda la lógica y navegación se maneja en `index.html` y `main.js`.

---

## 📝 Estructura del Proyecto

```
CRUDZOCIAL/
│
/assets
└── css/styles.css        → Estilos personalizados
└── js/main.js            → Lógica de toda la aplicación
/html
├── index.html            → Página principal
├── login.html            
├── register.html         
├── profile.html
├── notes.html
├── images.html
└── users.html
```


---

## 🚀 Funcionalidades Principales

### 👤 Autenticación de Usuarios
- Registro de nuevos usuarios (formulario completo con validaciones).
- Inicio y cierre de sesión.
- Persistencia de sesión usando `sessionStorage`.

### 🖼️ Galería de Imágenes
- Agregar imágenes mediante URL.
- Visualización y eliminación de imágenes.
- Imágenes protegidas por permisos (solo admins pueden ver todo).

### 📝 Notas Personales
- Crear, editar y eliminar notas.
- Visualización organizada en tarjetas.
- Cada nota contiene fecha de creación y modificación.

### 👨‍💼 Perfil del Usuario
- Visualización y edición de datos personales.
- Logs de actividades personales (hasta 10 recientes).

### 🛠️ Panel de Administración (Solo para `admin`)
- Visualización de todos los usuarios.
- Logs globales del sistema.
- Visualización de todas las imágenes y notas.
- Acceso exclusivo a la sección `#users`.

---

## 🧠 Tecnología Utilizada

- **HTML5 & CSS3**
- **Bootstrap 5.3** + **Bootstrap Icons**
- **JavaScript Vanilla (Puro)**
- **LocalStorage** y **SessionStorage**

---

## 🔒 Control de Acceso

- Roles: `admin` y `user`.
- Un usuario administrador se crea automáticamente si no existe:
  - Email: `admin@crudzocial.com`
  - Contraseña: `admin123`
- Admin puede ver y borrar contenido de todos.
- Usuarios solo ven su contenido.

---

## 🛑 Validaciones y Seguridad

- Validación básica de formularios.
- Evita registros duplicados por email.
- Confirmación antes de eliminar imágenes o notas.
- Protección de rutas (solo usuarios logueados acceden a secciones privadas).

---

## 📌 Cómo iniciar el proyecto

1. Clona o descarga el repositorio.
2. Abre `index.html` en tu navegador.
3. ¡Listo! No necesitas servidor, todo funciona localmente.

---

## ✅ Estado del Proyecto
✔️ Completado y funcional 100%.  
⚠️ No incluye backend ni base de datos real, todo se guarda en el navegador.

---

## 🧑‍💻 Autor

Desarrollado por Celula **Moodle** para **Riwi**.  
Proyecto académico tipo **CRUD** para fines educativos.

---

