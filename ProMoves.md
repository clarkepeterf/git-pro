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

### Use Git Hooks

Git hooks are scripts that run automatically at specific points in your Git workflow. They help enforce standards, run tests, and automate repetitive tasks.

Git hooks are stored in the `.git/hooks/` directory of your repository. They're executable scripts that can be written in any scripting language (bash, Python, Node.js, etc.).

#### Types of Git Hooks

**Client-side hooks** (run on your local machine):

- `pre-commit` - runs before creating a commit
- `prepare-commit-msg` - runs before the commit message editor opens
- `commit-msg` - runs after you enter a commit message
- `post-commit` - runs after a commit is completed
- `pre-push` - runs before pushing to a remote

**Server-side hooks** (run on the Git server):

- `pre-receive` - runs when receiving a push
- `update` - runs for each branch being updated
- `post-receive` - runs after a successful push

Below I will only talk about pre-commit hooks because that's what I use

#### Basic pre-commit hook for code quality

Create `.git/hooks/pre-commit` and make it executable:

```bash
#!/bin/sh

# Run linting
echo "Running ESLint..."
npm run lint
if [ $? -ne 0 ]; then
    echo "❌ Linting failed. Please fix errors before committing."
    exit 1
fi

# Run tests
echo "Running tests..."
npm test
if [ $? -ne 0 ]; then
    echo "❌ Tests failed. Please fix tests before committing."
    exit 1
fi

echo "✅ All checks passed!"
```

Make it executable:

```bash
chmod +x .git/hooks/pre-commit
```

#### Sharing Hooks Across Team

##### Method 1: Committed hook scripts

Create a `hooks/` directory in your repo:

```
hooks/
├── pre-commit
├── commit-msg
└── install-hooks.sh
```

Create `hooks/install-hooks.sh`:

```bash
#!/bin/bash
# Copy hooks to .git/hooks and make them executable
cp hooks/* .git/hooks/
chmod +x .git/hooks/*
echo "✅ Git hooks installed successfully!"
```

Team members run: `./hooks/install-hooks.sh`

##### Method 2: Using git config

Set up hooks directory:

```bash
git config core.hooksPath hooks
```

This makes Git look for hooks in the `hooks/` directory instead of `.git/hooks/`.

### Rebasing vs Merging

Both merge and rebase integrate changes from one branch into another, but they create different history patterns.

#### First let's visualize it

You have a feature branch which has diverged from main, and main has had two commits since you created your branch:
![feature and main](./images/feature-and-main.svg)

If you merge with these commands

```
git checkout feature
git merge main
```

The commit history will look like this:
![merge](./images/merge.svg)

If you rebase with these commands

```
git checkout feature
git rebase main
```

the commit history will look like this:
![rebase](./images/rebase.svg)

#### Git Merge

**What it does:** Creates a merge commit that combines two branches

**When to use merge:**

- Preserving the complete history and context of feature development
- Working on shared/public branches
- When you want to maintain branch topology
- For release branches and major feature integration

examples:

```
# Merge feature branch into main
git checkout main
git merge feature-branch
```

**Result:** Creates a merge commit showing both branches converged

#### Git Rebase

**What it does:** Replays commits from one branch onto another, creating a linear history

**When to use rebase:**

- Creating clean, linear project history
- Working on private/local feature branches
- Before merging to avoid unnecessary merge commits
- Incorporating upstream changes into your feature branch

example:

**Rebase feature branch onto main, then merge:**

```
# Update feature branch with latest main
git checkout feature-branch
git rebase main

# Fast-forward merge into main
git checkout main
git merge feature-branch
```

#### Comparison Example:

```
git checkout hello-empty-name
# create a new branch to keep our example separated
git checkout -b empty-exclamation-merge
git merge hello-exclamation

# commits look like this:
# empty name -> exclamation -> merge

git checkout hello-empty-name
# create a new branch to keep our example separated
git checkout -b empty-exclamation-rebase
git rebase hello-exclamation

# commits look like this:
# exclamation -> empty name
# - empty name happend AFTER exclamation, because we rebased
# - there is no merge commit
```

#### Remote Merge / Rebase

You can merge / rebase the latest from a remote branch (such as `main`) as well:

**Merge:**

```
git checkout feature-branch
git pull origin main
```

**Rebase:**

```
git checkout feature-branch
git pull --rebase origin main
```

#### Key Differences:

| Aspect          | Merge                        | Rebase                          |
| --------------- | ---------------------------- | ------------------------------- |
| **History**     | Preserves original timeline  | Creates linear timeline         |
| **Commits**     | Keeps original commit hashes | Creates new commit hashes       |
| **Safety**      | Safe for shared branches     | ⚠️ Never rebase shared branches |
| **Complexity**  | Simple, always works         | Can have complex conflicts      |
| **Readability** | Shows branch context         | Cleaner, easier to follow       |

#### ⚠️ Golden Rule of Rebasing:

**Never rebase commits that have been pushed to a shared repository!**

This rewrites history and can cause serious problems for other developers.

### Squashing Commits

Squashing combines multiple commits into a single commit, creating cleaner project history.

#### When to Squash Commits:

- Before merging feature branches
- Combining "work in progress" or "fix typo" commits
- Creating logical, atomic commits
- Cleaning up experimental or debugging commits

#### Methods for Squashing:

##### Method 1: Interactive Rebase

1. **Start interactive rebase:**

```
git rebase -i HEAD~4
```

2. **In the editor, change `pick` to `squash` (or `s`) for commits you want to combine:**

```
pick 1a2b3c4 Add user authentication
squash 2b3c4d5 Fix auth bug
squash 3c4d5e6 Update auth tests
squash 4d5e6f7 Fix typo in auth
```

3. **Save and close. Git will prompt for a new commit message.**

##### Method 2: Soft Reset and Recommit

1. **Reset back to the commit before your changes:**

```
git reset --soft HEAD~4
```

2. **All changes are now staged. Create a single commit:**

```
git commit -m "Implement user authentication feature"
```

##### Method 3: Merge with Squash

```
# From main branch
git merge --squash feature-branch
git commit -m "Add complete user authentication system"
```

This takes all commits from feature-branch and stages them as a single commit.

#### Interactive Rebase Commands:

- `pick` (p): Use the commit as-is
- `reword` (r): Use commit but edit the message
- `edit` (e): Use commit but stop to amend it
- `squash` (s): Combine with previous commit
- `fixup` (f): Like squash but discard commit message
- `drop` (d): Remove the commit entirely

#### Best Practices for Squashing:

✅ **Do:**

- Squash related commits that form a logical unit
- Keep meaningful commit messages
- Squash before pushing to shared branches
- Test after squashing to ensure nothing broke

❌ **Don't:**

- Squash commits that are already pushed to shared branches
- Combine unrelated changes into one commit
- Lose important context or debugging information
- Squash commits that others have based work on

#### Example Workflow:

```
# Working on feature branch with messy commits:
git log --oneline
4d5e6f7 Fix typo
3c4d5e6 WIP: still debugging
2b3c4d5 Add tests
1a2b3c4 Implement feature
9z8y7x6 (main) Last main commit

# Squash the 4 commits into one:
git rebase -i HEAD~4

# Result after squashing:
git log --oneline
1a2b3c4 Implement complete feature with tests
9z8y7x6 (main) Last main commit
```

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
