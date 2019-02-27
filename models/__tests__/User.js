const User = require('../User')
const { sequelize, dataTypes, checkModelName, checkPropertyExists } = require('sequelize-test-helpers')

test('tests password validation', () => {

    const TestUser = User(sequelize, dataTypes)
    const instance = new TestUser()

    checkModelName(TestUser)('User')
    

    
})