const ErrDev = (err, res) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    err: err,
    stack: err.stack,
    message: err.message,
  });
};

module.exports = (err, req, res, next) => {
  // if (process.env.NODE_ENV === development) {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
  });
};
