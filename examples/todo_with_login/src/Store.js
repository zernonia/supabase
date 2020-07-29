import { useState, useEffect } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_KEY
)

export const useStore = (props) => {
  const [list, setList] = useState(null)
  const [tasks, setTasks] = useState([])
  const [newTask, handleNewTask] = useState()
  const [taskListener, setTaskListener] = useState(null)
  const [user, setUser] = useState(null)
  const [loginResult, setLoginResult] = useState(null)

  useEffect(() => {
    fetchList(props.uuid)
      .then((response) => {
        if (response) {
          setList(response)
          setTasks(response.tasks.sort((a, b) => b.id - a.id))
        }
      })
      .catch(console.error)
  }, [props.uuid])

  useEffect(() => {
    currentUser()
      .then((response) => {
        setUser(response)
      })
      .catch((err) => {
        console.error(err)
        setUser(null)
      })
  }, [loginResult])

  useEffect(() => {
    const handleAsync = async () => {
      if (newTask) {
        // could be an update
        let update = tasks.find((task, i) => {
          if (task.id === newTask.id) {
            tasks[i] = newTask
            return true
          } else {
            return false
          }
        })
        if (update) {
          setTasks((t) => [...tasks]) // update
        } else {
          tasks.unshift(newTask)
          setTasks((t) => [...tasks]) // new
        }
      }
    }
    handleAsync()
  }, [newTask])

  useEffect(() => {
    if (!taskListener && list) {
      setTaskListener(
        supabase
          .from(`tasks:list_id=eq.${list.id}`)
          .on('INSERT', (payload) => handleNewTask(payload.new))
          .on('UPDATE', (payload) => handleNewTask(payload.new))
          .subscribe()
      )
    }
  }, [list, taskListener])

  return {
    list,
    tasks,
    setTasks,
    user,
    setLoginResult,
  }
}

export const addTask = async (task_text, list_id) => {
  try {
    let { body } = await supabase.from('tasks').insert([{ task_text, list_id }])
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const updateTask = async (task_id, values) => {
  try {
    let { body } = await supabase.from('tasks').eq('id', task_id).update(values)
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const createList = async (uuid, user_id) => {
  try {
    let { body } = await supabase.from('lists').insert([{ uuid, user_id }])
    return body[0]
  } catch (error) {
    console.log('error', error)
  }
}

export const fetchList = async (list_uuid) => {
  try {
    let { body } = await supabase.from('lists').eq('uuid', list_uuid).select(`*, tasks(*)`).single()
    return body
  } catch (error) {
    console.log('error', error)
  }
}

export const currentUser = async () => {
  try {
    return await supabase.auth.user()
  } catch (error) {
    console.log('error', error)
  }
}

export const signup = async (email, password) => {
  try {
    await supabase.auth.signup(email, password)
  } catch (error) {
    console.log('error', error)
  }
}

export const login = async (email, password) => {
  try {
    await supabase.auth.login(email, password)
  } catch (error) {
    console.log('error', error)
  }
}

export const logout = async () => {
  try {
    await supabase.auth.logout()
  } catch (error) {
    console.log('error', error)
  }
}
