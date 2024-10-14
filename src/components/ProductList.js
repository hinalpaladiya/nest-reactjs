import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

var ProductList = () => {
	const [products, setProducts] = useState([]);

	useEffect(() => {
		fetchProducts();
	}, []);

	const fetchProducts = async () => {
		try {
			const response = await axios.get('http://localhost:3001/products');
			setProducts(response.data);
		} catch (error) {
			console.error('Error fetching products:', error);
		}
	};

	const deleteProduct = async (id) => {
		try {
			await axios.delete(`http://localhost:3001/products/${id}`);
			fetchProducts();  // Refresh the product list after deletion
		} catch (error) {
			console.error('Error deleting product:', error);
		}
	};

	return (
		<div className="container">
			<h2 className="my-4">Product List</h2>
			<Link to="/create-product" className="btn btn-primary mt-4 me-3">
				Add New Product
			</Link>
			<Link to="/create-user" className="btn btn-primary mt-4">
				Add New User
			</Link>
			<table className="table table-striped">
				<thead>
					<tr>
						<th>Name</th>
						<th>Price</th>
						<th>Description</th>
						<th>Actions</th>
					</tr>
				</thead>
				<tbody>
					{products.map((product) => (
						<tr key={product.id}>
							<td>{product.name}</td>
							<td>{product.price}</td>
							<td>{product.description}</td>
							<td>
								<Link to={`/edit-product/${product.id}`} className="btn btn-warning me-2">
									Edit
								</Link>
								<button className="btn btn-danger" onClick={() => deleteProduct(product.id)}>
									Delete
								</button>
							</td>
						</tr>
					))}
				</tbody>
			</table>

		</div>
	);
};

export default ProductList;