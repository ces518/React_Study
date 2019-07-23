import React from 'react';
import { useSelector } from "react-redux";

import PostForm from '../components/PostForm';
import PostCard from "../components/PostCard";

const Home = () => {
    const { info } = useSelector(state => state.user);
    const { posts } = useSelector(state => state.post);
    console.dir(posts);
    return (
        <>
            {info ?
                <PostForm />
                : null
            }
            {posts.map(post => <PostCard post={post} key={post.id}/>)}
        </>
    )
};
export default Home;
