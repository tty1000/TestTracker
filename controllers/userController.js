import models from '../models'

const UserController = {
  getController: (req, res) => {
    const { userId } = req.params
    models.User.findById(userId)
      .then(user => res.send(user))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getByUserNameController: (req, res) => {
    const { username } = req.params
    models.User.findOne({
      where: { name: username },
    })
      .then(user => res.send(user))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getByEmailController: (req, res) => {
    const { email } = req.params
    models.User.findOne({
      where: { emailId: email },
    })
      .then(user => res.send(user))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getUsersInProject: (req, res) => {
    const { projectId } = req.params
    models.Project.findById(projectId)
      .then((projectObject) => {
        projectObject.getProjectUsers().then((userList) => {
          console.log('userList:')
          console.log(userList)
          res.send(userList)
        })
      })
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getAllUsers: (req, res) => {
    models.User.findAll().then(userList => res.send(userList))
  },
  postController: (req, res) => {
    models.User.insertOrUpdate({
      location: req.body.location,
      name: req.body.name,
    }).then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default UserController
