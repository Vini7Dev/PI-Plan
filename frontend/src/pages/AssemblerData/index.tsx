import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { Form } from '@unform/web';
import { FormHandles } from '@unform/core';
import * as Yup from 'yup';

import api from '../../services/api';
import getValidationErrors from '../../utils/validationErrors';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Header from '../../components/Header';

interface IAssemblerProps {
  id: string;
  name: string;
  username: string;
  password: string;
  cellphone: string;
}

// Página para criar um montador ou apresentar os seus dados
const AssemblerData: React.FC = () =>{
  const location = useLocation();
  const history = useHistory();
  const formRef = useRef<FormHandles>(null);
  const [userData, setUserData] = useState<IAssemblerProps>({} as IAssemblerProps);
  const [userId, setUserId] = useState('');

  // Caso exista o id do montador na rota, buscar os seus dados no banco de dados
  useEffect(() => {
    const loadUserData = async () => {
      const userIdFromPath = location.pathname.split('/assembler-data/')[1];

      // Caso exista o id, buscando os dados do usuário
      if(userIdFromPath) {
        // Buscando os dados
        const { data: userDataResponse } = await api.get<IAssemblerProps>(`/assemblers/${userIdFromPath}`);

        // Salvando os dados do usuário
        setUserData(userDataResponse);
        setUserId(userIdFromPath);
      } else {
        setUserData({} as IAssemblerProps);
      }
    }

    loadUserData();
  }, [location]);

  // Função para criar um montador ou atualizar os seus dados
  const handleSubmitAdmData = useCallback(async (data) =>{
    try {
      // Verificando se está atualizando os dados ou criando um novo usuário
      if(userId) {
        // Verificando se vai atualizar a senha
        if(data.new_password && data.new_password !== data.confirm_password) {
          alert('A senha não foi confirmada corretamente!');

          return;
        }

        // Criando o modelo para validação do formulário
        const shape = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório!'),
          cellphone: Yup.string().max(15, 'Informe no máximo os 15 números!').required('O telefone é obrigatório!'),
          username: Yup.string().max(30, 'Informe no máximo 30 letras!').required('O usuário é obrigatório!'),
          new_password: Yup.string(),
          current_password: Yup.string().min(6, 'Informe no mínimo 6 letras!').required('A senha atual é obrigatória!'),
        });

        // Criando o objeto com os dados do usuário à atualizar
        const userDataToUpdate = {
          name: data.name,
          cellphone: data.cellphone,
          username: data.username,
          new_password: data.new_password || undefined,
          current_password: data.current_password,
        };

        console.log(userDataToUpdate);

        // Validando os dados
        await shape.validate(userDataToUpdate, { abortEarly: false });

        // Enviando os dados ao backend
        await api.put(`/assemblers/${userId}`, userDataToUpdate);
      } else {
        // Verificando se a confirmação de senha está correta
        if(data.password !== data.confirm_password) {
          alert('A senha não foi confirmada corretamente!');

          return;
        }

        // Criando o modelo para validação do formulário
        const shape = Yup.object().shape({
          name: Yup.string().required('O nome é obrigatório!'),
          cellphone: Yup.string().max(15, 'Informe no máximo os 15 números!').required('O telefone é obrigatório!'),
          username: Yup.string().max(30, 'Informe no máximo 30 letras!').required('O usuário é obrigatório!'),
          password: Yup.string().min(6, 'Informe no mínimo 6 letras!').required('A senha é obrigatória!'),
        });

        // Criando o objeto com os dados do usuário à atualizar
        const userDataToCreate = {
          name: data.name,
          cellphone: data.cellphone,
          username: data.username,
          password: data.password,
        };

        // Validando os dados
        await shape.validate(userDataToCreate, { abortEarly: false });

        // Enviando os dados ao backend
        await api.post('/assemblers', userDataToCreate);
      }

      // Enviando o usuário para a tela de listagem
      history.push('/users-list');
    } catch(error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if(error instanceof Yup.ValidationError){
        const errors = getValidationErrors(error);

        if(formRef.current) {
          formRef.current.setErrors(errors);
        }
      }
    }
  },[history, userId]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar optionSelected={1} />
      </div>

      <main id="form-area">
        <Header title="Cadastro de Montador" />

        <Form ref={formRef} onSubmit={handleSubmitAdmData}>
          <div id="user-type-buttons-area">
            <div className="user-type-button">
              <Link to="/adm-data/">
                <Button name="Administrador" color="brown" active={false} />
              </Link>
            </div>
            <div className="user-type-button">
              <Button name="Montador" />
            </div>
          </div>

          <Input
            autoFocus
            label="Nome"
            name="name"
            placeholder="Digíte o Nome"
            defaultValue={userData.name}
          />

          <Input
            label="Usuário"
            name="username"
            placeholder="Digíte o Usuário"
            defaultValue={userData.username}
          />

          <Input
              label="Telefone"
              name="cellphone"
              placeholder="(99) XXXXX-XXXX"
              defaultValue={userData.cellphone}
          />

          <Input
          label="Senha Atual"
          name="current_password"
          placeholder="Informe a Senha Atual"
          type="password"
          hidden={!userId}
          />

          <Input
          label={userId ? 'Nova Senha' : 'Senha'}
          name={userId ? 'new_password': 'password'}
          placeholder={userId ? 'Digíte a Nova Senha' : 'Digíte a Senha'}
          type="password"
          />

          <Input
          label="Confirme a Senha"
          name="confirm_password"
          placeholder="Digíte a Senha Novamente"
          type="password"
          />

          <Button name="Cadastrar" type="submit" />
        </Form>
      </main>
    </Container>
  );
};

export default AssemblerData;
