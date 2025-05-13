import './App.css'
import React, { createContext, useReducer } from 'react';
import {
  Routes, Route
} from 'react-router-dom';
import { useState } from 'react';
import user from './images/user1.jpg';
import { Mainpage } from './pages/MainPage';
import { Signup } from './pages/Signup';
import { FormReducer } from './client/UserInfo';
import { initialState } from './client/UserInfo';
import { PersonalInfo } from './pages/PersonalInfo';
import { Help } from './pages/Help';
import { Setting } from './pages/Setting';
import { Support } from './pages/Support';
import { Login } from './pages/Login';
import { StartPage } from './pages/StartPage';
import { Notification } from './pages/Notification';

export const ProfileContext = createContext();
function App() {

  const [image, setImage] = useState(user)
  const [state, dispatch] = useReducer(FormReducer, initialState)
  const [saveList , setSaveList] = useState([]);
  const [scheduleList , setScheduleList] = useState([]);
  const [firstDayTasks, setFirstDayTasks] = useState([])
  const [secondDayTasks, setSecondDayTasks] = useState([])
  const [thirdDayTasks, setThirdDayTasks] = useState([])
  const [fourthDayTasks, setFourthDayTasks] = useState([])
  const todayTasksNumber = firstDayTasks.length;
  const tommorowTasksNumber = secondDayTasks.length;
  const thirdTasksNumber = thirdDayTasks.length;
  const fourthTasksNumber = fourthDayTasks.length;
  const todayDoneTasksLength = firstDayTasks.filter((i)=>i.checked === true).length
  const tommorowDoneTasksLength = secondDayTasks.filter((i)=>i.checked === true).length
  const thirdDayDoneTasksLength = thirdDayTasks.filter((i)=>i.checked === true).length
  const fourthDayDoneTasksLength = fourthDayTasks.filter((i)=>i.checked === true).length
  const [signedUp , setSignedUp] = useState(false)
  


  return (
    <ProfileContext.Provider value={{ state, dispatch,image,setImage,saveList , setSaveList,scheduleList , setScheduleList,
      firstDayTasks, setFirstDayTasks, secondDayTasks, setSecondDayTasks, thirdDayTasks, setThirdDayTasks, fourthDayTasks, setFourthDayTasks,
      todayTasksNumber, tommorowTasksNumber, thirdTasksNumber, fourthTasksNumber, todayDoneTasksLength, tommorowDoneTasksLength,
      thirdDayDoneTasksLength, fourthDayDoneTasksLength, signedUp, setSignedUp
    }}>
      <>
        <Routes>
          <Route path='/' element={<Mainpage />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/personalinfo' element={<PersonalInfo/>} />
          <Route path='/help' element={<Help />} />
          <Route path='/setting' element={<Setting />} />
          <Route path='/support' element={<Support />} />
          <Route path='/login' element={<Login />} />
          <Route path='/start' element={<StartPage />} />
          <Route path='/notif' element={<Notification />} />
        </Routes>
      </>
    </ProfileContext.Provider>
  )
}

export default App