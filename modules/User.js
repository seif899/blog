import mongoose from "mongoose";

const postSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    date: {type: Date , default:Date.now()},
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
});

const userSchema = new mongoose.Schema({
    _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
    name : { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    posts: { type: [postSchema], default:[]  },
});

const User = mongoose.model('User', userSchema);

export default User;