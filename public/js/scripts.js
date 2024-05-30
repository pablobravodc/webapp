document.addEventListener('DOMContentLoaded', function() {
    // Validación del formulario de registro
    const registerForm = document.querySelector('form[action="/register"]');
    if (registerForm) {
        registerForm.addEventListener('submit', function(event) {
            const password = registerForm.querySelector('input[name="clave"]').value;
            const confirmPassword = registerForm.querySelector('input[name="confirm_clave"]').value;
            
            if (password !== confirmPassword) {
                event.preventDefault();
                alert('Las contraseñas no coinciden');
            }
        });
    }
    
    // Validación del formulario de inicio de sesión
    const loginForm = document.querySelector('form[action="/login"]');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            // Lógica de validación adicional si es necesario
        });
    }
});
