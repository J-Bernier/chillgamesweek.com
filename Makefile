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

#: Login with the firebase, then setup services
.PHONY: functions_init
functions_init:
	cd docker && \
    docker-compose run firebase firebase login --no-localhost && \
	docker-compose run firebase firebase init firestore && \
	docker-compose run firebase firebase init functions && \
	docker-compose rm --force
