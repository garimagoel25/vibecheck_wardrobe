import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ItemList from './components/ItemList';
import ItemDetails from './components/ItemDetails';
import AddItem from './components/AddItem'; // If you have an AddItem component

const App = () => {
  return (
    <Router>
      <div>
        <h1>Wardrobe App</h1>
        <Switch>
          <Route path="/" exact component={ItemList} />
          <Route path="/items/:id" component={ItemDetails} />
          <Route path="/add-item" component={AddItem} /> {/* Optional: AddItem component */}
        </Switch>
      </div>
    </Router>
  );
};

export default App;
import './App.css';
