import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
    username: {type: String},
    title: {type: String, required: true},
    text: {type: String, required: true},
    imgUrl: {type: String, default: ''},
    views: {type: Number, default: 0},
    author: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    comments: [{type: mongoose.Schema.Types.ObjectId, ref: 'Comment'}],
    team: {type: String, default: ''},  //попробовать сделать массив с членами команды
    downdloadLink: {type: String, default: ''},   //ссылка либо на одевздаварну либо на летецкоу почту
    // evaluation: {type: String},
    phase1: {type: String},
    phase2: {type: String},
    phase3: {type: String},
}, 
    {timestamps: true}
)

export default mongoose.model('Project', ProjectSchema);