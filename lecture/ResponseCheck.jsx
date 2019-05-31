import React, { Component } from 'react';


/*
빈 배열일 경우 reduce를 사용하지못한다

리액트에서 조건문은 삼항연산자를 주로사용한다.
&& 도 사용한다.
 */

class ResponseCheck extends Component {
    state = {
        state: 'waiting',
        message: '클릭해서 시작하세요.',
        result: [],
    };

    timeout;
    startTime;
    endTime;

    onClickScreen = () => {
        const { state, message, result } = this.state;
        if (state === 'waiting') {
            this.setState({
                state: 'ready',
                message: '초록색이 되면 클릭하세요.',
            });
            this.timeout = setTimeout(() => {
               this.setState({
                   state: 'now',
                   message: '지금 클릭',
               }) ;
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
            this.startTime = new Date(); // startTime을 state로 해버리면 랜더링이 다시 되어버린다.
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(this.timeout);
            this.setState({
                state: 'waiting',
                message: '이런, 성급하시네요. 초록색이 되면 클릭하세요.',
                result: [],
            });
        } else if (state === 'now') { // 반응속도 체크
            this.endTime = new Date();
            this.setState((prevState) => {
                return {
                    state: 'waiting',
                    message: '클릭해서 시작하세요.',
                    result: [...prevState.result, this.endTime - this.startTime],
                }
            });
        }
    };

    renderAverage = () => {
      const { result } = this.state;
      return result.length === 0
            ? null
            : <>
              <div>평균시간: {result.reduce((a, c) => a + c) / result.length }</div>
              <button onClick={this.onReset}>초기화</button>
            </>
    };

    onReset = () => {
        this.setState({
            result: [],
        })
    };

    render () {
        return (
            <>
                <div id="screen"
                     className={this.state.state}
                     onClick={this.onClickScreen}
                >
                    {this.state.message}
                </div>
                { this.renderAverage() }
            </>
        )
    }
};

export default ResponseCheck;
