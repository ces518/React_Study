import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import {Avatar, Button, Card, Comment, Form, Icon, Input, List, Popover} from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import PostImages from './PostImages';
import {
    ADD_COMMENT_REQUEST,
    LIKE_POST_REQUEST,
    LOAD_COMMENTS_REQUEST,
    RETWEET_REQUEST,
    UNLIKE_POST_REQUEST,
    REMOVE_POST_REQUEST
} from "../reducers/post";
import PostCardContent from "./PostCardContent";
import {FOLLOW_USER_REQUEST, UNFOLLOW_USER_REQUEST} from "../reducers/user";
import styled from 'styled-components';
import moment from 'moment';

moment.locale('ko'); // 모멘트 한글 설정

const CardWrapper = styled.div`
    margin-top: 10px;
`;

const PostCard = ({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const { isAddingComment, commentAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    const liked = me && post.Likers && post.Likers.find(v => v.id === me.id);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
      if (!commentFormOpened) {
          dispatch({
              type: LOAD_COMMENTS_REQUEST,
              data: post.id,
          });
      }
    }, [post.id]);

    const onChangeCommentText = useCallback((e) => {
        setCommentText(e.target.value);
    }, []);

    const onSubmitComment = useCallback((e) => {
        e.preventDefault();
        if (!me) { // 로그인한 사용자만 가능하도록 처리
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: ADD_COMMENT_REQUEST,
            data: {
                postId: post.id,
                content: commentText,
            }
        });
    }, [me && me.id, commentText]); // 객체 말고 기본자료형을 넣어줄것.

    const onToggleLike = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }

        if (liked) { // 좋아요 누른 상태
            dispatch({
                type: UNLIKE_POST_REQUEST,
                data: post.id,
            });
        } else { // 좋아요 안누른 상태
            dispatch({
                type: LIKE_POST_REQUEST,
                data: post.id,
            });
        }
    }, [me && me.id, post && post.id, liked]);

    const onRetweet = useCallback(() => {
        if (!me) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [me && me.id, post && post.id]);

    const onFollow = useCallback(userId => () => {
        dispatch({
            type: FOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onUnFollow = useCallback(userId => () => {
        dispatch({
            type: UNFOLLOW_USER_REQUEST,
            data: userId,
        });
    }, []);

    const onRemovePost = useCallback(postId => () => {
        dispatch({
            type: REMOVE_POST_REQUEST,
            data: postId,
        });
    }, []);

    return (
        <CardWrapper>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" onClick={onRetweet} />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
                    // Icon 기본테마는 outlined, 컬러를 주려면 twoTone 을 사용
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Popover
                        key="ellipsis"
                        content={(
                            <Button.Group>
                                {me && post.UserId === me.id
                                    ? (
                                        <>
                                            <Button>수정</Button>
                                            <Button type="danger" onClick={onRemovePost(post.id)}>삭제</Button>
                                        </>
                                    )
                                    : <Button>신고</Button>}
                            </Button.Group>
                        )}
                    >
                        <Icon type="ellipsis"/>
                    </Popover>,

                ]}
                title={post.RetweetId ? `${post.User.nickname}님이 리트윗하셨습니다.` : null}
                extra={!me || post.User.id === me.id
                    ? null
                    : me.Followings && me.Followings.find(v => v.id == post.User.id) // 내 팔로윙 목록에 존재할경우
                        ? <Button onClick={onUnFollow(post.User.id)}>언팔로우</Button>
                        : <Button onClick={onFollow(post.User.id)}>팔로우</Button>
                }
            >
                {post.RetweetId && post.Retweet ?
                    (<Card
                        cover={post.Retweet.Images[0] && <PostImages images={post.Retweet.Images}/>}
                    >
                        <Card.Meta // 리트윗한경우
                            avatar={<Link href={{ pathname: '/user', query: { id: post.Retweet.User.id } }} as={`/user/${post.Retweet.User.id}`}><a><Avatar>{post.Retweet.User.nickname[0]}</Avatar></a></Link>}
                            title={post.Retweet.User.nickname}
                            description={<PostCardContent postData={post.Retweet.content} />} // next 의 Link 태그로 바꾸어주어야함
                        />
                        {moment(post.createdAt).format('yyyy.mm.dd')}
                    </Card>)
                    :
                    (<Card.Meta // 리트윗안한경우
                        avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                        title={post.User.nickname}
                        description={<PostCardContent postData={post.content} />} // next 의 Link 태그로 바꾸어주어야함
                    />
                    )
                }

            </Card>
            { commentFormOpened && (
                <>
                    <Form onSubmit={onSubmitComment}>
                        <Form.Item>
                            <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
                        </Form.Item>
                        <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
                    </Form>
                    <List
                        header={ `${post.comments ? post.comments.length : 0 } 댓글`}
                        itemLayout="horizontal"
                        dataSource={post.comments || []}
                        renderItem={item => (
                            <li>
                                <Comment
                                    author={item.User.nickname}
                                    avatar={<Link href={{ pathname: '/user', query: { id: item.User.id } }} as={`/user/${item.User.id}`}><a><Avatar>{item.User.nickname[0]}</Avatar></a></Link>}
                                    content={item.content}
                                />
                            </li>
                        )}
                    />
                </>
            )}
        </CardWrapper>
    )
};

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
    }),
};

export default PostCard;
