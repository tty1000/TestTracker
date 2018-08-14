// import message from '../models'

export default (sequelize, DataTypes) => {
  const Item = sequelize.define(
    'item',
    {
      itemNumber: {
        type: DataTypes.INTEGER,
        field: 'item_number',
      },
      name: {
        type: DataTypes.STRING,
      },
      isFixture: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        field: 'is_fixture',
      },
      referenceId: {
        type: DataTypes.STRING,
        field: 'reference_id',
      },
      status: {
        type: DataTypes.INTEGER,
        default: 0,
        // 0 = Pending, 1 = PASS, 2 = FAIL, 3 = IN PROCESS, 4 = COMPLETE, 5 = GATED SW,
        // 6 = GATED HW, 7 = GATED FIXTURE, 8 = GATED FPGA, 9 = GATED Equip
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
        default: 1,
        // 1 = none, 2 = P4, 3 = REV B TO, 4 = EAS, 5 = RFUBO, 6 = LAB ENTRY
      },
      priority: {
        type: DataTypes.INTEGER,
        default: 1,
        // 1 = low, 2 = average, 3 = high, 4 = critical
      },
      technicalRisk: {
        type: DataTypes.INTEGER,
        default: 1,
        // 1 = low, 2 = average, 3 = high, 4 = critical
        field: 'technical_risk',
      },
      totalEffort: {
        type: DataTypes.INTEGER,
        field: 'total_effort',
      },
      isActive: {
        type: DataTypes.BOOLEAN,
        default: true,
        field: 'is_active',
      },
    },
  )
  Item.afterCreate((item) => { // change itemNumber to id on creation
    const itemId = item.attributes.id
    item.updateAttributes({ itemNumber: itemId })
  })
  Item.beforeBulkUpdate((item) => {
    const attr = item.attributes
    const diffList = {}
    item.fields.forEach((field) => {
      console.log(attr[field])
      if (attr[field] !== undefined) {
        diffList[field] = attr[field]
      }
    })
    console.log(diffList)
    // message.Message.create({
    //   where: { item_id: attr.id, content:  },
    // })    
  })
  // Item.afterUpdate((item) => {
  //   const attr = item.attributes
  //   const rating = attr.milestone * attr.priority * attr.technicalRisk
  //   item.updateAttributes({ taskRating: rating })
  // })
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
    Item.belongsToMany(models.Subfunction, {
      through: 'subfunction_item',
      as: 'Subfunctions',
      targetKey: 'id',
    })
  }

  return Item
}
