
const initialState ={
    name:'',
    password: '',
    image:null 
}


export const userReducer = (state, action) => {
    switch (action.type) {
        case 'SET_NAME':
            return {...state, name: action.payload.name}
        case 'SET_PASSWORD':
            return {...state, password: action.payload.password}
        case 'SET_IMAGE':
            return {...state, image: action.payload.image}
        
        default:
            return state;
    }

}


