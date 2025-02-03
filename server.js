const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const axios = require("axios");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
app.use(cors());

function isPrime(n, allowNegativePrimes = false) {
  if (n === 0 || n === 1) return false;
  if (n < 0 && !allowNegativePrimes) return false;

  n = Math.abs(n);

  if (n <= 3) return true;

  if (n % 2 === 0 || n % 3 === 0) return false;

  for (let i = 5; i * i <= n; i += 6) {
    if (n % i === 0 || n % (i + 2) === 0) return false;
  }
  return true;
}
function isPerfect(n) {
  if (n <= 1) return false;
  let sum = 1;
  for (let i = 2; i * i <= n; i++) {
    if (n % i === 0) {
      sum += i;
      if (i * i !== n) sum += n / i;
    }
  }
  return sum === n;
}

function isArmstrong(n) {
  const num_str = String(n);
  const num_digits = num_str.length;
  let sum = 0;
  for (let digit of num_str) {
    sum += Math.pow(parseInt(digit), num_digits);
  }
  return sum === n;
}

function digitSum(n) {
  if (n === 0) return 0;

  let isNegative = n < 0;
  let digits = Math.abs(n).toString().split("").map(Number);

  // Ensure only the first digit remains negative if the number is negative
  if (isNegative) digits[0] *= -1;

  return digits.reduce((sum, digit) => sum + digit, 0);
}

app.get("/api/classify-number", async (req, res) => {
  const num_str = req.query.number;

  if (!/^-?\d+$/.test(num_str)) {
    return res.status(400).json({ number: num_str, error: true });
  }
  const num = parseInt(num_str);

  const is_prime = isPrime(num);
  const is_perfect = isPerfect(num);
  const properties = [];
  if (isArmstrong(num)) {
    properties.push("armstrong");
  }
  if (num % 2 !== 0) {
    properties.push("odd");
  } else {
    properties.push("even");
  }

  try {
    const fun_fact_response = await axios.get(`http://numbersapi.com/${num}`);
    const fun_fact = fun_fact_response.data;

    res.json({
      number: num,
      is_prime: is_prime,
      is_perfect: is_perfect,
      properties: properties,
      digit_sum: digitSum(num),
      fun_fact,
    });
  } catch (error) {
    console.error("Error fetching fun fact: ", error);
    res.status(500).json({ error: "Error fetching fun fact" });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}...`);
});

// handling invalid urls.
app.get("*", (req, res) => {
  res.status(404).json({
    status: "Page not found!",
    message: "Enter a valid URL",
  });
});
