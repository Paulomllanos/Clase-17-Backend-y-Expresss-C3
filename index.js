const express = require('express');
const fs = require('fs');
const router = require('./Routes/Routes')


const app = express()

app.use(express.json())
//cualquier solicitud a /users va a utilizar el router
app.use('/user', router)

app.get('/friends', (req, res) => {
    console.log(req)
    res.json({success: true, response: 'Lista de nombres'})
})

app.get('/friends/:firstname', (req, res) => {
    //CONTROLAR LO QUE BUSCA EL USUARIO
    console.log(req.params.firstname)

    const friends = ['Paulo', 'Raul', 'Selia']

    if(friends.includes(req.params.firstname)){
        res.json({success: true, response: `Estas en el perfil de: ${req.params.firstname}`})
    } else {
        res.json({success: false, response: 'Amigo no existe'})
    }
})

//Parametros posicionales
app.get('/friends/:firstname/:lastname', (req, res) => {
    console.log(req.params)
    res.json({success: true})
})


//queryStrings = NO SON POSICIONALES === No necesitamos escribirlos en un orden

app.get('/query', (req, res) => {
    console.log(req.query)
    res.json({success: true})
})

app.get('/users/user', (req, res) => {
    console.log(req)
    res.send('Paulo Maldonado')
})

//Uso de una misma ruta con distintos tipos de peticiones

let usersRegister = []

app.post('/register', (req, res) => {
    // console.log(req.body)
    let nombre = req.body.username
    fs.appendFile('./users.txt', nombre, (error) => {
        if(error){
            console.log(error)
        } else {
            console.log(`${nombre} fue agregado!`)
        }
    })

    usersRegister.push(req.body)
    res.json({success: true, response: `${nombre} Agregado con Exito!`})
})

//? ejercicio 2

app.put('/register', (req, res) => {
    // console.log(req.body)
    let nombre = req.body.username
    fs.writeFile('./users.txt', nombre, (error) => {
        if(error){
            console.log(error)
        } else {
            console.log('todo ok')
        }
    })

    
    res.json({success: true, response: 'Usuario Actualizado con exito!'})
})

app.get('/register', (req, res) => {
    // console.log(req.body)
    
    fs.readFile('./users.txt', 'utf-8', (error, datos) => {
        if(error){
            console.log(error)
        } else {
            console.log(datos)
        }
    })

    res.json({success: true, response: usersRegister})
})

//? Ejercicio

app.get('/mensaje/:firstname/:lastname', (req, res) => {
    const {firstname, lastname} = req.params
   
    res.json({mensaje: `Hola, ${firstname} ${lastname}!`})
})

app.listen(5000, () => console.log('Servidor abierto en puerto: 5000'))