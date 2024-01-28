import React from 'react'
import Table from 'react-bootstrap/Table';

export default function TableComponent({data}) {
    const {tHead, tBody} = data 

    return (
        <Table striped>
            <thead>
                <tr>{tHead?.map((th, i) => <th key={i}>{th}</th>)}</tr>
            </thead>
            <tbody>
                {tBody.map((body, i) => 
                    <tr key={i}>
                        {
                            body.map((td, i) => <td key={i}>{td}</td>)
                        }
                    </tr>
                )}
            </tbody>
        </Table>
    );
}
