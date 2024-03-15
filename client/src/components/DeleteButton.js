import { useState } from "react";
import TrashModal from "./DeleteModal";
import { FaTrashAlt } from "react-icons/fa";

const DeleteButton = ({ id }) => {
    console.log('trashbutton',id)
    const [isModalOpened, setIsModalOpened] = useState(false);

    const deleteItem = async () => {
        console.log('Deleting Item')
        // await axios.delete(`Testing/api/resources?_id=${id}`);

        setIsModalOpened(false);
    };

    return <>
        <button className="btn btn-sm" onClick={() => setIsModalOpened(true)}>
            <FaTrashAlt className="text-danger" />
        </button>
        <TrashModal
            show={isModalOpened}
            handleClose={() => setIsModalOpened(false)}
            handleConfirm={() => deleteItem()}
        />
    </>;
};

export default DeleteButton;