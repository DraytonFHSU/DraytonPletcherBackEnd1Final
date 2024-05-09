const express = require("express");
const router = express();
const stateController = require("../../controller/stateController");

//funfact router
router
    .route('/:code/funfact')
    .get(stateController.getFunFact)
    .post(stateController.addFunFact)
    .patch(stateController.patchFunFact)
    .delete(stateController.deleteFunFact)

//state router
router
  .route("/")
  .get(stateController.GetAllStates)
  .post(stateController.CreateNewState)
  .put(stateController.UpdateState)
  .delete(stateController.DeleteState);


//code router
router.route("/:code").get(stateController.GetAllState);

module.exports = router;
