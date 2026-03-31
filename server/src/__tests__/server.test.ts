import { connectDB } from '../server.js'
import db from '../config/db.js'
import { jest } from '@jest/globals'

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