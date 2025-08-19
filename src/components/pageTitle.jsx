import React from "react";

function pageTitle({ title }) {
  return (
    <span className="flex items-center my-10">
      <span className="h-px flex-1 bg-gradient-to-r from-transparent to-gray-300"></span>

      <h1 className="shrink-0 px-4 text-gray-900 text-4xl font-bold text-gray-900 sm:text-5xl">{title}</h1>

      <span className="h-px flex-1 bg-gradient-to-l from-transparent to-gray-300"></span>
    </span>
  );
}

export default pageTitle;
