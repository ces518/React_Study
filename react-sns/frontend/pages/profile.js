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
    const { me, followingList, followerList, hasMoreFollower, hasMoreFollowing } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

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

    const loadMoreFollowings = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWINGS_REQUEST,
            offset: followingList.length,
        });
    }, [followingList && followingList.length]);

    const loadMoreFollowers = useCallback(() => {
        dispatch({
            type: LOAD_FOLLOWERS_REQUEST,
            offset: followerList.length,
        });
    }, [followerList && followerList.length]);

    return (
        <>
            <div>
                <NicknameEditForm/>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로잉 목록</div>}
                    loadMore={hasMoreFollowing ? <Button style={{ width: '100%' }} onClick={loadMoreFollowings}>더 보기</Button> : null}
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
                    loadMore={hasMoreFollower ? <Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더 보기</Button> : null}
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

Profile.getInitialProps = async (context) => {
    const state = context.store.getState();
    context.store.dispatch({
        type: LOAD_FOLLOWERS_REQUEST,
        data: state.user.me && state.user.me.id
    });
    context.store.dispatch({
        type: LOAD_FOLLOWINGS_REQUEST,
        data: state.user.me && state.user.me.id
    });
    context.store.dispatch({
        type: LOAD_USER_POSTS_REQUEST,
        data: state.user.me && state.user.me.id
    });
};

export default Profile;
