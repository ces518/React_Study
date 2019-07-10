import React from 'react';
import { Card, Avatar } from 'antd';
import { useSelector } from "react-redux";

const Profile = () => {
    const { info } = useSelector(state => state.user);
    return (
        <Card
            actions={[
                <div key="twit">짹짹 <br/> 0</div>,
                <div key="following">팔로잉 <br/> 0</div>,
                <div key="follower">팔로워 <br/> 0</div>
            ]}
        >
            <Card.Meta
                avatar={<Avatar>{info.nickname[0]}</Avatar>}
                title={info.nickname}
            />
        </Card>
    )
};

export default Profile;
