# Perrin Combinations

Given an integer `n`, return all unique combinations of Perrin numbers
(up to and including the nth Perrin number) that sum to a target value `k`,
where each Perrin number can be used at most once.
Return the combinations sorted in ascending order.

## Examples

```ts
perrinCombinations(7, 12);
// [[0,2,3,7],[0,5,7],[2,3,7],[5,7]]

perrinCombinations(6, 5);
// [[0,2,3],[0,5],[2,3],[5]]
```
