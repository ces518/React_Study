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
class Test extends PureComponent {

    inputRef = createRef();

    render() {
        return (
            <div ref={this.inputRef}> hello , Test</div>
        )
    }
}

export default Test;
