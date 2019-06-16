module.exports = (sequelize, DataTypes) => {

    // user 엔티티 정의
    const User = sequelize.define('User', { // 테이블명이 users 로 생성된다.
        nickname: {
            type: DataTypes.STRING(20),
            allowNull: false,
        },
        userId: {
            type: DataTypes.STRING(20),
            allowNull: false,
            unique: true,
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci',
    });

    // user 엔티티의 관계 정의
    User.associate = (db) => {
        db.User.hasMany(db.Post, { as: 'Posts' }); // 관계 조합이 같을경우 as 로 구분을 지어줄것.
        db.User.hasMany(db.Comment);
        db.User.belongsToMany(db.Post, { through: 'Like', as: 'Liked' }); // 게시글 좋아요 관계
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followers' }); // 팔로잉, 팔로우 관계
        db.User.belongsToMany(db.User, { through: 'Follow', as: 'Followings' }); // 본인과의 관계일경우 두번 명시해줘야함.
    };

    return User;
};

