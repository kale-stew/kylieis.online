# kylieis.online

[This website](https://kylieis.online) serves as my professional landing page,
as well as my technical blog, where I post about the various programming things
I've learned or am actively learning.

Now built with ✨[nextjs](https://nextjs.org)!

## Development

### Social Preview Images

Social previews are built using `resoc`, which takes mustache html and css templates to create open-graph standard images.

In order to test out those changes locally, run one of the following commands:

```sh
# default previews
npx itdk view resoc-templates/default/resoc.manifest.json

# landing previews
npx itdk view resoc-templates/landing/resoc.manifest.json

# blog item previews
npx itdk view resoc-templates/blog/resoc.manifest.json
```

This will launch an editor at [localhost:8080](http://localhost:8080), where you can see your changes in real-time.

### Adding a New Blog Post

All blog posts live in the `content/` directory.
Every new post requires a `title`, YYYY-MM-DD formatted `date`, and category `string` to properly compile.

### Adding a New Talk

Talks are sourced from [my `all-talks` repo](https://github.com/kale-stew/all-talks) here on Github.

## Deployment

Vercel's deployment pipeline takes care of publication on merge to `main`.
