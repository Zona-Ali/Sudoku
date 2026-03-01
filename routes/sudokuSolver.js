const express = require("express");
const router = express.Router();
const callback = require("../controllers/sudokuSolver.js")


router.get("/",callback.sudokuSolver)

router.post("/",callback.sudokuSolverSol)
 
module.exports = router;