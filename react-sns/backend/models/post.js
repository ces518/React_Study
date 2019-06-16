module.exports = (sequelize, DataTypes) => {

    const Post = sequelize.define('Post', {
        content: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
    }, {
        charset: 'utf8mb4', // 한글 + 이모티콘
        collate: 'utf8mb4_general_ci',
    });

    Post.associate = (db) => {
        db.Post.belongsTo(db.User);
        db.Post.hasMany(db.Comment);
        db.Post.hasMany(db.Image);
        db.Post.belongsToMany(db.Hashtag, { through: 'PostHashtag'}); // 해시태그와 대다대 관
        db.Post.belongsTo(db.Post, { as: 'Retweet'}); // 리트윗 관계
        db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers'}); // 게시글 좋아요 관계
    };

    return Post;
};

