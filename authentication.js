// ====================== SIGNUP ======================
if (document.title.toLowerCase().includes("signup")) {
  const form = document.getElementById("form");
  const errorMsg = document.getElementById("error-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const firstname = document.getElementById("firstname-input").value.trim();
    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value;
    const repeatPassword = document.getElementById("repeat-password-input").value;

    if (!firstname || !email || !password || !repeatPassword) {
      errorMsg.textContent = "Please fill in all fields.";
      return;
    }

    if (password !== repeatPassword) {
      errorMsg.textContent = "Passwords do not match.";
      return;
    }

    // Check if user already exists
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const existingUser = users.find((user) => user.email === email);
    if (existingUser) {
      errorMsg.textContent = "User already exists. Try logging in.";
      return;
    }

    // Save new user
    const newUser = { firstname, email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));
    localStorage.setItem("loggedInUser", JSON.stringify(newUser));

    // Redirect to profile
    window.location.href = "profile.html";
  });
}

// ====================== LOGIN ======================
if (document.title.toLowerCase().includes("login")) {
  const form = document.getElementById("form");
  const errorMsg = document.getElementById("error-message");

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = document.getElementById("email-input").value.trim();
    const password = document.getElementById("password-input").value;

    const users = JSON.parse(localStorage.getItem("users")) || [];
    const user = users.find((user) => user.email === email && user.password === password);

    if (!user) {
      errorMsg.textContent = "Invalid email or password.";
      return;
    }

    // Save session info
    localStorage.setItem("loggedInUser", JSON.stringify(user));

    // Redirect to profile
    window.location.href = "profile.html";
  });
}

// ====================== PROFILE ======================
if (document.title.toLowerCase().includes("profile")) {
  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  const profileContainer = document.getElementById("profile");

  if (!user) {
    // Not logged in
    window.location.href = "login.html";
  } else {
    profileContainer.innerHTML = `
      <h1>Welcome, ${user.firstname}!</h1>
      <p><strong>Email:</strong> ${user.email}</p>
      <button id="logout-btn">Logout</button>
    `;
  }

  document.getElementById("logout-btn")?.addEventListener("click", () => {
    localStorage.removeItem("loggedInUser");
    window.location.href = "login.html";
  });
}
