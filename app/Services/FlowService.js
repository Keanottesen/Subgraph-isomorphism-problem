class FlowService {

/**
 * @typedef WorkspaceAttribut
 * @type {object}
 * @property {string} label - a label for the attribut.
 * @property {string} displayName - value.
 * @property {boolean} show - a boolean to toggle if it should be visable on the node (has no implication in regards to the algorithm).
 * @property {number} workspace_node_attribut_id - a primary key.
 * @property {string} type - either Selection og Value.
 * @property {JSON} selectionOptions - used if type=Selection to show the posibilities in the frontend.
*/

/**
 * @typedef WorkspaceDataNode
 * @type {object}
 * @property {string} label - a label for the node.
 * @property {string} displayName - a custom name to display.
 * @property {string} figur - a figur to display on the node.
 * @property {string} unitNumber - a number relating to the company register.
 * @property {WorkspaceAttribut[]} attributes - specific attributes relating to the node like eg. company type.
 * @property {string} backgroundColor - background color of the node.
 * @property {string} borderColor - border color of the node.
*/

/**
 * @typedef Attribut
 * @type {object}
 * @property {number} id - an ID
 * @property {string} label - a label for the attribut.
 * @property {string} description - a description of the attribut.
 * @property {string} type - either Selection og Value.
 * @property {JSON} selectionOptions - used if type=Selection to show the posibilities in the frontend.
 * @property {string} group_id
 * @property {string} created_at
 * @property {string} updated_at
*/

/**
 * @typedef ConditionDataNode
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} attribut_id - an id of the attribut.
 * @property {string} comparison_type - a string that tells which type of comparison is to be made eg. "is not equal to" is equal to "!=" This can be one of these posibilities:
 *    'is equal to',
      'is not equal to',
      'is greater than',
      'is less than',
      'exists',
      'does not exist',
      'contains',
      'does not contain',.
 * @property {string} comparison_value - a string that tells what to compare with the comparison type.
 * @property {string} condition_node_id - an id of the node.
 * @property {string} created_at
 * @property {string} updated_at
 * @property {Attribut} attribut - attribut to compare
*/

/**
 * @typedef ConditionDataNode
 * @type {object}
 * @property {string} label - a label for the node.
 * @property {ConditionValues[]} conditionValues - Values to match the attributes of a WorkspaceNode.
*/

/**
 * @typedef WorkspaceDataEdge
 * @type {object}
 * @property {string} label - a label for the edge.
 * * @property {string} value - a value for the edge.
 * * @property {boolean} showLabel
 * * @property {object} color - color of the edge.
 * * @property {boolean} showArrow
 * * @property {boolean} animated
 * * @property {boolean} lineThrough
 * * @property {boolean} stroke
*/

/**
 * @typedef ConditionDataEdge
 * @type {object}
 * @property {string} label - a label for the edge.
 * @property {string} comparison_type - a string that tells which type of comparison is to be made eg. "is not equal to" is equal to "!=" This can be one of these posibilities:
 *    'is equal to',
      'is not equal to',
      'is greater than',
      'is less than',
      'exists',
      'does not exist',
      'contains',
      'does not contain',.
 * @property {boolean} comparison_value - a string that tells what to compare with the comparison type.
*/

/**
 * @typedef Node
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} type - the type of the node.
 * @property {WorkspaceDataNode|ConditionDataNode} data - data on the node.
 * @property {object} position - the x and y coordinates of the node.
 */

/**
 * @typedef Edge
 * @type {object}
 * @property {string} id - an ID.
 * @property {string} source - id of the WorkspaceNode that is the source of the edge.
 * @property {string} target - id of the WorkspaceNode that is the target of the edge.
 * @property {string} sourceHandle - a handle where the edge is attached on the source (irrelevant for the evaluation of isomorphism).
 * @property {string} targetHandle - a handle where the edge is attached on the target (irrelevant for the evaluation of isomorphism).
 * @property {object} style - style of the edge.
 * @property {WorkspaceDataEdge|ConditionDataEdge} data - data on the edge.
 * @property {string} label - label on the edge (this is the same as in the data object).
 * @property {number[]} labelBgPadding - padding, to the label in the frontend.
 * @property {object} labelStyle - style on the label.
 * @property {boolean} animated - whether the edge should be animated or not.
 * @property {boolean} arrowHeadType - if the edge should conatin an arrowhead.
 * @property {type} type - the type of the edge.
 */

 /**
  * @param {[Node, Edge]} workspace
  * @param {[Node, Edge]} condition 
  * @returns {[Node, Edge]|[]} Should return the workspace elements that are isomorphic to the condition or an empty array, if no subgraph that is isomorphic exists
  * @description This functions should take two params; workspace and condition.
  * The functions should thereby compare the two and find all occurences of the condition in the workspace.
  * The conditionData is build up of logical comparisons, cf. {ConditionDataNode} and {ConditionDataEdge}.
  * 
  * The functions should determine a logical equialty of two nodes in a workspace and a condition
  * by matching both the labels in each and the condition values in a conditionNode to the attributes in a workspaceNode.
  * So for example if the conditionNode has an object like this: 
  * "data": {
    "label": "Company",
    "conditionValues": [
        {
            ...
            "comparison_type": "is not equal to",
            "comparison_value": "USA",
            ...
            "attribut": {
                ...
                "label": "Country",
                ...
            }
        },
        {
            ...
            "comparison_type": "is equal to",
            "comparison_value": "12",
            ...
            "attribut": {
                ...
                "label": "Employees",
                ...
            }
        }
    ]
  },
  * there is logical equality if the workspaceNode has a data object looking like this:
    "data": {
        "label": "Company",
        ...
        "attributes": [
            {
                "label": "Employees",
                "value": "12",
                ...
            },
            {
                "label": "Country",
                "value": "Denmark",
                ...
            }
        ],
        ...
    },
  * 
  * The function should determine logical equality of two edges in a workspace and a condition
  * by mathcing both the labels in each and the condition comparison type and value to the value of the workspace node.
  * So for example if the conditionEdge has an object looking like this:
  * "data": {
      "label": "Transaktion",
      "comparison_type": "is equal to",
      "comparison_value": "IP"
    }
  * there is logical equality if the workspaceEdge has a data object looking like this:
  * "data": {
            "label": "Transaktion",
            "value": "IP",
            ...
        },
  * 
  * ... means that there are irrelevant data in between
  */

  static getIsomorphicSubgraphs(workspace, condition) {
  
  }

  static isNode(element) {
    return 'id' in element && !('source' in element) && !('target' in element);
  }

  static isEdge(element) {
    return 'id' in element && 'source' in element && 'target' in element;
  }
}

module.exports = FlowService;
