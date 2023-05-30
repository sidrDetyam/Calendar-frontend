import React, {useEffect, useState} from 'react';
import TaskCard from "./TaskCard";
import {api_rejected} from "../api/Api";
import NewTaskForm from "./forms/NewTaskForm";
import {convertObjectToQueryString} from "../Utils";
import EditTaskForm from "./forms/EditTaskForm";
import NewTaskCard from "./NewTaskCard";
import {EDIT_TASK_ROUTE} from "../api/ApiRoutes";
import TasksFilters from "./forms/TasksFilters";
import SideBar from "./SideBar";

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

    const [dndState, setDndState] = useState({isDnd: false, isFinishedBoard: false, task: undefined})

    const onDragOver = (isFinishedBoard) => () => {
        setDndState({...dndState, isFinishedBoard: isFinishedBoard})
    }

    const onDragStart = (task) => {
        setDndState(s => {return {...s, isDnd: true, task: task}})
    }

    const onDragEnd = (task) => {
        setDndState(s => {return {...s, isDnd: false}})
        if(task.isFinish !== dndState.isFinishedBoard){
            task.isFinish = dndState.isFinishedBoard
            api_rejected
                .put(EDIT_TASK_ROUTE, task)
                .catch(err => console.log(err))
                .finally(() => setActual(false))
        }
    }

    const mapTasks = (isFinish) => {
        return tasks
            .filter(task => task.isFinish === isFinish)
            .sort((a, b) => a.id < b.id)
            .map((task, index) =>
                <TaskCard key={index} onEdit={onEditClick(task)} task={task} onDndStart={onDragStart} onDndEnd={onDragEnd}/>)
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

            <div className={"container-fluid"} style={{backgroundColor: "rgba(52,53,65,1)"}}>
                <div className={"row"}>
                    <div className={"col-2 min-vh-100"}>
                        <SideBar child={<TasksFilters setInputs={setInputs} inputs={inputs} isLoading={isLoading}/>}/>
                    </div>

                    <div className={"col-10"} style={{backgroundColor: "rgba(217,217,227, 1)",
                        marginTop: 10,
                        marginBottom: 10,
                        paddingTop: 100,
                        borderRadius: 15
                    }}>
                        <div className={"container-fluid"}>
                            <div className={"row"}>

                                <div className={"col-6"} onDragOver={onDragOver(false)}>
                                    <h3 className={"text-center"}>Активные задачи</h3>
                                    <div className={"container mt-5"}>
                                        <div className={"row"}>
                                            {mapTasks(false)}

                                            {!dndState.isDnd && <NewTaskCard onClick={() => setEditMode(NEW_TASK)}/>}
                                        </div>
                                    </div>
                                </div>

                                <div className={"col-6"} onDragOver={onDragOver(true)}>
                                    <h3 className={"text-center"}>Выполненные задачи</h3>

                                    <div className={"container mt-5"}>
                                        <div className={"row"}>
                                            {mapTasks(true)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default TaskBoard;