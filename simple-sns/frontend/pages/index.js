import React from 'react';
import { Button, Form, Input } from "antd";
import { useSelector } from "react-redux";

import PostForm from '../components/PostForm';

const Home = () => {
    const { info } = useSelector(state => state.user);
    return (
        <>
            {info ?
                <PostForm />
                : null
            }
        </>
    )
};
export default Home;
