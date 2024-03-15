import { useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

const EditButton = ({ id }) => {
    const [isModalOpened, setIsModalOpened] = useState(false);

    const editItem = async (id) => {
        console.log('Editing Item', id)
        // await axios.post(`Testing/api/resources?_id=${id}`);

        setIsModalOpened(false);
    };

    return <>
        <button className="btn btn-sm" onClick={() => editItem(id)}>
            <FaPencilAlt className="text-success" />
        </button>
    </>;
};

export default EditButton;