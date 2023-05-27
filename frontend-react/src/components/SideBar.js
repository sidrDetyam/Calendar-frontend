import React from 'react';
import {Button, Row} from "react-bootstrap";
import LogoutIcon from "../icons/LogoutIcon";

const SideBar = () => {
    return (
        <div className={"container mt-5 justify-content-between"}>

            <div className={"row"}>

                <div className={"row mt-3"}>
                    <Button>События</Button>
                </div>

                <div className={"row mt-3"}>
                    <Button>Задачи</Button>
                </div>

            </div>

            <div className={"row mt-3"}>
                <Button variant={"outline-danger"}>
                    <LogoutIcon size={20}/>
                    Выйти</Button>
            </div>
        </div>
    );
};

export default SideBar;