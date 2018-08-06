export default (sequelize, DataTypes) => {
  const Project = sequelize.define('project', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
    plannedStart: {
      type: DataTypes.DATEONLY,
      field: 'planned_start',
    },
    plannedFinish: {
      type: DataTypes.DATEONLY,
      field: 'planned_finish',
    },
    actualStart: {
      type: DataTypes.DATEONLY,
      field: 'actual_start',
    },
    actualFinish: {
      type: DataTypes.DATEONLY,
      field: 'actual_finish',
    },
    totalTests: {
      type: DataTypes.INTEGER,
      field: 'total_tests',
    },
    passingTests: {
      type: DataTypes.INTEGER,
      field: 'passing_tests',
    },
    failingTests: {
      type: DataTypes.INTEGER,
      field: 'failing_tests',
    },
    completedTests: {
      type: DataTypes.INTEGER,
      field: 'completed_tests',
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
