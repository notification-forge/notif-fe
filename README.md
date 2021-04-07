# avopos Frontend

Front-end app for Notif App

## Description

Notif App is a notifications tool, allowing users to manage dynamic Email and Teams templates

## Git Branching Strategy

### `main` and `development`

There are 2 main branches in the project: `master` and `development`.

`development` branch contain stable versions of the app. Developers should branch out from the `development` branch to begin development.

Once development branch is ready, or once a `hot-fix` branch is ready, it will be merged into `master` with an annotated tag. Click here to read more about [tagging](https://git-scm.com/book/en/v2/Git-Basics-Tagging)

### `feature`, `bug`, `chore`, `refactor` and `hot-fix`

These branches are short-lived. Below are the descriptions of the branche types:

1. `feature`: Contain code for any new feature
2. `bug`: Fixes for any bug discovered
3. `chore`: Work that will not affect end user (e.g updating `.gitignore`)
4. `refactor`: Refactoring of code
5. `hot-fix`: Urgent fix for a deployed version

Branches should be named: `type/description` (e.g `feature/login`)

| Branch Type | Branch From   |
| ----------- | ------------- |
| `feature`   | `development` |
| `bug`       | `development` |
| `chore`     | `development` |
| `refactor`  | `development` |
| `hot-fix`   | `master`      |

### Versioning

A version will typically look like this `MAJOR.MINOR.REVISION`

- A `MAJOR` version increment signifies a MAJOR version release. Perhaps with lots of new features added
- A `MINOR` version increment signifies a MINOR version release. Perhaps a few minor features and bug fixes
- A `REVISION` version increment signifies a deployment with hot-fixes
