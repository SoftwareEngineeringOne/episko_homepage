docker: docker_nginx docker_node

docker_nginx: compile_static
	@echo "Clearing stuff"
	rm -rf ./nginx/public
	rm -rf ./nginx/certs

	cp -r ./public ./nginx/public
	cp -r ./certs ./nginx/certs

	docker build -t definitelynotsimon13/nginx:latest nginx
	docker push definitelynotsimon13/nginx:latest

docker_node: compile_static
	docker build -t definitelynotsimon13/webengineering:latest .
	docker push definitelynotsimon13/webengineering:latest


compile_static:
	node compile_static.js

	

.PHONY: docker_nginx docker_node compile_static
