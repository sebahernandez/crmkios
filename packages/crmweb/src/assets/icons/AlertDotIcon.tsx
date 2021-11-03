import React, { useState } from 'react';

export const AlertDotIcon = ({ $value }) => {

 

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='15'
      height='15'
      viewBox='0 0 56 56'
    >
      <g data-name='Group 2830' transform='translate(-1598 -32)'>
        <g
          data-name='Ellipse 73'
          transform='translate(1598 32)'
          fill='#ffffff'
          stroke='#ffffff'
          strokeWidth='2.1'
        >
         
          <circle cx='28' cy='28' r='28' fill='currentColor' /> 
          <text fontSize="xx-large" textAnchor="middle" x='28' y='38'>{$value}</text>
          
        </g>
  
      </g>
    </svg>
  );
};