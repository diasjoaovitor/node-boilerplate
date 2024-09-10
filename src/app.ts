import './config/alias-config'
import dotenv from 'dotenv'
import { sum } from '@/utils'

dotenv.config()

console.log(sum(1, 2))
console.log(process.env.MY_SECRET_KEY)
