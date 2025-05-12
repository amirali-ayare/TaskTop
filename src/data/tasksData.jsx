import moment from 'moment-jalaali';

const date = new Date
const jDate = moment();
const currentDay = parseInt(jDate.format('jD'))

const options = {
    month: 'long',
};
const persianMonth = date.toLocaleDateString('fa-IR', options);


export const TasksObj = [
    {
        day: currentDay,
        month: persianMonth,
        id:1,
        tasks: 'wswse',
    },
    {
        day: currentDay+1,
        month: persianMonth,
        id:2,
        tasks: 'xscrje',
    },
    {
        day: currentDay+2,
        month: persianMonth,
        id:3,
        tasks: '1111111',
    },
    {
        day: currentDay+3,
        month: persianMonth,
        id:4,
        tasks: '222',
    },
]