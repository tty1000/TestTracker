import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import models from './models'
import Simulation from './simulation'
import router from './routes'

const app = express()
const dbUpdate = true

app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send('hello there, general kenobi')
})

router(app)

models.sequelize.sync({ force: dbUpdate }).then(() => {
  app.listen(8081, '0.0.0.0')
  models.User.create({
    emailId: 'thomas.yang',
    name: 'Thomas Yang',
    location: 'NR',
  })
  models.User.create({
    emailId: 'naman.shenoy',
    name: 'Naman Shenoy',
    location: 'NR',
  })

  console.log(dbUpdate ? Simulation() : false)
  // models.Project.create({
  //   name: 'Tems',
  //   user_id: '1',
  // })
  //   .then(project => project.getItems())
  //   .then(items => items.map(x => console.log(x.id)))
  // models.Item.create({
  //   itemNumber: 1,
  //   name: 'TestForTom',
  //   project_id: 1,
  //   product_id: 1,
  //   user_id: '1',
  // })

  // pro1.setItems(test1)
  // test1.setEngineer(Tom)
  console.log(`DB Update ${dbUpdate}`)
});

