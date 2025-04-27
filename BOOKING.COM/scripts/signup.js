// Select form elements
let loginEmail = document.querySelector(".login-box .email");
let loginPassword = document.querySelector(".login-box .password");
let loginBtn = document.querySelector(".login-box .clkbtn");

let signupName = document.querySelector(".signup-box .name");
let signupEmail = document.querySelector(".signup-box .email");
let signupPassword = document.querySelector(".signup-box .password");
let confirmPassword = document.querySelector(".signup-box .confirm-password");
let signupBtn = document.querySelector(".signup-box .clkbtn");

// Firebase Database URL
const firebaseBaseURL = "https://bookingpro-36438-default-rtdb.firebaseio.com/users";

// Function to get user from Firebase by email
async function getUser(email) {
    let formattedEmail = email.replace(".", "_"); // Replace '.' to prevent key issues
    try {
        let response = await fetch(`${firebaseBaseURL}/${formattedEmail}.json`);
        if (!response.ok) throw new Error("Failed to fetch user");
        return await response.json();
    } catch (error) {
        console.error("Error fetching user:", error);
        return null;
    }
}

// Function to store user in Firebase
async function storeUser(email, userData) {
    let formattedEmail = email.replace(".", "_");
    try {
        let response = await fetch(`${firebaseBaseURL}/${formattedEmail}.json`, {
            method: "PUT", // Uses email as key to prevent duplicates
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
        });
        return response.ok;
    } catch (error) {
        console.error("Error storing user:", error);
        return false;
    }
}

// Handle login
loginBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    
    let email = loginEmail.value.trim();
    let password = loginPassword.value.trim();

    if (!email || !password) {
        alert("Please enter both email and password.");
        return;
    }

    let user = await getUser(email); // Fetch user from Firebase

    if (!user) {
        alert("❌ User not found. Please sign up.");
        clearFields();
        return;
    }

    if (user.password !== password) {
        alert("❌ Incorrect password. Try again.");
        clearFields();
        return;
    }

    // Store user session (could be improved with authentication tokens)
    localStorage.setItem("user", JSON.stringify(user));

    alert("✅ Login successful! Redirecting...");
    clearFields();
    window.location.href = "booking.html"; // Redirect after login
});

// Handle signup
signupBtn.addEventListener("click", async (event) => {
    event.preventDefault();
    
    let name = signupName.value.trim();
    let email = signupEmail.value.trim();
    let password = signupPassword.value.trim();
    let confirmPasswordValue = confirmPassword.value.trim();

    if (!name || !email || !password || !confirmPasswordValue) {
        alert("❌ All fields are required!");
        return;
    }

    if (!isValidEmail(email)) {
        alert("❌ Invalid email format!");
        return;
    }

    if (password.length < 6) {
        alert("❌ Password must be at least 6 characters long!");
        return;
    }

    if (password !== confirmPasswordValue) {
        alert("❌ Passwords do not match!");
        return;
    }

    let existingUser = await getUser(email);
    if (existingUser) {
        alert("❌ User already exists! Please log in.");
        return;
    }

    let newUser = { name, email, password };

    let success = await storeUser(email, newUser);

    if (success) {
        alert("✅ Signup successful! Redirecting...");
        localStorage.setItem("user", JSON.stringify(newUser));
        clearFields();
        window.location.href = "index.html"; // Redirect after signup
    } else {
        alert("❌ Signup failed. Please try again.");
    }
});

// Email validation function
function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// Clear input fields
function clearFields() {
    loginEmail.value = "";
    loginPassword.value = "";
    signupName.value = "";
    signupEmail.value = "";
    signupPassword.value = "";
    confirmPassword.value = "";
}
