window.addEventListener('keydown', function(event) {
    if (event.key === "ArrowUp") {
        socket.send(JSON.stringify({'key': 'up', 'player': player_id}));
    } else if (event.key === "ArrowDown") {
        socket.send(JSON.stringify({'key': 'down', 'player': player_id}));
    }
});