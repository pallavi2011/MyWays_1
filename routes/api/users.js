const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');

// @route POST /api/users
// @desc Register User
router.post('/',[
        check('name','Name is required').not().isEmpty(),
        check('email','Please enter valid email id').isEmail(),
        check('password','Please enter password with 6 or more characters').not().isEmpty()], async (req, res) => {

       const errors = validationResult(req);
       if(!errors.isEmpty()){
           return res.status(400).json({errors: errors.array()});
       }

       const { name, email, phone, password} = req.body;

       try {
           let user = await User.findOne({email});
           if(user){
               return res.status(400).json({msg:'User already exists'})
           }

           user = new User({
               name,
               email,
               phone,
               password
           });

           const salt = await bcrypt.genSalt(10);
           user.password = await bcrypt.hash(password, salt);
           await user.save();

           const payload = {
               user: {
                   id: user.id
               }
           }
           jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000},(err, token) => {
                if(err) throw err;
                res.json({token});
           });
         
       } catch (error) {
           res.status(500).send('Server error')
       }
        
    });

    

module.exports = router;


