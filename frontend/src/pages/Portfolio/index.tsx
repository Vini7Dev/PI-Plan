import React, { useCallback, useRef, useState } from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import { useAuth } from '../../contexts/Authentication';
import getValidationErrors from '../../utils/getValidationErrors';
import api from '../../services/api';
import {
  Container,
  BannerImageArea,
} from './styles';

import Logo from '../../assets/images/PI_Plan.png';

import ModalView from '../../components/ModalView';
import Input from '../../components/Input';
import AddImageInput from '../../components/AddImageInput';
import Button from '../../components/Button';
import PortfolioItem from '../../components/PortfolioItem';
import SearchBarButton from '../../components/SearchBarButton';

interface IPortfolioItemData {
  id: string;
  title: string;
  description: string;
  image: File;
}

// Página para listagem dos itens salvos no portfólio
const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [portfolioItems, setPortfolioItems] = useState<IPortfolioItemData[]>([]);

  // Enviando o usuário para a tela de login
  const handleNavigateToLogin = useCallback(() => {
    history.push('/login');
  }, [history]);

  // Enviando o usuário para sua respectiva página inicial
  const handleNavigateToDashboard = useCallback(() => {
    user.user_type === 'admin'
      ? history.push('/dashboard')
      : history.push('/orders-list');
  }, [history, user]);

  // Carregando os itens cadastrados no portfólio
  const handleLoadPortfolioItems = useCallback(async () => {
    console.log('OK');

    const { data: portfolioItemsList } = await api.get<IPortfolioItemData[]>('/portfolio-items');

    console.log(portfolioItemsList);

    setPortfolioItems(portfolioItemsList);
  }, []);

  // Cadastrando/Editando um item no portfólio
  const handleSubmitPortfolioItem = useCallback(async (data) => {
    try {
      // Verificando se a imagem foi adicionada
      if(!selectedImage) {
        alert('Adicione uma imagem!');

        return;
      }

      // Criando o modelo para validação do formulário
      const shape = Yup.object().shape({
        title: Yup.string().max(45, 'Máximo de 45 letras!').required('O título é obrigatório!'),
        description: Yup.string().required('A descrição é obrigatória!'),
      });

      // Validando o formulário
      await shape.validate(data, { abortEarly: false });

      // Criando um objeto com os dados do item
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('description', data.description);
      formData.append('image', selectedImage);

      if(selectedItemId) {
        // Atualizando o item no portfólio
        await api.post(`/portfolio-items/${selectedItemId}`, formData);
      } else {
        // Cadastrando o item no portfólio
        await api.post('/portfolio-items', formData);
      }

      // Recarregando a listagem dos itens cadastrados no portfólio
      handleLoadPortfolioItems();

      // Fechando o popup
      setModalIsOpen(false);
    } catch(error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if(error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        if(formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }
  }, [selectedItemId, selectedImage, setModalIsOpen, handleLoadPortfolioItems]);

  return (
    <Container onLoad={handleLoadPortfolioItems}>
      <nav>
        <div id="nav-logo-area">
          <img src={Logo} alt="Planejados Inteligentes" />

          <SearchBarButton
            label="Buscar"
            name="search_string"
            placeholder="Busque por um produto"
            color="white"
            onClickInSearchButton={() => {
              //
            }}
          />
        </div>

        <div id="nav-button">
          {
            user ? (
              <>
                <Button
                  name="Adicionar item"
                  size="small"
                  color="white"
                  onClick={() => setModalIsOpen(true)}
                />

                <div className="nav-btn-divisor" />

                <Button
                  name="Página Inicial"
                  size="small"
                  color="white"
                  onClick={handleNavigateToDashboard}
                />
              </>
            ) : (
              <Button
                name="Entrar"
                size="small"
                color="white"
                onClick={handleNavigateToLogin}
              />
            )
          }
        </div>
      </nav>

      <section id="banner-area">
        <BannerImageArea>
          <div id="banner-left-arrow">
            <FiChevronLeft className="arrow-icon" />
          </div>

          <div id="banner-right-arrow">
            <FiChevronRight className="arrow-icon" />
          </div>
        </BannerImageArea>
      </section>

      <main id="items-list-area">
        {
          portfolioItems.length > 0
            ? portfolioItems.map(portfolioItem => (
              <PortfolioItem
                key={portfolioItem.id}
                id={portfolioItem.id}
                title={portfolioItem.title}
                description={portfolioItem.description}
              />
            ))
          : null
        }
      </main>

      <ModalView
        isOpen={modalIsOpen}
        title="Adicionar Item"
      >
        <Form onSubmit={handleSubmitPortfolioItem} ref={formRef}>
          <Input
            label="Título"
            name="title"
            placeholder="Informe o título do móvel"
          />

          <Input
            label="Descrição"
            name="description"
            placeholder="Descreva o móvel"
          />

          <AddImageInput />

          <Button
            name="Adicionar"
            type="submit"
          />

          <div className="modal-space-divisor" />

          <Button
            name="Fechar"
            onClick={() => setModalIsOpen(false)}
            color="white"
            size="small"
          />
        </Form>
      </ModalView>
    </Container>
  );
}

export default Portfolio;
