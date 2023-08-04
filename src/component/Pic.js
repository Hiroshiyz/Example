import React from "react";

const pic = ({ data }) => {
  return (
    <div className="picture">
      <p> {data.photographer} </p>
      <div className="imageContainer">
        <img src={data.src.original} alt="picture" />
      </div>
      <p>
        下載圖片:
        <a target="_blank" href={data.src.original}>
          按一下
        </a>
      </p>
    </div>
  );
};

export default pic;
