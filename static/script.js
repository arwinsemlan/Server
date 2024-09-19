function login() {
    console.log("DU klarar det");
    var user = document.getElementById("user").value;
    var password = document.getElementById("password").value;

    // Send data to the backend
    fetch('http://127.0.0.1:3000/process', {
        method: 'POST',
        headers: {
            'Content-Type': 'login/json'
        },
        body: JSON.stringify({ user: user, password: password })
    }) 
    .then(response => response.json())
    .then(data => {
        // Handle the response from the backend
        console.log(data);
    })
    console.log("pa slutet");
}