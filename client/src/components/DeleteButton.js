import { useState } from "react";
import TrashModal from "./DeleteModal";
import { FaTrashAlt } from "react-icons/fa";
import { destroy } from "../api/computers";
import { useAuthContext } from "../context/AuthContext";

const DeleteButton = ({ computer, setData, setResults }) => {
    const [isModalOpened, setIsModalOpened] = useState(false)
    const {token} = useAuthContext()

    const deleteItem = async (id) => {
        destroy(id, token)
        .then(() => {
            setData(prevData => {
                const newData = [...prevData]
                newData.splice(id, 1)
                return newData
            })  

            setResults(prevResults => {
                return prevResults - 1
            })
        })
        .catch(err => console.log(err))

        setIsModalOpened(false)
    }

    return <>
        <button className="btn btn-sm" onClick={() => setIsModalOpened(true)}>
            <FaTrashAlt className="text-danger" />
        </button>
        <TrashModal
            show={isModalOpened}
            handleClose={() => setIsModalOpened(false)}
            handleConfirm={() => deleteItem(computer._id)}
        />
    </>;
};

export default DeleteButton;