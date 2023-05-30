import React from 'react';
import TaskBoard from "../components/TaskBoard";
import {useNavigate} from "react-router-dom";
import {TASKS_PAGE_ROUTE} from "../navigation/Routes";


const Main = () => {

    const navigate = useNavigate();
    navigate(TASKS_PAGE_ROUTE)


    return (
        <div className={"container-fluid"}>
            <div className={"row min-vh-100"}>

                <TaskBoard/>

            </div>
        </div>
    );
};

export default Main;