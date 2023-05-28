import React, {useState} from 'react';
import TaskBoard from "../components/TaskBoard";
import {Button} from "react-bootstrap";
import {api_rejected} from "../api/Api";
import InputTemplate from "../components/forms/InputTemplate";


const Main = () => {




    return (
        <div className={"container-fluid"}>
            <div className={"row min-vh-100"}>
                {/*<div className={"col-2"}>*/}
                {/*     /!*style={{backgroundColor: 'lightgray'}}>*!/*/}
                {/*    /!*<SideBar/>*!/*/}
                {/*</div>*/}

                <TaskBoard/>

                <div className={"col"}>

                </div>
            </div>
        </div>
    );
};

export default Main;