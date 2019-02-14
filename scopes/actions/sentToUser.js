const sentToUser = (userId) => {
    return { method: ['sentToUser', userId] }
}

module.exports = sentToUser