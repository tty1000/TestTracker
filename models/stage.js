export default (sequelize, DataTypes) => {
  const Stage = sequelize.define('stage', {
    stage: {
      type: DataTypes.INTEGER,
    },
    effort: {
      type: DataTypes.INTEGER,
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
  }, { underscored: true })


  Stage.associate = (models) => {
    Stage.belongsTo(models.Item, {
      targetKey: 'id',
    })
  }

  return Stage
}
