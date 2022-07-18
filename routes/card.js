const {Router} = require('express')
const router = Router()
const Categories = require(`../model/Categories`)
const Card = require(`../model/Cards`)
router.get(`/`,async (req, res) => {
    const { items , price} = await Card.fetch()
    res.render( `card` , {
        items ,
        totalprice : price
    })
})
router.post(`/add`,  async (req, res) => {
    
    const categories = await Card.add(req.body.id)
   
    // const categoriy = await Categories.findById(req.body.id)
   res.redirect('/api/card')
})

module.exports = router