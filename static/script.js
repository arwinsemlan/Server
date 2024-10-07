if (localStorage.getItem('token') && document.location.pathname === "/") {
    document.location.href = "/notes"
}

document.addEventListener('DOMContentLoaded', (event) => {
    if (document.location.pathname === "/notes/") {
        showNotes();
    }
});

async function save_note() {
    const note = document.getElementById("input").value; 
    const response = await fetch('/savenote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ content: note, title: localStorage.getItem('cur_note'), token: localStorage.getItem('token') })
    })
    const data = await response.json()

}

async function enterNote(note) {
    const response = await fetch('/getnote', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`,
            'note': note
        }
    })
    const data = await response.json()
    console.log(data.content)
    localStorage.setItem('cur_note', data.title)
    if (response.status === 200) {
        const para = document.createElement("input");
        para.value = data.content;
        para.id = 'input';
        const element = document.getElementById("show_notes");
        element.appendChild(para);
    }
}

async function showNotes() {
    const response = await fetch('/getnotes', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
    })
    const data = await response.json()

    if (response.status === 200) {
        data.data.forEach(note => {
            const para = document.createElement("button");
            const node = document.createTextNode(note.title);
            para.id = 'note';
            para.onclick = () => enterNote(note.title);
            para.appendChild(node);
            const element = document.getElementById("show_notes");
            element.appendChild(para);
        });

    }
    else {
        alert("Failed to get notes")
    }
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

    document.location.href = "/notes"

    // Handle the response from the backend
    if (response.status === 200) {
    } else {
        alert("Failed to create note")
    }
}