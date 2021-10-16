import React, { useState, useCallback, useEffect } from 'react';
import { useLocation, useHistory, Link } from 'react-router-dom';
import { Container } from './styles';

import NavigationBar from '../../components/NavigationBar';
import Input from '../../components/Input';
import Button from '../../components/Button';
import NavigationButton from '../../components/NavigationBar/NavigationButton';
import Header from '../../components/Header';

interface IAssemblerProps {
  id: number;
  name: string;
  username: string;
  password: string;
  cellphone: boolean;
}

const AssemblerData: React.FC = () =>{
  const location = useLocation();
  const history = useHistory();
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [cellphone, setCellphone] = useState('');

  useEffect(() => {
    const userId = location.pathname.split('/assembler-data/')[1];

    if(userId) {
      const request = new XMLHttpRequest();

      request.open('GET', `http://localhost:8080/assemblers/${userId}`, true);

      request.onload = function() {
        if(this.response) {
          const userData = JSON.parse(this.response);

          setName(userData.name);
          setUsername(userData.username);
          setPassword(userData.password);
          setCellphone(userData.cellphone);
        }
      }

      request.send();
    }
  }, [location]);

  const handleSubmitAdmData = useCallback(function(){
    // const userId = location.pathname.split('/assembler-data/')[1];
  },[]);

  return(
    <Container>
      <div id="navigation-area">
        <NavigationBar>
          <NavigationButton text="Página Inicial" toPage="/dashboard" />
          <NavigationButton text="Usuários" toPage="/users-list" id="nav-link-selected" />
          <NavigationButton text="Clientes" toPage="/customers-list" />
          <NavigationButton text="Pedidos" toPage="/orders-list" />
          <NavigationButton text="Portfólio" toPage="/" />
          <NavigationButton text="Sair" toPage="/" />
        </NavigationBar>
      </div>

      <main id="form-area">
        <Header title="Cadastro de Montador" />

        <form>
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
          placeholder="Digíte o Nome"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          />

          <Input
          label="Usuário"
          placeholder="Digíte o Usuário"
          defaultValue={username}
          onChange={(e) => setUsername(e.target.value)}
          />

          <Input
            label="Telefone"
            placeholder="(99) XXXXX-XXXX"
            defaultValue={cellphone}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Input
          label="Senha"
          placeholder="Digíte a Senha"
          type="password"
          defaultValue={password}
          onChange={(e) => setPassword(e.target.value)}
          />

          <Input
          label="Confirme a Senha"
          placeholder="Digíte a Senha Novamente"
          type="password"
          onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Button name="Cadastrar" onClick={handleSubmitAdmData} />
        </form>
      </main>
    </Container>
  );
};

export default AssemblerData;
