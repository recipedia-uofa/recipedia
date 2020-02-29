// @flow
import express from "express";
import path from "path";
import cookieParser from "cookie-parser";
import cors from "cors";
import logger from "morgan";
import getAllIngredients from "./getAllIngredients";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "../public")));

// Express middleware
app.use(cors());

// Setup routes
app.get("/ingredients", async (req, res) => {
  try {
    const allIngredients: Array<string> = await getAllIngredients();
    res.send(allIngredients);
  } catch (err) {
    console.err(err);
    res.status(304).send({ error: err });
  }
});

app.get("/recipes", (req, res) => {
  const mockRecipeReturn = [
    {
      url: "fake",
      title: "Soup with eggs",
      ingredientsMatched: [
        "Carrots",
        "Potato",
        "Milk",
        "Eggs",
        "Bread",
        "Oil",
        "Butter",
        "Peanuts",
        "Gravy"
      ],
      ingredientsNotMatched: ["Chicken", "Liver"],
      nutritionalInfo: {
        calories: 300,
        fat: 10,
        carbs: 30,
        protein: 11,
        sugar: 7
      },
      imageUrl: "fake",
      nutritionScore: 98,
      servingSize: 4
    },
    {
      url: "fake",
      title: "Lasagna",
      ingredientsMatched: [
        "Pasta",
        "Potato",
        "Milk",
        "Eggs",
        "Bread",
        "Oil",
        "Butter"
      ],
      ingredientsNotMatched: ["Chicken", "Liver"],
      nutritionalInfo: {
        calories: 550,
        fat: 13,
        carbs: 90,
        protein: 15,
        sugar: 13
      },
      imageUrl: "fake",
      nutritionScore: 94,
      servingSize: 8
    },
    {
      url: "fake",
      title: "American Cheeseburger",
      ingredientsMatched: ["Potato", "Milk", "Eggs", "Bread", "Oil", "Gravy"],
      ingredientsNotMatched: ["Chicken", "Liver", "Wasabi"],
      nutritionalInfo: {
        calories: 620,
        fat: 30,
        carbs: 51,
        protein: 19,
        sugar: 8
      },
      imageUrl: "fake",
      nutritionScore: 85,
      servingSize: 2
    }
  ];

  res.send(mockRecipeReturn);
});

export default app;
