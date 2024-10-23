import { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext';
import ToastContext from '../context/ToastContext';

const Register = () => {
    const {toast} = useContext(ToastContext);
    const { registerUser } = useContext(AuthContext)
    const [credentials, setCredentials] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: ""
    })

    const handleInputChange = (event) => {
        const {name, value} = event.target;

        setCredentials({ ...credentials, [name]: value});
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if(!credentials.email || !credentials.password || !credentials.confirmPassword) {
            toast.error("Please enter all the required fields!")
            return;
        }

        if(credentials.password !== credentials.confirmPassword) {
            toast.error("Password does not match!")
            return;
        }
        const userData = {...credentials, confirmPassword: undefined};
        registerUser(credentials)
    }
  return (
    <>
    <h3>Create your account</h3>
      <form onSubmit={handleSubmit}>
      <div>
            <label htmlFor="nameInput" className="form-label mt-4">Name</label>
            <input
            type="name"
            className="form-control"
            id="nameInput"
            name='name'
            placeholder="Your name"
            value={credentials.name}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="emailInput" className="form-label mt-4">Email address</label>
            <input
            type="email"
            className="form-control"
            id="emailInput"
            name='email'
            placeholder="name@eample.com"
            value={credentials.email}
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="passwordInput" className="form-label mt-4">Password</label>
            <input
            type="password"
            className="form-control"
            id="passwordInput"
            name='password'
            value={credentials.password}
            placeholder="Enter your password"
            onChange={handleInputChange}
            required
            />
        </div>
        <div>
            <label htmlFor="confirmPassword" className="form-label mt-4">Confirm Password</label>
            <input
            type="password"
            className="form-control"
            id="confirmPassword"
            name='confirmPassword'
            value={credentials.confirmPassword}
            placeholder="Confirm your password"
            onChange={handleInputChange}
            required
            />
        </div>
        <input type='submit' value="Register" className='btn btn-primary my-3' />
        <p> Already have an account? <Link to="/login">Login</Link></p>
    </form>
    </>
  )
}

export default Register
