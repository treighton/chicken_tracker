module.exports = function(sequelize, DataTypes) {
    const DailyRecord = sequelize.define("DailyRecord", 
    {
        date: {
            type: DataTypes.STRING,
            allowNull: false,
         },
        temperature: {
            type: DataTypes.INTEGER,
        },
        feed: {
            type: DataTypes.INTEGER
        },
        bedding: {
            type: DataTypes.BOOLEAN
        },
        mortality: {
            type: DataTypes.INTEGER
        },
        notes:{
            type: DataTypes.STRING,
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
  