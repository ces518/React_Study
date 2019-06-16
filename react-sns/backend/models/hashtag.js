module.exports = (sequelize, DataTypes) => {

    const Hashtag = sequelize.define('Hashtag', {
        name: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4',
        collate: 'utf8mb4_general_ci',
    });

    Hashtag.associate = (db) => {
        db.Hashtag.belongsToMany(db.User, { through: 'PostHashtag'}); // 다대다 관계의 경우 관계사이의 테이블정의
    };

    return Hashtag;
};
