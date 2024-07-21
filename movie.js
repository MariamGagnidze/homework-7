const http = require('http');
const fs = require('fs');
const path = require('path');

// 2 Create another server with two methods:
// /movie that returns a random movie title, genre, director, and year.
// /number that returns a random number between 1 and 1000, and check if 
// the random number is 111, 222, 333, 444, ... 999, then return "You win the jackpot!" or something similar.



const getRandomMovie = () => {
  const dataPath = path.join(__dirname, 'moviesData.json');
  const movies = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
  const randomIndex = Math.floor(Math.random() * movies.length);
  return movies[randomIndex];
};

const getRandomNumber = () => {
  const randomNum = Math.floor(Math.random() * 1000) + 1;
  const luckyNums = [111, 222, 333, 444, 555, 666, 777, 888, 999];
  const message = luckyNums.includes(randomNum) ? "You win the jackpot!" : "Try again later";
  return { number: randomNum, message: message };
};

const server = http.createServer((req, res) => {
  if (req.url === "/movie") {
    res.setHeader("content-type", "application/json");
    const movie = getRandomMovie();
    return res.end(JSON.stringify(movie));
  } else if (req.url === "/number") {
    res.setHeader("content-type", "application/json");
    const numData = getRandomNumber();
    return res.end(JSON.stringify(numData));
  } else {
    res.setHeader("content-type", "application/json");
    return res.end(JSON.stringify({ error: "404 not found" }));
  }
});

server.listen(3000, () => {
  console.log("server running on http://localhost:3000");
});

