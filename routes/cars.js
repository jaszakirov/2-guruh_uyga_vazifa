const {Router} = require('express')
const router = Router()
const Joi = require('joi')
const authMiddleware = require('../middleware/auth')
const { v4: uuidv4 } = require('uuid');
const Categories = require(`../model/Categories`)
// Get categories
const categories = []
// Get categories
router.get('/', (req, res) => {
    // res.status(200).send(categories)
    res.render(`cars` , {
        title : `Categories`,
        categories
    })
})
// add categoriy
router.get('/add', (req, res) => {
    res.render(`addCategoriy` , {
        title : `Add Categoriy`,
    })
})

router.get(`/cars` , (req, res)=>{
    res.render(`about`)
})
// Get categoriy with  id
router.get('/:id', (req, res) => {
    const сategoriy = categories.find(cat => cat.id === +req.params.id)
    if (!сategoriy) {
        return res.status(404).send('404 not found')
    } 
    // res.status(200).send(сategoriy)
    res.render(`index.pug`)
})
//  Delete categoriy with id
router.get('/delete/:id', authMiddleware , (req, res) => {
    const idx = categories.findIndex(cat => cat.id === req.params.id)
    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. It is not exist')
    }
    categories.splice(idx, 1)
    // res.status(200).send('Car categoriy successfully deleted')
    res.redirect(`/api/categories`)
})
router.delete('/delete/:id', authMiddleware , (req, res) => {
    const idx = categories.findIndex(cat => cat.id === +req.params.id)
    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. It is not exist')
    }
    categories.splice(idx, 1)
    res.status(200).send('Car categoriy successfully deleted')
})
// Post add ctegoriy

router.post('/add', (req, res) => {
    const schema = Joi.object({
        name: Joi.string().
            min(3).
            required(),
        year : Joi.number(),
        price: Joi.string().required(),
        img : Joi.string()
    })
    const value = schema.validate(req.body)
    if (value.error) {
        res.status(404).send(value.error.message)
        return
    }
    const categoriy = {
        name: req.body.name,
        id: uuidv4() ,
        year : req.body.year , 
        price : req.body.price , 
        img : req.body.img 

    }
    categories.push(categoriy)
    res.redirect(`/api/categories`)
    // res.status(201).send('Categoriy created successfull')
    // res.render(`addCategoriy` , {
    //     title : `Add categoriy`
    // })
    // res.render('addCategoriy' , {
    //     title: 'Add Categoriy'
    // })
})
// Put categoriy with id
router.get('/update/:id', (req, res) => {
    const idx = categories.findIndex(cat => cat.id === req.params.id)
    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. It is not exist')
    }
    let categoriy = {
       
    }
    categories[idx] = categoriy
    // res.status(200).send('Categoriy updated successfull')
    res.render(`putCategoriy` , {
        
    })
})
router.put('/update/:id', (req, res) => {
    const idx = categories.findIndex(cat => cat.id === +req.params.id)
    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. It is not exist')
    }
    let categoriy = {
        name: req.body.name,
        id: req.params.id
    }
    categories[idx] = categoriy
    // res.status(200).send('Categoriy updated successfull')
    res.redirect(`/api/categories`)
})

module.exports = router