import React from 'react';
import PropTypes from 'prop-types';

const MyError = ({ statusCode }) => {
    return (
        <div>
            <h1>{statusCode} 에러발생</h1>
        </div>
    )
};

MyError.propTypes = {
    statusCode: PropTypes.number,
};

MyError.defaultProps = {
    statusCode: 400,
};

MyError.getInitialProps = async (context) => {
    // 서버일경우 res 가 존재
    // 에러에 필요한정보가 res나 err에 들어있으므로 props로 넣어준다.
    const statusCode = context.res ? context.res.statusCode : context.err ? err.statusCode : null;
    return { statusCode };
};

export default MyError;
