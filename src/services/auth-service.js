// auth-service.js
// This is a basic implementation - you'll need to adapt it to your authentication system

/**
 * Gets the email of the currently logged-in user
 * @returns {string} The logged-in user's email
 */
export function getLoggedInUserEmail() {
    // Implementation depends on your authentication system
    // Example using localStorage:
    const userData = localStorage.getItem('user');
    console.log("User data from localStorage:", userData);
    const user = JSON.parse(userData);
    console.log("Parsed user object:", user);
    const email = user?.email || '';
    console.log("Retrieved email:", email);
    return email;
}


/**
 * Checks if a user is authenticated
 * @returns {boolean} True if user is authenticated
 */
export function isAuthenticated() {
    // Implementation depends on your authentication system
    // Example using localStorage:
    return !!localStorage.getItem('user');
}
