import React, { Component } from "react";

export const Preview = ({ meta }) => {
  const { name, percent, status, previewUrl } = meta;
  return (
    <div>
      <img
        width="100"
        height="100"
        src={previewUrl}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          objectFit: "cover",
          zIndex: 500
        }}
      />
      <div
        style={{
          position: "absolute",
          top: `-${percent}px`,
          left: 0,
          opacity: 0.5,
          zIndex: 600,
          backgroundColor: "gray",
          minHeight: "100px",
          minWidth: "100px"
        }}
      ></div>
      <div
        style={{
          position: "absolute",
          lineHeight: '100px',
          textAlign: 'center',
          top: 0,
          left: 0,
          backgroundColor: "transparent",
          zIndex: 700,
          color: 'white',
          minHeight: "100px",
          minWidth: "100px"
        }}
      >{`${Math.round(percent)}%`}</div>
    </div>
  );
};
export const Layout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles }
}) => {
  return (
    <div className="">
      <div {...dropzoneProps}>
        {previews}
        {files.length < maxFiles && input}
      </div>

      {/* {files.length > 0 && submitButton} */}
    </div>
  );
};
