var User = require('../models/user');
const nodemailer = require("nodemailer");
var i18n = require('i18n');

exports.recover = async(req, res) => {
    i18n.setLocale("en");
    var meta_ = i18n.__('meta');
    User.findOne({email: req.body.email})
        .then(user => {
            if (!user) return res.render('recovery',{success: false, meta :meta_, message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

            //Generate and set password reset token
            //user.gene
            user.generatePasswordReset();

            // Save the updated user object
            user.save()
                .then(async user => {
                    // send email
                    let link = "http://" + req.headers.host + "/user/reset/" + user.resetPasswordToken;
                    // let testAccount = await nodemailer.createTestAccount();
                    
                    
                    let transporter = nodemailer.createTransport({
                        host: "smtp.gmail.com",
                        port: 587,
                        secure: false, // true for 465, false for other ports
                        auth: {
                          user: process.env.FROM_EMAIL, // generated ethereal user
                          pass: process.env.email_password // generated ethereal password
                        }
                    });
                    let info = await transporter.sendMail({
                        from: process.env.FROM_EMAIL, // sender address
                        to: user.email, // list of receivers
                        subject: "Password change request", // Subject line
                        text: `Hi ${user.first_name} \n 
                        Please click on the following link ${link} to reset your password. \n\n 
                        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    });
                    // const mailOptions = {
                    //     to: user.email,
                    //     from: process.env.FROM_EMAIL,
                    //     subject: "Password change request",
                    //     text: `Hi ${user.first_name} \n 
                    // Please click on the following link ${link} to reset your password. \n\n 
                    // If you did not request this, please ignore this email and your password will remain unchanged.\n`,
                    // };
                    i18n.setLocale("en");
                    var meta_ = i18n.__('meta');
                    res.render('recovery',{success: false, meta :meta_, message: 'A reset email has been sent to ' + user.email + "."});
                    //res.status(200).json({message: 'A reset email has been sent to ' + user.email + info.messageId+  '.'});
                    // sgMail.send(mailOptions, (error, result) => {
                    //     if (error) return res.status(500).json({message: error.message});

                    //     res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
                    // });
                })
                //.catch(err => res.status(500).json({message: err.message}));
                .catch(err => res.render('recovery',{success: false, meta :meta_, message: err.message}));
        })
        .catch(err => res.render('recovery',{success: false, meta :meta_, message: err.message}));
};


// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = (req, res) => {
    
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
        .then((user) => {
            i18n.setLocale("en");
            var meta_ = i18n.__('meta');
            if (!user) return res.render('recovery',{success: false, meta :meta_, message: 'Password reset token is invalid or has expired.'});
            i18n.setLocale("en");
            var meta_ = i18n.__('meta');
            //Redirect user to form with the email address
            res.render('reset', {user, success: false, meta :meta_});
        })
        .catch(err =>  res.render('recovery',{success: false, meta :meta_, message: err.message}));
};


// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = (req, res) => {
    User.findOne({resetPasswordToken: req.params.token, resetPasswordExpires: {$gt: Date.now()}})
        .then(async (user) => {
            i18n.setLocale("en");
            var meta_ = i18n.__('meta');
            if (!user) return res.render('reset', {user, success: false, meta :meta_, message: 'Password reset token is invalid or has expired.'});

            //Set the new password
            user.password = req.body.password;
            user.resetPasswordToken = undefined;
            user.resetPasswordExpires = undefined;

            // Save
            user.save(async (err) => {
                i18n.setLocale("en");
                var meta_ = i18n.__('meta');
                if (err) return res.status(500).json({message: err.message});

                let transporter = nodemailer.createTransport({
                    host: "smtp.gmail.com",
                    port: 587,
                    secure: false, // true for 465, false for other ports
                    auth: {
                      user: process.env.FROM_EMAIL, // generated ethereal user
                      pass: process.env.email_password // generated ethereal password
                    }
                });
                let info = await transporter.sendMail({
                    from: process.env.FROM_EMAIL, // sender address
                    to: user.email, // list of receivers
                    subject: "Password change request", // Subject line
                    subject: "Your password has been changed",
                    text: `Hi ${user.username} \n 
                    This is a confirmation that the password for your account ${user.email} has just been changed.\n`
                });
                res.render('reset', {user, success: false, finish:true, meta :meta_, message: 'Your password has been updated.'});
                // send email
                // const mailOptions = {
                //     to: user.email,
                //     from: process.env.FROM_EMAIL,
                //     subject: "Your password has been changed",
                //     text: `Hi ${user.username} \n 
                //     This is a confirmation that the password for your account ${user.email} has just been changed.\n`
                // };
                // res.status(200).json({message: 'Your password has been updated.'});

                // sgMail.send(mailOptions, (error, result) => {
                //     if (error) return res.status(500).json({message: error.message});

                //     res.status(200).json({message: 'Your password has been updated.'});
                // });
            });
        });
};
