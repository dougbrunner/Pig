//ask how many players there's going to be and create an array of them
var player_turn = 1;
var players_array=[];
var roll_array =[];
var round_total = 0;

var create_player_array = function(){
    var players = $('.player-form select').val();
    for(var i=0;i<players;i++){
        var player_id = {
            'score_total': ''
        };
        players_array.push(player_id);
    }
};

//create html for each character
var create_player_html = function(i){
    //create html
    var $player = $("<div class=player"+(i+1)+"></div>");
    var $player_number = $('<h1>Player '+(i+1)+' Score</h1>');
    var $score_total = $('<p id="'+(i+1)+'">'+0+'</p>');
    $player.append($player_number);
    $player.append($score_total);
    //append html to the page
    $('.players-array').append($player);
};

var end_turn = function(){
    players_array[player_turn-1].score_total = Number(players_array[player_turn-1].score_total) + Number(round_total);
    $('#'+player_turn).html(players_array[player_turn-1].score_total);
    if(player_turn > players_array.length-1){
        player_turn = 1;
    } else {
        player_turn += 1; 
    }
    round_total = 0;
    roll_array = [];
    $('#round-total').html('&nbsp;');
    $('#roll-record').html('&nbsp;');
    var color = $('.player'+(player_turn)).css('background-color');
    $('.game-board').css("background-color", color);
    $('.selected').removeClass('selected');
    $('.player'+(player_turn)).addClass('selected');
};

$('#players-button').click(function(){
    create_player_array();
    for(var i=0;i<players_array.length;i++){
       create_player_html(i);
    }
    $('.player-form').hide();
    $('.controls').show();
    $('.game-board').show();
    var player_div_size = (100/players_array.length);
    $('.players-array > div').width(player_div_size+'%');
    $('.player1').addClass('selected');
});

$('#roll').click(function(){
    var roll = Math.floor(Math.random() * 6) + 1;
    if(roll == 1){
        alert("You rolled a 1, no turn for you!");
        round_total=0;
        end_turn();
    }else{
        roll_array.push(roll+' ');
        for(var i=0;i<roll_array.length;i++){
            $('#roll-record').html(roll_array);
        }
        round_total = roll+round_total;
        $('#round-total').html(round_total);
    }
});

$('#end_turn').click(function(){
    end_turn();
});

$('#start-over').click(function(){
    location.reload();
});
