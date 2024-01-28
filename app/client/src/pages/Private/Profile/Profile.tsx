import { useState } from "react"
import Modal from "./Modal"

function Profile() {

  const [show, setShow] = useState(false)

  return (
    <>
      <Modal
        isOpen={show}
        closeModal={() => setShow(false)}
      >
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-2xl font-bold">Modal</h1>
          <p className="text-gray-400">This is a modal</p>
        </div>
      </Modal>
      <button
        className="text-white bg-red-500 hover:bg-red-600 py-2 px-4 rounded"
        onClick={() => setShow(true)}
      >
        Open Modal
      </button>
    </>
  )
}
export default Profile