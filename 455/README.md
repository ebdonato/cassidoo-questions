# 455 - Longest Coprime Subsequence

Given an array of positive integers, find the length of the longest subsequence where every adjacent pair of elements in the subsequence is coprime (where the greatest common divisor, or GCD, is 1).

## Examples

```ts
longestCoprimeSubsequence([6, 12, 4, 8]);
// 1 // none are coprime

longestCoprimeSubsequence([4, 3, 6, 9, 7, 2]);
// 4 // [4, 3, 7, 2], where gcd(4,3)=1, gcd(3,7)=1, gcd(7,2)=1
```
