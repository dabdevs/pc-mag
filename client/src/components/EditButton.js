import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const EditButton = ({ computer, setSelectedComputer }) => {
    return (
        <button className="btn btn-sm" onClick={() => setSelectedComputer(computer)}>
            <FaPencilAlt className="text-success" />
        </button>
    )
}

export default EditButton;