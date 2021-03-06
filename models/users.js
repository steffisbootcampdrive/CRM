module.exports = function (sequelize, DataTypes) {
  var Users = sequelize.define(
    "Users",
    {
      //   id: {
      //     type: DataTypes.INTEGER,
      //     primaryKey: true,
      //     autoIncrement: true,
      //   },
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      lastName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
          len: [1],
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          len: [1],
        },
      },
      email: {
        type: DataTypes.STRING,
        validate: {
          isEmail: true,
          notEmpty: true,
        },
      },
      profImg: {
        type: DataTypes.STRING,
        defaultValue:
          "https://images-test-hss.s3.us-east-2.amazonaws.com/ProfileImgs/default.jpg",
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
  Users.associate = function (models) {
    models.Users.hasMany(models.Customers, {
      onDelete: "cascade",
    });
    models.Users.hasMany(models.Tickets, {
      onDelete: "cascade",
    });
    models.Users.hasMany(models.Comments, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
      },
    });
    models.Users.hasMany(models.Notes, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false,
      },
    });
  };
  return Users;
};
