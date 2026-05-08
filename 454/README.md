# This week's question

You are given a 2D grid where `1` represents an intact tile and `0` represents a broken tile. A broken region is a group of connected `0`s (connected horizontally or vertically).

Find the minimum number of tiles you need to repair so that no broken region has area larger than `k`.

## Examples

```ts
const grid = [
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [0, 1, 1, 1],
];
const k = 2;

const newGrid = [
  [1, 0, 0, 1],
  [1, 0, 0, 1],
  [1, 1, 0, 1],
  [0, 0, 1, 1],
];
const newK = 1;

minRepairs(grid, k); // 2
minRepairs(newGrid, newK); // 3
```
