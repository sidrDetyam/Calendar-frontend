import React from 'react';
import {Card, Col, Row} from "react-bootstrap";

const TaskCard = () => {
    const name = "Имя"
    const description = "ldsndsnldkndksnlksdnl"

    return (
        <div className={"col-4 mt-4"}>
            <Card>
                <Card.Body>
                    <h3 className={"text-center"}>{name}</h3>
                    <h5 className={"text-center"}>{description}</h5>


                </Card.Body>
            </Card>
        </div>
    );
};

export default TaskCard;