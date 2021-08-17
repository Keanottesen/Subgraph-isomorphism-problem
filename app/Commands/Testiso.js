'use strict'

const { Command } = require('@adonisjs/ace')
const FlowService = use('App/Services/FlowService');
const fs = require('fs');

class Testiso extends Command {
  static get signature () {
    return 'test:iso'
  }

  static get description () {
    return 'Tell something helpful about this command'
  }

  async handle (args, options) {
    const rawWorkspace = fs.readFileSync('testData/example 1/workspace.json');
    const workspace = JSON.parse(rawWorkspace)
    
    const rawCondition = fs.readFileSync('testData/example 1/condition.json');
    const condition = JSON.parse(rawCondition);
    
    const result = FlowService.getIsomorphicSubgraphs()

    
  }
}

module.exports = Testiso
