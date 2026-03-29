# This week's question

Given a text string and a pattern, implement a fuzzy string search using the Bitap algorithm that finds all positions in the text where the pattern matches with at most k errors (insertions, deletions, or substitutions). Return an array of objects containing the position and the number of errors at that match.

Examples:

```text
fuzzySearch("the cat sat on the mat", "cat", 0)
[{ position: 4, errors: 0 }]

fuzzySearch("cassidoo", "cool", 1)
[]

fuzzySearch("cassidoo", "cool", 3)
[{ position: 3, errors: 3 }, { position: 4, errors: 2 }]
```
