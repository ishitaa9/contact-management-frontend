import React, { useContext, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';
import ToastContext from '../context/ToastContext';

const CreateContact = () => {
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);
    const [userDetails, setUSerDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });
    const navigate = useNavigate();

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUSerDetails({ ...userDetails, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:8000/api/contact`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify(userDetails),
        });
        const result = await res.json();
        if(!result.error){
            toast.success(`Created New Contact ${userDetails.name}`);

            setUSerDetails({ name: "", address: "", email: "", phone: ""})
        }else {
            toast.error(result.error);
        }
    }

  return (
    <>
        <h3>Create your contact</h3>

        <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label htmlFor="nameInput" className="form-label mt-4">Name of Person</label>
            <input
                type="text"
                className="form-control"
                id="nameInput"
                value={userDetails.name}
                onChange={handleInputChange}
                name='name'
                required
                placeholder="Ellen Garden"
            />
        </div>
        <div className='form-group'>
            <label htmlFor="addressInput" className="form-label mt-4">Address of Person</label>
            <input
                type="text"
                className="form-control"
                id="addressInput"
                value={userDetails.address}
                onChange={handleInputChange}
                name='address'
                required
                placeholder="Enter the address"
            />
        </div>
        <div className='form-group'>
            <label htmlFor="emailInput" className="form-label mt-4">Email of Person</label>
            <input
                type="email"
                className="form-control"
                id="emailInput"
                value={userDetails.email}
                onChange={handleInputChange}
                name='email'
                required
                placeholder="ellengarden@gmail.com"
            />
        </div>
        <div className='form-group'>
            <label htmlFor="phoneInput" className="form-label mt-4">Phone Number of Person</label>
            <input
                type="number"
                className="form-control"
                id="phoneInput"
                value={userDetails.phone}
                onChange={handleInputChange}
                name='phone'
                required
                placeholder="015206188034"
            />
        </div>
        <input type="submit" value="Add Contact" className='btn btn-outline-info my-4' />
        </form>
    </>
  )
}

export default CreateContact
