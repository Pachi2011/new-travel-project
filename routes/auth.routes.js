
// const router = require('express').Router()
// const bcrypt = require('bcryptjs')
// const User = require('../models/User.model')
// const saltRounds = 10
// const mongoose = require('mongoose')

// router.get('/signup', (req, res) => {
//     res.render('auth/signup')
// })

// router.post('/signup', (req, res,next) => {
//     console.log(req.body)

//     const { email, password } = req.body

//     //checking if all the required fields are filled in
//     if (!email || !password) {
//         res.render('auth/signup', { errorMessage: "Please fill in all mandatory fields. Email and Password are required" })
//         return
//     }

//     //validate that the user password is at least 6 characters long and has 1 capital letter and 1 lowercase letter
//     const regex = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
//     if(!regex.test(password)){
//         res.render('auth/signup',{errorMessage: "Please input a password: at least 6 characters long, with a lowercase and uppercase letter"})
//         return
//     }


//     bcrypt
//         .genSalt(saltRounds)
//         .then((salt) => {
//             console.log("Salt: ", salt)
//             //hash() is the method that hashes/encrypts our password
//             //takes two arguements: 1. is the password 2. is the salt
//             return bcrypt.hash(password, salt)
//         })
//         .then(hashedPassword => {
//             console.log("Hashed Password: ", hashedPassword)
//           return  User.create({
//                 email: email,
//                 passwordHash: hashedPassword
//             })
//         })
//         .then(()=>{
//             res.redirect('/profile')

//         })

//         .catch(error => {
//             //Check if any of our mongoose validators are not being met
//             if (error instanceof mongoose.Error.ValidationError) {
//                 res.status(500).render('auth/signup', { errorMessage: error.message });
//             }
//             //Check if the email is already registered with our website
//             else if(error.code === 11000){
//                 res.render('auth/signup',{errorMessage:"There is already an account associated with this emaail please sign in or sign up with new email"})
//             }
//              else {
//                 next(error);
//             }
//         }); // close .catch()
// }) // close .post()


// router.get('/login',(req,res)=>{
//     res.render('auth/login')
// })

// router.get('/profile', (req, res) => {
    
//     res.render('user/user-profile', { userInSession: req.session.currentUser })
// })

// router.post('/login',(req,res)=>{
//     console.log('SESSION =====> ', req.session);
//     console.log(req.body)
//     const {email,password} = req.body

//     //first we are checking if the user filled in all the required fields
//     if(!email || !password){
//         res.render('auth/login',{errorMessage:'please enter an email or password'})
//     return
//     }
//     //second we are checking if the email is already registered with our website
//     User.findOne({email})
//     .then(user=>{
//         console.log(user)
//         if(!user){
//             res.render('auth/login',{errorMessage:"User not found please sign up. No account associated with email"})
//         }
//         //compareSync() is used to compare the user inputted password with the hashed password in the database
//         else if(bcrypt.compareSync(password,user.passwordHash)){
//             req.session.currentUser = user;
 
//         res.redirect('/profile');
//         }
//         else{
//             res.render('auth/login',{errorMessage:"Incorrect Password"})
//         }

//     })
//     .catch(error=>{
//         console.log(error)
//     })


// })

// // router.get('/about-me', (req,res)=>{
// //     res.render
// // })

// module.exports = router
