import React from "react";

export const PenIcon = ({ size }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size === "lg" ? 36 : 20}
        height={size === "lg" ? 36 : 20}
        fill="none"
        viewBox="0 0 16 16"
    >
        <path
            stroke="#A2A2A2"
            d="M2.667 11.333v2h2l6-6-2-2-6 6zM10 4l2 2 1.667-1.667-2-2L10 4z"
        ></path>
    </svg>
);
