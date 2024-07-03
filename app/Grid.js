"use client"; // Add this line at the top

import React, { useState, useEffect } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import ButtonWithMenu from './Button';

const ResponsiveGridLayout = WidthProvider(Responsive);

const GridItem = ({ item, removeItem }) => {
  const renderContent = () => {
    switch (item.type) {
      case 'article':
        return <div className='text-black'>Article Content</div>;
      case 'image':
        return <div className='text-black'>Image Content</div>;
      case 'video':
        return  <div className='text-black'>VIdeo Content</div>;
      default:
        return <div className='text-black'>{item.i}</div>;
    }
  };

  return (
    <div className='grid-item'>
      <div className='top-bar'>
        <button className='close-button' onClick={() => removeItem(item.i)}>✕</button>
      </div>
      <div>
      <br/>   <br/>  
      </div>
      {renderContent(item)}
    </div>
  );
};

const MyResponsiveGrid = () => {
  const [layouts, setLayouts] = useState({ lg: [] });
  const [itemTypes, setItemTypes] = useState({}); // Store item types separately

  const breakpoints = { lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 };
  const cols = { lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 };

  useEffect(() => {
    const savedLayouts = JSON.parse(localStorage.getItem('layouts')) || { lg: [
      { i: 'a', x: 0, y: 0, w: 1, h: 2 },
    ]};
    const savedTypes = JSON.parse(localStorage.getItem('itemTypes')) || {};
    setLayouts(savedLayouts);
    setItemTypes(savedTypes);
  }, []);

  const handleLayoutChange = (currentLayout) => {
    const updatedLayouts = { lg: currentLayout };
    setLayouts(updatedLayouts);
    localStorage.setItem('layouts', JSON.stringify(updatedLayouts));
  };

  const addItem = (type) => {
    const newItem = { i: `n${layouts.lg.length}`, x: 0, y: 0, w: 2, h: 4 };
    const updatedLayouts = { ...layouts, lg: [...layouts.lg, newItem] };
    const updatedItemTypes = { ...itemTypes, [newItem.i]: type };

    setLayouts(updatedLayouts);
    setItemTypes(updatedItemTypes);
    localStorage.setItem('layouts', JSON.stringify(updatedLayouts));
    localStorage.setItem('itemTypes', JSON.stringify(updatedItemTypes));
  };

  const removeItem = (id) => {
    const updatedLayouts = { ...layouts, lg: layouts.lg.filter(item => item.i !== id) };
    const { [id]: _, ...updatedItemTypes } = itemTypes; // Remove item type

    setLayouts(updatedLayouts);
    setItemTypes(updatedItemTypes);
    localStorage.setItem('layouts', JSON.stringify(updatedLayouts));
    localStorage.setItem('itemTypes', JSON.stringify(updatedItemTypes));
  };

  return (
    <div>
      <ResponsiveGridLayout
        className="layout"
        layouts={layouts}
        breakpoints={breakpoints}
        cols={cols}
        rowHeight={30}
        width={1200}
        isDraggable={true}
        isResizable={true}
        preventCollision={true}
        allowOverlap={true}
        onLayoutChange={(layout) => handleLayoutChange(layout)}
      >
        {layouts.lg.map(item => (
          <div key={item.i} data-grid={item}>
            <GridItem item={{ ...item, type: itemTypes[item.i] }} removeItem={removeItem} />
          </div>
        ))}
      </ResponsiveGridLayout>
      <ButtonWithMenu addItem={addItem} />
    </div>
  );
};

export default MyResponsiveGrid;