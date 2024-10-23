import React, { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate, useParams } from 'react-router-dom';
import ToastContext from '../context/ToastContext';
import { Spinner } from 'react-bootstrap';

const EditContact = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
    const {user} = useContext(AuthContext);
    const {toast} = useContext(ToastContext);
    const [userDetails, setUSerDetails] = useState({
        name: "",
        address: "",
        email: "",
        phone: "",
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;
        setUSerDetails({ ...userDetails, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const res = await fetch(`http://localhost:8000/api/contact`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem("token")}`,
            },
            body: JSON.stringify({ id, ...userDetails }),
        });
        const result = await res.json();
        if(!result.error){
            toast.success(`Updated Contact ${userDetails.name}`);

            setUSerDetails({ name: "", address: "", email: "", phone: ""});
            navigate("/mycontacts");
        }else {
            toast.error(result.error);
        }
    }

    useEffect(() => {
        const fetchContactDetails = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/contact/${id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                setUSerDetails({
                    name: result.name,
                    email: result.email,
                    address: result.address,
                    phone: result.phone
                });
            } catch (err) {
                console.error("Error fetching contact details:", err);
            } finally {
                setLoading(false);  // Ensure loading state is turned off after the request completes
            }
        };

        fetchContactDetails();
    }, [id]);  // 'id' is added as a dependency to re-run the effect if 'id' changes

  return (
    <>
    {loading ? (
        <Spinner splash="Loading Contact..." />
    ) : (
        <>
            <h3>Edit your contact</h3>

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
            <input type="submit" value="Save Changes" className='btn btn-outline-info my-4' />
            </form>
        </>
    )}

    </>
  )
}

export default EditContact
