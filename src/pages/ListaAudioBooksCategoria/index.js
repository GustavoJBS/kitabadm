import React, { useContext, useEffect, useState } from 'react';
//import { Table } from 'reactstrap';
import { Table, Tag, Space } from 'antd';
import { AudioBookTotalContext } from '../../contexts/ListaAudioBooktotalProvider';
import { Select, Button, Empty } from 'antd';
export default function ListaAudioBooksCategoria() {
  const [filtro, setFiltro] = useState('All')
  const { CarregaAudiosCategoria, audiobookslistCategoria } = useContext(AudioBookTotalContext)
  const { Option } = Select;

  useEffect(() => {
    CarregaAudiosCategoria(filtro)
  }, [filtro])

  const columns = [
    {
      title: 'Nome do ÁudioBook',
      dataIndex: 'nome',
      key: 'nome',
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
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flex: 1, flexDirection: 'column' }}>
      <Select
        style={{ width: 200, marginBottom: 30 }}
        placeholder="Selecione a Categoria"
        value={filtro}
        onChange={(v) => setFiltro(v)}
      >
        <Option value="All">Todas as Categorias</Option>
        <Option value="HarryPotterCollection">Saga HR</Option>
        <Option value="Biografias">Biografias</Option>
        <Option value="Classicos">Classicos</Option>
        <Option value="Coleções">Coleções</Option>
        <Option value="Comportamento">Comportamento</Option>
        <Option value="Contos">Contos</Option>
        <Option value="Crítica Literária">Crítica Literária</Option>
        <Option value="Ficção Científica">Ficção Científica</Option>
        <Option value="Folclore">Folclore</Option>
        <Option value="Genealogia">Genealogia</Option>
        <Option value="Humor">Humor</Option>
        <Option value="Infanto-juvenil">Infanto-juvenil</Option>
        <Option value="Jogos">Jogos</Option>
        <Option value="Jornais">Jornais</Option>
        <Option value="Literatura Brasileira">Literatura Brasileira</Option>
        <Option value="Literatura Estrangeira">Literatura Estrangeira</Option>
        <Option value="Livros Raros">Livros Raros</Option>
        <Option value="Manuscritos">Manuscritos</Option>
        <Option value="Poesia">Poesia</Option>
        <Option value="Biografias">Biografias</Option>
      </Select>
      <Table dataSource={audiobookslistCategoria} columns={columns} style={{ width: '90%' }} />
    </div>
  );
}