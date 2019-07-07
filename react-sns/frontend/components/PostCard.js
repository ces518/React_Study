import React, { useState, useCallback, useEffect, memo } from "react";
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
import CommentForm from "./CommentForm";
import FollowButton from "./FollowButton";

moment.locale('ko'); // 모멘트 한글 설정

const CardWrapper = styled.div`
    margin-top: 10px;
`;

const PostCard = memo(({ post }) => {
    const [ commentFormOpened, setCommentFormOpened ] = useState(false);
    const id = useSelector(state => state.user.me && state.user.me.id);
    const dispatch = useDispatch();

    const liked = id && post.Likers && post.Likers.find(v => v.id === id);

    const onToggleComment = useCallback(() => {
      setCommentFormOpened(prev => !prev);
      if (!commentFormOpened) {
          dispatch({
              type: LOAD_COMMENTS_REQUEST,
              data: post.id,
          });
      }
    }, [post.id]);

    const onToggleLike = useCallback(() => {
        if (!id) {
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
    }, [id, post && post.id, liked]);

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

    const onRetweet = useCallback(() => {
        if (!id) {
            return alert('로그인이 필요합니다.');
        }
        return dispatch({
            type: RETWEET_REQUEST,
            data: post.id,
        });
    }, [id, post && post.id]);

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
                                {id && post.UserId === id
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
                extra={<FollowButton post={post} onFollow={onFollow} onUnFollow={onUnFollow}/>
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
                    <CommentForm post={post}/>
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
});

PostCard.proptypes = {
    post: PropTypes.shape({
        User: PropTypes.object,
        content: PropTypes.string,
        img: PropTypes.string,
        createdAt: PropTypes.string,
    }),
};

export default PostCard;
