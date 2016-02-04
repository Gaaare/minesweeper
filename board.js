var expandZeroes= new Array();
$(document).ready(function(){
	var board = new Array();
	var boardWidth=10;
	var boardHeight=10;
	var numOfMines= 20;
	var isMine = true;
	var mineCount = 0;
	
	
	function addMines(){
		for(var y = 0; y < boardHeight; y++){		
			board[y] = Array();		
			for(var x = 0; x < boardWidth; x++){	
			
				var mineGenerate = Math.floor((Math.random() * 10) + 1);
				
				if(mineCount >= numOfMines){
					board[y][x] = false;
				}else if(mineGenerate >= 9){
					mineCount +=1;
					board[y][x] = isMine;
					console.log(mineCount);
					
				} 
				 	
			}
		}
	}
	//console.log(mineCount);
	
	function surroundingDivs(y,x){
		var surrounding = new Array();
		surrounding[0]=$("div[data-x="+(x-1)+"][data-y="+(y-1)+"]");
		surrounding[1]=$("div[data-x="+x+"][data-y="+(y-1)+"]");
		surrounding[2]=$("div[data-x="+(x+1)+"][data-y="+(y-1)+"]");
		surrounding[3]=$("div[data-x="+(x-1)+"][data-y="+y+"]");
		surrounding[4]=$("div[data-x="+(x+1)+"][data-y="+y+"]");
		surrounding[5]=$("div[data-x="+(x-1)+"][data-y="+(y+1)+"]");
		surrounding[6]=$("div[data-x="+x+"][data-y="+(y+1)+"]");
		surrounding[7]=$("div[data-x="+(x+1)+"][data-y="+(y+1)+"]");
		
		return surrounding;
	}
	
 	function drawBoard(){
		$("#board").empty();
		for(var y = 0; y < boardHeight; y++){			
			for(var x = 0; x < boardWidth; x++){
				if(board[y][x]===isMine){
					$("#board").append("<div class=\"mineTile\" data-y="+y+" data-x="+x+" ></div>");
				}else{
					$("#board").append("<div class=\"tile\" data-y="+y+" data-x="+x+"></div>");
				} 
				if(x === boardWidth){
					$("#board").append("<br>")
			   }
			}
		}	
		$("#minecounter").empty();
		$("#minecounter").append("<p>"+mineCount+" mines </p>");	
		
	}
	
	function findZeroes(array, y, yPos, x, xPos){
		for(var i = 0; i < array.length; i++){
			if(array[i][y]===yPos){
				if(array[i][x]===xPos){
				return true;
				}
			}
		}
	}

	function expand(y, x){
		var zero = 0;
		var surrounding=surroundingDivs(y,x);
		
		if(y > 0 && x > 0 && findZeroes(expandZeroes, "y", y-1, "x", x-1) && 
		(!$(surrounding[0]).hasClass("clicked"))){			
			surrounding[0].append(zero).removeClass("marked");
			surrounding[0].addClass("clicked");
			expand(y-1, x-1);
		}else if(y > 0 && x > 0 && !findZeroes(expandZeroes, "y", y-1, "x", x-1) && 
		(!$(surrounding[0]).hasClass("clicked"))){			
			$(surrounding[0]).addClass("clicked");
			$(surrounding[0]).empty();
			$(surrounding[0]).append(checkAdjacent(y-1, x-1)).removeClass("marked");
		}
		
		if(y > 0 && findZeroes(expandZeroes, "y", y-1, "x", x)===true && 
		(!$(surrounding[1]).hasClass("clicked"))){			
			surrounding[1].append(zero).removeClass("marked");	
			surrounding[1].addClass("clicked");
			expand(y-1, x);
		}else if(y > 0 && !findZeroes(expandZeroes, "y", y-1, "x", x) && 
		(!$(surrounding[1]).hasClass("clicked"))){			
			$(surrounding[1]).addClass("clicked");
			$(surrounding[1]).empty();
			$(surrounding[1]).append(checkAdjacent(y-1, x)).removeClass("marked");
		}
		
		if(y > 0 && x < 9 && findZeroes(expandZeroes, "y", y-1, "x", x+1)===true && 
		(!$(surrounding[2]).hasClass("clicked"))){			
			surrounding[2].append(zero).removeClass("marked");	
			surrounding[2].addClass("clicked");
			expand(y-1, x+1);
		}else if(y > 0 && x < 9 && !findZeroes(expandZeroes, "y", y-1, "x", x+1) && 
		(!$(surrounding[2]).hasClass("clicked"))){			
			$(surrounding[2]).addClass("clicked");
			$(surrounding[2]).empty();
			$(surrounding[2]).append(checkAdjacent(y-1, x+1)).removeClass("marked");
		}
		
		if(x > 0 && findZeroes(expandZeroes, "y", y, "x", x-1)===true && 
		(!$(surrounding[3]).hasClass("clicked"))){			
			surrounding[3].append(zero).removeClass("marked");	
			surrounding[3].addClass("clicked");
			expand(y, x-1);
		}else if(x > 0 && !findZeroes(expandZeroes, "y", y, "x", x-1) && 
		(!$(surrounding[3]).hasClass("clicked"))){			
			$(surrounding[3]).addClass("clicked");
			$(surrounding[3]).empty();
			$(surrounding[3]).append(checkAdjacent(y, x-1)).removeClass("marked");
		}
		
		if(x < 9 && findZeroes(expandZeroes, "y", y, "x", x+1)===true && 
		(!$(surrounding[4]).hasClass("clicked"))){			
			surrounding[4].append(zero).removeClass("marked");	
			surrounding[4].addClass("clicked");
			expand(y, x+1);
		}else if(x < 9 && !findZeroes(expandZeroes, "y", y, "x", x+1) && 
		(!$(surrounding[4]).hasClass("clicked"))){			
			$(surrounding[4]).addClass("clicked");
			$(surrounding[4]).empty();
			$(surrounding[4]).append(checkAdjacent(y, x+1)).removeClass("marked");
		}
		
		if(y < 9 && x > 0 && findZeroes(expandZeroes, "y", y+1, "x", x-1)===true && 
		(!$(surrounding[5]).hasClass("clicked"))){			
			surrounding[5].append(zero).removeClass("marked");	
			surrounding[5].addClass("clicked");
			expand(y+1, x-1);
		}else if(y < 9 && x > 0 && !findZeroes(expandZeroes, "y", y+1, "x", x-1) && 
		(!$(surrounding[5]).hasClass("clicked"))){			
			$(surrounding[5]).addClass("clicked");
			$(surrounding[5]).empty();
			$(surrounding[5]).append(checkAdjacent(y+1, x-1)).removeClass("marked");
		}
		
		if(y < 9 && findZeroes(expandZeroes, "y", y+1, "x", x)===true && 
		(!$(surrounding[6]).hasClass("clicked"))){			
			surrounding[6].append(zero).removeClass("marked");	
			surrounding[6].addClass("clicked");
			expand(y+1, x);
		}else if(y < 9 && !findZeroes(expandZeroes, "y", y+1, "x", x) && 
		(!$(surrounding[6]).hasClass("clicked"))){			
			$(surrounding[6]).addClass("clicked");
			$(surrounding[6]).empty();
			$(surrounding[6]).append(checkAdjacent(y+1, x)).removeClass("marked");
		}
		
		if(y < 9 && x < 9 && findZeroes(expandZeroes, "y", y+1, "x", x+1)===true && 
		(!$(surrounding[7]).hasClass("clicked"))){			
			surrounding[7].append(zero).removeClass("marked");	
			surrounding[7].addClass("clicked");
			expand(y+1, x+1);
		}else if(y < 9 && x < 9 && !findZeroes(expandZeroes, "y", y+1, "x", x+1) && 
		(!$(surrounding[7]).hasClass("clicked"))){			
			$(surrounding[7]).addClass("clicked");
			$(surrounding[7]).empty();
			$(surrounding[7]).append(checkAdjacent(y+1, x+1)).removeClass("marked");
		}
	}
	
	function checkAdjacent(y, x){
		var x= parseInt(x);
		var y= parseInt(y);
		
		var adjCount=0;
					
			    //console.log(x+" "+y);
				
				if(y > 0){
					if(x > 0){if(board[y-1][x-1]===true){adjCount+=1;}}
					if(board[y-1][x]===true){adjCount+=1;}
					if(board[y-1][x+1]===true){adjCount+=1;}
				}
				if(x > 0){
					if(board[y][x-1]===true){adjCount+=1;}
					}
				if(board[y][x+1]===true){adjCount+=1;}
				if(y < 9){
					if(x > 0){if(board[y+1][x-1]===true){adjCount+=1;}}
					if(board[y+1][x]===true){adjCount+=1;}
					if(board[y+1][x+1]===true){adjCount+=1;}
				}
							
				return adjCount;				
			}
		//}	
	
	function addZeroes(){			
		expandZeroes.length = 0;
		for(var y = 0; y < boardHeight; y++){		
			for(var x = 0; x < boardWidth; x++){	
				if(board[y][x]!== true){
					if(checkAdjacent(y,x)===0){				
						expandZeroes.push({y: y,x: x});
						//console.log(expandZeroes);
					}
				}
			}		
		}
	}
		
	
	
	

	$(document).on("click","#board div",function(e){		 
		var x= parseInt($(this).attr("data-x"));
		var y= parseInt($(this).attr("data-y"));	
		if(e.shiftKey && (!$(this).hasClass("clicked"))){
			if(!$(this).hasClass("marked")){
				$(this).addClass("marked");
				$(this).append("X");
			}else{
				$(this).empty();
				$(this).removeClass("marked");
			}
		}else if(board[y][x]===isMine && (!$(this).hasClass("marked"))){
			alert("you lose");
			console.log(x+" "+y);
			mineCount=0;
			addMines();
			drawBoard();
			addZeroes();
		}else if($(this).hasClass("clicked")){	
					return 0;
				}else{
					//checkAdjacent(x,y);
					$(this).addClass("clicked");
					$(this).append("<p>"+checkAdjacent(y,x)+"</p>");
					if(checkAdjacent(y, x)===0)
					{
						expand(y, x);
						//$("div[data-x="+x+"][data-y="+y+"]").append(adjCount);
					} 
				}
			//alert(1);
			return false;
	})	
	$(document).on("click","#cheater",function(){
		$(".mineTile").toggleClass("cheat");		
	})	
	addMines();
	drawBoard();
	addZeroes();
//	console.log(expandZeroes);
	
})

//$("div[data-x="+x+"][data-y="+y+"]").append(adjCount);