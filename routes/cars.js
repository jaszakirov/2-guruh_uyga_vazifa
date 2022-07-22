const {
    Router
} = require('express')
const router = Router()
const Joi = require('joi')
const authMiddleware = require('../middleware/auth')

const Categories = require(`../model/Categories`)
// Get categories
// Get categories
router.get('/', async (req, res) => {
    const categories = await Categories.find()
    console.log(categories);
    res.render(`cars`, {
        title: `Categories`,
        categories
    })
})
// add categoriy
router.get('/add', (req, res) => {
    res.render(`addCategoriy`, {
        title: `Add Categoriy`,
    })
})
router.get('/catname', (req, res) => {
    res.render(`addCategoriy`, {
        title: `Add Categoriy`,
    })
})
// Get categoriy with  id
router.get('/:id', async (req, res) => {
    const id = req.params.id
    const categoriy = await Categories.findById(id)



    //  const categoriy = categories.find(cat => cat.id === req.params.id)
    // if (!categoriy) {
    //     return res.status(404).send('404 not found')
    // }
    // res.status(200).send(сategoriy)
    res.render(`categoriy`, {
        categoriy,
        id: req.params.id
    })
})
//  Delete categoriy with id
router.get('/delete/:id', authMiddleware, async (req, res) => {
    const id = req.params.id
    const categoriy = await Categories.removeByid(id)
    // Validator
    // res.status(200).send('Car categoriy successfully deleted')
    res.redirect(`/api/categories`)
})
router.delete('/delete/:id', authMiddleware, (req, res) => {
    res.status(200).send('Car categoriy successfully deleted')
})
// Post add ctegoriy

router.post('/add', async (req, res) => {
    const schema = Joi.object({
        name: Joi.string().
        min(3).
        required(),
        year: Joi.number(),
        price: Joi.string().required(),
        img: Joi.string()
    })
    const value = schema.validate(req.body)
    if (value.error) {
        res.status(404).send(value.error.message)
        return
    }
    const categoriy = new Categories(
        req.body.name,
        req.body.year,
        req.body.price,
        req.body.img)

    categoriy.save()
    res.redirect(`/api/categories`)
})
// Update categoriy with id
router.post('/update/', async (req, res) => {
    const id = req.body.id
    const categoriy = await Categories.findByIdAndUpdate(id, req.body)

    // res.status(200).send('Categoriy updated successfull')
    res.redirect(`/api/categories`)
})
router.get(`/update/:id`, async (req, res) => {
    const categoriy = await Categories.findById(req.params.id)
    console.log(req.body.id);
    res.render(`putCategoriy`, {
        categoriy
    })
})
// router.post('/update/:id', async (req, res) => {
//     const id = req.params.id
//     const categories = await Categories.findByIdAndUpdate(id, req.body)

//     res.redirect(`/api/categories`)
// })

module.exports = router