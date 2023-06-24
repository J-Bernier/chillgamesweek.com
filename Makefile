NPM_RUNTIME=npm

.DEFAULT: help

## Warning : be careful to add the .PHONY line before each new command to ensure correct parsing of through "make help"

#: Display help
.PHONY: help
help:
	@grep -B2 -E "^[a-zA-Z0-9_-]+\:" Makefile \
	| grep -v -E ".PHONY\: [a-zA-Z0-9_-]+" \
	| grep -v -- -- \
	| sed 'N;s/\n/###/' \
	| sed -n 's/^#: \(.*\)###\(.*\):.*/\2###\1/p' \
	| column -t  -s '###'

#: build cloud functions project
.PHONY: build
build:
	cd apps/firebase/functions && \
		$(NPM_RUNTIME) run build

#: Start hot reload for cloud functions
.PHONY: dev
dev:
	cd apps/firebase/functions && \
		$(NPM_RUNTIME) run dev

#: Start emulators
.PHONY: emulators
emulators:
	cd apps/firebase/functions && \
		firebase emulators:start

#: Install firebase from scratch
.PHONY: setup
setup:
	cd apps/firebase/functions && \
		$(NPM_RUNTIME) install && \
		firebase login \
