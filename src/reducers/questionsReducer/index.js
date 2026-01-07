
export const initialStateQuestion ={
    categorySelect:[]
}


export const questionReducer = (state = initialStateQuestion, action) => {
    switch (action.type) {
        case 'ADD_QUESTION':
            return {...state, categorySelect: [...state.categorySelect, action.payload]}
    
        case 'REMOVE_QUESTION':
            const newState =  state.categorySelect.filter(item => item  !== action.payload )
            return {...state, categorySelect: [...newState]}
    
        default:
            return state;
    }

}
