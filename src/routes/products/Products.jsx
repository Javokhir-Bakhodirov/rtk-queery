import React, { useEffect } from "react";
import Container from "../../components/container/Container";
import { useGetProductsQuery } from "../../api/productsApi";
import Card from "../../components/card/Card";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/slice/productsSlice";
import { FloatButton } from "antd";
const Products = () => {
	const { data, isSuccess } = useGetProductsQuery();
	const dispatch = useDispatch();
	const products = useSelector((state) => state.products.currentProducts);

	useEffect(() => {
		if (isSuccess && data) {
			dispatch(setProducts(data));
		}
	}, [isSuccess, data, dispatch]);

	return (
		<section>
			<Container>
				<div className="">
					<h2 className="text-center text-xl font-bold">Products</h2>
				</div>
				<div className="grid grid-cols-3 gap-4">
					{products?.map((product) => (
						<Card key={product.id} product={product} />
					))}
				</div>
			</Container>

			<FloatButton.BackTop />
		</section>
	);
};

export default Products;
