import React from 'react';
import { Menu, Input } from "antd";
import Link from "next/link";

const Layout = ({ children }) => {
    return (
        <>
            <Menu mode="horizontal">
                <Menu.Item key="home"><Link href="/"><a>Simple-SNS</a></Link></Menu.Item>
                <Menu.Item key="profile"><Link href="/profile"><a>프로필</a></Link></Menu.Item>
                <Menu.Item key="mail">
                    <Input.Search enterButton style={{ verticalAlign: 'middle' }} />
                </Menu.Item>
            </Menu>
            { children }
        </>
    )
};
export default Layout;
