async function login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    // Send data to the backend
    const response = await fetch('http://127.0.0.1:3000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ user: user, password: password })
    }) 
    const data = await response.json()
    
    // Handle the response from the backend
    if (response.status === 200) {
        localStorage.setItem('token', data.token)
        document.location.href = "/inside"
        } else { 
            alert("Failed to login")
        }
}