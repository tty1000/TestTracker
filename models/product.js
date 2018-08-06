export default (sequelize, DataTypes) => {
  const Product = sequelize.define('product', {
    name: {
      type: DataTypes.STRING,
      unique: true,
    },
  }, { underscored: true })


  Product.associate = (models) => {
    Product.hasMany(models.Item, {
      targetKey: 'id',
    })
  }

  return Product
}
