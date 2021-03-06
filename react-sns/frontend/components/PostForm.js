import React, { useCallback, useState, useEffect, useRef } from 'react';
import { Form, Input, Button } from 'antd';
import { useSelector, useDispatch } from 'react-redux';
import {ADD_POST_REQUEST, REMOVE_IMAGE, UPLOAD_IMAGES_REQUEST} from "../reducers/post";

const PostForm = () => {
    const { imagePaths, isAddingPost, postAdded } = useSelector(state => state.post);
    const [ text, setText ] = useState('');
    const imageInput = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        setText('');
    }, [postAdded === true]);

    const onSubmitForm = useCallback((e) => {
        e.preventDefault();
        if (!text || !text.trim()) {
            return alert('게시글을 작성해주세요.');
        }

        const formData = new FormData();
        imagePaths.forEach((i) => {
            formData.append('image', i);
        });
        formData.append('content', text);

        dispatch({
            type: ADD_POST_REQUEST,
            data: formData,
        });
    }, [text, imagePaths]);

    const onChangeText = useCallback((e) => {
        setText(e.target.value);
    }, []);

    const onChangeImages = useCallback((e) => {
       console.log(e.target.files);
       const imageFormData = new FormData();
       [].forEach.call(e.target.files, (f) => { // formData로 append작업
           imageFormData.append('image', f);
       });

       dispatch({ // 이미지 업로드 액션 발생
           type: UPLOAD_IMAGES_REQUEST,
           data: imageFormData,
       });
    }, []);

    const onClickImageUpload = useCallback(() => {
        imageInput.current.click();
    }, []);

    const onRemoveImage = useCallback(index => () => { // 고차함수로 기존함수를 확장하는것.
        dispatch({
            type: REMOVE_IMAGE,
            data: index,
        });
    }, []);
    return (
      <Form style={{ margin: '10px 0 20px' }} encType="multipart/form-data" onSubmit={onSubmitForm}>
          <Input.TextArea maxLength={140} placeholder="어떤 신기한 일이 있었나요?" value={text} onChange={onChangeText}/>
          <div>
              <input type="file" multiple hidden ref={imageInput} onChange={onChangeImages}/>
              <Button onClick={onClickImageUpload}>이미지 업로드</Button>
              <Button type="primary" style={{ float: 'right' }} htmlType="submit" loading={isAddingPost}>짹짹</Button>
          </div>
          <div>
              {imagePaths.map((v, i) => {
                  return (
                      <div key={v} style={{ display: 'inline-block' }}>
                          <img src={'http://localhost:3065/' + v} style={{ width: '200px' }} alt={v}/>
                          <div>
                              <Button onClick={onRemoveImage(i)}>제거</Button>
                          </div>
                      </div>
                  )
              })}
          </div>
      </Form>
    )
};

export default PostForm;
