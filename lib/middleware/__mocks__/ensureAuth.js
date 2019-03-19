module.exports = () => (req, res, next) => {
  req.user = {
    email: '123456@email.com'
  };

  next();
};
