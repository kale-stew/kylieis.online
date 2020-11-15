# My Personal Blog

[This website](https://kyliestewart.tech) serves as my professional landing page,
as well as my technical blog, where I post about the various programming things
I've learned or am actively learning.

Built with Gatsby! This was originally a fork of [@JaeYeopHan](https://github.com/JaeYeopHan)'s
[bee-starter](https://github.com/JaeYeopHan/gatsby-starter-bee), but it's evolved a bit
since the initial fork.

## Creating a New Post

There's a CLI for that! ™️

```sh
$ yarn run new-post
```

In the case we don't take the CLI route, every valid blog post needs a proper header:

```md
---
title: <String>
date: 2020-00-00 00:00:00
category: <String>
draft: <Bool>
---
```

## Deployment

CI takes care of deploy on merge to master.

However, manual deployments are sometimes necessary:

```sh
$ yarn run gatsby clean
$ yarn run gatsby build --prefix-paths && gh-pages -d public

# or, use the short version
$ yarn run deploy
```
