/* eslint-disable no-undef */
import express from 'express';
// eslint-disable-next-line no-undef
import mongoose from 'mongoose';
import User from './modules/User.js';

import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

import multer from 'multer';
import { nanoid } from 'nanoid';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config()

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const app = express();
app.use(cors());
app.use(bodyParser.json())
const port = 3000; 

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'images/');
  },
  filename: function (req, file, cb) {
    cb(null, nanoid() + '-' + file.originalname);
  },
});
const upload = multer({ storage: storage });




const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.c2xg3mh.mongodb.net/?retryWrites=true&w=majority`;


mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName:'blog'
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB database');
});





app.post('/signin', (req,res)=>{
  const { email, password } = req.body;

  User.findOne({ email, password })
  .then(user => {
    if (user) {
    
      res.status(200).json(user);
    } else {

      res.status(401).json({ message: 'Invalid email or password' });
    }
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
    
      
        
    
    
})

app.post("/signup", async (req,res)=>{
  const {name,email,password} = req.body;

  const newUser = new User({
    name,
    email,
    password,
    posts: [],
  });

  newUser.save()
  .then(savedUser => {
    res.status(201).json(savedUser);
  })
  .catch(error => {
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  });
  
})



app.post('/:userId/post', upload.single('image'), (req, res) => {
  const { userId } = req.params;
  const { title, content } = req.body;
  const image = req.file.filename;

  const newPost = {
    title:title,
    content:content,
    image:image
  };
  

  User.findByIdAndUpdate(userId, { $push: { posts: newPost } }, { new: true })
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    res.status(500).json(error);
  });

});


app.get('/:userId/:postId/delete',(req,res)=>{
  const {userId,postId} = req.params;

  User.findByIdAndUpdate(userId, { $pull: { posts: { _id: postId } } }, { new: true })
  .then(updatedUser => {
    res.status(200).json(updatedUser);
  })
  .catch(error => {
    res.status(500).send({error:'server error : '+ error});
  });
  
})



app.use(express.static(join(__dirname, 'dist')));

// Handle all requests and serve the React app
app.get('/', (req, res) => {
  res.sendFile(join(__dirname, 'dist', 'index.html'));
});


// eslint-disable-next-line no-undef
app.use('/images', express.static(join(__dirname, 'images')));


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});



