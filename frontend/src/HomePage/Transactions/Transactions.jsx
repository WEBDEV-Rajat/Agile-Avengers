import React, {useState} from 'react'
import Navbar from '../Navigationbar';
import "./Transactions.css";
import TodoInput from './ToDoInput';
import Todolist from './TodoList';
const Transactions = () => {
  const [listTodo, setListTodo]=useState([]);
  let addList = (inputText)=>{
    if(inputText!=='')
      setListTodo([...listTodo,inputText]);
  }
  const deleteListItem = (key)=>{
    let newListTodo = [...listTodo];
    newListTodo.splice(key,1)
    setListTodo([...newListTodo])
  }
  return (
    <>
     <Navbar/>
    <div className="main-container">
      <h1>Transaction History</h1>
      <div className="center-container">
        <TodoInput addList={addList}/>
        {listTodo.map((listItem,i)=>{
          return (
            <Todolist key={i} index={i} item={listItem} deleteItem={deleteListItem}/>
          )
        })}
      </div>
      <table>
      <tr>
    <th>Category</th>
    <th>Description</th>
    <th>Date</th>
    <th>Type</th>
    <th>Amount</th>
    </tr>
      </table>
    </div>
    </>
  )
}

export default Transactions;
