const {Model} = require("sequelize");

module.exports =  (sequelize, DataTypes) => {
    class ElectionVotes extends Model {}
    ElectionVotes.init({
        info: DataTypes.STRING,
        parent: DataTypes.INTEGER,
        level: DataTypes.INTEGER,
        name: DataTypes.STRING,
        url: DataTypes.STRING,
        progress: DataTypes.STRING,
        candidate_1: DataTypes.STRING,
        candidate_2: DataTypes.STRING,
        candidate_3: DataTypes.STRING,
    }, {
        paranoid: true,
        sequelize,
        tableName: 'election_votes',
        modelName: 'electionVotes',
    });
    return ElectionVotes;
}
