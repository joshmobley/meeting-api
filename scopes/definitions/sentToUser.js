module.exports = {
    sentToUser: function(currentUserId) {
        return {
            where: {
                recipientId: currentUserId
            }
        }
    }
}