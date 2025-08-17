import express from 'express' 
import cors from 'cors'
import { loggerService } from './src/services/logger.service.js'
import { bugRoutes } from './api/bug/bug.routes.js'
import { userRoutes } from './api/user/user.routes.js'
import cookieParser from 'cookie-parser'

const app = express() 

const corsOptions = {
	origin: [
        'http://127.0.0.1:5173',
        'http://localhost:5173',
        'http://127.0.0.1:5174',
        'http://localhost:5174',
    ],
	credentials: true,
}

app.use(cors(corsOptions))
app.use(express.json())
app.use(cookieParser())
app.use(express.static('public'))


//* Routes
app.use('/api/bug', bugRoutes)
app.use('/api/user', userRoutes)

app.get('/', (req, res) => res.send('Hello there')) 
app.listen(3030, () => console.log('Server ready at http://127.0.0.1:3030/api/bug'))



