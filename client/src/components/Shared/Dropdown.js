import React from 'react'
import Dropdown from 'react-bootstrap/Dropdown';

export default function DropdownList({ btnName, linkList, dividerItems }) {
    console.log(linkList)
    return (
        <Dropdown>
            <Dropdown.Toggle variant="default">
                {btnName}
            </Dropdown.Toggle>

            <Dropdown.Menu>
                {linkList && linkList?.map((item, key) => <Dropdown.Item className='bg-white' key={key} href={item.href}>{item.href} {item.name}</Dropdown.Item>)}

                {dividerItems && <Dropdown.Divider />}
                
                {dividerItems && dividerItems.map((item, key) => <Dropdown.Item className='bg-white' key={key} href={item.href}>{item.name}</Dropdown.Item>)}
            </Dropdown.Menu>
        </Dropdown>
    );
}

