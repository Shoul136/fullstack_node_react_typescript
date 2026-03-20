import { Request, Response } from "express";
import Product from "../models/Product.model.js";
import { parse } from "dotenv";

export const getProducts = async (req: Request, res: Response) => {
    try {
        const products = await Product.findAll({
            order: [
                ['id', 'DESC']
            ],
            attributes: { exclude: ['createdAt', 'updatedAt', 'availability'] }
        })
        res.json({ data: products })
    } catch (error) {
        console.log(error)
    }
}

export const getProductById = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id)
        const product = await Product.findByPk(id)

        if (!product)
            return res.status(404).json({ error: 'Producto no encontrado' })
        res.json({ data: product })
    } catch (error) {
        console.log(error)
    }
}

export const createProduct = async (req: Request, res: Response) => {

    /*
    -- Forma 1 de guardar datos --
    const product = new Product(req.body)
    const savedProduct = await product.save()
    
    */

    // Validacion
    /*
    await check('name').notEmpty().withMessage('El nombre del Producto no puede ir vacio').run(req)
    await check('price')
        .isNumeric().withMessage('Valor no válido')
        .notEmpty().withMessage('El precio del Producto no puede ir vacio')
        .custom(value => value > 0).withMessage('Precio no válido')
        .run(req)        
    */

    try {
        const product = await Product.create(req.body)
        res.json({ data: product });
    } catch (error) {
        console.log(error)
    }

}

export const updateProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await Product.findByPk(id)

    if (!product)
        return res.status(404).json({ error: 'Producto no encontrado' })
    
    await product.update(req.body)    
    await product.save()
    res.json({ data: product })
}

export const updateAvailability = async(req: Request, res: Response) =>{
    const id = Number(req.params.id)
    const product = await Product.findByPk(id)

    if (!product)
        return res.status(404).json({ error: 'Producto no encontrado' })
    
    product.availability = !product.dataValues.availability;   
    await product.save()
    res.json({ data: product })
}

export const deleteProduct = async (req: Request, res: Response) => {
    const id = Number(req.params.id)
    const product = await Product.findByPk(id)

    if (!product)
        return res.status(404).json({ error: 'Producto no encontrado' })

    await product.destroy()
    res.json({data: 'Producto Eliminado'})
}

