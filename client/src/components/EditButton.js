import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const EditButton = ({ computer, setSelectedComputer }) => {
    console.log('Editing',computer)
    // const [isModalOpened, setIsModalOpened] = useState(false);

    // const editItem = async (id) => {
    //     console.log('Editing Item', id)
    //     // await axios.post(`Testing/api/resources?_id=${id}`);

    //     setIsModalOpened(false);
    // };

    return (
        <button className="btn btn-sm" onClick={() => setSelectedComputer(computer)}>
            <FaPencilAlt className="text-success" />
        </button>
    )
};

export default EditButton;