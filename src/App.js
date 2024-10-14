import logo from "./logo.svg";
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductForm from "./components/ProductForm";
import "./App.css";
import Home from "./components/Home";
import UserForm from "./components/User/UserForm";
import UserList from "./components/User/UserList";
import ProductList from "./components/ProductList";
function App() {
  return (
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
    <BrowserRouter>
        <div>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/create-product" element={<ProductForm />} />
        <Route path="/edit-product/:id" element={<ProductForm />} />

        <Route path="/users" component={UserList} />
        <Route path="/create-user" element={<UserForm />} />
        <Route path="/edit-user/:id" element={<UserForm />} />

      </Routes>
        </div>
    </BrowserRouter>
  );
}

export default App;
