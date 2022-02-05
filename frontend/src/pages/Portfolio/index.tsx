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

import Loading from '../../components/Loading';
import ModalView from '../../components/ModalView';
import Input from '../../components/Input';
import AddImageInput from '../../components/AddImageInput';
import Button from '../../components/Button';
import PortfolioItem from '../../components/PortfolioItem';

interface IPortfolioItemData {
  id: string;
  title: string;
  description: string;
  image_reference: string;
}

// Página para listagem dos itens salvos no portfólio
const Portfolio: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [loadingItem, setLoadingItem] = useState(false);
  const [loadingPortfolioItems, setLoadingPortfolioItems] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [editItemId, setEditItemId] = useState('');
  const [editTitle, setEditTitle] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [editFileURL, setEditFileURL] = useState('');
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
    setLoadingPortfolioItems(true);

    try {
      const { data: portfolioItemsList } = await api.get<IPortfolioItemData[]>('/portfolio-items');

      setPortfolioItems(portfolioItemsList);
    } catch (err) {
      console.log(err);
    }

    setLoadingPortfolioItems(false);
  }, []);

  // Mostrar ou esconder o item do portfólio
  const toggleShowModal = useCallback(() => {
    // Verificando se está fechando o modal
    if (modalIsOpen) {
      // Limpando os dados padrão
      setEditItemId('');
      setEditTitle('');
      setEditDescription('');
      setEditFileURL('');
    }

    // Alterando o estado atual do modal
    setModalIsOpen(!modalIsOpen);
  }, [modalIsOpen]);

  // Cadastrando/Editando um item no portfólio
  const handleSubmitPortfolioItem = useCallback(async (data) => {
    try {
      // Verificando se a imagem foi adicionada
      if (!selectedImage && !editFileURL) {
        alert('Adicione uma imagem!');

        return;
      }
      setLoadingItem(true);

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
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      if (editItemId) {
        // Atualizando o item no portfólio
        await api.put(`/portfolio-items/${editItemId}`, formData);
      } else {
        // Cadastrando o item no portfólio
        await api.post('/portfolio-items', formData);
      }

      // Recarregando a listagem dos itens cadastrados no portfólio
      handleLoadPortfolioItems();

      // Limpando os dados padrão
      setEditItemId('');
      setEditTitle('');
      setEditDescription('');
      setEditFileURL('');

      // Fechando o popup
      toggleShowModal();
    } catch (error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        if (formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }

    setLoadingItem(false);
  }, [editItemId, selectedImage, editFileURL, toggleShowModal, handleLoadPortfolioItems]);

  // Quando selecionar um item para editar
  const handleGetItemDataToEdit = useCallback(async (id: string) => {
    setLoadingItem(true);

    // Buscando o item cadastrado
    const { data: portfolioItemData } = await api.get<IPortfolioItemData>(`/portfolio-items/${id}`);

    if (portfolioItemData) {
      // Caso tenha encontrado o item, salvando os seus dados
      setEditItemId(portfolioItemData.id);
      setEditTitle(portfolioItemData.title);
      setEditDescription(portfolioItemData.description);
      setEditFileURL(`http://localhost:3333/files/${portfolioItemData.image_reference}`);

      // Abrindo o popup para atualizar o item
      toggleShowModal();
    }

    setLoadingItem(false);
  }, [toggleShowModal]);

  // Apagar um item do portfólio
  const handleDeleteItem = useCallback(async (id: string) => {
    // Verificando se o usuário realmente deseja apagar o item
    const response = confirm('Você realmente deseja apagar o item?');

    if (!response) {
      return;
    }

    // Enviando a requisição para apagar o item
    await api.delete(`/portfolio-items/${id}`);

    // Recarregando a lista de itens do portfólio
    handleLoadPortfolioItems();
  }, [handleLoadPortfolioItems]);

  return (
    <Container onLoad={handleLoadPortfolioItems}>
      <nav>
        <div id="nav-logo-area">
          <img src={Logo} alt="Planejados Inteligentes" />
        </div>

        <div id="nav-button">
          {
            user ? (
              <>
                <Button
                  name="Adicionar item"
                  size="small"
                  color="white"
                  onClick={toggleShowModal}
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
          loadingPortfolioItems
            ? <Loading />
            : portfolioItems.length > 0
              ? portfolioItems.map(portfolioItem => (
                <PortfolioItem
                  id={portfolioItem.id}
                  key={portfolioItem.id}
                  title={portfolioItem.title}
                  description={portfolioItem.description}
                  imageUrl={`http://localhost:3333/files/${portfolioItem.image_reference}`}
                  onClickToEdit={user && user.user_type === 'admin' ? handleGetItemDataToEdit : () => {/**/ }}
                  onClickToDelete={user && user.user_type === 'admin' ? handleDeleteItem : () => {/**/ }}
                  adminAuthenticated={user && user.user_type === 'admin'}
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
            defaultValue={editTitle}
          />

          <Input
            label="Descrição"
            name="description"
            placeholder="Descreva o móvel"
            defaultValue={editDescription}
          />

          <AddImageInput
            setSelectedImage={setSelectedImage}
            defaultFileURL={editFileURL}
          />

          <Button
            name="Adicionar"
            type="submit"
          />

          <div className="modal-space-divisor" />

          <Button
            name="Fechar"
            onClick={toggleShowModal}
            color="white"
            size="small"
          />
        </Form>
      </ModalView>

      <ModalView title="" isOpen={loadingItem} zIndex={2}>
        <Loading />
      </ModalView>
    </Container>
  );
}

export default Portfolio;
