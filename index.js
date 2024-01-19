import express from 'express'
import mongoose from 'mongoose';
// import booksRoute from './routes/booksRoute.js';
import { Book } from './models/bookModel.js';
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

const app  = express();
const mongoDBURL =process.env.MONGO_URL;
app.use(cors());  //first way 

// second way 
// app.use(cors({
//     origin:'http://localhost:3000',
//     method: ['GET','POST','PUT','DELETE'],
//     allowedHeaders:['Content-Type'],

// }))



app.use(express.json())

// app.use('/books',booksRoute)

app.post('/books',async (req,res)=>{
    try{
        if(
            !req.body.title||
            !req.body.author||
            !req.body.publishYear
        ){
            return res.status(400).send({
                Message:'send all required fileds'
            })
        }
        const newBook = {
            title: req.body.title,
            author: req.body.author,
            publishYear: req.body.publishYear,
        };

        const book = await Book.create(newBook)
        return res.status(201).send(book);
    }
    catch(error){
        console.log(error)
      
    }
})


// get route for all 
app.get('/books',async (req,res)=>{

try{
    const books = await Book.find({});
    // return res.status(200).json(books)
    return res.status(200).json({
        count:books.length,
        data:books
    })
}
catch(error){
    response.status(500).send({message:error.message})
}
})

// get route by id 
app.get('/books/:id',async (req,res)=>{
try{
    const {id} = req.params;
    
    const book = await Book.findById(id);
    return res.status(200).json(book);
}
catch(error){
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})

// put route for id 
app.put('/books/:id',async (req,res)=>{

try{
    if(
        !req.body.title||
        !req.body.author||
        !req.body.publishYear
    ){
        return res.status(404).send({
            Message:'send all required fileds'
        })
    }

    const {id} = req.params;
    const result  = await Book.findByIdAndUpdate(id,req.body);
    if(!result){
        return res.status(404).json({message:'book not found'})
    }
    return res.status(200).send({message:'book updated'})

}
catch(error){
    console.log(error.message)
    res.status(500).send({message:error.message})
}

})


// delete route 
app.delete('/books/:id',async (req,res)=>{
try{
    const {id} = req.params;
    const result  = await Book.findByIdAndDelete(id);
    if(!result){
        return res.status(404).json({message:'book not found'})
    }
    return res.status(200).send({message:'book deleted'})
}
catch(error){
    console.log(error.message)
    res.status(500).send({message:error.message})
}
})






mongoose.connect(mongoDBURL)
.then(()=>{
    console.log("App connected to database")

    app.listen(process.env.PORT||5555,()=>{
        console.log("server started")
    })
    // mongoose is a object data monittoring library for mongo db 
})
.catch((error)=>{
    console.log(error);
    // console.log("error")
})
// routes
app.get('/',(req,res,next)=>{
    res.send("hlo")
    return res.status(234).send("welcome")
})
// mongodb+srv://niteshnnlp:mongomongo@book-store.jqefqp0.mongodb.net/?retryWrites=true&w=majority
//mongodb+srv://niteshnnlp:<password>@book-store.jqefqp0.mongodb.net/
