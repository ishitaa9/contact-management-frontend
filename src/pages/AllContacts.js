import React, { useContext, useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import { Modal } from 'react-bootstrap';
import ToastContext from '../context/ToastContext';
import { Link } from 'react-router-dom';

const AllContacts = () => {
    const {toast} = useContext(ToastContext);
    const [showModal, setShowModal] = useState(false);
    const [contacts, setContacts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalData, setModalData] = useState({});
    const [searchInput, setSearchInput] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const res = await fetch(`http://localhost:8000/api/mycontacts`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if (!result.error) {
                    setContacts(result.contacts);
                } else {
                    console.log(result);
                }
            } catch (error) {
                console.error("Error fetching data:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData(); // Calling the async function

    }, []);

    const deleteContact = async (id) => {
        if(window.confirm("are your sure you want too delete this contact?")){
            try {
                const res = await fetch(`http://localhost:8000/api/delete/${id}`, {
                    method: "DELETE",
                    headers: {
                            Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                });
                const result = await res.json();
                if(!result.error){
                    setContacts(result.myContacts);
                    toast.success("Contact Deleted");
                    setShowModal(false);
                } else {
                    toast.error(result.error)
                }
            } catch (err) {
                console.log(err);
            }
        }
    }

    const handleSearchSubmit = (event) => {
        event.preventDefault();

        const newSearchUser = contacts.filter((contact) =>
            contact.name.toLowerCase().includes(searchInput.toLowerCase())
        )
        console.log(newSearchUser);
        setContacts(newSearchUser);
    }


  return (
    <>
      <div>
      <h1>Your Contacts</h1>
      <a href='/mycontacts' className='btn btn-outline-light my-4'>Reload Contact</a>
      <hr className="my-1" />
        {loading? (
            <Spinner splash='Loading Contacts...'/>
        ) : (
            <>
            <form className='d-flex' onSubmit={handleSearchSubmit}>
            <input
                type='text'
                name='searchInput'
                id='searchInput'
                className='form-control me-sm-2 my-4'
                placeholder='Search Contact'
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
            />
            <button type='submit' className='btn btn-outline-info my-sm-0 mx-2'>Search</button>
            </form>
            <p className='text-muted'>Total Contacts: <strong>{contacts.length}</strong></p>
            <>
            {contacts.length === 0 ? (
                <h3>No contacts created yet.</h3>
            ) : (
                <table className="table table-hover">
                <thead>
                    <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Address</th>
                    <th scope="col">Email</th>
                    <th scope="col">Phone Number</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map((contacts) => (
                    <tr key={contacts._id}
                    onClick={() =>
                    {
                        setModalData({});
                        setModalData(contacts);
                        setShowModal(true);
                    }}
                    >
                    <th scope="row">{contacts.name}</th>
                    <td>{contacts.address}</td>
                    <td>{contacts.email}</td>
                    <td>{contacts.phone}</td>
                    </tr>
                    ))}
                </tbody>
            </table>
            )}
            </>
            </>
        )}
    </div>

    <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>

        <Modal.Body>
            <h3>{modalData.name}</h3>
          <p><strong>Address: {modalData.address}</strong></p>
          <p><strong>Email: {modalData.email}</strong></p>
          <p><strong>Phone Number: {modalData.phone}</strong></p>
        </Modal.Body>

        <Modal.Footer>
          <button className='btn btn-outline-warning' onClick={() => setShowModal(false)}>Close</button>
          <Link className='btn btn-outline-info' to={`/edit/${modalData._id}`}>Edit</Link>
          <button className='btn btn-outline-danger' onClick={() => deleteContact(modalData._id)}>Delete</button>
        </Modal.Footer>
      </Modal>
    </>
  )
}

export default AllContacts;
