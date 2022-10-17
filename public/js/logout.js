const logout = async () => {
    console.log('attempting log out')
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

if  (document.querySelector('#logOut') !== null) {
    document.querySelector('#logOut').addEventListener('click', logout);
}