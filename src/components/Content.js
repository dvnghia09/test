import {useReducer,useRef}  from 'react';

// init state
const initState = {
  job : '',
  jobs : []
}
// Actions
const SET_JOB = 'set_job'
const ADD_JOB = 'add_job'
const DELETE_JOB = 'delete_job'

const setJob = (payload) => {
  return {
    type : SET_JOB,
    payload
  }
}

const addJob = (payload) => {
  return {
    type : ADD_JOB,
    payload
  }
}

const deleteJob = (payload) => {
  return {
    type : DELETE_JOB,
    payload
  }
}
// Reducer
const reducer = (state,action) => {
  console.log(state);
  console.log(action);

  let newJob
  
  switch (action.type) {
    case SET_JOB:
      newJob =  {
        ...state,
        job : action.payload
      }
      break
    case ADD_JOB:
      newJob = {
        ...state,
        jobs : [...state.jobs,action.payload]
      }
      break
    case DELETE_JOB:
      const newJobs = [...state.jobs]
      newJobs.splice(action.payload, 1)

      newJob  = {
        ...state,
        jobs : newJobs
      }
      break
    default:
      throw new Error('Invalid action')
  }
  console.log(newJob);
  return newJob
}
function Content() {
  const [state,dispatch] = useReducer(reducer,initState)
  const { job, jobs } = state

  const forcusInput = useRef()

  const handleSubmit = () => {
      dispatch(addJob(job))
      dispatch(setJob(''))
      forcusInput.current.focus()
  }

  return (
    <div style={{ padding:30 }} className="App">
        <h3>Todo App</h3>
        <input
          ref={forcusInput}
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

export default Content;