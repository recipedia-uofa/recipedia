// @flow
import keywords from 'models/keywords';

import type { Ingredient } from 'models/ingredient';
import type { Diet } from 'models/diets';
import type { Keyword } from 'models/keywords';

export class SearchToken {
    keyword: Keyword;
    value: ?(Diet | Ingredient);

    constructor(keyword: Keyword = keywords.NONE,
                value: ?(Diet | Ingredient) = null) {
        this.keyword = keyword;
        this.value = value;
    }

    isPartial(): boolean {
        return this.value === null;
    }

    isKeyIngredient(): boolean {
        return this.keyword === keywords.KEY;
    }

    isDiet(): boolean {
        return this.keyword === keywords.DIET;
    }

    isBlacklist(): boolean {
        return this.keyword === keywords.NOT;
    }
}
