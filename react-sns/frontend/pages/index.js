import React, {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';

const Home = () => {
    const dispatch = useDispatch();
    // 전체 state에서 user 를 가져온다.
    // state는 전체를 의미한다.
    const { me } = useSelector(state => state.user);
    const { mainPosts } = useSelector(state => state.post);

    useEffect(() => {
        dispatch({
            type: 'HELLO_SAGA',
        });

        dispatch({
            type: 'HELLO_SAGA',
        });

        dispatch({
            type: 'HELLO_SAGA',
        });
        // dispatch 3번시 after saga 가 3번찍힌 것을 기대
        // 하지만 1번만 실행되고 함수가 종료됨.
        // while true 로 변경시 기대값인 3번이 출력됨.
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

export default Home;
