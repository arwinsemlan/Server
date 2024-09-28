import express from "express"
const app = express()
import { createNote, creatLogin, login } from "./database.js";

app.use(express.json());

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