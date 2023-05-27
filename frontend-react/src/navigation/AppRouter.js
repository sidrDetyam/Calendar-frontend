import React from 'react';
import {Navigate, Route, Routes} from 'react-router-dom'
import {useSelector} from "react-redux";
import {HOME_PAGE_ROUTE, LOGIN_PAGE_ROUTE} from "./Routes";
import Main from "../pages/Main";
import Login from "../pages/Login";

const AppRouter = () => {
    const isAuth = useSelector(state => state.user.isAuth)

    return (
        <Routes>
            {isAuth &&
                <>
                    <Route path={HOME_PAGE_ROUTE} element={<Main/>}/>
                </>
            }

            {!isAuth &&
                <>
                    <Route path={LOGIN_PAGE_ROUTE} element={<Login/>}/>
                </>
            }

            <Route path={"/*"} element={<Navigate to={isAuth? HOME_PAGE_ROUTE : LOGIN_PAGE_ROUTE}/>} />
        </Routes>
    );
};

export default AppRouter;