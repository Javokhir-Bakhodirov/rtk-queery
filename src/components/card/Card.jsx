import { AiOutlineEdit } from "react-icons/ai";
import { Button, Modal, Form, Input } from "antd";
import { useState } from "react";
import { useEditProductMutation } from "../../api/productsApi";

const Card = ({ product }) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [form] = Form.useForm();
	const [editProduct] = useEditProductMutation();

	const preImg = product.images[0];
	const img = JSON.stringify(preImg).split('"')[2];
	console.log(img);

	const showModal = () => {
		setIsModalOpen(true);
		form.setFieldsValue({
			title: product.title,
			description: product.description,
			price: product.price,
		});
	};

	const handleOk = async () => {
		try {
			const values = await form.validateFields();
			await editProduct({ id: product.id, ...values });
			setIsModalOpen(false);
		} catch (error) {
			console.error("Validation failed:", error);
		}
	};

	const handleCancel = () => {
		setIsModalOpen(false);
	};

	return (
		<div className="bg-white shadow-lg rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 ease-in-out">
			<div className="img-wrapper">
				<img
					src={img}
					alt={product.title}
					className="w-full h-64 object-cover"
				/>
			</div>
			<div className="p-4 flex justify-between items-end">
				<div>
					<h3 className="text-lg font-semibold mb-2">{product.title}</h3>
					<p className="text-gray-600 text-sm mb-4">{product.description}</p>
					<p className="text-lg font-bold text-blue-600 mb-4">
						${product.price}
					</p>
				</div>
				{localStorage.getItem("token") && (
					<div className="p-4">
						<Button
							type="primary"
							className="flex justify-center items-center"
							onClick={showModal}
						>
							<AiOutlineEdit className="text-2xl" />
						</Button>
						<Modal
							title="Edit Product"
							open={isModalOpen}
							onOk={handleOk}
							onCancel={handleCancel}
						>
							<Form
								form={form}
								name="editProduct"
								labelCol={{ span: 8 }}
								wrapperCol={{ span: 16 }}
								autoComplete="off"
							>
								<Form.Item
									label="Title"
									name="title"
									rules={[
										{ required: true, message: "Please enter the title!" },
									]}
								>
									<Input />
								</Form.Item>

								<Form.Item
									label="Description"
									name="description"
									rules={[
										{
											required: true,
											message: "Please enter the description!",
										},
									]}
								>
									<Input.TextArea rows={4} />
								</Form.Item>

								<Form.Item
									label="Price"
									name="price"
									rules={[
										{ required: true, message: "Please enter the price!" },
									]}
								>
									<Input type="number" />
								</Form.Item>
							</Form>
						</Modal>
					</div>
				)}
			</div>
		</div>
	);
};

export default Card;
