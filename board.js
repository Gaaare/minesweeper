var expandZeroes= new Array();
$(document).ready(function(){
	var board = new Array();
	var boardWidth=10;
	var boardHeight=10;
	var numOfMines= 5;
	var isMine = true;
	var mineCount = 0;
	
	function addMines(){
		for(var y = 0; y < boardHeight; y++){		
			board[y] = Array();		
			for(var x = 0; x < boardWidth; x++){	
			
				var mineGenerate = Math.floor((Math.random() * 10) + 1);
				
				if(mineGenerate >= 9){
					mineCount +=1;
					board[y][x] = isMine;
					console.log(mineCount);
					
				} 
				 if(mineCount >= numOfMines){
					board[y][x] = false;
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
/* 	function revealSurrounding(y,x){
		
		$("div[data-x="+(x-1)+"][data-y="+(y-1)+"]").addClass("clicked").append(checkAdjacent(y-1,x-1));
		$("div[data-x="+x+"][data-y="+(y-1)+"]").addClass("clicked").append(checkAdjacent(y-1,x));
		$("div[data-x="+(x+1)+"][data-y="+(y-1)+"]").addClass("clicked").append(checkAdjacent(y-1,x+1));		
		$("div[data-x="+(x-1)+"][data-y="+y+"]").addClass("clicked").append(checkAdjacent(y,x-1));		
		$("div[data-x="+(x+1)+"][data-y="+y+"]").addClass("clicked").append(checkAdjacent(y,x+1));		
		$("div[data-x="+(x-1)+"][data-y="+(y+1)+"]").addClass("clicked").append(checkAdjacent(y+1,x-1));		
		$("div[data-x="+x+"][data-y="+(y+1)+"]").addClass("clicked").append(checkAdjacent(y+1,x));		
		$("div[data-x="+(x+1)+"][data-y="+(y+1)+"]").addClass("clicked").append(checkAdjacent(y+1,x+1));
	} */
	function expand(y, x){
		var zero = 0;
		var surrounding=surroundingDivs(y,x);
		if(findZeroes(expandZeroes, "y", y-1, "x", x-1)===true && (!$(surrounding[0]).hasClass("clicked"))){			
		surrounding[0].append(zero);	
			surrounding[0].addClass("clicked");
			expand(y-1,x-1);
		}
		if(findZeroes(expandZeroes, "y", y-1, "x", x)===true && (!$(surrounding[1]).hasClass("clicked"))){			
			surrounding[1].append(zero);	
			surrounding[1].addClass("clicked");
			expand(y-1,x);
		}
		if(findZeroes(expandZeroes, "y", y-1, "x", x+1)===true && (!$(surrounding[2]).hasClass("clicked"))){			
			surrounding[2].append(zero);	
			surrounding[2].addClass("clicked");
			expand(y-1,x+1);
		}
		if(findZeroes(expandZeroes, "y", y, "x", x-1)===true && (!$(surrounding[3]).hasClass("clicked"))){			
			surrounding[3].append(zero);	
			surrounding[3].addClass("clicked");
			expand(y,x-1);
		}
		if(findZeroes(expandZeroes, "y", y, "x", x+1)===true && (!$(surrounding[4]).hasClass("clicked"))){			
			surrounding[4].append(zero);	
			surrounding[4].addClass("clicked");
			expand(y,x+1);
		}
		if(findZeroes(expandZeroes, "y", y+1, "x", x-1)===true && (!$(surrounding[5]).hasClass("clicked"))){			
			surrounding[5].append(zero);	
			surrounding[5].addClass("clicked");
			expand(y+1,x-1);
		}
		if(findZeroes(expandZeroes, "y", y+1, "x", x)===true && (!$(surrounding[6]).hasClass("clicked"))){			
			surrounding[6].append(zero);	
			surrounding[6].addClass("clicked");
			expand(y+1,x);
		}
		if(findZeroes(expandZeroes, "y", y+1, "x", x+1)===true && (!$(surrounding[7]).hasClass("clicked"))){			
			surrounding[7].append(zero);	
			surrounding[7].addClass("clicked");
			expand(y+1,x+1);
		}
	}
	
	function checkAdjacent(y, x){
		var tileX= x;
		var tileY= y;
		
		var adjCount=0;
					
			    //console.log(tileX+" "+tileY);
				if(tileY > 0){
					if(tileX > 0){if(board[tileY-1][tileX-1]===true){adjCount+=1;}}
					if(board[tileY-1][tileX]===true){adjCount+=1;}
					if(board[tileY-1][tileX+1]===true){adjCount+=1;}
				}
				if(board[tileY][tileX-1]===true){adjCount+=1;}
				if(board[tileY][tileX+1]===true){adjCount+=1;}
				if(tileY < 9){
					if(tileX > 0){if(board[tileY+1][tileX-1]===true){adjCount+=1;}}
					if(board[tileY+1][tileX]===true){adjCount+=1;}
					if(board[tileY+1][tileX+1]===true){adjCount+=1;} 
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
	
	
	
	 
	$(document).on("click","#board div",function(){		 
		var tileX= parseInt($(this).attr("data-x"));
		var tileY= parseInt($(this).attr("data-y"));
		
		if(board[tileY][tileX]===isMine){
			alert("you lose");
			console.log(tileX+" "+tileY);
			mineCount=0;
			addMines();
			drawBoard();
			addZeroes();
		}else{		
			if($(this).hasClass("clicked")){	
					return 0;
				}else{
					//checkAdjacent(tileX,tileY);
					$(this).addClass("clicked");
					$(this).append("<p>"+checkAdjacent(tileY,tileX)+"</p>");
					if(checkAdjacent(tileY, tileX)===0)
					{
						expand(tileY, tileX);
						//$("div[data-x="+tileX+"][data-y="+tileY+"]").append(adjCount);
					} 
				}
			//alert(1);
			return false;
		}
	})
	addMines();
	drawBoard();
	addZeroes();
	console.log(expandZeroes);
	
})

//$("div[data-x="+tileX+"][data-y="+tileY+"]").append(adjCount);