if (localStorage.getItem('token') && document.location.pathname === "/") {
    document.location.href = "/notes"
}

async function showNotes() {
    
}

async function login() {
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    // Send data to the backend
    const response = await fetch('/login', {
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
        document.location.href = "/notes"
        } else { 
            alert("Failed to login")
        }
}

async function createnote() {
    var title = document.getElementById("note_name").value;

    // Send data to the backend
    const response = await fetch('/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title: title, token: localStorage.getItem('token') })
    }) 
    const data = await response.json()
    
    // Handle the response from the backend
    if (response.status === 200) {
        } else { 
            alert("Failed to create note")
        }
}