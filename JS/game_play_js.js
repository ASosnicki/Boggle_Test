var boggleWords = new Array();
var currentString = "";
//flag for if string is being built currently
var mousedown = 0;

//words from boggleDictionary.js 
var dictionaryWords; 
// game score
var sum = 0;
// for knowing legal moves
var prevtab;






var tab1 = new Array('A', 'A', 'A', 'F', 'R', 'S');
var tab2 = new Array('A', 'A', 'E', 'E', 'E', 'E');
var tab3 = new Array('A', 'A', 'F', 'I', 'R', 'S');
var tab4 = new Array('A', 'D', 'E', 'N', 'N', 'N');
var tab5 = new Array('A', 'E', 'E', 'E', 'E', 'M');
var tab6 = new Array('A', 'E', 'E', 'G', 'M', 'U');
var tab7 = new Array('A', 'E', 'G', 'M', 'N', 'N');
var tab8 = new Array('A', 'F', 'I', 'R', 'S', 'Y');
var tab9 = new Array('B', 'J', 'K', 'QU', 'X', 'Z');
var tab10 = new Array('C', 'C', 'E', 'N', 'S', 'T');
var tab11 = new Array('C', 'E', 'I', 'I', 'L', 'T');
var tab12 = new Array('C', 'E', 'I', 'L', 'P', 'T');
var tab13 = new Array('C', 'E', 'I', 'P', 'S', 'T');
var tab14 = new Array('D', 'D', 'H', 'N', 'O', 'T');
var tab15 = new Array('D', 'H', 'H', 'L', 'O', 'R');
var tab16 = new Array('D', 'H', 'L', 'N', 'O', 'R');
var tab17 = new Array('D', 'H', 'L', 'N', 'O', 'R');
var tab18 = new Array('E', 'I', 'I', 'I', 'T', 'T');
var tab19 = new Array('E', 'M', 'O', 'T', 'T', 'T');
var tab20 = new Array('E', 'N', 'S', 'S', 'S', 'U');
var tab21 = new Array('F', 'I', 'P', 'R', 'S', 'Y');
var tab22 = new Array('G', 'O', 'R', 'R', 'V', 'W');
var tab23 = new Array('I', 'P', 'R', 'R', 'R', 'Y');
var tab24 = new Array('N', 'O', 'O', 'T', 'U', 'W');
var tab25 = new Array('O', 'O', 'O', 'T', 'T', 'U');

var grid = new Array(tab1, tab2, tab3, tab4, tab5, tab6, tab7, tab8, tab9, tab10,
					 tab11, tab12, tab13, tab14, tab15, tab16,tab17,tab18,tab19,tab20,tab21,tab22,tab23,tab24,tab25);


// returns a random letter from the tab
function chooseLetter(tab){
	 return tab[Math.floor((Math.random()*6))];
}

// returns a random ordering of tabs in the grid, using the Knuth Shuffle from:
// http://www.htmlblog.us/random-javascript-array
Array.prototype.randomize = function(){
	var i = this.length; 
	var j; 
	var temp;
	while (--i)
	{
		j = Math.floor( Math.random() * (i - 1));
		temp = this[i];
		this[i] = this[j];
		this[j] = temp;
	}
}

function playAgain(){
	document.getElementById("score_overlay").style.visibility = "hidden";
	document.getElementById("score_screen").style.visibility = "hidden";
	shuffleboggle_grid();
}

// randomizes board and resets 
function shuffleboggle_grid(){
	clearBoard();
	clearlist();
	grid.randomize();
	var stringOfI;
	for (var i = 1; i < grid.length+1; i++){
		stringOfI = "tab"+i.toString();
		var letter = chooseLetter(grid[i-1]);
		if (letter == 'Q'){letter = "Qu";}
		document.getElementById(stringOfI).textContent = letter;
	}

// 	//clear out timer if player is wants to play before current game has finished
// 	if (min >= 0 && sec >= 0){
// 		window.clearTimeout(countdownTime);
// 		sec = resetsec;
// 		min = resetmin;
// 	}
// 	sum = 0;
// 	document.getElementById("currentScore").innerHTML = sum;
// 	countdownTimer();
// 	return;
// }

// // initiate and regulates countdown of game timer
// function countdownTimer(){
//  	sec--;
//   	if (sec == -01) {
//    		sec = 59;
//    		min = min - 1; 
// 	}
//   	else {
//    		min = min; 
// 	}
// 	if (sec <= 9) { 
// 		document.getElementById("countdownTimer").innerHTML = " " + min + ":0" + sec;
// 	}
// 	else{
// 		document.getElementById("countdownTimer").innerHTML  = " " + min + ":" + sec;
// 	}

// 	countdownTime = window.setTimeout("countdownTimer();", 1000);

// 	if (min == 0 && sec == 0) { 
// 		// stop timer and display end game screen
// 		window.clearTimeout(countdownTime); 
// 		sec = resetsec;
// 		min = resetmin;
// 		document.getElementById("score_overlay").style.visibility = "visible";
// 		document.getElementById("score_screen").style.visibility = "visible";
		
// 		// provide game stats
// 		document.getElementById("score").innerHTML = sum;
// 		var p = Math.floor( Math.random() * (randomPhrase.length));
// 		document.getElementById("endMessage").innerHTML = randomPhrase[p];
// 	}
// }

// // called when mouse press over unactivated tab --> start of a word
// function buildWord(event){
// 	var tab = event.target;
// 	if (tab.style.backgroundColor != "orange"){
// 		tab.style.backgroundColor = "orange";
// 		currentString = currentString.concat(tab.textContent);
// 		console.log(currentString);
// 		prevtab = Number(tab.id.substr(4, tab.id.length-1));
// 		if (mousedown == 0){mousedown++;}
// 	}
// }

// while in the process of building a word
function buildingWord(event){
	if (mousedown == 1){
		var tab = event.target;
		if (tab.style.backgroundColor != "orange"){
			var currenttab = Number(tab.id.substr(4, tab.id.length-1));
			//if next tab touched is not immediately by last tab, don't do anything
			if (currenttab < prevtab-5 || currenttab > prevtab+5 ||
				currenttab == prevtab-2 || currenttab == prevtab+2 ||
				(prevtab%4 == 0 && currenttab == prevtab-3)|| 
				((prevtab-1)%4 == 0 && currenttab == prevtab+3)){
				return;
			}
			tab.style.backgroundColor = "orange";
			currentString = currentString.concat(tab.textContent);
			prevtab = currenttab;
			console.log(currentString);
		if (mousedown == 0){mousedown=1;}
		}
	}
}

function submitWord(event){
	if (mousedown == 1){
		// if the word is long enough, add it to the word list
		if (currentString.length >= 3){
			boggleWords.push(currentString);
			var wl = document.getElementById("wordList");
			updateList(boggleWords, wl);
		}
		clearBoard();
	}
}

function clearBoard(){
	var grid = document.getElementById("boggle_grid");
	var tabs = grid.getElementsByTagName("div");
	for (var i=0; i<tabs.length; i++)
	{
     	if (tabs[i].style.backgroundColor != "white"){
     		tabs[i].style.backgroundColor = "white";
     	}
	}
	currentString = "";
	mousedown = 0;
	return;
}

// reset array of played words and clear displayed table of words
function clearlist(){
	boggleWords.length = 0; //empty word list
	var wl = document.getElementById("wordList");
	while (document.getElementById("wordList").hasChildNodes()){
		document.getElementById("wordList").removeChild(document.getElementById("wordList").firstChild);
	}
}

// checks to see if new word is a duplicate, makes all duplicates blue, then adds new word to word list
function updateList(array, wl){
	var duplicate = false;
	var index = array.length-1;
	for (var i = 0, row; row = wl.rows[i]; i++){
		if (row.cells[0].innerHTML == array[index]){
			row.style.color = "#0090b2"; // make previous duplicate blue, too
			duplicate = true;
		}
	}
	var row = wl.insertRow(index);
	row.insertCell(0);
	row.insertCell(1);
	wl.rows[index].cells[0].innerHTML = array[index];
	
	if (duplicate == true){
		wl.rows[index].style.color = "#0090b2"; // if duplicate, add and make blue, but do not score
		wl.rows[index].cells[1].innerHTML = "/"; 
	}
	else{
		getScores(wl, index);// not a duplicate, score it, and update current score
		document.getElementById("currentScore").innerHTML = sum;
	}
}

// get score for each word and sum of scores, not optimal
function getScores(wl, index){
	var searchword = wl.rows[index].cells[0].innerHTML.toLowerCase();
	var max = boggleDictionary.length
	for (var i=0; i < boggleDictionary.length; i++){
		if (searchword.charAt(0) > boggleDictionary[i].charAt(0)){
			continue;
		}
		else if (searchword.charAt(0) == boggleDictionary[i].charAt(0)){
			if (searchword == boggleDictionary[i]){
				// score word appropriately if in dictionary
				switch (searchword.length){
					case 3:
					case 4:
						wl.rows[index].cells[1].innerHTML = "1";
						sum += 1;
						break;
					case 5: 
						wl.rows[index].cells[1].innerHTML = "2";
						sum += 2;
						break;
					case 6:
						wl.rows[index].cells[1].innerHTML = "3";
						sum += 3;
						break;
					case 7:
						wl.rows[index].cells[1].innerHTML = "5";
						sum += 5;
						break;
					default:
						wl.rows[index].cells[1].innerHTML = "11";
						sum += 5;
						break;
				}
				return;	
			}
		}else{
			wl.rows[index].style.color = "rgb(255, 0, 0)"; // turn it red because 
			wl.rows[index].cells[1].innerHTML = "X"; //it isn't a word in dictionary
			return;
		}
	}
}