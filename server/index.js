'use strict'

import app from './app'
import chalk from 'chalk'
import http from 'http'
import SocketIO from 'socket.io'

import 'dotenv/config'

const port = process.env.PORT
const message = process.env.MESSAGE

const server = http.Server(app)
const io = new SocketIO(server)

io.on('connection', socket => {
    socket.on('ALL_EVENTS', res => {  
        io.emit('ALL_EVENTS', res)               
    })
})

server.listen(port, () => {
    console.log(chalk.blue(`${message} ${port}`))
})
