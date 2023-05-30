import React, {useCallback, useState} from 'react';
import {api_rejected} from "../../api/Api";
import {DELETE_TASK_ROUTE, EDIT_TASK_ROUTE} from "../../api/ApiRoutes";
import {Button, Col, Container, Modal, Row} from "react-bootstrap";
import InputTemplate from "./InputTemplate";
import TrashIcon from "../icons/TrashIcon";
import UploadIcon from "../icons/UploadIcon";
import XIcon from "../icons/XIcon";

const EditTaskForm = ({task, show, onDiscardCb, onSubmitCb}) => {
    const [isValid, setValid] = useState(false)

    const [inputs, setInputsRaw] = useState({...task})

    const setInputs = useCallback((newVal) => {
        setValid(newVal.taskName.length > 0 && newVal.description.length > 0 && newVal.countOfRepeat > 0)
        setInputsRaw(newVal)
    }, [setInputsRaw, setValid])

    const onSubmit = () => {
        api_rejected
            .put(EDIT_TASK_ROUTE, inputs)
            .catch(err => console.log(err))
            .finally(onSubmitCb)
    }

    const onDelete = () => {
        api_rejected
            .delete(`${DELETE_TASK_ROUTE}/${task.id}`)
            .catch(err => console.log(err))
            .finally(onSubmitCb)
    }

    const inputsWidth = 500

    return (
        <Modal show={show} onHide={onDiscardCb}>
            <Modal.Header closeButton>
                <Modal.Title>Редактировать задачу</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container className={"container-fluid"}>
                    <Row className={"align-items-center justify-content-center"}>
                        <Col className={"col-8"}>
                            <InputTemplate inputs={inputs} setInputs={setInputs}
                                           maxWidth={inputsWidth}
                                           other={{isInvalid: inputs.taskName.length === 0}}
                                           ph={"Название"} field={"taskName"}/>

                            <InputTemplate inputs={inputs} setInputs={setInputs}
                                           maxWidth={inputsWidth}
                                           other={{isInvalid: inputs.description.length === 0}}
                                           ph={"Описание"} field={"description"}/>

                            <InputTemplate inputs={inputs} setInputs={setInputs}
                                           maxWidth={inputsWidth}
                                           variant={"number"}
                                           other={{min: 0, isInvalid: inputs.countOfRepeat <= 0}}
                                           ph={"Количество повторений"} field={"countOfRepeat"}/>
                        </Col>
                    </Row>
                </Container>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={onDiscardCb}>
                    <XIcon size={16}/> Отмена
                </Button>
                <Button variant="danger" onClick={onDelete}>
                    <TrashIcon size={16}/> Удалить
                </Button>
                <Button variant={"dark"} disabled={!isValid} onClick={onSubmit}>
                    <UploadIcon size={16}/> Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    );
};

export default EditTaskForm;