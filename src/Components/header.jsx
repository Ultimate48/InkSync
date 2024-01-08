import React from 'react'
import { useState } from 'react';
import { useDrawingContext } from '../DrawingContext';

export default function header() {

    const { color, setColor, lineWidth, setLineWidth } = useDrawingContext();

  return (
    <div className='absolute left-1/2 transform -translate-x-1/2 top-3'>
        <div className='h-10 w-96 bg-[#3a3a3a] rounded-lg flex justify-center items-center gap-10'>
        <input className='rounded w-9'
          type='color'
          onChange={(e) => setColor(e.target.value)}
        />
        <select className='rounded w-9'
          onChange={(event) => setLineWidth(event.target.value)}
          value={lineWidth}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='4'>4</option>
          <option value='8'>8</option>
          <option value='12'>12</option>
        </select>
        </div>
    </div>
  )
}
