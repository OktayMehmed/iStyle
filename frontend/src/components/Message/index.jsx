import React from "react";
import './styles.css'
import { Alert } from "react-bootstrap";

const Message = ({ variant, children }) => {
  return <Alert id='message' variant={variant}>{children}</Alert>;
};

Message.defaultProps = {
  variant: "info",
};

export default Message;
