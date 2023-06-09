import React, {useCallback, useState} from 'react';
import {Button, Col, Container, Form, Row} from 'react-bootstrap';
import useInput from "../hooks/UseInput";
import {login} from "../api/AuthService";
import {useDispatch} from "react-redux";
import {setIsAuthAction} from "../store/UserReducer";

const Login = () => {

    const dispatch = useDispatch()
    const username = useInput("")
    const password = useInput("")
    const [error, setError] = useState("")

    const onSubmit = useCallback(async () => {
        const res = await login(username.value, password.value)
        if(res){
            dispatch(setIsAuthAction(true))
        }
        else{
            setError("Error...");
        }
    }, [dispatch, password.value, username.value])


    return (
        <Container className={"container-fluid"}>

            <Row className={"align-items-center justify-content-center min-vh-100"}>
                <Col className={"col-4"}>

                    <Row>
                    <Form className={"p-0"}>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Имя пользователя</Form.Label>
                                <Form.Control {...username} placeholder="Enter username"/>
                                <Form.Text className="text-muted">
                                </Form.Text>
                            </Form.Group>

                        <Form.Group className={"mt-2"} controlId="formBasicPassword">
                            <Form.Label>Пароль</Form.Label>
                            <Form.Control {...password} type="password" placeholder="Password"/>
                        </Form.Group>
                    </Form>
                    </Row>

                        <Row className={"justify-content-between"}>
                            <Col className={"col-3"}>
                                <h3>
                                    {error}
                                </h3>
                            </Col>
                            <Col className={"col-4"}>
                                <Button className={"mt-3"} variant="primary" onClick={onSubmit}>
                                    Войти
                                </Button>
                            </Col>
                        </Row>

                </Col>
            </Row>

        </Container>
    );
};

export default Login;