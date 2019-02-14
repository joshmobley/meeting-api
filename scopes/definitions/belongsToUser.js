module.exports = {
    belongsToUser: function(currentUserId) {
        return {
            where: {
                userId: currentUserId
            }
        }
    }
}