export default (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    emailId: {
      type: DataTypes.STRING,
      unique: true,
    },
    name: {
      type: DataTypes.STRING,
    },
    location: {
      type: DataTypes.STRING,
    },
  }, { underscored: true })

  User.associate = (models) => {
    User.hasMany(models.Item, {
      sourceKey: 'id',
    })
    User.hasMany(models.Project, {
      sourceKey: 'id',
    })
  }
  return User
}
