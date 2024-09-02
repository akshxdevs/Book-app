const express = require("express");
const router = express.Router();
const User  = require("../schema/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const SECRET = process.env.SECRET; 



router.post("/login",async (req,res) => {
    try {
        const {email,password} = req.body;
        const user = await User.findOne({email});

        if (!user) {
            return res.status(401).json({error:"User not found!!"});    
        }
        const pwdMatch = await bcrypt.compare(password,user.password);
        if (!pwdMatch) {
            return res.status(401).json({error:"Incorrect Password!!"});  
        }
        const token = jwt.sign(
            {
                email: user.email,
                _id:user._id,
            },
            SECRET
        );

        res.json({
            token,
            user:{
                _id:user._id,
                name:user.name,
                email:user.email
            },
        });

    } catch (error) {
        console.log(error.message);
        res.status(500).json({error:"Internal server error!!"})
    }
});

module.exports = router;