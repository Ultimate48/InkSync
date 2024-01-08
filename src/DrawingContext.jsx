import React, { createContext, useState } from 'react';

const DrawingContext = createContext();

export const DrawingProvider = ({ children }) => {

    const [color, setColor] = useState('#000');
    const [lineWidth, setLineWidth] = useState(4);
    const [drawing, setDrawing] = useState([]);

  const contextValue = {
    color,
    setColor,
    lineWidth,
    setLineWidth,
    drawing,
    setDrawing
  };

  return (
    <DrawingContext.Provider value={contextValue}>
      {children}
    </DrawingContext.Provider>
  );
};

export const useDrawingContext = () => {
  return React.useContext(DrawingContext);
};