const sessionizeUser = user => {
  return { userId: user.id };
};

module.exports = sessionizeUser;
