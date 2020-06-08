import React from 'react';

export const IgniteTrendPage = ({ color }) => (
    <svg width="56" height="56" viewBox="0 0 56 56" fill="none" xmlns="http://www.w3.org/2000/svg">
        <mask id="path-2-inside-1" fill="white">
            <rect x="4.3335" y="33.6001" width="5.6" height="16.8" rx="1" />
        </mask>
        <rect x="4.3335" y="33.6001" width="5.6" height="16.8" rx="1" fill={color || '#FF5C01'} stroke={color || '#FF5C01'} strokeWidth="4.8" mask="url(#path-2-inside-1)" />
        <mask id="path-3-inside-2" fill="white">
            <rect x="18.3335" y="22.3999" width="5.59999" height="28" rx="1" />
        </mask>
        <rect x="18.3335" y="22.3999" width="5.59999" height="28" rx="1" fill={color || '#FF5C01'} stroke={color || '#FF5C01'} strokeWidth="4.8" mask="url(#path-3-inside-2)" />
        <mask id="path-4-inside-3" fill="white">
            <rect x="32.3335" y="16.8" width="5.6" height="33.6" rx="1" />
        </mask>
        <rect x="32.3335" y="16.8" width="5.6" height="33.6" rx="1" fill={color || '#FF5C01'} stroke={color || '#FF5C01'} strokeWidth="4.8" mask="url(#path-4-inside-3)" />
        <mask id="path-5-inside-4" fill="white">
            <rect x="46.3335" y="5.6001" width="5.6" height="44.8" rx="1" />
        </mask>
        <rect x="46.3335" y="5.6001" width="5.6" height="44.8" rx="1" fill={color || '#FF5C01'} stroke={color || '#FF5C01'} strokeWidth="4.8" mask="url(#path-5-inside-4)" />
    </svg>
);
