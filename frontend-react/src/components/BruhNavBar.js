import React, {useCallback} from 'react';
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {useNavigate} from "react-router-dom";
import {Button} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useDispatch, useSelector} from "react-redux";
import {setIsAuthAction} from "../store/UserReducer";
import NavBarButton from "../components/NavBarButton";
import LogoutIcon from "../icons/LogoutIcon";
import {EVENTS_ROUTE, TASKS_ROUTE} from "../api/ApiRoutes";
import {clearTokens} from "../api/AuthService";
import {LOGIN_PAGE_ROUTE} from "../navigation/Routes";

export const BruhNavBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector(state => state.user)


    const logOut = useCallback(() => {
        clearTokens()
        dispatch(setIsAuthAction(false))
        navigate(LOGIN_PAGE_ROUTE)
    }, [dispatch, navigate])

    return (
        <>
            {isAuth &&
                <Navbar className={"navbar navbar-expand-lg navbar-light bg-light"}>
                    <Container className={"container-fluid justify-content-end"}>
                        <Nav className="ml-auto" style={{color: 'white'}}>
                            <div className="d-flex justify-content-end">
                                <NavBarButton route={EVENTS_ROUTE} title={"События"}/>

                                <NavBarButton route={TASKS_ROUTE} title={"Задачи"}/>

                                <Button variant={"outline-danger"} onClick={logOut} className={"ml-2"}>
                                    <LogoutIcon size={20}/>
                                    Выйти
                                </Button>
                            </div>
                        </Nav>
                    </Container>
                </Navbar>
            }
        </>
    );
};
