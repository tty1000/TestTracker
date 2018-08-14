import models from '../models'

const SubfunctionController = {
  getController: (req, res) => {
    const { subfunctionId } = req.params
    models.Subfunction.findOne({ where: { id: subfunctionId } })
      .then(subfunction => res.send(subfunction))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllSubfunctions: (req, res) => {
    models.Subfunction.findAll()
      .then(subFunList => res.send(subFunList))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllSubfunctionsPerItem: (req, res) => {
    const { itemId } = req.params
    models.Item.findById(itemId)
      .then((item) => {
        item.getSubfunctions()
          .then(list => res.send(list))
          .catch((error) => {
            res.sendStatus(400)
            console.error(error)
          })
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  postController: (req, res) => {
    models.Subfunction.insertOrUpdate({
      name: req.body.name,
    }).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  postAssociationController: (req, res) => {
    const { itemId } = req.params
    const { subId } = req.params
    models.Subfunction.findById(subId)
      .then((subF) => {
        models.Item.findById(itemId)
          .then((item) => {
            subF.addItem(item)
              .then(res.sendStatus(200))
              .catch((error) => {
                res.sendStatus(400)
                console.error(error)
              })
          })
          .catch((error) => {
            res.sendStatus(400)
            console.error(error)
          })
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default SubfunctionController
