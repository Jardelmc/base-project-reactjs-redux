/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/no-this-in-sfc */
import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FiHome, FiLogIn } from 'react-icons/fi';
import { AiOutlineUserAdd } from 'react-icons/ai';

import { logoff } from '../../store/modules/auth/actions';
import { Header } from './styles';

export function HeaderComponentUnsigned() {
  return (
    <Header>
      <nav>
        <Link to="/">
          <FiHome />
          Inicio
        </Link>

        <span>|</span>

        <Link to="/login">
          <FiLogIn />
          Login
        </Link>

        <span>|</span>

        <Link to="/cadastro">
          <AiOutlineUserAdd />
          Cadastrar
        </Link>
      </nav>
    </Header>
  );
}

export function HeaderComponentSigned() {
  const admin = useSelector(state => state.auth.admin);

  const dispatch = useDispatch();
  return (
    <Header>
      <nav>
        <Link to="/">Inicio</Link>

        <span>|</span>
        <button
          type="button"
          style={{ background: 'none', border: 'none' }}
          onClick={() => {
            dispatch(logoff());
            this.location.reload();
          }}
        >
          <a href="/login">Sair</a>
        </button>
      </nav>
    </Header>
  );
}
