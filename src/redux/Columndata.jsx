import { createSlice } from "@reduxjs/toolkit"
import { useContext } from "react";
import { ProfileContext } from "../App";

export const Column = createSlice({
    name: "column",
    initialState: [],
    reducers: {
        saveData: (state, action) => {
            state.push(action.payload)
        },
        deleteTasks: (state, action) => {
            return state.filter((item) => item.id !== action.payload.id);
        },
        saveTask: (state, action) => {
            const task = state.find(item => item.id === action.payload.id);
            if (task) {
                task.saved = true;
            }
        },
        unSave: (state, action) => {
            const task = state.find(item => item.id === action.payload.id);
            if (task) {
                task.saved = false;
            }
        },
        setSchedule: (state, action) => {
            const task = state.find(item => item.id === action.payload.id);
            if (task) {
                task.schedule = action.payload.schedule;
                task.stringSchedule = action.payload.stringSchedule;
            }
        },
        deleteSchedule: (state, action) => {
            const task = state.find(item => item.id === action.payload.id);
            if(task) {
                task.schedule = 0
            }
        },
        checkedTask: (state, action) => {
            const task = state.find(item => item.id === action.payload.id);
            if(task) {
                task.checked = true
            }
        }

    }
})

export const { saveData, deleteTasks, saveTask, unSave, setSchedule, deleteSchedule, checkedTask } = Column.actions