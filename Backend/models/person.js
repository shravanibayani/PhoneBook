const mongoose = require('mongoose')
mongoose.set('strictQuery', false)

const url = process.env.MONGODB_URI
console.log('Conneting to :', url)
mongoose.connect(url).then(result => {
    console.log('Connected to MongoDB')
})
    .catch(error => {
        console.log('error connecting to MongoDB: ', error)
    })

//Extended validation 
const phoneSchema = new mongoose.Schema({
    name: { 
        type: String, 
        minlength: [3, 'Name must be at least 3 characters long'], 
        required: [true, 'Name is required'] 
    },
    number: { 
        type: String, 
        minlength: [3, 'Number must be at least 3 digits long'], 
        maxlength: [10, 'Number cannot be longer than 10 digits'], 
        required: [true, 'Number is required'] 
    }
})

phoneSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', phoneSchema)