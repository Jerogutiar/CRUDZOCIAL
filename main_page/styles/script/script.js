const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser) {
  alert("Debes iniciar sesión primero.");
  window.location.href = "../index.html";
} else {
  const welcome = document.getElementById("welcome");
  if (welcome) {
    const emoji = currentUser.name === "Mateo" ? "👑" : "👋";
    welcome.innerText = `${emoji} Welcome, ${currentUser.name}!`;
  }
}

let logOut = document.getElementById("logOut");

if (logOut) {
  logOut.addEventListener("click", function (e) {
    e.preventDefault();
    alert("See you soon!");

    setTimeout(() => {
      localStorage.removeItem("currentUser");
      window.location.href = "../index.html";
    }, 2000);
  });
}

