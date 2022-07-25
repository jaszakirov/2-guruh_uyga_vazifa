const {Router} = require('express')
const router = Router()
const Categories = require(`../model/Categories`)
router.get('/',  (req, res) => {

    // res.send('Welcome to car shop ')
    res.render(`index`, {
        titile : 'Home page' ,
     
    })
})

module.exports = router