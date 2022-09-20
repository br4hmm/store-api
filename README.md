# Store API

Store API built with Express.js & MongoDB.

## HTTP Methods

- Get all products static &nbsp; &nbsp; `GET /api/v1/products/static`
- Get all products &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; `GET /api/v1/products`

## Demo

`populate.js` used to to add `products.json` to the database (MongoDB).

```
$ node populate.js
```

In `controllers/products.js`

```js
const getAllProductsStatic = async (req, res) => {
  const products = await Product.find({ company: 'caressa', featured: true });
  res.status(200).json({ nbHits: products.length, products });
};
```

The result of `GET /api/v1/products/static` _Gets all products that are from caressa and is featured._

```json
{
  "nbHits": 4,
  "products": [
    {
      "_id": "6328a23a64d168f04ca06fa4",
      "name": "entertainment center",
      "price": 59,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2022-09-19T17:09:02.775Z",
      "company": "caressa",
      "__v": 0
    },
    {
      "_id": "6328a23a64d168f04ca06fa7",
      "name": "modern bookshelf",
      "price": 31,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2022-09-19T17:09:02.775Z",
      "company": "caressa",
      "__v": 0
    },
    {
      "_id": "6328a23a64d168f04ca06fb2",
      "name": "wooden table",
      "price": 23,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2022-09-19T17:09:02.775Z",
      "company": "caressa",
      "__v": 0
    },
    {
      "_id": "6328a23a64d168f04ca06fb3",
      "name": "a first wooden table",
      "price": 23,
      "featured": true,
      "rating": 4.5,
      "createdAt": "2022-09-19T17:09:02.775Z",
      "company": "caressa",
      "__v": 0
    }
  ]
}
```

_Enjoy 🤍_
