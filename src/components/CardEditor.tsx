import React, { useState, useRef, useEffect } from 'react';

interface TextItem {
  id: string;
  content: string;
  position: { x: number; y: number };
  size?: { width: number; height: number };
  imageIndex: number;
}

interface CardEditorProps {
  backgroundImages: string[];
}

const CardEditor = React.forwardRef<{ toggleTextEditor: () => void }, CardEditorProps>((props, ref) => {
  const { backgroundImages } = props;
  const [currentBgIndex, setCurrentBgIndex] = useState(0);
  const [showTextEditor, setShowTextEditor] = useState(false);
  const [textContent, setTextContent] = useState('');
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [textPerImage, setTextPerImage] = useState<{[key: number]: TextItem}>({});
  const [editorPosition, setEditorPosition] = useState({ x: 150, y: 150 });
  const [editingTextId, setEditingTextId] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const [isResizing, setIsResizing] = useState(false);
  const [textBoxSize, setTextBoxSize] = useState({ width: 150, height: 80 });
  const [resizeStart, setResizeStart] = useState({ x: 0, y: 0 });
  
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle next/previous background image
  const handleNextImage = () => {
    setCurrentBgIndex((prev) => (prev + 1) % backgroundImages.length);
  };

  const handlePrevImage = () => {
    setCurrentBgIndex((prev) => (prev - 1 + backgroundImages.length) % backgroundImages.length);
  };

  // Handle text editor visibility
  const toggleTextEditor = () => {
    if (!showTextEditor) {
      // Check if there's already a text for this image
      const existingText = textPerImage[currentBgIndex];
      
      if (!existingText) {
        // Position in top-left with margins
        if (containerRef.current) {
          const rect = containerRef.current.getBoundingClientRect();
          // Set position with 20px margins on all sides
          setEditorPosition({
            x: 20,
            y: 20
          });
          // Set size to cover almost the entire image area with 40px margins (20px on each side)
          setTextBoxSize({
            width: rect.width - 40,
            height: rect.height - 40
          });
        }
        setShowTextEditor(true);
        setEditingTextId(null);
        setTextContent('');
      } else {
        // If a text box already exists for this image, edit it
        setEditingTextId(existingText.id);
        setTextContent(existingText.content);
        setEditorPosition(existingText.position);
        setTextBoxSize(existingText.size || { width: 150, height: 80 });
        setShowTextEditor(true);
      }
    } else {
      setShowTextEditor(false);
    }
  };
  
  // Expose methods via ref
  React.useImperativeHandle(ref, () => ({
    toggleTextEditor
  }));

  // Handle clicking on the background image
  const handleBackgroundClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      // If text editor is not visible, show it covering most of the image
      if (!showTextEditor && !textPerImage[currentBgIndex]) {
        const rect = e.currentTarget.getBoundingClientRect();
        // Set position with 20px margins on all sides
        setEditorPosition({
          x: 20,
          y: 20
        });
        // Set size to cover almost the entire image area with 40px margins (20px on each side)
        setTextBoxSize({
          width: rect.width - 40,
          height: rect.height - 40
        });
        setShowTextEditor(true);
        setEditingTextId(null);
        setTextContent('');
      } else if (!showTextEditor && textPerImage[currentBgIndex]) {
        // If there's already text for this image, edit it
        const existingText = textPerImage[currentBgIndex];
        setEditingTextId(existingText.id);
        setTextContent(existingText.content);
        setEditorPosition(existingText.position);
        setTextBoxSize(existingText.size || { width: 150, height: 80 });
        setShowTextEditor(true);
      }
    }
  };

  // Handle clicking on existing text
  const handleTextClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const item = textItems.find(item => item.id === id);
    if (item) {
      setEditingTextId(id);
      setTextContent(item.content);
      setEditorPosition(item.position);
      setTextBoxSize(item.size || { width: 150, height: 80 });
      setShowTextEditor(true);
    }
  };

  // Handle saving text
  const handleSaveText = () => {
    if (textContent && textContent.trim()) {
      if (editingTextId) {
        // Update existing text
        const updatedItem = {
          id: editingTextId,
          content: textContent,
          position: editorPosition,
          size: textBoxSize,
          imageIndex: currentBgIndex
        };
        
        // Update in textItems array
        setTextItems(prevItems => 
          prevItems.map(item => 
            item.id === editingTextId ? updatedItem : item
          )
        );
        
        // Update in textPerImage map
        setTextPerImage(prev => ({
          ...prev,
          [currentBgIndex]: updatedItem
        }));
      } else {
        // Add new text
        const newId = `text-${Date.now()}`;
        const newItem = {
          id: newId,
          content: textContent,
          position: editorPosition,
          size: textBoxSize,
          imageIndex: currentBgIndex
        };
        
        // Add to textItems array
        setTextItems(prev => [...prev, newItem]);
        
        // Add to textPerImage map
        setTextPerImage(prev => ({
          ...prev,
          [currentBgIndex]: newItem
        }));
      }
    }
    // Hide the editor when saving
    setShowTextEditor(false);
  };

  // Handle dragging the text editor
  const handleEditorMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      setIsDragging(true);
      setDragOffset({
        x: e.clientX - editorPosition.x,
        y: e.clientY - editorPosition.y
      });
      e.preventDefault();
    }
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const newX = e.clientX - dragOffset.x - rect.left;
      const newY = e.clientY - dragOffset.y - rect.top;
      
      setEditorPosition({
        x: Math.max(0, Math.min(rect.width - textBoxSize.width, newX)),
        y: Math.max(0, Math.min(rect.height - textBoxSize.height, newY))
      });
      e.preventDefault();
    } else if (isResizing && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const width = Math.max(100, e.clientX - resizeStart.x);
      const height = Math.max(50, e.clientY - resizeStart.y);
      
      setTextBoxSize({
        width: Math.min(width, rect.width - editorPosition.x - 20),
        height: Math.min(height, rect.height - editorPosition.y - 20)
      });
      e.preventDefault();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsResizing(false);
  };

  // Set up mouse event listeners for dragging and resizing
  useEffect(() => {
    if (isDragging || isResizing) {
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
  }, [isDragging, isResizing, dragOffset, resizeStart]);



  // Function to calculate appropriate sizes based on container dimensions
  const getResponsiveSizes = () => {
    if (!containerRef.current) return;
    
    const containerWidth = containerRef.current.clientWidth;
    const containerHeight = containerRef.current.clientHeight;
    
    // Adjust text box size based on container dimensions
    if (containerWidth < 300) {
      setTextBoxSize(prev => ({
        width: Math.max(containerWidth - 40, 100),
        height: Math.max(containerHeight / 3, 50)
      }));
    }
  };
  
  // Update sizes when container dimensions change
  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      getResponsiveSizes();
    });
    
    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }
    
    return () => {
      if (containerRef.current) {
        resizeObserver.unobserve(containerRef.current);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full rounded-2xl overflow-hidden" ref={containerRef}>
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${backgroundImages[currentBgIndex]})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        onClick={handleBackgroundClick}
      >
        {/* Text Items - Only show for current background */}
        {textPerImage[currentBgIndex] && (
          <div
            key={textPerImage[currentBgIndex].id}
            className="absolute cursor-pointer border-2 border-transparent hover:border-[#00B2C7] hover:border-dashed"
            style={{
              top: `${textPerImage[currentBgIndex].position.y}px`,
              left: `${textPerImage[currentBgIndex].position.x}px`,
              width: `${textPerImage[currentBgIndex].size?.width || 150}px`,
              height: `${textPerImage[currentBgIndex].size?.height || 80}px`,
              zIndex: 10,
              padding: '20px',
              display: 'block',
              backgroundColor: 'rgba(255, 255, 255, 0.1)'
            }}
            onClick={(e) => handleTextClick(textPerImage[currentBgIndex].id, e)}
          >
            <div 
              className="w-full h-full overflow-hidden whitespace-pre-wrap"
              style={{ 
                fontSize: '24px',
                lineHeight: '1.5',
                width: '100%',
                height: '100%',
                textAlign: 'left'
              }}
            >
              {textPerImage[currentBgIndex].content}
            </div>
          </div>
        )}
      </div>



      {/* Navigation Controls - Responsive sizing */}
      <div className="absolute top-1/2 left-2 sm:left-4 transform -translate-y-1/2 z-20">
        <button 
          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white bg-opacity-70 rounded-full hover:bg-opacity-90 shadow-sm"
          onClick={handlePrevImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>
      </div>
      <div className="absolute top-1/2 right-2 sm:right-4 transform -translate-y-1/2 z-20">
        <button 
          className="w-5 h-5 sm:w-6 sm:h-6 flex items-center justify-center bg-white bg-opacity-70 rounded-full hover:bg-opacity-90 shadow-sm"
          onClick={handleNextImage}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>
      </div>

      {/* Image Thumbnails - Responsive sizing */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-2 z-20">
        {backgroundImages.map((image, index) => (
          <button
            key={index}
            className={`w-4 h-4 sm:w-6 sm:h-6 rounded-full border ${currentBgIndex === index ? 'border-[#00B2C7] border-2' : 'border-white'} shadow-sm`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => setCurrentBgIndex(index)}
          />
        ))}
      </div>

      {/* Text Box on Image - Responsive sizing */}
      {showTextEditor && (
        <div 
          className="absolute z-50"
          style={{ 
            top: `${editorPosition.y}px`, 
            left: `${editorPosition.x}px`,
          }}
        >
          <div 
            className="border-2 border-dashed border-[#00B2C7] bg-white bg-opacity-10 flex items-start justify-start"
            style={{ 
              padding: containerRef.current && containerRef.current.clientWidth < 300 ? '10px' : '20px',
              width: `${textBoxSize.width}px`,
              height: `${textBoxSize.height}px`,
              cursor: 'text'
            }}
          >
            <textarea
              className="outline-none w-full h-full whitespace-pre-wrap text-black text-base bg-transparent border-none resize-none"
              style={{ 
                fontSize: containerRef.current && containerRef.current.clientWidth < 300 ? '18px' : '24px', 
                lineHeight: '1.5',
                width: '100%',
                height: '100%'
              }}
              placeholder="Click here to add text..."
              value={textContent || ''}
              onChange={(e) => {
                setTextContent(e.target.value);
              }}
              onBlur={() => {
                handleSaveText();
              }}
            />
          </div>
        </div>
      )}
      

    </div>
  );
});

export default CardEditor;
