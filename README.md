
# Página de Inicio de Sesión y Registro (JavaScript + LocalStorage)

Este proyecto es un sistema básico de inicio de sesión y registro utilizando **JavaScript puro (Vanilla JS)** y la **API Web Storage** (`localStorage`). Simula un sistema de autenticación sin necesidad de backend.

## 🚀 Funcionalidades

- Inicio de sesión y registro de usuarios.
- Roles de administrador y usuario regular.
- Persistencia de usuarios usando `localStorage`.
- Simulación de sesión con la clave `currentUser`.
- Redirección automática tras inicio de sesión.
- Mensajes de error o éxito en tiempo real.

## 📦 Estructura en LocalStorage

Los datos de los usuarios se guardan en `localStorage` bajo la clave `"basedata"`. Ejemplo de estructura:

```json
{
  "admin": {
    "email": "mateoa@gmail.com",
    "password": "password",
    "name": "Mateo"
  },
  "usuario": {
    "email": "default@gmail.com",
    "password": "password",
    "name": "Juan"
  }
}
```

Cuando un usuario inicia sesión correctamente, se guarda en `localStorage` bajo la clave `"currentUser"`.

## 🧠 Lógica de Inicio de Sesión

1. El usuario ingresa su correo y contraseña.
2. Al hacer clic en "Login":
   - Se recorre la base de datos (`basedata`).
   - Se comparan los datos ingresados.
   - Si coinciden, se guarda `"currentUser"`.
   - Se muestra un mensaje de bienvenida y redirige.
   - Si no existe la cuenta, se muestra un mensaje de error.

```js
localStorage.setItem("currentUser", JSON.stringify(user));
```

### Guardián para Admin

Si el usuario encontrado tiene la clave `"admin"`, se muestra un mensaje especial:

```js
userinfo.innerText = `👑 Bienvenido administrador ${user.name}`;
```

## ✍️ Lógica de Registro

1. El usuario ingresa su nombre, correo y contraseña.
2. Se valida que los campos no estén vacíos y que el correo no exista ya.
3. Se genera un ID único (`User1`, `User2`, etc.).
4. Se añade el usuario a `basedata`.
5. Se actualiza `localStorage` con el nuevo usuario y como `"currentUser"`.
6. Se redirige tras mostrar un mensaje de éxito.

## 🔒 Simulación de Guardián de Ruta

Puedes verificar la existencia de `"currentUser"` en otras páginas para permitir o bloquear acceso:

```js
const user = JSON.parse(localStorage.getItem("currentUser"));
if (!user) {
  window.location.href = "../index.html"; // Redirige si no hay sesión
}
```

## 🧠 Mejoras Futuras

- Cifrado de contraseñas (ej. con `crypto-js`)
- Función de cerrar sesión (logout)
- Guardar hora de inicio de sesión
- Agregar opción de editar perfil

---

Creado por Mateo Algarin Rendon

# 📝 Aplicación de Notas

Una aplicación web simple para tomar, editar y eliminar notas personales. Las notas se guardan en el navegador mediante `localStorage`, y el acceso se gestiona a través de `sessionStorage`.

---

## 🚀 ¿Cómo funciona?

- Al escribir una nota y hacer clic en "Guardar Nota", se almacena en el `localStorage`.
- Cada nota muestra quién la escribió y la fecha.
- Las notas pueden editarse o eliminarse, pero **solo por el autor** o por un usuario con rol `admin`.
- Las ediciones se hacen de forma **inline** y pueden cancelarse.

---

## 🛠️ Tecnologías utilizadas

- **HTML5** — Estructura semántica.
- **CSS** — Estilos modernos con gradientes y diseño responsivo básico.
- **JavaScript** — Lógica completa
- **localStorage** y **sessionStorage** — Almacenamiento del navegador

---

## 📂 Estructura del proyecto

📁 proyecto-notas/

├── index.html

├── notas.css

└── notas.js


# 👨‍💻 Autor
- `yeferson Garcia`


## 💡 Posibles mejoras

- Guardado en base de datos real.

- Responsive total para móviles.


## 🖼️ Vista previa


![Image](https://github.com/user-attachments/assets/3efcb5f7-6881-4eed-8b8f-5ae6f4f0eea1)

![Image](https://github.com/user-attachments/assets/d8be3eaa-544f-43e4-9e76-f7e482f90a00)

![Image](https://github.com/user-attachments/assets/99b5572c-f25f-49ef-9c5a-670b0461814d)


