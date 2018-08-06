import models from '../models'

const SubFunctionController = {
  getController: (req, res) => {
    const { subFunctionId } = req.params
    models.SubFunction.findOne({ where: { id: subFunctionId } })
      .then(subFunction => res.send(subFunction))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllSubFunctions: (req, res) => {
    models.SubFunction.findAll()
      .then(subFunList => res.send(subFunList))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  postController: (req, res) => {
    models.SubFunction.insertOrUpdate({
      name: req.body.name,
    }).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default SubFunctionController
