// src/store.js
import { createStore } from 'redux';

// Initial State
const initialState = {
  categories: [
    {
      id: 'cspm-executive-dashboard',
      name: 'CSPM Executive Dashboard',
      widgets: [
        { id: 1, name: 'Cloud Accounts', text: 'Some info about Cloud Accounts' },
        { id: 2, name: 'Risk Assessment', text: 'Some info about Risk Assessment' },
      ],
    },
    {
      id:'cwpp-dashboard',
      name: 'CWPP Dashboard',
      widgets:[
        {id:1,name:'Top 5 namespace specific alerts',text:'A B C D E'},
        {id:2,name:'Workload alerts',text:'A B C D E'}
          
        
      ],
    },
    {
      id:'registry-scan',
      name:'Registry Scan',
      widgets:[
        {id:1,name:'Image Risk Assessment',text:'Insert image of risk asssessment'},
        {id:2,name:'Image security issues',text:'Insert image of security issues'}
      ],
    },
  ],
};

// Actions
const ADD_WIDGET = 'ADD_WIDGET';
const REMOVE_WIDGET = 'REMOVE_WIDGET';

// Reducer
const widgetReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.name === action.payload.categoryName
            ? {
                ...category,
                widgets: [...category.widgets, action.payload.widget],
              }
            : category
        ),
      };
    case REMOVE_WIDGET:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.name === action.payload.categoryName
            ? {
                ...category,
                widgets: category.widgets.filter(
                  (widget) => widget.id !== action.payload.widgetId
                ),
              }
            : category
        ),
      };
    default:
      return state;
  }
};

// Create Store
const store = createStore(widgetReducer);

export default store;
