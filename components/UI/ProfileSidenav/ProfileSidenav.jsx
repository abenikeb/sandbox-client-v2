import Backdrop from "../Backdrop/Backdrop";
import "./ProfileSidenav.css";
import Image from "next/image";

const ProfileSidenav = (props) => {
  // shouldComponentUpdate(nextProps, nextState) {
  //   return (
  //     nextProps.show !== this.props.show ||
  //     nextProps.children !== this.props.children
  //   );
  // }

  let attachedClasses = ["ProfileSidenav-Modal", "ProfileSidenav-Modal-Close"];
    if (props.show) {
      attachedClasses = ["ProfileSidenav-Modal", "ProfileSidenav-Modal-Open"];
  }

  return (
    <div>
        <Backdrop show={props.show} clicked={props.closeModal} />
        <div className={attachedClasses.join(" ")}>
          <div className="ProfileSidenav-modal-header">
            <div className="bg-lime-500 w-full h-full pt-5 pl-5">
              <Image
                src="/assets/icons/mobile-user.svg"
                width={100}
                height={100}
                alt="users"
              />
            </div>
            <span onClick={props.closeModal}>
              x
            </span>
          </div>
          <div className="ProfileSidenav-modal-body">{props.children}</div>
          <div className="ProfileSidenav-modal-footer"></div>
        </div>
    </div>
  )
}

export default ProfileSidenav
