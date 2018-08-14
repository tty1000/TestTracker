export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    fieldChanged: {
      type: DataTypes.STRING,
      field: 'field_changed',
    },
    content: {
      type: DataTypes.STRING,
    },
  }, { underscored: true });

  Message.associate = (models) => {
    Message.belongsTo(models.Item, {
      targetKey: 'id',
    })
  }

  return Message
}
