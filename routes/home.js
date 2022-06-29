const {Router} = require('express')
const router = Router()
const categories = [
    { name: 'BMW', id: 1 },
    { name: 'Porshe', id: 2 },
    { name: 'Chevrolet', id: 3 },
]
router.get('/', (req, res) => {
    // res.send('Welcome to car shop ')
    res.render(`index`, {
        titile : 'Home page' ,
        categories 
    })
})

module.exports = router