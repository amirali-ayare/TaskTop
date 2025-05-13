import { useContext, useEffect, useRef, useState } from "react";
import { Hours } from "../data/HourData"
import moment from 'moment-jalaali';
import { TasksObj } from "../data/tasksData";
import { saveData, deleteTasks, saveTask, setSchedule, checkedTask } from '../redux/Columndata'
import { useDispatch, useSelector } from 'react-redux'
import { START_TIME, END_TIME } from "../data/TimeData";
import { ProfileContext } from "../App";
import { ToastContainer, toast } from 'react-toastify';
import { Link } from "react-router-dom";


export const Tasks = () => {

    const { setSaveList, setScheduleList,
        firstDayTasks, setFirstDayTasks, secondDayTasks, setSecondDayTasks,
        thirdDayTasks, setThirdDayTasks, fourthDayTasks, setFourthDayTasks,
        signedUp
    } = useContext(ProfileContext)




    const notifySchedule = () => {
        toast.warn('وقت انجام دادن یک تسک رسیده!!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
        });
    }
    const date = new Date
    const currentHour = date.getHours()


    const jDate = moment();
    const currentDay = parseInt(jDate.format('jD'))
    const options = {
        month: 'long',
    };
    const persianMonth = date.toLocaleDateString('fa-IR', options);
    const dispatch = useDispatch()
    const selector = useSelector((state) => state.column)



    const [openOptionsList, setOpenOptionsList] = useState([])

    const addOptionList = (id) => {
        setOpenOptionsList((prev) => {
            if (openOptionsList.includes(id)) {
                return prev.filter((p) => p != id)
            }
            else {
                return [...prev, id]
            }
        })
    }


    const [openCreateTask, setOpenCreateTask] = useState(false)
    const [miniTaskCount, setMiniTaskCount] = useState(0)

    const [checkedColor, setCheckedColor] = useState('#7DA9FF');
    const [checkedColumn, setCheckedColumn] = useState("")
    const [title, setTitle] = useState("")
    const [desc, setDesc] = useState("")
    const [miniTask, setMiniTask] = useState([])
    const [startTime, setStartTime] = useState(null)
    const [endTime, setEndTime] = useState(null)
    const [top, setTop] = useState(0)
    const [id, setId] = useState(0)
    const [scheduleTime, setScheduleTime] = useState(0);


    const calculateTimeAndTop = (top, hour) => {
        setTop(top)
        setStartTime(hour)
        setOpenStartTime(false)
    }

    const calculateEndTime = (hour) => {
        setEndTime(hour)
        setOpenEndTime(false)
    }
    const incrementMiniTaskCount = () => {
        if (miniTaskCount < 3) {
            setMiniTaskCount(miniTaskCount + 1);
        }
        setMiniTask([...miniTask, '']);
    };

    const handleMiniTaskChange = (index, value) => {
        const newMiniTasks = [...miniTask];
        newMiniTasks[index] = value;
        setMiniTask(newMiniTasks);
    };


    const titleInput = useRef();
    const descInput = useRef();
    const fTaskInput = useRef();



    const saveTaskRedux = () => {
        setId(id + 1)
        dispatch(saveData({
            id,
            visible: true,
            title,
            desc,
            startTime,
            endTime,
            miniTask,
            schedule: 0,
            stringSchedule: `${scheduleTime}:00`,
            checkedColor,
            checkedColumn,
            saved: false,
            deleted: false,
            checked: false,
            height: (endTime - startTime) * 125,
            top,
        }))
        setOpenCreateTask(false)
        titleInput.current.value = '';
        descInput.current.value = '';
        setMiniTaskCount(0);
        setMiniTask([])
        fTaskInput.current.value = '';
        setCheckedColumn(null);
        setCheckedColor('#7DA9FF');
        setTitle(null)
        setDesc(null)
        calculateTimeAndTop(null, null)
        calculateEndTime(null)
    }



    const [tasksSchedule, setTasksSchedule] = useState([]);

    useEffect(() => {
        const scheduleItems = selector.filter((t) => {
            return t.schedule !== 0
        })
        setScheduleList(scheduleItems)

        const savedItems = selector.filter((t) => {
            return t.saved === true;
        })
        setSaveList(savedItems)

        const FirstColumnTasks = selector.filter((t) => {
            return t.checkedColumn === 'column1';
        })
        setFirstDayTasks(FirstColumnTasks)

        const secondColumnTasks = selector.filter((t) => {
            return t.checkedColumn === 'column2';
        })
        setSecondDayTasks(secondColumnTasks)

        const thirdColumnTasks = selector.filter((t) => {
            return t.checkedColumn === 'column3';
        })
        setThirdDayTasks(thirdColumnTasks)

        const fourthColumnTasks = selector.filter((t) => {
            return t.checkedColumn === 'column4';
        })
        setFourthDayTasks(fourthColumnTasks)

        const scheduleArray = selector.map((i) => {
            return i.stringSchedule
        })
        setTasksSchedule(scheduleArray)

    }, [selector])

    console.log(tasksSchedule);


    useEffect(() => {
        const interval = setInterval(() => {
            const datee = new Date();
            const currentHourr = datee.getHours();
            const currentMinute = datee.getMinutes();
            const formattedTime = `${currentHourr}:${currentMinute < 10 ? '0' : ''}${currentMinute}`;

            for (let index = 0; index < tasksSchedule.length; index++) {
                const checkTime = tasksSchedule[index];
                if (checkTime === formattedTime) {
                    return notifySchedule();
                }
            }
        }, 60000);
        return () => clearInterval(interval);
    }, []);



    const [openStartTime, setOpenStartTime] = useState(false)
    const [openEndTime, setOpenEndTime] = useState(false)

    const deleteTask = (id) => {
        dispatch(deleteTasks({ id }))
    }


    const [openTimerDiv, setOpenTimerDiv] = useState([])
    const addTimerDiv = (id) => {
        setOpenTimerDiv((prev) => {
            if (openTimerDiv.includes(id)) {
                return prev.filter((p) => p != id)
            }
            else {
                return [...prev, id]
            }
        })
    }

    const [opacity, setOpacity] = useState([])

    const doneTask = (id) => {
        dispatch(checkedTask({ id }))
        setOpacity((prev) => [...prev, id])
    }

    console.log(selector);


    return (
        <div className="w-100 d-flex column pt-20" id="tasks-container">
            <button className="addtaskbtn" onClick={() => setOpenCreateTask(true)}>
                تسک جدید
                <i class='bx bx-plus'></i>
            </button>

            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="d-flex w-100">
                {
                    TasksObj.map((d) => {
                        return (
                            d.day === currentDay ? <div className="daytext w-23 d-flex ju-center relative"><h3 className="purple fw-800">{d.day} / <span>{d.month}</span></h3></div>
                                : <div className="daytext w-23 white d-flex ju-center relative"><h3 className="fw-200">{d.day} / <span className="fs-14">{d.month}</span></h3></div>
                        )
                    })
                }
            </div>

            <div id="taskDivsContainer" className="w-100 d-flex h-100p">

                <div className="w-23 d-flex column h-100p ai-center pt-20 relative">
                    {
                        firstDayTasks.map((i, index) => {
                            return (
                                <div key={index} className={opacity.includes(i.id) ? "task-container opacity03" : "task-container"} style={{ backgroundColor: i.checkedColor, height: i.height + "px", top: i.top }}>

                                    <div className={openOptionsList.includes(i.id) ? "task-options" : "hide"}>
                                        <div onClick={() => dispatch(saveTask({ id: i.id }))} className="task-option-div">
                                            <i class='bx bx-bookmark-plus'></i>
                                            <h5>ذخیره</h5>
                                        </div>
                                        <div onClick={() => addTimerDiv(i.id)} className="task-option-div">
                                            <i class='bx bx-timer'></i>
                                            <h5>تایمر</h5>
                                        </div>
                                        <div onClick={() => deleteTask(i.id)} className="task-option-div" id="task-delete">
                                            <i class='bx bx-trash'></i>
                                            <h5>حذف</h5>
                                        </div>
                                    </div>


                                    <div className={openTimerDiv.includes(i.id) ? "timercontainer d-flex column ai-center white p-5" : "hide"}>
                                        <div><h4>تایمر</h4></div>
                                        <div className="timediv w-90 pointer radius-5" style={{ height: '30px' }}>{scheduleTime}:00</div>
                                        <div className="w-90 d-flex ai-center mt-5">
                                            <button onClick={() => dispatch(setSchedule({ id: i.id, schedule: scheduleTime, stringSchedule: `${scheduleTime}:00` }))} className="white bac-purple w-100 no-border radius-5 pointer">اعمال</button>
                                        </div>
                                        <div className="timeList" id="schTime">
                                            {
                                                END_TIME.map((t) => {
                                                    return <div onClick={() => setScheduleTime(t.hour)} >{t.hour}:00</div>
                                                })
                                            }
                                        </div>
                                    </div>


                                    <button onClick={() => addOptionList(i.id)} className="task-menu-btn absolute"><i class='bx bx-dots-vertical-rounded'></i></button>
                                    <div className="w-100 d-flex column ai-center overflow pb-10">
                                        <div className="task-head">
                                            <h4>{i.title}</h4>
                                        </div>

                                        <div className="task-time">
                                            <h5>{i.startTime} - {i.endTime}</h5>
                                        </div>

                                        <div className="task-desc">
                                            <h6>
                                                {i.desc}
                                            </h6>
                                        </div>

                                        <div className="task-tasks" style={{height:'100px'}}>
                                            {
                                                Array.isArray(i.miniTask) && i.miniTask.map((t, index) => {
                                                    return (
                                                        <label className="custom-checkbox" key={index}>
                                                            <input type="checkbox" />
                                                            <span className="checkmark"></span>
                                                            <h6>{t}</h6>
                                                        </label>
                                                    );
                                                })
                                            }
                                        </div>

                                        <div className="task-done">
                                            <button onClick={() => doneTask(i.id)}><i class='bx bx-check'></i></button>
                                        </div>
                                    </div>

                                </div>
                            )
                        })
                    }
                </div>

                <div className="w-23 d-flex column h-100p ai-center pt-20 relative">
                    {
                        secondDayTasks.map((i, index) => {
                            return (
                                <div key={index} className={opacity.includes(i.id) ? "task-container opacity03" : "task-container"} style={{ backgroundColor: i.checkedColor, height: i.height + "px", top: i.top }}>

                                <div className={openOptionsList.includes(i.id) ? "task-options" : "hide"}>
                                    <div onClick={() => dispatch(saveTask({ id: i.id }))} className="task-option-div">
                                        <i class='bx bx-bookmark-plus'></i>
                                        <h5>ذخیره</h5>
                                    </div>
                                    <div onClick={() => addTimerDiv(i.id)} className="task-option-div">
                                        <i class='bx bx-timer'></i>
                                        <h5>تایمر</h5>
                                    </div>
                                    <div onClick={() => deleteTask(i.id)} className="task-option-div" id="task-delete">
                                        <i class='bx bx-trash'></i>
                                        <h5>حذف</h5>
                                    </div>
                                </div>


                                <div className={openTimerDiv.includes(i.id) ? "timercontainer d-flex column ai-center white p-5" : "hide"}>
                                    <div><h4>تایمر</h4></div>
                                    <div className="timediv w-90 pointer radius-5" style={{ height: '30px' }}>{scheduleTime}:00</div>
                                    <div className="w-90 d-flex ai-center mt-5">
                                        <button onClick={() => dispatch(setSchedule({ id: i.id, schedule: scheduleTime, stringSchedule: `${scheduleTime}:00` }))} className="white bac-purple w-100 no-border radius-5 pointer">اعمال</button>
                                    </div>
                                    <div className="timeList" id="schTime">
                                        {
                                            END_TIME.map((t) => {
                                                return <div onClick={() => setScheduleTime(t.hour)} >{t.hour}:00</div>
                                            })
                                        }
                                    </div>
                                </div>


                                <button onClick={() => addOptionList(i.id)} className="task-menu-btn absolute"><i class='bx bx-dots-vertical-rounded'></i></button>
                                <div className="w-100 d-flex column ai-center overflow pb-10">
                                    <div className="task-head">
                                        <h4>{i.title}</h4>
                                    </div>

                                    <div className="task-time">
                                        <h5>{i.startTime} - {i.endTime}</h5>
                                    </div>

                                    <div className="task-desc">
                                        <h6>
                                            {i.desc}
                                        </h6>
                                    </div>

                                    <div className="task-tasks" style={{height:'100px'}}>
                                        {
                                            Array.isArray(i.miniTask) && i.miniTask.map((t, index) => {
                                                return (
                                                    <label className="custom-checkbox" key={index}>
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                        <h6>{t}</h6>
                                                    </label>
                                                );
                                            })
                                        }
                                    </div>

                                    <div className="task-done">
                                        <button onClick={() => doneTask(i.id)}><i class='bx bx-check'></i></button>
                                    </div>
                                </div>

                            </div>
                            )
                        })
                    }
                </div>

                <div className="w-23 d-flex column h-100p ai-center pt-20 relative">
                    {
                        thirdDayTasks.map((i, index) => {
                            return (
                                <div key={index} className={opacity.includes(i.id) ? "task-container opacity03" : "task-container"} style={{ backgroundColor: i.checkedColor, height: i.height + "px", top: i.top }}>

                                <div className={openOptionsList.includes(i.id) ? "task-options" : "hide"}>
                                    <div onClick={() => dispatch(saveTask({ id: i.id }))} className="task-option-div">
                                        <i class='bx bx-bookmark-plus'></i>
                                        <h5>ذخیره</h5>
                                    </div>
                                    <div onClick={() => addTimerDiv(i.id)} className="task-option-div">
                                        <i class='bx bx-timer'></i>
                                        <h5>تایمر</h5>
                                    </div>
                                    <div onClick={() => deleteTask(i.id)} className="task-option-div" id="task-delete">
                                        <i class='bx bx-trash'></i>
                                        <h5>حذف</h5>
                                    </div>
                                </div>


                                <div className={openTimerDiv.includes(i.id) ? "timercontainer d-flex column ai-center white p-5" : "hide"}>
                                    <div><h4>تایمر</h4></div>
                                    <div className="timediv w-90 pointer radius-5" style={{ height: '30px' }}>{scheduleTime}:00</div>
                                    <div className="w-90 d-flex ai-center mt-5">
                                        <button onClick={() => dispatch(setSchedule({ id: i.id, schedule: scheduleTime, stringSchedule: `${scheduleTime}:00` }))} className="white bac-purple w-100 no-border radius-5 pointer">اعمال</button>
                                    </div>
                                    <div className="timeList" id="schTime">
                                        {
                                            END_TIME.map((t) => {
                                                return <div onClick={() => setScheduleTime(t.hour)} >{t.hour}:00</div>
                                            })
                                        }
                                    </div>
                                </div>


                                <button onClick={() => addOptionList(i.id)} className="task-menu-btn absolute"><i class='bx bx-dots-vertical-rounded'></i></button>
                                <div className="w-100 d-flex column ai-center overflow pb-10">
                                    <div className="task-head">
                                        <h4>{i.title}</h4>
                                    </div>

                                    <div className="task-time">
                                        <h5>{i.startTime} - {i.endTime}</h5>
                                    </div>

                                    <div className="task-desc">
                                        <h6>
                                            {i.desc}
                                        </h6>
                                    </div>

                                    <div className="task-tasks" style={{height:'100px'}}>
                                        {
                                            Array.isArray(i.miniTask) && i.miniTask.map((t, index) => {
                                                return (
                                                    <label className="custom-checkbox" key={index}>
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                        <h6>{t}</h6>
                                                    </label>
                                                );
                                            })
                                        }
                                    </div>

                                    <div className="task-done">
                                        <button onClick={() => doneTask(i.id)}><i class='bx bx-check'></i></button>
                                    </div>
                                </div>

                            </div>
                            )
                        })
                    }
                </div>

                <div className="w-23 d-flex column h-100p ai-center pt-20 relative">
                    {
                        fourthDayTasks.map((i, index) => {
                            return (
                                <div key={index} className={opacity.includes(i.id) ? "task-container opacity03" : "task-container"} style={{ backgroundColor: i.checkedColor, height: i.height + "px", top: i.top }}>

                                <div className={openOptionsList.includes(i.id) ? "task-options" : "hide"}>
                                    <div onClick={() => dispatch(saveTask({ id: i.id }))} className="task-option-div">
                                        <i class='bx bx-bookmark-plus'></i>
                                        <h5>ذخیره</h5>
                                    </div>
                                    <div onClick={() => addTimerDiv(i.id)} className="task-option-div">
                                        <i class='bx bx-timer'></i>
                                        <h5>تایمر</h5>
                                    </div>
                                    <div onClick={() => deleteTask(i.id)} className="task-option-div" id="task-delete">
                                        <i class='bx bx-trash'></i>
                                        <h5>حذف</h5>
                                    </div>
                                </div>


                                <div className={openTimerDiv.includes(i.id) ? "timercontainer d-flex column ai-center white p-5" : "hide"}>
                                    <div><h4>تایمر</h4></div>
                                    <div className="timediv w-90 pointer radius-5" style={{ height: '30px' }}>{scheduleTime}:00</div>
                                    <div className="w-90 d-flex ai-center mt-5">
                                        <button onClick={() => dispatch(setSchedule({ id: i.id, schedule: scheduleTime, stringSchedule: `${scheduleTime}:00` }))} className="white bac-purple w-100 no-border radius-5 pointer">اعمال</button>
                                    </div>
                                    <div className="timeList" id="schTime">
                                        {
                                            END_TIME.map((t) => {
                                                return <div onClick={() => setScheduleTime(t.hour)} >{t.hour}:00</div>
                                            })
                                        }
                                    </div>
                                </div>


                                <button onClick={() => addOptionList(i.id)} className="task-menu-btn absolute"><i class='bx bx-dots-vertical-rounded'></i></button>
                                <div className="w-100 d-flex column ai-center overflow pb-10">
                                    <div className="task-head">
                                        <h4>{i.title}</h4>
                                    </div>

                                    <div className="task-time">
                                        <h5>{i.startTime} - {i.endTime}</h5>
                                    </div>

                                    <div className="task-desc">
                                        <h6>
                                            {i.desc}
                                        </h6>
                                    </div>

                                    <div className="task-tasks" style={{height:'100px'}}>
                                        {
                                            Array.isArray(i.miniTask) && i.miniTask.map((t, index) => {
                                                return (
                                                    <label className="custom-checkbox" key={index}>
                                                        <input type="checkbox" />
                                                        <span className="checkmark"></span>
                                                        <h6>{t}</h6>
                                                    </label>
                                                );
                                            })
                                        }
                                    </div>

                                    <div className="task-done">
                                        <button onClick={() => doneTask(i.id)}><i class='bx bx-check'></i></button>
                                    </div>
                                </div>

                            </div>
                            )
                        })
                    }
                </div>



                <div className="w-8 white d-flex column h-100p pt-20 ai-center" style={{ rowGap: '100px' }}>
                    {Hours.map((h, index) => {
                        return (<h5 key={index} className={currentHour === h.hour ? "fw-600 purple" : "fw-200"}>{h.hour}:00</h5>)
                    })}
                </div>

            </div>

            <div className={openCreateTask ? "blurContainer" : "hide"}>

                <div className="addtaskdiv">
                    <div className="relative"><h2 className="white">
                        اضافه کردن
                        <span className="purple bold"> تسک</span>
                    </h2>
                        <i onClick={() => setOpenCreateTask(false)} class='bx bx-x white absolute pointer fs-26' style={{ top: '7px', right: '-180px' }}></i>
                    </div>

                    <div className="w-100 mt-20 d-flex ai-center column pb-20">
                        <input ref={titleInput} className="black-input" onChange={(e) => setTitle(e.target.value)} placeholder="عنوان..." />
                        <i id="titleicon" class='bx bx-text signicons mr-5'></i>

                        <input ref={descInput} className="black-input" onChange={(e) => setDesc(e.target.value)} placeholder="توضیحات..." />
                        <i id="captionicon" class='bx bx-receipt signicons mr-5'></i>

                        <div className="w-100 d-flex ai-center column mb-20 relative">
                            <button className="addminitask pointer absolute" onClick={incrementMiniTaskCount}>+</button>
                            <input className="minitask-input" ref={fTaskInput} onChange={(e) => handleMiniTaskChange(0, e.target.value)} placeholder="مینی تسک..." />
                            {Array.from({ length: miniTaskCount }, (_, index) => (
                                <input key={index} className="minitask-input" onChange={(e) => handleMiniTaskChange(index + 1, e.target.value)} placeholder={`مینی تسک...`} />
                            ))}
                        </div>


                        <div className="d-flex ai-center white ju-ar w-30 relative">
                            <h3>از</h3>
                            <div className="timediv pointer" onClick={() => setOpenStartTime(!openStartTime)}>{startTime}</div>
                            <h3>تا</h3>
                            <div className="timediv pointer" onClick={() => setOpenEndTime(!openEndTime)}>{endTime}</div>

                            <div className={openStartTime === false ? "hide" : "timeList"}>

                                {
                                    START_TIME.map((t) => {
                                        return <div onClick={() => calculateTimeAndTop(t.top, t.hour)}>{t.hour}:00</div>
                                    })
                                }
                            </div>


                            <div className={openEndTime === false ? "hide" : "timeList"} id="endtimelist">

                                {
                                    END_TIME.map((t) => {
                                        return <div onClick={() => calculateEndTime(t.hour)}>{t.hour}:00</div>
                                    })
                                }
                            </div>
                        </div>

                        <div className="d-flex ai-center w-40 mt-30 ju-ar">
                            <span onClick={() => setCheckedColor('#7DA9FF')} className={checkedColor === '#7DA9FF' ? "bac-blue color-circle check-circle" : "bac-blue color-circle"}></span>
                            <span onClick={() => setCheckedColor('#6763FE')} className={checkedColor === '#6763FE' ? "bac-purple color-circle check-circle" : "bac-purple color-circle"}></span>
                            <span onClick={() => setCheckedColor('#FF7EDB')} className={checkedColor === '#FF7EDB' ? "bac-pink color-circle check-circle" : "bac-pink color-circle"}></span>
                            <span onClick={() => setCheckedColor('#55D487')} className={checkedColor === '#55D487' ? "bac-green color-circle check-circle" : "bac-green color-circle"}></span>
                            <span onClick={() => setCheckedColor('#FFE27C')} className={checkedColor === '#FFE27C' ? "bac-yellow color-circle check-circle" : "bac-yellow color-circle"}></span>
                            <span onClick={() => setCheckedColor('#FE8D7D')} className={checkedColor === '#FE8D7D' ? "bac-orange color-circle check-circle" : "bac-orange color-circle"}></span>
                        </div>

                        <div className="white mt-20 d-flex ai-center">
                            <h5>ذخیره شود در :</h5>
                            <span onClick={() => setCheckedColumn('column1')} className={checkedColumn === 'column1' ? "task-date checkedDate" : "task-date"}>{currentDay} {persianMonth}</span>
                            <span onClick={() => setCheckedColumn('column2')} className={checkedColumn === 'column2' ? "task-date checkedDate" : "task-date"}>{currentDay + 1} {persianMonth}</span>
                            <span onClick={() => setCheckedColumn('column3')} className={checkedColumn === 'column3' ? "task-date checkedDate" : "task-date"}>{currentDay + 2} {persianMonth}</span>
                            <span onClick={() => setCheckedColumn('column4')} className={checkedColumn === 'column4' ? "task-date checkedDate" : "task-date"}>{currentDay + 3} {persianMonth}</span>
                        </div>

                        <button onClick={saveTaskRedux} className="bac-purple white w-40 mt-20 no-border radius-5 p-10 pointer">ثبت</button>

                    </div>

                </div>

            </div>


            {
                signedUp === false ?
                    <div className="blurContainer column">
                        <h2 className="white fw-800">شما هنوز ثبت نام نکرده اید!</h2>

                        <div className="d-flex ai-center ju-bet w-20 mt-20">
                            <h4 className="white fw-300">ثبت نام نکرده اید؟</h4>
                            <Link className="dec-none" to={'/signup'}>
                                <h4 className="purple">ثبت نام</h4>
                            </Link>
                        </div>

                        <div className="d-flex ai-center ju-bet w-20 mt-10">
                            <h4 className="white fw-300">حساب دارید؟</h4>
                            <Link className="dec-none" to={'/login'}>
                                <h4 className="purple mt-10">ورود</h4>
                            </Link>
                        </div>
                    </div>
                    :
                    ''
            }

        </div>
    )
}