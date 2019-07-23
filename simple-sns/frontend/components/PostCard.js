import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Avatar, Button, Card, Comment, Form, Icon, List, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

const PostCard = ({ post }) => {

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <img alt="example" src={post.Images[0].src} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" />,
                    <Icon type="message" key="message"/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Avatar>{post.User.nickname[0]}</Avatar>}
                    title={post.User.nickname}
                    description={post.content}
                />
            </Card>
        </div>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.object,
    }),
};

export default PostCard;
