import { Store, DataFactory } from 'n3';
import { Graph } from 'sparql-engine';

const { namedNode, literal, defaultGraph, quad,
  internal: { toId, fromId, Term },
} = DataFactory;

const toNode = term => {
  if (term === null || term instanceof Term) {
    return term;
  }

  // we assume term is a string
  if (term.startsWith('?')) {
    return null;
  } else if (term.startsWith('http')) {
    return namedNode(term);
  } else {
    return literal(term);
  }
};

const toAlgebraTriple = (q) => {
  return quad(
    toId(q.subject),
    toId(q.predicate),
    toId(q.object)
  );
};

// Format a triple pattern according to N3 API:
// SPARQL variables must be replaced by `null` values
const formatTriplePattern = (triple) => {
  const subject = toNode(triple.subject);
  const predicate = toNode(triple.predicate);
  const object = toNode(triple.object);
  return { subject, predicate, object }
}

export default class N3Graph extends Graph {
  constructor () {
    super();
    this._store = new Store();
  }

  insert (triple) {
    return new Promise((resolve, reject) => {
      try {
        this._store.addQuad(triple.subject, triple.predicate, triple.object);
        resolve();
      } catch (e) {
        reject(e);
      }
    })
  }

  delete (triple) {
    return new Promise((resolve, reject) => {
      try {
        this._store.removeQuad(triple.subject, triple.predicate, triple.object);
        resolve();
      } catch (e) {
        reject(e);
      }
    })
  }

  find (triple) {
    // console.log(triple);
    const { subject, predicate, object } = formatTriplePattern(triple);
    console.log({ subject, predicate, object });
    return this._store.getQuads(subject, predicate, object).map(toAlgebraTriple);
  }

  estimateCardinality (triple) {
    const { subject, predicate, object } = formatTriplePattern(triple);
    return Promise.resolve(this._store.countQuads(subject, predicate, object));
  }
}
