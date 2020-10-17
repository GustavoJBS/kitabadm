import React, { createContext, useEffect, useState } from 'react';
import firebase from '../Services/firebaseconnection'
export const UserContext = createContext({});


export default function UserProvider({ children }) {
  const [usuarios, setusuarios] = useState([])
  function CarregaUser() {
    firebase.database().ref('usuarios').on('value', (snapshot) => {
      snapshot.forEach((chilItem) => {
        let data = {
          nome: chilItem.val().nome,
          nlivros: chilItem.val().nlivros,
          email: chilItem.val().email,
        }
        setusuarios(oldarray => [...oldarray, data]);
      })
    })
  }

  useEffect(() => {
    CarregaUser();
  }, [])
  return (
    <UserContext.Provider value={{ CarregaUser, usuarios }}>
      {children}
    </UserContext.Provider>
  );
}