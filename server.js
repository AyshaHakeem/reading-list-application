const express= require('express')
const bodyParser = require('body-parser')
const app = express() 
const PORT = 3000
// mongoose
const mongoose = require('mongoose')
const Book = require('./models/Book')

require('dotenv').config()
const url = process.env.DB_connectionString

app.listen(process.env.port || PORT , ()=>{
    console.log('listening')
})

    
// mongoose
mongoose.connect(url, { useNewUrlParser: true })
const db = mongoose.connection
db.once('open', result=>{
    console.log('connection established to db')
})
.on('error',err=>console.error(err))

// middle ware
app.use(express.static('public'))
app.use(bodyParser.urlencoded({ extended : true }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')

        
app.get('/', async (req,res)=>{

    await Book.find()
    .then(result => {
        res.render('index.ejs', {result})
    })
    .catch()
    
})

app.post('/addBook', async (req,response)=>{
    let userInput = new Book({
        name : req.body.bookName,
        author: req.body.author
    })

    await userInput.save()
    .then(async (result)=>{
        console.log('Book added')
        response.redirect('/')
    })
    .catch(err=> console.error(err))
})

app.delete('/deleteBook',  async (req,res)=>{
    const deleted = await Book.findOneAndDelete({name: req.body.bookName})
    console.log('Book removed')
    res.redirect('/')
})


    


