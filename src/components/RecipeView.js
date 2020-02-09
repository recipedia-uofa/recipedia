// @flow
import React from 'react';
import RecipeCard from 'components/RecipeCard';

type Props = {||};

const recipes: Array<string> = [
  'Soup with eggs',
  'Lasagna',
  'Broccoli and Cheese',
];

const style = {
    recipeView: {
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
};

class RecipeView extends React.PureComponent<Props> {
    render() {
        const recipeItems = recipes.map((r) => (
            <RecipeCard key={r} title={r} />
        ));

        return (
          <div style={style.recipeView}>
            {recipeItems}
          </div>
        );
    }
}

export default RecipeView;
