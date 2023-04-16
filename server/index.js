import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors'; 
import authRoute from './routes/auth.js';
import projectRoute from './routes/projects.js';
import commentRoute from './routes/comment.js'
import fileUpload from 'express-fileupload';

const app = express();
dotenv.config();

// Constants
const PORT = process.env.PORT || 3007;
const DB_USER = process.env.DB_USER || 'test';
const DB_PASSWORD = process.env.DB_PASSWORD || 'test123';
const DB_NAME = process.env.DB_NAME || 'swi-bp';


// Middleware 
app.use(cors()) 
app.use(fileUpload()) 
app.use(express.json())
app.use(express.static('uploads'))

// Routes (http://localhost:3007)
app.use('/api/auth', authRoute)
app.use('/api/projects', projectRoute)
app.use('/api/comments', commentRoute)

app.get('/', (req,res) => {
    return res.json({message: 'OK'})
})

async function start() {
    try {
        await mongoose.connect(
            `mongodb+srv://${DB_USER}:${DB_PASSWORD}@cluster0.ytwdmv8.mongodb.net/${DB_NAME}?retryWrites=true&w=majority`
        )
        app.listen(PORT, () => {
            console.log(`Server was started on port: ${PORT}`)
        })
    } catch (error) {
        console.log(error);
    }
}

start();
