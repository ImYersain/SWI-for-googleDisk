import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema({
        username: {
            type: String,
            required: true,
            unique: true
        },
        studentname: {
            type: String,
            required: true,
        },
        studentlastname: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true
        },
        projects: [{
            type: mongoose.Schema.Types.ObjectId, //здесь ссылка на другую схему с постами, то есть пост типа пост
            ref: 'Projects',  //название схемы на которую ссылаемся
        }]
    },
    {timestamps: true} // для остлеживания истории создания поста, редактирования, удаления
)

export default mongoose.model('User', UserSchema); 