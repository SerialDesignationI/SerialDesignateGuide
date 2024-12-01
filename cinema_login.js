
if (localStorage.getItem("currentUser")) {
    location.href = "./cinema_login.html";
}

let form = document.querySelector("form");
form.addEventListener("submit", (e) => {
    e.preventDefault();

    let username = document.getElementById("username").value.trim();
    let email = document.getElementById("email").value.trim();
    let password = document.getElementById("password").value;

    let lowerCaseLetter = /[a-z]/g;
    let upperCaseLetter = /[A-Z]/g;
    let numbers = /[0-9]/g;

    
    if (document.querySelector("#register")) {
        
        if (username.length < 6) {
            alert("Username must be at least 6 characters");
        } else if (password.length < 8) {
            alert("Password must be at least 8 characters");
        } else if (!password.match(lowerCaseLetter)) {
            alert("Password must contain a lowercase letter");
        } else if (!password.match(upperCaseLetter)) {
            alert("Password must contain an uppercase letter");
        } else if (!password.match(numbers)) {
            alert("Password must contain a number");
        } else {
            let users = localStorage.getItem("users") ? JSON.parse(localStorage.getItem("users")) : [];

            
            if (users.some(user => user.email === email)) {
                alert("Email is already registered");
            } else {
                users.push({ email, password, username });
                localStorage.setItem("users", JSON.stringify(users));
                alert("User created successfully, please login");
                location.href = "./cinema_login.html";
            }
        }
    } else if (document.querySelector("#login")) {
        
        if (!localStorage.getItem("users")) {
            alert("No user found");
        } else {
            let users = JSON.parse(localStorage.getItem("users"));

            let existingUser = users.find(
                (user) =>
                    user.email === email &&
                    user.password === password
            );

            if (existingUser) {
                localStorage.setItem("currentUser", JSON.stringify(existingUser));
                location.href = "./cinema_login.html";
            } else {
                alert("Email or password is incorrect");
            }
        }
    }
});