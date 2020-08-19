import React from "react";

export const RepostIcon = ({ reposted }) => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="21"
        fill="none"
        viewBox="0 0 20 21"
    >
        <g fill="#A2A2A2">
            <path
                d="M18.347 12.811a2.09 2.09 0 01-2.089 2.093H2.623l2.75-2.756-.985-.986L.45 15.108a.699.699 0 000 .987l3.938 3.946.985-.986-2.75-2.756h13.635a3.489 3.489 0 003.481-3.488v-2.79h-1.392v2.79zM1.638 7.23a2.09 2.09 0 012.089-2.093h13.635l-2.75 2.756.985.986 3.938-3.946a.699.699 0 000-.987L15.597 0l-.985.986 2.75 2.756H3.727A3.489 3.489 0 00.246 7.23v2.79h1.392V7.23z"
                fill={reposted ? "#FF5C01" : "#A2A2A2"}
            />
        </g>
        <defs>
            <clipPath id="clip1">
                <path d="M0 0H20V21H0z" />
            </clipPath>
            <clipPath id="clip2">
                <path d="M0 0H20V21H0z" />
            </clipPath>
        </defs>
    </svg>
);
