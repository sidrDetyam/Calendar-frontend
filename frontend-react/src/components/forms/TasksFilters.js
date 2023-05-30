import React from 'react';
import {Col} from "react-bootstrap";
import InputTemplate from "./InputTemplate";
import Loading from "../Loading";

const TasksFilters = ({inputs, setInputs, isLoading}) => {
    return (
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
    );
};

export default TasksFilters;