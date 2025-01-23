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
	sudo docker compose -f ./Full/docker-compose.yml up -d --build

down:
	sudo docker compose -f ./Full/docker-compose.yml down

re:
	sudo docker compose -f ./Full/docker-compose.yml up -d --build --force-recreate

clean:
	sudo docker system prune -af

.PHONY:
	all down re clear