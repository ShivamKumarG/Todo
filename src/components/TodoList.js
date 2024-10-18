import React,{ useState, useEffect } from 'react'
import axios from 'axios'




const TodoList = () => {
    const [users, setUsers] = useState([])


    useEffect(() => {
        axios.get('https://reqres.in/api/users')
          .then(response => {
            setUsers(response.data.data);
          })
          .catch(error => {
            console.error("There was an error fetching the users!", error);
          });
      }, []);
  return (
    <div>TodoList
    <div className="card-container">
        {users.map(user => (
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


  )
}

export default TodoList