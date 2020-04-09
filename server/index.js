const express = require("express");
const async = require("express-async-await");
const fetch = require("node-fetch");
const mcache = require("memory-cache");

const app = express();

const DOMAIN = "https://app.tibber.com/v4/";
const SECONDS_CACHE_DURATION = 60;

const cache = (duration) => async (req, res, next) => {
  let key = "__express__" + req.originalUrl || req.url;
  let cachedBody = mcache.get(key);

  if (cachedBody) {
    res.send(cachedBody);
    return;
  } else {
    mcache.put(key, req.body, duration * 1000);
    next();
  }
};

const fetchData = async (body) => {
  const credentials = {
    email: "demo@tibber.com",
    password: "Electric",
  };
  let token = null;

  if (!token) {
    try {
      response = await fetch(`${DOMAIN}/login.credentials`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });
      const body = await response.json();
      token = body.token;
      console.log({ token });
    } catch (error) {
      console.error(error);
    }
  }

  if (token) {
    try {
      return await fetch(`${DOMAIN}gql?`, {
        method: "POST",
        body: JSON.stringify(body),
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
      });
    } catch (error) {
      console.error(error);
    }
  }
};

app.get("/data", cache(SECONDS_CACHE_DURATION), async (req, res, next) => {
  const response = await fetchData({
    query:
      '{me{home(id:"a8c210fc-2988-4f06-9fe9-ab1bad9529d5"){weather{minTemperature,maxTemperature,entries{time,temperature,type}}}}}',
  });

  const body = await response.json();
  res.send(body);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
