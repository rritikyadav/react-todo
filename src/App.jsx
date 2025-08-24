import { React, useState, useEffect } from "react";
import "./App.css";
import axios from 'axios';
import { useNavigate } from 'react-router-dom'


function TodoApp() {
  const navigate = useNavigate();
  const jwt_token = sessionStorage.getItem("token")

  const [input, setinput] = useState("");
  const [todos, settodos] = useState([]);
  const [checked, setchecked] = useState(false);

  useEffect(() => {
    const getreq = async () => {
      try {
        const resp = await axios.get('http://localhost:5000/todo', {
          headers: {
            Authorization: jwt_token
          }
        });
        settodos(resp.data)
      }
      catch (err) {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.error)
          navigate('/')
        } else {
          console.log("get req err", err)
        }
      }
    }
    getreq();
  }, [])


  const handleChange = (e) => {
    setinput(e.target.value)
  };

  const checkboxChange = () => {
    setchecked(!checked)
  };

  const handleAdd = async () => {
    if (input.trim() === "") {
      alert("write your todo")
    }
    else {
      try {
        const resp = await axios.post('http://localhost:5000/todo', { todo: input, completed: false }, {
          headers: {
            Authorization: jwt_token
          }
        })
        settodos([...todos, resp.data])
      }
      catch (err) {
        if (err.response && err.response.status === 401) {
          alert(err.response.data.error)
          navigate('/')
        } else {
          console.log("get req err", err)
        }
      }
      setinput("");
    }
  };

  const handleDelete = async (todo) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/todo/${todo._id}`, {
        headers: {
          Authorization: jwt_token
        }
      });
      settodos(resp.data)
    }
    catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.response.data.error)
        navigate('/')
      } else {
        console.log("get req err", err)
      }
    }
  };

  const handleEdit = async (todo) => {
    try {
      const resp = await axios.delete(`http://localhost:5000/todo/${todo._id}`, {
        headers: {
          Authorization: jwt_token
        }
      });
      settodos(resp.data)
    }
    catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.response.data.error)
        navigate('/')
      } else {
        console.log("get req err", err)
      }
    }
    setinput(todo.todo);
  };

  const handleCompleted = async (todo) => {
    try {
      const resp = await axios.put(`http://localhost:5000/todo/${todo._id}`,{}, {
        headers: {
          Authorization: jwt_token
        }
      });
      const updatedtodo = resp.data;

      settodos(todos.map((todo) => {
        return todo._id === updatedtodo._id ? updatedtodo : todo
      }));
    }
    catch (err) {
      if (err.response && err.response.status === 401) {
        alert(err.response.data.error)
        navigate('/')
      } else {
        console.log("get req err", err)
      }
    }
  };

  return (
    <>
      <div className="actualBody">

        <div className="heading">I - Todo</div>

        <div className="inputs">
          <input onChange={handleChange} value={input} id="input" type="text" placeholder="Type Here" />
          <button onClick={handleAdd} id="save">Save</button>
        </div>

        <div className="checkbox"><input onChange={checkboxChange} checked={checked} type="checkbox" />Show Completed To-Do's</div>

        <div className="line"></div>

        <div className="todos">{todos
          .filter((todo) => (checked ? todo.Completed === true : todo.Completed === false))
          .map((todo) => {

            return <div className={`todo ${todo.Completed ? "completed" : ""}`} key={todo._id}>

              <div className="todotext">{todo.todo}</div>

              <div className="buttons">
                <img onClick={() => { handleCompleted(todo) }} src="completed.svg" alt="" />
                <img onClick={() => { handleEdit(todo) }} src="edit.svg" alt="" />
                <img onClick={() => { handleDelete(todo) }} src="delete.svg" alt="" />
              </div>

            </div>

          })}

        </div>

      </div>
    </>
  )
}

export default TodoApp;