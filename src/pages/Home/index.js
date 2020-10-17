import React, { useContext, useEffect, useState } from 'react';
import firebase from '../../Services/firebaseconnection';
import 'antd/dist/antd.css';
import '../../App.css'
import { Layout, Menu } from 'antd';
import {
  ContainerOutlined,
  IdcardOutlined,
  BookOutlined,
  HomeOutlined,
  SortAscendingOutlined
} from '@ant-design/icons';
import { AudioBookTotalContext } from '../../contexts/ListaAudioBooktotalProvider';
import ListaAudioBooks from '../ListaAudioBooks';
import CadastroAudiobooks from '../CadastroAudiobooks';
import ListaUser from '../ListaUser';
import ListaAudioBooksCategoria from '../ListaAudioBooksCategoria';
import { TopContext } from '../../contexts/Top5Provider';
export default function Home() {

  const [paginaatual, setpaginatual] = useState('Home')
  const { CarregaAudiobook, audiobookslist } = useContext(AudioBookTotalContext)
  const { CarregaTop5 } = useContext(TopContext)

  

  const { Header, Content, Footer, Sider } = Layout;

  function Cadastroaudio() {
    setpaginatual('Cadastroaudio')
  }
  function listauser() {
    setpaginatual('listaUser')
  }
  function listaaudiobooks() {
    setpaginatual('ListaAudiobooks')
  }
  function listaaudiobookscateg() {
    setpaginatual('ListaAudioBooksCategoria')
  }
  function Homepage() {
    setpaginatual('Home')
  }
  return (
    <Layout >
      <Sider
        style={{
          height: '100vh',
          position: 'fixed',
          left: 0,
        }}
      >
        <div className="logoarea" onClick={Homepage}
        ><img className="logo" src={require('../../assets/Kitabicon.png')} /></div>
        <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
          <Menu.Item onClick={Homepage} key="1" icon={<HomeOutlined />}>
            Home
        </Menu.Item>
          <Menu.Item onClick={Cadastroaudio} key="2" icon={<BookOutlined />}>
            Cadastra Áudio
        </Menu.Item>
          <Menu.Item onClick={listauser} key="3" icon={<IdcardOutlined />}>
            Lista User
        </Menu.Item>
          <Menu.Item onClick={listaaudiobooks} key="4" icon={<ContainerOutlined />}>
            Lista AudioBook
        </Menu.Item>
          <Menu.Item onClick={listaaudiobookscateg} key="5" icon={<SortAscendingOutlined />}>
            Categorias
        </Menu.Item>
        </Menu>
      </Sider>
      <Layout style={{ marginLeft: 200, height: '100vh' }}>
        <Header className="site-layout-background" style={{ padding: 0, display: "flex", justifyContent: 'center', alignItems: 'center' }} >
          {paginaatual == 'ListaAudiobooks' && <ContainerOutlined style={{ color: '#fff', fontSize: 30, margin: 10 }} />}
          {paginaatual == 'Cadastroaudio' && <BookOutlined style={{ color: '#fff', fontSize: 30, margin: 10 }} />}
          {paginaatual == 'listaUser' && <IdcardOutlined style={{ color: '#fff', fontSize: 30, margin: 10 }} />}
          {paginaatual == 'ListaAudioBooksCategoria' && <SortAscendingOutlined style={{ color: '#fff', fontSize: 30, margin: 10 }} />}
          {paginaatual == 'Home' && <HomeOutlined style={{ color: '#fff', fontSize: 30, margin: 10 }} />}
          <h3 className="titulo">{paginaatual == 'ListaAudiobooks' && 'Lista de ÁudioBooks '}
            {paginaatual == 'Cadastroaudio' && 'Cadastro de ÁudioBooks '}
            {paginaatual == 'listaUser' && 'Lista de Usuários do App '}
            {paginaatual == 'ListaAudioBooksCategoria' && 'ÁudioBooks por Categoria '}
            {paginaatual == 'Home' && 'Home '}</h3>
        </Header>
        <Content style={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-start', flex: 1, height: '100vah', padding: 60 }}>
          {paginaatual == 'ListaAudiobooks' && <ListaAudioBooks />}
          {paginaatual == 'Cadastroaudio' && <CadastroAudiobooks />}
          {paginaatual === 'listaUser' && <ListaUser />}
          {paginaatual === 'ListaAudioBooksCategoria' && <ListaAudioBooksCategoria />}
          {paginaatual === 'Home' && <div style={{ flex: 1, justifyContent: 'center', alignItems: 'center', display: 'flex' }}> <img style={{ width: '30%' }} src={require('../../assets/KiTablogo1.png')} /> </div>}

        </Content>
      </Layout>

    </Layout>
  );
}