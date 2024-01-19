'use strict';

// See https://rosettacode.org/wiki/Maze_generation#JavaScript
class Maze {
    static draw({ x, y, rows, columns }, canvasElement) {
        let context = canvasElement.getContext('2d');
        let cellWidth = Math.floor(canvasElement.width / (y + 2));
        let cellHeight = Math.floor(canvasElement.height / (x + 2));

        context.fillStyle = 'black';
        context.strokeStyle = 'white';
        context.fillRect(0, 0, canvasElement.width, canvasElement.height);

        for (let j = 0; j <= x; j++) {
            for (let k = 0; k <= y; k++) {
                if (k < y && !(j > 0 && rows[j - 1][k])) {
                    if (!(k === 0 && j === 0)) {
                        context.beginPath();
                        context.moveTo(cellWidth * (k + 1), cellHeight * (j + 1));
                        context.lineTo(cellWidth * (k + 2), cellHeight * (j + 1));
                        context.closePath();
                        context.stroke();
                    }
                }

                if (j < x && !(k > 0 && columns[j][k - 1])) {
                    if (!(j === x - 1 && k === y)) {
                        context.beginPath();
                        context.moveTo(cellWidth * (k + 1), cellHeight * (j + 1));
                        context.lineTo(cellWidth * (k + 1), cellHeight * (j + 2));
                        context.closePath();
                        context.stroke();
                    }
                }
            }
        }
    }

    static generate(x = 1, y = 1) {
        let n = x * y - 1;
        let position = { 'x': Math.floor(Math.random() * x), 'y': Math.floor(Math.random() * y) };
        let path = [ position ];

        let unvisited = [];
        let columns = [];
        let rows = [];

        for (let j = 0; j < x; ++j) {
            columns[j] = Array(y).fill(false);
        }

        for (let j = 0; j < x; ++j) {
            rows[j] = Array(y).fill(false);
        }

        for (let j = 0; j <= x + 1; ++j) {
            unvisited[j] = [];

            for (let k = 0; k <= y; ++k) {
                unvisited[j].push(j > 0 && j < x + 1 && k > 0 && (j !== position.x + 1 || k !== position.y + 1));
            }
        }

        while (0 < n) {
            let neighbors = [];
            [
                { 'x': position.x + 1, 'y': position.y },
                { 'x': position.x , 'y': position.y + 1 },
                { 'x': position.x - 1, 'y': position.y },
                { 'x': position.x, 'y': position.y - 1 }
            ].forEach(potential => {
                if (unvisited[potential.x + 1][potential.y + 1]) {
                    neighbors.push(potential);
                }
            });

            if (neighbors.length) {
                let next = neighbors[Math.floor(Math.random() * neighbors.length)];
                n = n - 1;
                unvisited[next.x + 1][next.y + 1] = false;

                if (next.x === position.x) {
                    columns[next.x][(next.y + position.y - 1) / 2] = true;

                } else {
                    rows[(next.x + position.x - 1) / 2][next.y] = true;
                }

                path.push(position = next);

            } else {
                position = path.pop();
            }
        }

        return {
            'x': x,
            'y': y,
            'columns': columns,
            'rows': rows
        };
    }

    static run({ x, y, rows, columns }, { x: userX, y: userY, resolved, move }, canvasElement) {
        let context = canvasElement.getContext('2d');
        let cellWidth = Math.floor(canvasElement.width / (y + 2));
        let cellHeight = Math.floor(canvasElement.height / (x + 2));
        let radius = Math.round(Math.min(cellWidth, cellHeight) / 4);

        context.beginPath();
        context.arc(cellWidth * 1.5 + cellWidth * userY, cellHeight * 1.5 + cellHeight * userX, radius, 0, 2 * Math.PI, false);
        context.fillStyle = resolved ? 'green' : 'red';
        context.fill();

        if (!resolved) {
            let nextX = userX;
            let nextY = userY;
            let moveToDo = move;

            switch(move) {
                case 'left':
                    if (userX !== 0 && userY !== 0 && rows[userX - 1][userY]) {
                        // Move to up of the plan
                        nextX--;
                        moveToDo = 'up';

                    } else if (columns[userX][userY]) {
                        // Move to left of the plan
                        nextY++;
                        moveToDo = 'left';

                    } else if (rows[userX][userY]) {
                        // Move to down of the plan
                        nextX++;
                        moveToDo = 'down';

                    } else if (columns[userX][userY - 1]) {
                        // Move to right of the plan
                        nextY--;
                        moveToDo = 'right';
                    }
                    break;

                case 'right':
                    if (rows[userX][userY]) {
                        // Move to down of the plan
                        nextX++;
                        moveToDo = 'down';

                    } else if (columns[userX][userY - 1]) {
                        // Move to right of the plan
                        nextY--;
                        moveToDo = 'right';

                    } else if (userX !== 0 && userY !== 0 && rows[userX - 1][userY]) {
                        // Move to up of the plan
                        nextX--;
                        moveToDo = 'up';

                    } else if (columns[userX][userY]) {
                        // Move to left of the plan
                        nextY++;
                        moveToDo = 'left';
                    }
                    break;

                case 'up':
                    if (columns[userX][userY - 1]) {
                        // Move to right of the plan
                        nextY--;
                        moveToDo = 'right';

                    } else if (userX !== 0 && userY !== 0 && rows[userX - 1][userY]) {
                        // Move to up of the plan
                        nextX--;
                        moveToDo = 'up';

                    } else if (columns[userX][userY]) {
                        // Move to left of the plan
                        nextY++;
                        moveToDo = 'left';

                    } else if (rows[userX][userY]) {
                        // Move to down of the plan
                        nextX++;
                        moveToDo = 'down';
                    }
                    break;

                default:
                    if (columns[userX][userY]) {
                        // Move to right of the plan
                        nextY++;
                        moveToDo = 'left';

                    } else if (rows[userX][userY]) {
                        // Move to down of the plan
                        nextX++;
                        moveToDo = 'down';

                    } else if (columns[userX][userY - 1]) {
                        // Move to left of the plan
                        nextY--;
                        moveToDo = 'right';

                    } else if (userX !== 0 && userY !== 0 && rows[userX - 1][userY]) {
                        // Move to up of the plan
                        nextX--;
                        moveToDo = 'up';
                    }
                    break;
            }

            return {
                'x': nextX,
                'y': nextY,
                'resolved': nextX === x - 1 && nextY === y - 1,
                'move': moveToDo
            };
        }

        return arguments[1];
    }

    /**
     * @example console.log(Maze.toString(Maze.generate(10, 10)))
     +   +---+---+---+---+---+---+---+---+---+
     |           |               |           |
     +   +   +---+   +---+---+   +---+   +   +
     |   |   |       |       |       |   |   |
     +   +   +   +---+   +---+---+---+   +   +
     |   |   |       |                   |   |
     +   +   +---+   +---+   +---+---+---+   +
     |   |   |       |       |       |       |
     +   +   +   +---+   +---+   +   +   +---+
     |   |   |   |   |       |   |   |   |   |
     +   +   +   +   +   +   +   +   +   +   +
     |   |   |       |   |   |   |   |   |   |
     +   +   +---+   +---+   +   +---+   +   +
     |   |       |           |           |   |
     +   +---+   +---+---+---+   +---+---+   +
     |   |   |           |       |           |
     +   +   +---+---+   +   +---+   +---+   +
     |   |           |   |   |       |   |   |
     +   +   +---+   +   +   +   +---+   +   +
     |       |       |           |
     +---+---+---+---+---+---+---+---+---+---+
     */
    static toString({ x, y, rows, columns }) {
        let text = [];

        for (let j = 0; j < x * 2 + 1; j++) {
            let line = [];

            if (0 === j % 2) {
                for (let k = 0; k < y * 4 + 1; k++) {
                    if (0 === k % 4) {
                        line[k] = '+';
                    } else {
                        line[k] = j > 0 && rows[j / 2 - 1][Math.floor(k / 4)] ? ' ' : '-';
                    }
                }

            } else {
                for (let k = 0; k < y * 4 + 1; k++) {
                    if (0 === k % 4) {
                        line[k] = k > 0 && columns[(j - 1) / 2][k / 4 - 1] ? ' ' :  '|';

                    } else {
                        line[k] = ' ';
                    }
                }
            }

            if (0 === j) {
                line[1] = line[2] = line[3] = ' ';
            }

            if (x * 2 - 1 === j){
                line[ 4 * y]= ' ';
            }
            text.push(line.join('') + '\r\n');
        }

        return text.join('');
    }
}

export default Maze;
// module.exports = Maze;
