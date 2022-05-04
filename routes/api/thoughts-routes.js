const router = require("express").Router();

const {
  getAllThoughts,
  getThoughtsById,
  createThoughts,
  updateThoughts,
  deleteThoughts,
  
} = require("../../controllers/thoughts-controller");

router.route("/").get(getAllThoughts);

router
  .route("/:id")
  .get(getThoughtsById)
  .put(updateThoughts)
  .delete(deleteThoughts);

router.route("/:userId").post(createThoughts);


module.exports = router;
