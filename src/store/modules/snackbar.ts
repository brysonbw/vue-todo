import { Snackbar, SnackbarState } from '@/types/snackbar';

/** Snackbar Module */

export const state = {
  snackbar: {
    show: false,
    message: '',
    color: '',
  },
};

// MUTATIONS //
export const mutations = {
  SET_SNACKBAR(state: SnackbarState, payload: Snackbar) {
    if (payload) {
      return (state.snackbar = {
        show: payload.show,
        message: payload.message,
        color: payload.color,
      });
    }
    return state.snackbar;
  },
};

// GETTERS //
export const getters = {
  snackbar(state: SnackbarState) {
    return state.snackbar;
  },
};
