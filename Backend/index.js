require('dotenv').config()
const express = require('express')
const app = express()
const Person = require('./models/person')
const cors = require('cors')
const morgan = require('morgan')
app.use(express.static('dist'))
app.use(express.json())
app.use(cors())

// let persons = [
//     {
//         id: "1",
//         name: "Shravani",
//         number: "1234565"
//     },
//     {
//         id: "2",
//         name: "Mrunal",
//         number: "5445453"
//     },
//     {
//         id: "3",
//         name: "Aditya",
//         number: "8976765"
//     }
// ]




morgan.token('body', (req) => req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :response-time ms - :body'))


app.get('/', (req, res) => {
    res.send('<h1>Welcome to PhoneBook</h1>')
})

app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons)
    })
})

const timeOfReq = new Date().toString()
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${timeOfReq}</p>`)
})

app.get('/api/persons/:id', (req, res,next) => {
    Person.findById(req.params.id).then(person => {
        res.json(person)
    })
    .catch(error=>next(error))

})

app.delete('/api/persons/:id', (req, res) => {
    Person.findByIdAndDelete(req.params.id).then(result=>{
        res.status(204).end()
    })
})


app.post('/api/persons', (req, res,next) => {
    const body = req.body
    console.log(body)

    if (!(body.name && body.number)) {
        return res.status(400).json(
            {
                error: "Enter Both field"
            }
        )
    }
    
    const person = new Person({
        name: body.name,
        number: body.number
    })
    person.save().then(savedPerson=>{
        res.json(savedPerson)
    })
    .catch(error=>next(error))
})

app.put('/api/persons/:id',(req,res,next)=>{
    const {name,number} = req.body

    Person.findById(req.params.id).then(person=>{
        if(!person){
            return res.status(404).end()
        }

        person.name = name
        person.number = number

        person.save().then((updatedPerson)=>{
            res.json(updatedPerson)
        })
        .catch(error=>next(error))
    })
})

const errorHandler = (error,req,res,next) =>{
    console.log(error.name)
    if(error.name === 'CastError'){
        return res.status(400).send({error:'malformatted id'})
    }
    else if (error.name === 'ValidationError') {
        const errors = {};

        for (const field in error.errors) {
            errors[field] = error.errors[field].message;  // Extract field-specific messages
        }
        console.log(Object.values(errors)[0])
        return res.status(400).json({ error: Object.values(errors)[0] });  // Send specific field-wise errors
    } 
    next(error)
}

app.use(errorHandler)

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})