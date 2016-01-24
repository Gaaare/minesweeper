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
	console.log(mineCount);
	
 	function drawBoard(){
		$("#board").empty();
		for(var y = 0; y < boardHeight; y++){			
			for(var x = 0; x < boardWidth; x++){
				if(board[y][x]===isMine){
					$("#board").append("<div class=\"mineTile\" data-y=\""+y+"\" data-x=\""+x+"\" ></div>");
				}else{
					$("#board").append("<div class=\"tile\" data-y=\""+y+"\" data-x=\""+x+"\"></div>");
				} 
				if(x === boardWidth){
					$("#board").append("<br>");
			   }
			}
		}		
	}
	
	function checkAdjacent(tile){
		var tile= $(tile);
		var tileX= $(tile).attr("data-x");
		var tileY= $(tile).attr("data-y");
		var adjCount=0;
		
		if(board[tileY][tileX]===true){
			alert("you lose");
			console.log(tileX+" "+tileY);
			addMines();
			drawBoard();
		}else{
			if(tile.hasClass("clicked")){	
				return 0;
			}else{				
				if(board[tileY-1][tileX-1]===true){adjCount+=1;}
				if(board[tileY-1][tileX]===true){adjCount+=1;}
				if(board[tileY-1][tileX+1]===true){adjCount+=1;}
				if(board[tileY][tileX-1]===true){adjCount+=1;}
				if(board[tileY][tileX+1]===true){adjCount+=1;}
				if(board[tileY+1][tileX-1]===true){adjCount+=1;}
				if(board[tileY+1][tileX]===true){adjCount+=1;}
				if(board[tileY+1][tileX+1]===true){adjCount+=1;} 
				tile.append("<p>"+adjCount+"</p>");
			}
		}
		
	}
	 $(document).on("click","#board div",function(){
		checkAdjacent(this);
		$(this).addClass("clicked");
		//alert(1);
		return false;
	})
	addMines();
	drawBoard();
	$("#minecounter").append("<p>"+mineCount+" mines </p>");
})