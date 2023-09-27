module.exports = function ValitadionError(message) {
  this.name = 'ValidationError';
  this.message = message;
};
