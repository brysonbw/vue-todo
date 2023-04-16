export type Snackbar = {
  show: false;
  message?: string;
  color?: string;
};

export type SnackbarState = {
  snackbar: Snackbar;
};
