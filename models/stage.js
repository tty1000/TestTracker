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
  }, { underscored: true })


  Stage.associate = (models) => {
    Stage.belongsTo(models.Item, {
      targetKey: 'id',
    })
  }

  return Stage
}
