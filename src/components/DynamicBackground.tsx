import React, { useState, useEffect, useRef } from 'react';
import TextEditor from './TextEditor';

interface TextItem {
  id: string;
  content: string;
  position: { x: number; y: number };
  fontSize?: string;
  fontFamily?: string;
  color?: string;
}

interface DynamicBackgroundProps {
  images: string[];
  isTextEditorVisible: boolean;
  onCloseTextEditor: () => void;
  onOpenTextEditor?: () => void;
}

const DynamicBackground: React.FC<DynamicBackgroundProps> = ({ 
  images, 
  isTextEditorVisible,
  onCloseTextEditor,
  onOpenTextEditor = () => {}
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [textItems, setTextItems] = useState<TextItem[]>([]);
  const [activeTextId, setActiveTextId] = useState<string | null>(null);
  const [editorPosition, setEditorPosition] = useState({ x: 150, y: 150 });
  const containerRef = useRef<HTMLDivElement>(null);

  // Image index is now controlled by the parent component

  // Effect to handle new text editor visibility
  useEffect(() => {
    if (isTextEditorVisible && !activeTextId && containerRef.current) {
      // Set a position for the editor in the center of the container
      const containerRect = containerRef.current.getBoundingClientRect();
      setEditorPosition({
        x: Math.max(10, (containerRect.width / 2) - 175),
        y: Math.max(10, (containerRect.height / 2) - 100)
      });
    }
  }, [isTextEditorVisible, activeTextId]);
  
  // Log when text editor visibility changes
  useEffect(() => {
    console.log('Text editor visibility changed:', isTextEditorVisible);
  }, [isTextEditorVisible]);

  const handleTextChange = (text: string) => {
    if (activeTextId) {
      // Update existing text
      if (text) {
        setTextItems(prevItems => 
          prevItems.map(item => 
            item.id === activeTextId 
              ? { ...item, content: text } 
              : item
          )
        );
      } else {
        // If text is empty, remove the item
        setTextItems(prev => prev.filter(item => item.id !== activeTextId));
        setActiveTextId(null);
        onCloseTextEditor();
      }
    } else if (text) {
      // Add new text
      const newId = `text-${Date.now()}`;
      setTextItems(prev => [
        ...prev, 
        { 
          id: newId, 
          content: text, 
          position: editorPosition
        }
      ]);
      setActiveTextId(newId);
    } else {
      // If no text and no active ID, just close the editor
      onCloseTextEditor();
    }
  };

  const handleTextClick = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveTextId(id);
    onOpenTextEditor();
  };
  
  const handleBackgroundClick = (e: React.MouseEvent) => {
    // Only reset if clicking directly on the background, not on a text item
    if (e.target === e.currentTarget) {
      setActiveTextId(null);
      onCloseTextEditor();
    }
  };

  // Find the active text item for the editor
  const activeText = textItems.find(item => item.id === activeTextId);

  return (
    <div className="relative w-full h-full overflow-hidden rounded-2xl" ref={containerRef}>
      {/* Background Image */}
      <div
        className="w-full h-full bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{
          backgroundImage: `url(${images[currentImageIndex]})`,
          backgroundSize: "cover",
          position: "relative",
          backgroundPosition: "center"
        }}
        onClick={handleBackgroundClick}
      >


        {/* Text Items */}
        {textItems.map((item) => (
          <div
            key={item.id}
            className={`absolute cursor-pointer ${activeTextId === item.id ? 'ring-2 ring-teal' : ''}`}
            style={{
              top: `${item.position.y}px`,
              left: `${item.position.x}px`,
              maxWidth: '80%',
              fontFamily: item.fontFamily || 'inherit',
              color: item.color || 'inherit',
              fontSize: item.fontSize || 'inherit',
              zIndex: activeTextId === item.id ? 20 : 10,
              padding: '4px',
              borderRadius: '4px',
              backgroundColor: activeTextId === item.id ? 'rgba(255,255,255,0.2)' : 'transparent'
            }}
            onClick={(e) => handleTextClick(item.id, e)}
            dangerouslySetInnerHTML={{ __html: item.content }}
          />
        ))}
      </div>

      {/* Text Editor */}
      <TextEditor
        isVisible={isTextEditorVisible}
        onTextChange={handleTextChange}
        initialText={activeText?.content || ''}
        position={activeText?.position || editorPosition}
      />

      {/* Navigation Controls - Positioned outside the card container in the parent */}
      
      {/* Image Thumbnails - Positioned at the bottom of the image */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
        {images.map((image, index) => (
          <button
            key={index}
            className={`w-6 h-6 rounded-full border ${currentImageIndex === index ? 'border-[#00B2C7] border-2' : 'border-white'} shadow-sm`}
            style={{
              backgroundImage: `url(${image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
            onClick={() => setCurrentImageIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default DynamicBackground;
