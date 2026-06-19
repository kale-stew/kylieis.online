---
title: 'Reverting a Single File in Git'
date: '2021-11-18'
category: 'git'
description: 'How to restore a single file to a previous commit without affecting the rest of your working tree.'
---

Sometimes you need to undo changes to a specific file without reverting an entire commit. Maybe you accidentally deleted something, or you want to restore a file to how it looked three commits ago.

I look this up every time I need it, so now it lives here.

## The commands

```bash
git checkout <commit-hash> -- path/to/file
```

Or, using the newer `restore` command (Git 2.23+):

```bash
git restore --source=<commit-hash> path/to/file
```

## Finding the right commit

Say you deleted a config file and committed that deletion, but now you need it back:

```bash
# Find the commit where the file last existed
git log --oneline -- config/settings.json

# Restore from that commit
git restore --source=abc123^ config/settings.json
```

The `^` after the commit hash means "the commit before this one". Useful when the commit you found is the one that deleted the file.

## Discarding uncommitted changes

If you just want to throw away local changes to a file:

```bash
git restore path/to/file
```

Or the old way:

```bash
git checkout -- path/to/file
```

## Why this works

Git tracks content, not files. When you "restore" a file, you're telling Git to take the blob from a specific commit and write it to your working directory. The file appears as a staged change, ready to commit.

This is one of those commands I look up every time I need it. Now it lives here.
