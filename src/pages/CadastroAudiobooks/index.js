
import React, { useEffect, useState } from 'react';
import { Container, Row, Col, InputGroup, InputGroupAddon, CardText } from 'reactstrap';
import { Select, Button, Empty, Upload, Input, Card } from 'antd';
import firebase from '../../Services/firebaseconnection'
export default function CadastroAudiobooks() {
  const [tituloAudioBook, setTituloAudioBook] = useState('');
  const [NomeAutor, setNomeAutor] = useState('');
  const [idaudioBook, setidaudiobook] = useState('');
  const [descricao, setdescricao] = useState('');
  const [categoria, setCategoria] = useState('');
  const [urlImagem, setUrlImagem] = useState('');
  const [urlAudio, setUrlAudio] = useState('');
  const [progressImagem, setprogressImagem] = useState(0)
  const [progressaudio, setprogressaudio] = useState(0)
  const [audiobook, setaudiobook] = useState(null)
  const [imagem, setImagem] = useState(null)

  const { Option } = Select;
  async function imagepicker(e) {
    if (e.target.files[0]) {
      const image = e.target.files[0];
      if (image.type === 'image/png' || image.type === 'image/jpeg') {
        await setImagem(image);
      } else {
        alert('Insira um arquivo de formato JPG ou PNG');
        setImagem(null);
        return null;
      }
    }
  }


  {/*Insere a Imagem e o Áudio no Banco de Dados e retorna o link para o Cadastro do AudioBook*/ }

  function uploadimagem() {

    firebase.storage().ref(`ImagensCapaAudioBook/${imagem.name}`).put(imagem).on('state_changed', (snapshot) => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
      setprogressImagem(progress)
    },
      (error) => {
        console.log('Error imagem' + error)
      },
      () => {
        firebase.storage().ref(`ImagensCapaAudioBook/${imagem.name}`).getDownloadURL()
          .then(url => {
            setUrlImagem(url);
          })
      })
  }

  function uploadaudio() {
    firebase.storage().ref(`Audiobooks/${audiobook.name}`).put(audiobook)
      .on('state_changed', (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        setprogressaudio(progress)
      },
        (error) => {
          console.log('Error imagem' + error)
        },
        () => {
          firebase.storage().ref(`Audiobooks/${audiobook.name}`).getDownloadURL()
            .then(url => {
              setUrlAudio(url);
            })
        })
  }






  function audiopicker(e) {
    if (e.target.files[0]) {

      const audio = e.target.files[0];
      if (audio.type === 'audio/mpeg') {
        setaudiobook(audio);
      }

    }
  }

  function cadastraraudiobook() {
    firebase.database().ref(`audiobooks/${categoria}/${idaudioBook}`).set({
      nome: tituloAudioBook,
      categoria: categoria,
      id: idaudioBook,
      nota: 0,
      notatotal: 0,
      npessoas: 0,
      descricao: descricao,
      linkaudio: urlAudio,
      linkimage: urlImagem,
      autor: NomeAutor
    })
    setTituloAudioBook('')
    setNomeAutor('')
    setidaudiobook('')
    setdescricao('')
    setCategoria('')
    setUrlImagem('')
    setUrlAudio('')
    setprogressImagem(0)
    setprogressaudio(0)
    setaudiobook(null)
    setImagem(null)


  }
  const { TextArea } = Input;

  useEffect(() => {
    if (audiobook !== null) {
      uploadaudio();
    }
  }, [audiobook])

  useEffect(() => {
    if (imagem !== null) {
      uploadimagem();
    }
  }, [imagem])
  return (
    <div>
      <Row>
        <Col>
          <Row style={{ margin: 30 }}>
            <h1>Titulo do ÁudioBook</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Input.TextArea style={{ width: 500 }}
                value={tituloAudioBook}
                onChange={(e) => setTituloAudioBook(e.target.value)}
              />

            </div>
          </Row>

          <Row style={{ margin: 30 }}>
            <h1>Nome do Autor</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Input.TextArea style={{ width: 500 }}
                value={NomeAutor}
                onChange={(e) => setNomeAutor(e.target.value)}
              />
            </div>
          </Row>
          <Row style={{ margin: 30 }}>
            <h1>Categoria</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <Select
                value={categoria}
                style={{ width: 500 }}
                placeholder="Selecione a Categoria"
                onChange={(v) => setCategoria(v)}
              >
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
            </div>
          </Row>
          <Row style={{ margin: 30 }}>
            <h1>ID do ÁudioBook</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <TextArea style={{ width: 500 }}
                value={idaudioBook}
                onChange={(e) => setidaudiobook(e.target.value)} />
            </div>
          </Row>
        </Col>
        <Col>
          <Row style={{ margin: 30 }}>
            <h1>Descrição do ÁudioBook</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <TextArea style={{ width: 500, height: 450 }}
                value={descricao}
                onChange={(e) => setdescricao(e.target.value)}
              />
            </div>
          </Row>
        </Col>

        <Col>
          <Row style={{ margin: 30 }}>
            <Row>
              <h1>Inserir o Arquivo de Áudio(.mp3)</h1>
              <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                <InputGroup>
                  <InputGroupAddon addonType="append">
                    <Input type="file" onChange={audiopicker} />

                  </InputGroupAddon>
                </InputGroup>

              </div>
            </Row>
            <Row>
              <progress style={{ width: 330, height: 40 }} value={progressaudio} max="100" />
            </Row>
          </Row>

          <Row style={{ margin: 30 }}>
            <h1>Inserir foto do ÁudioBook (.jpg)</h1>
            <div style={{ display: 'flex', width: '100%', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
              <InputGroup>
                {urlImagem !== '' ?
                  <img src={urlImagem} style={{ height: 330, width: 330, borderWidth: 1 }} alt="Capa do AudioBook" /> :
                  <div>
                    <div style={{ backgroundColor: '#ddd', height: 330, width: 330, borderWidth: 1 }}>
                      <Empty />
                    </div>
                    <progress style={{ width: 330, height: 40 }} value={progressImagem} max="100" />
                  </div>}



                <InputGroupAddon addonType="append" style={{ display: "flex", justifyContent: 'flex-start', alignItems: 'flex-start', textAlign: 'center' }}>
                  <Input accept="image/png, image/jpeg" type="file" onChange={imagepicker} />
                </InputGroupAddon>
              </InputGroup>
            </div>

          </Row>

          <Row style={{ margin: 30 }}>
            <Button onClick={cadastraraudiobook} style={{ width: 330, fontSize: 20, height: 50 }}>Cadastrar ÁudioBook</Button>
          </Row>
        </Col>
      </Row>


    </div >
  );
}