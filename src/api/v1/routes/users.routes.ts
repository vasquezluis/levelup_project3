import { Router } from "express";
import { itemsController } from "../controllers/users.controllers";

// ? authtentications
import { requireAdminAuth } from "../middlewares/adminAuthValidator.middlewares";
import { requireAuth } from "../middlewares/userAuthValidator.middlewares";

// ? body validations
import { schemaValidation } from "../middlewares/schemaValidator.middlewares";
import { CreateMoviesSchema } from "../schemas/movies.schema";

/**
 * * http://localhost:3000/api/v1/users
 */

/**
 * @swagger
 * components:
 *  schemas:
 *    User:
 *      type: object
 *      required:
 *        - name
 *        - lastname
 *        - identification
 *        - phone
 *        - user
 *        - email
 *        - password
 *      properties:
 *        id:
 *          type: string
 *          description: Auto-generated mongoDB id for user
 *        name:
 *          type: string
 *          description: Name of the user
 *        lastname:
 *          type: string
 *          description: Lastname of the user
 *        identification:
 *          type: string
 *          description: Identification ID of the user
 *        phone:
 *          type: string
 *          description: Phone number of the user
 *        credits:
 *          type: integer
 *          description: Quantity of credits of the user
 *        user:
 *          type: string
 *          description: Username of the user
 *        email:
 *          type: string
 *          description: Email of the user
 *        password:
 *          type: string
 *          description: Password of the user
 *        roles:
 *          type: array
 *          description: Roles of the user
 *        permissions:
 *          type: array
 *          description: Permissions of the user
 *      example:
 *        name: Esmeralda maria
 *        lastname: Hernandez Gomes
 *        identification: 1234567891023
 *        phone: 45678952
 *        user: emehe
 *        email: esmehe@gmail.com
 *        password: 456789
 *  securitySchemes:
 *    usersAuth:
 *      type: http
 *      scheme: bearer
 *      bearerFormat: JWT
 *      description: "Token for Bearer, e.g. 'abcde12345'"
 *  parameters:
 *    userId:
 *      in: path
 *      name: id
 *      schema:
 *        type: string
 *      required: true
 *      description: Id of the user
 */

/**
 * @swagger
 * tags:
 *  name: Users
 *  description: API de usuarios
 */

class UsersRoutes {
  public router: Router = Router(); //* router config

  constructor() {
    this.config();
  }

  //* routes config
  config(): void {
    /**
     * @swagger
     * /users/active:
     *   get:
     *     summary: List all active users
     *     tags: [Users]
     *     security:
     *       - usersAuth: []
     *     responses:
     *       200:
     *        description: List all active users
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *               $ref: '#/components/schemas/User'
     *       403:
     *        description: Unauthorized, non-exist, invalid or expired token
     */
    this.router.get(
      "/active",
      requireAdminAuth,
      itemsController.getActiveItems
    );

    /**
     * @swagger
     * /users/{id}:
     *  get:
     *    summary: Get user by id
     *    tags: [Users]
     *    security:
     *      - usersAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *          required: true
     *          description: User id
     *    responses:
     *      200:
     *        description: User data
     *        contens:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      404:
     *        description: User not found
     */
    this.router.get("/:id", requireAuth, itemsController.getItem);

    /**
     * @swagger
     * /users:
     *   get:
     *     summary: List all users
     *     tags: [Users]
     *     security:
     *       - usersAuth: []
     *     responses:
     *       200:
     *        description: List all users
     *        content:
     *          application/json:
     *            schema:
     *              type: array
     *              items:
     *               $ref: '#/components/schemas/User'
     *       403:
     *        description: Unauthorized, non-exist, invalid or expired token
     */
    this.router.get("/", requireAdminAuth, itemsController.getItems);

    /**
     * @swagger
     * /users:
     *  post:
     *    summary: Create a user
     *    tags: [Users]
     *    security:
     *      - usersAuth: []
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/User'
     *    responses:
     *      201:
     *        description: User created succesfully
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      400:
     *        description: Incorrect user data
     *        content:
     *          application/json:
     *            shcema:
     *              $ref: '#/components/schemas/User'
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      409:
     *        description: User already created.
     *        content:
     *          application/json:
     *            shcema:
     *              $ref: '#/components/schemas/User'
     *      500:
     *        description: Server error.
     */
    this.router.post("/", requireAuth, itemsController.createItem);

    /**
     * @swagger
     * /users/{id}:
     *  put:
     *    summary: Update a user by Id
     *    tags: [Users]
     *    security:
     *      - usersAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *        required: true
     *        description: User mongoDB Id
     *    requestBody:
     *      required: true
     *      content:
     *        application/json:
     *          schema:
     *            $ref: '#/components/schemas/User'
     *    responses:
     *      201:
     *        description: User updated
     *        content:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      400:
     *        description: Invalid data for update
     *        content:
     *          application/json:
     *            shcema:
     *              $ref: '#/components/schemas/User'
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      404:
     *        description: User not found
     *      500:
     *        description: Server error
     */
    this.router.put("/:id", requireAuth, itemsController.updateItem);

    /**
     * @swagger
     * /users/{id}:
     *  delete:
     *    summary: Soft delete a user by Id
     *    tags: [Users]
     *    security:
     *      - userskAuth: []
     *    parameters:
     *      - $ref: '#/components/parameters/userId'
     *    responses:
     *      200:
     *        description: User deleted
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      404:
     *        description: User not found
     *
     */
    this.router.delete("/:id", requireAuth, itemsController.deleteItem);

    /**
     * @swagger
     * /users/{id}/reservations:
     *  get:
     *    summary: Get user reservations
     *    tags: [Users]
     *    security:
     *      - usersAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *          required: true
     *          description: User id
     *    responses:
     *      200:
     *        description: User reservations data
     *        contens:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      404:
     *        description: User not found
     */
    this.router.get(
      "/:id/reservations",
      requireAuth,
      itemsController.getUsersReservations
    );

    /**
     * @swagger
     * /users/{id}/accreditations:
     *  get:
     *    summary: Get user accreditation requests
     *    tags: [Users]
     *    security:
     *      - usersAuth: []
     *    parameters:
     *      - in: path
     *        name: id
     *        schema:
     *          type: string
     *          required: true
     *          description: User id
     *    responses:
     *      200:
     *        description: User accreditations data
     *        contens:
     *          application/json:
     *            schema:
     *              $ref: '#/components/schemas/User'
     *      403:
     *        description: Unauthorized, non-exist, invalid or expired token
     *      404:
     *        description: User not found
     */
    this.router.get(
      "/:id/accreditations",
      requireAuth,
      itemsController.getUsersAccreditations
    );
  }
}

const usersRoutes = new UsersRoutes();
export default usersRoutes.router;
