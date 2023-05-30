import {Button} from "react-bootstrap";
import PlusIcon from "./icons/PlusIcon";
import React from "react";

const NewTaskCard = ({onClick}) => {
    return (
        <div className="col-4 mt-4">
            <div style={{height: 180}}>
                <div className="container h-100">
                    <div className="row align-items-center h-100">
                        <div className="col-6 mx-auto">
                            <div className="h-100 justify-content-center">
                                <div>
                                    <Button variant={"outline-dark"} onClick={onClick}>
                                        <PlusIcon size={28}/>
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default NewTaskCard;