
import React from "react";
import { HashLoader } from "react-spinners";

const Spinner = () => {
  return (
    <>
      <section
        style={{
          minHeight: "425px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          
        }}
      >
        <HashLoader size={150} />
      </section>
    </>
  );
};

export default Spinner;
