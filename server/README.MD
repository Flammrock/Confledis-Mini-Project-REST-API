# Confledis Mini-Project Server (Backend)

  
Author: **Lemmy Briot**  
<br /><br />
This project is an express app using typescript with the following modules :

  

- body-parser:1.20.0 (Parse incoming request bodies in a middleware before your handlers, available under the `req.body` property)
- cors:2.8.5
- dotenv:16.0.0
- express:4.18.0
- helmet:5.0.2 (secure the express app by settings various header)
- morgan:1.10.0 (log http request)
- sequelize:6.19.0 (abstraction layer for database communication)
- sqlite3:5.0.5 (database used in this project (memory based))


### API

|Method|Path|Description|
|--|--|--|
|GET|/api/v1/products|Get the products list|
|GET|/api/v1/products/:id|Get the product which have the corresponding **id** param|
|POST|/api/v1/products|Creates a product|
|PUT|/api/v1/products/:id|Updates the product which have the corresponding **id**  param|
|DELETE|/api/v1/products/:id|Deletes the product which have the corresponding **id**  param|
|POST|/api/v1/products/search|Searches products|

### API Architecture

![ API Architecture](/server/API.png)

### API Endpoints

#### - GET /api/v1/products
This endpoint allow to retrieve the whole list of products, example of response :
```json
[
	{
		"id": 1,
		"name": "my product 1",
		"price": 8.5,
		"quantity": 5
	},
	{
		"id": 2,
		"name": "my product 2",
		"price": 4.99,
		"quantity": 2
	}
]
```
If there are no product, the server response by :
```json
[]
```

#### - GET /api/v1/products/:id
This endpoint allow to retrieve the product with the corresponding **id**.
|URL Params|Type|Description|
|--|--|--|
|:id|integer|the ID of the product|

<br /><br />
Example of request and response :
`GET /api/v1/products/2`
```json
{
	"id": 2,
	"name": "my product 2",
	"price": 8.5,
	"quantity": 5
}
```
<br /><br />
If the product with the corresponding ID doesn't exist, the server response by :
```json
{
	"error": "not found"
}
```

#### - POST /api/v1/products
This endpoint allow to create a product.

POST Data :
|Key|Type|Description|
|--|--|--|
|name|string|the name of the product|
|price|real|the price of the product|
|quantity|integer|the quantity of the product|

Example of POST Data :
```json
{
	"name": "my product",
	"price": 1.99,
	"quantity": 2
}
```

With the example of POST Data above, the server response by :
```json
{
	"id": 4,
	"name": "my product",
	"price": 1.99,
	"quantity": 2
}
```
**NOTE: the returned ID can be different according to your data**

#### - PUT /api/v1/products/:id
This endpoint allow to update the product with the corresponding **id**.
|URL Params|Type|Description|
|--|--|--|
|:id|integer|the ID of the product|

<br /><br />
POST Data :
|Key|Type|Description|
|--|--|--|
|[name]|string|the name of the product|
|[price]|real|the price of the product|
|[quantity]|integer|the quantity of the product|

[] -> optional

Example of PUT Data :
```json
{
	"price": 2.50,
}
```
**NOTE: this PUT Data will only update the price, if you want to update the whole product, you should do this :**
```json
{
	"name": "my updated product",
	"price": 2.50,
	"quantity": 4
}
```
<br /><br />
With the example of POST Data above, the server response by :
```json
{
	"id": 4,
	"name": "my updated product",
	"price": 2.50,
	"quantity": 4
}
```
<br /><br />
If the product with the corresponding ID doesn't exist, the server response by :
```json
{
	"error": "not found"
}
```

#### - DELETE /api/v1/products/:id
This endpoint allow to retrieve the product with the corresponding **id**.
|URL Params|Type|Description|
|--|--|--|
|:id|integer|the ID of the product|

Example of request and response :
`DELETE /api/v1/products/2`
The server response with an empty response and a status code of `204`.

If the product with the corresponding ID doesn't exist, no additional information is sent

#### - POST /api/v1/products/search

This endpoint allow to search products.

POST Data :
|Key|Type|Description|
|--|--|--|
|name|string|name of products that contain this string|
|price|condition|price of products that satisfy this condition|
|quantity|condition|quantity of products that satisfy this condition|

<br /><br />
Custom Type **condition** :
|Key|Type|Description|
|--|--|--|
|operator|operator|The operator used in the condition|
|value|number|The number to compare|

<br /><br />
Custom Enum **operator** :
|Value|type|Description|
|--|--|--|
|=|string|equals operator|
|<|string|inferior operator|
|>|string|superior operator|
|<=|string|inferior or equals operator|
|>=|string|superior or equals operator|
|!=|string|not equals|

<br /><br />
Examples of POST Data for searching :

If we want to search all product that contain `du` :
```json
{
	"name": "du"
}
```
<br /><br />
If we want to search all products with a price > 10 :
```json
{
	"price": {
		"operator": ">",
		"value": 10
	}
}
```
<br /><br />
If we want to search all products with a price <= 2.99 and contain `product` :
```json
{
	"name": "product"
	"price": {
		"operator": "<=",
		"value": 2.99
	}
}
```
<br /><br />
If we want to search all products with a price <= 2.99 and contain `product` and with a quantity >= 4 :
```json
{
	"name": "product"
	"price": {
		"operator": "<=",
		"value": 2.99
	},
	"quantity": {
		"operator": ">=",
		"value": 4
	},
}
```
<br /><br />
Example of response by the server :
```json
[
	{
		"id": 3,
		"name": "my product 3",
		"price": 4.99,
		"quantity": 2
	},
	{
		"id": 7,
		"name": "medium product 1",
		"price": 15.5,
		"quantity": 24
	}
]
```
