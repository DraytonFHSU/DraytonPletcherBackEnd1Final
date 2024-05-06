const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

router
  .route("/")
  .get(stateController.GetAllStates)
  .post(stateController.CreateNewState)
  .put(stateController.UpdateState)
  .delete(stateController.DeleteState);

router.route("/:id").get(stateController.GetAllState);

module.exports = router;
