const InputField = ({ title, type = "text" }) => (
  <div className="input">
    <p>{title}</p>
    <input type={type} placeholder={title} />
  </div>
);

export default InputField;
