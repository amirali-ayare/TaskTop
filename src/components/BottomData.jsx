// import { Line } from "react-chartjs-2";
import { Line } from 'react-chartjs-2';
import moment from 'moment-jalaali';
import { useContext, useState } from "react";
import { ProfileContext } from "../App";
import { Quets } from "../data/quets";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

export const BottomData = () => {

    const { todayDoneTasksLength, tommorowDoneTasksLength, thirdDayDoneTasksLength, fourthDayDoneTasksLength, } = useContext(ProfileContext)

    const date = new Date();
    const jDate = moment();
    const currentDay = parseInt(jDate.format('jD'))
    const options = {
        month: 'long',
    };
    const persianMonth = date.toLocaleDateString('fa-IR', options);

    const [arrayIndex, setArrayIndex] = useState(0);

    const increaseIndex = () => {

        if (arrayIndex === 12) {
            setArrayIndex(0)
        }
        else {
            setArrayIndex((p) => p + 1)
        }
    }


    return (
        <div className="bottomdataDiv w-100 d-flex ai-center ju-ar">

            <div className="w-45 d-flex column p-20 radius-10" id="motivation-message">
                <div className="relative">
                    <h3 className="v-gray mb-10">نکته ی امروز : </h3>
                    <button onClick={increaseIndex} className="absolute shufflebtn"><i className='bx bx-shuffle'></i></button>
                </div>
                <div>
                    <h5 className="white fw-300">
                        {Quets[arrayIndex].sentence}
                    </h5>

                    <h5 className="gray d-flex ai-center mt-10">
                        <i className='bx bx-pen fs-20 ml-5'></i>
                        {Quets[arrayIndex].author}
                    </h5>


                </div>
            </div>

            <div className="w-45 d-flex ju-center ai-center radius-10" id="bottomanalyse">

                <Line
                    data={{
                        labels: [
                            `${currentDay} ${persianMonth}`,
                            `${currentDay + 1} ${persianMonth}`,
                            `${currentDay + 2} ${persianMonth}`,
                            `${currentDay + 3} ${persianMonth}`
                        ],
                        datasets: [
                            {
                                label: "عملکرد",
                                data: [todayDoneTasksLength, tommorowDoneTasksLength, thirdDayDoneTasksLength, fourthDayDoneTasksLength],
                                borderColor: "#4c535e",
                                borderWidth: 1,
                                backgroundColor: [
                                    "#55D487", "#FF7EDB", "#FE8D7D", "#FFE27C", "#7DA9FF"
                                ],
                                borderRadius: 3,
                            },
                        ],

                    }}
                />

            </div>

        </div>
    )
}