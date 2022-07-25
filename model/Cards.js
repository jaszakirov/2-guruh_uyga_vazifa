const {Schema , model} = require(`mongoose`)
const Categories = require(`../model/Categories`)

const cardSchema = new Schema({
    name:{
        required : true,
        type : String 
    } , 
    price:{
        required : true , 
        type : Number , 
    } , 
    year: Number , 
    img : String  ,
    }) 
    

module.exports = model('Card' , cardSchema)
// const path = require(`path`)
// / const fs = require('fs')
// const dir = path.join(require.main.filename, '..', 'data', 'card.json')
// class Card {
//     static async add(id) {
//         const categoriy = await Categories.findById(id)
//         console.log(categoriy);
//         const data = await this.fetch()
//         const idx = data.items.findIndex(item => item.id === id)
//         if (idx < 0) {
//             categoriy.count = 1
//             data.items.push(categoriy)
//         } else {
//             data.items[idx].count++
//         }
//         data.price = +data.price + +categoriy.price
//         return new Promise((res,rej)=>{
//             fs.writeFile(dir , JSON.stringify(data) , (err)=>{
//                 if(err)rej(err)
//                 else res(data.items)
//             })
//         })
//     }
//     static async fetch() {
//         return new Promise((res, rej) => {
//             fs.readFile(dir, 'utf-8', (err, data) => {
//                 if (err) rej(err)
//                 else res(JSON.parse(data))
//             })
//         })

//     }

// }
