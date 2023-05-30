import React, {useCallback} from 'react';
import {Button, Row} from "react-bootstrap";
import LogoutIcon from "./icons/LogoutIcon";
import NavBarButton from "./NavBarButton";
import {EVENTS_ROUTE, TASKS_ROUTE} from "../api/ApiRoutes";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {clearTokens} from "../api/AuthService";
import {setIsAuthAction} from "../store/UserReducer";
import {LOGIN_PAGE_ROUTE} from "../navigation/Routes";

const SideBar = ({child}) => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOut = useCallback(() => {
        clearTokens()
        dispatch(setIsAuthAction(false))
        navigate(LOGIN_PAGE_ROUTE)
    }, [dispatch, navigate])

    return (
        <div className={"container-fluid h-100"}>

            <Row style={{height: "70%"}}>
                {child}
            </Row>

            <Row style={{height: "30%"}}>
                <div className={"container"}>
                    <div className={"row"} style={{maxWidth: 300, marginTop: 50}}>
                        <NavBarButton variant={"dark"} route={EVENTS_ROUTE} title={"События"}
                                      other={{style: {color: "white"}, disabled: true}}/>
                    </div>

                    <div className={"row"} style={{maxWidth: 300, marginTop: 10}}>
                        <NavBarButton variant={"dark"} route={TASKS_ROUTE} title={"Задачи"}
                                      other={{style: {color: "white"}}}/>
                    </div>

                    <div className={"row"} style={{maxWidth: 300, marginTop: 50}}>
                        <Button variant={"danger"} style={{color: "white"}} className={"ml-2"} onClick={logOut}>
                            <LogoutIcon size={20}/>Выйти
                        </Button>
                    </div>
                </div>
            </Row>
        </div>
    );
};

export default SideBar;