import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

var ProductForm = ({ existingProduct }) => {
	const { id } = useParams(); // Get product id from the URL params
	const navigate = useNavigate();

	const [product, setProduct] = useState({
		name: "",
		price: "",
		email: "",
		description: "",
	});

	useEffect(() => {
		// If existingProduct is passed, set it to the state
		if (existingProduct) {
			setProduct(existingProduct);
		} else if (id) {
			// If no existingProduct, fetch the product details if editing
			fetchProduct();
		}
	}, [existingProduct, id]);

	const fetchProduct = async () => {
		try {
			const response = await axios.get(`http://localhost:3001/products/${id}`);
			setProduct(response.data);
		} catch (error) {
			console.error("Error fetching product:", error);
			alert("Error fetching product details");
		}
	};

	const handleChange = (e) => {
		setProduct({ ...product, [e.target.name]: e.target.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			if (id) {
				// If id exists, update the product
				await axios.put(`http://localhost:3001/products/${id}`, product);
				alert('Product updated successfully!');
			} else {
				// Otherwise, create a new product
				await axios.post("http://localhost:3001/products", product);
				alert("Product created successfully!");
			}
			navigate("/"); // Redirect back to the product list
		} catch (error) {
			console.error("Error saving product:", error);
			alert("Error saving product");
		}
	};

	return (
		<div className="container">
			<h2 className="my-4">{id ? "Edit Product" : "Create a New Product"}</h2>
			<form onSubmit={handleSubmit}>
				<div className="form-group">
					<label htmlFor="name">Product Name</label>
					<input
						type="text"
						className="form-control"
						id="name"
						name="name"
						value={product.name}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="price">Price</label>
					<input
						type="number"
						className="form-control"
						id="price"
						name="price"
						value={product.price}
						onChange={handleChange}
					/>
				</div>
			
				<div className="form-group">
					<label htmlFor="email">Email</label>
					<input
						type="email"
						className="form-control"
						id="email"
						name="email"
						value={product.email}
						onChange={handleChange}
					/>
				</div>

				<div className="form-group">
					<label htmlFor="description">Description</label>
					<textarea
						className="form-control"
						id="description"
						name="description"
						value={product.description}
						onChange={handleChange}
					/>
				</div>

				<button type="submit" className="btn btn-primary mt-3">
					{id ? "Update Product" : "Create Product"}
				</button>
			</form>
		</div>
	);
};

export default ProductForm;
