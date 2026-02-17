## Basics

### Make a local copy of this repository

If you use https credentials:

```
git clone https://github.com/clarkepeterf/git-pro.git
```

If you use ssh credentials:

```
git clone git@github.com:clarkepeterf/git-pro.git
```

You can also name a repository something different if you like:

```
git clone git@github.com:clarkepeterf/git-pro.git todays-presentation
```

[git clone documentation](https://git-scm.com/docs/git-clone)

### Check out a branch

Edit a set of changes that you or a peer worked on previously:

```
git checkout feature-branch-1
```

### Make changes

View the current status of your repository:

```
git status
```

At this point it should say "nothing to commit, working tree clean"

#### A file tracked by git can be in one of 3 states:

1. **Modified** - the file has been changed, but those changes have not been stored in the repository. Modified files show up as red 🔴 in `git status`
2. **Staged** - the file has been changed and is _marked_ to be committed. Staged files show up as green 🟢 in `git status`
3. **Committed** - the changes have been stored in the repository. Committed files no longer show up in `git status`

#### Files can also be:

1. **Untracked** - a file not previously added and committed to the repository. Untracked files show up separately and are also red 🔴 in git status
2. **Ignored** - add a file to .gitignore to ensure git does not track it - used for things like .env, \*.pem, other personal or secret-containing files
