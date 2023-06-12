import "./Button.css";

const Button = (props) => {
  return (
    <div>
      <button className={props.btn_class} onClick={props?.onBtnAction}>{props.label}</button>
    </div>
  );
};

export default Button;
