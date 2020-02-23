import { DataFactory } from 'n3';

const { namedNode } = DataFactory;

const prefixes = {
  rcp: "http://recipedia.com/#",
  rci: "http://recipedia.com/ingredient#",
  alr: "https://www.allrecipes.com/recipe/"
};

export const generatePrefixes = prefixList => {
  return prefixList
    .map(p => `PREFIX ${p}: <${prefixes[p]}>`)
    .join('\n');
};

export const stripPrefix = prefix => {
  const slicePos = prefixes[prefix].length;
  return data => data.slice(slicePos);
};

export const recipe = (r) => {
  return namedNode(prefixes.alr + r);
};

export const ingredient = (i) => {
  return namedNode(prefixes.rci + i);
}

export const rcp = (r) => {
  return namedNode(prefixes.rcp + r);
}

export const pType = 'http://www.w3.org/1999/02/22-rdf-syntax-ns#type';
