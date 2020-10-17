import React, { useContext, useState } from 'react';
//import { Table } from 'reactstrap';
import { Table, Tag, Space } from 'antd';
import { AudioBookTotalContext } from '../../contexts/ListaAudioBooktotalProvider';
export default function ListaAudioBooks() {
  const { CarregaAudiobook, audiobookslist } = useContext(AudioBookTotalContext)
  const columns = [
    {
      title: 'Nome do ÁudioBook',
      dataIndex: 'nome',
      key: 'nome',
      render: text => <a>{text}</a>,
    },
    {
      title: 'Categoria',
      dataIndex: 'categoria',
      key: 'categoria',

    },
    {
      title: 'Descrição',
      dataIndex: 'descricao',
      key: 'descricao',

    },
    {
      title: 'Nota',
      dataIndex: 'nota',
      key: 'nota',
    }
  ]
  return (
    <Table dataSource={audiobookslist} columns={columns} style={{ width: '90%' }} />

  );
}