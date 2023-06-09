import React, {useCallback, useEffect, useState} from 'react';
import {Col, Container, Row, Spinner} from "react-bootstrap";

const MIN_DOT = 1
const MAX_DOT = 3
const INTERVAL = 500

const Loading = ({loadingText, fullPage}) => {
    const [cntOfDots, setCntOfDots] = useState(MIN_DOT)

    const cb = useCallback(() => {
        let counter = 0;
        return () => {
            counter = (counter+1) % MAX_DOT
            return counter
        }
    }, [])

    useEffect(
        () => {
            const counter = cb()
            const clear = setInterval(() => setCntOfDots(counter()), INTERVAL)
            return () => {
                clearInterval(clear)
            }
        },
        [cb, setCntOfDots])

    return (
        <Container className={"container-fluid mt-2"}>
            <Row className={fullPage? "align-items-center justify-content-center min-vh-100" : ""}>
                <Col className={"col-12 d-flex justify-content-center"}>
                    <Spinner animation={"border"} style={{color: "white"}}/>
                    <h3 className={"ms-2"} style={{color: "white"}}>{(loadingText ?? "Loading")}</h3>
                    <div style={{width: "50px"}}>
                        <h3 className={""}>{".".repeat(MIN_DOT + cntOfDots)}</h3>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Loading;