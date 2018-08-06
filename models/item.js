export default (sequelize, DataTypes) => {
  const Item = sequelize.define('item', {
    itemNumber: {
      type: DataTypes.INTEGER,
      field: 'item_number',
    },
    name: {
      type: DataTypes.STRING,
    },
    isFixture: {
      type: DataTypes.BOOLEAN,
      field: 'is_fixture',
    },
    referenceId: {
      type: DataTypes.STRING,
      field: 'reference_id',
    },
    status: {
      type: DataTypes.INTEGER,
    },
    taskRating: {
      type: DataTypes.INTEGER,
      field: 'task_rating',
    },
    currentStage: {
      type: DataTypes.INTEGER,
      field: 'current_stage',
    },
    milestone: {
      type: DataTypes.INTEGER,
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    technicalRisk: {
      type: DataTypes.INTEGER,
      field: 'technical_risk',
    },
    totalEffort: {
      type: DataTypes.INTEGER,
      field: 'total_effort',
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      field: 'is_active',
    },
  }, { underscored: true })

  Item.associate = (models) => {
    Item.belongsTo(models.Project, {
      targetKey: 'id',
    })
    Item.belongsTo(models.Product, {
      as: 'Product',
      sourceKey: 'id',
    })
    Item.belongsTo(models.User, {
      as: 'User',
      targetKey: 'id',
    })
    Item.hasMany(models.Stage, {
      as: 'Stages',
      sourceKey: 'id',
    })
    Item.hasMany(models.Message, {
      as: 'Messages',
      sourceKey: 'id',
    })
    Item.belongsToMany(models.SubFunction, {
      through: 'sub_function_item',
      as: 'SubFunctions',
      targetKey: 'id',
    })
  }

  return Item
}
