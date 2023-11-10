

import { useState } from "react"
import InputField from "./components/InputField"
import { Todo } from "./model";
import TodoList from "./components/TodoList";
import { DragDropContext, DropResult } from 'react-beautiful-dnd'

  // let name: string;
  // let age: number;
  // let isStudent: boolean;
  // let arrayOfString: string[];
  // let arrayOfNumbers: number[];
  // let fixArray: [number, string];

  // type CustomTypePerson = {
  //   name: string;
  //   age: number;
  // }

  // let object: CustomTypePerson = {
  //   name: "Robin",
  //   age?: 20 // optional age
  // }

  // let arrayOfObject: CustomTypePerson[];


  // let containBothNumAndStr: number | string; UNION

  // let sampleFunction: (name: string) => void;
  // let notKnowIfReturnOrNot: (name: string) => never;

  // let unknownDataType: unknown;

  // type InitialType = {
  //   a: string;
  //   b: string;
  // }

  // type ExtendedType = InitialType & {
  //   c: number;
  //   d: number;
  // }

  // interface
  // interface Person {
  //   name: string;
  //   age: number;
  // }

  // interface Guy extends Person {
  //   profession: string;
  // }
const App: React.FC = () => {

  const [todo, setTodo] = useState<string >("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTodos, setCompletedTodos] = useState<Todo[]>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if(todo){
      setTodos([...todos, {id: Date.now(), todo: todo, isDone: false}]);
      setTodo("")
    }

  }

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    console.log(result);

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    let add;
    const active = todos;
    const complete = completedTodos;
    // Source Logic
    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setCompletedTodos(complete);
    setTodos(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">Taskify</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd}/>
        <TodoList todos={todos} setTodos={setTodos} completedTodos={completedTodos} setCompletedTodos={setCompletedTodos}/>
      </div>
    </DragDropContext>

  )
}

export default App
