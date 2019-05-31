import React, { PureComponent, memo, createRef } from 'react';

/*

성능최적화

PureComponent 리액트 불필요한 랜더링을 자동적으로 막아줌
shouldComponentUpdate 자동구현

컴포넌트가 복잡해지면 PureComponent만으로 안될때가 있음..
만능은아니다!!

* */

/*

Hooks 에는 Memo 가 존재한다.
memo 로 컴포넌트를 감싸주면된다.
-
 */
const TestHook = memo(() => {
    return (
        <div> Hello, Test Hooks</div>
    )
})

/*
CreateRef: 엘리먼트의 참조를 자동적으로 생성가능함.

ex) inputRef.current. 으로 접근해야한다.

기존방식:
메서드로 참조

onInputRef = (c) => {
    this.inputRef = c;
}
div ref={this.onInputRef}

 */

/*

함수안에 다른 함수를 넣을수 있는경우 좀더 세밀한 조작이가능하다.
1급함수 라고 말함
자바스크립트는 20년전부터 지원함 ...

 */

/*
Render함수 내에서는 setState를 호출하면안된다.
setState -> Render 순으로 호출되는데
즉 무한반복됨..
 */

/*
Props 는 자식이 바꿀수없고, 부모만이 변경이 가능하다.
props를 변경해야하는 경우에는 자식의 state에 넣어주어 사용할것 (좋은구조는 아니다.)
 */

/*
Context

A -> b-> c -> d -> e
b~d는 중간다리이지만 불필요함... 불필요한 랜더링이 될 위험을 내포하고있다!!

a ~ e 로 바로 전달해주어야하는데 그것이 Context

Context를 응용한것이 Redux

 */
class Test extends PureComponent {

    /*
    생성자를 사용하는경우에는 정밀한 데이터 가공이 필요할경우 사용한다.
     */
    constructor(props) {
        super(props);
        // 세밀한 조정이 가능하다.
        // filtering 도 가능함..
        this.state = {
            result: '',
        }
    }

    shouldComponentUpdate(nextProps, nextState, nextContext) {

    }

    inputRef = createRef();

    render() {
        return (
            <div ref={this.inputRef}> hello , Test</div>
        )
    }
}

export default Test;
