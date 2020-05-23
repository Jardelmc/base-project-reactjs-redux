import produce from 'immer';

const INITIAL_STATE = {
  token: null,
  signed: false,
  loading: false,
  email: false,
};

export default function auth(state = INITIAL_STATE, action) {
  switch (action.type) {
    case '@auth/SIGN_IN_REQUEST':
      return produce(state, draft => {
        draft.loading = true;
      });

    case '@auth/SIGN_IN_SUCCESS':
      return produce(state, draft => {
        draft.email = action.payload.email;
        draft.token = action.payload.token;
        draft.signed = true;
        draft.loading = false;
      });

    case '@auth/SIGN_FAILURE':
      return produce(state, draft => {
        draft.loading = false;
      });

    case '@auth/LOGOFF':
      return produce(state, draft => {
        draft.email = false;
        draft.loading = false;
        draft.signed = false;
        draft.admin = false;
        draft.token = null;
      });
    default:
      return state;
  }
}
