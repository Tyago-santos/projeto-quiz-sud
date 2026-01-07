
import { initialStateUser, userReducer } from "./userRedeucer";
import { initialStateQuestion, questionReducer} from "./questionsReducer";


const initialStateReducers = {
    user:initialStateUser,
    questions: initialStateQuestion

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
    questions:questionReducer,//userQuestion   
})

export {rootReducers, initialStateReducers}
