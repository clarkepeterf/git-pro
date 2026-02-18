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

### Use `git stash` to temporarily store work

`git stash` is perfect when you need to quickly switch branches but aren't ready to commit your current work.

examples:

1. Stash your current changes:

```
git stash
```

2. List all stashes:

```
git stash list
```

3. Apply the most recent stash:

```
git stash pop
```

4. Apply a specific stash without removing it:

```
git stash apply stash@{1}
```

5. Stash with a descriptive message:

```
git stash save "work in progress on user authentication"
```

### Use `git cherry-pick` to apply specific commits

`git cherry-pick` allows you to apply a specific commit from one branch to another.

examples:

1. Apply a single commit to your current branch:

```
git cherry-pick 14d81e4b
```

2. Apply multiple commits:

```
git cherry-pick 14d81e4b 25f92c3a 8b4e7f2d
```

3. Cherry-pick without committing (review changes first):

```
git cherry-pick 14d81e4b --no-commit
```

### Use `git reset` to undo changes

`git reset` moves the branch pointer and optionally updates the working directory.

examples:

1. **Soft reset** - undo commit but keep changes staged:

```
git reset --soft HEAD~1
```

2. **Mixed reset** (default) - undo commit and unstage changes:

```
git reset HEAD~1
```

3. **Hard reset** - undo commit and discard all changes:

```
git reset --hard HEAD~1
```

⚠️ **Warning**: Hard reset permanently destroys changes!

### Use `git reflog` to recover "lost" commits

`git reflog` shows a history of all HEAD movements, helping you recover seemingly lost commits.

examples:

1. View the reflog:

```
git reflog
```

2. Recover a "lost" commit:

```
# Find the commit hash in reflog output
git reflog
# Reset to that commit
git reset --hard 14d81e4b
```

3. Create a branch from a reflog entry:

```
git branch recovery-branch 14d81e4b
```

### Use `git bisect` to find bugs through binary search

`git bisect` helps you find which commit introduced a bug using binary search.

examples:

1. Start bisecting:

```
git bisect start
```

2. Mark the current commit as bad:

```
git bisect bad
```

3. Mark a known good commit:

```
git bisect good 14d81e4b
```

4. Git will checkout a commit in the middle. Test it and mark as good or bad:

```
# If the bug exists:
git bisect bad

# If the bug doesn't exist:
git bisect good
```

5. Repeat until Git finds the problematic commit, then reset:

```
git bisect reset
```

---

[Go Back To Table of Contents](./README.md#table-of-contents)
