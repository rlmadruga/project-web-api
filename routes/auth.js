require('dotenv').config();

const express = require('express');
const passport = require('passport');
const router = express.Router();
const User = require('../models/User');
// const ensureLogin = require('connect-ensure-login');
const nodemailer = require('nodemailer');

//BCRYPT
const bcrypt = require('bcrypt');
const bcryptSalt = 10;

//NODEMAILER
let env = process.env.SITE;
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
    console.log(env);
    res.render('auth/signup');
});

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
        res.render("auth/signup", { message: "Por favor, preencha todos os campos." });
        return;
    }

    //CHECKING NEW USER
    User.findOne({username}, "username", (err, user) => {
        
        if(user !== null){
            res.render("auth/signup" , {message: "O nome de usuário e/ou e-mail já existem!" });
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
                from: '"Nodemailer " <statuscar@webapi.com>',
                to: user.email, 
                subject: 'Confirmação de cadastro em StatusCar', 
                text: `${env}/auth/confirmation/${user.confirmationCode}`,
                html: ` <!doctype html>
                <html>
                  <head>
                    <meta name="viewport" content="width=device-width">
                    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
                    <title>Simple Transactional Email</title>
                    <style>
                @media only screen and (max-width: 620px) {
                  table[class=body] h1 {
                    font-size: 28px !important;
                    margin-bottom: 10px !important;
                  }
                  table[class=body] p,
                table[class=body] ul,
                table[class=body] ol,
                table[class=body] td,
                table[class=body] span,
                table[class=body] a {
                    font-size: 16px !important;
                  }
                  table[class=body] .wrapper,
                table[class=body] .article {
                    padding: 10px !important;
                  }
                  table[class=body] .content {
                    padding: 0 !important;
                  }
                  table[class=body] .container {
                    padding: 0 !important;
                    width: 100% !important;
                  }
                  table[class=body] .main {
                    border-left-width: 0 !important;
                    border-radius: 0 !important;
                    border-right-width: 0 !important;
                  }
                  table[class=body] .btn table {
                    width: 100% !important;
                  }
                  table[class=body] .btn a {
                    width: 100% !important;
                  }
                  table[class=body] .img-responsive {
                    height: auto !important;
                    max-width: 100% !important;
                    width: auto !important;
                  }
                }
                @media all {
                  .ExternalClass {
                    width: 100%;
                  }
                  .ExternalClass,
                .ExternalClass p,
                .ExternalClass span,
                .ExternalClass font,
                .ExternalClass td,
                .ExternalClass div {
                    line-height: 100%;
                  }
                  .apple-link a {
                    color: inherit !important;
                    font-family: inherit !important;
                    font-size: inherit !important;
                    font-weight: inherit !important;
                    line-height: inherit !important;
                    text-decoration: none !important;
                  }
                  #MessageViewBody a {
                    color: inherit;
                    text-decoration: none;
                    font-size: inherit;
                    font-family: inherit;
                    font-weight: inherit;
                    line-height: inherit;
                  }
                  .btn-primary table td:hover {
                    background-color: #34495e !important;
                  }
                  .btn-primary a:hover {
                    background-color: #34495e !important;
                    border-color: #34495e !important;
                  }
                }
                </style>
                  </head>
                  <body class="" style="background-color: #f6f6f6; font-family: sans-serif; -webkit-font-smoothing: antialiased; font-size: 14px; line-height: 1.4; margin: 0; padding: 0; -ms-text-size-adjust: 100%; -webkit-text-size-adjust: 100%;">
                    <span class="preheader" style="color: transparent; display: none; height: 0; max-height: 0; max-width: 0; opacity: 0; overflow: hidden; mso-hide: all; visibility: hidden; width: 0;">This is preheader text. Some clients will show this text as a preview.</span>
                    <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="body" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background-color: #f6f6f6; width: 100%;" width="100%" bgcolor="#f6f6f6">
                      <tr>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                        <td class="container" style="font-family: sans-serif; font-size: 14px; vertical-align: top; display: block; max-width: 580px; padding: 10px; width: 580px; margin: 0 auto;" width="580" valign="top">
                          <div class="content" style="box-sizing: border-box; display: block; margin: 0 auto; max-width: 580px; padding: 10px;">
                            <!-- START CENTERED WHITE CONTAINER -->
                            <table role="presentation" class="main" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; background: #ffffff; border-radius: 3px; width: 100%;" width="100%">
                              <!-- START MAIN CONTENT AREA -->
                              <tr>
                                <td class="wrapper" style="font-family: sans-serif; font-size: 14px; vertical-align: top; box-sizing: border-box; padding: 20px;" valign="top">
                                  <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                    <tr>
                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Olá, ${user.username}</p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Você realizou seu cadastro em StatusCar. Por favor, confirme seu e-mail clicando no link abaixo:</p>
                                        <table role="presentation" border="0" cellpadding="0" cellspacing="0" class="btn btn-primary" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; box-sizing: border-box; width: 100%;" width="100%">
                                          <tbody>
                                            <tr>
                                              <td align="left" style="font-family: sans-serif; font-size: 14px; vertical-align: top; padding-bottom: 15px;" valign="top">
                                                <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: auto;">
                                                  <tbody>
                                                    <tr>
                                                      <td style="font-family: sans-serif; font-size: 14px; vertical-align: top; border-radius: 5px; text-align: center; background-color: #3498db;" valign="top" align="center" bgcolor="#3498db"> <a href="${env}/auth/confirmation/${user.confirmationCode}" target="_blank" style="border: solid 1px #3498db; border-radius: 5px; box-sizing: border-box; cursor: pointer; display: inline-block; font-size: 14px; font-weight: bold; margin: 0; padding: 12px 25px; text-decoration: none; text-transform: capitalize; background-color: #3498db; border-color: #3498db; color: #ffffff;">Clique aqui!</a> </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                              </td>
                                            </tr>
                                          </tbody>
                                        </table>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;"></p>
                                        <p style="font-family: sans-serif; font-size: 14px; font-weight: normal; margin: 0; margin-bottom: 15px;">Obrigado! Nos vemos em breve.</p>
                                      </td>
                                    </tr>
                                  </table>
                                </td>
                              </tr>
                            <!-- END MAIN CONTENT AREA -->
                            </table>
                            <!-- END CENTERED WHITE CONTAINER -->
                            <!-- START FOOTER -->
                            <div class="footer" style="clear: both; margin-top: 10px; text-align: center; width: 100%;">
                              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="border-collapse: separate; mso-table-lspace: 0pt; mso-table-rspace: 0pt; width: 100%;" width="100%">
                                <tr>
                                  <td class="content-block" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                    <span class="apple-link" style="color: #999999; font-size: 12px; text-align: center;">StatusCar, Ironhack, São Paulo - SP - BR</span>
                                    <br> Don't like these emails? <a href="http://i.imgur.com/CScmqnj.gif" style="text-decoration: underline; color: #999999; font-size: 12px; text-align: center;">Unsubscribe</a>.
                                  </td>
                                </tr>
                                <tr>
                                  <td class="content-block powered-by" style="font-family: sans-serif; vertical-align: top; padding-bottom: 10px; padding-top: 10px; color: #999999; font-size: 12px; text-align: center;" valign="top" align="center">
                                    Powered by <a href="http://htmlemail.io" style="color: #999999; font-size: 12px; text-align: center; text-decoration: none;">HTMLemail</a>.
                                  </td>
                                </tr>
                              </table>
                            </div>
                            <!-- END FOOTER -->
                          </div>
                        </td>
                        <td style="font-family: sans-serif; font-size: 14px; vertical-align: top;" valign="top">&nbsp;</td>
                      </tr>
                    </table>
                  </body>
                </html>`  
            })
            .then(info => {
                console.log(info);
                res.redirect('/thankyou');
            })
            .catch(err => console.log(err))//CLOSING SEND EMAIL
    
        })
        .catch(err => {
            console.log(err);
            res.render("auth/signup", { message: "Não foi possível cadastrar o usuário! Tente de novo!" });
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
  failureRedirect: "/auth/login",
  failureFlash: true,
  passReqToCallback: true
}));

//CONFIRMATION ------------------------------------------
router.get('/confirmation/:confirmCode', (req, res, next) => {
    
    const {
        confirmCode
    } = req.params;

    User.findOneAndUpdate({confirmationCode: confirmCode}, {$set: {status: 'Ativo'}}, {new: true})
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