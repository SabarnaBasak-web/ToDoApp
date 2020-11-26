import './App.css';
import { useState, useEffect } from 'react';
import { Button, FormControl, InputLabel, Input } from '@material-ui/core'
import Todo from './Components/Todo';
import db from './FirebaseConfig';
import firebase from 'firebase';


function App() {
  const [todos, setTodos] = useState([]);
  const [inputText, setInputText] = useState('');

  // When the app loads we need to listen to the db and fetch new todos as they get added/removed
  useEffect(() => {
    //this fires when the app loads
    db.collection('Todos').onSnapshot(snapshot => {
      //console.log('Inside SnapShot', snapshot.docs.map(doc => doc.data().todoItem));
      setTodos(snapshot.docs.map(doc => ({id: doc.id, todo:doc.data().todoItem})))
    })
  }, []);


  const inputChangeHandler = (event) => {
    // console.log(event.target.value);
    setInputText(event.target.value);
  }

  const addTodoHandler = (event) => {
    event.preventDefault();
    // console.log('clicked', inputText);
    //adding it to the DB
    db.collection('Todos').add({
      todoItem:inputText,
      timestamp: firebase.firestore.FieldValue.serverTimestamp()
    });

    // setTodos([...todos, inputText]);
    setInputText('');
  }

  return (
    <div className="App">
      <h1 className="App-heading">My ToDo List</h1>
      <form action="" className="App-form">
        <FormControl>
          <InputLabel htmlFor="write-todo">Write Todo</InputLabel>
          <Input id="my-input" aria-describedby="my-helper-text" onChange={inputChangeHandler} value={inputText} />
        </FormControl>
        <Button type="submit" disabled={!inputText} onClick={addTodoHandler} variant="contained" color="primary">
          Primary
        </Button>
      </form>
      <div className="itemList">
        <ul>
          {todos.map(todo => {
            return <Todo key={todo.id} item={todo}></Todo>
          })}
        </ul>
      </div>
      {/* <p>{todoInput}</p> */}
    </div>
  );
}

export default App;
