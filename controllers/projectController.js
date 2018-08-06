import models from '../models'

const ProjectController = {
  getProjectDetail: (req, res) => {
    console.log('Project Detail')
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
        {
          model: models.User,
          as: 'User',
        },
      ],
    })
      .then(project => res.send(project))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getController: (req, res) => {
    const { projectId } = req.params
    models.Project.findOne({ where: { id: projectId } })
      .then(project => res.send(project))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllProjects: (req, res) => {
    models.Project.findAll()
      .then(projectList => res.send(projectList))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  postController: (req, res) => {
    models.Project.insertOrUpdate({
      name: req.body.name,
      owner: req.body.owner,
      plannedStart: req.body.plannedStart,
      plannedFinish: req.body.plannedFinish,
      actualStart: req.body.actualStart,
      actualFinish: req.body.actualFinish,
      totalTests: req.body.totalTests,
      passingTests: req.body.passingTests,
      failingTests: req.body.failingTests,
      completedTests: req.body.completedTests,
    }).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default ProjectController
