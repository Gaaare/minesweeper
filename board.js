var expandZeroes= new Array();
$(document).ready(function(){
	var board = Array();
	var boardWidth=10;
	var boardHeight=10;
	var numOfMines= 25;
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
			}
		}
	}
	//console.log(mineCount);
	
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

	
	function checkAdjacent(x,y){
		var tileX= x;
		var tileY= y;
		
		var adjCount=0;
							
			    //console.log(tileX+" "+tileY);
				if(tileY > 0){
					if(board[tileY-1][tileX-1]===true){adjCount+=1;}
					if(board[tileY-1][tileX]===true){adjCount+=1;}
					if(board[tileY-1][tileX+1]===true){adjCount+=1;}
				}
				if(board[tileY][tileX-1]===true){adjCount+=1;}
				if(board[tileY][tileX+1]===true){adjCount+=1;}
				if(tileY < 9){
					if(board[tileY+1][tileX-1]===true){adjCount+=1;}
					if(board[tileY+1][tileX]===true){adjCount+=1;}
					if(board[tileY+1][tileX+1]===true){adjCount+=1;} 
				}
				
				if(adjCount === 0)
				{
					
 				} 
				return adjCount;
				
			}
		//}	
	
	function addZeroes(){			
		expandZeroes.length = 0;
		for(var y = 0; y < boardHeight; y++){		
			for(var x = 0; x < boardWidth; x++){	
				if(board[y][x]!== true){
					if(checkAdjacent(x,y)===0){				
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
					$(this).append("<p>"+checkAdjacent(tileX,tileY)+"</p>");
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