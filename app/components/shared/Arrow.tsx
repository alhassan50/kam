import React from 'react'

function Arrow({width}: {width: number}) {
  return (
    <svg 
        viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" 
        width={width}
    >
        <defs>
        <style>
            {`.cls-1{fill:none;stroke:#fff;stroke-linecap:round;stroke-linejoin:round;stroke-width:2px;}`}
        </style>
        </defs>
        <title>arrow-right</title>
        <g id="arrow-right">
        <line className="cls-1" x1="29.08" x2="3.08" y1="16" y2="16" />
        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="21" />
        <line className="cls-1" x1="29.08" x2="25.08" y1="16" y2="11" />
        </g>
    </svg>
  )
}

export default Arrow