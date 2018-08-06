export default (sequelize, DataTypes) => {
  const SubFunction = sequelize.define('subFunction', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
  }, { underscored: true })

  SubFunction.associate = (models) => {
    SubFunction.belongsToMany(models.Item, {
      as: 'Items',
      through: 'sub_function_item',
      targetKey: 'id',
    })
  }
  return SubFunction
}
