import React, { useState, useRef } from 'react';


/*
state와 ref의 차이

state 가 바뀌면 재 랜더링된다.
ref 는 바꿀경우엔 재 랜더링되지않는다.

값이 변경되어도 랜더링되지않길 원하는경우 ref로 사용한다.
 */

const ResponseCheckHooks = () => {
    const [ state, setState ] = useState('waiting');
    const [ message, setMessage ] = useState('클릭해서 시작하세요.');
    const [ result, setResult ] = useState([]);
    const timeout = useRef(null);
    const startTime = useRef(null);
    const endTime = useRef(null);

    const onClickScreen = () => {
        if (state === 'waiting') {
            setState('ready');
            setMessage('초록색이 되면 클릭하세요.');
            timeout.current = setTimeout(() => {
                setState('now');
                setMessage('지금 클릭하세요.');
            }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
            startTime.current = new Date(); // startTime을 state로 해버리면 랜더링이 다시 되어버린다.
        } else if (state === 'ready') { // 성급하게 클릭
            clearTimeout(timeout.current);
            setState('waiting');
            setMessage('이런, 성급하시네요. 초록색이 되면 클릭하세요.');
            setResult([]);
        } else if (state === 'now') { // 반응속도 체크
            endTime.current = new Date();
            setState('waiting');
            setMessage('클릭해서 시작하세요.');
            setResult((prevResult) => {
                [...prevResult, endTime - startTime]
            });
        }
    };

    const renderAverage = () => {
        return result.length === 0
            ? null
            : <>
                <div>평균시간: {result.reduce((a, c) => a + c) / result.length }</div>
                <button onClick={onReset}>초기화</button>
            </>
    }

    const onReset = () => {
        setResult([]);
    }

    return (
        <>
            <div id="screen"
                 className={state}
                 onClick={onClickScreen}
            >
                { message }
            </div>
            { renderAverage() }
        </>
    )
};
