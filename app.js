const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
const path = require('path');
const app = express();
const port = 8000;
const uri = "mongodb+srv://project:project123@cluster0.7p8f8vr.mongodb.net/userdetail?retryWrites=true&w=majority";
// const mon ="mongodb://127.0.0.1:27017/usertrail";

// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static'))// For serving static files
app.use(express.urlencoded({ extended: false }));

// PUG SPECIFIC STUFF
app.set('view engine', 'pug')// set the template engine as pug
app.set('views', path.join(__dirname, 'views'))// set the views directory

//connection with db

// mongoose.set('strictQuery', true);

const Register = require("./register_model");

mongoose.connect(uri, {

}).then((err)=>console.log("connected with DB"))
.catch((err)=>console.log("not able to connect with DB", err));

// const { MongoClient } = require('mongodb');
// const client = new MongoClient(uri);

// async function connectToAtlas() {
//     try {
//         // Connect to the MongoDB cluster
//         await client.connect();

//         // Log successful connection
//         console.log('Connected to MongoDB Atlas');
//     } catch (err) {
//         // Log error if connection fails
//         console.error(err);
//     }
// }

// connectToAtlas();

//ENDPOINTS
app.get('/', (req, res) => {
    res.status(200).render('global.pug');
})

app.get('/login', (req, res) => {
    res.status(200).render('login.pug');
})

app.get('/terms', (req, res) => {
    res.status(200).render('terms.pug');
})

app.get('/pp', (req, res) => {
    res.status(200).render('pp.pug');
})

app.get('/about', (req, res) => {
    res.status(200).render('about.pug');
})

app.get('/register', (req, res) => {
    res.status(200).render('reg.pug');
})

app.post("/register", async (req, res) => {
    try {
        const pass = req.body.Password;
        const cpass = req.body.confirmpassword;

        if (pass === cpass) {
            var userdata = new Register({
                userid: req.body.userid,
                password: pass,
                confirmpassword: cpass
            })

            userdata.save((err,data)=>{
                if(err){
                    console.log(err);
                }
                else{
                    console.log("inserted successfully!");
                    res.status(201).render('global.pug');
                }
            });
            

            
        }
        else {
            res.send("passwords are not matching!");
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

app.post("/login", async (req, res) => {
    try {
        const userid = req.body.userid;
        const password = req.body.Password;

        const uid = await Register.findOne({ userid: userid });
        if (password === uid.password) {
            res.status(200).render('index.pug');
        }
        else {
            res.status(401).send("Invalid credentials!");
        }
    } catch (error) {
        res.status(401).send("Invalid credentials!");
    }
})




// START THE SERVER
app.listen(port, () => {
    console.log(`The application is started successfully ${port}`);
});