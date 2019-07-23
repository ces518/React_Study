import React, { useEffect, useState, memo } from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useDispatch, useSelector } from "react-redux";
import {ADD_POST_REQUEST} from "../reducers/post";

const ImageWrapper = styled.div`
    display: inline-block;
`;
const ImagePreview = styled.img`
    width: 200px;
`;

const PostForm = memo(() => {
    const [text, setText] = useState('');
    const { uploadImages, addingPost, postAdded } = useSelector(state => state.post);
    const dispatch = useDispatch();

    // 최초 실행 : ComponentDidMounted
    // deps [] 의 값이바뀔때마다 실행: ComponentDidUpdate
    useEffect(() => {
        if (postAdded) {
            setText('');
        }
    }, [postAdded === true]);

    const onChangeText = (e) => {
        setText(e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        dispatch({
            type: ADD_POST_REQUEST,
            data: text,
        });
    };

    return (
        <Form encType="multipart/form-data" onSubmit={onSubmit}>
            <Input.TextArea maxLength={140} placeholder="오늘은 어떤일이 있었나요 ?" value={text} onChange={onChangeText}/>
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={addingPost}>등록</Button>
            </div>
            <div>
                {uploadImages.map((v, i) => {
                    return (
                        <ImageWrapper key={v}>
                            <ImagePreview src={'http://localhost:3065/' + v} alt={v}/>
                            <div>
                                <Button>제거</Button>
                            </div>
                        </ImageWrapper>
                    )
                })}
            </div>
        </Form>
    )
});

export default PostForm;
