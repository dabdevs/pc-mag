import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownList({ btnName, listItems, dividerItems }) {
    return (
        <Dropdown>
            <Dropdown.Toggle variant="default">
                {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                <Dropdown.Item href={'/test'}>Test link</Dropdown.Item>
                {listItems && listItems?.map((item, key) => <Dropdown.Item key={key} href={item.link}>{item.name}</Dropdown.Item>)}

                {dividerItems && <Dropdown.Divider />}
                {dividerItems && dividerItems.map((item, key) => <Dropdown.Item key={key} href={item.link}>{item.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

