import React, { useEffect, useCallback, useState } from 'react';
import { Button, List, Card, Icon } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import Router from 'next/router';
import NicknameEditForm from "../components/NicknameEditForm";
import PostCard from '../components/PostCard';
import { LOAD_FOLLOWERS_REQUEST, LOAD_FOLLOWINGS_REQUEST, UNFOLLOW_USER_REQUEST, REMOVE_FOLLOWER_REQUEST } from '../reducers/user';
import { LOAD_USER_POSTS_REQUEST } from '../reducers/post';

const Profile = () => {
    const dispatch = useDispatch();
    const { me, followingList, followerList } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        if (me) {
            dispatch({
                type: LOAD_FOLLOWERS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: LOAD_FOLLOWINGS_REQUEST,
                data: me.id,
            });
            dispatch({
                type: LOAD_USER_POSTS_REQUEST,
                data: me.id,
            });
        }
    }, [me && me.id]);

    const onUnfollow = useCallback(id => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: id,
        });
    }, []);

    const onRemoveFollower = useCallback(id => () => {
        dispatch({
            type: REMOVE_FOLLOWER_REQUEST,
            data: id,
        });
    }, []);

    return (
        <>
            <div>
                <NicknameEditForm/>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로잉 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={followingList}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={onUnfollow(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로워 목록</div>}
                    loadMore={<Button style={{ width: '100%' }}>더 보기</Button>}
                    bordered
                    dataSource={followerList}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={onRemoveFollower(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <div>
                    {mainPosts.map(c => (
                        <PostCard key={+c.createdAt} post={c} />
                    ))}
                </div>
            </div>
        </>
    )
};

export default Profile;
