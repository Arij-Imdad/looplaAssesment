import React from 'react';
import HomePage from './LooplaEvents/pages/Home'
import EventForm from './LooplaEvents/pages/CreateEventPage.tsx'
import {BrowserRouter as Router , Routes, Route, Link } from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div>
          <Link to="/"> Home</Link> 
          <Link to="/create"> Create Event</Link>

        </div>
        <Routes>
          <Route path='/' element={<HomePage /> }/>
          <Route path='/create' element={<EventForm /> }/>

        </Routes>
      </Router>
    </>
  );
}

export default App;

