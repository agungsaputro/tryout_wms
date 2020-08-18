const { user } = require("../models");
const jwt = require('jsonwebtoken');
const express = require('express');


const passport = require('passport');
const passportJWT = require('passport-jwt');

//nodemailer
const nodemailer = require("nodemailer");

//node-cron
const cron = require("node-cron");

let ExtractJwt = passportJWT.ExtractJwt;
let JwtStrategy = passportJWT.Strategy;

let jwtOptions = {};
jwtOptions.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
jwtOptions.secretOrKey = 'wowwow';


// lets create our strategy for web token
let strategy = new JwtStrategy(jwtOptions, function(jwt_payload, next) {
    console.log('payload received', jwt_payload);
    let user = getUser({ id: jwt_payload.id });
  
    if (user) {
      next(null, user);
    } else {
      next(null, false);
    }
  });
  // use the strategy
  passport.use(strategy);
  
  const app = express();
  // initialize passport with express
  app.use(passport.initialize());

  //mailer
const transporter = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
    user: "1165c4e810f68e",
    pass: "b5ae0cd6e997ff"
  }
})

  const response = {
    status : true,
    message: "",
    data:[]
}

const getUser = async obj => {
 return await User.findOne({
      where: obj,
    });
};

class userRegister{
    static async register(req,res){
        const {username, email, password} = req.body;

        try{
            const postUser = await user.create({
            username:username,
            password:password,
            email:email
            })
            console.log(postUser);
            response.message = "success"
            res.status(201).json(response);
        }catch(err){
            response.status = false;
            response.message = err.message;
            res.status(400).json(response);
        }
        cron.schedule("1 * * * * *", function(){
            console.log("---------------------");
            console.log("Running Cron Job");
            const mailOptions = {
              from: "COMPANYEMAIL@gmail.com",
              to: email,
              subject: "Report",
              html : "<p>report</p>",
            };
            transporter.sendMail(mailOptions, function(error, info) {
              if (error) {
                throw error;
              } else {
                console.log("Email successfully sent!");
              }
            });
          });
    }

    static async login(req,res){
        const { name, password, email } = req.body;

        if(email && password){
            let user = await getUser({email:email});
            if(!user){
                res.status(400).json({message: 'No such user found'});
            }
            if(user.password === password){
                let payload = {id: user.id};
                let token = jwt.sign(payload,jwtOptions.secretOrKey);
                res.json({msg: 'ok', token:token});
            }else{
                res.status(400).json({message: 'password is incorrect'});
            }
        }
    }
}

module.exports = userRegister;

