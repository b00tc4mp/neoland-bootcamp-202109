const { MongoClient } = require('mongodb') // El paquete requerido para conectarse con MongoDB

const client = new MongoClient('mongodb://localhost:27017') // El puerto en el que se encuentra alojada la base de datos en local
// const client = new MongoClient('mongodb+srv://manuelbarzi:123123123@cluster0.yuse3.mongodb.net')

// const { createUser, updateUser, findUser, deleteUser } = require('./logic-mongodb') 
// Librería con vuestras funciones, según el ejemplo de Ventu.

// Configuración inicial de MongoDB
client.connect(error => {
    if (error) return console.error(error)

    const demo = client.db('demo') // Declaración de la base de datos a la que apunta nuestro programa

    const users = demo.collection('users') // La colección específica

    const { argv: [, , command] } = process

    if (command === 'insert')
        users.insertOne({ name: 'Coco Drilo', username: 'cocodrilo', password: '123123123' }, error => {
            if (error) return console.error(error)

            users.find({}).toArray((error, users) => {
                if (error) return console.error(error)

                console.table(users)

                //client.close()

            })
        })

    if (command === 'find')
        users.find({}).toArray((error, users) => {
            if (error) return console.error(error)

            console.table(users)

            //client.close()
        })

    if (command === 'delete')
        users.deleteOne({ username: 'cocodrilo' }, error => {
            if (error) return console.error(error)

            users.find({}).toArray((error, users) => {
                if (error) return console.error(error)

                console.table(users)

                //client.close()
            })
        })

    if (command === 'update')
        users.updateOne({ username: 'pepigri' }, { $set: { age: 22 } }, error => {
            if (error) return console.error(error)

            users.find({}).toArray((error, users) => {
                if (error) return console.error(error)

                console.table(users)

                //client.close()
            })
        })
})