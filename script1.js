var width=360;
var height=540;
var size=60;
var turns=0;
var countM=new Array(9);
var pcolorM=new Array(9);
var gameover=false;
var canvas=document.getElementById("canvas");
var board = canvas.getContext("2d");
canvas.addEventListener("click", game);
var timer;
var counter=0;
var tune=document.getElementById("tune");
initializeM();
initialize();

function initialize()
{
	gameover = false;
	Minitial();
	drawboard();
	turns=0;
	counter=0;
	timer=setInterval(update, 200);
}

function initializeM()
{
	for(var i=0;i< 9;i++)
	{
		countM[i]=new Array(6);
		pcolorM[i]=new Array(6);
	}
}

function Minitial()
{
	for(var i = 0; i < 9; i++)
	{
		for(var j = 0; j < 6; j++)
		{
			pcolorM[i][j] = "";
			countM[i][j] = 0;	
			}
	}
}

function drawboard()
{
	board.clearRect(0, 0, width, height);
	if(turns% 2 == 0)
		board.strokeStyle = "red";
	else
		board.strokeStyle = "green";

		for(var i=0;i<6;i++){
		for(var j=0;j<9;j++){
			board.strokeRect(i*60,j*60,60,60);
		}}
	for(var i = 0; i < 9; i++)
	{
		for(var j = 0; j < 6; j++)
		{
			if(countM[i][j] == 0)
				continue;
			if(countM[i][j] == 1)
				Circle1(i, j, pcolorM[i][j]);
			else if(countM[i][j] == 2)
				Circle2(i, j, pcolorM[i][j]);
			else
				Circle3(i, j, pcolorM[i][j]);
		}
	}
}

function game(event)
{
	var rect=canvas.getBoundingClientRect();
	var x=event.clientX-rect.left;
	var y=event.clientY-rect.top;
	var row = Math.floor(x/60);
	var column = Math.floor(y/60);

	if(!gameover)
	{
		if(turns%2==0 && (pcolorM[column][row]=="" || pcolorM[column][row]=="red"))
		{
			countM[column][row]++;
			pcolorM[column][row] = "red";
			turns++;
			}
		if(turns%2==1 && (pcolorM[column][row]=="" || pcolorM[column][row]=="green"))
		{
			countM[column][row]++;
			pcolorM[column][row]="green";
			turns++;
		}
	}
}

function fillcorner(i, j){
	countM[i][j]-=2;
	countM[i==8 ? i-1 : i+1 ][j]++;
	countM[i][ j==5 ? j-1 : j+1 ]++;
	pcolorM[ i == 8 ? i-1 : i+1 ][j]=pcolorM[i][j];
	pcolorM[i][ j==5 ? j-1 : j+1 ]=pcolorM[i][j];
	if(countM[i][j]==0)
		pcolorM[i][j] = "";
	tune.play();
}

function filledgesy(i, j){
	countM[i][j]-=3;
	countM[i-1][j]++;
	countM[i+1][j]++;
	countM[i][ j==0 ? j+1 : j-1 ]++;
	pcolorM[i][ j==0 ? j+1 : j-1 ]=pcolorM[i][j];
	pcolorM[i-1][j]=pcolorM[i][j];
	pcolorM[i+1][j]=pcolorM[i][j];
	if(countM[i][j]==0)
		pcolorM[i][j]="";
	tune.play();
}
function filledgesx(i, j) {
	countM[i][j]-=3;
	countM[ i==0 ? i+1 : i-1 ][j]++;
	countM[i][j-1]++;
	countM[i][j+1]++;
	pcolorM[ i==0 ? i+1 : i-1 ][j]=pcolorM[i][j];
	pcolorM[i][j-1]=pcolorM[i][j];
	pcolorM[i][j+1]=pcolorM[i][j];
	if(countM[i][j]==0)
		pcolorM[i][j] = "";
	tune.play();
}
function update()
{

	counter++;

	drawboard();
	var cornerCord = [[0,0], [8,0], [8,5], [0,5]];

	while(unset()){
		if(countM[0][0]>=2){
			fillcorner(0,0);
			break;
		}
		if(countM[8][0]>=2){
			fillcorner(8,0);
			break;
		}		
		if(countM[8][5]>=2){
			fillcorner(8,5);
			break;
		}		
		if(countM[0][5]>=2){
			fillcorner(0,5);
			break;
		}

		for(var i=1;i<8;i++){
			if(countM[i][0]>=3)
				{ 
					filledgesy(i,0); 
					break; 
				}
			if(countM[i][5]>=3){ 
				filledgesy(i, 5);
				break; 
			}
		}
		for(var i = 1; i < 5; i++){
			if(countM[0][i]>=3)
				{ filledgesx(0, i); 
					break;
				 }
			if(countM[8][i]>=3)

				{ filledgesx(8, i);
				 break; }
		}

		for(var i = 1; i < 8; i++){
			for(var j = 1; j < 5; j++){
				if(countM[i][j] >= 4){
					countM[i][j] -= 4;
					countM[i-1][j]++;
					countM[i+1][j]++;
					countM[i][j-1]++;
					countM[i][j+1]++;
					pcolorM[i-1][j]=pcolorM[i][j];
					pcolorM[i+1][j]=pcolorM[i][j];
					pcolorM[i][j-1]=pcolorM[i][j];
					pcolorM[i][j+1]=pcolorM[i][j];
					if(countM[i][j]==0)
						pcolorM[i][j]="";
					tune.play();
					break;
				}
			}
		}
		break;
	}
	check();

}

function check()
{
	if(pwin()==1 || pwin()== 2)
	{
		gameover=true;
		drawboard();
		setTimeout(resultscreen.bind(null,pwin()),2500);
		clearInterval(timer);
		setTimeout(initialize,6000);
	}
}
function unset()
{
	var notset=false;
	if(countM[0][0]>=2||countM[8][5]>=2||countM[8][0]>=2||countM[0][5]>=2)
		notset=true;
	for(var i = 1;i < 8;i++)
if(countM[i][0] >= 3 ||countM[i][5]>=3)
			notset= true;
	for(var i = 1; i < 5; i++)
		if(countM[0][i] >= 3||countM[8][i] >= 3)
			notset= true;
	for(var i = 1; i < 8; i++)
for(var j =1; j< 8; j++)
			if(countM[i][j]>=4)
				notset= true;
	return notset;
}

function pwin()
{
	var redcount=0;
	var greencount=0;
	for(var i=0; i<9; i++)
	{
		for(var j=0;j<6;j++)
		{
			if(pcolorM[i][j]=="red") redcount++;
			if(pcolorM[i][j]=="green") greencount++;
		}
	}
	if(turns>1)
	{
		if(redcount==0)
		{
		return 2;
		}
		if(greencount==0)
		{
		return 1;
		}
	}
}
function resultscreen(player)
{
	if(player==1)
	{
		board.clearRect(0,0,width,height);
		board.fillStyle="green";
		board.fillRect(0,0,width,height);
		board.fillStyle="red";
		board.font = "32px Sans";
		board.fillText("Player 1 wins!", width/2-50, height/2-50);
	}
	else
	{
		board.clearRect(0,0,width, height);
		board.fillStyle="red";
		board.fillRect(0,0,width,height);
		board.fillStyle="green";
		board.font = "32px Sans";
		board.fillText("Player 2 wins!", width/2-50, height/2-50);
	}
}

function Circle1(row, column, color)
{
	board.beginPath();
	board.arc(column*60+30,row*60+30,10,0,2*Math.PI);
	board.fillStyle=color;
	board.fill();
	if()
	{
	if(counter%2==0)
		board.strokeStyle = "yellow";
	else
		board.strokeStyle = color;
	}
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth=1;
}
function Circle2(row, column, color)
{
	board.beginPath();
	board.arc(column*60+20,row*60+30,10,0,2*Math.PI);
	board.fillStyle=color;
	board.fill();
	if(counter%2 == 0)
			board.strokeStyle = "yellow";
	else
			board.strokeStyle = color;
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth = 1;
	board.beginPath();
	board.arc(column*60+40,row*60+30,10,0,2*Math.PI);
	board.fillStyle = color;
	board.fill();
	if(counter%2 == 0)
			board.strokeStyle = "yellow";
	else
			board.strokeStyle = color;
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth=1;
}
function Circle3(row, column, color)
{
	board.beginPath();
	board.arc(column*60+20,row*60+15,10,0,2*Math.PI);
	board.fillStyle = color;
	board.fill();
	if(counter%2 == 0)
		board.strokeStyle="yelllow";
	else
		board.strokeStyle=color;
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth=1;

	board.beginPath();
	board.arc(column*60+20,row*60+45,10,0,2*Math.PI);
	board.fillStyle=color;
	board.fill();
	if
	if(counter%2 == 0)
		board.strokeStyle = "yellow";
	else
		board.strokeStyle=color;
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth = 1;

	board.beginPath();
	board.arc(column*60+40,row*60+30,10,0,2*Math.PI);
	board.fillStyle = color;
	board.fill();

	if(counter%2==0)
		board.strokeStyle="yellow";
	else
		board.strokeStyle=color;
	board.lineWidth=2;
	board.stroke();
	board.closePath();
	board.lineWidth=1;
}
