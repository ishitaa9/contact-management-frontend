import React, { useContext, useEffect } from 'react'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {user} = useContext(AuthContext);

  useEffect(() => {
    !user && navigate("/login", { replace: true })
  }, [])

  return (
    <>
      <div className="jumbotron">
      <h1>Welcome {user ? user.name : null}!</h1>
      <hr className="my-4" />
      <a className="btn btn-outline-info" href="/create" role="button">Add Contacts</a>
    </div>
    </>
  )
}

export default Home
