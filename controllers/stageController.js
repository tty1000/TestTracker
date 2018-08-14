import models from '../models'

const StageController = {
  getController: (req, res) => {
    const { itemId } = req.params
    const { stageNumber } = req.params
    models.Stage.findOne({
      where: {
        item_id: itemId,
        stage: stageNumber,
      },
    })
      .then(stage => res.send(stage))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getControllerById: (req, res) => {
    models.Stage.findOne({
      where: {
        id: req.params.stageId,
      },
    })
      .then(stage => res.send(stage))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  updateController: (req, res) => {
    models.Stage.update(
      {
        stage: req.body.stage,
        effort: req.body.effort,
        plannedStart: req.body.plannedStart,
        plannedFinish: req.body.plannedFinish,
        actualStart: req.body.actualStart,
        actualFinish: req.body.actualFinish,
      },
      {
        where: {
          item_id: req.params.itemId,
          stage: req.params.stageNumber,
        },
      },
    ).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getItemStages: (req, res) => {
    const { itemId } = req.params
    models.Stage.findAll({
      where: { item_id: itemId },
      order: 'stage',
    })
      .then(stageList => res.send(stageList))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default StageController
