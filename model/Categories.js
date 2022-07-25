const {Schema , model} = require(`mongoose`)
const categoriySchema  = new Schema ({
    name:{
        required : true,
        type : String 
    } , 
    price:{
        required : true , 
        type : Number , 
    } , 
    year: Number , 
    img : String
})
module.exports = model('Categories' , categoriySchema)