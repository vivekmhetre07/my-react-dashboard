import React from 'react';
import Widget from './Widget';

function Category({ category, onRemoveWidget, onAddWidget }) {
  return (
    <div className="category mb-4">
      <div className="row">
        {category.widgets.map((widget) => (
          <div className="col-md-4 mb-3" key={widget.id}>
            <Widget widget={widget} onRemove={onRemoveWidget} />
          </div>
        ))}
        
        <div className="col-md-4 mb-3">
          <div className="card add-widget-card">
            <div className="card-body d-flex justify-content-center align-items-center">
              <button className="btn btn-primary" onClick={() => onAddWidget(category.id)}>
                + Add Widget
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;

