import React from "react";
import { Button } from "antd";
import PropTypes from 'prop-types';
import { useSelector}  from "react-redux";

const FollowButton = ({ post, onFollow, onUnFollow }) => {
    const { me } = useSelector(state => state.user);
    return (
        !me || post.User.id === me.id
        ? null
        :
        me.Followings && me.Followings.find(v => v.id == post.User.id) // 내 팔로윙 목록에 존재할경우
            ? <Button onClick={onUnFollow(post.User.id)}>언팔로우</Button>
            : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
    )
};

FollowButton.propTypes = {
    post: PropTypes.object.isRequired,
};

export default FollowButton;
