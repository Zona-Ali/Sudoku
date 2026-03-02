module.exports = { solve, validInp, play };

const sudokuValues = [];
const display = [];
for (let i = 0; i < 81; i++) {
    sudokuValues[i] = 0;
    display[i] = 0;
}
    let sud =[2,9,6,3,1,8,7,5,4,
 4,1,3,7,5,9,2,8,6,
 8,7,5,4,6,2,9,1,3,
 3,5,4,9,8,6,1,7,2,
 9,8,1,2,7,4,6,3,5,
 7,6,2,5,3,1,4,9,8,
 5,3,9,6,4,7,8,2,1,
 6,4,8,1,2,5,3,9,7,
 1,2,7,8,9,3,5,4,6]

//................................FOR PLAYING SUDOKU............................................
function play(lev) {

    // solve(sudokuValues); //...GET THE EMPTY GRID -> SOLVE IT -> GIVES THE SAME ANSWER ALL THE TIME... 
    rand(sud);  //...MANIPULATE THE SUDOKU TO GENERATE A UNIQUE GRID...
    let display = displaygame(lev);  //...HIDE SOME OF THE NUMBERS AND DISPLAY THE GAME...
    return { display, sud};
}

//...............................FOR SOLVING THE SUDOKU..........................................
function solve(sudokuValues) {
    for (let i = 0; i < 81; i++) {
        if (sudokuValues[i] === 0) {
            let row = rowCreate(i, sudokuValues);
            let col = colCreate(i, sudokuValues);
            let grid = gridCreate(i, sudokuValues);

            for (let num = 1; num <= 9; num++) {
                if (!row.includes(num) && !col.includes(num) && !grid.includes(num)) {
                    sudokuValues[i] = num;
                    if (solve(sudokuValues)) return sudokuValues;
                    sudokuValues[i] = 0;
                }
            }
            return false;
        }
    }
    return true;
}


function rand(sudokuValues) {
    for (let swap = 0; swap < 9; swap++) {

        let a = Math.floor(Math.random() * 9) + 1;
        let b = Math.floor(Math.random() * 9) + 1;

        while (a === b) {
            b = Math.floor(Math.random() * 9) + 1;
        }

        for (let idx = 0; idx < 81; idx++) {
            if (sudokuValues[idx] === a) {
                sudokuValues[idx] = b;
            } else if (sudokuValues[idx] === b) {
                sudokuValues[idx] = a;
            }
        }
    }

}

function displaygame(lev) {
    for (let i = 0; i < 81; i++) {
        display[i] = 0;
    }

    let n = (9 - lev) * 5
    let uniqueNumbers = new Set();

    while (uniqueNumbers.size < n) {
        let rand = Math.floor(Math.random() * 81);
        uniqueNumbers.add(rand);
    }

    let arr = Array.from(uniqueNumbers);

    for (let i = 0; i < n; i++) {
        let b = arr[i];
        display[b] = sud[b];
    }
    return display;
}

function gridCreate(num, arr) {
    let gridIndx = [];
    for (let box = 0; box < 9; box++) {
        let startRow = Math.floor(box / 3) * 3;
        let startCol = (box % 3) * 3;

        gridIndx.push([])
        for (let r = 0; r < 3; r++) {
            for (let c = 0; c < 3; c++) {
                let index = (startRow + r) * 9 + (startCol + c);
                gridIndx[box].push(index)
            }
        }

    }
    let finalGrid = [];
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (num === gridIndx[i][j]) {
                for (let m of gridIndx[i]) {
                    finalGrid.push(arr[m])
                }
            }
        }
    }
    if (!Check(finalGrid)) {
        wrong = false
    }
    return finalGrid;
}

function rowCreate(num, arr) {
    let rowIndx = [];
    for (let i = 0; i < 9; i++) {
        rowIndx.push([])
        for (let j = i; j <= 72 + i; j = j + 9) {
            rowIndx[i].push(j)
        }
    }
    let finalrow = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (num == rowIndx[i][j]) {
                for (let r of rowIndx[i]) {
                    finalrow.push(arr[r])
                }
            }
        }
    }
    if (!Check(finalrow)) {
        wrong = false
    }
    return finalrow;
}

function colCreate(num, arr) {
    let colIndx = [];
    for (let i = 0; i < 9; i++) {
        colIndx.push([])
        for (let j = 9 * i; j < (9 * i) + 9; j++) {
            colIndx[i].push(j)
        }
    }
    let finalcol = []
    for (let i = 0; i < 9; i++) {
        for (let j = 0; j < 9; j++) {
            if (num == colIndx[i][j]) {
                for (let c of colIndx[i]) {
                    finalcol.push(arr[c])
                }
            }
        }
    }
    if (!Check(finalcol)) {
        wrong = false
    }
    return finalcol;
}

function Check(arr) {
    let seen = new Set();
    for (let num of arr) {
        if (num == 0) continue;
        if (seen.has(num)) {
            return false;
        }
        seen.add(num);
    }
    return true;
}

function validInp(arr) {
    for (let i = 0; i < 81; i++) {
        let isValid =
            Check(gridCreate(i, arr)) &&
            Check(colCreate(i, arr)) &&
            Check(rowCreate(i, arr));

        if (!isValid) {
            return false;
        }
    }
    return true;
}


