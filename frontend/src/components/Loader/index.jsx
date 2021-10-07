import React from "react";
import './styles.css'
import { Spinner } from "react-bootstrap";

const Loader = () => {
  return (
    <Spinner animation="grow">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
