import Controllers from '../controllers'

const router = (app) => {
// main project routes //
  app.get('/project/all', Controllers.ProjectController.getAllProjects) // get list of all projects
  app.get('/project/:projectId', Controllers.ProjectController.getController) // get details of a project
  app.get('/project/:projectId/detail', Controllers.ProjectController.getProjectDetail) // get details of a project including associations
  app.post('/project', Controllers.ProjectController.postController) // post to create project

  app.get('/project/:projectId/item/count', Controllers.ItemController.countItemsInProject) // get count of items in project
  app.get('/project/:projectId/item/allitems', Controllers.ItemController.getItemsInProject) // get all items in project
  app.get('/project/:projectId/item/limit/:limit/offset/:offset', Controllers.ItemController.getItemsInProjectLimitOffset) // get -limit- items in project starting at -offset-
  app.get('/project/:projectId/item/:itemId', Controllers.ItemController.getController) // get specific item in project
  app.post('/project/:projectId/item/', Controllers.ItemController.createController) // post to create item in a project
  app.post('/project/:projectId/item/:itemId', Controllers.ItemController.updateController) // update an item
  app.post('/item/:itemId', Controllers.ItemController.updateController) // update an item

  // get a user's associated items
  app.get('/project/:projectId/user/:userId/ungated', Controllers.ItemController.getUserTestsUngated) // ungated tests for a user
  app.get('/project/:projectId/user/:userId/gated', Controllers.ItemController.getUserTestsGated) // gated tests for a user
  app.get('/project/:projectId/user/:userId/tests', Controllers.ItemController.getUserTests) // all tests for a user
  app.get('/user/:userId/messages', Controllers.MessageController.getUserMessages) // messages

  app.get('/item/:itemId/stage/:stageNumber', Controllers.StageController.getController) // get information on a specified stage for an item
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

  app.get('/subfunction/:subfunctionId', Controllers.SubfunctionController.getController) // get details of a sub function
  app.get('/subfunction/all', Controllers.SubfunctionController.getAllSubfunctions) // get details of all sub functions
  app.post('/subfunction', Controllers.SubfunctionController.postController) // add new sub function

  app.get('/message/:messageId', Controllers.MessageController.getController) // find a message by id
  app.post('/item/:itemId/message', Controllers.MessageController.postController) // create new message

  app.post('/sub/:subId/item/:itemId', Controllers.SubfunctionController.postAssociationController) // associate a subfunction with an item
  app.get('/item/:itemId/subfunctions', Controllers.SubfunctionController.getAllSubfunctionsPerItem) // find the subfunctions associated with an item
// end routes
}

export default router
