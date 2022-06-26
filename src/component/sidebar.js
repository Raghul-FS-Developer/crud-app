import React from "react";
import "../sidebar.css";
import { AiOutlineUserAdd, AiFillCaretLeft } from "react-icons/ai";
import { FiUsers } from "react-icons/fi";

function SideBar() {
  return (
    <>
      <div className="head">
         <div className="sidebar">
         <u>Employee Portal</u>
        </div>

        <h3 className="algs">
          <AiOutlineUserAdd size={45} />
          <a href="/add" className="alls">
            <u>Add Employee</u>
          </a>
        </h3>

        <h3 className="alg">
          <FiUsers size={45} />
          <a href="/" className="alls">
            <u>All Employee</u>
          </a>
        </h3>
       
      </div>
    </>
  );
}

export default SideBar;
