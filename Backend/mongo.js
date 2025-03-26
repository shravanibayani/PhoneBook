const mongoose = require('mongoose')

if(process.argv.length < 3){
    console.log("give password as argument")
    process.exit(1)
}

const password = process.argv[2]
const name_input = process.argv[3]
const number_input = process.argv[4]

const url =`mongodb+srv://shravanibayani02:${password}@cluster0.kjxnn.mongodb.net/PhoneBook?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)
mongoose.connect(url)



const Person = new mongoose.model('Person',phoneSchema)

const contact = new Person(
    {
        name:name_input,
        number:number_input,
    }
)

// contact.save().then(result=>{
//     console.log('contact saved!')
//     mongoose.connection.close()
// })


Person.find({}).then(result=>{
    result.forEach(contact=>{
        console.log(contact)
    })
    mongoose.connection.close()
})

