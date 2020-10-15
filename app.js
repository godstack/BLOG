const express = require('express');
const config = require('config');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const path = require('path');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);

function getSocketIo() {
  return io;
}

module.exports.getSocketIo = getSocketIo;

app.set('trust proxy', 1);

const PORT = process.env.PORT || config.get('port') || 5000;

app.disable('x-powered-by');

app.use(express.json({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const mongoDBstore = new MongoDBStore({
  uri: config.get('mongoUri'),
  collection: 'mySessions'
});

const SESS_LIFETIME = 1000 * 60 * 60 * 2;

app.use(
  session({
    name: config.get('SESS_NAME'),
    secret: config.get('SESS_SECRET'),
    saveUninitialized: false,
    resave: false,
    store: mongoDBstore,
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: SESS_LIFETIME
    }
  })
);

app.use('/api/auth/', require('./routes/auth.routes'));
app.use('/api/post/', require('./routes/post.routes'));
app.use('/api/user/', require('./routes/user.routes'));
app.use('/api/home/', require('./routes/home.routes'));
app.use('/api/settings/', require('./routes/settings.routes'));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
  });
}

async function start() {
  try {
    await mongoose.connect(config.get('mongoUri'), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true
    });

    server.listen(PORT, () => {
      console.log(`App has been started on port ${PORT}...`);
    });

    io.on('connection', socket => {
      console.log('connected successfully', socket.id);

      socket.on('customize own room', username => {
        socket.join(username);
      });

      socket.on('subscription', (aimUsername, authUsername, type) => {
        socket.to(aimUsername).emit('subscription', authUsername, type);
      });

      socket.on('add post', post => {
        console.log(post);
        socket.broadcast.emit('add post', post);
      });

      socket.on('delete post', postId =>
        socket.broadcast.emit('delete post', postId)
      );

      socket.on('edit post', post => socket.broadcast.emit('edit post', post));
    });
  } catch (e) {
    console.log('Server error', e.message);
    process.exit(1);
  }
}

start();
