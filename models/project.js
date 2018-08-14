export default (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    plannedStart: {
      type: DataTypes.DATEONLY,
      field: 'plannedstart',
    },
    plannedFinish: {
      type: DataTypes.DATEONLY,
      field: 'plannedfinish',
    },
    actualStart: {
      type: DataTypes.DATEONLY,
      field: 'actualstart',
    },
    actualFinish: {
      type: DataTypes.DATEONLY,
      field: 'actualfinish',
    },
    totalTests: {
      type: DataTypes.INTEGER,
      field: 'totaltests',
    },
    passingTests: {
      type: DataTypes.INTEGER,
      field: 'passingtests',
    },
    failingTests: {
      type: DataTypes.INTEGER,
      field: 'failingtests',
    },
    completedTests: {
      type: DataTypes.INTEGER,
      field: 'completedtests',
    },

  }, { underscored: true })


  Project.associate = (models) => {
    Project.hasMany(models.Item, {
      as: 'Items',
      sourceKey: 'id',
    })
    Project.belongsTo(models.User, {
      as: 'User',
      targetKey: 'id',
    })
  }
  return Project
}
