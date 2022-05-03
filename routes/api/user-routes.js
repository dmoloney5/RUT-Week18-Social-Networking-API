const router = require('express').Router();

const {
    getAllUsers,
    getUserById,
    CreateUsers,
    updateUsers,
    deleteUsers,
    addFriend,
    deleteFriend
} = require('../../controllers/users-controllers');

router.route('/').get(getAllUsers).post(CreateUsers);

router.route('/:id').get(getUsersById).put(updateUsers).delete(deleteUsers);

router.route('/:id/friends/:friendId').post(addFriend).delete(deleteFriend);

module.exports = router;