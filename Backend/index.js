const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

let persons = [
    {
        id: "1",
        name: "Shravani",
        number: "1234565"
    },
    {
        id: "2",
        name: "Mrunal",
        number: "5445453"
    },
    {
        id: "3",
        name: "Aditya",
        number: "8976765"
    }
]

app.use(express.static('dist'))
app.use(cors())
app.use(express.json())
morgan.token('body',(req)=>req.method === 'POST' ? JSON.stringify(req.body) : '')
app.use(morgan(':method :url :status :response-time ms - :body'))


app.get('/', (req, res) => {
    res.send('<h1>Welcome to PhoneBook</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})

const timeOfReq = new Date().toString()
app.get('/info', (req, res) => {
    res.send(`<p>Phonebook has info for ${persons.length} people</p>
        <p>${timeOfReq}</p>`)
})

app.get('/api/persons/:id', (req, res) => {
    const id = req.params.id
    const person = persons.find(p => p.id === id)

    if (person) {
        res.json(person)
    }
    else {
        res.status(404).end()
    }

})

app.delete('/api/persons/:id', (req, res) => {
    const id = req.params.id
    persons = persons.filter(p => p.id !== id)
    res.status(200).json(persons)
})
const generateID = () => {
    const newID = Math.floor(Math.random() * (100 - 1 + 1))
    return String(newID + 1)
}


app.post('/api/persons', (req, res) => {
    const body = req.body
    console.log(body)

    if (!(body.name && body.number)) {
        return res.status(400).json(
            {
                error: "Enter Both field"
            }
        )
    }
    if (persons.find(p => p.name === body.name)) {
        return res.status(400).json(
            {
                error: "Person already exists"
            }
        )
    }
    const person = {
        id: generateID(),
        name: body.name,
        number: body.number
    }
    console.log(req.headers)
    persons = persons.concat(person)
    res.json(persons)
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3004
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})