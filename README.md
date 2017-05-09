# Debugging express-socket.io-session

```
npm install
```

```
node index.js
```

Go to `localhost:3000`

## Expected Logging:

```
data: ['connection']
(click "Login" in browser)
data: ['connection', 'login']
(click "Route" in browser)
data: ['connection', 'login', 'route']
```

## Actual Logging:

```
data: ['connection']
(click "Login" in browser)
data: ['connection', 'login']
(click "Route" in browser)
data: ['route']
```
