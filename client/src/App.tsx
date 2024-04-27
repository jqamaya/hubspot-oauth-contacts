import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Contacts from './screens/Contacts';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

function App() {
  return (
    <Routes>
      <Route path='/' index element={<Contacts />} />
    </Routes>
  );
}

export default App;
