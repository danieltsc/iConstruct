# iConstruct app

## Steps to run project

### WITH DOCKER:

```
$ cd ./frontend
$ doker build . -t iconstruct_frontend

$ cd ../backend
$ docker build . -t iconstruct_backend

$ cd ../__dev_resources
$ docker-compose up -d
```

### WITHOUT DOCKER

Open a terminal

```
$ cd frontend
$ npm install
$ npm start
```

Open another terminal

```
$ cd backend
$ npm install
$ npm run serve
```

### !! If you want another mock data, go with the following steps

```
$ cd backend/__mock_db
$ node index.js
```
