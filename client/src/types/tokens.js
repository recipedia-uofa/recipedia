// @flow
import type { Ingredient } from 'types/ingredient';

type Keyword = 'key' | 'not' | 'diet' | 'none';
type Diet = 'vegetarian' | 'vegan' | 'gluten-free';

export type PartialSearchToken = {
    keyword: Keyword,
};

export type DietSearchToken = {
    keyword: 'diet',
    diet: Diet,
};

export type IngredientSearchToken = {
    keyword: 'key' | 'not' | 'none',
    ingredient: Ingredient,
};

export type FullSearchToken = IngredientSearchToken | DietSearchToken;

export type SearchToken = PartialSearchToken | FullSearchToken;
