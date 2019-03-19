module.exports = () => (req, res, next) => {
  req.user = {
    user_id: '123456'
  };

  next();
};
