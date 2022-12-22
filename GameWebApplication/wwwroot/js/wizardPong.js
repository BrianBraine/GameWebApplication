function gameLoop() {
    let gameState = 'start';
    let player = document.querySelector('#player');
    let opponent = document.querySelector('#opponent');
    let arena = document.querySelector('#arena');
    let initial_ball = document.querySelector('#ball');
    let ball = document.querySelector('#ball');
    let playerScore = document.querySelector('#playerScore');
    let opponentScore = document.querySelector('#opponentScore');
    let message = document.querySelector('.message');
    let player_coord = player.getBoundingClientRect();
    let opponent_coord = opponent.getBoundingClientRect();
    let initial_ball_coord = ball.getBoundingClientRect();
    let ball_coord = initial_ball_coord;
    const board_coord = arena.getBoundingClientRect();
    let paddle_common =
        document.querySelector('#player').getBoundingClientRect();

    let x_speed = Math.floor(Math.random() * 4) + 3;
    let y_speed = Math.floor(Math.random() * 4) + 3;
    let x_dir = Math.floor(Math.random() * 2);
    let y_dir = Math.floor(Math.random() * 2);

    $(document).ready()
    document.addEventListener('keydown', (e) => {
        if (e.key == 'Enter') {
            gameState = gameState == 'start' ? 'play' : 'start';
            if (gameState == 'play') {
                message.innerHTML = 'Game Started';
                message.style.left = 44 + 'vw';
                requestAnimationFrame(() => {
                    x_speed = Math.floor(Math.random() * 4) + 3;
                    y_speed = Math.floor(Math.random() * 4) + 3;
                    x_dir = Math.floor(Math.random() * 2);
                    y_dir = Math.floor(Math.random() * 2);
                    moveBall(x_speed, y_speed, x_dir, y_dir);
                });
            }
        }
        if (gameState == 'play') {
            if (e.key == 'w') {
                player.style.top =
                    Math.max(
                        board_coord.top,
                        player_coord.top - window.innerHeight * 0.06
                    ) + 'px';
                player_coord = player.getBoundingClientRect();
            }
            if (e.key == 's') {
                player.style.top =
                    Math.min(
                        board_coord.bottom - paddle_common.height,
                        player_coord.top + window.innerHeight * 0.06
                    ) + 'px';
                player_coord = player.getBoundingClientRect();
            }

            if (e.key == 'ArrowUp') {
                opponent.style.top =
                    Math.max(
                        board_coord.top,
                        opponent_coord.top - window.innerHeight * 0.1
                    ) + 'px';
                opponent_coord = opponent.getBoundingClientRect();
            }
            if (e.key == 'ArrowDown') {
                opponent.style.top =
                    Math.min(
                        board_coord.bottom - paddle_common.height,
                        opponent_coord.top + window.innerHeight * 0.1
                    ) + 'px';
                opponent_coord = opponent.getBoundingClientRect();
            }
            if (e.key == 'ArrowLeft') {
                requestAnimationFrame(() => {
                    x_speed = Math.floor(Math.random() * 4) + 3;
                    y_speed = Math.floor(Math.random() * 4) + 3;
                    x_dir = 0;
                    y_dir = Math.floor(Math.random() * 2);
                    moveBall(x_speed, y_speed, x_dir, y_dir);
                    updateAI(ball_coord, opponent_coord);
                });
            }
            if (e.key == 'ArrowRight') {
                requestAnimationFrame(() => {
                    x_speed = Math.floor(Math.random() * 4) + 3;
                    y_speed = Math.floor(Math.random() * 4) + 3;
                    x_dir = 1;
                    y_dir = Math.floor(Math.random() * 2);
                    moveBall(x_speed, y_speed, x_dir, y_dir);
                    updateAI(ball_coord, opponent_coord);
                });
            }
            while (owner == player) {
                if (e.key == 'Space') {

                }
            }
        }
    });

    function moveBall(x_speed, y_speed, x_dir, y_dir) {

        let owner = undefined;
        if (ball_coord.top <= board_coord.top) {
            y_dir = 1;
        }
        if (ball_coord.bottom >= board_coord.bottom) {
            y_dir = 0;
        }

        // If ball hits player's paddle, set x_dir = 1 to change
        // direction of ball movement on x-axis
        if (
            ball_coord.left <= player_coord.right &&
            ball_coord.top >= player_coord.top &&
            ball_coord.bottom <= player_coord.bottom
        ) {
            x_dir = 1;
            owner = player;
        }

        // If ball hits opponent's paddle, set x_dir = 0 to change 
        // direction of ball movement on x-axis
        if (
            ball_coord.right >= opponent_coord.left &&
            ball_coord.top >= opponent_coord.top &&
            ball_coord.bottom <= opponent_coord.bottom
        ) {
            x_dir = 0;
            owner = opponent;
        }

        while (owner !== undefined) {

            // This sets the ball's coord the instant it touches a paddle
            let ownerPosition = owner.getPosition();
            ball_coord = ownerPosition;

        }
        // If ball reaches either side of arena, check to see 
        // who gets points
        if (
            ball_coord.left <= board_coord.left ||
            ball_coord.right >= board_coord.right
        ) {
            if (ball_coord.left <= board_coord.left) {
                opponentScore.innerHTML = +opponentScore.innerHTML + 1;
            } else {
                playerScore.innerHTML = +playerScore.innerHTML + 1;
            }
            gameState = 'start';

            ball_coord = initial_ball_coord;
            ball.style = initial_ball.style;
            message.innerHTML = 'Press Enter to Play Pong';
            message.style.left = 38 + 'vw';
            return;
        }
        ball.style.top = ball_coord.top + y_speed * (y_dir == 0 ? -1 : 1) + 'px';
        ball.style.left = ball_coord.left + x_speed * (x_dir == 0 ? -1 : 1) + 'px';
        ball_coord = ball.getBoundingClientRect();
        requestAnimationFrame(() => {
            moveBall(x_speed, y_speed, x_dir, y_dir);
            updateAI(ball_coord, opponent_coord);
        });
    }

    // The AI player will try to move towards the center of the screen
    // when the ball is moving towards it, and towards the ball's y-coordinate
    // when the ball is moving away

    function updateAI(ball_coord, opponent_coord) {
        if (ball_coord.x_speed > 0) {
            // Ball is moving towards AI player
            if (ball_coord.top < opponent_coord.top + opponent_coord.height / 2) {
                // Ball is above center of paddle, move paddle up
                opponent_coord.top -= opponent_coord.y_speed;
            } else {
                // Ball is below center of paddle, move paddle down
                opponent_coord.top += opponent_coord.y_speed;
            }
        } else {
            // Ball is moving away from AI player
            if (opponent_coord.y < ball.y) {
                // Paddle is below ball, move paddle down
                opponent_coord.y += opponent_coord.vy;
            } else {
                // Paddle is above ball, move paddle up
                opponent_coord.y -= opponent_coord.vy;
            }
        }
    };
}


gameLoop();