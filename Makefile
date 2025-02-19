# **************************************************************************** #
#                                                                              #
#                                                         :::      ::::::::    #
#    Makefile                                           :+:      :+:    :+:    #
#                                                     +:+ +:+         +:+      #
#    By: marvin <marvin@student.42.fr>              +#+  +:+       +#+         #
#                                                 +#+#+#+#+#+   +#+            #
#    Created: 2025/01/23 11:27:07 by marvin            #+#    #+#              #
#    Updated: 2025/01/23 11:27:07 by marvin           ###   ########.fr        #
#                                                                              #
# **************************************************************************** #

all:
	docker compose -f ./Full/docker-compose.yml up -d --build

down:
	docker compose -f ./Full/docker-compose.yml down

re:
	docker compose -f ./Full/docker-compose.yml up -d --build --force-recreate

logs:
	docker logs django-container -f | grep -v "WebSocket"

clean:
	docker system prune -af

.PHONY:
	all down re clean log