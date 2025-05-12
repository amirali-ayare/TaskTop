import { useContext, useState } from "react"
import { ProfileContext } from '../App';
import { Chart as ChartJS } from "chart.js/auto";
import { Chart, ArcElement } from 'chart.js'
import { Doughnut } from "react-chartjs-2";
import { unSave, deleteSchedule } from "../redux/Columndata";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import bookmark from '../images/bookmark_p.webp';
import time from '../images/time_p.webp';

export const Sidebar = () => {

    const { state, image, setImage, saveList, scheduleList, todayTasksNumber,
        todayDoneTasksLength, setFirstDayTasks, setSecondDayTasks, setThirdDayTasks, setFourthDayTasks, signedUp, setSignedUp
    } = useContext(ProfileContext)

    const [choosenBtn, setChoosenBtn] = useState('analyse');

    const dispatch = useDispatch()

    const logout = () => {
        setFirstDayTasks([])
        setSecondDayTasks([])
        setThirdDayTasks([])
        setFourthDayTasks([])
        setSignedUp(false)
    }

    return (
        <div className="sidebarDiv w-20 h-100 d-felx ai-center column white p-20">

            <div className="w-100 d-flex ai-center">
                <div className="d-flex ai-center ju-ar w-60">
                    <div>
                        <img src={image} className="SideprofileImage" />
                    </div>
                    <div>
                        <h5>{state.username}</h5>
                        <h6 className="gray">{state.job}</h6>
                    </div>
                </div>
            </div>

            <div className="sideitems d-flex column w-100 pr-15 mt-20">

                <Link className="dec-none" to={'/setting'}><div className="sidebtns">
                    <i class='bx bx-cog'></i>
                    تنظیمات
                </div></Link>


                <Link className="dec-none" to={'/support'}><div className="sidebtns">
                    <i class='bx bx-message-rounded'></i>
                    پشتیبانی
                </div></Link>


                <div onClick={logout} className="sidebtns" style={{ color: 'rgb(255, 0, 0)' }}>
                    <i class='bx bx-log-out'></i>
                    خروج از اکانت
                </div>

            </div>

            <div id="bottomSideDiv" className="d-flex column ai-center">

                <div className="sideOptions w-100 d-flex ai-center ju-bet mt-20">
                    <button onClick={() => setChoosenBtn('analyse')} className={choosenBtn === 'analyse' ? "optionbtns optionactivebtns" : "optionbtns"}><i class='bx bx-doughnut-chart'></i></button>
                    <button onClick={() => setChoosenBtn('saved')} className={choosenBtn === 'saved' ? "optionbtns optionactivebtns" : "optionbtns"}><i class='bx bx-bookmark'></i></button>
                    <button onClick={() => setChoosenBtn('timer')} className={choosenBtn === 'timer' ? "optionbtns optionactivebtns" : "optionbtns"}><i class='bx bx-alarm-exclamation'></i></button>
                    <button onClick={() => setChoosenBtn('viewall')} className={choosenBtn === 'viewall' ? "optionbtns optionactivebtns" : "optionbtns"}><i class='bx bx-receipt'></i></button>
                </div>


                <div className="optiondisplay d-flex ai-center ju-center mt-20 w-100 p-5">

                    {
                        choosenBtn === 'analyse' ?
                            <Doughnut
                                data={{
                                    labels: ["انجام شده", "انجام نشده"],
                                    datasets: [
                                        {
                                            data: [todayDoneTasksLength, todayDoneTasksLength - todayTasksNumber],
                                            borderColor: '#1E1F24',
                                            backgroundColor: [
                                                "#7DA9FF", "#FE8D7D"
                                            ],
                                            borderRadius: 3,

                                        },
                                    ],

                                }}
                            />
                            : ''
                    }

                    {
                        choosenBtn === 'saved' ?

                            <div className="savedContainer w-100 d-flex column ai-center fs-13 pb-30">


                                {
                                    saveList.length === 0 ? (
                                        <div className="d-flex column ai-center pt-20">
                                            <img src={bookmark} className="w-20 mb-10"/>
                                            <h5 className="white fw-300">هیچ تسک ذخیره شده ای وجود ندارد</h5>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="savedShadow"></div>
                                            {
                                                saveList.map((t) => {
                                                    return (
                                                        <div key={t.id} className="savedItems w-100 d-flex ai-center ju-bet p-5">
                                                            {t.title}
                                                            <i onClick={() => dispatch(unSave({ id: t.id }))} className='bx bx-x-circle pointer orange fs-16'></i>
                                                        </div>
                                                    )
                                                })
                                            }
                                        </>
                                    )
                                }


                            </div>
                            : ''
                    }

                    {
                        choosenBtn === 'timer' ?

                            <div className="timerContainer w-100 d-flex column ai-center pb-30 fs-13">



                                {
                                    scheduleList.length===0 ? (
                                        <div className="d-flex column ai-center pt-20">
                                            <img src={time} className="w-20 mb-10"/>
                                            <h5 className="white fw-300">هیچ تسک تایمر شده ای وجود ندارد</h5>
                                        </div>
                                    ) : (
                                    
                                        <>
                                        <div className="timerShadow"></div>
                                        {
                                            scheduleList.map((t) => {
                                                return (
                                                    <div className="timerItems w-100 d-flex ai-center ju-bet p-5">
                                                        {t.title}
                                                        <div className="d-flex ai-center">
                                                            <i onClick={() => dispatch(deleteSchedule({ id: t.id }))} class='bx bx-x-circle pointer orange fs-16'></i>
                                                            <i title={t.schedule + ":00"} class='bx bx-time-five blue pointer fs-16' style={{ marginRight: '2px' }}></i>
                                                        </div>
                                                    </div>
                                                )
                                            })
                                        }
                                        </>
                                    )
                                }

                            </div>
                            : ''
                    }

                    {
                        choosenBtn === 'viewall' ?

                            <div className="w-100 d-flex column ai-center h-100p">
                                <div className="w-100 d-flex ai-center p-10 fs-12 fw-300 mr-10" style={{ height: '30px' }}>
                                    <span className="circlespan bac-green ml-10"></span>
                                    {todayDoneTasksLength} از {todayTasksNumber} تسک امروز انجام شده
                                </div>

                                <div className="w-100 d-flex ai-center p-10 fs-12 fw-300 mr-10" style={{ height: '30px' }}>
                                    <span className="circlespan bac-pink ml-10"></span>
                                    {todayTasksNumber - todayDoneTasksLength} تسک باقی مانده است
                                </div>

                                <div className="w-100 d-flex ai-center p-10 fs-12 fw-300 mr-10" style={{ height: '30px' }}>
                                    <span className="circlespan bac-yellow ml-10"></span>
                                    {scheduleList.length} تسک تایمر هستند
                                </div>

                                <div className="w-100 d-flex ai-center p-10 fs-12 fw-300 mr-10" style={{ height: '30px' }}>
                                    <span className="circlespan bac-blue ml-10"></span>
                                    {saveList.length} تسک ذخیره شده اند
                                </div>
                            </div>

                            : ''
                    }




                </div>

            </div>

        </div>
    )
}
