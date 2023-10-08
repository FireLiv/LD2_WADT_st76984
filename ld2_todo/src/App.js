import React, { useState, useEffect} from 'react';
import { Button, Form } from 'react-bootstrap';
import { CSSTransition} from 'react-transition-group';
import 'animate.css/animate.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';



function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [showButtAnimation, setButtAnimat] = useState(false);
  const [showTitle, setShowTitle] = useState(false);


  const addTodo = () => {
    if (task.trim() !== '') {
      setTodos([...todos, { text: task, completed: false}]);
      setTask('');
    }
  };

  const clearAll = () => {
    setTodos([]);
  };

  const switchButtAnimat = () => {
    setButtAnimat(true);

    setTimeout(() => {
      setButtAnimat(false);
    }, 2000);
  };

  useEffect(() => {
    setTimeout(() => {
      setShowTitle(true);
    }, 100);
  }, []);

  const taskAccomplished = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };


  const deleteTodo = (index) => {
      setTodos((earlyTodo) =>
        earlyTodo.map((todo, i) =>
          i === index ? { ...todo, isExiting: true } : todo
        )
      );
  
      setTimeout(() => {
        setTodos((earlyTodo) => earlyTodo.filter((_, i) => i !== index));
      }, 500);
    
  };

  return (

    <div className="App">

     <CSSTransition
  in={showTitle}
  timeout={500}
  classNames="title"
  unmountOnExit
>
      <h1 className="ToDo">My TODO List</h1>
      </CSSTransition>

        <div className="d-flex align-items-center">

          <Form.Control
            className="input"
            type="text"
            placeholder="Add your todo"
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />
          
          <Button
          variant="primary"
          
          onClick={() => {
            addTodo();
            switchButtAnimat();
          }}
          className={`animate__animated ${showButtAnimation ? 'animate__bounce' : ''}`
          }>
          Save
        </Button>
        </div>
        
      <ul className= "list">

        {todos.map((todo, index) => (
          <li key={index} className={`line ${todo.completed ? 'completed' : ''} ${
    todo.isExiting ? 'exit' : ''}`} >

            <div className="todo-text">
            <span className={todo.completed ? 'completed-line' : ''}>{todo.text}</span>
            </div>

            <div className="cont-butt">

            <Button className="Done" variant="outline-success" onClick={() => taskAccomplished(index)}>
              {todo.completed ? 'Сancel' : 'Done'}
            </Button>

            <Button className="remove" variant="outline-danger" onClick={() => deleteTodo(index)}>
              remove
            </Button>

            </div>
          </li>
        ))}
      </ul>
    
      <Button className="removeAll" variant="secondary" onClick={clearAll}>clear all</Button>
      
    </div>
  );
}

export default App;