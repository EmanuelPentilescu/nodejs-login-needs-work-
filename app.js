//------ IMPORTS ------
const express= require('express');
const path= require('path');
const { rootCertificates } = require('tls');
const dotenv= require("dotenv");
dotenv.config({path: './.env'});
const cryptr = require('crypto-js');

const app=express();

// ---- DATA BASE CREATE CONNECTION ----
const User = require('./models/user');
const sequelize = require('./util/database');


//--- VIEW ENGINE -------
const PublicDirectory = path.join(__dirname, './public'); 
app.use(express.static(PublicDirectory));

//Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({extended: false}));
//Parse JSON bodies
app.use(express.json());

app.set('view engine', 'hbs'); 




//--- DEFINE ROUTES
app.use('/', require('./routes/pages'));
app.use('/auth', require('./routes/auth'));


//{force:true}
//app.use('/auth', require('./routes/auth'));

// --- DATA BASE CONNECTION ---
sequelize.sync().then(result => {
     console.log("Database is connected");
}).then(result => {
    app.listen(3000);
}).catch(err => {
    console.log(err);
});