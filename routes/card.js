const {
  Router
} = require('express')
const router = Router()
const Categories = require(`../model/Categories`)
const Card = require(`../model/Cards`)
router.get(`/`, async (req, res) => {
  const categories = await Card.find()
  res.render(`card`, {
    /*   items ,
      totalprice : price */
    categories
  })
})
router.post(`/add`, async (req, res) => {
  const id = req.body.id
  console.log(id);
  const categoriy = await Categories.findById(id)
  console.log(categoriy.img);
  const addcard = new Card({
    name: categoriy.name,
    price: categoriy.price,
    year: categoriy.year,
    img: categoriy.img

  })
  addcard.save()
  // const categoriy = await Categories.findById(req.body.id)
  res.redirect('/api/card')
})
router.delete('/delete/:id', (req, res) => {
  res.redirect('/api/card')
})
router.get('/delete/:id', async (req, res) => {
  const id = req.params.id
  await Card.findByIdAndRemove(id)
  res.redirect('/api/card')
})

module.exports = router