import React from 'react';

export const RepostIcon = ({ reposted }) => (

    <svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip1)">
            <g clipPath="url(#clip2)">
                <path d="M18.3468 12.811C18.3468 13.9668 17.4116 14.9038 16.2582 14.9038H2.62278L5.37268 12.1483L4.38823 11.1618L0.449927 15.1082C0.178149 15.3807 0.178149 15.8222 0.449927 16.0947L4.38823 20.0411L5.37268 19.0546L2.62278 16.2991H16.2582C18.1797 16.2967 19.7368 14.7364 19.7391 12.811V10.0205H18.3468V12.811Z" fill={reposted ? '#FF5C01' : '#A2A2A2'} />
                <path d="M1.63798 7.23009C1.63798 6.07415 2.57296 5.13724 3.72653 5.13724H17.362L14.6121 7.89279L15.5965 8.87926L19.5348 4.93286C19.8066 4.66036 19.8066 4.2189 19.5348 3.94639L15.5965 0L14.6121 0.98647L17.362 3.74201H3.72653C1.80505 3.74423 0.247815 5.30466 0.245605 7.23009V10.0205H1.63798V7.23009Z" fill={reposted ? '#FF5C01' : '#A2A2A2'} />
            </g>
        </g>
        <defs>
            <clipPath id="clip1">
                <rect width="20" height="21" fill="none" />
            </clipPath>
            <clipPath id="clip2">
                <rect width="20" height="21" fill="none" />
            </clipPath>
        </defs>
    </svg>
);
