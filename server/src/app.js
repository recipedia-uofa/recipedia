import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import logger from 'morgan';
import RecipeStore from './data/RecipeStore';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, '../public')));

// Express middleware
app.use(cors());

// Setup routes
app.get('/', (req, res, next) => {
  res.render('index', { title: 'Express' });
});

app.get('/ingredients', async (req, res) => {
  try {
    const allIngredients = await RecipeStore.allIngredients();
    res.send(allIngredients);
  } catch (err) {
    console.err(err);
    res.status(304).send({ error: err });
  }
});

app.get('/recipes', (req, res) => {
  const mockRecipeReturn = [
    'Soup with eggs',
    'Lasagna',
    'Broccoli and Cheese',
  ];

  res.send(mockRecipeReturn);
});

export default app;
