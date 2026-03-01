const { solve, validInp} = require("../logic.js")

module.exports.sudokuSolver = (req, res) => {
    res.render("./pages/sudokuSolver.ejs")
}

module.exports.sudokuSolverSol = (req, res) => {
    let { arr } = req.body;
    let intArr = arr.map(x => x === "" ? 0 : Number(x));

    if (!validInp(intArr)) {
        req.flash("error", "THIS IS INVALID SUDOKU");
        return res.redirect("/sudokuSolver");
    } else {
        let sudokuValues = solve(intArr)
        res.render("./pages/solverAns.ejs", { sudokuValues })
    }

}