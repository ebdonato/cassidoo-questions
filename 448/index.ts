type Cell = 0 | 1 | 2;
type Grid = Cell[][];

/**
 * Returns the minimum Manhattan distance from each cell to the nearest fire station.
 * @param grid The city grid.
 * @returns A grid of minimum distances.
 */
export function fireStationCoverage(grid: Grid): number[][] {
  if (grid.length === 0 || grid[0].length === 0) {
    throw new Error("Grid must not be empty");
  }

  const width = grid[0].length;

  for (const row of grid) {
    if (row.length !== width) {
      throw new Error("Grid must be rectangular");
    }
  }

  const distances = grid.map((row) => row.map(() => Infinity));
  const queue: Array<[number, number]> = [];

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < width; col++) {
      if (grid[row][col] === 1) {
        distances[row][col] = 0;
        queue.push([row, col]);
      }
    }
  }

  if (queue.length === 0) {
    throw new Error("Grid must contain at least one fire station");
  }

  const directions: Array<[number, number]> = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];

  for (let index = 0; index < queue.length; index++) {
    const [row, col] = queue[index];

    for (const [rowOffset, colOffset] of directions) {
      const nextRow = row + rowOffset;
      const nextCol = col + colOffset;

      if (
        nextRow < 0 ||
        nextRow >= grid.length ||
        nextCol < 0 ||
        nextCol >= width
      ) {
        continue;
      }

      const nextDistance = distances[row][col] + 1;

      if (nextDistance < distances[nextRow][nextCol]) {
        distances[nextRow][nextCol] = nextDistance;
        queue.push([nextRow, nextCol]);
      }
    }
  }

  return distances;
}
