document.addEventListener("DOMContentLoaded", async function () {
    const hotelsBtn = document.getElementById("hotels");
    const carHireBtn = document.getElementById("car-hire");
    const userNameSpan = document.getElementById("userName");
    const logoutBtn = document.querySelector(".auth-btn.logout");

    // Navigation buttons
    if (hotelsBtn) {
        hotelsBtn.addEventListener("click", () => {
            window.location.href = "booking.html";
        });
    }
    if (carHireBtn) {
        carHireBtn.addEventListener("click", () => {
            window.location.href = "carrental.html";
        });
    }

    // Fetch Authenticated User
    async function getAuthenticatedUser() {
        const userId = localStorage.getItem("authUserId");
        if (!userId) {
            userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> Log In`;
            return null;
        }

        try {
            const response = await fetch(`https://bookingpro-36438-default-rtdb.firebaseio.com/users/${userId}.json`);
            const user = await response.json();

            if (user && user.name) {
                userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> ${user.name}`;
            } else {
                userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> Log In`;
            }
        } catch (error) {
            console.error("Error fetching user data:", error);
            userNameSpan.innerHTML = `<i class="ri-user-3-fill"></i> Log In`;
        }
    }

    // Logout Function
    if (logoutBtn) {
        logoutBtn.addEventListener("click", () => {
            localStorage.removeItem("authUserId");
            window.location.href = "index.html"; // Redirect to home or login page
        });
    }

    // Initialize authentication status
    getAuthenticatedUser();
});
function redirectTo(page) {
    window.location.href = page;
}
