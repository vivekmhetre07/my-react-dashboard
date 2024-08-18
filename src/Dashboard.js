import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './Dashboard.css';
import Category from './components/Category';

function Dashboard() {
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [isOffCanvasOpen, setIsOffCanvasOpen] = useState(false);
  const [newWidgetName, setNewWidgetName] = useState('');
  const [newWidgetText, setNewWidgetText] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const categories = useSelector((state) => state.categories || []);
  const [selectedDateRange, setSelectedDateRange] = useState('2');

  const togglePopUp = () => {
    setIsPopUpOpen(!isPopUpOpen);
  };

  const toggleOffCanvas = () => {
    setIsOffCanvasOpen(!isOffCanvasOpen);
  };

  const handleAddWidget = () => {
    if (newWidgetName.trim() === '' || !selectedCategoryId) return;

    const newWidget = {
      id: Date.now(), 
      name: newWidgetName,
      text: newWidgetText,
    };

    dispatch({
      type: 'ADD_WIDGET',
      payload: {
        categoryName: categories.find(category => category.id === selectedCategoryId).name,
        widget: newWidget,
      },
    });

    setNewWidgetName('');
    setNewWidgetText('');
    setSelectedCategoryId('');
    toggleOffCanvas(); 
  };

  const handleRemoveWidget = (widgetId, categoryId) => {
    dispatch({
      type: 'REMOVE_WIDGET',
      payload: {
        categoryName: categories.find(category => category.id === categoryId).name,
        widgetId,
      },
    });
  };

  const handleAddWidgetClick = (categoryId) => {
    setSelectedCategoryId(categoryId);
    togglePopUp();
  };

  const filteredCategories = categories.map(category => ({
    ...category,
    widgets: (category.widgets || []).filter(widget => 
      widget.name && widget.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  }));

  return (
    <div className="dashboard">
      <div className="header d-flex justify-content-between align-items-center mb-4">
        <h1>CNAPP Dashboard</h1>
        <div className="d-flex align-items-center">
          <button className="btn btn-secondary me-3" onClick={toggleOffCanvas}>+ Add Widgets</button>
          
          <input
            type="text"
            placeholder="Search Widgets..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input mr-3"
          />
          <select 
      className="form-select date-range mr-3"
      value={selectedDateRange} 
      onChange={(e) => setSelectedDateRange(e.target.value)}
    >
      <option value="2">Last 2 days</option>
      <option value="7">Last 7 days</option>
      <option value="custom">More...</option>
    </select>
        </div>
      </div>

      <div className="content">
        {filteredCategories.map((category) => (
          <Category 
            key={category.id} 
            category={category} 
            onRemoveWidget={(widgetId) => handleRemoveWidget(widgetId, category.id)}
            onAddWidget={handleAddWidgetClick}
          />
        ))}
      </div>

      
      {isOffCanvasOpen && (
        <div className="offcanvas">
          <div className="offcanvas-content">
            <h2>Add Widget</h2>

            <ul className="nav nav-tabs">
        {categories.map((category) => (
          <li className="nav-item" key={category.id}>
            <button
              className={`nav-link ${selectedCategoryId === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategoryId(category.id)}
            >
              {category.name}
            </button>
          </li>
        ))}
      </ul>

            <input
              type="text"
              placeholder="Widget Name"
              value={newWidgetName}
              onChange={(e) => setNewWidgetName(e.target.value)}
              className="form-control my-2"
            />
            <textarea
              placeholder="Widget Text"
              value={newWidgetText}
              onChange={(e) => setNewWidgetText(e.target.value)}
              className="form-control my-2"
            />

            <button className="btn btn-primary offbtn" onClick={handleAddWidget}>Confirm</button>
            <button className="btn btn-secondary offbtn" onClick={toggleOffCanvas}>Cancel</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
