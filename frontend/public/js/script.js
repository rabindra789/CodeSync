function togglePassword() {
    const passwordInput = document.getElementById("password");
    const toggleButton = document.getElementById(".toggle-password");
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
        toggleButton.textContent = "🙈";
    } else {
        passwordInput.type = "password";
        toggleButton.textContent = "👁";
    }
}

const passwordInput = document.getElementById("password");
const strengthIndicator = document.getElementById("strength-indicator");
const strengthText = document.getElementById("strength-text");

if (passwordInput) {
    passwordInput.addEventListener("input", () => {
        const password = passwordInput.value;
        let strength = 0;

        if (password.length > 6) strength++;
        if (password.match(/[A-Z]/)) strength++;
        if (password.match(/[0-9]/)) strength++;
        if (password.match(/[^a-zA-Z0-9]/)) strength++;
        if (password.length < 6) strength--;

        strengthIndicator.className = "";
        switch (strength) {
            case 0:
                strengthIndicator.style.width = "0%";
                strengthText.textContent = "";
                break;
            case 1:
                strengthIndicator.style.width = "25%";
                strengthIndicator.classList.add("weak");
                strengthText.textContent = "Weak";
                break;
            case 2:
                strengthIndicator.style.width = "50%";
                strengthIndicator.classList.add("medium");
                strengthText.textContent = "Medium";
                break;
            case 3:
            case 4:
                strengthIndicator.style.width = "100%";
                strengthIndicator.classList.add("strong");
                strengthText.textContent = "Strong";
                break;
        }
    });
}
