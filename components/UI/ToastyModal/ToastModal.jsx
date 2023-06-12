import Backdrop from "../Backdrop/Backdrop";
import "./ToastModal.css";

const Modal = (props) => {
  let attachedClasses = ["Toast-Modal", "Toast-Modal-Close"];
  if (props.show) {
      attachedClasses = ["Toast-Modal", "Toast-Modal-Open"];
  }

  return (
    <div>
        {/* <Backdrop show={props.show} /> */}
        <div className={attachedClasses.join(" ")}>
        <div className={props?.status === "success" ?  "Toast-modal-header rounded-t-xl opacity-80 bg-lime-400 text-white" : "modal-body rounded-t-xl opacity-80 bg-red-400 text-white"}>
            <span className="cursor-pointer pl-2 pt-2" onClick={props.closeModal}>
              X
            </span>
          </div>
         <div className={props?.status === "success" ? "Toast-modal-body rounded-b-xl opacity-80 bg-lime-400 text-white pb-5" : "modal-body rounded-b-xl opacity-80 bg-red-400 text-white pb-5" }>{props.children}</div>
        </div>
    </div>
  )
}

export default Modal
