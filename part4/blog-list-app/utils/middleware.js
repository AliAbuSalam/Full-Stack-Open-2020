const morgan = require('morgan');

const errorHandler = (error, request, response, next) => {
  if(error.name === 'ValidationError'){
    response.status(400).send({ error: error.message });
  }
  if(error.name === 'passwordError'){
    response.status(400).send({
      error: 'Password invalid. Password must be at least 3 characters long and cannot be empty.'
    });
  }
  if(error.message.startsWith('E11000')){
    response.status(500).send({
      error: 'Username is already exist. Please use another username'
    });
  }
  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get('authorization');
  if(authorization && authorization.toLowerCase().startsWith('bearer')){
    request.token = authorization.substring(7);
  }
  next();
};

morgan.token('logger', (tokens, req, res) => {
  return [
    '\n-------------\n',
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    JSON.stringify(req.body),
    '\n-------------\n'
  ].join(' ');
});

module.exports = {
  errorHandler,
  tokenExtractor,
  morgan
};