import { createContext, useReducer } from 'react';

export const AdminContext = createContext();

export const AdminReducer = (state, action) => {
    switch (action.type) {
        case 'Get_Jobs':
            return {
                jobs: action.payload
            }

        case 'CREATE_Jobs':
            return {
                jobs: [action.payload, ...state.data]
            }

        case 'DELETE_Jobs':
            return {
                jobs: state.data.filter((todo) => todo._id !== action.payload._id)
            }

        case 'UPDATE_Jobs':
            // Update logic for existing todo based on _id
            return {
                job: state.data.map((todo) =>
                    todo._id === action.payload._id ? action.payload : todo
                ),
            }

        default:
            return state
    }
};

export const AdminContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(AdminReducer, {
        todos: null
    });

    return (
        <AdminContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AdminContext.Provider>
    )
};