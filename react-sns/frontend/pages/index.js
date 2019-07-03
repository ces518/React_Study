import React, { useEffect, useCallback, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import PostForm from '../components/PostForm';
import PostCard from '../components/PostCard';
import { LOAD_MAIN_POSTS_REQUEST } from "../reducers/post";

const Home = () => {
    const dispatch = useDispatch();
    // 전체 state에서 user 를 가져온다.
    // state는 전체를 의미한다.
    const { me } = useSelector(state => state.user);
    const { mainPosts, hasMorePost } = useSelector(state => state.post);
    const countRef = useRef([]);

    // 보고있는동안 게시글을 작성할 수 있을수 있기때문에
    // 게시글이 추가된다면 offset이 깨져버린다.
    // 따라서 offset을 사용하면안됨.
    // 마지막 게시글 번호를 활용해서 그 다음 게시글을 가져오는 방법을 사용.
    const onScroll = useCallback(() => {
        console.log(window.scrollY, document.documentElement.clientHeight, document.documentElement.scrollHeight);
        // window.scrollY 가 최상단의 위치
        // documentElement.clientHeight 는 보이는 화면 크기
        // scrollHeight 는 스크롤의 젤위에서 젤 아래크기
        // 끝부분에서 300정도 남았을경우 다음데이터를 가져옴
        if (window.scrollY + document.documentElement.clientHeight > document.documentElement.scrollHeight - 300) {
            if (hasMorePost) {
                const lastId = mainPosts[mainPosts.length - 1].id;
                if (!countRef.current.includes(lastId)) { // 한번 보냈던 lastId는 보내지않도록
                    dispatch({
                        type: LOAD_MAIN_POSTS_REQUEST,
                        lastId: lastId,
                    });
                    countRef.current.push(lastId);
                }
            }
        }
    }, [hasMorePost, mainPosts.length]);

    useEffect(() => {
        // addEventListener 를 달아주어야함.
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        }
    }, [mainPosts.length]);

    return (
      <>
          {me && <PostForm />}
          {mainPosts.map((c) => {
              return (
                 <PostCard key={c.id} post={c}/>
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
