import "regenerator-runtime/runtime";
import * as R from 'ramda';
import { Parser } from 'n3';
import { HashMapDataset, PlanBuilder } from 'sparql-engine';
import { generatePrefixes, stripPrefix, recipe, ingredient, rcp, pType } from './utils';
import N3Graph from './N3Graph';

const graph = new N3Graph();
const dataset = new HashMapDataset('http://recipedia.com/', graph);

console.log('Loading recipes...');

// Load recipes into the graph
const parser = new Parser();
parser.parse(`
  @prefix rcp: <http://recipedia.com/#> .
  @prefix rci: <http://recipedia.com/ingredient#> .
  @prefix alr: <https://www.allrecipes.com/recipe/> .
  @prefix xsd: <http://www.w3.org/2001/XMLSchema#> .

  rci:butter a rcp:Ingredient .
  rci:leek a rcp:Ingredient .
  rci:chicken_broth a rcp:Ingredient .
  rci:cornstarch a rcp:Ingredient .
  rci:potato a rcp:Ingredient .
  rci:cream a rcp:Ingredient .
  rci:garlic a rcp:Ingredient .
  rci:chicken_bouillon a rcp:Ingredient .
  rci:sour_cream a rcp:Ingredient .
  rci:cream_cheese a rcp:Ingredient .

  alr:25708 a rcp:Recipe;
            rcp:name "Potato Leek Soup III" ;
            rcp:rating 4.5 ;
            rcp:contains rci:butter ;
            rcp:contains rci:leek ;
            rcp:contains rci:chicken_broth ;
            rcp:contains rci:cornstarch ;
            rcp:contains rci:potato ;
            rcp:contains rci:cream .

  alr:25895 a rcp:Recipe ;
            rcp:name "Slow Cooker Mashed Potatoes" ;
            rcp:rating 4.5 ;
            rcp:key rci:potato ;
            rcp:contains rci:potato ;
            rcp:contains rci:garlic ;
            rcp:contains rci:chicken_bouillon ;
            rcp:contains rci:sour_cream ;
            rcp:contains rci:cream_cheese ;
            rcp:contains rci:butter .
`).forEach(quad => {
  // console.log(quad);
  graph._store.addQuad(quad);
});

Promise.all([
  graph.estimateCardinality({
    subject: null,
    predicate: pType,
    object: rcp('Ingredient')
  }),
  graph.estimateCardinality({
    subject: null,
    predicate: pType,
    object: rcp('Recipe')
  })
]).then(([numIngredients, numRecipes]) => {
  console.log(`${numIngredients} ingredients loaded.\n${numRecipes} recipes loaded.`);
});

// Creates a plan builder for the RDF dataset
const builder = new PlanBuilder(dataset);

const collect = it => {
  return new Promise((resolve, reject) => {
    const result = [];
    it.subscribe(
      bindings => result.push(bindings.toObject()),
      err => reject(err),
      () => resolve(result)
    );
  });
};

const runQuery = async (query) => {
  const iterator = builder.build(query);
  return await collect(iterator);
};

const getIngredient = R.pipe(
  i => i['?i'],
  stripPrefix('rci'),
  i => i.replace('_', ' ')
);

const getAllIngredients = async () => {
  const result = await runQuery(`
    ${generatePrefixes([
      'rcp',
      'rci'
    ])}
    SELECT ?i WHERE {
      ?i a rcp:Ingredient .
    }
  `);
  return result.map(getIngredient).sort();
};

const RecipeStore = {
  query: runQuery,
  allIngredients: getAllIngredients,
};

export default RecipeStore;
