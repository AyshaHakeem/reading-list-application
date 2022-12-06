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
    
    // mongoose
    mongoose.connect(url, { useNewUrlParser: true })
    const db = mongoose.connection
    db.once('open', result=>{

        // middle ware
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended : true }))
        app.use(bodyParser.json())
        app.set('view engine', 'ejs')
        
        async function findBook(){
            const b1 = await Book.find()
            console.log(b1)
        }
        
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
            .then((result)=>{
                console.log('Book added')
                response.redirect('/')
            })
            .catch(err=> console.error(err))
        })

    })
    .on('error',err=>console.error(err))
    
})

/*

// database// database
    
    db.once('open', ()=> {
        console.log('Connected to Database: ' + url)
        // middle ware
        app.set('view engine', 'ejs')
        app.use(express.static('public'))
        app.use(bodyParser.urlencoded({ extended : true }))
        app.use(bodyParser.json())
       

    })
    db.on('error', e =>{
        console.log('Connection error: '+ e )
    })
    
    // schema
    const b1 = new Book({
        name: 'Tuesdays with Morrie',
        author: 'Mitch Albom'
    })
    b1.save((err,doc)=>{
        err? console.error(err) : console.log(doc)
    })
*/

