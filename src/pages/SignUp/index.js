import React, { useCallback, useState } from 'react';
import { toast } from 'react-toastify';

import * as Yup from 'yup';

import { AiOutlineUserAdd } from 'react-icons/ai';
import { Container, Form, Button, Spinner } from 'react-bootstrap';

import api from '../../services/api';

const schema = Yup.object().shape({
  name: Yup.string()
    .min(2)
    .required(),
  email: Yup.string()
    .email()
    .required('Campo email é obrigatório'),
  password: Yup.string()
    .min(6, 'Senha incorreta')
    .required('Campo de senha é obrigatório'),
});

export default function SignIn() {
  const [loading, setLoading] = useState(false);

  const handleSubmit = useCallback(async () => {
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const createUser = async user => {
      try {
        setLoading(true);
        const response = await api.post('user/create', user);
        setLoading(false);
        const { err, success } = response.data;

        if (err) {
          toast.error(err);
        }

        if (success) {
          toast.success(success);
        }
      } catch (error) {
        toast.error('Erro ao processar cadastro');
      }
    };

    schema
      .isValid({ name, email, password })
      .then(() => {
        const user = { name, email, password };
        createUser(user);
      })
      .catch(() => {
        toast.error('Por favor, verifique os campos');
      });
  }, []);

  return (
    <>
      {/* <img src={logo} alt="whatsapp-logo" /> */}
      <Container style={{ marginTop: '4rem', maxWidth: '480px' }}>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <AiOutlineUserAdd size={70} />
        </div>

        <br />
        <br />

        <Form>
          <Form.Group>
            <Form.Label>
              <strong>Nome</strong>
            </Form.Label>
            <Form.Control
              id="name"
              name="name"
              type="text"
              placeholder="Seu nome"
            />
          </Form.Group>

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
            Cadastrar
          </Button>
        </Form>
      </Container>
    </>
  );
}
