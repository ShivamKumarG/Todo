import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch users from the API
  useEffect(() => {
    axios.get('https://reqres.in/api/users')
      .then(response => {
        setUsers(response.data.data);
      })
      .catch(error => {
        console.error("There was an error fetching the users!", error);
      });
  }, []);

  // Filtered users based on search term
  const filteredUsers = users.filter(user => 
    user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="app">
      <h1>User Cards</h1>

      {/* Search Input */}
      <input 
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />

      <div className="card-container">
        {filteredUsers.map(user => (
          <div className="card" key={user.id}>
            <div className="name-section">
              <span className="first-name">{user.first_name}</span>
              <span className="last-name">{user.last_name}</span>
            </div>
            <img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="avatar" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

