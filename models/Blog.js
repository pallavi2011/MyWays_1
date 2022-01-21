const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const BlogSchema = new mongoose.Schema({
    user:{
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    title:{
        type: String,
        required: true
    },
    image: { 
       type: String
    },
    name:{
        type: String
    },
    text:{
        type: String,
        required: true
    },
    likes:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            }
        }
    ],
    comments:[
        {
            user:{
                type: Schema.Types.ObjectId,
                ref:'users'
            },
            text:{
                type: String,
                required: true
            },
            name:{
                type: String
            },
            date:{
                type: Date,
                default: Date.now
            }
        }
    ],
    date:{
        type: Date,
        default: Date.now
    }

   
})

module.exports = Blog = mongoose.model('blog', BlogSchema);