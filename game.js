enchant();

window.onload = function() {
    game = new Game(320, 320);
	game.fps = 30;
    game.preload(['chara0.gif','chara5.gif']);
    game.onload = function() {
		addPlayer();
        game.rootScene.addEventListener('enterframe',function(){
	        if(game.frame % 300 == 0){
				addEnemy();
	        }
		});
    }
    game.start();
}

function addPlayer(){
    player = new Sprite(32, 32);
    player.image = game.assets['chara0.gif'];
	player.addEventListener('enterframe',function(){
		if(game.input.left){this.x -= 3; this.frame = 9;}
		if(game.input.right){this.x += 3; this.frame = 18;}
		if(game.input.up){this.y -= 3; this.frame = 27;}
		if(game.input.down){this.y += 3; this.frame = 0;}
		if(this.x > 320){this.x = 0;}
		else if(this.x < 0){this.x = 320;}
		if(this.y > 320){this.y = 0;}
		else if(this.y < 0){this.y = 320;}
	});
    game.rootScene.addChild(player);
}
function addEnemy(){
	var enemy = new Sprite(32, 32);
	enemy.image = game.assets['chara5.gif'];
	enemy.x = 240;
	enemy.y = 0;
	enemy.frame = 6;
	enemy.addEventListener('enterframe',function(){
		if(this.within(player, 12)){
			game.rootScene.backgroundColor = 'red';
			game.stop();
		}
		if(this.x < player.x){this.x += 1;}
		else if(this.x > player.x){this.x -= 1;}
		if(this.y < player.y){this.y += 1;}
		else if(this.y > player.y){this.y -= 1;}
		if(game.frame % 10 == 0){
			this.frame++;
			if(this.frame > 8){this.frame = 6;}
		}
	});
    game.rootScene.addChild(enemy);
}
