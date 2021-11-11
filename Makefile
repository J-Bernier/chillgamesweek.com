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

#: Stop and delete all containers
.PHONY: clean_containers
clean_containers:
	# Stops and deletes all containers that begin with "cgw-"
	$(eval CONTAINERS=$(shell docker container ls -q --filter name=cgw-*))
	docker container stop $(CONTAINERS)
	docker container rm $(CONTAINERS)

#: Delete all project images
.PHONY: clean_images
clean_images:
	docker images -a | grep "cned-ud" | awk '{print $3}' | xargs docker rmi -f

#: Start the containers
.PHONY: up
up:
	cd docker && docker-compose up -d

#: Stop all the containers
.PHONY: down
down:
	cd docker && docker-compose down

#: Login with firebase
.PHONY: firebase_login
firebase_login:
	cd docker && \
    docker-compose run firebase firebase login --no-localhost && \
	docker-compose rm --force

#: Setup services
.PHONY: firebase_init
firebase_init:
	cd docker && \
	docker-compose run firebase firebase init database && \
	docker-compose run firebase firebase init functions && \
	docker-compose rm --force

#: Setup Firebase from scratch (login + init)
.PHONY: firebase_setup
firebase_setup:
	$(MAKE) firebase_login
	$(MAKE) firebase_init

#: Add a functions package
.PHONY: install_functions_pkg
install_functions_pkg:
	docker exec -w /project/functions cgw-firebase \
		npm install $(ARGS) $(PKGS)

#: Start hot reload mode for functions
.PHONY: dev_functions
dev_functions:
	docker exec -d -w /project/functions cgw-firebase \
		npm run dev

#: Start hot reload mode for functions
.PHONY: build_functions
build_functions:
	docker exec -d -w /project/functions cgw-firebase \
		npm run build
