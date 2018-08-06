import Controllers from '../controllers'

const router = (app) => {
// main project routes //
  app.get('/project/all', Controllers.ProjectController.getAllProjects) // get list of all projects
  app.get('/project/:projectId', Controllers.ProjectController.getController) // get details of a project
  app.get('/project/:projectId/detail', Controllers.ProjectController.getProjectDetail) // get details of a project including associations
  app.post('/project', Controllers.ProjectController.postController) // post to create project

  app.get('/project/:projectId/item/allItems', Controllers.ItemController.getItemsInProject) // get all items in project
  app.get('/project/:projectId/item/:itemId', Controllers.ItemController.getController) // get specific item in project
  app.post('/project/:projectId/item/', Controllers.ItemController.createController) // post to create item in a project
  app.post('/project/:projectId/item/:itemId', Controllers.ItemController.updateController) // update an item
  app.post('/item/:itemId', Controllers.ItemController.updateController) // update an item

  // get a user's associated items
  app.get('/project/:projectId/user/:userId/tests', Controllers.ItemController.getUserTests) // tests
  app.get('/user/:userId/messages', Controllers.MessageController.getUserMessages) // messages

  app.get('/item/:itemId/stage/:stageNumber', Controllers.StageController.getController) // update a specified stage for an item
  app.post('/item/:itemId/stage/:stageNumber', Controllers.StageController.updateController) // update a specified stage for an item

  app.get('/item/:itemId', Controllers.ItemController.getController) // get details of a specified item including associations

  // base routes //
  app.get('/user/:userId', Controllers.UserController.getController) // get details for one user
  app.get('/user/byusername/:username', Controllers.UserController.getByUserNameController) // get details for one user
  app.get('/user/byemail/:email', Controllers.UserController.getByUserNameController) // get details for one user
  app.get('/user/all', Controllers.UserController.getAllUsers) // list of all users
  app.post('/user', Controllers.UserController.postController) // add new user

  app.get('/product/:productId', Controllers.ProductController.getController) // get details of a product
  app.get('/product/all', Controllers.ProductController.getAllProducts) // get details of all products
  app.post('/product', Controllers.ProductController.postController) // add new product

  app.get('/stage/:stageId', Controllers.StageController.getControllerById) // get information of a stage

  app.get('/subFunction/:subFunctionId', Controllers.SubFunctionController.getController) // get details of a sub function
  app.get('/subFunction/all', Controllers.SubFunctionController.getAllSubFunctions) // get details of all sub functions
  app.post('/subFunction', Controllers.SubFunctionController.postController) // add new sub function

  app.get('/message/:messageId', Controllers.MessageController.getController) // find a message by id
  app.post('/item/:itemId/message', Controllers.MessageController.postController) // create new message
// end routes
}

export default router
