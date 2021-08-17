/* eslint-disable guard-for-in */
/* eslint-disable no-restricted-syntax */
/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-param-reassign */
// const Condition = use('App/Models/Condition');
const math = require('mathjs');
const Graph = require('graph-data-structure');

class FlowService {
  /**
 * Finds isomorphisms (mappings) of a subgraph in a host/mother graph.
 *
 * The subgraph algorithm is based on: http://adriann.github.io/Ullman%20subgraph%20isomorphism.html
 *
 * This algorithm is exponential and will be slow for large inputs.
 *
 * @param G {number[][]} Adjacency matrix of the host/mother graph in which to search for a match.
 * @param P {number[][]} Adjacency matrix of subgraph to search for
 * @param maxNum {number} [null] the maximum number isomorphisms to find, may return fewer if fewer are matched.
 * @param similarityCriteria {function} [degreeCriteria] a function used to determine if two nodes are similar enough to be candidates for matching in the resulting morphism.
 *
 * @returns {number[][][]} an array of morphism matrices (rows indices correspond to vertices of P, col indices correspond to vertices of G), null if error.
 */

  static getIsomorphicSubgraphs(
    workspaceNodes,
    workspaceEdges,
    conditionNodes,
    conditionEdges,
  ) {
    const G = this.convertToAdjacencyMatrix(workspaceNodes, workspaceEdges);
    console.log(G)
    const P = this.convertToAdjacencyMatrix(conditionNodes, conditionEdges);
    console.log(P)
    const G_size = G.length;
    const P_size = P.length;

    // No match possible if |P| > |G|, not an error.
    if (G_size < P_size) return [];

    // Input adjacency matrices must be square, error if not
    if (!this.checkSquareMatrix(G)) return null;
    if (!this.checkSquareMatrix(P)) return null;

    const similarityCriteria = () => true; // use this for deeper comparison

    const M = this.initMorphism(G, P, similarityCriteria);

    const results = [];

    const maxNum = null;

    this.recurse(math.zeros(1, G_size).toArray()[0], 0, G, P, M, results, maxNum, false);
    // console.log(results);
    // console.log(this.convertToFlow(results[0]));
    return results;
  }

  static convertToAdjacencyMatrix(nodes, edges) {
    // create graph data structure
    const graph = Graph();
    nodes.forEach((node) => graph.addNode(node.id));
    edges.forEach((edge) => graph.addEdge(edge.source, edge.target));

    const nodeIds = nodes.map((x) => x.id);

    // create adjacency list
    const adjacencyList = new Map();
    const adjacencyList2 = new Map();

    nodes.forEach((node, index) => {
      adjacencyList.set(index, graph.adjacent(node.id).map((x) => nodeIds.findIndex((n) => n === x)));
    });

    nodes.forEach((node) => {
      adjacencyList2.set(node.id, graph.adjacent(node.id));
    });
    // console.log(adjacencyList);
    // console.log(adjacencyList2);

    // create ajacency matrix

    const V = nodes.length;

    const matrix = Array.from(Array(V), () => Array(V).fill(0));

    for (let i = 0; i < V; i++) {
      for (const j of adjacencyList.get(i)) {
        matrix[i][j] = 1;
      }
    }

    return matrix;
  }

  static convertToFlow(matrix, orgNodes, orgEdges) {
    const adjList = matrix.map((a) => a.map((v, i) => (v ? i : -1)).filter((v) => v !== -1));

    const nodes = [];
    const edges = [];

    adjList.forEach((items, index) => {
      const node = orgNodes[index];

      items.forEach((targetIndex) => {
        const source = orgNodes[index].id;
        const target = orgNodes[targetIndex].id;

        edges.push(orgEdges.find((x) => x.source === source.toString() && x.target === target.toString()));
      });

      nodes.push(node);
    });

    return [...nodes, ...edges];
  }

  static initMorphism(G, P, criteriaFun) {
    const P_size = P.length;
    const G_size = G.length;

    const M = math.zeros(P_size, G_size).toArray();

    for (let i = 0; i < P_size; i++) {
      for (let j = 0; j < G_size; j++) {
        if (criteriaFun(P, G, i, j)) {
          M[i][j] = 1;
        }
      }
    }

    return M;
  }

  static recurse(used_columns, cur_row, G, P, M, out, num, prune) {
    const cols = this.num_cols(M);

    if (cur_row === this.num_rows(M)) {
      if (this.isIso(M, G, P)) {
        out.push(this.array2DCopy(M));
      }
    } else {
      const Mp = this.array2DCopy(M);

      // prune the proposed morphism to remove
      // mappings that are obviously not possible.
      if (prune) {
        this.pruneOptions(Mp, P, G);
      }

      // for all unused columns c
      for (let c = 0; c < cols; c++) {
        // only explore if the nodes are candidates for matching and the
        // column has not been set yet.
        if (used_columns[c] === 0 && M[cur_row][c] === 1) {
          // set column c in M' to 1 and other columns to 0
          for (let i = 0; i < cols; i++) {
            if (i === c) {
              Mp[cur_row][i] = 1;
            } else {
              Mp[cur_row][i] = 0;
            }
          }

          // mark c as used
          used_columns[c] = 1;

          // recurse, but only if they want to find more isomorphisms.
          if (num === null || out.length < num) {
            this.recurse(used_columns, cur_row + 1, G, P, Mp, out, num);
          }

          // mark c as unused
          used_columns[c] = 0;
        }
      }
    }
  }

  static checkSquareMatrix(A) {
    const s = A.length;

    for (let i = 0; i < s; i++) {
      if (A[i].length !== s) return false;
    }

    return true;
  }

  static num_cols(M) {
    return M[0].length;
  }

  static num_rows(M) {
    return M.length;
  }

  static isIso(M, G, P) {
    const rows = this.num_rows(P);

    const morph = this.mapPtoG(M);

    for (let r1 = 0; r1 < rows; r1++) {
      for (let r2 = 0; r2 < rows; r2++) {
        // adjacent in P
        if (P[r1][r2] === 1) {
          // find mapped nodes in G
          const c1 = morph(r1);
          const c2 = morph(r2);

          // are they adjacent in G?
          if (G[c1][c2] !== 1) {
            // no - not isomorphism
            return false;
          }
        }
      }
    }

    return true;
  }

  static array2DCopy(A) {
    const X = [];

    for (let i = 0; i < A.length; i++) {
      X[i] = A[i].slice();
    }

    return X;
  }

  static pruneOptions(M, P, G) {
    // M first dim (rows) are vertices of sub graph P
    // M second dim (cols) are vertices of host graph G

    for (let i = 0; i < M.length; i++) {
      for (let j = 0; j < M.length; j++) {
        // i - the vertex in P
        // j - the vertex in G

        // for all M[i][j] === 1
        if (M[i][j] === 1) {
          // for all neighbours x of vertex i in P
          for (let x = 0; x < P.length; x++) {
            if (P[i][x] === 1) {
              // x is a vertex in P that is adjacent to i

              // if there is no neighbour y of vertex j in G such
              // that M[x][y] === 1, then set M[i][j] = 0

              let hasNeighbourY = false;
              for (let y = 0; y < G.length; y++) {
                if (G[j][y] === 1) {
                  hasNeighbourY = true;
                  break;
                }
              }

              if (!hasNeighbourY) {
                M[i][j] = 0;
              }
            }
          }
        }
      }
    }
  }

  static mapPtoG(M) {
    const cols = this.num_cols(M);

    return (p) => {
      for (let c = 0; c < cols; c++) {
        if (M[p][c] === 1) return c;
      }
    };
  }

  static getConnectedEdges(nodes, edges) {
    const nodeIds = nodes.map((node) => node.id);

    return edges.filter((edge) => nodeIds.includes(edge.source));
  }

  static isNode(element) {
    return 'id' in element && !('source' in element) && !('target' in element);
  }

  static isEdge(element) {
    return 'id' in element && 'source' in element && 'target' in element;
  }
}

module.exports = FlowService;
