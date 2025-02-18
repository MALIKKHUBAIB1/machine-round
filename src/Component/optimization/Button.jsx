import React, { memo } from "react";

const Button = memo(function Button({ handleSubmit }) {
  console.log("render button component");
  return <div onClick={handleSubmit}>Button</div>;
});

export default Button;
