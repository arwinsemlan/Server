import express from "express"
const app = express()
import { creatLogin, login } from "./database.js";
import bodyParser from'body-parser'; 

app.use(bodyParser.json());

// Process the form data
app.post('/process', async (req, res) => {
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
            hej: "hej"
        });
    }
    else {
        res.status(400).json({
            status: 'Failed'
        });
    }
});


app.use(express.static('static'))
app.listen(3000)