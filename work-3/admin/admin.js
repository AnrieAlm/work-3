// Admin Authentication System
const ADMIN_PASSWORD = "admin123"; // CHANGE THIS TO YOUR DESIRED PASSWORD

// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
    
    // Handle login form submission
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // Handle logout button
    const logoutBtn = document.getElementById('logoutBtn');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', handleLogout);
    }
});

// Check if user is authenticated
function checkLoginStatus() {
    const isLoggedIn = sessionStorage.getItem('admin_logged_in');
    const currentPage = window.location.pathname;
    
    if (isLoggedIn === 'true') {
        // User is logged in, redirect to dashboard if on login page
        if (currentPage.includes('login.html')) {
            window.location.href = 'dashboard.html';
        }
    } else {
        // User is not logged in, redirect to login if trying to access dashboard
        if (currentPage.includes('dashboard.html')) {
            window.location.href = 'login.html';
        }
    }
}

// Handle login
function handleLogin(e) {
    e.preventDefault();
    
    const passwordInput = document.getElementById('password').value;
    const errorMessage = document.getElementById('errorMessage');
    
    if (passwordInput === ADMIN_PASSWORD) {
        // Successful login
        sessionStorage.setItem('admin_logged_in', 'true');
        window.location.href = 'dashboard.html';
    } else {
        // Failed login
        errorMessage.textContent = 'Incorrect password. Please try again.';
        document.getElementById('password').value = '';
        setTimeout(() => {
            errorMessage.textContent = '';
        }, 3000);
    }
}

// Handle logout
function handleLogout() {
    if (confirm('Are you sure you want to logout?')) {
        sessionStorage.removeItem('admin_logged_in');
        window.location.href = '../index.html'; // Changed from 'login.html'
    }
}

// Optional: Clear login on browser close
window.addEventListener('beforeunload', function() {
    // Note: sessionStorage is automatically cleared when tab is closed
    // This is just to ensure cleanup
});