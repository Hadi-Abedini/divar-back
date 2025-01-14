/**
 * @swagger
 * tags:
 *  name: categories
 *  description: categories Module and Routes
 */

/**
 * @swagger
 *  components:
 *      schemas:
 *          Createcategories:
 *              type: object
 *              required:
 *                  - title
 *              properties:
 *                  title:
 *                      type: string
 *                      description: Title of the categories
 *                  slug:
 *                      type: string
 *                      description: Unique slug for the categories (optional)
 *                  icon:
 *                      type: string
 *                      description: Icon URL for the categories (optional)
 *                  image:
 *                      type: string
 *                      description: Image URL for the categories (optional)
 *                  items:
 *                      type: array
 *                      items:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              slug:
 *                                  type: string
 *                      description: List of subcategories (optional)
 */

/**
 * @swagger
 * /categories:
 *  post:
 *      summary: Create a new category
 *      tags:
 *          - categories
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Createcategories'
 *      responses:
 *          201: 
 *              description: Category created successfully
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: object
 *                          properties:
 *                              title:
 *                                  type: string
 *                              icon:
 *                                  type: string
 *                              image:
 *                                  type: string
 *                              items:
 *                                  type: array
 *                                  items:
 *                                      type: object
 *                                      properties:
 *                                          title:
 *                                              type: string
 *                                          slug:
 *                                              type: string
 *                                          items:
 *                                              type: array
 *                                              items:
 *                                                  type: object
 *                                                  properties:
 *                                                      title:
 *                                                          type: string
 *                                                      slug:
 *                                                          type: string
 *          400:
 *              description: Bad request, invalid data
 *          500:
 *              description: Internal server error
 */

/**
 * Example of the request body:
 * {
 *   "title": "Art Category",
 *   "image": "https://example.com/art-category-image.jpg",
 *   "icon": "https://example.com/art-category-icon.png",
 *   "items": [
 *     {
 *       "title": "Subcategory 1",
 *       "slug": "test",
 *       "items": [
 *         {
 *           "title": "Subsubcategory 1",
 *           "slug": "test-subcategory"
 *         }
 *       ]
 *     }
 *   ]
 * }
 */
/**
 * @swagger
 * /categories:
 *  get:
 *      summary: Get all categories
 *      tags:
 *          - categories
 *      responses:
 *          200: 
 *              description: Successfully retrieved all categories
 *              content:
 *                  application/json:
 *                      schema:
 *                          type: array
 *                          items:
 *                              type: object
 *                              properties:
 *                                  _id:
 *                                      type: string
 *                                  title:
 *                                      type: string
 *                                  slug:
 *                                      type: string
 *                                  icon:
 *                                      type: string
 *                                  image:
 *                                      type: string
 *                                  items:
 *                                      type: array
 *                                      items:
 *                                          type: object
 *                                          properties:
 *                                              title:
 *                                                  type: string
 *                                              slug:
 *                                                  type: string
 *          500:
 *              description: Internal server error
 */

/**
 * @swagger
 * /categories/{id}:
 *  delete:
 *      summary: Delete a categories by ID
 *      tags:
 *          - categories
 *      parameters:
 *          - in: path
 *            name: id
 *            required: true
 *            description: The ID of the categories to be deleted
 *            schema:
 *              type: string
 *      responses:
 *          200:
 *              description: categories deleted successfully
 *          400:
 *              description: Invalid categories ID
 *          404:
 *              description: categories not found
 *          500:
 *              description: Internal server error
 */