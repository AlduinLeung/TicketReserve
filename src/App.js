import React,
{useEffect,
  useState,
  useMemo,
  useRef,
  useCallback} from 'react'
import './App.css'

let idSeq=Date.now();

//控制TODOITEM的组件
function Control(props){
  const {addTodo}=props
  const inputRef=useRef()
  const onSubmit=(e)=>{
    e.preventDefault();
    console.log(e)
    const newText=inputRef.current.value.trim(); //trim方法可以去掉字符串的首位空格
    console.log(inputRef);
    if(newText.length===0){
      return;          //如果遇到空字符串直接返回
    }
    addTodo({           //如果遇到飞空字符串添加到todos
      id:++idSeq,
      text:newText,
      complete:false,
    });

    inputRef.current.value='';
  }
  return (
  <div className='control'>
      <h1>
        todos
      </h1>
      <form onSubmit={onSubmit}> 
          <input
            type="text"
            ref={inputRef}
            className="new-todo"
            placeholder="what's need to be done?"
          />
      </form>
  </div>)
}




function Todos(props){
  const {todos,toggleTodo,removeTodo}=props
  return (
    <ul>
      {
        todos.map(todo=>{
          return (<TodoItem     //这里还需要添加一个组件的原因是为了不使个别item的渲染而导致整个组组件都需要重新渲染,并且将所有的方法都传入到子子组件中
            key={todo.id}
            todo={todo}
            toggleTodo={toggleTodo}
            removeTodo={removeTodo}
          />)   
        })
      }
    </ul>
  )
}

function TodoItem(props){
  const {
    todo:{
      id,text,complete
    },
    toggleTodo,
    removeTodo,
  }=props;
  const onChange=()=>{
    toggleTodo(id);
  }
  const onRemove=()=>{
    removeTodo(id);
  }
  return (
    <li className='todo-item'>
        <input 
        type="checkbox" 
        onChange={onChange} 
        checked={complete}/>
        <label className={complete?'complete':''}>{text}</label>
        <button onClick={onRemove}>&#xd7;</button>
    </li>
  )
}

const LS_key='$-todos_';
//
function TodoList(){
  const [todos,setTodos]=useState([]);


  const addTodo=useCallback((todo)=>{
    setTodos(todos=>[...todos,todo])
  },[]);


  const removeTodo=useCallback((id)=>{
    setTodos(todos=>todos.filter(todo=>{
      return todo.id!==id;
    }));
  },[]);


  const toggleTodo=useCallback((id)=>{
    setTodos(todos=>todos.map(todo=>{
      return  todo.id===id
      ?{
        ...todo,
        complete:!todo.complete
      }
      :todo;
    }));
  },[]);

  const dispatch=(action)=>{
    const {type,payload}=action;
    switch(type){
      case 'set':
        setTodos(payload)
        break;
      case 'add':
        setTodos(todos=>[...todos,payload])
        break;
      case  'remove':
        setTodos(todos=>todos.filter(todo=>{
          return todo.payload!==payload;
        }));
        break;
      case 'toggle':
        setTodos(todos=>todos.map(todo=>{
          return  todo.payload===payload
          ?{
            ...todo,
            complete:!todo.complete
          }
          :todo;
        }));
        break;
      default:
    }
  }



  //读数组,这里要注意副作用的顺序
  useEffect(()=>{
    const todos=JSON.parse(localStorage.getItem((LS_key)||'[]' ));
    // setTodos(todos);
    dispatch({type:'set',payload:todos})
    },[])

  //写todo数组到磁盘上
  useEffect(()=>{
    localStorage.setItem(LS_key,JSON.stringify(todos));
  },[todos])

  return (
  <div className='todo-list'>
        <Control addTodo={addTodo}/>
        <Todos removeTodo={removeTodo} toggleTodo={toggleTodo} todos={todos}/>
  </div>)
}

export default TodoList;