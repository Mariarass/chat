## How to Run the "Chat"
To run the "Chat" project, you'll need to follow a few steps. The project consists of both server-side and client-side components, which need to be started separately.


Application is hosted on a remote server: http://192.34.59.216:3678
## Running the Server-Side Part
- Navigate to the "server" folder.
```bash
npm install
npm run dev
```

## Running the Client-Side Part
- Navigate to the "client" folder.

```bash
npm install
```
By default, the client is connected to a remote server. 
To connect the client to a local server, you need to replace the variable `VITE_API_URL` in the `.env` file from the remote server to the local one.

```bash
#run on desktop using Electron.js
npm run dev
#run only in browser
npm run serve
```


