# Debugging express-socket.io-session

```
npm install
```

```
node index.js
```

Go to `localhost:3000`

## Expected Logging:

```js
console.log('socket.handshake.session') // => data: ['connection']
// (click "Login" in browser)
console.log('socket.handshake.session') // => data: ['connection', 'login']
// (click "Route" in browser)
console.log('req.session') // => data: ['connection', 'login', 'route']
```

## Actual Logging:

```js
console.log('socket.handshake.session') // => data: ['connection']
// (click "Login" in browser)
console.log('socket.handshake.session') // => data: ['connection', 'login']
// (click "Route" in browser)
console.log('req.session') // => data: ['route']
```
