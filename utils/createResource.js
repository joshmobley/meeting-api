const express = require('express')
const router = express.Router()
const bodyParser = require('body-parser')
const hasSession = require('../middleware/hasSession')

const createResource = (
    readAllFn,
    createFn,
    readFn,
    updateFn,
    deleteFn,
    options = {}
) => {

    router.use(bodyParser.urlencoded({ extended: true }))
    router.use(bodyParser.json())

    if(readAllFn)   router.get('/', hasSession, readAllFn)
    if(createFn) {
        if(options.publicCreate) router.post('/', createFn)
        else router.post('/', hasSession, createFn)
    }
    if(readFn)      router.get('/:id', hasSession, readFn)
    if(updateFn)    router.put('/:id', hasSession, updateFn)
    if(deleteFn)    router.delete('/:id', hasSession, deleteFn)

    return router;
    
}

module.exports = createResource
