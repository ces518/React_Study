import React from 'react';
import { Form, Input, Button } from 'antd';
import styled from 'styled-components';
import { useSelector } from "react-redux";

const ImageWrapper = styled.div`
    display: inline-block;
`;
const ImagePreview = styled.img`
    width: 200px;
`;

const PostForm = () => {
    const { uploadImages } = useSelector(state => state.post);
    return (
        <Form encType="multipart/form-data">
            <Input.TextArea maxLength={140} placeholder="오늘은 어떤일이 있었나요 ?" />
            <div>
                <input type="file" multiple hidden />
                <Button>이미지 업로드</Button>
                <Button type="primary" style={{ float: 'right' }} htmlType="submit" >등록</Button>
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
};

export default PostForm;
