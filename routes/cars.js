const {Router} = require('express')
const router = Router()
const Joi = require('joi')
// Get categories
const categories = [
    { name: 'BMW', id: 1 },
    { name: 'Porshe', id: 2 },
    { name: 'Chevrolet', id: 3 },
]
// Get categories
router.get('/', (req, res) => {
    res.status(200).send(categories)
})
// Get categoriy with  id
router.get('/:id', (req, res) => {
    const сategoriy = categories.find(cat => cat.id === +req.params.id)
    if (!сategoriy) {
        return res.status(404).send('404 not found')
    }
    res.status(200).send(сategoriy)
})
//  Delete categoriy with id
router.delete('/delete/:id', (req, res) => {
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
            required()
    })
    const value = schema.validate(req.body)
    if (value.error) {
        res.status(404).send(value.error.message)
        return
    }
    const categoriy = {
        name: req.body.name,
        id: categories.length + 1 // 
    }
    categories.push(categoriy)
    res.status(201).send('Categoriy created successfull')
})
// Put lesson with id
router.put('/update/:id', (req, res) => {
    const idx = categories.findIndex(cat => cat.id === +req.params.id)
    // Validator
    if (idx === -1) {
        return res.status(404).send('404 not found. It is not exist')
    }
    let categoriy = {
        name: req.body.name,
        id: +req.params.id
    }
    categories[idx] = categoriy
    res.status(200).send('Categoriy updated successfull')
})

module.exports = router