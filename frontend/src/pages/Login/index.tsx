import React, { useCallback, useRef, useState } from 'react';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';

import getValidationErrors from '../../utils/getValidationErrors';
import { useAuth } from '../../contexts/Authentication';
import { Container } from './styles';

import Logo from '../../assets/images/PI_Plan_Ligth.png';

import Loading from '../../components/Loading';
import ModalView from '../../components/ModalView';
import Input from '../../components/Input';
import Button from '../../components/Button';

// Página de login do sistema
const Login: React.FC = () => {
  const { login } = useAuth();
  const formRef = useRef<FormHandles>(null);
  const [loading, setLoading] = useState(false);

  // Função para realizar o login no sistema
  const handleLogin = useCallback(async (data) => {
    setLoading(true);

    try {
      // Definindo o esquema para a validação do formulário
      const schema = Yup.object().shape({
        username: Yup.string().required('O usuário é obrgatório!').max(30, 'Máximo de 30 letrar!'),
        password: Yup.string().required('A senha é obrigatória!').min(6, 'Mínimo de 6 letras!'),
      });

      // Validando o formulário
      await schema.validate(data, { abortEarly: false });

      setLoading(false);

      // Executando a função para iniciar a sessão enviando o username e password obtidos no formulário
      await login({
        username: data.username,
        password: data.password,
      });
    } catch (error) {
      // Caso o erro for relacionado com a validação, montar uma lista com os erros e aplicar no formulário
      if (error instanceof Yup.ValidationError) {
        const errors = getValidationErrors(error);

        if (formRef.current) {
          formRef.current.setErrors(errors);
        }
      }

      setLoading(false);

      alert('Falha ao realizar o Login!');
    }
  }, [login]);

  return (
    <Container>
      <div id="right-background-image-area">
        <main>
          <img src={Logo} alt="PI Plan" />

          <div id="title">
            <h2>Bem Vindo</h2>
            <h1>Login</h1>
          </div>

          <Form
            onSubmit={handleLogin}
            ref={formRef}
          >
            <Input
              label="Usuario"
              name="username"
              placeholder="Informe o usuário"
              autoFocus
            />

            <Input
              label="Senha"
              name="password"
              type="password"
              placeholder="Informe a senha"
            />

            <Button name="Entrar" type="submit" />
          </Form>
        </main>
      </div>

      <ModalView title="" isOpen={loading}>
        <Loading />
      </ModalView>
    </Container>
  );
};

export default Login;
