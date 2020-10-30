module.exports = function(sequelize, DataTypes) {
    const Flock = sequelize.define("Flock", {
      startDate: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      birdCount: {
        type: DataTypes.INTEGER,
      }
    });

    
    Flock.associate = function(models) {
        Flock.belongsTo(models.User, {
            foreignKey: {
              allowNull: false
            }
        });
        Flock.hasMany(models.DailyRecord, {
          onDelete: "cascade"
        });
    };

    return Flock;
};
  