import React from 'react';
import {Button, Card, ListGroup} from "react-bootstrap";
import EditIcon from "./icons/EditIcon";

const TaskCard = ({taskName, description, taskDate, countOfRepeat, onEdit}) => {
    return (
        <div className={"col-4 mt-4"}>
            <Card>
                <Card.Body>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Card.Title>{taskName}</Card.Title>
                        <Button variant="outline-dark" onClick={onEdit}>
                            <EditIcon size={16}/>
                        </Button>
                    </div>
                    <Card.Subtitle className="mb-2 text-muted">{taskDate}</Card.Subtitle>
                    <Card.Text>{description}</Card.Text>
                </Card.Body>
                <ListGroup variant="flush">
                    <ListGroup.Item>Повторений: {countOfRepeat}</ListGroup.Item>
                </ListGroup>
            </Card>
        </div>
    );
};

export default TaskCard;