require('dotenv').config()
import express, { Request, Response, NextFunction, ErrorRequestHandler } from 'express'
import cors from 'cors'
import { GetCompanies, FilterCompanies } from './src/controllers/company'

const app = express()

const { PORT = 5000 } = process.env

app.use(cors())

app.use(express.json())

app.get('/health', (req: Request, res: Response) => {
	res.json({ message: 'Alive and well, thanks for asking ! :)' })
})

app.get('/companies', GetCompanies)
app.post('/filter-companies', FilterCompanies)

app.use((err: ErrorRequestHandler, req: Request, res: Response) => {
	console.log('ERROR: ', err)
	return res.status(500).json({ success: false, error: `Something went wrong. Please try again later.` })
})

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`))
