import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Register 
export const register = async (req, res) => {  //req это то что приходит со стороны клиента с запросом, res это ответ бэкенда на зaпрос
    try {
        const {username, password, studentname, studentlastname} = req.body
        const isUsed = await User.findOne({username});  //все запросы и все взаимодейтсвие с сервером асинхронно

        if(isUsed){
            return res.json({
                message: 'Name is busy, try to another name'
            });
        }

        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);

        const newUser = new User({
            username,
            studentname,
            studentlastname,
            password: hash,
        })

        const token = jwt.sign(
            {id: newUser._id},
            process.env.JWT_SECRET || 'hjkshdcjh43jkkhk9sdsufj7',
            {expiresIn: '30d'}
        );

        await newUser.save()
        
        res.json({
            newUser,
            token,
            message: 'Registration went success'
        })
    } catch (error) {
        res.json({ message: `Something went wrong, user not created`})
    }
}

//Login
export const login = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = await User.findOne({username});
        if(!user){
            return res.json({
                message: "User with this login does not exist"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if(!isPasswordCorrect){
            return res.json({
                message: "Password is incorrect"
            })
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET || 'hjkshdcjh43jkkhk9sdsufj7',
            {expiresIn: '30d'}
        );

        res.json({
            token,
            user,
            message: "You are logged success"
        })
    
    } catch (error) {
        console.log(error);
    }
}

//Get me
export const getMe = async (req, res) => {
    try {
        const user = await User.findById(req.userId);
        if(!user){
            return res.json({
                message: "User with this login does not exist"
            })
        }
        const token = jwt.sign(
            {id: user._id},
            process.env.JWT_SECRET|| 'hjkshdcjh43jkkhk9sdsufj7',
            {expiresIn: '30d'}
        );
        return res.json({
            user,
            token
        })
    } catch (error) {
        res.json({
            message: "Not access"
        })
    }
}


//Get all
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.json({
            users
        });
    } catch (error) {
        res.json({
            message: "Not access"
        });
    }
}
