import React, { createContext, useCallback, useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';

import api from '../services/api';

export interface IAuthUser {
  id: string;
  user_type: 'admin' | 'assembler';
  name: string;
  username: string;
  cellphone?: string;
}

interface ISectionData {
  token: string;
  user: IAuthUser;
}

interface ILoginCredentials {
  username: string;
  password: string;
}

interface IAuthContext {
  user: IAuthUser;
  login(credentials: ILoginCredentials): Promise<void>;
  logout(): void;
}

// Criando e exportando o contexto de autenticação com o valor inicial vazio
export const AuthContext = createContext<IAuthContext>({} as IAuthContext);

// Criando e exportando o provedor do contexto de autenticação
export const AuthProvider: React.FC = ({ children }) => {
  const history = useHistory();

  // Criando e armazenando os dados de autenticação presentes no local storage dentro da variável "data"
  const [data, setData] = useState<ISectionData>(() => {
    // Buscando os dados salvos no local storage
    const token = localStorage.getItem('@PI-Plan:token');
    const user = localStorage.getItem('@PI-Plan:user');

    // Verificando se existe os dados salvos no localstorage
    if(token && user) {
      // Salvando o token de autenticação no cabeçalho da requisição e retornando os dados para a variável
      api.defaults.headers.common.authorization = `Bearer ${token}`;

      return { token, user: JSON.parse(user) };
    }

    // Caso não tenha nada salvo, retornando um objeto vazio
    return {} as ISectionData;
  });

  // Função para conectar o usuário no sistema com base no username e no password
  const login = useCallback(async ({ username, password }: ILoginCredentials) => {
    // Realizando a requisição de autenticação no backend
    const response = await api.post<ISectionData>('/sections', {
      username,
      password,
    });

    // Salvando os dados obtidos dentro do local storage
    localStorage.setItem('@PI-Plan:token', response.data.token);
    localStorage.setItem('@PI-Plan:user', JSON.stringify(response.data.user));

    // Atualizando a variável "data" com os dados obtidos no retorno da requisição
    setData(response.data);

    // Enviando o usuário para sua respectiva página inicial
    response.data.user.user_type === 'admin'
      ? history.push('/dashboard')
      : history.push('/orders-list');
  }, []);

  // Função para desconectar o usuário do sistema
  const logout = useCallback(() => {
    // Apagando os dados salvos no local storage
    localStorage.removeItem('@PI-Plan:token');
    localStorage.removeItem('@PI-Plan:user');

    // Limpando a variável "data"
    setData({} as ISectionData);
  }, []);

  return (
    <AuthContext.Provider value={{ user: data.user, login, logout }}>
      { children }
    </AuthContext.Provider>
  );
}

// Exportando uma função que retorna os dados do contexto de autenticação
export const useAuth = (): IAuthContext => {
  const context = useContext(AuthContext);

  return context;
}
