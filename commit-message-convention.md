# Commit Message Convention

> reference [AngularJS](https://github.com/angular/angular.js/blob/master/CONTRIBUTING.md#-git-commit-guidelineses), [ESLint](https://eslint.org/docs/developer-guide/contributing/pull-requests#step-2-make-your-changes)

## Commit Message Format

```
<Type>: Short description (fix #1234)

Logger description here if necessary

BREAKING CHANGE: only contain breaking change
```
* Any line of the commit message cannot be longer 100 characters!

### Revert
```
revert: commit <short-hash>

This reverts commit <full-hash>
More description if needed
```

### Type
Must be one of the following:

* **feat**: A new feature
* **fix**: A bug fix
* **docs**: Documentation only changes
* **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
* **refactor**: A code change that neither fixes a bug nor adds a feature
* **perf**: A code change that improves performance
* **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Subject
* use the imperative, __present__ tense: "change" not "changed" nor "changes"  
* don't capitalize first letter
* no dot (.) at the end
* you can use Korean

### Body

* use the imperative, __present__ tense: "change" not "changed" nor "changes".
* the motivation for the change and contrast this with previous behavior.

### BREAKING CHANGE
* This commit contains breaking change(s).
* start with the word BREAKING CHANGE: with a space or two newlines. The rest of the commit message is then used for this.

## License

The MIT License

Copyright (c) 2018 NHN Entertainment Corp.