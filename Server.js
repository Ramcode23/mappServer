const express= require('express');
const cors= require('cors');
require('dotenv').config();
const app= express();
const http= require('http');
const server=http.createServer(app);
app.use(cors());

const PORT=process.env.PORT ;
 const io = require('socket.io')(server,{
cors: {
    origin: ['http://localhost:4200']
}

 });

app.use(express.static('public'));


 io.on('connection', (socket) => {

    socket.on('find-driver', (points) => {
        console.log('......', points);

        const counter = setInterval(() => {
            const coords = points.shift();
            if (!coords) {
                clearInterval(counter)
            } else {
                socket.emit('position', coords);
                console.log('position actual',coords)
            }
        }, 1000) 
    })

      socket.on('disconnect', () => {
        console.log('a user disconnected!');
      });

})
server.listen(process.env.PORT,()=>{
    console.log('Server is running on port'+process.env.PORT);
})
