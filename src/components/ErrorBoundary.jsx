import React from "react";

const ErrorBoundary = ({ error }) => {
  return (
    <div>
      <h2>Error {error?.status || 500}</h2>
      <p>{error?.message || "Something went wrong!"}</p>
    </div>
  );
};

export default ErrorBoundary;