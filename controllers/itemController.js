import models from '../models'

const ItemController = {
  getController: (req, res) => {
    const { itemId } = req.params
    models.Item.findOne({
      where: { id: itemId },
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages' },
        { model: models.SubFunction, as: 'SubFunctions' },
        { model: models.User, as: 'User' },
      ],
    })
      .then(item => res.send(item))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getItemsInProject: (req, res) => { // returns all of the items for a specified project
    const { projectId } = req.params
    models.Project.findById(projectId, {
      include: [
        {
          model: models.Item,
          as: 'Items',
          include: [
            { model: models.Message, as: 'Messages' },
            { model: models.Product, as: 'Product' },
            { model: models.Stage, as: 'Stages' },
            { model: models.SubFunction, as: 'SubFunctions' },
            { model: models.User, as: 'User' },
          ],
        },
      ],
    })
      .then((itemList) => {
        res.send(itemList)
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getUserTests: (req, res) => { // returns all of the items for a specified project
    const { projectId } = req.params
    const { userId } = req.params
    models.Item.findAll({
      where: {
        user_id: userId,
        project_id: projectId,
      },
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages' },
        { model: models.SubFunction, as: 'SubFunctions' },
        { model: models.User, as: 'User' },
      ],
    })
      .then(itemlist => res.send(itemlist))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  createController: (req, res) => {
    models.Item.create({
      itemNumber: req.body.itemNumber,
      name: req.body.name,
      isFixture: req.body.isFixture,
      referenceId: req.body.referenceId,
      status: req.body.status,
      taskRating: req.body.taskRating,
      currentStage: req.body.currentStage,
      milestone: req.body.milestone,
      priority: req.body.priority,
      technicalRisk: req.body.technicalRisk,
      totalEffort: req.body.totalEffort,
      isActive: req.body.isActive,
      project_id: req.params.projectId,
      product_id: req.body.product_id,
      user_id: req.body.user_id,
    })
      .then((item) => { // then create 7 stages for the item
        let i = 1
        for (i; i <= 7; i += 1) {
          models.Stage.create({
            stage: i,
            item_id: item.id,
          })
        }
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
      .then((item) => {
        res.sendStatus(item ? 201 : 200)
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  updateController: (req, res) => {
    models.Item.update(
      {
        itemNumber: req.body.itemNumber,
        name: req.body.name,
        isFixture: req.body.isFixture,
        referenceId: req.body.referenceId,
        status: req.body.status,
        taskRating: req.body.taskRating,
        currentStage: req.body.currentStage,
        milestone: req.body.milestone,
        priority: req.body.priority,
        technicalRisk: req.body.technicalRisk,
        totalEffort: req.body.totalEffort,
        isActive: req.body.isActive,
        product_id: req.body.product_id,
        project_id: req.body.project_id,
        user_id: req.body.user_id,
      },
      {
        where: {
          id: req.params.itemId,
        },
      },
    )
      .then(item => res.sendStatus(item ? 201 : 200))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}

export default ItemController
