import React from 'react';

const GridItem = ({ item, removeItem }) => {
  const renderContent = () => {
    switch (item.type) {
      case 'article':
        return <div className='text-black'>Article Content</div>;
      case 'image':
        return <img src="https://via.placeholder.com/150" alt="Placeholder" />;
      case 'video':
        return <video width="100%" controls><source src="https://www.w3schools.com/html/mov_bbb.mp4" type="video/mp4" /></video>;
      default:
        return <div className='text-black'>{item.i}</div>;
    }
  };

  return (
    <div className='grid-item'>
      <div className='top-bar'>
        <button className='close-button' onClick={() => removeItem(item.i)}>✕</button>
      </div>
      {renderContent(item)}
    </div>
  );
};

export default GridItem;