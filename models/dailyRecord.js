module.exports = function(sequelize, DataTypes) {
    const DailyRecord = sequelize.define("DailyRecord", 
    {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        birdCount: {
            type: DataTypes.INTEGER,
        }
    });

    DailyRecord.associate = function(models) {
        DailyRecord.belongsTo(models.Flock, {
          foreignKey: {
            allowNull: false
          }
        });
    };

    return DailyRecord;
};
  