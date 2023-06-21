import React from "react";

const SideBar = ({ sidebar, _sidebar }) => {
  return (
    <div className={`sidebar ${sidebar && "active"}`}>
      <h1>SideBar</h1>
    </div>
  );
};

export default SideBar;
