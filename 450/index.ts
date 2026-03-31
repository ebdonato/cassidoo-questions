type PathConfig = {
  [key: string]: string | null;
};

/**
 * Resolves a path by following a chain of path mappings until a terminal path is reached.
 *
 * @param pathConfig - An object mapping path keys to their resolved paths or null for terminal paths
 * @param path - The initial path to resolve
 * @param visited - A set tracking visited paths to detect cycles (defaults to empty set)
 * @returns The resolved terminal path, or null if a cycle is detected
 * @throws {Error} If the path does not exist in the configuration
 *
 * @example
 * ```typescript
 * const config = { 'a': 'b', 'b': 'c', 'c': null };
 * resolvePath(config, 'a'); // Returns 'c'
 * ```
 */
export function resolvePath(
  pathConfig: PathConfig,
  path: string,
  visited: Set<string> = new Set(),
): string | null {
  if (visited.has(path)) {
    return null;
  }

  visited.add(path);

  const nextPath = pathConfig[path];

  if (nextPath === undefined) {
    throw new Error(`Path "${path}" does not exist in the configuration.`);
  }

  if (nextPath === null) {
    return path;
  }

  return resolvePath(pathConfig, nextPath, visited);
}
