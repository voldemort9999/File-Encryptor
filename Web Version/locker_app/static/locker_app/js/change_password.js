// Add form-control class to all inputs
document.querySelectorAll('input').forEach(input => {
    input.classList.add('form-control');
});

function togglePassword(btn) {
    const container = btn.closest('.password-wrapper');
    const input = container.querySelector('input');
    const eyeOpen = btn.querySelector('.eye-open');
    const eyeClosed = btn.querySelector('.eye-closed');

    if (input.type === 'password') {
        input.type = 'text';
        eyeOpen.style.display = 'none';
        eyeClosed.style.display = 'block';
    } else {
        input.type = 'password';
        eyeOpen.style.display = 'block';
        eyeClosed.style.display = 'none';
    }
}
