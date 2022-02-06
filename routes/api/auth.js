const express = require('express');
const router = express.Router();
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../../middleware/auth');

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server error');
    }
});

// @route POST /api/auth
// @desc Login User
router.post('/',[
    check('email','Please enter valid email id').isEmail(),
    check('password','Please enter password with 6 or more characters').isLength({min: 6})], async (req, res) => {
   const errors = validationResult(req);
   if(!errors.isEmpty()){
       return res.status(400).json({errors: errors.array()});
   }

   const { email, password} = req.body;

   try {
       let user = await User.findOne({email});
       if(!user){
           return res.status(400).json({msg:'Invalid credentials'})
       }

       const isMatch = await bcrypt.compare(password, user.password);
       if(!isMatch){
        return res.status(400).json({msg:'Invalid credentials'})
       }

       const payload = {
           user: {
               id: user.id
           }
       }
       jwt.sign(payload, config.get('jwtSecret'),{expiresIn: 360000},(err, token) => {
            if(err) throw err;
            res.json({token, user});
       });
     
   } catch (error) {
       res.status(500).send('Server error')
   }
    
});



module.exports = router;

