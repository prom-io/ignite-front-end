import React from 'react';

export const ChatIcon = ({ color }) => (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M18.283 8.70724C18.1687 9.60019 17.8629 10.4465 17.3997 11.2182C17.422 11.3668 17.4334 11.5165 17.4334 11.6667C17.4334 12.2807 17.2556 12.8691 16.9248 13.4049C16.7564 13.6777 16.7098 13.9894 16.6909 14.1926C16.6694 14.4246 16.6724 14.6758 16.686 14.9154C16.7019 15.1963 16.7342 15.4931 16.7725 15.7755C16.4457 15.6818 16.0952 15.5892 15.7632 15.5172C15.4981 15.4597 15.226 15.411 14.9773 15.3879C14.7607 15.3677 14.4405 15.353 14.1468 15.448C13.5143 15.6525 12.8178 15.7667 12.0834 15.7667C11.2678 15.7667 10.5162 15.632 9.85001 15.3962C9.62441 15.4098 9.39653 15.4167 9.16668 15.4167C8.12014 15.4167 7.11456 15.2732 6.17773 15.0089C7.49988 16.5899 9.72184 17.5667 12.0834 17.5667C12.989 17.5667 13.8586 17.4282 14.6607 17.1734C14.6769 17.1731 14.7235 17.1721 14.8106 17.1802C14.9584 17.1939 15.1523 17.2265 15.3815 17.2762C15.8377 17.3752 16.3596 17.5256 16.7934 17.6607C17.8183 17.98 18.8099 17.088 18.6349 16.0487C18.568 15.6516 18.5049 15.1983 18.4831 14.8138C18.4722 14.6204 18.4732 14.4674 18.4832 14.3589C18.486 14.3293 18.489 14.3078 18.4914 14.293C18.9622 13.5093 19.2334 12.6169 19.2334 11.6667C19.2334 10.5636 18.883 9.56067 18.283 8.70724Z"
            fill={color || '#1C1C1C'}
        />
        <path
            d="M16.25 7.91667C16.25 10.9082 13.0786 13.3333 9.16662 13.3333C8.12686 13.3333 7.13943 13.162 6.24995 12.8543C5.70789 12.6667 3.91496 13.2856 2.73884 13.7365C2.32991 13.8932 1.90538 13.4907 2.04003 13.074C2.39422 11.9778 2.84251 10.3967 2.62616 10C2.27642 9.35867 2.08329 8.65492 2.08329 7.91667C2.08329 4.92512 5.2546 2.5 9.16662 2.5C13.0786 2.5 16.25 4.92512 16.25 7.91667Z"
            stroke={color || '#1C1C1C'}
            strokeWidth="1.8"
        />
    </svg>
);
