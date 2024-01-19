import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router(); 


// using async  for mongo 

// post route for post book 
router.post('/',async (req,res)=>{
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
router.get('/',async (req,res)=>{

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
router.get('/:id',async (req,res)=>{
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
router.put('/:id',async (req,res)=>{

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
router.delete('/:id',async (req,res)=>{
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

export default booksRoute;