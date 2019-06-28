import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import {LOAD_MAIN_POSTS_REQUEST} from "../reducers/post";

const Home = () => {
    const dispatch = useDispatch();
    // 전체 state에서 user 를 가져온다.
    // state는 전체를 의미한다.
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({ // 메인포스트 불러오기
            type: LOAD_MAIN_POSTS_REQUEST,
        });
    }, []);

    return (
      <>
          {me && <PostForm />}
          {mainPosts.map((c) => {
              return (
                 <PostCard key={c} post={c}/>
              )
          })}
      </>
    )
};

// Generator문법
// 무한의 개념, 비동기 처리시 사용한다.

function* generator () {

}

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

Home.getInitialProps = async (context) => { // context: app.js 에서넣어주는 context.ctx
    console.log(Object.keys(context)); // store 가 존재하는데 redux-store 임
    context.store.dispatch({
        type: LOAD_MAIN_POSTS_REQUEST,
    });
};

export default Home;
