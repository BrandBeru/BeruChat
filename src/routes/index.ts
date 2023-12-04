import express, {Express} from 'express'

import usersRouter from './users'
import authRouter from './auth'
import chatRouter from './chat'
import groupRouter from './group'

export default function routerApi(app: Express){
  const router = express.Router()
  app.use('/api/v1', router)
  router.use('/auth', authRouter)
  router.use('/users', usersRouter)
  router.use('/chats', chatRouter)
  router.use('/groups', groupRouter)
}
