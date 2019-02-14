const asyncAction = async (req, res, action) => {
    try {
        return await action
    } catch(err) {
        return res.status(400).send(err.message)
    }
}

module.exports = asyncAction;