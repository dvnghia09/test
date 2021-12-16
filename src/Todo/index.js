import {useReducer,useRef}  from 'react';
import reducer,{initState} from './reducer';
import {addJob,setJob,deleteJob} from './action'
 

function App() {
  const [state,dispatch] = useReducer(reducer,initState)
  
  const {job,jobs} = state

  const focus = useRef()

  const handleSubmit = () => {
    dispatch(addJob(job))
    dispatch(setJob(''))

    focus.current.focus()
  }

  return (
    <div style={{ padding:30 }} className="App">
        <h3>Todo App</h3>
        <input
          ref={focus}
          value={job}
          placeholder='Enter your work...'
          onChange={(e) =>{
            dispatch(setJob(e.target.value))
          }}
        />
        <button
        onClick = {handleSubmit}
        >Add</button>
        <ul>
          {
            jobs.map((job,index) => {
              return <li key={index}>
                {job}
                <span
                 style={{cursor:'pointer',
                          marginLeft:20
                        }}
                 onClick = {() => {
                   dispatch(deleteJob(index))
                 }}
                >X</span>
              </li>
            } )
          }
        </ul>
    </div>
  );
}

export default App;