const {Model} = require("sequelize");

module.exports =  (sequelize, DataTypes) => {
    class Articles extends Model {}
    Articles.init({
        created_time: DataTypes.DATE,
        title: DataTypes.STRING,
        subtitle: DataTypes.STRING,
        content: DataTypes.STRING,
        categories: DataTypes.STRING,
        author: DataTypes.STRING,
        link: DataTypes.STRING,
    }, {
        paranoid: true,
        sequelize,
        tableName: 'articles',
        modelName: 'articles',
    });
    return Articles;
}
