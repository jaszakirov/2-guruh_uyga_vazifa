const express = require('express')
const app = express()
const Joi = require('joi')
const authMiddleware = require('./middleware/auth')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require(`path`)
// dotenv
require(`dotenv`).config()
// require routers
const homeroutes  = require(`./routes/home`)
const carsroutes  = require(`./routes/cars`)
// Middleware functions
app.use(express.json())
//  urlencoded midlware 
app.use(express.urlencoded({extended:true}))
// Module middleware
if(process.env.EVITRMENT == `development`){
    app.use(morgan('tiny'))
}
app.use(helmet())
// express stsic midlware
app.use(express.static(path.join(__dirname, `public`)))
// Routing
app.use( `/`, homeroutes)
// Get categories
app.use( `/api/categories` , carsroutes)
// Get categoriy with id
app.use('/api/categories/', carsroutes)
// // Delete categoriy with id
app.use('/api/categories/', carsroutes)
// Post add ctegoriy
app.use('/api/categoriy/', carsroutes)
// Put lesson with id
app.put('/api/categoriy/', carsroutes )
const port = normalizePort(process.env.port || 3000) 
app.listen(port , ()=>{
    console.log(`App listening on port `+ port);
})
function normalizePort(val){
    const num = parseInt(val)
    if(isNaN(num)){
        return val
    }
    if(num){
        return num
    }
    return false
}