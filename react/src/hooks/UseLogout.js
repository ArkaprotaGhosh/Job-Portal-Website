import { UseAutheContext } from "./UseAutheContext";

export const UseLogout = () => {

    const { dispatch } = UseAutheContext();
    // const { dispatch: todoDispatch } = useTodoContext();

    const logout = () => {
        //remove user from local storage
        localStorage.removeItem('user')

        // Dispatch the log out action
        dispatch({ type: 'LOGOUT' })

        // Set the todo state to null
        // todoDispatch({ type: 'SET_TODOS', payload: null })
    }

    return { logout }
}