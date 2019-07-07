import React, {memo} from 'react';
import PropTypes from 'prop-types';
import { Button, Card, Icon, List } from "antd";

const FollowList = memo(({ data, header, hasMore, onClick, onClickStop }) => {
    return (
        <List
            style={{ marginBottom: '20px' }}
            grid={{ gutter: 4, xs: 2, md: 3 }}
            size="smail"
            header={<div>{header}</div>}
            loadMore={hasMore ? <Button style={{ width: '100%' }} onClick={onClick}>더 보기</Button> : null}
            bordered
            dataSource={data}
            renderItem={item => (
                <List.Item style={{ marginTop: '20px' }}>
                    <Card actions={[<Icon key="stop" type="stop" />]} onClick={onClickStop(item.id)}>
                        <Card.Meta description={item.nickname}/>
                    </Card>
                </List.Item>
            )}
        />
    )
});

FollowList.propTypes = {
    header: PropTypes.string.isRequired,
    hasMore: PropTypes.bool.isRequired,
    onClick: PropTypes.func.isRequired,
    onClickStop: PropTypes.func.isRequired,
    data: PropTypes.array.isRequired,

};

export default FollowList;
