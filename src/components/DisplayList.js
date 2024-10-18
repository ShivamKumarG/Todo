import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import "../components/DisplayList.css"



const TodoList = () => {
    const [users, setUsers] = useState([])
    const [searchTerm, setSearchTerm] = useState("")
    const [newUser, setNewUser] = useState()

    useEffect(() => {
        axios.get('https://reqres.in/api/users')
          .then(response => {
            setUsers(response.data.data);
          })
          .catch(error => {
            console.error("There was an error fetching the users!", error);
          });
      }, []);

      const filteredUsers = users.filter(user => 
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase())
      );

      const AddUser = () => {
        axios.post('https://reqres.in/api/users', newUser)
        .then(response => {
            setNewUser(response.data.data);
        })
        .catch(error => {
            console.error("There was an error adding the user!", error)
        });

      }

  return (
    <div>
    <h1>Data Listing</h1>
    <div>
    
    <button>Add User</button>
    </div>
    <input 
        type="text"
        placeholder="Search by name..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search-bar"
      />
    <table className="user-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Avatar</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {filteredUsers.map(user => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.first_name}</td>
            <td>{user.last_name}</td>
            <td><img src={user.avatar} alt={`${user.first_name} ${user.last_name}`} className="avatar-img" /></td>
            <td><button>Delete</button>
            <button>Edit</button></td>
           
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);
};


export default TodoList