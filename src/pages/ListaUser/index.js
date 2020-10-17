import React, { useContext } from 'react';
import { Table, Tag, Space } from 'antd';
import { UserContext } from '../../contexts/UserProvider';

export default function ListaUser() {
  const { CarregaUser, usuarios } = useContext(UserContext)
  const columns = [
    {
      title: 'Nome',
      dataIndex: 'nome',
      key: 'nome',
    },
    {
      title: 'Nº Livros lidos',
      dataIndex: 'nlivros',
      key: 'nlivros',

    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',

    },
  ]
  return (
    <Table dataSource={usuarios} columns={columns} style={{ width: '90%' }} />
  );
}