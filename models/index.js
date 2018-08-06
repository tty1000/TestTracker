import Sequelize from 'sequelize';

const sequelize = new Sequelize('mydb', 'postgres', 'pw', {
  dialect: 'postgres',
  logging: false,
  define: { underscored: true },
});


const models = {
  User: sequelize.import('./user'),
  Project: sequelize.import('./project'),
  Item: sequelize.import('./item'),
  Stage: sequelize.import('./stage'),
  SubFunction: sequelize.import('./subFunction'),
  Product: sequelize.import('./product'),
  Message: sequelize.import('./message'),
};

Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
});

models.sequelize = sequelize;
models.Sequelize = Sequelize;

export default models;