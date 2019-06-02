import React, { Component } from 'react';

// 클래스 constructor -> render -> ref처리 -> componentDidMount
// setState or Props 변경시 shouldComponentUpdate -> componentDidUpdate
// 컴포넌트 제거시 -> componentWillUnmount -> 소멸

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: 0,
    };

    /*
     render 가 처음 실행됬을경우 콜백
     리 랜더링시에은 콜백되지않음.
     */
    componentDidMount() {

    };

    /*
     컴포넌트가 리 랜더링시 콜백
     */
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    /*
     컴포넌트가 제거되기 직전
     */
    componentWillUnmount() {

    };

    render () {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                    <div>
                        <button id="rock" className="btn" onClick={() => onClickBtn('바위')}>바위</button>
                        <button id="scissor" className="btn" onClick={() => onClickBtn('가위')}>가위</button>
                        <button id="paper" className="btn" onClick={() => onClickBtn('보')}>보</button>
                    </div>
                <div>{ result }</div>
                <div>현재 { score } 점</div>
            </>
        )
    }
};

export default RSP;
