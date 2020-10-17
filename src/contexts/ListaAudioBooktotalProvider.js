import React, { createContext, useEffect, useState } from 'react';
import firebase from '../Services/firebaseconnection'
export const AudioBookTotalContext = createContext({});

export default function AudioBookTotalProvider({ children }) {
  const [audiobookslist, setAudiobooksList] = useState([])
  const [audiobookslistCategoria, setAudiobooksListCategoria] = useState([])
  function CarregaAudiobook() {
    firebase.database().ref(`top5`).on('value', (snapshot) => {
      setAudiobooksList([])
      snapshot.forEach((chilItem) => {
        let data = {
          nome: chilItem.val().nome,
          nota: chilItem.val().nota,
          descricao: chilItem.val().descricao,
          categoria: chilItem.val().categoria
        }
        setAudiobooksList(oldarray => [...oldarray, data]);
      })
    })
  }

  function CarregaAudiosCategoria(filtro) {
    if (filtro == 'All') {
      firebase.database().ref(`top5`).on('value', (snapshot) => {
        setAudiobooksListCategoria([])
        snapshot.forEach((chilItem) => {
          let data = {
            nome: chilItem.val().nome,
            nota: chilItem.val().nota,
            descricao: chilItem.val().descricao,
            categoria: chilItem.val().categoria
          }
          setAudiobooksListCategoria(oldarray => [...oldarray, data]);
        })
      })
    } else {
      firebase.database().ref(`audiobooks/${filtro}`).on('value', (snapshot) => {
        setAudiobooksListCategoria([])
        snapshot.forEach((chilItem) => {
          let data = {
            nome: chilItem.val().nome,
            nota: chilItem.val().nota,
            descricao: chilItem.val().descricao,
            categoria: chilItem.val().categoria
          }
          setAudiobooksListCategoria(oldarray => [...oldarray, data]);
        })
      })
    }

  }

  useEffect(() => {
    CarregaAudiobook();
    CarregaAudiosCategoria();
  }, [])
  return (
    <AudioBookTotalContext.Provider value={{ CarregaAudiobook, audiobookslist, CarregaAudiosCategoria, audiobookslistCategoria }}>
      {children}
    </AudioBookTotalContext.Provider>
  );
}