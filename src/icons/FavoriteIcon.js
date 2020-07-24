import React from 'react';

export const FavoriteIcon = ({ type }) => {
    const color = type === 'primary' && '#FF5C01';
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill={color || 'none'} xmlns="http://www.w3.org/2000/svg">
            <path d="M9.9996 17.5451C-6.66672 8.33333 4.99993 -1.66666 9.9996 4.65671C14.9999 -1.66667 26.6666 8.33333 9.9996 17.5451Z" stroke={color || '#A2A2A2'} strokeWidth="1.8" />
        </svg>
    );
};
