const {Model} = require("sequelize");

module.exports =  (sequelize, DataTypes) => {
    class Votes extends Model {}
    Votes.init({
        parent: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        info: DataTypes.STRING,
        total_dpt: DataTypes.STRING,
        total_dptb: DataTypes.STRING,
        total_dpk: DataTypes.STRING,
        total_dpt_dptb_dpk: DataTypes.STRING,
        candidate_1: DataTypes.STRING,
        candidate_2: DataTypes.STRING,
        candidate_3: DataTypes.STRING,
        total_valid: DataTypes.STRING,
        total_invalid: DataTypes.STRING,
        total_valid_invalid: DataTypes.STRING,
    }, {
        paranoid: true,
        sequelize,
        tableName: 'votes',
        modelName: 'votes',
    });
    return Votes;
}
