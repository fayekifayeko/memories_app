import {bcrypt} from 'bcryptjs';
import Jwt from 'jsonwebtoken';
import User from '../models/user';

export const signup = async (req, res) => {
  
    try {
        
        const {email, firstName, lastName, password, confirmPassword} = req.body;
        const existingUser = User.findOne({email});
        if(existingUser) return res.status(400).json({message: 'The user already exists!'});
        if(password!==confirmPassword) res.status(400).json({message: 'The passwords do not match!'});
        const hashedPassword = bcrypt.hash(password, 12);
        const result = await User.create({email, password: hashedPassword, name: `${firstName} ${lastName}`});
        const token = Jwt.sign({email: result.email, id: result._id}, 'key_should_be_inside_env_file', {expireIn: '1h'});
        res.status(200).json({result, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
}

export const signin = async (req, res) => {
   
    try {
        const {email, password} = req.body;
        const existingUser = User.findOne({email});

        if(!existingUser) return res.status(404).json({message: 'The user does not exist!'});

        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);

        if(!isPasswordCorrect) return res.status(404).json({message: 'Invalid credentials!'});

        const token = Jwt.sign({email: existingUser.email, id: existingUser._id}, 'key_should_be_inside_env_file', {expireIn: '1h'});

        res.status(200).json({result: existingUser, token});
    } catch (error) {
        res.status(500).json({message: 'Something went wrong!'});
    }
}