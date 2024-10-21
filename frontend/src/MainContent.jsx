import React, { useContext } from "react";
import {UserContext} from './App';

const MainContent = () => {
    const user = useContext(UserContext);
    return (
        <div>Welcome, {user}</div>
    );
}

export default MainContent;