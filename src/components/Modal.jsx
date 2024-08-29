import React from 'react'

function Modal({ModalContent}) {
  return (
    <div className='flex justify-center items-center fixed top-0 left-0 w-screen h-screen bg-black/10 backdrop-blur-sm animate-fade'>
        <div className='animate-jump-in'>
            {ModalContent}
        </div>
    </div>
  )
}

export default Modal