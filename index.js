import express from "express"
const app = express()
import { login } from "./database.js";
import bodyParser from'body-parser'; 

app.use(bodyParser.json());

// Process the form data
app.post('/process', (req, res) => {
    const user = req.body.user;
    const password = req.body.password;

    console.log(user)
    console.log(password)

    const result = login(user, password)
    console.log(result)
    // Return a response back to the frontend
    res.json({
        result: result,
        status: 'success',
        message: 'Data received successfully!'
    });
});

app.use(express.static('static'))
app.listen(3000)