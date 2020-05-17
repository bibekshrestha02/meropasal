module.exports = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((error) =>
      res.status(200).json({
        status: false,
        error,
      })
    );
  };
};
