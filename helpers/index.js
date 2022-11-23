function createNotFoundHttpError() {
  const err = new Error('Not Found');
  err.status = 404;
  return err;
}

function createConflictError() {
  const err = new Error('Email in use');
  err.status = 409;
  return err;
}

function createUnauthorizedError() {
  const err = new Error('Email or password is wrong');
  err.status = 401;
  return err;
}

function createUnauthorizedTokenError(text) {
  const err = new Error(text);
  err.status = 401;
  return err;
}

module.exports = {
  createConflictError,
  createUnauthorizedError,
  createUnauthorizedTokenError,
  createNotFoundHttpError,
};
