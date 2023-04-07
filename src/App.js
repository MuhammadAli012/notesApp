import React from 'react';
import './App.css';
import {Routes, Route} from 'react-router-dom'
import { ListingNote } from './components/ListingNote';
import { AddNote } from './components/AddNote'


//function start



const App = () => { 
 
  return (
    <>
      <Routes>
        <Route exact path='/' element={<ListingNote/>} />
        <Route exact path='/addNote' element={< AddNote/>} />
      </Routes>
    </>
  );
}

export default App;
