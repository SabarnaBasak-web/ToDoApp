import { Button, ListItemAvatar, ListItemText, } from '@material-ui/core'
import React from 'react'
import './Todo.css';
import { List, ListItem } from '@material-ui/core';
import db from '../FirebaseConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import firebase from 'firebase';

function Todo(props) {

    const deleteTodoHandler = () => {
        db.collection('Todos').doc(props.item.id).delete()
    }

    // const editTodoHandler = () => {
    //     console.log('clicked');
    // }

    const [open, setOpen] = useState(false);
    const [input, setInput] = useState(props.item.todo);

    const handleOpen = () =>{
        setOpen(true); 
         
    }

    const handleClose = () => {
        setOpen(false);
    }

    const useStyles = makeStyles((theme) => ({
        paper: {
            position: 'absolute',
            width: 400,
            top: '0',
            left: '0',
            transform: 'transalate(-50%,-50%)',
            backgroundColor: 'white',
            border: '2px solid #000',
            boxShadow: theme.shadows[5],
            padding: theme.spacing(2, 4, 3),
        },
    }));

    const classes = useStyles();

    const updateTodo = ()=> {    
        db.collection('Todos').doc(props.item.id).set({
            todoItem: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        setOpen(false);
    }
    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                <div className={classes.paper}>
                    <h1>Modal</h1>
                    <input value={input} onChange={(event) => setInput(event.target.value)} />
                    <Button onClick={updateTodo}> Update </Button>
                    <Button onClick={handleClose}> Close</Button>
                </div>
            </Modal>
            <div className="Todo">
                <List>
                    <ListItem>
                        
                        <ListItemText primary={props.item.todo}></ListItemText>
                        <EditIcon className="edit" onClick={handleOpen}></EditIcon>
                        <DeleteIcon onClick={deleteTodoHandler}>Delete Me</DeleteIcon>
                    </ListItem>

                </List>
            </div>
        </div>
    )
}

export default Todo
