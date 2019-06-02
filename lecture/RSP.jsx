import React, { Component } from 'react';

// 클래스 constructor -> render -> ref처리 -> componentDidMount
// setState or Props 변경시 shouldComponentUpdate -> componentDidUpdate
// 컴포넌트 제거시 -> componentWillUnmount -> 소멸

const rspCoords = {
    바위: '0',
    가위: '-142px',
    보: '-284px',
};

const scores = {
    바위: 0,
    가위: 1,
    보: -1,
};

const computerChoice = (imgCoord) => {
    return Object.entries(rspCoords).find((v) => {
        return v[1] === imgCoord;
    })[0];
}

class RSP extends Component {
    state = {
        result: '',
        score: 0,
        imgCoord: rspCoords.바위,
    };

    interval;

    /*
     render 가 처음 실행됬을경우 콜백
     리 랜더링시에은 콜백되지않음.
     */
    componentDidMount() { // 비동기 요청을 많이함.
        /*
        비동기 함수가 함수외부의 변수를 참조하면 Closure 문제가 발생함.
         */
        this.interval = setInterval(this.changeHand,1000);
    };

    /*
     컴포넌트가 리 랜더링시 콜백
     */
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    /*
     컴포넌트가 제거되기 직전
     */
    componentWillUnmount() { // 비동기 요청 정리
        clearInterval(this.interval);
    };

    /*

    onClick{() => {this.onClickBtn()}}
    함수 내부에서 함수를 호출하는경우

    onClick{this.onClick()}
    onClickBtn = (choice) => () =>  {...}; 으로 사용할수 있다.

    [고차함수]
    리액트에서 자주사용하는 패턴이다.
    함수를 연달아 쓰는 경우 위와 같은 패턴이 존재함.
     */
    onClickBtn = (choice) => {
        clearInterval(this.interval);
        const { imgCoord } = this.state;
        const score = scores[choice];
        const cpuScore = scores[computerChoice(imgCoord)];
        const diff = score - cpuScore;

        if (diff === 0) {
            this.setState({
                result: '비겼습니다',
            });
        } else if ([-1, 2].includes(diff)) {
            this.setState((prevState) => {
                return {
                    result: '이겼습니다.',
                    score: prevState.score + 1
                }
            });
        } else {
            this.setState((prevState) => {
               return {
                   result: '졌습니다.',
                   score: prevState.score - 1,
               }
            });
        }

        this.interval = setInterval(this.changeHand,1000);
    };

    changeHand = () => {
        const { imgCoord } = this.state;
        if (imgCoord === rspCoords.바위) {
            this.setState({
                imgCoord: rspCoords.가위,
            });
        } else if (imgCoord === rspCoords.가위) {
            this.setState({
                imgCoord: rspCoords.보,
            });
        } else if (imgCoord === rspCoords.보) {
            this.setState({
                imgCoord: rspCoords.바위,
            });
        }
    }

    render () {
        const { result, score, imgCoord } = this.state;
        return (
            <>
                <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0`}}></div>
                    <div>
                        <button id="rock" className="btn" onClick={this.onClickBtn('바위')}>바위</button>
                        <button id="scissor" className="btn" onClick={this.onClickBtn('가위')}>가위</button>
                        <button id="paper" className="btn" onClick={this.onClickBtn('보')}>보</button>
                    </div>
                <div>{ result }</div>
                <div>현재 { score } 점</div>
            </>
        )
    }
};

export default RSP;
