import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { FiLogIn } from 'react-icons/fi';
import { Container, Form, Button, Spinner } from 'react-bootstrap';
import { signInRequest } from '../../store/modules/auth/actions';

const schema = Yup.object().shape({
  email: Yup.string().required('Campo email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha incorreta')
    .required('Campo de senha é obrigatório'),
});

export default function SignIn() {
  const dispatch = useDispatch();
  const loading = useSelector(state => state.auth.loading);

  const handleSubmit = useCallback(() => {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    schema
      .isValid({ email, password })
      .then(() => {
        dispatch(signInRequest(email, password));
      })
      .catch(() => {
        toast.error('Por favor, verifique os campos');
      });
  }, [dispatch]);

  return (
    <>
      {/* <img src={logo} alt="whatsapp-logo" /> */}
      <Container style={{ marginTop: '4rem', maxWidth: '480px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <FiLogIn size={70} />
        </div>

        <br />
        <br />

        <Form>
          <Form.Group>
            <Form.Label>
              <strong>Email</strong>
            </Form.Label>
            <Form.Control
              id="email"
              name="email"
              type="email"
              placeholder="Seu e-mail"
            />
          </Form.Group>

          <br />

          <Form.Group>
            <Form.Label>
              <strong>Senha</strong>
            </Form.Label>
            <Form.Control
              id="password"
              name="password"
              type="password"
              placeholder="Sua senha"
            />
          </Form.Group>

          <br />

          <Button
            variant="success"
            type="button"
            block
            onClick={() => handleSubmit()}
          >
            {loading && (
              <Spinner
                as="span"
                animation="border"
                size="sm"
                role="status"
                aria-hidden="true"
              />
            )}
            Entrar
          </Button>
        </Form>
      </Container>
    </>
  );
}
