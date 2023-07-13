const express = require('express')
const {conectToDB, diconectFromMongoDB} = require('./src/mongodb.js')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.json())

app.use('/', (req, res, next) =>{
    res.header("Content-type", "aplication/json; charset=utf-8")
    next()
})

app.get('/', (req, res) =>{
    res.status(200).end('prendas')
})

app.get('/prendas', async(req, res) =>{
    try{
        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
        }

        const db = client.db('ropa-shop')
        const ropero = await db.collection('ropa-shop').find().toArray()
        res.json(ropero)

    }catch(error){
        res.status(500).send('Error al obtener los datos')
    }finally{
        await diconectFromMongoDB()
    }
})

// OBTENER ROPA POR ID
app.get('/prendas/:id', async (req, res) =>{
    const ropaId = parseInt(req.params.id)
    try{
        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
        }

        const db = client.db('ropa-shop')
        const prenda = await db.collection('ropa-shop').findOne({id: ropaId})
        if(prenda){
            res.json(prenda)
        }else{
            res.status(404).send('Ropa no encontrada')
        }

    }catch(error){
        res.status(500).send('Error al obtener los datos')
    }finally{
        await diconectFromMongoDB()
    }
})

// OBTENER prenda POR NOMBRE
app.get('/prendas/nombre/:nombre', async (req, res) =>{
    const prendaQuery = req.params.nombre
    let prendaNombre = RegExp(prendaQuery, "i")
    try{
        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
        }

        const db = client.db('ropa-shop')
        const prenda = await db.collection('ropa-shop').find({nombre: prendaNombre}).toArray()

        if(prenda.length > 0){
            res.json(prenda)
        }else{
            res.status(404).send('Error al obtener la prenda')
        }

    }catch(error){
        res.status(500).send('Error al obtener los datos')
    }finally{
        await diconectFromMongoDB()
    }
})

// OBTENER LA prenda POR PRECIO
app.get('/prendas/precio/:precio', async(req, res) =>{
    const prendaPrecio = parseInt(req.params.level)
    try{
        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
            return
        }
        const db = client.db('ropa-shop')
        const prenda = await db.collection('ropa-shop').find({ nivel: {$gte: prendaPrecio}}).toArray()

        if(prenda.length > 0){
            res.json(prenda)
        }else{
            res.status(404).send('prenda no encontrado.')
        }
    }catch(error){
        res.status(500).send('Error al obtener los precios de la base de datos')
    }finally{
        await diconectFromMongoDB()
    }
})


// CREAR UNA NUEVA PRENDA
app.post('/prendas', async(req, res)=>{
    const nuevaprenda = req.body
    try{
        if(nuevaprenda === undefined){
            res.status(400).send('Error al crear nuevo prenda')
        }

        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
            return
        }

        const db = client.db('ropa-shop')
        const collection = db.collection('ropa-shop')
        await collection.insertOne(nuevaprenda)
            console.log('prenda creada exitosamente');
        res.status(201).send(nuevaprenda)
        
    }catch(error){
        res.status(500).send('Error al agregar ${nuevaprenda.nombre}')
    }finally{
        await diconectFromMongoDB()
    }
})

// EDICION DE UNA PRENDA
app.put('/prendas/:id', async(req, res)=>{
    const prendaId = parseInt(req.params.id)
    const nuevosDatos = req.body
    try{
        if(nuevosDatos === undefined){
            res.status(400).send('Error al ingresar los nuevos datos')
        }

        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
            return
        }

        const db = client.db('ropa-shop')
        const collection = db.collection('ropa-shop')

        await collection.updateOne({id: prendaId}),{$set: nuevosDatos}
            console.log('prenda modificada');
        res.status(200).send(nuevosDatos)

    }catch(error){
        res.status(500).send('Error al modificar la prenda')
    }finally{
        await disconnectFromMongoDB()
    }
})

// MODIFICAR UNA PRENDA
app.patch('/prendas', async(req, res) =>{
    const prendaId = parseInt(req.params.id)
    const nuevoDato = req.body.precio
    try{
        if(!nuevoDato){
            res.status(400).send('Error en el formato de datos a modificar')
        }
        const client = await conectToDB()
        if(!client){
            res.status(500).send('Error al conectar a MongoDB')
        }
        const db = client.db('ropa-shop')
        const collection = db.collection('ropa-shop')

        await collection.updateOne({id: prendaId},{$set: nuevoDato})
            console.log('prenda modificada correctamente');
    }catch(error){
        res.status(500).send('Error al modificar la prenda')
    }finally{
        await diconectFromMongoDB()
    }
})

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
  });
  