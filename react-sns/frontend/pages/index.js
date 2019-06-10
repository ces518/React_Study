import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { LOG_IN, LOG_OUT, loginAction, logoutAction } from '../reducers/user';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const dispatch = useDispatch();
    // 전체 state에서 user 를 가져온다.
    // state는 전체를 의미한다.
    const { isLoggedIn ,user } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    return (
      <>
          {isLoggedIn && <PostForm />}
          {mainPosts.map((c) => {
              return (
                 <PostCard key={c} post={c}/>
              )
          })}
      </>
    )
};

function mapStateToProps (state) {
    return {
        user: state.user,
    }
};

function mapDispatchToProps (dispatch) {
    return {
        login: () => dispatch(loginAction),
        logout: () => dispatch(logoutAction),
    }
};

export default Home;
