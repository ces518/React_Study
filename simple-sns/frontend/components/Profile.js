import React, { useCallback } from 'react';
import { Card, Avatar, Button } from 'antd';
import { useSelector, useDispatch } from "react-redux";
import { LOGOUT_REQUEST } from "../reducers/user";

const Profile = () => {
    const { info } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const logout = useCallback(() => {
        dispatch({
            type: LOGOUT_REQUEST,
        });
    }, []);
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
            <Button type="primary" onClick={logout}>로그아웃</Button>
        </Card>
    )
};

export default Profile;
