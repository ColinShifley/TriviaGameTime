$(document).ready(function(){

	

$('#start').on('click', function(){
	$('#start').remove();
	game.loadQuestion();
})

$(document).on('click','.answer-button',function(e){
	game.clicked(e);
})

$(document).on('click', '#reset', function(){
	game.reset();
})

var questions = [{
	question: 'How far back in history has been traced?',
	answers: ['Neolithic', 'Paleolithic', 'Sandwich', 'PotentPotables'],
	correctAnswer: 'Neolithic',
	image: './assets/images/paleobeer.png'
},{
	question: 'Stout was a descriptor of which type of beer before becoming its own style?',
	answers: ['IPA', 'Stout', 'Porter', 'PotentPotables'],
	correctAnswer: 'Porter',
	image: './assets/images/sp.jpg'
},{
	question: 'Where did Russian Imperial Stout originate?',
	answers: ['London', 'Chernoble', 'Mesopotamia', 'PotentPotables'],
	correctAnswer: 'London',
	image: './assets/images/ris.jpg'
},
];




var game = {
	questions:questions,
	currentQuestion:0,
	counter:30,
	correct:0,
	incorrect:0,
	unanswered:0,
	reset:0,
	countdown: function(){
		game.counter--;
		$('#counter').html(game.counter);

		if(game.counter<=0){
			console.log("TIME UP!");
			game.timeUp();
		}

	},
	loadQuestion: function(){
		timer = setInterval(game.countdown,1000);
		$('#subwrapper').html("<h2>time remaining: <span id='counter'>30</span> seconds</h2>")
		$('#subwrapper').append('<h2>'+questions[game.currentQuestion].question+'</h2>');
		for(var i=0;i<questions[game.currentQuestion].answers.length;i++){
			$('#subwrapper').append('<button class="answer-button" id="button-'+i+'" data-name="'+questions[game.currentQuestion].answers[i]+'">'+questions[game.currentQuestion].answers[i]+'</button>');
		}
	},
	nextQuestion: function(){
		game.counter = 30;
		$('#counter').html(game.counter);
		game.currentQuestion++;
		game.loadQuestion();

	},
	timeUp: function(){
		clearInterval(timer);
		game.unaswered++;
		$('#subwrapper').html('<h2>out of time</h2>');
		$('#subwrapper').append('<h3>the correct answer was: '+questions[game.currentQuestion].correctAnswer+'</h3>');
		if(game.currentQuestion==questions.length-1){
				setTimeout(game.results,3*1000);
			}
			else
			{
				setTimeout(game.nextQuestion,3*1000)
			}
	},
	results: function(){
		clearInterval(timer);
		var question = questions[game.currentQuestion];
		$('#subwrapper').append("<h3>Correct: "+game.correct+"</h3>");
		$('#subwrapper').append("<h3>Incorrect: "+game.incorrect+"</h3>");
		$('#subwrapper').append("<h3>Unanswered: "+game.unaswered+"</h3>")
		$('#subwrapper').append('<button id="reset">Reset</button>')
		
	},
	clicked: function(e){
		clearInterval(timer);
		if($(e.target).data("name")==questions[game.currentQuestion].correctAnswer){
			game.answeredCorrectly();
		}
		else
		{
			game.answeredIncorrectly();
		}

	},
	answeredCorrectly: function(){
		console.log("you got it")
		clearInterval(timer);
		game.correct++;
		var question = questions[game.currentQuestion];
		$('#subwrapper').html('<h2>you got it right</h2>')
		$('#subwrapper').append($('<div id="imgbox"><img src='+question.image+' id="tag" alt=“”></div>'));
			if(game.currentQuestion==questions.length-1){
				setTimeout(game.results,3*1000);
			}
			else
			{
				setTimeout(game.nextQuestion,3*1000)
			}
	},
	answeredIncorrectly: function(){
		console.log("loser")
		clearInterval(timer);
		game.incorrect++;
		var question = questions[game.currentQuestion];
		$('#subwrapper').html('<h2>you got it wrong!</h2>');
		$('#subwrapper').append('<h3>the correct answer was: '+question.correctAnswer+'</h3>');
		$('#subwrapper').append($('<img src='+question.image+' id="tag" alt=“”>'));
		
			if(game.currentQuestion==questions.length-1){
				setTimeout(game.results,3*1000);
			}
			else
			{
				setTimeout(game.nextQuestion,3*1000)
			}
	},
	reset: function(){
		game.currentQuestion = 0;
		game.incorrect = 0;
		game.counter = 30;
		game.correct = 0;
		game.unaswered = 0;
		game.loadQuestion();
	}
}});
