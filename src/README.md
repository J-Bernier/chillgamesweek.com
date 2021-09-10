# Git Workflow

## Branches
### Naming pattern
All branches should follow the same pattern :
```
[fix/feature]/cgw/[brief-subject]
```

### Protected branch
The base branch is `main`, it is protected and should not be committed to directly. To contribute, pull another branch from main, and make a pull request.

## Pull requests
### Purpose
Request review from another dev as much as possible. A base template has to be created with a checklist to review before creating it

### Tags
The tags are to be used as follows for now :
    - needs review : if the pull request needs a review from another dev
    - reviewed : is reviewed, but still needs some fixes
    - ready for merge : is reviewed and validated, and ready to be merged on main