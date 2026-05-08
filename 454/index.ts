type Cell = [number, number];

const DIRECTIONS: Cell[] = [
  [1, 0],
  [-1, 0],
  [0, 1],
  [0, -1],
];

/**
 * Calculates the minimum number of repairs needed to ensure that no connected
 * component of 0s in the grid exceeds size `k`.
 *
 * @param grid - A 2D array representing the grid, where 0 indicates a broken cell and 1 indicates a functional cell.
 * @param k - The maximum allowed size of a connected component of 0s.
 * @returns The minimum number of repairs required.
 * @throws Will throw an error if the input grid is not a valid 2D array or if `k` is not a positive integer.
 */
export function minRepairs(grid: number[][], k: number): number {
  validateInput(grid, k);

  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;

  if (rows === 0 || cols === 0) {
    return 0;
  }

  const visited = Array.from({ length: rows }, () => Array(cols).fill(false));
  let repairs = 0;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (grid[r]?.[c] !== 0 || visited[r]?.[c]) {
        continue;
      }

      const region = collectRegion(grid, r, c, visited);
      repairs += minRepairsForRegion(region, k);
    }
  }

  return repairs;
}

function validateInput(grid: number[][], k: number): void {
  if (!Number.isInteger(k) || k < 1) {
    throw new Error("k must be a positive integer");
  }

  if (!Array.isArray(grid)) {
    throw new Error("grid must be a 2D array");
  }

  if (grid.length === 0) {
    return;
  }

  const cols = grid[0]?.length;
  if (cols === undefined) {
    throw new Error("grid must be a 2D array");
  }

  for (const row of grid) {
    if (!Array.isArray(row) || row.length !== cols) {
      throw new Error("grid must be rectangular");
    }

    for (const cell of row) {
      if (cell !== 0 && cell !== 1) {
        throw new Error("grid values must be 0 or 1");
      }
    }
  }
}

function collectRegion(
  grid: number[][],
  startR: number,
  startC: number,
  visited: boolean[][],
): Cell[] {
  const rows = grid.length;
  const cols = grid[0]?.length ?? 0;
  const queue: Cell[] = [[startR, startC]];
  const region: Cell[] = [];

  visited[startR]![startC] = true;

  while (queue.length > 0) {
    const [r, c] = queue.shift()!;
    region.push([r, c]);

    for (const [dr, dc] of DIRECTIONS) {
      const nr = r + dr;
      const nc = c + dc;

      if (
        nr < 0 ||
        nr >= rows ||
        nc < 0 ||
        nc >= cols ||
        visited[nr]?.[nc] ||
        grid[nr]?.[nc] !== 0
      ) {
        continue;
      }

      visited[nr]![nc] = true;
      queue.push([nr, nc]);
    }
  }

  return region;
}

function minRepairsForRegion(region: Cell[], k: number): number {
  const n = region.length;
  if (n <= k) {
    return 0;
  }

  if (n > 52) {
    return greedyFallback(region, k);
  }

  const positionToIndex = new Map<string, number>();
  for (let i = 0; i < n; i++) {
    const [r, c] = region[i]!;
    positionToIndex.set(`${r},${c}`, i);
  }

  const adjacency: bigint[] = Array.from({ length: n }, () => 0n);

  for (let i = 0; i < n; i++) {
    const [r, c] = region[i]!;

    for (const [dr, dc] of DIRECTIONS) {
      const neighborIdx = positionToIndex.get(`${r + dr},${c + dc}`);
      if (neighborIdx !== undefined) {
        adjacency[i] |= 1n << BigInt(neighborIdx);
      }
    }
  }

  const memo = new Map<bigint, number>();
  const fullMask = (1n << BigInt(n)) - 1n;

  return solveMask(fullMask, adjacency, k, memo);
}

function solveMask(
  mask: bigint,
  adjacency: bigint[],
  k: number,
  memo: Map<bigint, number>,
): number {
  const cached = memo.get(mask);
  if (cached !== undefined) {
    return cached;
  }

  const oversized = getOversizedComponent(mask, adjacency, k);
  if (oversized.length === 0) {
    memo.set(mask, 0);
    return 0;
  }

  // Branch on vertices in one oversized component; deleting one is required.
  const candidates = oversized
    .map((idx) => ({
      idx,
      degree: countBits(adjacency[idx]! & toMask(oversized)),
    }))
    .sort((a, b) => b.degree - a.degree)
    .map((entry) => entry.idx);

  let best = Number.POSITIVE_INFINITY;

  for (const idx of candidates) {
    const nextMask = mask & ~(1n << BigInt(idx));
    const cost = 1 + solveMask(nextMask, adjacency, k, memo);
    if (cost < best) {
      best = cost;
    }
  }

  memo.set(mask, best);
  return best;
}

function getOversizedComponent(
  mask: bigint,
  adjacency: bigint[],
  k: number,
): number[] {
  let remaining = mask;

  while (remaining !== 0n) {
    const start = leastBitIndex(remaining);
    const componentMask = floodFill(mask, adjacency, start);
    const size = countBits(componentMask);

    if (size > k) {
      return maskToIndices(componentMask);
    }

    remaining &= ~componentMask;
  }

  return [];
}

function floodFill(mask: bigint, adjacency: bigint[], start: number): bigint {
  let component = 0n;
  let frontier = 1n << BigInt(start);

  while (frontier !== 0n) {
    const idx = leastBitIndex(frontier);
    const bit = 1n << BigInt(idx);
    frontier &= ~bit;

    if ((component & bit) !== 0n || (mask & bit) === 0n) {
      continue;
    }

    component |= bit;
    frontier |= adjacency[idx]! & mask & ~component;
  }

  return component;
}

function maskToIndices(mask: bigint): number[] {
  const indices: number[] = [];
  let bits = mask;

  while (bits !== 0n) {
    const idx = leastBitIndex(bits);
    indices.push(idx);
    bits &= ~(1n << BigInt(idx));
  }

  return indices;
}

function toMask(indices: number[]): bigint {
  let mask = 0n;
  for (const idx of indices) {
    mask |= 1n << BigInt(idx);
  }
  return mask;
}

function leastBitIndex(mask: bigint): number {
  let idx = 0;
  let bits = mask;

  while ((bits & 1n) === 0n) {
    bits >>= 1n;
    idx++;
  }

  return idx;
}

function countBits(mask: bigint): number {
  let count = 0;
  let bits = mask;

  while (bits !== 0n) {
    bits &= bits - 1n;
    count++;
  }

  return count;
}

function greedyFallback(region: Cell[], k: number): number {
  const remaining = new Set(region.map(([r, c]) => `${r},${c}`));
  let repairs = 0;

  while (true) {
    const components = findComponentsFromSet(remaining);
    const oversized = components.find((component) => component.length > k);

    if (!oversized) {
      return repairs;
    }

    const score = new Map<string, number>();
    for (const node of oversized) {
      score.set(node, 0);
    }

    for (const node of oversized) {
      const [r, c] = node.split(",").map(Number);
      for (const [dr, dc] of DIRECTIONS) {
        const neighbor = `${r + dr},${c + dc}`;
        if (score.has(neighbor)) {
          score.set(node, (score.get(node) ?? 0) + 1);
        }
      }
    }

    let bestNode = oversized[0]!;
    for (const node of oversized) {
      if ((score.get(node) ?? 0) > (score.get(bestNode) ?? 0)) {
        bestNode = node;
      }
    }

    remaining.delete(bestNode);
    repairs++;
  }
}

function findComponentsFromSet(nodes: Set<string>): string[][] {
  const components: string[][] = [];
  const visited = new Set<string>();

  for (const node of nodes) {
    if (visited.has(node)) {
      continue;
    }

    const component: string[] = [];
    const queue: string[] = [node];
    visited.add(node);

    while (queue.length > 0) {
      const current = queue.shift()!;
      component.push(current);

      const [r, c] = current.split(",").map(Number);

      for (const [dr, dc] of DIRECTIONS) {
        const neighbor = `${r + dr},${c + dc}`;

        if (nodes.has(neighbor) && !visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }

    components.push(component);
  }

  return components;
}
