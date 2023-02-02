const jwt= require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const e = require('express');

const User = require('../models/user');


const nodemailer = require('nodemailer');

exports.register =async (req, res)  => {
    const name=req.body.name;
    const email=req.body.email;
    const password=req.body.password;
    const passwordConfirm= req.body.password;
    let user;
    /*
    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'youremail@gmail.com',
        pass: 'yourpassword'
      }
    });
    */
     try{
        
        const emailcheck = await User.findOne({
            where: {
                email: req.body.email,
            },
        });

        if (emailcheck) {
            return res.json("Email already in use").send("Authentication failed");
        }
        
        if(password===passwordConfirm)
        {
        let hashedPassword= await  bcrypt.hash(password, 8);
        console.log(hashedPassword);
        user= User.create({name: name, email: email, password: hashedPassword});
        } else
        {
            return res.json("Passwords does not match").send("Auth failed");
        }
        /*
        let mailOptions = {
            from: 'youremail@gmail.com',
            to: user.email,
            subject: 'Subject of your email',
            html: '<p>Testing</p>'
          };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ');
            }
          });
          */
          if(user){
            res.redirect('/');
            return user;
          }
            
          else
            res.redirect('/');
     }catch(err){ 
        console.log(err);
     };  
}



exports.login= async (req, res) => {
    const email= req.body.email;
    const password=req.body.password;
  try {

    // Cautarea unui utilizator cu acea adresa de email
    const user = await User.findOne({ where: { email: email } });
    if (!user) {
        return res.json("Email does not exist").send("Auth failed");
    }
    // Verificarea parolei
    const passwordIsValid = await bcrypt.compare(password, user.password);
    if (!passwordIsValid) {
        return res.json("Password does not match the email").send("Auth failed");
    }
    
    if(user)
    {
        res.redirect('/')
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! /n");
        console.log(user.email + "  " + user.password);
        console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! /n");
        return user;
    }
    
    return res.json("Auth failed, try again").send("Auth failed");

   
  } catch (error) {
    console.error(error);
    throw error;
  }
}


// const db=mysql.createConnection({
//     host: process.env.DATABASE_HOST,
//     user: process.env.DATABASE_USER,
//     password: process.env.DATABASE_PASSWORD,
//     database: process.env.DATABASE
    
// });

// exports.register= (req, res) => {
//     console.log(req.body);
//     /*
//     const name=req.body.name;
//     const email=req.body.email;
//     const password=req.body.password;
//     const passwordConfirm= req.body.password;
//     */
//     const {name, email, password, passwordConfirm} = req.body;

//     db.query('SELECT email FROM users WHERE email = ?', [email], async (err, result) => {
//         if(err){
//             console.log(err);
//         }
//         if(result.length > 0){
//             return res.render('register', {
//                 message:'That email is already taken'
//             });
//         }
//         else if(password !== passwordConfirm){
//             return res.render('register', {
//                 message:'Password do not match'
//             });
//         }

//         let hashedPassword= await bcrypt.hash(password,8);
//         console.log(hashedPassword);

        
//         db.query('INSERT INTO users SET ?', {name: name, email:email, password:hashedPassword}, (err, result)=>{
//             if(err){
//                 console.log(err);
//             } else {
//                 console.log(result);
//                 return res.render('register', {
//                     message: 'User registered'
//                 });
//             }
//         });
//     });
//    // res.send("Form submitter");
// };
