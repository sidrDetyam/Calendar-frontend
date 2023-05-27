import React from 'react';
import TaskCard from "./TaskCard";

const TaskBoard = () => {
    return (
        <div className={"container mt-5"}>
            <div className={"row"}>
                <div className={"col-6"}>
                    <h3 className={"text-center"}>Активные задачи</h3>

                    <div className={"container-fluid mt-5"}>
                        <div className={"row"}>
                            <TaskCard/>
                            <TaskCard/>
                            <TaskCard/>
                            <TaskCard/>
                            <TaskCard/>
                        </div>
                    </div>
                </div>
                <div className={"col-6"}>
                    <h3 className={"text-center"}>Выполненные задачи</h3>
                </div>
            </div>
        </div>
    );
};

export default TaskBoard;