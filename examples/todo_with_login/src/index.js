import React from 'react'
import { useState } from 'react'
import './index.css'
import { BrowserRouter as Router, Route, Switch, useHistory } from 'react-router-dom'
import { render } from 'react-dom'
import { TodoList } from './TodoList'
import * as serviceWorker from './serviceWorker'
import { v4 as uuidv4 } from 'uuid'
import { createList, useStore, signup, login, logout } from './Store'

const newList = async (history, user_id) => {
  const list = await createList(uuidv4(), user_id)
  history.push(`/list?uuid=${list.uuid}`)
}

const Home = () => {
  const { value: email, bind: bindEmail, reset: resetEmail } = useInput('')
  const { value: password, bind: bindPassword, reset: resetPassword } = useInput('')
  const history = useHistory()
  const { user, setLoginResult } = useStore({})

  const handleSignup = async () => {
    signup(email, password).then(setLoginResult).catch(console.error)
    resetEmail()
    resetPassword()
  }

  const handleLogin = async () => {
    login(email, password).then(setLoginResult).catch(console.error)
    resetEmail()
    resetPassword()
  }

  const handleLogout = async () => {
    logout()
      .then((response) => {
        setLoginResult({})
      })
      .catch(console.error)
    resetEmail()
    resetPassword()
  }

  return (
    <div className="container">
      <div className="section">
        <h1>Collaborative Task Lists</h1>
        <small>
          Powered by <a href="https://supabase.io">Supabase</a>
        </small>
      </div>
      <div className="section">
        {user ? (
          <div>
            <button
              onClick={() => {
                newList(history, user.id)
              }}
            >
              new task list
            </button>
            <button onClick={handleLogout}>logout</button>
          </div>
        ) : (
          <div>
            <label>Email</label>
            <input type="email" {...bindEmail}></input>
            <label>Password</label>
            <input type="password" {...bindPassword}></input>
            <button onClick={handleSignup}>Sign Up</button>
            <button onClick={handleLogin}>Login</button>
          </div>
        )}
      </div>
      <div className="section build">
        <h3>
          Build this yourself:
          <br />
          <a href="https://dev.to/awalias/howto-build-collaborative-realtime-task-lists-in-react-4k52">
            Tutorial
          </a>{' '}
          | <a href="https://github.com/supabase/supabase/tree/master/examples/todo">Github</a>
        </h3>
        <a href="https://dev.to/awalias/howto-build-collaborative-realtime-task-lists-in-react-4k52">
          <img
            className="build-img"
            src="https://res.cloudinary.com/practicaldev/image/fetch/s--0Q5C-mHV--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://res.cloudinary.com/practicaldev/image/fetch/s--vlXt7rid--/c_imagga_scale%2Cf_auto%2Cfl_progressive%2Ch_420%2Cq_auto%2Cw_1000/https://dev-to-uploads.s3.amazonaws.com/i/cjjivuwyazvady0ddhyi.png"
            alt="learn how to build this"
          />
        </a>
      </div>
    </div>
  )
}

export const useInput = (initialValue) => {
  const [value, setValue] = useState(initialValue)

  return {
    value,
    setValue,
    reset: () => setValue(''),
    bind: {
      value,
      onChange: (event) => {
        setValue(event.target.value)
      },
    },
  }
}

render(
  <div className="App">
    <Router>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/list" component={TodoList} />
      </Switch>
    </Router>
  </div>,
  document.body
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
