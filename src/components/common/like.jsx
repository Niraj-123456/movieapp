import React from "react";

const Like = (props) => {
  let classes = "fas fa-heart";
  if (!props.liked) classes = "far fa-heart";
  return (
    <div>
      <i
        onClick={props.onLiked}
        style={{ cursor: "pointer" }}
        className={classes}
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default Like;
