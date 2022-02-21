export default (state=[], action) => {
    switch(action.type) {
        case 'FETCH_ALL':

        return action.payload;

        case 'CREATE':
            return [...state, action.payload];

        case 'UPDATE':
                return state.map(item => item._id === action.payload._id ? action.payload : item); 

        default: return state;
    }
}