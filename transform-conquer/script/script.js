function gaussianElimination(matrix) {
    let n = matrix.length;

    for (let i = 0; i < n; i++) {
        let maxEl = Math.abs(matrix[i][i]),
            maxRow = i;
        for (let k = i + 1; k < n; k++) {
            if (Math.abs(matrix[k][i]) > maxEl) {
                maxEl = Math.abs(matrix[k][i]);
                maxRow = k;
            }
        }

        for (let k = i; k < n + 1; k++) {
            let tmp = matrix[maxRow][k];
            matrix[maxRow][k] = matrix[i][k];
            matrix[i][k] = tmp;
        }

        for (let k = i + 1; k < n; k++) {
            let c = -matrix[k][i] / matrix[i][i];
            for (let j = i; j < n + 1; j++) {
                if (i === j) {
                    matrix[k][j] = 0;
                } else {
                    matrix[k][j] += c * matrix[i][j];
                }
            }
        }
    }

    let x = new Array(n).fill(0);
    for (let i = n - 1; i > -1; i--) {
        x[i] = matrix[i][n] / matrix[i][i];
        for (let k = i - 1; k > -1; k--) {
            matrix[k][n] -= matrix[k][i] * x[i];
        }
    }

    return x;
}

function solve() {
    let matrix = [];
    for (let i = 1; i <= 3; i++) {
        let row = [];
        for (let j = 1; j <= 3; j++) {
            row.push(parseFloat(document.getElementById(`a${i}${j}`).value));
        }
        row.push(parseFloat(document.getElementById(`b${i}`).value));
        matrix.push(row);
    }

    let solution = gaussianElimination(matrix);
    document.getElementById("solution").innerHTML = `<p>Solution: ${solution.map(x => isNaN(x) ? 'No solution' : x.toFixed(2)).join(', ')}</p>`;
}
