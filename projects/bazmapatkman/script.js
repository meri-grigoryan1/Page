document.addEventListener("DOMContentLoaded", function () {
    let table = document.getElementById("multiplication-table");
    let numRows = 9;
    let numCols = 9;

    for (let i = 0; i <= numRows; i++) {
        let row = document.createElement("tr"); // թիվը տեղադրում է աղյուսակի վանդակում
        for (let j = 0; j <= numCols; j++) {
        let  cell = document.createElement(i === 0 || j === 0 ? "th" : "td");
            if (i === 0 && j > 0) {
                cell.textContent = j;
            } else if (j === 0 && i > 0) {
                cell.textContent = i;
            } else {
                cell.textContent = i * j;
            }
            row.appendChild(cell); 
        }
        table.appendChild(row);
    }
});
