import React, {useCallback, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import { Form, Input, Button } from 'antd';
import { EDIT_NICKNAME_REQUEST } from '../reducers/user';

const NicknameEditForm = () => {
    const dispatch = useDispatch();
    const [editedName, setEditedName] = useState('');
    const { me, isEdittingNickname } = useSelector(state => state.user);


    const onChangeNickname = useCallback((e) => {
        setEditedName(e.target.value);
    }, []);

    const onEditNickname = useCallback((e) => {
        e.preventDefault();
        dispatch({
            type: EDIT_NICKNAME_REQUEST,
            data: editedName,
        });
    }, [editedName]);

    return (
        <Form style={{ marginBottom: '20px', border: '1px solid #d9d9d9', padding: '20px' }} onSubmit={onEditNickname}>
            <Input addonBefore="닉네임" value={editedName} onChange={onChangeNickname} />
            <Button type="primary" htmlType="submit" loading={isEdittingNickname}>수정</Button>
        </Form>
    )
};

export default NicknameEditForm;
