import React, {useState} from 'react';
import TaskCard from "./TaskCard";
import {Button, Modal} from "react-bootstrap";
import InputTemplate from "./forms/InputTemplate";
import {api_rejected} from "../api/Api";
import PlusIcon from "./icons/PlusIcon";
import NewTaskForm from "./forms/NewTaskForm";

function convertObjectToQueryString(obj) {
    return Object.entries(obj)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

const TaskBoard = () => {
    const [inputs, setInputs] = useState({from: null, to: null, taskName: null, description: null})

    const api_test = () => {
        const url = `/tasks?${convertObjectToQueryString(inputs)}`
        console.log(url)

        api_rejected.get(url)
            .then(response => {
                console.log(response.data)
            })
            .catch(err => {
                console.log(err)
            })
    }

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const onNewTaskClick = () => {
        handleShow()
    }

    return (
        <>
            <NewTaskForm setShow={setShow} show={show}/>

            <div className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <Button onClick={api_test}>
                            Тест
                        </Button>

                        <InputTemplate inputs={inputs} setInputs={setInputs}
                                       maxWidth={250}
                                       variant={"datetime-local"} ph={"from"} field={"from"}/>

                        <InputTemplate inputs={inputs} setInputs={setInputs}
                                       maxWidth={250}
                                       variant={"datetime-local"} ph={"to"} field={"to"}/>

                        <InputTemplate inputs={inputs} setInputs={setInputs}
                                       maxWidth={250}
                                       ph={"task name"} field={"taskName"}/>

                        <InputTemplate inputs={inputs} setInputs={setInputs}
                                       maxWidth={250}
                                       ph={"descr"} field={"description"}/>
                    </div>

                    <div className={"col-5"}>
                        <h3 className={"text-center"}>Активные задачи</h3>

                        <div className={"container-fluid mt-5"}>
                            <div className={"row"}>
                                <TaskCard/>
                                <TaskCard/>
                                <TaskCard/>
                                <TaskCard/>
                                <TaskCard/>
                            </div>

                            <div className={"row mt-5"}>
                                <div>
                                    <Button variant={"primary"}
                                            onClick={onNewTaskClick}>
                                        <PlusIcon size={20}/>
                                        Добавить задачу
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"col-5"}>
                        <h3 className={"text-center"}>Выполненные задачи</h3>
                    </div>
                </div>
            </div>

        </>
    );
};

export default TaskBoard;