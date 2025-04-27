document.addEventListener("DOMContentLoaded", function () {
    const userSection = document.getElementById("userSection");
    const userNameSpan = document.getElementById("userName");
    const logoutBtn = document.querySelector(".auth-btn.logout");

    // Get the user from localStorage
    const user = JSON.parse(localStorage.getItem("authUser"));

    if (user && user.name) {
        // Display the logged-in user's name
        userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> ${user.name}`;
    } else {
        // If no user is logged in, show "Log In"
        userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> Log In`;
    }

    if (logoutBtn) {
        logoutBtn.addEventListener("click", function () {
            // Remove user data from localStorage
            localStorage.removeItem("authUser");

            // Redirect to index.html
            window.location.href = "index.html";
        });
    }
});
