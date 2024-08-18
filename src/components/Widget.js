import React from 'react';

function Widget({ widget, onRemove, onAddWidget }) {
  return (
    <div className="card">
      <div className="card-body">
        <h5 className="card-title">{widget.name}</h5>
        <p className="card-text">{widget.text}</p>
        <button className="btn btn-primary" onClick={onAddWidget}>+ Add Widget</button>
        <button className="btn btn-danger" onClick={() => onRemove(widget.id)}>Remove</button>
      </div>
    </div>
  );
}

export default Widget;
