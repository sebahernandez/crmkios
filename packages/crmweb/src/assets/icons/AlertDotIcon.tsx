import React, { useState } from 'react';

export const AlertDotIcon = ({ $value }) => {

 

  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      width='18'
      height='18'
      viewBox='0 0 50 50'
    >
      <g data-name='Group 2830' transform='translate(-1598 -32)'>
        <g
          data-name='Ellipse 73'
          transform='translate(1598 32)'
          fill='#F99157'
          stroke='#ffffff'
          strokeWidth='2.9'
        >
         
          <circle cx='30' cy='20' r='20' fill='currentColor' /> 
          <text textAnchor="middle" x='28' y='25'>{$value}</text>
          
        </g>
  
      </g>
    </svg>
  );
};