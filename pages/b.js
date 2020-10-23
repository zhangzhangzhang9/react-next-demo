import React, {
  useState,
  useEffect,
  useLayoutEffect,
  useContext,
  useRef,
  useReducer,
  memo, //fCom 优化 
  useMemo,
  useCallback
} from 'react'
// import MyContext from '../utils/my-context'
const div1 = {
  wordWrap: 'break-word',
  wordBreak: 'normal'
}

function countReducer(state, action) {
  switch (action.type) {
    case 'add':
      return state + 1
    case 'minus':
      return state - 1
    default:
      return state;
  }
}

function B() {

  // const [count, setCount] = useState(0);
  const [name, setName] = useState('张');
  const [count, dispatchCount] = useReducer(countReducer,0);
  // const context = useContext(MyContext);
  const inputRef = useRef();
  const countRef =  useRef();
  countRef.current = count;
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     // setCount(c => c + '1')
  //     dispatchCount({type:'add'})
  //   }, 16)
  //   return () => clearInterval(interval)
  // })

  // function add() {
  //   dispatchCount({type:'add'})
  // }
  
  useEffect(()=>{
    console.log('useEffect 测试')//再执行
    console.log(inputRef)
    return()=> console.log('useEffect 测试2') //先执行

  },[count])
  // 在dom更新之前 执行后dom更新
  // useLayoutEffect(()=>{
  //   console.log('Layout useEffect 测试')//再执行
  //   return()=> console.log('Layout useEffect 测试2') //先执行
  // },[count])
  const config =useMemo(()=>( {
    text:`test is ${count}`,
    color:count>3?'orange':'pink'
  }),[count])
  // const handleButtonClick = useCallback(()=>dispatchCount({type:'add'}),[])
  const handleButtonClick = useMemo(()=>()=>dispatchCount({type:'add'}),[])
  const handleAleartButtonClick = function(){
    setTimeout(()=>{
      alert(countRef.current)
    },2000)
  }
  return (
    <div>
      <input ref={inputRef} value={name}  onChange={e=>setName(e.target.value)}/>
      <Child config={config} onButtonClick={handleButtonClick}/>
      <button onClick={handleAleartButtonClick}>alert count</button>
    </div>
  )
}

const Child = memo(function Child({onButtonClick,config}){
  console.log('child render')
  return(
    <button onClick={onButtonClick} style={{color:config.color}}>
      {config.text}
    </button>
  )
})
export default B