import models from '../models'

const ProductController = {
  getController: (req, res) => {
    const { productId } = req.params
    models.Product.findOne({ where: { id: productId } })
      .then(product => res.send(product))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllProducts: (req, res) => {
    models.Product.findAll()
      .then(productList => res.send(productList))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  postController: (req, res) => {
    models.Product.insertOrUpdate({
      name: req.body.name,
    }).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default ProductController
