export default (sequelize, DataTypes) => {
  const Message = sequelize.define('message', {
    fieldChanged: {
      type: DataTypes.STRING,
      field: 'field_changed',
    },
    dateChanged: {
      type: DataTypes.DATE,
      field: 'date_changed',
    },
    priority: {
      type: DataTypes.INTEGER,
    },
    isShown: {
      type: DataTypes.BOOLEAN,
      field: 'is_shown',
    },
  }, { underscored: true });

  Message.associate = (models) => {
    Message.belongsTo(models.Item, {
      targetKey: 'id',
    })
  }

  return Message
}
