import React, {useState} from 'react';
import TaskBoard from "../components/TaskBoard";
import {Button} from "react-bootstrap";
import {api_rejected} from "../api/Api";
import InputTemplate from "../components/forms/InputTemplate";

function convertObjectToQueryString(obj) {
    return Object.entries(obj)
        .filter(([_, value]) => value !== null)
        .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
        .join('&');
}

const Main = () => {


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

    return (
        <div className={"container-fluid"}>
            <div className={"row min-vh-100"}>
                {/*<div className={"col-2"}>*/}
                {/*     /!*style={{backgroundColor: 'lightgray'}}>*!/*/}
                {/*    /!*<SideBar/>*!/*/}
                {/*</div>*/}

                <div className={"col"}>
                    <TaskBoard/>
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
            </div>
        </div>
    );
};

export default Main;