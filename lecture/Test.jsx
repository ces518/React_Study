import React, { PureComponent, memo } from 'react';

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

class Test extends PureComponent {
    render() {
        return (
            <div> hello , Test</div>
        )
    }
}

export default Test;
