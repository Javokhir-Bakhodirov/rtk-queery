import React from "react";
import { Layout, Menu, theme } from "antd";
import { NavLink } from "react-router-dom"; // Use React Router's Link
import Container from "../container/Container";

const { Header } = Layout;

const Nav = () => {
	const {
		token: { colorBgContainer, borderRadiusLG },
	} = theme.useToken();

	const menuItems = [
		{
			key: "1",
			label: (
				<NavLink className="nav-link" to="/login">
					Login
				</NavLink>
			),
		},
		{
			key: "2",
			label: (
				<NavLink className="nav-link" to="/">
					Home
				</NavLink>
			),
		},
		{
			key: "3",
			label: (
				<NavLink className="nav-link" to="/loading">
					loading
				</NavLink>
			),
		},
	];

	return (
		<Layout>
			<Header
				style={{
					position: "sticky",
					top: 0,
					zIndex: 1,
					width: "100%",
					display: "flex",
					alignItems: "center",
				}}
			>
				<Container>
					<div className="demo-logo" />
					<Menu
						theme="dark"
						mode="horizontal"
						defaultSelectedKeys={["2"]}
						items={menuItems}
						style={{
							flex: 1,
							minWidth: 0,
						}}
					/>
				</Container>
			</Header>
		</Layout>
	);
};

export default Nav;
