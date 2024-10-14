import React, { useState, useEffect } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';

const UserList = ({ onUserEdited }) => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const response = await axios.get('http://localhost:3001/users');
            setUsers(response.data);
        };
        fetchUsers();
    }, [onUserEdited]);

    return (
        <div>
            <h2>User List</h2>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} ({user.email}) - Product ID: {user.product.id}
                        <Link to={`/edit-user/${user.id}`}>Edit</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};


export default UserList