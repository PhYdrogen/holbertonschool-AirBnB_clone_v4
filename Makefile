include .env
run:
	export HBNB_API_PORT=5000	&& python3 -m web_dynamic.4-hbnb

api:
 	export HBNB_API_PORT=5001	&& python3 -m api.v1.app
