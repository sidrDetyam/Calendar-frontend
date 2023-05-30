import React, {useEffect, useState} from 'react';
import TaskCard from "./TaskCard";
import {Button, Col, Container, Row} from "react-bootstrap";
import InputTemplate from "./forms/InputTemplate";
import {api_rejected} from "../api/Api";
import PlusIcon from "./icons/PlusIcon";
import NewTaskForm from "./forms/NewTaskForm";
import {convertObjectToQueryString} from "../Utils";
import Loading from "./Loading";
import EditTaskForm from "./forms/EditTaskForm";
import NewTaskCard from "./NewTaskCard";
import NavBarButton from "./NavBarButton";
import {EVENTS_ROUTE, TASKS_ROUTE} from "../api/ApiRoutes";
import LogoutIcon from "./icons/LogoutIcon";

const NO_EDIT = 0
const NEW_TASK = 1
const EDIT_TASK = 2

const TaskBoard = () => {
    const [inputs, setInputsRaw] = useState({from: null, to: null, taskName: null, description: null})
    const [isDataActual, setActual] = useState(false)
    const [timerId, setTimerId] = useState(null)
    const [tasks, setTasks] = useState([])
    const [isLoading, setLoading] = useState(false)

    useEffect(() => {
        if (!isDataActual) {
            const url = `/tasks?${convertObjectToQueryString(inputs)}`
            setLoading(true)
            api_rejected.get(url)
                .then(response => setTasks(response.data))
                .catch(err => console.log(err))
                .finally(() => setLoading(false))
        }
        setActual(true)
    }, [inputs, isDataActual, setActual, setTasks])

    const requestDelayMs = 300;

    const setInputs = (newValue) => {
        if (timerId !== null) {
            clearTimeout(timerId)
        }
        setTimerId(setTimeout(() => setActual(false), requestDelayMs))
        setInputsRaw(newValue)
    }

    const [editMode, setEditMode] = useState(NO_EDIT);
    const [currentEditTask, setCurrentEditTask] = useState({})

    const onEditClick = (task) => {
        return () => {
            setCurrentEditTask(task)
            setEditMode(EDIT_TASK)
        }
    }

    const mapTasks = (isFinish) => {
        return tasks
            .filter(task => task.isFinish === isFinish)
            .sort((a, b) => a.taskDate < b.taskDate)
            .map((task, index) =>
                <TaskCard key={index} onEdit={onEditClick(task)} {...task}/>)
    }

    return (
        <>
            <NewTaskForm show={editMode === NEW_TASK} onDiscardCb={() => setEditMode(NO_EDIT)}
                         onSubmitCb={() => {
                             setEditMode(NO_EDIT)
                             setActual(false)
                         }
                         }/>

            {editMode === EDIT_TASK &&
                <EditTaskForm show={editMode === EDIT_TASK} onDiscardCb={() => setEditMode(NO_EDIT)}
                              task={currentEditTask}
                              onSubmitCb={() => {
                                  setEditMode(NO_EDIT)
                                  setActual(false)
                              }
                              }/>}

            <div className={"container-fluid"}  style={{backgroundColor: "rgba(52,53,65,1)"}}>
                <div className={"row"}>
                    <div className={"col-2 min-vh-100"}>
                        <div className={"container-fluid h-100"}>

                            <Row style={{height: "70%"}}>
                                <Col style={{marginTop: 250}}>
                                    <InputTemplate inputs={inputs} setInputs={setInputs}
                                                   maxWidth={300} margin={1}
                                                   variant={"datetime-local"} ph={"from"} field={"from"}/>

                                    <InputTemplate inputs={inputs} setInputs={setInputs}
                                                   maxWidth={300} margin={2}
                                                   variant={"datetime-local"} ph={"to"} field={"to"}/>

                                    <InputTemplate inputs={inputs} setInputs={setInputs}
                                                   maxWidth={300} margin={2}
                                                   ph={"Поиск по названию"} field={"taskName"}/>

                                    <InputTemplate inputs={inputs} setInputs={setInputs}
                                                   maxWidth={300} margin={2}
                                                   ph={"Поиск по описанию"} field={"description"}/>

                                    {isLoading && <Loading loadingText={"Загрузка "}/>}
                                </Col>
                            </Row>

                            <Row style={{height: "30%"}}>
                                <div className={"container"}>
                                    <div className={"row"} style={{maxWidth: 300, marginTop: 50}}>
                                        <NavBarButton variant={"dark"} route={EVENTS_ROUTE} title={"События"}
                                                      other={{style: {color: "white"}, disabled: true}}/>
                                    </div>

                                    <div className={"row"} style={{maxWidth: 300, marginTop: 10}}>
                                        <NavBarButton variant={"dark"} route={TASKS_ROUTE} title={"Задачи"}
                                                      other={{style: {color: "white"}}}/>
                                    </div>

                                    <div className={"row"} style={{maxWidth: 300, marginTop: 50}}>
                                        <Button variant={"danger"} style={{color: "white"}} onClick={() => {
                                        }} className={"ml-2"}>
                                            <LogoutIcon size={20}/>Выйти
                                        </Button>
                                    </div>
                                </div>
                            </Row>
                        </div>
                    </div>

                    <div className={"col-5"} style={{backgroundColor: "rgba(217,217,227, 1)",
                        marginTop: 5,
                        paddingTop: 100,
                        borderRadius: 30
                    }}>
                        <h3 className={"text-center"}>Активные задачи</h3>
                        <div className={"container mt-5"}>
                            <div className={"row"}>
                                {mapTasks(false)}
                                <NewTaskCard onClick={() => setEditMode(NEW_TASK)}/>
                            </div>
                        </div>

                    </div>

                    <div className={"col-5"}
                         style={{backgroundColor: "rgba(247,247,248, 0.95)",
                                marginTop: 5,
                                paddingTop: 100,
                                borderColor: "black",
                                borderWidth: 4,
                                borderRadius: 30
                         }}>
                        <h3 className={"text-center"}>Выполненные задачи</h3>

                        <div className={"container mt-5"}>
                            <div className={"row"}>
                                {mapTasks(true)}
                            </div>
                        </div>
                    </div>
                </div>

                {/*<Row className={"align-items-center justify-content-center"}>*/}
                {/*    <div className={"col-2 mt-5"}>*/}
                {/*        <Button variant={"outline-primary"} onClick={() => setEditMode(NEW_TASK)}>*/}
                {/*            <PlusIcon size={20}/> Новая задача*/}
                {/*        </Button>*/}
                {/*    </div>*/}
                {/*</Row>*/}
            </div>

        </>
    );
};

export default TaskBoard;