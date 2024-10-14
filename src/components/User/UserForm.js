import React, { useState, useEffect } from 'react'
import axios from 'axios';

const UserForm = ({ userId, onUserSaved }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [productId, setProductId] = useState('');

    useEffect(() => {
        const fetchUser = async () => {
            if (userId) {
                const response = await axios.get(`http://localhost:3001/users/${userId}`);
                const user = response.data;
                setName(user.name);
                setEmail(user.email);
                setProductId(user.product.id);
            }
        };
        fetchUser();
    }, [userId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userData = { name, email, productId };
        
        if (userId) {
            // Edit user
            await axios.put(`http://localhost:3001/users/${userId}`, userData);
        } else {
            // Create user
            await axios.post('http://localhost:3001/users', userData);
        }
        
        onUserSaved(); // Callback to notify the parent component
        setName('');
        setEmail('');
        setProductId('');
    };

    return (
        <form onSubmit={handleSubmit}>
            <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" required />
            <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" required />
            <input value={productId} onChange={(e) => setProductId(e.target.value)} placeholder="Product ID" required />
            <button type="submit">{userId ? 'Update User' : 'Add User'}</button>
        </form>
    );
};


export default UserForm