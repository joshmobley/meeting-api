const belongsToUser = (userId) => {
    return { method: ['belongsToUser', userId] }
}

module.exports = belongsToUser