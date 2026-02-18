## Pro Moves

![Git Pro Move](./images/pro-move-git.png)

### Use `--` to reference specific files

You can use `--` in a git command to reference specific files

examples:

1. only show commits where Basic.md was updated

```
git log -- Basics.md
```

2. only show diffs for src/hello.js

```
git difftool -- src/hello.js
```

### Use `HEAD` and `~` to reference commits

`HEAD` references the most recent commit on your branch.

`~` allows referencing previous commits

- `HEAD~1` is one commit before the most recent commit
- `HEAD~2` is two commits before the most recent commit
- `14d81e4b~1` is one commit before commit hash 14d81e4b

examples:

1. Show differences between the previous commit and the most recent comment

```
git difftool HEAD~1 HEAD
```

2. Use `git log` to find a commit of interest from history, then:

```
git difftool e6ebd47d3456ca07be044000f4f2706091ea60b2~1 e6ebd47d3456ca07be044000f4f2706091ea60b2
```

### Use `git blame` to find when a line changed

example:

1. `git blame Basics.md`

2. pull the commit number from the `git blame` output
3.

```
# View the commit message in the log
git log 14d81e4b

# View diff with the previous commit
git difftool 14d81e4b~1 14d81e4b
```

### Use `git revert` to revert a commit

1. Use `git log` to find commit to revert
2. `git revert 14d81e4b`

OR if you want to see the changes before committing:
`git revert 14d81e4b --no-commit`

---

[Go Back To Table of Contents](./README.md#table-of-contents)
