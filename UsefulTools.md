## Useful Tools

![Useful Tools Git](./images/useful-tools-git.png)

### Git Completion

This allows you to use tab completion for git commands, branches, tags, etc.

To set up:

1. Download the completion script according to your shell [here](https://github.com/git/git/tree/master/contrib/completion)
2. Add the following to your **.bashrc**, **.bash_profile**, or equivalent (replace .bash with your shell as needed)

```
source git-completion.bash
```

### Git Prompt

This allows you to show your current branch or other information in your terminal.

Example:

![git prompt](./images/git-prompt.png)

To set up:

1. Download the git prompt script [here](https://github.com/git/git/blob/master/contrib/completion/git-prompt.sh)

2. Add the following to your **.bashrc**, **.bash_profile**, or equivalent

```
source git-prompt.sh
```

Add the following as part of your `PS1` variable in your .bashrc, .bash_profile, or equivalent:

```
$(__git_ps1 " (%s)")
```

e.g.:

```
export PS1='\[\033[33m\]\u@\h\[\033[00m\]:\[\033[34m\]\w\[\033[36m\]$(__git_ps1 " (%s)")\[\033[00m\]\$ '
```

### Difftool

Compare diffs with a nicer user interface

e.g. do the following for VS Code:

```
git config --global diff.tool vscode

git config --global difftool.vscode.cmd 'code --wait --diff $LOCAL $REMOTE'

```

Also available with other tools like:

- [Beyond Compare](https://www.scootersoftware.com/kb/vcs)
- [Meld](https://meldmerge.org/)
- Many more options

### Mergetool

Similar to difftool but for merging changes

e.g. do the following for Sublime Merge:

```
git config --global merge.tool smerge
git config --global mergetool.smerge.cmd 'smerge mergetool "$BASE" "$LOCAL" "$REMOTE" -o "$MERGED"'

```

Available with:

- [Sublime Merge](https://www.sublimemerge.com/)
- [Beyond Compare](https://www.scootersoftware.com/kb/vcs)
- [Meld](https://meldmerge.org/)
- Many more options

---

[Go Back To Table of Contents](./README.md#table-of-contents)
