import {useNavigate} from "react-router-dom";
import React, {useCallback} from "react";
import {Button} from "react-bootstrap";

const NavBarButton = ({route, title, variant, other}) => {
    const navigate = useNavigate();
    const cb = useCallback(() => navigate(route), [route, navigate])
    const otherProps = other?? {}
    return (
        <Button variant={variant === undefined ? "outline-secondary" : variant} onClick={cb} {...otherProps}>
            {title}
        </Button>
    )
}

export default NavBarButton;