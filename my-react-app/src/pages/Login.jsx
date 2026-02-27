import React, { useState } from 'react'

const Login = () => {

  const [state,setState] = useState('Sing Up')

  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [name,setName] = useState('')

  const onSubmitHandler = async (event)=>{
    event.preventDefault()

  }




  return (
    <form >
    <div>
        <p>{state === 'Sing Up' ? "Create account" : "Login"}</p>
        <p>Please {state === 'Sing Up' ? "sign up" : "log in"} to book appointment</p>

        <div>
          <p>Full Name</p>
          <input type="text" onChange={(e)=>setName(e.target.name)} value={name} required />
        </div>

        <div>
          <p>Email</p>
          <input type="email" onChange={(e)=>setName(e.target.name)} value={name} required/>
        </div>

        <div>
          <p>Password</p>
          <input type="password" onChange={(e)=>setName(e.target.name)} value={name} required/>
        </div>

        <button>{state === 'Sing Up' ? "Create account" : "Login"}</button>
    </div>
    </form>
  )
}

export default Login