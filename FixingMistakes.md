## Fixing Mistakes

![Fixing Git Mistakes](./images/fixing-mistakes-git.png)

Everyone makes mistakes with Git! Here's how to fix the most common ones safely.

### Undoing the last commit

#### If you haven't pushed yet:

**Keep your changes but undo the commit:**

```
git reset --soft HEAD~1
```

**Undo the commit and unstage changes:**

```
git reset HEAD~1
```

**Completely undo the commit and discard all changes:**

```
git reset --hard HEAD~1
```

⚠️ **Warning**: `--hard` permanently destroys your changes!

#### If you already pushed:

**Create a new commit that undoes the changes:**

```
git revert HEAD
```

### Changing commit messages

#### Change the last commit message (if not pushed):

```
git commit --amend -m "New commit message"
```

#### Change older commit messages:

```
git rebase -i HEAD~3
```

This opens an interactive editor. Change `pick` to `reword` for commits you want to edit, then save. Git will prompt you to edit each message.

### Removing files from a commit

#### Remove a file from the last commit (if not pushed):

```
git reset --soft HEAD~1
git reset HEAD path/to/file.txt
git commit
```

### Recovering deleted branches

#### Find the deleted branch in reflog:

```
git reflog
```

#### Recreate the branch:

```
git branch recovered-branch-name commit-hash-from-reflog
```

### When and how to force push safely

#### ⚠️ Never force push to shared branches (main, develop, etc.)!

#### Safe force push to your feature branch:

**Use `--force-with-lease` instead of `--force`:**

```
git push --force-with-lease origin feature-branch
```

This checks that no one else has pushed changes since your last pull.

#### When force push is acceptable:

- Your own feature branch that others aren't working on
- After rebasing or amending commits
- Cleaning up commit history before merging

#### When force push is dangerous:

- Shared branches (main, develop)
- Branches others are actively working on
- Production or release branches

### Fixing "I committed to the wrong branch"

#### Move the last commit to a new branch:

```
# Create new branch from current position
git branch new-feature-branch

# Reset current branch back one commit
git reset --hard HEAD~1

# Switch to the new branch
git checkout new-feature-branch
```

#### Move the last commit to an existing branch:

```
# Switch to the target branch
git checkout target-branch

# Cherry-pick the commit
git cherry-pick wrong-branch

# Go back and remove it from wrong branch
git checkout wrong-branch
git reset --hard HEAD~1
```

### Fixing merge conflicts

#### Mergetool

Setting up a git mergetool makes things easier, otherwise, use the solution below:

#### When a merge conflict occurs:

1. **See which files have conflicts:**

```
git status
```

2. **Open conflicted files and look for conflict markers:**

```
<<<<<<< HEAD
Your changes
=======
Their changes
>>>>>>> branch-name
```

3. **Edit the file to resolve conflicts** (remove markers, keep desired content)

4. **Mark as resolved:**

```
git add resolved-file.txt
```

5. **Complete the merge:**

```
git commit
```

#### Abort a merge if things go wrong:

```
git merge --abort
```

### Miscellaneous fixes

#### Undo all local changes and get back to last commit:

```
git checkout .
```

#### Remove untracked files:

```
# Preview what will be deleted
git clean -n

# Delete untracked files
git clean -f

# Delete untracked files and directories
git clean -fd
```

#### Fix "detached HEAD" state:

```
# Create a new branch from current position
git checkout -b new-branch-name

# Or go back to a branch
git checkout main
```

#### Undo changes to a file:

```
# Undo changes for a specific file
git restore file.txt

# Undo changes for all files
git restore --staged .
```

#### Undo staging (after git add):

```
# Unstage specific file
git restore --staged file.txt

# Unstage all files
git restore --staged .
```

### Further reading

- [Oh Shit, Git!?!](https://ohshitgit.com/)

---

[Go Back To Table of Contents](./README.md#table-of-contents)
