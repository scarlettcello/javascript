
	//player is a human that is identified by token x or o
	var player = 'X';
	
	//There are 9 empty cells to start with 
	var empty = 9;
	
	//gameover is false if the game is in progress. 
	var gameOver = false;
	
	//winning combos are 3 rows, 3 columns, 2 diagonals
	var winCombo = [
		[0,1,2],[3,4,5],[6,7,8],
		[0,3,6],[1,4,7],[2,5,8],
		[0,4,8],[2,4,6]
	];
	
	//board is a collection of 9 cells
	var board = document.getElementsByTagName("td");
	
	/* 
	  function setMessage() is called to display message whose turn it is and who has won
	*/
	function setMessage(msg) {
		document.getElementById("message").innerHTML = msg;
		document.getElementById("message").style.color = 'navy';
		document.getElementById("message").style.fontSize = '18px';
	}
	
	/*
	  function setMessage() is called to display message if the game is in progress or over.
	*/
	function setMessage2(msg) {
		document.getElementById("message2").innerHTML = msg;
		document.getElementById("message2").style.color = 'blue';
		document.getElementById("message2").style.fontSize = '16px';
	}
	
	/* 
		function cellClick() is called when a player clicks a cellClick
	*/
	function cellClick(cell) {
	
		//check if there is a winner
		//decrease the number of cells to click
		if (!gameOver && cell.innerHTML == " ") {
			cell.innerHTML = player;
			cleanBgColor();
			cell.style.backgroundColor = 'lightBlue';
			if (player == "X") {
				player = "O";
				setMessage("It's " + player +"'s turn");
			}else{
				player = "X";
				setMessage("It's " + player +"'s turn");
			}empty--;
			checkWinner();
		}
		else {
			setMessage("Wrong move");
		}
	}
	
	/*
		function checkWinner() checks all possible winning combinations
	*/
	function checkWinner() {
		//check rows, cols, diags
		//if empty is 9, then we declare draw and end the game

		for(var i = 0; i < winCombo.length; i++) {
			if(board[winCombo[i][0]].innerHTML != " " &&
				board[winCombo[i][0]].innerHTML == board[winCombo[i][1]].innerHTML &&
				board[winCombo[i][1]].innerHTML == board[winCombo[i][2]].innerHTML ) {
				board[winCombo[i][0]].style.color = "red";
				board[winCombo[i][1]].style.color = "red";
				board[winCombo[i][2]].style.color = "red";
				cleanBgColor();
				document.getElementById("message").innerHTML = board[winCombo[i][0]].innerHTML + " wins!";
				endGame();
			}
		}		
	
		//check if the game is a draw 
		if (empty == 0) {
			document.getElementById("message").innerHTML = "It's a draw.";
			endGame();
		}
	}
	
	/*
		function cleanBgColor() is called to get rid of the background-color
	*/
	function cleanBgColor() {
		for(var j=0; j<board.length; j++) {
			board[j].style.backgroundColor = 'transparent';
		}
	}
	
	/* 
		function endGame() is called to show the game is over
	*/
	function endGame() {
		gameOver = true;
		setMessage2("Game Over");
	}

	/*
		function resetGame() resets the game
	*/
	function resetGame() {
	
		for(var i=0; i<board.length; i++) {
			board[i].innerHTML = " ";
			board[i].style.color = 'navy';
			board[i].style.backgroundColor = 'transparent';
		}
		gameOver = false;
		empty = 9;
		setMessage(player + " gets to start.");
		setMessage2("Go!");
		console.log("visited resetGame");
	}

	//listener for the button with id="start"
	document.getElementById("start").addEventListener("click", resetGame());
	
	//listeners for the nine td objects
	for(var i=0; i < board.length; i++){
		board[i].addEventListener("click", 
			function() {
			console.log("clicked");
				cellClick(this);
			}
		);
	}	