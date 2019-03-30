# Typescript NPM Module Starter

A repository to get you working immediately on an npm module using Typescript.

This is meant to save you the days (probably weeks) of trials and tribulations trying to get this setup working so you can simply start writing code. All batteries are included, from testing to linting, build scripts to CI/CD.

As always, feel free to submit issues or pull requests!

![Code Coverage](./coverage/badge.svg)

## Included in the box

- Testing with `mocha`, `mocha-typescript`, `sinon`, etc.
- Coverage with `istanbul`/`nyc` and coverage badge generation
- Default `tslint` configuration
- CircleCI example configurations for continuous integration / continuous delivery
- VSCode extension recommendations, launch configs, settings, and tasks
- Typescript config for generating compiled code and definitions
- `.gitignore`
- `.npmignore`
- and more!

## Quick start

1. Clone the repo and open it in VSCode (or your favorite editor)

    ```bash
    git clone https://github.com/jdforsythe/typescript-npm-starter.git your-module-name && cd your-module-name
    code .
    ```

1. Edit `package.json` to reflect the values for your module

1. Run any/all of the scripts

    ```bash
    yarn run lint
    yarn run test
    yarn run build
    ```

## Folder layout

- `/.circleci`

  This folder contains example CircleCI yaml files for continuous integration and optionally continuous delivery (`npm publish`).

- `/.vscode`

  This folder contains the VSCode artifacts for a frictionless development experience

- `/coverage`

  This folder contains the coverage badge generated on release. It also contains current coverage reports for your reference while you are developing. Only the coverage badge will be checking to source control.

- `lib`

  This folder is where your final, compiled node module will be built to. This will contain your compiled code (with inline source maps) and definition files. This is checked into source when you run the release script.

- `src`

  This folder contains all of your source for your module, including `.ts` and `.spec.ts` files. The opinion of this author is that test files should live beside the source files, so the `tsconfig.json` and `mocha.opts` are configured thusly. Sample source and specs are provided for your perusal.

- `.gitignore`

  This ensures only your source, build, and configuration files are included in source control. It excludes logs, OS metadata files, dependencies, build artifacts, and coverage reports.

- `.npmignore`

  This ensures only your built module is published to npm. It excludes source, development files, configuration, build artifacts, etc.

- `mocha.opts`

  This allows you to directly test Typescript spec files without compiling them by registering `ts-node` and `source-map-support`.

- `package.json`

  This is your typical `package.json` file with some goodies, including a set of pre-defined scripts for linting, testing, watching tests, and building your module; `istanbul`/`nyc` coverage configuration, and a set of devDependencies for developing your module.

- `release.sh`

  This is a bash script for performing a release on your module. When you are completed with development and all your PRs are merged, you will run this script to ensure everything is ready for a new release.

- `tsconfig.json`

  This is a pre-configured Typescript configuration to get you started developing quickly.

- `tslint.json`

  This is a highly-opinionated set of best practices for code quality, cleanliness, readability, and to avoid common errors. It is based on the famous `tslint-config-airbnb` with a slew of additional rules.

- `yarn.lock`

  This module is set up to use `yarn` but you can easily replace that with npm by doing a full search-and-replace.

## Development

Develop as you normally would, putting your source files in `/src`. The only opinion offered here is that you should not write *any* code in `/src/index.ts`. You should use that file as an explicity declaration of your module's public API. In other words, you should explicity export only the artifacts you want to expose from your module in that file.

This file is set as the entry point to your module, so this is an easy way to limit what gets shown in code completion / Intellisense for your module's consumers.

Note that the dependency `got` is included simply for the example code. You will remove `got` and `@types/got` from `package.json` and replace with your own dependencies through the normal `yarn add` / `npm install --save` or `yarn add --dev` / `npm install --dev` process.

## Testing

As stated above, this author's opinion is that spec/test files should live beside their source files. There is an example spec file for the `request.ts` named `request.spec.ts` by convention. Any `.spec.ts` files will be included in tests but not in builds.

Running tests can be done in several ways:

1. Use the VSCode task "Execute Tests"

1. Use yarn / npm on the command line

    ```bash
    yarn run test
    ```

1. Run them directly on the command line

    ```bash
    npx nyc mocha --opts mocha.opts
    ```

Also included is a test-watcher (from `mocha-typescript` module) which will re-run your tests any time you save a spec or source file. This is available as a VSCode task or npm script, as well.

A useful trick is to switch the decorator on your spec from `@test` to `@test.only` and run the tests. Now only that single spec is run while you are fixing the spec or code. Use this in combination with the test watcher for fast turnaround.

The dev dependencies `sinon` and `@types/sinon` are included for stubbing purposes in the tests. This is for example purposes only and if you're testing pure functions and have no need for stubs, you can safely remove those dependencies from `package.json`.

## Building your module

When you are ready to compile your module, you can run the build task in two ways:

1. Use the VSCode task "Build"

1. Use yarn / npm on the command line

    ```bash
    yarn run build
    ```

This script will perform several actions:

1. Install dependencies with `yarn install`

1. Run the lint script with `yarn run lint`

1. Run the tests with `yarn run test`

1. Clean any previous compilation with `yarn run clean-compiled`

1. Compile source and definitions with `yarn run compile`

There is another script called `build-with-audit` which also runs a `yarn audit` to check your dependencies for known vulnerabilities. The issue is that `yarn audit` and `npm audit` do not yet respect the `--production` flag and they will return a non-zero exit code for your development dependencies. If your dev dependencies are *truly* dev dependencies then this is probably not a situation that should prevent you from building and/or publishing your module, since none of that code will be included in your published module.  You can track the issue [here](https://npm.community/t/please-support-production-or-only-production-in-npm-audit/3005). This issue is referenced again in the CI/CD section.

## Continuous Integration

CircleCI is a free (for open-source projects) continuous integration platform. If you authorize CircleCI to talk to your Github repo, you can have every pull request (and merge into `master`) kick off a workflow on CircleCI that will run your tests, lint, and build process to ensure that everything works before you merge the PR into `master`.

Simply sign up for an account at CircleCI and go through their instructions for authorizing CircleCI to talk to your GitHub account. Then when you are in CircleCI, click "Add Projects" on the left. Beside your repository name, click the "Set Up Project" button. Choose "Linux" and "Node" and then click the "Start Building" button. If you get asked for authorization, go ahead and authorize CircleCI to add a webhook to your GitHub repository. You should see a workflow that will fail (it will be red) if you haven't pushed the CircleCI config file yet.

On your GitHub repo, go to Settings then Webhooks. You should see a webhook for `https://circleci.com/hooks/github`. If not, the authorization is not set up properly.

Now you need to kick of a status check. Create a branch, make a change, and push the branch with the `/.circleci/config.yml` file present in the repo. I haven't tested it, but I wouldn't push more than one of the config files. Just choose the file you want to use, name it `config.yml` and delete the others. More information on the files is below.

After pushing, GitHub will call the webhook to CircleCI and you should see a new workflow appear in CircleCI. After your lint, test, and builds pass, the workflow will turn green. You can click on the workflow to monitor the status of each job in the workflow, and also click on each job to watch them execute (and in case there is a failure).

NOTE: the same caveat listed in the Build section above with `yarn audit` and `npm audit` apply here. If you have dev dependencies with reported vulnerabilities, your CI workflow will fail. If you need to, you can remove or comment out any references to `dependencycheck` or `yarn audit` in the yaml file. The `/.circleci/config-no-audit.yml` file is a copy of the `config.yml` file with the dependency audits removed.

Once you have a build kicked off on CircleCI (even if it fails) you can set GitHub to require the CircleCI checks to pass before pull requests can be merged into `master.

Go your your repository Settings on Github and choose "Branches". If you don't have a branch protection rule for your `master` branch, create one. Or edit your rule if it already exists.

The branch name pattern should be `master`. Check the box for "Require status checks to pass before merging". In the status check list you should at least see a "build" option. Check that box. That will require that the "build" job on CircleCI reports success. The build job requires the test and lint (and optionally the dependencycheck) jobs to pass before it will start. This will ensure that all parts of your code are ready for publishing before you can merge the pull request.

### Choosing a CircleCI config file

There are three config files in `/.circleci`:

1. `config.yml` is the default setup and performs not only continuous integration, but also continuous delivery. This performs the `yarn publish` as the final step of your release cycle if everything checks out okay. Look for more information in the Release and Continuous Integration sections below

1. `config-no-audit.yml` is an example of removing the `yarn audit` commands from the CI checks until the command respects the `--production` flag. See more information in the Build section above about the issue

1. `config-no-ci-publish.yml` is the `config.yml` file with continuous delivery removed. In other words, it will perform all the continuous integration testing and checks outlined above, but does not have the extra functionality described in the Release and Continuous Integration sections below. Using this config will mean that you will need to manually publish your module to npm at the end of the release cycle. This is required if you need/want 2FA for publishing authorization on npm. See the referenced sections for more information.

## Releasing your module

There are two distinct steps when releasing your module: release preparation and publishing.

### Release preparation

Release preparation is handled by the `./release.sh` script which performs a few functions:

1. Install dependencies with `yarn install` to ensure all dependencies are listed in `yarn.lock`

1. Check for any uncommitted changes (e.g. `yarn.lock` was updated or you forgot to commit code)

1. Sync local `master` branch with remote `master`: checkout `master`, pull all tags, pull all changes from remote, push all local changes

1. Run the build script with `yarn run build`

1. Add any built changes in `/lib` that may have been missed in earlier commits (you forgot to build before committing) to the index

1. Make a coverage badge in `coverage/badge.svg` and add it to the index. See an example of how to include this in your README by looking at this README's source (at the top of the file)

1. If any of the previous steps have added files to the index, commit them with a message of "Publish new build"

1. Print a message telling you to execute `yarn version && git push && git push --tags`

To prepare your module for release, be sure you don't have any uncommitted changes and run `./release.sh`.  When prompted, if everything went smoothly, you can run the `yarn version...` command.

That command will prompt you to bump your version number. Yarn will update the version number in your `package.json` file, create a commit with the message as `v1.0.0` (the new version number), and create a git tag under the same name (`v1.0.0`). The rest of the command will push the new commit and tag to your remote.

### Publishing

There are two ways to publish your finished module to npm, manually and through CI/CD.

Manually publishing is as simple as:

```bash
yarn publish
```

Note that you will have to log in to your npm account and possibly provide 2FA code if you have that set up. This is the only way to deploy if you need/want 2FA for publishing npm modules. Read the npm documentation for more information.

The second way to publish is through continuous delivery. Using the `/.circleci/config.yml` config will add a workflow to publish your module when you push a release version tag to GitHub, which happens automatically when following the Release preparation above. If you use the `/.circleci/config.yml` and your tests, lint, and build pass successfully, the build process will finish by publishing your module to npm for you, so you don't need to explicitly publish the module yourself.

## Continuous Delivery

CircleCI can also be used to publish your module to npm when you push a new version tag. The included `./circleci/config.yml` has a `release` workflow that will run only when you've pushed a version number tag (`v1.0.0`) to your GitHub repository. If you follow the procedures outlined above and use the `./release.sh` script to prepare your release, when you run the `yarn publish...` command it will create and push a version tag to your repository. This process will kick off the `release` workflow on CircleCI which is the same as the `build` workflow but with an added `release` job at the end which will publish your module to npm.

In order to publish, CircleCI will need an API token to authorize it. NOTE: At this time, you cannot publish npm modules through CI/CD if you have 2FA (two factor authentication) turned on for publishing. It is perhaps not best practice to disable 2FA but if you are only publishing private modules for your company it is *probably* ok. You can still leave on 2FA for logins, but you must disable it for publishing. On npm, create a token an give it permission to publish without 2FA (but I still recommend turning on 2FA for logins). Copy the token to your clipboard, as it will never be shown again! (But you can always generate another one...)

To get the npm token into your CI/CD workflow, you use a CircleCI "context". In CircleCI go to Settings and choose Contexts. Create a new context called "npmtoken" (or change the name in the yaml files to match). Add an environment variable to the context with the name "NPM_TOKEN" and the value as your npm token (generate on the npmjs website). When CircleCI runs the `release` workflow, it will inject the token from the context into a local `.npmrc` file in its container.
