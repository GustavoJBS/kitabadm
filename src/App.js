import React, { useContext, useEffect, useState } from 'react';
import AudioBookTotalProvider, { AudioBookTotalContext } from './contexts/ListaAudioBooktotalProvider';
import Top5Provider from './contexts/Top5Provider';
import UserProvider from './contexts/UserProvider';
import Home from './pages/Home';

export default function App() {



  return (
    <AudioBookTotalProvider>
      <UserProvider>
        <Top5Provider>
          <Home />
        </Top5Provider>
      </UserProvider>
    </AudioBookTotalProvider>
  );
}