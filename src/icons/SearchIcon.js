import React from 'react';

export const SearchIcon = ({color}) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16.6668 16.6667L12.5803 12.5802M12.5803 12.5802C13.5605 11.5999 14.1668 10.2458 14.1668 8.75001C14.1668 5.75847 11.7417 3.33334 8.75016 3.33334C5.75862 3.33334 3.3335 5.75847 3.3335 8.75001C3.3335 11.7416 5.75862 14.1667 8.75016 14.1667C10.2459 14.1667 11.6001 13.5604 12.5803 12.5802Z"
          stroke={color || "#FF5C01"}
          stroke-width="1.4"
          stroke-linecap="round"
          stroke-linejoin="round"/>
  </svg>
);
