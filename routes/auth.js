const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
const ensureLogin = require('connect-ensure-login');
const nodemailer = require('nodemailer');

//BCRYPT
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//NODEMAILER
const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS
    }
});

//SIGN UP -------------------------------------------
router.get("/signup", (req, res, next) => {
    res.render('auth/signup');
})

//SIGN UP - POST
router.post('/signup', (req, res, next) => {
    
    const username = req.body.username;
    const password = req.body.password;
    const email    = req.body.email;
    
    //CONFIRMATION CODE
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let token = '';
    for (let i = 0; i < 25; i++) {
     token += characters[Math.floor(Math.random() * characters.length )];
    }

    const confirmationCode = token;
   
    //CHECKING EMPTY USER OR PASSWORD
    if (username === "" || password === "") {
        res.render("auth/signup", { message: "Indicate username and password" });
        return;
    }

    //CHECKING NEW USER
    User.findOne({username}, "username", (err, user) => {
        
        if(user !== null){
            res.render("auth/signup" , {message: "The username already exists!" });
            return;
        }

        const salt = bcrypt.genSaltSync(bcryptSalt);
        const hashPass = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username, 
            email,
            password: hashPass,
            confirmationCode,
        });

        //SAVING NEW USER
        newUser.save()
        .then(user => {

            transport.sendMail({
                from: '"Nodemailer " <task@webapi.com>',
                to: user.email, 
                subject: 'Task: Confirmation Code', 
                text: `http://localhost:3000/auth/confirmation/${user.confirmationCode}`,
                html: '<b>Awesome Message</b>'  
            })
            .then(info => {
                console.log(info);
                res.redirect('/auth/login');
            })
            .catch(err => console.log(err))//CLOSING SEND EMAIL
    
        })
        .catch(err => {
            console.log(err);
            res.render("auth/signup", { message: "Unabled to save new user!" });
        }) //CLOSING NEWUSER SAVE
    }); //CLOSING FINDONE
}); //CLOSING SIGNUP POST

//LOGIN -------------------------------------------------
router.get('/login', (req, res, next) => {
    res.render('auth/login', {message: req.flash("error") });
});

//LOGIN - POST
router.post('/login', passport.authenticate("local", {
  successRedirect: "/dashboard",
  failureRedirect: "/login",
  failureFlash: true,
  passReqToCallback: true
}));

//CONFIRMATION ------------------------------------------
router.get('/confirmation/:confirmCode', (req, res, next) => {
    
    const {
        confirmCode
    } = req.params;

    User.findOneAndUpdate({confirmationCode: confirmCode}, {$set: {status: 'Active'}}, {new: true})
        .then( user => {
            res.render('confirmation', {user});
        })
        .catch(err => console.log(err))
});

//DASHBOARD --------------------------------------------
// router.get('/dashboard', ensureLogin.ensureLoggedIn(), (req, res, next) => {
  
//     console.log(req.user);
//     res.render('dashboard', {user: req.user});
// });

//LOGOUT -----------------------------------------------
router.get("/logout", (req, res) => {
    req.logout();
    res.redirect("/");
});
  
module.exports = router;