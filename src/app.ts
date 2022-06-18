import cors from 'cors'
import express from 'express'
import dotenv from "dotenv";

dotenv.config()
const app = express()

app.use(express.json())
app.use(cors())

app.listen(process.env.PORT || 3003, () => 'server running on port 3003')

export default app

