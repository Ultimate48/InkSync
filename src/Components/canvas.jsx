import React, { useRef, useEffect } from 'react';
import { useState } from 'react';
import { useDrawingContext } from '../DrawingContext';

function Canvas() {
  const { color, lineWidth, drawing, setDrawing } = useDrawingContext();

  const canvasRef = useRef(null);
  const contextRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentPath, setCurrentPath] = useState([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 2;
    canvas.height = window.innerHeight * 2;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;

    const context = canvas.getContext('2d');
    context.scale(2, 2);
    context.lineCap = 'round';
    context.strokeStyle = color;
    context.lineWidth = lineWidth;
    contextRef.current = context;

    redrawCanvas();
  }, [color, lineWidth]);

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    setIsDrawing(true);
    setCurrentPath([{ x: offsetX, y: offsetY }]);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
    saveDrawing();
    setCurrentPath([]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setCurrentPath((prevPath) => [...prevPath, { x: offsetX, y: offsetY }]);
  };

  const saveDrawing = () => {
    const newPath = {
      color,
      width: lineWidth,
      points: currentPath
    };
    setDrawing([...drawing, newPath]);
  };

  const redrawCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');
    context.clearRect(0, 0, canvas.width, canvas.height);
  
    if (drawing && drawing.length > 0) {
      drawing.forEach((path) => {
        const { color, width, points } = path;
        context.beginPath();
        context.strokeStyle = color;
        context.lineWidth = width;
        points.forEach(({ x, y }, index) => {
          if (index === 0) {
            context.moveTo(x, y);
          } else {
            context.lineTo(x, y);
          }
        });
        context.stroke();
      });
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={finishDrawing}
      onMouseMove={draw}
    />
  );
}

export default Canvas;