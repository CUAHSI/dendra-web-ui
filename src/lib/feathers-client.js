import feathers from '@feathersjs/feathers'
import socketio from '@feathersjs/socketio-client'
import auth from '@feathersjs/authentication-client'
import io from 'socket.io-client'
import logger from '@dendra-science/console-logger'
import api from '@/lib/api'

logger.info(`Configuring Feathers client: ${api.uri}${api.path}/socket.io`)

const socket = io(api.uri, {
  path: `${api.path}/socket.io`,
  transports: ['websocket']
})

const feathersClient = feathers()
  .configure(socketio(socket))
  .configure(auth({ storage: window.localStorage }))

export default feathersClient
