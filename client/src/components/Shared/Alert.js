import React from 'react'

export default function Alert({type, messages}) {
  console.log(messages)
  return (
    <div className='alert alert-danger'>
      {typeof messages === 'string' ? `${messages}` : <ul>{messages?.map(message => <li>{message}</li>)}</ul>}
    </div>
  )
}
