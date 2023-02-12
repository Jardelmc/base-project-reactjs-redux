import { takeLatest, call, put, all } from 'redux-saga/effects';
import { toast } from 'react-toastify';

import { signInSuccess, signFailure } from './actions';

import api from '../../../services/api';
import history from '../../../services/history';

export function* signIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.srvCadastroApi.post, 'sessions', { email, password });

    const { success, err } = response.data;    

    if (err) {
      toast.error(err);
      yield put(signFailure());
      return;
    }
    if (success) {
      const { token } = success
      api.srvCadastroApi.defaults.headers.Authorization = `Bearer ${token}`;

      yield put(signInSuccess(token, email));

      history.push('/inicio');
      return;
    }

    toast.error('Erro ao fazer login');
    yield put(signFailure());
  } catch (error) {
    toast.error('Erro ao fazer login');
    yield put(signFailure());
  }
}

export function setToken({ payload }) {
  if (!payload) return;

  const { token } = payload.auth;

  if (token) {
    api.srvCadastroApi.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('persist/REHYDRATE', setToken),

  takeLatest('@auth/SIGN_IN_REQUEST', signIn),
]);
