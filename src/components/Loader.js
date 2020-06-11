import { FadeLoader } from 'react-spinners';
import React from 'react';
import { useTheme } from '@material-ui/core';

const sizeEnum = {
  lg: 'transform: scale(1)',
  md: 'transform: scale(0.5)',
  sm: 'transform: scale(0.2)',
};

const Loader = ({size, color}) => {
  const theme = useTheme();
  
  return(
    <FadeLoader css={sizeEnum[size]} color={color || theme.palette.primary.main} />
    )
};

export default Loader;