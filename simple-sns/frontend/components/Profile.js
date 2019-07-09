import React from 'react';
import { Card, Avatar } from 'antd';

const Profile = () => {
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/> 0</div>,
                <div key="following">팔로잉 <br/> 0</div>,
                <div key="follower">팔로워 <br/> 0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{'준영'[0]}</Avatar>}
                title={'준영'}
            />
        </Card>
    )
};

export default Profile;
