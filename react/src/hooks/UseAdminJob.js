import { AdminContext } from "../context/UserAdminJobsContext";
import { useContext } from "react";

export const UseAdminContext = () => {
    const context = useContext(AdminContext);

    if (!context) {
        throw Error('useAdminContext must be used inside an AdminContextProvider')
    }

    return context;
};