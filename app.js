const express = require('express')
const app = express()
const Joi = require('joi')
const morgan = require('morgan')
const helmet = require('helmet')
const path = require(`path`)
const {create} = require(`express-handlebars`)

// dotenv
require(`dotenv`).config()
// require routers
const homeroutes  = require(`./routes/home`)
const carsroutes  = require(`./routes/cars`)
const cardroutes = require(`./routes/card`)
// View engine Hbs connection

const hbs = create({
    extname : `hbs` , 
    defaultLayout : 'main.hbs'

})
app.engine(`hbs` , hbs.engine)
app.set('view engine' , 'hbs')

// Middleware functions
app.use(express.json())
//  urlencoded midlware 
app.use(express.urlencoded({extended:true}))
// Module middleware
if(process.env.EVITRMENT == `development`){
    app.use(morgan('tiny'))
}
// app.use(helmet())
// express stsic midlware
app.use(express.static(path.join(__dirname, `public`)))
// Routing
app.use( `/`, homeroutes)
// About 
app.use( `/api/categories/` , carsroutes)
app.use('/api/categoriy', carsroutes)
app.use( `/api/card` , cardroutes)

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