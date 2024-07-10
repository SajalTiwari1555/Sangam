const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config()

const port = process.env.PORT; 


app.use(cors());
app.use(bodyParser.json());



mongoose.connect(process.env.MONGO_URL);

const contactSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone:String,
    message: String,
});


const Contact = mongoose.model('Contact', contactSchema);

// API endpoint to handle contact form submissions
app.post('/api/contact', async (req, res) => {
    try {
        const contact = new Contact(req.body);
        await contact.save();
        res.status(200).send({ message: 'Contact saved successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Error saving contact' });
    }
});

app.get("/",(req,res)=>{
    res.send(`<h1>the home page</h1>`)
})


app.listen(port,()=>{
    console.log(`server is running ${port}`)
})