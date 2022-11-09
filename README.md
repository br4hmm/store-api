# Store API

Store API with filter methods built with Express.js & MongoDB.

## Routes

| About                   | HTTP Methods                  |
| ----------------------- | ----------------------------- |
| Get all products static | `GET /api/v1/products/static` |
| Get all products        | `GET /api/v1/products`        |

## Demo

`populate.js` used to to add `products.json` to the database (MongoDB).

```
$ node populate.js
```

In `controllers/products.js`:

1- For static searching:

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

2- For dynamic searching with filter methods:

_You can search by: featured, company, name, sort, fileds, page, limit & numericFilters_

```js
const getAllProducts = async (req, res) => {
  const { featured, company, name, sort, fields, numericFilters } = req.query;
  const queryObject = {};

  if (featured) {
    queryObject.featured = featured === 'true' ? true : false;
  }

  if (company) {
    queryObject.company = company;
  }

  if (name) {
    queryObject.name = { $regex: name, $options: 'i' };
  }

  if (numericFilters) {
    const operatorMap = {
      '>': '$gt',
      '>=': '$gte',
      '=': '$eq',
      '<': '$lt',
      '<=': '$lte',
    };

    const regEx = /\b(<|>|>=|=|<|<=)\b/g;

    let filters = numericFilters.replace(
      regEx,
      match => `-${operatorMap[match]}-`
    );

    const options = ['price', 'rating'];
    filters = filters.split(',').forEach(item => {
      const [field, operator, value] = item.split('-');
      if (options.includes(field)) {
        queryObject[field] = { [operator]: Number(value) };
      }
    });
  }

  let result = Product.find(queryObject);
  if (sort) {
    const sortList = sort.split(',').join(' ');
    result = result.sort(sortList);
  } else {
    result = result.sort('createdAt');
  }

  if (fields) {
    const fieldList = fields.split(',').join(' ');
    result = result.select(fieldList);
  }

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  result = result.skip(skip).limit(limit);

  const products = await result;
  res.status(200).json({ nbHits: products.length, products });
};
```

For Example: result of `GET /api/v1/products/?featured=false&sort=-price&fields=name,price` _Gets all products that are..._

```json
{
  "nbHits": 10,
  "products": [
    {
      "_id": "63615c6e897add3101f2d859",
      "name": "albany table",
      "price": 309
    },
    {
      "_id": "63615c6e897add3101f2d865",
      "name": "sofa set",
      "price": 129
    },
    {
      "_id": "63615c6e897add3101f2d85a",
      "name": "armchair",
      "price": 125
    },
    {
      "_id": "63615c6e897add3101f2d864",
      "name": "simple chair",
      "price": 109
    },
    {
      "_id": "63615c6e897add3101f2d858",
      "name": "albany sectional",
      "price": 109
    },
    {
      "_id": "63615c6e897add3101f2d860",
      "name": "leather sofa",
      "price": 99
    },
    {
      "_id": "63615c6e897add3101f2d85c",
      "name": "dining table",
      "price": 42
    },
    {
      "_id": "63615c6e897add3101f2d86b",
      "name": "wooden desk",
      "price": 40
    },
    {
      "_id": "63615c6e897add3101f2d85b",
      "name": "bar stool",
      "price": 40
    },
    {
      "_id": "63615c6e897add3101f2d863",
      "name": "shelf",
      "price": 30
    }
  ]
}
```

_Enjoy 🤍_
