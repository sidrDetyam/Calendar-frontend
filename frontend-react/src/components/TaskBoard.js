import React, {useEffect, useState} from 'react';
import TaskCard from "./TaskCard";
import {Button, Container, Row} from "react-bootstrap";
import InputTemplate from "./forms/InputTemplate";
import {api_rejected} from "../api/Api";
import PlusIcon from "./icons/PlusIcon";
import NewTaskForm from "./forms/NewTaskForm";
import {convertObjectToQueryString} from "../Utils";
import Loading from "./Loading";
import EditTaskForm from "./forms/EditTaskForm";

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
            .filter(task => !(task.isFinish ^ isFinish))
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

            <div className={"container mt-5"}>
                <div className={"row"}>
                    <div className={"col-2"}>
                        <Container className={"mt-5"}>
                            <Row className={"mt-5"}>
                                <InputTemplate inputs={inputs} setInputs={setInputs}
                                               maxWidth={250}
                                               variant={"datetime-local"} ph={"from"} field={"from"}/>

                                <InputTemplate inputs={inputs} setInputs={setInputs}
                                               maxWidth={250}
                                               variant={"datetime-local"} ph={"to"} field={"to"}/>

                                <InputTemplate inputs={inputs} setInputs={setInputs}
                                               maxWidth={250}
                                               ph={"Поиск по названию"} field={"taskName"}/>

                                <InputTemplate inputs={inputs} setInputs={setInputs}
                                               maxWidth={250}
                                               ph={"Поиск по описанию"} field={"description"}/>

                                {isLoading && <Loading loadingText={"Загрузка "}/>}
                            </Row>
                        </Container>
                    </div>

                    <div className={"col-5"}>
                        <h3 className={"text-center"}>Активные задачи</h3>

                        <div className={"container mt-5"}>
                            <div className={"row"}>
                                {mapTasks(false)}
                            </div>
                        </div>

                    </div>
                    <div className={"col-5"}>
                        <h3 className={"text-center"}>Выполненные задачи</h3>

                        <div className={"container mt-5"}>
                            <div className={"row"}>
                                {mapTasks(true)}
                            </div>
                        </div>
                    </div>
                </div>

                <Row className={"align-items-center justify-content-center"}>
                    <div className={"col-2 mt-5"}>
                        <Button variant={"outline-primary"} onClick={() => setEditMode(NEW_TASK)}>
                            <PlusIcon size={20}/> Новая задача
                        </Button>
                    </div>
                </Row>
            </div>

        </>
    );
};

export default TaskBoard;