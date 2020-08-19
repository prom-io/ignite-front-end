import React from 'react';

export const ListIcon = ({color}) => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3.8" y="0.8" width="15.4" height="3.4" rx="1.2" stroke={color || "#FF5C01"} stroke-width="1.6"/>
    <rect x="3.8" y="7.8" width="10.4" height="3.4" rx="1.2" stroke={color || "#FF5C01"} stroke-width="1.6"/>
    <rect x="3.8" y="14.8" width="6.4" height="3.4" rx="1.2" stroke={color || "#FF5C01"} stroke-width="1.6"/>
    <rect width="1.6" height="20" rx="0.8" fill={color || "#FF5C01"}/>
  </svg>
);
