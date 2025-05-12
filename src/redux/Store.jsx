import {configureStore} from "@reduxjs/toolkit"
import { Column } from "./Columndata"

export const store = configureStore({
    reducer:{
        column: Column.reducer
    }
})