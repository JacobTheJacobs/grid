import React, { useState, useEffect, useRef } from 'react';

const ButtonWithMenu = ({ addItem }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef(null);

  const handleAddItem = (type) => {
    addItem(type);
    setIsMenuOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <div ref={menuRef}>
      <button
        className="add-button"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        +
      </button>
      {isMenuOpen && (
        <div className="popup-menu">
          <button onClick={() => handleAddItem('article')}>Add Article</button>
          <button onClick={() => handleAddItem('image')}>Add Image</button>
          <button onClick={() => handleAddItem('video')}>Add Video</button>
        </div>
      )}
    </div>
  );
};

export default ButtonWithMenu;
