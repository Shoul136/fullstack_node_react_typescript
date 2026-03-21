import request from 'supertest'
import server, { connectDB } from '../server.js'
import db from '../config/db.js'
import { jest } from '@jest/globals'

describe('GET /api', () => {
    it('should send back a json response', async () => {
        const res = await request(server).get('/api')        
        expect(res.status).toBe(200)
        expect(res.header['content-type']).toMatch(/json/) // Verifica si existe en el string json > application/json : Existe
        expect(res.body.msg).toBe('Desde API')

        expect(res.status).not.toBe(404)
        expect(res.body.msg).not.toBe('desde api')
    })
})

jest.mock('../config/db.js')
describe('connectDB', () => {
    it('should handle database connection error', async() => {
        jest.spyOn(db, 'authenticate')
            .mockRejectedValueOnce(new Error('Hubo un error al conectar la BD')) // spyOn creara una funcion para ver el comportamiento de autentificacion [object, string]
        const consoleSpy = jest.spyOn(console, 'log')
            
        await connectDB()

        expect(consoleSpy).toHaveBeenCalledWith(
            expect.stringContaining('Hubo un error al conectar la BD')
        )
    })
})