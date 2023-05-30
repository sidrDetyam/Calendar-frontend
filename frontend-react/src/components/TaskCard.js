import React, {useCallback} from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import EditIcon from "./icons/EditIcon";

function grayColor(color){
    return `rgb(${color}, ${color}, ${color})`
}

//const TASKS_COLORS = [grayColor(220), "white", grayColor(240)]

const TaskCard = ({task, onEdit, onDndStart, onDndEnd}) => {

    const onDragStart = useCallback(() => onDndStart(task), [task, onDndStart])
    const onDragEnd = useCallback(() => onDndEnd(task), [task, onDndEnd])

    const TASK_COLOR = grayColor(Math.max(255 - task.countOfRepeat, 210)) //TASKS_COLORS[task.id % TASKS_COLORS.length]

    return (
        <div className={"col-4 mt-4"}>
            <Card style={{borderRadius: 30, minHeight: 200, backgroundColor: TASK_COLOR}}
                  draggable={true}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
            >
                <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Card.Title>{task.taskName}</Card.Title>
                        <Button variant="outline-dark" onClick={onEdit} style={{borderColor: TASK_COLOR}}>
                            <EditIcon size={16}/>
                        </Button>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">{task.taskDate}</Card.Subtitle>
                    <Card.Text>{task.description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush" style={{borderRadius: 30}}>
                    <ListGroup.Item>Повторений: {task.countOfRepeat}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default TaskCard;