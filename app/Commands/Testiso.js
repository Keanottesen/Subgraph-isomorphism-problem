'use strict'

const { Command } = require('@adonisjs/ace')
const FlowService = use('App/Services/FlowService');

class Testiso extends Command {
  static get signature () {
    return 'test:iso'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {

    const workspace = this.workspace()
    const condition = this.condition()
   
    const workspaceEdges = workspace.filter((elem) => FlowService.isEdge(elem));
    const workspaceNodes = workspace.filter((elem) => FlowService.isNode(elem));

    const conditionEdges = condition.filter((elem) => FlowService.isEdge(elem));
    const conditionNodes = condition.filter((elem) => FlowService.isNode(elem));
    
    const result = FlowService.getIsomorphicSubgraphs(workspaceNodes, workspaceEdges, conditionNodes, conditionEdges)

    // console.log(result)
  }

  workspace() {
    return [
      {
        id: '279',
        type: 'custom',
        data: {
          label: 'Selskab',
          displayName: 'KNO Holding ApS',
          figur: null,
          unitNumber: '4008840832',
          attributes: [Array],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 1, y: 329 }
      },
      {
        id: '280',
        type: 'custom',
        data: {
          label: 'Person',
          displayName: 'Kean Nøbølle Ottesen',
          figur: null,
          unitNumber: '4008840831',
          attributes: [Array],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: -116, y: 131 }
      },
      {
        id: '281',
        type: 'custom',
        data: {
          label: 'Selskab',
          displayName: 'Juristic ApS',
          figur: null,
          unitNumber: '4008862861',
          attributes: [],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 12, y: 432 }
      },
      {
        id: '282',
        type: 'custom',
        data: {
          label: 'Person',
          displayName: 'ny person',
          figur: 'person',
          unitNumber: null,
          attributes: [Array],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 101, y: 121 }
      },
      {
        id: '286',
        type: 'custom',
        data: {
          label: 'Selskab',
          displayName: 'sidste selskab',
          figur: null,
          unitNumber: null,
          attributes: [],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 238, y: 569 }
      },
      {
        id: '291',
        type: 'custom',
        data: {
          label: 'hejemdi',
          displayName: null,
          figur: null,
          unitNumber: null,
          attributes: [],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 577, y: 283 }
      },
      {
        id: '292',
        type: 'custom',
        data: {
          label: 'Selskab',
          displayName: 'vi prøver at se selskab',
          figur: null,
          unitNumber: null,
          attributes: [],
          backgroundColor: 'rgba(255, 255, 255, 1)',
          borderColor: 'rgba(0, 0, 0, 1)'
        },
        position: { x: 258, y: 330 }
      },
      {
        id: '273',
        source: '280',
        target: '279',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '100%',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: '100%',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: 'default'
      },
      {
        id: '274',
        source: '279',
        target: '281',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '30%',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: true,
          lineThrough: false,
          stroke: false
        },
        label: '30%',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: true,
        arrowHeadType: false,
        type: 'default'
      },
      {
        id: '280',
        source: '282',
        target: '279',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '100%',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: '100%',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: 'default'
      },
      {
        id: '297',
        source: '281',
        target: '286',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '10%',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: '10%',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: null
      },
      {
        id: '303',
        source: '282',
        target: '291',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: 'Ejerskab',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: null
      },
      {
        id: '304',
        source: '279',
        target: '292',
        sourceHandle: 'rightTop',
        targetHandle: 'leftTop',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Transaktion',
          value: 'shares',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: 'shares',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: null
      },
      {
        id: '305',
        source: '292',
        target: '286',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        style: { stroke: 'rgba(0, 0, 0, 1)' },
        data: {
          label: 'Ejerskab',
          value: '100%',
          showLabel: false,
          color: [Object],
          showArrow: false,
          animated: false,
          lineThrough: false,
          stroke: false
        },
        label: '100%',
        labelBgPadding: [ 0, 0 ],
        labelStyle: {},
        animated: false,
        arrowHeadType: false,
        type: null
      }
    ]
  }

  condition() {
    return [
      {
        id: '11',
        type: 'custom',
        data: { label: 'Person', conditionValues: [Array] },
        position: { x: 588, y: 234 }
      },
      {
        id: '12',
        type: 'custom',
        data: { label: 'Selskab', conditionValues: [Array] },
        position: { x: 598, y: 421 }
      },
      {
        id: '18',
        type: 'custom',
        data: { label: 'Selskab', conditionValues: [] },
        position: { x: 935, y: 423 }
      },
      {
        id: '19',
        type: 'custom',
        data: { label: 'Selskab', conditionValues: [] },
        position: { x: 605, y: 624 }
      },
      {
        id: '1',
        source: '11',
        target: '12',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'straight',
        data: {
          label: 'Ejerskab',
          comparison_type: 'is equal to',
          comparison_value: '100%'
        },
        label: 'Ejerskab is equal to 100%'
      },
      {
        id: '5',
        source: '12',
        target: '18',
        sourceHandle: 'rightTop',
        targetHandle: 'leftTop',
        type: 'straight',
        data: {
          label: 'Transaktion',
          comparison_type: 'is equal to',
          comparison_value: 'shares'
        },
        label: 'Transaktion is equal to shares'
      },
      {
        id: '6',
        source: '12',
        target: '19',
        sourceHandle: 'bottom',
        targetHandle: 'top',
        type: 'straight',
        data: {
          label: 'Ejerskab',
          comparison_type: 'is less than',
          comparison_value: '50%'
        },
        label: 'Ejerskab is less than 50%'
      }
    ]
  }
}

module.exports = Testiso
