import React from 'react'

export default function Notification({ message, type, onClose }) {
  return (
    <>
       <div className={`notification ${type}`}>
      <span>{message}</span>
      <button onClick={onClose}>Close</button>
    </div>
    </>
  )
}
