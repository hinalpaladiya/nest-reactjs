import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container">
      <h1>Welcome to the Product Management App</h1>
      <Link to="/create-product" className="btn btn-primary mt-4">
        Create New Product
      </Link>
    </div>
  );
};

export default Home;
