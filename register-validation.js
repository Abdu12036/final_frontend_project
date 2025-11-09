document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("registerForm");
  const toast = document.getElementById("toast");

  const nameInput = document.getElementById("name");
  const phoneInput = document.getElementById("phone");
  const emailInput = document.getElementById("email");

  const nameError = document.getElementById("nameError");
  const phoneError = document.getElementById("phoneError");
  const emailError = document.getElementById("emailError");

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let isValid = true;

    // Reset errors and borders
    [nameError, phoneError, emailError].forEach(el => el.textContent = "");
    [nameInput, phoneInput, emailInput].forEach(input => {
      input.classList.remove("invalid", "valid");
    });

    // Validate name
    const nameValue = nameInput.value.trim();
    if (nameValue === "") {
      nameError.textContent = "Name is required.";
      nameInput.classList.add("invalid");
      isValid = false;
    } else if (!/^[A-Za-zА-Яа-яЁё\s'-]+$/.test(nameValue)) {
      nameError.textContent = "Name can only contain letters.";
      nameInput.classList.add("invalid");
      isValid = false;
    } else {
      nameInput.classList.add("valid");
    }

    // Validate Kazakhstan phone number format
    const phoneValue = phoneInput.value.trim();
    if (phoneValue === "") {
      phoneError.textContent = "Phone is required.";
      phoneInput.classList.add("invalid");
      isValid = false;
    } else if (!/^\+7\d{10}$/.test(phoneValue)) {
      phoneError.textContent = "Use +7XXXXXXXXXX format.";
      phoneInput.classList.add("invalid");
      isValid = false;
    } else {
      phoneInput.classList.add("valid");
    }

    // Validate email
    const emailValue = emailInput.value.trim();
    if (emailValue === "") {
      emailError.textContent = "Email is required.";
      emailInput.classList.add("invalid");
      isValid = false;
    } else if (!/^[\w.-]+@[\w.-]+\.\w{2,}$/.test(emailValue)) {
      emailError.textContent = "Enter a valid email.";
      emailInput.classList.add("invalid");
      isValid = false;
    } else {
      emailInput.classList.add("valid");
    }

    // If valid, show success toast
    if (isValid) {
      showToast("Form submitted successfully!", "success");
      form.reset();
      [nameInput, phoneInput, emailInput].forEach(i => i.classList.remove("valid"));
    } else {
      showToast("Please fix the errors and try again.", "error");
    }
  });

  // === Toast logic ===
  function showToast(message, type) {
    toast.textContent = message;
    toast.className = type === "success" ? "show success" : "show error";
    setTimeout(() => (toast.className = toast.className.replace("show", "")), 3000);
  }
});
