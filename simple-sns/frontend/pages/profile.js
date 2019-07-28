import React, { useState, useEffect } from 'react';
import { Button, Card, Form, Icon, Input, List } from "antd";
import { useDispatch, useSelector } from "react-redux";
import Router from 'next/router';

const Profile = () => {
    const [nickname, setNickname] = useState('');
    const { info } = useSelector(state => state.user);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!info) {
            alert('로그인 후 이용하실 수 있습니다.');
            Router.push('/');
        }
    }, [info && info.id]);

    const onEditNickname = (e) => {
        e.preventDefault();
    };

    const onChangeNickname = (e) => {
        setNickname(e.target.value);
    };

    const loadMoreFollowers = () => {

    };

    const loadMoreFollowings = () => {

    };

    const unFollow = id => () => {

    };

    const unFollowing = id => () => {

    };

    return (
        <>
            <div>
                <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }} onSubmit={onEditNickname}>
                    <Input addonBefore="닉네임" value={nickname} onChange={onChangeNickname} />
                    <Button type="primary" htmlType="submit" loading={false}>수정</Button>
                </Form>
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로워목록</div>}
                    loadMore={<Button style={{ width: '100%' }} onClick={loadMoreFollowers}>더 보기</Button>}
                    bordered
                    dataSource={[]}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={unFollow(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                <List
                    style={{ marginBottom: '20px' }}
                    grid={{ gutter: 4, xs: 2, md: 3 }}
                    size="smail"
                    header={<div>팔로잉목록</div>}
                    loadMore={<Button style={{ width: '100%' }} onClick={loadMoreFollowings}>더 보기</Button>}
                    bordered
                    dataSource={[]}
                    renderItem={item => (
                        <List.Item style={{ marginTop: '20px' }}>
                            <Card actions={[<Icon key="stop" type="stop" />]} onClick={unFollowing(item.id)}>
                                <Card.Meta description={item.nickname}/>
                            </Card>
                        </List.Item>
                    )}
                />
                {/*<div>*/}
                {/*    {mainPosts.map(c => (*/}
                {/*        <PostCard key={c.id} post={c} />*/}
                {/*    ))}*/}
                {/*</div>*/}
            </div>
        </>
    )
};
export default Profile;
