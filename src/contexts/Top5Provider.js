import React, { createContext, useEffect, useState } from 'react';
import firebase from '../Services/firebaseconnection'
export const TopContext = createContext({});

export default function Top5Provider({ children }) {
  function CarregaTop5() {
    firebase.database().ref(`audiobooks`).once('value', (snapshot1) => {
      snapshot1.forEach((chilItem) => {
        chilItem.forEach((chilItem2) => {
          firebase.database().ref('top5').child(chilItem2.val().nome).set({
            nome: chilItem2.val().nome, linkimage: chilItem2.val().linkimage,
            linkaudio: chilItem2.val().linkaudio, descricao: chilItem2.val().descricao,
            categoria: chilItem2.val().categoria,
            id: chilItem2.val().id,
            nota: chilItem2.val().nota, notatotal: chilItem2.val().notatotal, npessoas: chilItem2.val().npessoas
          })
        })
      })
    })
  }

  useEffect(() => {
    CarregaTop5()
  }, [])
  return (
    <TopContext.Provider value={{ CarregaTop5 }}>
      {children}
    </TopContext.Provider>
  )
}