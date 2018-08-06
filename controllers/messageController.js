import models from '../models'

const MessageController = {
  getController: (req, res) => {
    const { messageId } = req.params
    models.Message.findOne({ where: { id: messageId } })
      .then(message => res.send(message))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
  getUserMessages: (req, res) => {
    const { userId } = req.params
    models.Item.findAll({
      where: { user_id: userId },
    })
      .then((items) => {
        models.Message.findAll({
          where: { item_id: items.id },
        })
          .then(messages => res.send(messages))
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
    models.Message.create({
      fieldChanged: req.body.fieldChanged,
      dateChanged: req.body.dateChanged,
      priority: req.body.priority,
      isShown: req.body.isShown,
      item_id: req.params.itemId,
    })
      .then(() => res.sendStatus(201))
      .catch((error) => {
        res.sendStatus(400)
        console.error(error)
      })
  },
}
export default MessageController
