### Thomas Yang		
### 8/13/18
## Teradyne: Test Tracker – Backend Configuration
----------------------------------------
## The backend is setup to currently use:
1.		Node.js
    - Used for Server Side Javascript
2.		Express js
    - Node framework used to set up server
3.		Sequelize
    - Js Library used to talk to database (ORM: Object Relational Mapping)
4.		PostgreSQL
    - Relational Database used

- The first requirements are to install Node.js and PostgreSQL on the host computer.
- Copy the folders: controllers, models, and routes into a directory
- Copy the files: index.js, package.json, README, 
	- Node.js is set up to keep a list of the project’s dependencies in the package.json file. After Node is installed, you can open a command prompt in the project directory and type the command:

**$ npm install**
- This will create the package-lock.json file and the node_modules folder in the directory. 
- To start the server type:

 **$ npm start**
- This runs a script to start the server

**Routes**: The routes/index file has the information of the route needed to execute a specific get/post request. This file has the necessary information needed to know the link between the route and the controller. 

**Controllers**: The controllers contain the get + post requests that are used to get information from the database, add information, and update it. Each database model has a controller.

**Models**: The models are the database models. Each model defines what information is held in the database (definition), and the relations between items (association)

**Model Detail:**
	- Each PROJECT has a USER (project owner) and ITEMS (Tests and Fixtures)
	- Each ITEM has a USER (engineer), a PRODUCT, one or many SUBFUNCTIONS, many STAGES, and MESSAGES to record the changes. 

**JSON STRUCTURE:**
- **Project**
```
{
    id: int,
    name: string,
    plannedStart: date,
    plannedFinish: date,
    actualStart: date,
    actualFinish: date,
    totalTests: int,
    passingTests: int,
    failingTests: int,
    completedTests: int,
    user_id: int (owner)
}
```

- **Item**
```
{
    id: int,
    itemNumber: int,
    isFixture: boolean,
    referenceId: string,
    status: int, (0 = Pending, 1 = PASS, 2 = FAIL, 3 = IN PROCESS, 4 = COMPLETE, 5 = GATED SW,
		6 = GATED HW, 7 = GATED FIXTURE, 8 = GATED FPGA, 9 = GATED Equip)
    taskRating: int,
    currentStage: int,
    milestone: int, (1 = none, 2 = P4, 3 = REV B TO, 4 = EAS, 5 = RFUBO, 6 = LAB ENTRY)
    priority: int, (1 = low, 2 = average, 3 = high, 4 = critical)
    technicalRisk: int, (1 = low, 2 = average, 3 = high, 4 = critical)
    totalEffort: int,
    isActive: boolean,
    user_id: int,
    project_id: int,
    product_id: int
}
```

- **User**
```
{
    id: int,
    emailId: string,
    name: string,
    location: string
}
```

- **Stage**
```
{
    id: int, 
    stage: int,
    effort: int,
    plannedStart: date,
    plannedFinish: date,
    actualStart: date,
    actualFinish: date,
    item_id: int
}
```
- **Subfunction**
```
{
    id: int,
    name: string
}
```

- **Product**
```
{
    id: int,
    name: string
}
```

- **Message**
```
{
    id: int, 
    fieldChanged: int,
    content: int,
    created_at: date + time,
    item_id: int
}
```

**Routes List:** 
    If there is a colon, the variable after will be used to find the route

- GET /project/all - List of Projects, no associations
- GET /project/:projectId - One Project, no associations
- GET /project/:projectId/detail -  One Project, associations
- POST /project - Create new Project
- GET /project/:projectId/item/count - Get a count of items in project
- GET /project/:projectId/item/allitems - List of all items in project
- GET /project/:projectId/item/limit/:limit/offset/:offset - Specified list of items with size limit and offset
- GET /project/:projectId/item/:itemId - One Item, associations
- POST /project/:projectId/item - Add new item
- POST /project/:projectId/item/:itemId - UPDATE specified item 
- POST /item/:itemId - UPDATE specified item 
- GET /project/:projectId/user/:userId/ungated - List of user's ungated tests
- GET /project/:projectId/user/:userId/gated - List of user's gated tests
- GET /project/:projectId/user/:userId/tests - List of all user's tests
- GET /user/:userId/messages -List of user's messages
- GET /product/:productId - One Product
- GET /product/all - List of all products
- POST /product - Add new product
- GET /stage/:stageId - One stage
- GET /subfunction/:subfunctionId - One subfunction
- GET /subfunction/all - List of all subfunctions
- POST /subfunction - Add new subfunction
- GET /message/:messageId - One message
- POST /item/:itemId/message - Add new message
- POST /sub/:subId/item/:itemId - Associate a subfunction with an item
- GET /item/:itemId/subfunctions - List of item's subfunctions

- GET *unfinished* - Import csv
- POST *unfinished* - Export csv

---------------------------------------------------
## Further Implementation Needed 
1. **Create Messages**
	- Create MESSAGE after there has been a change in ITEM and report it to the USER
2. **Communication with MS Project or Primavera**
	- Database PROJECT export to CSV (may need to do JSON to CSV), import to scheduling software, import back to database (post requests)
3. **Chart Generation**
	- Need to figure out how to generate charts efficiently
4. **Subfunctions**
	- Need to organize SUBFUNCTIONS because there will be a large number (possibly hundreds) =>
		either make put SUBFUNCTIONS into categories or allow only certain subfunctions per project or …
5. **User Pool**
	- Either pull all users from TER Database or make users set up their own profiles on the website


**Before Sending code to team to set up: Remove simulation, remove database reset after changes ( set < force: false > in index.js of project folder )**

