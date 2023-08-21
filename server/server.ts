const jsonServer = require('json-server');
const server = jsonServer.create();
const router = jsonServer.router('server/db.json');
const middlewares = jsonServer.defaults();
const db = require('./db.json');
const fs = require('fs');
const cors = require('cors')

server.use(middlewares);
server.use(jsonServer.bodyParser);
server.use(cors())

server.post('/login', (req: any, res:any, next:any) => { 
  const users = readUsers();

  const user = users.filter(
    (u:any) => u.username === req.body.username && u.password === req.body.password
  )[0];

  if (user) {
    res.send({ ...formatUser(user)});
  } else {
    res.status(401).send('Incorrect username or password');
  }
});

server.post('/register', (req: any, res: any) => {
  const users = readUsers();
  const user = users.filter((u: any) => u.username === req.body.username)[0];

  if (user === undefined || user === null) {
    res.send({...req.body});
    db.users.push(req.body);
  } else {
    res.status(500).send('User already exists');
  }
});

server.use('/users', (req: any, res: any, next: any) => {
  next()
});

server.use(router);
server.listen(3000, () => {
  console.log('JSON Server is running');
});

function formatUser(user: any) {
  delete user.password;
  user.role = user.username === 'admin'
    ? 'admin'
    : 'user';
  return user;
}

function readUsers() {
  const dbRaw = fs.readFileSync('./server/db.json');  
  const users = JSON.parse(dbRaw).users
  return users;
}