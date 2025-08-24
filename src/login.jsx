import { React, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import './login.css'

export default function Login() {
    const navigate = useNavigate()

    useEffect(() => {
        sessionStorage.clear()
    }, [])

    const [credentials, setcredentials] = useState({
        Username: "",
        Password: ""
    });

    const handlebtn = async () => {
        if (credentials.Username === "" || credentials.Password === "") {
            return alert("Enter Your Credentials")
        }
        try {
            const recieved_token = await axios.post(`https://react-todo-server-sybc.onrender.com/login`, credentials);
            sessionStorage.setItem("token" , recieved_token.data);
            navigate('/todo')
        } catch (err) {
            if (err.response && err.response.status === 404) {
                alert(err.response.data.error)
            } else {
                alert("something went wrong , please try again later")
            }
        }
    };

    const handleinput = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value })
    };

    return (
        <>
            <div className="logincard">
                <div className="heading">Todo &nbsp; Log - In</div>
                <div className="username">
                    <label htmlFor="Username">UserName : </label>
                    <input onChange={handleinput} name="Username" value={credentials.Username} type="text" /></div>
                <div className="password">
                    <label htmlFor="Password">Password : </label>
                    <input onChange={handleinput} name="Password" value={credentials.Password} type="text" /></div>
                <div onClick={handlebtn} id="btn"><button>LOG IN</button></div>
            </div>
        </>
    )
}