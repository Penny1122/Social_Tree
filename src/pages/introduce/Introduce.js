import React from "react";
import report1 from "../../images/report1.svg";
import report2 from "../../images/report2.svg";
import report3 from "../../images/report3.svg";
import "./Introduce.css";

const Introduce = () => {
  return (
    <div className="introduce">
      <img src={report1} alt={report1} />
      <img src={report2} alt={report2} />
      <img src={report3} alt={report3} />
    </div>
  );
};

export default Introduce;
