import React, { useState } from 'react'
import { Todo } from '../model'
import {LuFileEdit, LuDelete} from 'react-icons/lu'
import {AiOutlineFileDone} from 'react-icons/ai'
import './styles.css'
import { Draggable } from 'react-beautiful-dnd'

type Props = {
    index: number;
    todo: Todo;
    todos: Todo[];
    setTodos:  React.Dispatch<React.SetStateAction<Todo[]>>
}

const SingleTodo = ({index, todo, todos, setTodos}: Props) => {

    const [edit, setEdit] = useState<boolean>(false);
    const [editTodo, setEditTodo] = useState<string>(todo.todo);


    const handleDone = (id:number) => {
        setTodos(todos.map(todo => todo.id == id ? {...todo, isDone: !todo.isDone} : todo))
    }
    const handleDelete = (id:number) => {
        setTodos(todos.filter(todo => todo.id !== id ))
    }
    const handleEdit = (e: React.FormEvent, id:number) => {
       e.preventDefault();

       setTodos(todos.map(todo => todo.id == id ? {...todo, todo: editTodo} : todo));

       setEdit(false)
    }

    return (
        <Draggable draggableId={todo.id.toString()} index={index}>
            {
                (provided) => (
                    <form className='todos__single' onSubmit={(e) => handleEdit(e, todo.id)} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                {
                    edit ? (
                        <input value={editTodo} className='todos__single--text' onChange={(e) => setEditTodo(e.target.value)} autoFocus/>
                    ) : (
                            todo.isDone ? (
                                <s className='todos__single--text'>{todo.todo}</s>

                            ) : (
                                <span className='todos__single--text'>{todo.todo}</span>
                            )

                    )
                }

                <div>
                    <span className='icon' onClick={() => {
                        if(!edit && !todo.isDone){
                            setEdit(true)
                        }
                    }}>
                        <LuFileEdit/>
                    </span>
                    <span className='icon' onClick={() => handleDelete(todo.id)}>
                        <LuDelete/>
                    </span>
                    <span className='icon' onClick={() => handleDone(todo.id)}>
                        <AiOutlineFileDone/>
                    </span>
                </div>

                </form>
                )
            }

        </Draggable>

    )
}

export default SingleTodo
