import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const registerUser = async(req, res) => {
    try{

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
        })
        await newUser.save()
        res.status(200).send("User has been created!")
    }catch(err){
        res.status(500).json(err);
    }
}

export const login = async(req, res) => {
    try{
        
        const user = await User.findOne({
            username: req.body.username
        });

        if(!user){
            res.status(404, "User not found in our database!")
        };

        const isPasswordValid = await bcrypt.compare(req.body.password, user.password);

        if(!isPasswordValid){
            res.status(400, "Wrong username or password!")
        }

        const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT)

        const {password, isAdmin, ...otherDetails} = user._doc
    
        res
        .cookie("access_token", token, {
            httpOnly: true,
        })
        .status(200)
        .json({details:{...otherDetails}, isAdmin})
    
    }catch(err){
        res.status(500).json(err);
    }
}