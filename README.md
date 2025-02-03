# Number Classification API

this API classifies numbers and return intresting mathematical properties alongside a fun fact.

## Features

- Classifies numbers as prime, perfect, or Armstrong.
- Calculates the sum of the digits of a number.
- Retrieves a fun fact about the number from the Numbers API.
- Handles CORS (Cross-Origin Resource Sharing).
- Returns responses in JSON format.
- Provides appropriate HTTP status codes.
- Robust input validation.

## Technologies used

- Node.js
- Express.js
- node-fetch: for making requests to the fun fact API
- cors: for handling CORS

## API Specs

### Endpoint

GET `<your-domain.com>/api/classify-number?number=44`

or locally
`GET http://localhost:3002/api/classify-number?number=44`

### Request Params

- `number` (required): integer

### JSON Response Format (200 OK)

```json
{
  "number": 371,
  "is_prime": false,
  "is_perfect": false,
  "properties": ["armstrong", "odd"],
  "digit_sum": 11,
  "fun_fact": "371 is an Armstrong number because 3^3 + 7^3 + 1^3 = 371"
}
```

### JSON Response Format (400 Bad Request)

```json
{
  "number": "alphabet",
  "error": true
}
```
