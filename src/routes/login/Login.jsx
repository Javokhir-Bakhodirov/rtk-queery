import { Button, Form, Input, notification } from "antd";
import Container from "../../components/container/Container";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../api/loginApi";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setToken } from "../../store/slice/loginSlice";

const Login = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const [loginUserApi, { data, isSuccess, isError, error }] =
		useLoginUserMutation();

	const onFinish = (values) => {
		loginUserApi(values);
	};

	useEffect(() => {
		if (isSuccess) {
			dispatch(setToken(data?.access_token));
			localStorage.setItem("token", data?.access_token);
			notification.success({
				message: "Login Successful",
				description: "You have successfully logged in!",
			});

			navigate("/");
		}
	}, [isSuccess, data, dispatch, navigate]);

	useEffect(() => {
		if (isError) {
			notification.error({
				message: "Login Failed",
				description:
					error?.data?.message || "Invalid credentials, please try again.",
			});
		}
	}, [isError, error]);
	console.log(data);

	const onFinishFailed = (errorInfo) => {
		console.log("Failed:", errorInfo);
	};

	return (
		<Container>
			<div className="flex justify-center flex-col text-center items-center mt-[200px] w-[600px] mx-auto border-[1px] rounded-md shadow-sm">
				<div className=" text-2xl font-bold my-[20px]">
					<Link to="/">Logo</Link>
				</div>
				<Form
					className="w-[100%] flex flex-col justify-center items-center pr-[80px] mt-5"
					name="basic"
					labelCol={{
						span: 8,
					}}
					wrapperCol={{
						span: 16,
					}}
					style={{
						maxWidth: 600,
					}}
					initialValues={{
						remember: true,
					}}
					onFinish={onFinish}
					onFinishFailed={onFinishFailed}
					autoComplete="off"
				>
					<Form.Item
						className="w-[100%] mx-auto"
						label="Email"
						name="email"
						rules={[
							{
								required: true,
								message: "Please input your email!",
							},
							{
								type: "email",
								message: "Please enter a valid email!",
							},
						]}
					>
						<Input />
					</Form.Item>

					<Form.Item
						className="w-[100%] mx-auto"
						label="Password"
						name="password"
						rules={[
							{
								required: true,
								message: "Please input your password!",
							},
						]}
					>
						<Input.Password />
					</Form.Item>

					<Form.Item
						wrapperCol={{
							offset: 8,
							span: 16,
						}}
					>
						<Button className="ml-6" type="primary" htmlType="submit">
							Login
						</Button>
					</Form.Item>
				</Form>
			</div>
		</Container>
	);
};

export default Login;
