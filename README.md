# chillgamesweek.com
Repository for the chillgamesweek.com website

## Language
All commits messages, code, documentation should as much as possible be in english.

## Branches
### Naming pattern
All branches should follow the same pattern :
```
[fix/feature]/cgw/[brief-subject]
```

### Commits
Try to commit as much as possible, each commit should be atomic and easily readable (in order to cherry pick or revert).
Also try to include as much info as possible in commit name i.e. no commits like : "fix", "modif 1", "comment", etc.
### Protected branch
The base branch is `main`, it is protected and should not be committed to directly. To contribute, pull another branch from main, and make a pull request.

## Pull requests
### Flow
Request review from another dev as much as possible. A base template has to be created with a checklist to review before creating it

### Tags
The tags are to be used as follows for workflows :
    - needs review : if the pull request needs a review from another dev
    - reviewed : is reviewed, but still needs some fixes
    - ready for merge : is reviewed and validated, and ready to be merged on main

Additional tags (self explanatory) :
    - bug
    - feature
    - documentation

Remember to switch tags after each review.

## Tools

This project uses a Makefile for useful commands. For Windows users, the easiest way is to install [Chocolatey](https://chocolatey.org/install), then install it with `choco install make`.

For REST Database calls, [Insomnia](https://insomnia.rest/) has been used. You can import the library (Insomnia.Ink) located in the dev-tools folder.

## Getting Started

To launch the docker stack, simply run `make firebase_setup`, then `make up`.

## Troubleshooting

- If you can't see your data in the emulators, delete the localstorage values from your browser's memory management for localhost, then refresh. There is an issue without websockets fallback that uses the 0.0.0.0 adress instead of localhost, inducing an error that prevents from recovering data. info : https://github.com/firebase/firebase-tools/issues/2870
