export const initialState = {
    name : "",
    lastname:"",
    username:"",
    job:"",
    password:"",
    email:"",
}

export const FormReducer = (state , action) => {
    switch (action.type){
        case "change_input":
            return {...state , [action.data.name] : action.data.value}
        default : return state
    }
}