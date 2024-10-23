import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Login = () => {
    const {toast} = useContext(ToastContext)
    const { loginUser } = useContext(AuthContext)

    const [credentials, setCredentials] = useState({
        email: "",
        password: ""
    });

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setCredentials({...credentials, [name]:value})
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!credentials.email || !credentials.password) {
            toast.error("Please enter all the required fields!")
            return;
        };

        loginUser(credentials);
    }

  return (
    <>

    <h3>Login</h3>
      <form onSubmit={handleSubmit}>
        <div className='form-group'>
            <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
            <input
                type="email"
                className="form-control"
                id="emailInput"
                name='email'
                value={credentials.email}
                onChange={handleInputChange}
                placeholder="name@eample.com"
                required
            />
        </div>
        <div className='form-group'>
            <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
            <input
                type="password"
                className="form-control"
                id="passwordInput"
                value={credentials.password}
                onChange={handleInputChange}
                name='password'
                required
                placeholder="Enter your password"
            />

        </div>
        <input type='submit' value="Login" className='btn btn-outline-primary my-3' />
        <p> Dont have an account? <Link to="/register">Create one</Link></p>
    </form>
    </>
  )
}

export default Login
