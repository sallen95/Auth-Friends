import React, { useState, useEffect } from 'react';
import axios from 'axios';

const initialFormValues = {
    name: '',
    age: '',
    email: ''
}

const FriendsList = () => {
    const [friends, setFriends] = useState([]);
    const [formValues, setFormValues] = useState(initialFormValues);

    const handleChange = e => {
        setFormValues({
            ...formValues,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();
        axios.post('http://localhost:5000/api/friends', formValues, {
            headers: {
                authorization: localStorage.getItem("token")
            }
        })
        .then(res => {
            console.log(res)
            setFriends([...friends, formValues])
        })
        .catch(err => {
            console.log(err)
            setFormValues(initialFormValues)
        })
    }

    useEffect(() => {
        axios
            .get('http://localhost:5000/api/friends', {
                headers: {
                    authorization: localStorage.getItem("token")
                }
            })
            .then(res => {
                console.log(res)
                setFriends(res.data)
            })
            .catch(err => {
                console.log(err)
            })
    }, [])

    return (
        <div>
            <h4>Add a new Friend</h4>
            <form onSubmit={handleSubmit}>
                <label>Name:
                    <input 
                        type='text'
                        name='name'
                        value={formValues.name}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>Age:
                    <input 
                        type='text'
                        name='age'
                        value={formValues.age}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <label>Email:
                    <input 
                        type='text'
                        name='email'
                        value={formValues.email}
                        onChange={handleChange}
                    />
                </label>
                <br></br>

                <button>Add Friend</button>
                
            </form>
            <h1>Friends!</h1>
            {friends.map(friend => (
                <div key={friend.id}>
                    <h3>{friend.name}</h3>
                    <p>Age: {friend.age}</p>
                    <p>Email: {friend.email}</p>
                </div>
            ))}
        </div>
    )
}

export default FriendsList;