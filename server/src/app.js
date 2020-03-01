// @flow
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import SearchToken from "models/SearchToken";
import getAllIngredients from "./getAllIngredients";
import matchRecipes from "./matchRecipes";

import type { Recipe } from "models/recipe";

const BAD_REQUEST = 400;
const SERVER_ERROR = 500;

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Express middleware
app.use(cors());

// Setup routes
app.get("/ingredients", async (req, res) => {
  try {
    const allIngredients: Array<string> = await getAllIngredients();
    res.send(allIngredients);
  } catch (err) {
    console.error(err);
    res.status(SERVER_ERROR).send({ error: err });
  }
});

app.get("/recipes", async (req, res) => {
  if (!req.query.q) {
    // If there are no tokens in the query, return the empty array
    res.send([]);
    return;
  }

  let q: Array<string> | string = req.query.q;
  let searchTokens: Array<SearchToken> = [];

  // Convert to array if only one element was passed
  if (typeof q === 'string' || q instanceof String) {
    q = [q];
  }

  for (const tTerm of q) {
    const token = SearchToken.decode(tTerm);
    if (token === null) {
      res.status(BAD_REQUEST).send({ error: `Bad token: "${tTerm}"`});
      return;
    }
    searchTokens.push(token);
  }

  try {
    const matchedRecipes = await matchRecipes(searchTokens);
    res.send(matchedRecipes);
  } catch (err) {
    console.error(err);
    res.status(SERVER_ERROR).send({ error: err });
  }
});

export default app;
