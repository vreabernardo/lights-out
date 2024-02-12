const DEAD_COLOR = "rgb(3, 62, 0)";
const ALIVE_COLOR = "rgb(13, 255, 0)";

class Cell {
    constructor(x, y, state) {
        this.x = x;
        this.y = y;
        this.state = state;
    }

    displayInfo() {
        console.log(`(${this.x},${this.y})`);
    }
    
}

class Grid {
    constructor(gridSize) {
        this.grid = document.querySelector('.grid');
        this.gridSize = gridSize;
        this.array2D = [];

        this.initializeGrid();
    }

    initializeGrid() {
        this.grid.style.gridTemplateRows = `repeat(${this.gridSize}, 1fr)`;
        this.grid.style.gridTemplateColumns = `repeat(${this.gridSize}, 1fr)`;
    
        for (let i = 0; i < this.gridSize; i++) {
            const row = [];
            for (let j = 0; j < this.gridSize; j++) {
                const randomState = Math.round(Math.random()) == 1;
                console.log(randomState);
                row.push(new Cell(i, j, randomState));
            }
            this.array2D.push(row);
        }
    
        this.renderGrid();
    }

    renderGrid() {
        for (let i = 0; i < this.array2D.length; i++) {
            for (let j = 0; j < this.array2D[0].length; j++) {
                const cell_div = document.createElement('div');
                cell_div.classList.add('cell');
                cell_div.setAttribute("data-row", i);
                cell_div.setAttribute("data-col", j); 
                cell_div.setAttribute("onclick", "update_state(this)");

                let color = this.array2D[i][j].state ? ALIVE_COLOR : DEAD_COLOR;
                cell_div.style.backgroundColor = color;

                this.grid.appendChild(cell_div);
            }
        }
    }

    isGameAlive(){
        for (let i = 0; i < this.array2D.length; i++) {
            for (let j = 0; j < this.array2D[0].length; j++) {
                if(!this.array2D[i][j].state){
                    console.log(this.array2D[i][j])
                    return true

                }
            }
        }
    return false
    }
}

function update_state(item) {
    const row = parseInt(item.dataset.row);
    const col = parseInt(item.dataset.col);

    let target_cell = grid.array2D[row][col];
    target_cell.state = !target_cell.state;
    item.style.backgroundColor = target_cell.state ? ALIVE_COLOR : DEAD_COLOR;

    const offsets = [
        [-1, 0],
        [1, 0],  
        [0, -1], 
        [0, 1]  
    ];

    offsets.forEach(offset => {
        const newRow = row + offset[0];
        const newCol = col + offset[1];
        if (newRow >= 0 && newRow < grid.array2D.length && newCol >= 0 && newCol < grid.array2D[0].length) {
            let neighbor_cell = grid.array2D[newRow][newCol];
            neighbor_cell.state = !neighbor_cell.state;

            const neighborItem = document.querySelector(`[data-row="${newRow}"][data-col="${newCol}"]`);
            neighborItem.style.backgroundColor = neighbor_cell.state ? ALIVE_COLOR : DEAD_COLOR;
        }
    });
    console.log(grid.isGameAlive())
    if (!grid.isGameAlive()) {
        document.getElementById('gameStatus').innerText = "Game Over";
    }

}

const grid_size = 5;
const grid = new Grid(grid_size);




