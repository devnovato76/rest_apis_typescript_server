import {Router} from 'express';
import {body, param} from 'express-validator'
import { createProduct, deleteProduct, getProductById, getProducts, updateAvailability, updateProduct } from './handlers/product';
import { handleInputErrors } from './middleware';
import { json } from 'sequelize';

const router = Router();
// Routing
/**
 * @swagger
 * components: 
 *      schemas:
 *          Product:
 *              type: object
 *              properties:
 *                  id:
 *                      type: integer
 *                      description: Producto ID
 *                      ejemplo: 1
 *                  name:
 *                      type: string
 *                      description: Producto name
 *                      ejemplo: Monitor Curvo de 49 Pulgadas
 *                  price:
 *                      type: number
 *                      description: Producto price
 *                      ejemplo: 300
 *                  availability:
 *                      type: boolean
 *                      description: Producto disponibilidad
 *                      ejemplo: true
 */

/** 
 * @swagger
 * /api/products:
 *      get:
 *         summary: Listar productos
 *         tags: 
 *             - Products
 *         description: Retorna una lista de Productos
 *         responses:
 *             200:
 *                 description: Respuesta Exitosa
 *                 content:
 *                    application/json:
 *                        schema:
 *                            type: array
 *                            items:
 *                              $ref: '#/components/schemas/Product'
*/
router.get("/", getProducts);


/**
 * @swagger
 * /api/products/{id}:
 *  get:
 *      summary: Devuelve un producto por ID
 *      tags:
 *          - Products
 *      description: Retorna un producto basado en su ID unico
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a recuperar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Respuesta Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          404:
 *              description: Producto Not found
 *          400:
 *              description: Bad Request - ID NO válido
 */


router.get(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  getProductById
);

/**
 * @swagger
 * /api/products:
 *  post:
 *      summary: Crea un nuevo producto
 *      tags:
 *          - Products
 *      description: Devuelve un nuevo registro en la base de datos
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              ejemplo: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              ejemplo: 399
 *      responses:
 *          201:
 *              description: Respuesta Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - Datos de entrada no válidos
 * 
*/

router.post("/",
  // Validación 
    body('name').notEmpty()
    .withMessage('El nombre del Producto no puede ir vacío'),

    body('price')
      .isNumeric().withMessage('valor no válido')
      .notEmpty().withMessage('El precio del Producto no puede ir vacío')
      .custom(value => value > 0).withMessage('El precio no es válido'),
      handleInputErrors,
      createProduct
);
/**
 * @swagger
 * /api/products/{id}:  
 *  put:
 *      summary: Actualiza un producto con entrada del usuario
 *      tags:
 *          - Products
 *      description: Retorna el producto actualizado
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a recuperar
 *          required: true
 *          schema:
 *              type: integer
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      type: object
 *                      properties:
 *                          name:
 *                              type: string
 *                              example: "Monitor Curvo 49 Pulgadas"
 *                          price:
 *                              type: number
 *                              example: 399
 *                          availability:
 *                              type: boolean
 *                              example: true
 *      responses:
 *          200:
 *              description: Respuesta Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - ID No válida o data No válida
 *          404:
 *              description: Producto Not Found
 */
router.put(
  "/:id",
  // Validación
  param("id").isInt().withMessage("ID no válido"),
  body("name")
    .notEmpty()
    .withMessage("El nombre del Producto no puede ir vacío"),

  body("price")
    .isNumeric()
    .withMessage("Valor no válido")
    .notEmpty()
    .withMessage("El precio del Producto no puede ir vacío")
    .custom((value) => value > 0)
    .withMessage("El precio no es válido"),
  body("availability")
    .isBoolean()
    .withMessage("Valor para disponibilidad no válido"),
  handleInputErrors,
  updateProduct
);

/**
 * @swagger
 * /api/products/{id}:
 *  patch:
 *      summary: Actualizar Producto disponible
 *      tags: 
 *          - Products
 *      description: Retorna la disponibilidad actualizada
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a recuperar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Respuesta Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Product'
 *          400:
 *              description: Bad Request - ID No válida
 *          404:
 *              description: Producto Not Found
 */

router.patch(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  updateAvailability
);


/**
 * @swagger
 * /api/products/{id}:
 *  delete:
 *      summary: Elimina un producto por un ID determinado
 *      tags: 
 *          - Products
 *      description: Devuelve un mensaje de confirmación
 *      parameters:
 *        - in: path
 *          name: id
 *          description: El ID del producto a eliminar
 *          required: true
 *          schema:
 *              type: integer
 *      responses:
 *          200:
 *              description: Respuesta Exitosa
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: string
 *                          value: 'Producto Eliminado'
 *          400:
 *              description: Bad Request - ID No válida
 *          404:
 *              description: Producto Not Found
 */

router.delete(
  "/:id",
  param("id").isInt().withMessage("ID no válido"),
  handleInputErrors,
  deleteProduct
);

export default router;