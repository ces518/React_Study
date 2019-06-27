import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch, } from "react-redux";
import { Avatar, Button, Card, Comment, Form, Icon, Input, List } from "antd";
import PropTypes from 'prop-types';
import Link from 'next/link';
import PostImages from './PostImages';
import {ADD_COMMENT_REQUEST, LIKE_POST_REQUEST, LOAD_COMMENTS_REQUEST, UNLIKE_POST_REQUEST} from "../reducers/post";

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

    return (
        <div>
            <Card
                key={+post.createdAt}
                cover={post.Images[0] && <PostImages images={post.Images} />}
                actions={[
                    <Icon type="retweet" key="retweet" />,
                    <Icon type="heart" key="heart" theme={liked ? 'twoTone' : 'outlined'} twoToneColor="#eb2f96" onClick={onToggleLike}/>,
                    // Icon 기본테마는 outlined, 컬러를 주려면 twoTone 을 사용
                    <Icon type="message" key="message" onClick={onToggleComment}/>,
                    <Icon type="ellipsis" key="ellipsis" />,

                ]}
                extra={<Button>팔로우</Button>}
            >
                <Card.Meta
                    avatar={<Link href={{ pathname: '/user', query: { id: post.User.id } }} as={`/user/${post.User.id}`}><a><Avatar>{post.User.nickname[0]}</Avatar></a></Link>}
                    title={post.User.nickname}
                    description={<div>{post.content.split(/(#[^\s]+)/g).map(v => {
                        if (v.match(/#[^\s]+/)) {
                            return (
                                <Link href={{ pathname: '/hashtag', query: { tag: v.slice(1) } }} as={`/hashtag/${v.slice(1)}`} key={v}><a>{v}</a></Link>
                            )
                        }
                        return v;
                    })}</div>} // next 의 Link 태그로 바꾸어주어야함
                />
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
