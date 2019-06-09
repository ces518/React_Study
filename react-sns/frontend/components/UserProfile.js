import React from 'react';
import { Card, Avatar } from 'antd';

const UserProfile = () => {
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/> {dummy.post.length}</div>,
                <div key="following">팔로잉 <br/> {dummy.following.length}</div>,
                <div key="follower">팔로워 <br/> {dummy.follower.length}</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{dummy.nickname[0]}</Avatar>}
                title={dummy.nickname}
            />
        </Card>
    )
};

export default UserProfile;
