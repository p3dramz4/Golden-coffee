import { IoClose } from "react-icons/io5";

const Modal = ({ hideModal, title, children }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div
        onClick={hideModal}
        className="fixed inset-0 bg-black bg-opacity-40"></div>
      <div className="bg-white w-[600px] rounded-lg p-4 relative z-50 shadow-lg">
        <div className="flex justify-between items-center border-b pb-2">
          <span className="text-lg font-semibold">{title}</span>
          <IoClose className="cursor-pointer text-xl" onClick={hideModal} />
        </div>
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
