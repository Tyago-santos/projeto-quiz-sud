
import { userReducer } from "./userRedeucer";
import { initialStateUser } from "./userRedeucer";
import { initialStateQuestio } from "./questionsReducer";


const initialStateReducers = {
    user:initialStateUser,
    questions: initialStateQuestio

}
const combineReducers = (reducers) =>{

    return ( state = {}, action)=>{
        const newState = {};
        Object.keys(reducers).forEach(key=>{
            newState[key] = reducers[key](state[key], action);
        });
        return newState;
    }

}

const rootReducers = combineReducers({
    user: userReducer, // userReducer,
    questons: [],//userQuestion   
})

export {rootReducers, initialStateReducers}
