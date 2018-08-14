import Sequelize from 'sequelize'
import models from '../models'

const Op = Sequelize.Op

const ItemController = {
  getController: (req, res) => {
    const { itemId } = req.params
    models.Item.findOne({
      where: { id: itemId },
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages' },
        { model: models.Subfunction, as: 'Subfunctions' },
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
            { model: models.Subfunction, as: 'Subfunctions' },
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
  countItemsInProject: (req, res) => { // returns all of the items for a specified project
    const { projectId } = req.params
    models.Item.count({
      where: { project_id: projectId },
    })
      .then((itemcount) => {
        res.send(itemcount)
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getItemsInProjectLimitOffset: (req, res) => { // list of items by limit and offset
    const { projectId, itemlimit, itemoffset } = req.params
    models.Project.findById(projectId, {
      include: [
        {
          model: models.Item,
          limit: itemlimit,
          offset: itemoffset,
          as: 'Items',
          include: [
            { model: models.Message, as: 'Messages' },
            { model: models.Product, as: 'Product' },
            { model: models.Stage, as: 'Stages' },
            { model: models.Subfunction, as: 'Subfunctions' },
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
    const { projectId, userId } = req.params
    models.Item.findAll({
      where: {
        user_id: userId,
        project_id: projectId,
      },
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages' },
        { model: models.Subfunction, as: 'Subfunctions' },
        { model: models.User, as: 'User' },
      ],
    })
      .then(itemlist => res.send(itemlist))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getUserTestsUngated: (req, res) => { // returns all of the items for a specified project
    const { projectId, userId } = req.params
    models.Item.findAll({
      where: {
        [Op.or]: [
          { status: 1 }, // pass
          { status: 2 }, // fail
          { status: 3 }, // in process
          { status: 4 }, // complete
        ],
        user_id: userId,
        project_id: projectId,
      },
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages', order: 'stage' },
        { model: models.Subfunction, as: 'Subfunctions' },
        { model: models.User, as: 'User' },
      ],
      // order: 'taskRating DESC', // cannot use order
    })
      .then(itemlist => res.send(itemlist))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getUserTestsGated: (req, res) => { // returns all of the items for a specified project
    const { projectId, userId } = req.params
    models.Item.findAll({
      where: {
        user_id: userId,
        project_id: projectId,
        [Op.or]: [ // gated
          { status: 5 }, // SW
          { status: 6 }, // HW
          { status: 7 }, // Fixture
          { status: 8 }, // FPGA
          { status: 9 }, // Equip
        ],
      },
      // order: 'taskRating DESC', // cannot use order
      include: [
        { model: models.Message, as: 'Messages' },
        { model: models.Product, as: 'Product' },
        { model: models.Stage, as: 'Stages' },
        { model: models.Subfunction, as: 'Subfunctions' },
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
        individualHooks: true,
      },
    )
      .then((item) => {
        // create message based on what changed
        res.sendStatus(item ? 201 : 200)
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}

export default ItemController
