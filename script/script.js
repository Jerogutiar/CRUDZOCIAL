/*Inputs del login*/
let emailIn = document.getElementById("email")
let passwordIn = document.getElementById("password")
let login = document.getElementById("login")

// User status
let userinfo = document.getElementById("userinfo")

/*Input to Sign Up*/
let toSign = document.getElementById("register")

let basedata = JSON.parse(localStorage.getItem("basedata")) || {
  admin: {
    email: "mateoa@gmail.com",
    password: "password",
    name: "Mateo"
  },
  usuario: {
    email: "default@gmail.com",
    password: "password",
    name: "Juan"
  }
};

if (login){
  login.addEventListener("click", function(e){
    e.preventDefault();
    const email = emailIn.value;
    const password = passwordIn.value;
    
    validacionUsuario(email, password)
  })
}

function validacionUsuario(email, password) {
  let found = false;

  for (let key in basedata) {
    const user = basedata[key];

    if (email === user.email && password === user.password) {
      found = true;
      localStorage.setItem("currentUser", JSON.stringify(user));

      if (key === "admin") {
        console.log("You are admin");
        if (userinfo) {
          userinfo.innerText = `👑 Welcome admin ${user.name}`;
          setTimeout(() => {
            window.location.href = './main_page/index.html';
          }, 2000); 
        }
      } else {
        console.log("You are a user");
        if (userinfo) {
          userinfo.innerText = `👋 Welcome user ${user.name}`;
          setTimeout(() => {
            window.location.href = './main_page/index.html';
          }, 2000); 
        }
      }

      break;
    }
  }

  if (!found) {
    console.error("❌ Account does not exist.");
    if (userinfo) {
      userinfo.innerText = "❌ Account does not exist.";
      userinfo.style.color = "red";
    }
  }
}

if (toSign){
  toSign.addEventListener("click", function(e){
    e.preventDefault();
    window.location.href = "./sign_in/signin.html";
  })
}


/*Register*/
/*Sign Up Inputs*/ 

let nameSu = document.getElementById("name")
let emailSu = document.getElementById("emailSu")
let passwordSu = document.getElementById("passwordSu")
let sign = document.getElementById("sign")
let alert = document.getElementById("alert")

let userCount = 0

if (sign){
  sign.addEventListener("click", function(e){
    e.preventDefault();

    const name = nameSu.value;
    const email = emailSu.value;
    const password = passwordSu.value;

    crearUsuario(name, email, password)
  })
}

function crearUsuario(name, email, password) {
  if (!name || !email || !password) {
    console.error("You must complete all fields.");
    if (userinfo) {
      userinfo.innerText = "❌ You must complete all fields.";
      userinfo.style.color = "red";
    }
    return;
  }

  for (let key in basedata) {
    if (basedata[key].email === email) {
      console.log("The email already exists.");
      if (userinfo) {
        userinfo.innerText = "❌ The email already exists.";
        userinfo.style.color = "red";
      }
      return;
    }
  }

  userCount++;
  let userId = `User${userCount}`;

  basedata[userId] = {
    email: email,
    password: password,
    name: name,
    status: true
  };

  localStorage.setItem("basedata", JSON.stringify(basedata));
  localStorage.setItem("currentUser", JSON.stringify(basedata[userId]));

  console.log("User created:", basedata[userId]);

  if (userinfo) {
    userinfo.innerText = "✅ Successful registration. Redirecting...";
    userinfo.style.color = "green";
  }

  setTimeout(() => {
    window.location.href = "../index.html";
  }, 2000);
}
