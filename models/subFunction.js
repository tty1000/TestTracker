export default (sequelize, DataTypes) => {
  const Subfunction = sequelize.define('subfunction', {
    name: {
      type: DataTypes.STRING,
      unique: true,
      required: true,
    },
  }, { underscored: true })

  Subfunction.associate = (models) => {
    Subfunction.belongsToMany(models.Item, {
      as: 'Items',
      through: 'subfunction_item',
      targetKey: 'id',
    })
  }
  return Subfunction
}
