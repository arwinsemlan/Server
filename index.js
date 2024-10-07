import express from "express"
const app = express()
import { createNote, createLogin, login, getNotes, getNote, saveNote } from "./database.js";

app.use(express.json());

app.get('/getnote', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];
    const note = req.headers.note;

    const [result] = await getNote(token, note);
    if(result) {
        console.log(result)
        console.log(result.contents)
        res.json({
            content: result.contents,
            title: result.id
        });
    }
    else {
        res.status(400).json({
            status: 'Failed'
        });
    }
});

app.get('/getnotes', async (req, res) => {
    const token = req.headers.authorization.split(' ')[1];

    console.log(token)

    // Call the getNotes function from the database.js file
    const result = await getNotes(token);
    
    if (result) {
        res.json({
            data: result,
        });
    }
    else {
        res.status(400).json({
            status: 'Failed'
        });
    }
});

app.post('/savenote', async (req, res) => {
    const content = req.body.content;
    const title = req.body.title;
    const token = req.body.token;

    const result = await saveNote(content, title, token);

    console.log(result)

    if (result) {  
        res.json({
            status: 'Success',
        });
    }
    else { 
        res.status(400).json({
            status: 'Failed'
        });
    }
});

// Process the form data
app.post('/login', async (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log(user)
    console.log(password)

    // Call the login function from the database.js file
    const [result] = await login(user, password);

    // Return a response back to the frontend
    if (result) {
        res.json({
            status: 'Success',
            token: result.token,
        });
    }
    else {
        res.status(400).json({
            status: 'Failed'
        });
    }
});


app.post('/process', async (req, res) => {
    try {
        const title = req.body.title;
        const token = req.body.token;

        const result = await createNote(title, '', token);

        // Return a response back to the frontend
        if (result) {
            res.json({
                status: 'Success',
            });
        } else {
            res.json({
                status: 'Failure',
                message: 'Note creation failed'
            });
        }
    } catch (error) {
        console.error('Error in /process route:', error);
        res.status(500).json({
            status: 'Error',
            message: 'Internal server error'
        });
    }
});

app.use(express.static('static'))
app.listen(3000)