#!/usr/bin/env bash

## install dependencies to ensure lockfile changes are caught by uncommitted changes check
yarn install

## check for uncommitted changes
(git diff --no-ext-diff --quiet --exit-code)
CHANGES=$?
if [[ $CHANGES != "0" ]]; then
  echo "You have uncommitted changes. Exiting."
  exit $CHANGES
fi

## make sure repo is synced with remote
git checkout master
git fetch --tags
git pull --quiet
git push || git push -u origin HEAD

## ensure the build is the newest version and is added to the repo
yarn run build
git add lib

## make a coverage badge and add it to the repo
npx make-coverage-badge
git add coverage/badge.svg

## commit new build and coverage badge, if there are any changes
git diff-index --quiet HEAD || git commit -m "Publish new build"

echo "***********************************"
echo "* Finished preparing for release *"
echo "***********************************"
echo ""
echo "Execute the following command to bump the version and push your changes:"
echo ""
echo "yarn version && git push && git push --tags"
echo ""
echo ""

## if you are using CircleCI to publish your module to npm, when you push this new
## release tag, it will kick off the `release` workflow which ends with publishing
## the module to npm. if you are manually publishing, you would need to run
## `yarn publish` or `npm publish` after this command
