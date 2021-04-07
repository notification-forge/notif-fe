# Notif Frontend

Front-end app for the notif software

## Table of Content

1. Description
2. Git Branching Strategy
3. Toolings
4. Folder Structure and Naming convention
5. State Management Strategy

## Description

Notif is a notification templating tool, allowing users to create and manage email and Teams templates

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

## Toolings

The tools that we are using are:
| Tool | Purpose |
| ---------- | ------- |
| `SCSS` | CSS Pre-processor |
| `Prettier` | Code Formatter |
| `Axios` | API interceptor |
| React-Context | State Management |

## Folder structure and Naming convention

The folder structure and file naming convention is as follow

```
src
|
|__shared
   |
   |__ styles // Style for shared components
   |__ components // Shared components
   |__ constants // Constant values across the app e.g color codes
   |__ contexts // Context code
   |__ services // Services code
   |__ utils // Shared utils methods
   |__ // Other shared files
|
|__assets // assets for the app e.g Logos, Images, e.t.c
|
|__module
   |
   |__component // Shared components folder for the module
   |__styles // Style folder for the module
   |__ModulePage.tsx // A component that display an entire page
   |__module.models.ts // Model that the module will share

```

Tests are to be placed right next to the `.ts` or `.tsx` file it is testing. Test files are to be named `File.test.ts` or `File.test.tsx`

## State Management

We are using React Context as our state management strategy. Before writing a context, perform the below thought experiment:

1. Will the state be needed for more than 1 module? If yes create a context. If no, read on.
2. Will the state be nested for more than 2 layers of components? If yes, create a context. If no, use `useState` instead.
