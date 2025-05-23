import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface SimpleTextEditorProps {
  onClose: () => void;
  onSave: (text: string, position: { x: number, y: number }) => void;
  initialPosition?: { x: number, y: number };
}

const SimpleTextEditor: React.FC<SimpleTextEditorProps> = ({ 
  onClose, 
  onSave,
  initialPosition = { x: 150, y: 150 } 
}) => {
  const [text, setText] = useState('');
  const [position, setPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const editorRef = useRef<HTMLDivElement>(null);

  const handleChange = (value: string) => {
    setText(value);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement && e.target.className.includes('editor-handle')) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging) {
      setPosition({
        x: e.clientX - dragOffset.x,
        y: e.clientY - dragOffset.y
      });
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
    } else {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  // Update position when visibility changes
  useEffect(() => {
    if (editorRef.current) {
      // Ensure the editor is visible within the viewport
      const rect = editorRef.current.getBoundingClientRect();
      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight;
      
      let newX = position.x;
      let newY = position.y;
      
      // Adjust if too far right
      if (rect.right > viewportWidth) {
        newX = Math.max(10, viewportWidth - rect.width - 20);
      }
      
      // Adjust if too far down
      if (rect.bottom > viewportHeight) {
        newY = Math.max(10, viewportHeight - rect.height - 20);
      }
      
      if (newX !== position.x || newY !== position.y) {
        setPosition({ x: newX, y: newY });
      }
    }
  }, []);

  const modules = {
    toolbar: [
      [{ 'font': [] }],
      [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
      [{ 'size': ['small', false, 'large', 'huge'] }],
      ['bold', 'italic', 'underline', 'strike'],
      [{ 'color': [] }, { 'background': [] }],
      [{ 'align': [] }],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['clean']
    ]
  };

  return (
    <div 
      ref={editorRef}
      className="absolute z-50 bg-white rounded-lg shadow-lg"
      style={{ 
        top: `${position.y}px`, 
        left: `${position.x}px`,
        width: '350px',
        maxHeight: '400px',
        overflow: 'hidden'
      }}
    >
      <div 
        className="editor-handle bg-[#00B2C7] text-white p-2 rounded-t-lg cursor-move flex justify-between items-center"
        onMouseDown={handleMouseDown}
      >
        <span className="text-sm font-medium">Text Editor</span>
        <button 
          className="text-white hover:text-gray-200 w-5 h-5 flex items-center justify-center"
          onClick={onClose}
        >
          ✕
        </button>
      </div>
      <ReactQuill 
        theme="snow" 
        value={text} 
        onChange={handleChange}
        modules={modules}
        placeholder="Type your text here..."
        className="bg-white border-none"
      />
      <div className="p-2 bg-gray-50 border-t flex justify-end">
        <button 
          className="px-3 py-1 bg-[#00B2C7] text-white rounded hover:opacity-90 text-sm font-medium"
          onClick={() => {
            if (text.trim()) {
              onSave(text, position);
            }
            onClose();
          }}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SimpleTextEditor;
