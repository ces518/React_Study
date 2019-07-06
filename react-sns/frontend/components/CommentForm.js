import { Button, Form, Input } from "antd";
import React, { useCallback, useEffect, useState } from "react";
import { ADD_COMMENT_REQUEST } from "../reducers/post";
import { useDispatch, useSelector } from "react-redux";

const CommentForm = ({ post }) => {
    const [ commentText, setCommentText ] = useState('');
    const { me } = useSelector(state => state.user);
    const dispatch = useDispatch();
    const { isAddingComment, commentAdded } = useSelector(state => state.post);

    useEffect(() => {
        setCommentText('');
    }, [commentAdded === true]);

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

    return (
        <Form onSubmit={onSubmitComment}>
            <Form.Item>
                <Input.TextArea rows={4} value={commentText} onChange={onChangeCommentText}/>
            </Form.Item>
            <Button type="primary" htmlType="submit" loading={isAddingComment}>삐약</Button>
        </Form>
    );
};
export default CommentForm;
