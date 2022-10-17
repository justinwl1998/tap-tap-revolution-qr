if (document.querySelector('#login') !== null) {
    document
        .querySelector('#login')
        .addEventListener('click', function() {
            window.location.href = '/login';
        });
}

if (document.querySelector('#signup') !== null) {
    document
        .querySelector('#signup')
        .addEventListener('click', function() {
            window.location.href = '/signup';
        });    
}