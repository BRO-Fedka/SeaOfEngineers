function startgame() {
	// alert(0)
	// console.log('test');
	if (!(nicknameinput.value == '')) {
		try {
			let socket = new WebSocket("wss://91.238.88.249:8000");
			socket.addEventListener('open', function (event) {
				socket.send('n'+nicknameinput.value);
				// console.log('ok')
			});
			function taken(event) {
				INFO = event.data;
				// console.log(INFO)
//				console.log(INFO)
                if (Send == true){
                	socket.send((input.get('m0') ? 1 : 0).toString()+(input.get('w') ? 1 : 0).toString()+(input.get('a') ? 1 : 0).toString()+(input.get('s') ? 1 : 0).toString()+(input.get('d') ? 1 : 0).toString()+(input.get('Space') ? 1 : 0).toString()+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString()+','+messageinput.value);
                    messageinput.value = ''
                    Send=false
                }else{
                	socket.send((input.get('m0') ? 1 : 0).toString()+(input.get('w') ? 1 : 0).toString()+(input.get('a') ? 1 : 0).toString()+(input.get('s') ? 1 : 0).toString()+(input.get('d') ? 1 : 0).toString()+(input.get('Space') ? 1 : 0).toString()+(mouseX).toString()+','+(mouseY).toString()+','+(window.innerWidth).toString()+','+(window.innerHeight).toString());
                }
			}
			socket.addEventListener('message', taken);
			document.getElementById('MainScreen').style.display = 'none';
		} catch (err){
			// document.getElementById('MainScreen').style.display = 'inline';
			document.getElementById('MainForm').style.display = 'none';
			document.getElementById('ErrorForm').style.display = 'inline';
		}



	}
}
let Send = false
let hp = document.getElementById('HPNum')
//let hpbar = document.getElementById('HPBar')
let gasnum = document.getElementById('GasNum');
let dirnum = document.getElementById('DirNum');
let canvas = document.getElementById('MainCanvas');
let chatview = document.getElementById('ChatView');
let map = document.getElementById('MapForm');
let nicknameinput = document.getElementById('NameField');
let messageinput = document.getElementById('MessageField');
// let playbutton = document.getElementById('PlayBTN');
// playbutton.addEventListener('onclick',startgame);
let ctx = canvas.getContext('2d');
resize();
let MSGs = [];
let input = new Map();
input.set('w',false);
input.set('a',false);
input.set('s',false);
input.set('d',false);
input.set('Space',false);
input.set('m0',false);
let mouseX = 0;
let mouseY = 0;
let INFO = '';

function resize(){
	canvas.width  = window.innerWidth;
	canvas.height = window.innerHeight;
}
function mclick() {
	input.set('m0',true)
	// console.log('0');
}
function mrelease(){
	// console.log('1');
	input.set('m0',false)
}
function keydown(event) {
	if (event.key == 'w' || event.key == 'a' || event.key == 's' || event.key == 'd' || event.key == 'Space'){
		input.set(event.key,true);
	}else if (event.key == 'm' ) {
		map.style.display = 'inline';
	}
}
function keyup(event) {
	if (event.key == 'w' || event.key == 'a' || event.key == 's' || event.key == 'd' || event.key == 'Space'){
		input.set(event.key,false);
	} else if (event.key == 'm' ) {
		map.style.display = 'none';
	} else if (event.key == 'Enter' ) {
		Send = true;
	}
}
function drawing(){
	let infarr = INFO.split('\n');
//	console.log(INFO)
	// console.log(infarr)
	let grad = null
	let cx = Number(infarr[0].split(',')[0]);
	let cy = Number(infarr[0].split(',')[1]);
	let s = Number(infarr[0].split(',')[2]);
	gasnum.innerHTML = 'GAS'+infarr[0].split(',')[3];
	dirnum.innerHTML = 'DIR-'+infarr[0].split(',')[4];
//	hpbar.value = Number(infarr[0].split(',')[6])
//	hpbar.max = Number(infarr[0].split(',')[7])
	hp.innerHTML = infarr[0].split(',')[6]+'/'+infarr[0].split(',')[7]
	// let h = 1
	let ceilswas = false;
	ctx.fillStyle = '#004f88';
	ctx.fillRect(0,0,canvas.width,canvas.height);
	// console.log(infarr);
	for (let h = 1; h < infarr.length; h++) {

		let larr =infarr[h].split(',');
		// console.log(larr);
		if (larr[0] == 'b'){
			// console.log(true);
			ctx.fillStyle = '#ffc45f';
			ctx.beginPath();
			for (let l = 1; l < larr.length; l+=2) {
				if (l == 1){
					ctx.moveTo(Number(larr[1]),Number(larr[2]));
				}else{
					ctx.lineTo(Number(larr[l]),Number(larr[l+1]));
				}
			}
			ctx.closePath();

			ctx.fill();
		}else if (larr[0] == 'z'){
			// console.log(true);
			ctx.fillStyle = '#2879ADFF';
			ctx.beginPath();
			for (let l = 1; l < larr.length; l+=2) {
				if (l == 1){
					ctx.moveTo(Number(larr[1]),Number(larr[2]));
				}else{
					ctx.lineTo(Number(larr[l]),Number(larr[l+1]));
				}
			}
			ctx.closePath();
			ctx.fill();
		}else if (larr[0] == 'g'){
			// console.log(true);
			ctx.fillStyle = '#569f4f';
			ctx.beginPath();
			for (let l = 1; l < larr.length; l+=2) {
				if (l == 1){
					ctx.moveTo(Number(larr[1]),Number(larr[2]));
				}else{
					ctx.lineTo(Number(larr[l]),Number(larr[l+1]));
				}
			}
			ctx.closePath();
			ctx.fill();
		}else 	if (larr[0] == 'f'){
			// console.log(true);
			if (ceilswas==false){
				ctx.strokeStyle='rgba(0,0,0,0.06)';
				ctx.lineWidth = 4
				for (let i = 0; i < (canvas.height - (canvas.height&320*s)/320+1); i++) {
					ctx.beginPath();
					ctx.moveTo(cx +i*320*s,cy);
					ctx.lineTo(cx +i*320*s,cy +canvas.height + 320*s);
					ctx.closePath();
					ctx.stroke();
				}
				for (let i = 0; i < (canvas.width - (canvas.width&320*s)/320*s+1); i++) {
					ctx.beginPath();
					ctx.moveTo(cx,cy +i*320*s);
					ctx.lineTo(cx +canvas.width + 320*s,cy +i*320*s);
					ctx.closePath();
					ctx.stroke();
				}
				ceilswas = true
			}
			ctx.fillStyle = '#442d15';
			// ctx.strokeStyle = '#1a1715';
			ctx.lineWidth= 4*s;
			ctx.beginPath();
			for (let l = 1; l < larr.length; l+=2) {
				if (l == 1){
					ctx.moveTo(Number(larr[1]),Number(larr[2]));
				}else{
					ctx.lineTo(Number(larr[l]),Number(larr[l+1]));
				}
			}
			ctx.lineTo(Number(larr[1]),Number(larr[2]));
			ctx.closePath();
			ctx.fill();
			// ctx.stroke(
		}else 	if (larr[0] == 'e'){
			// console.log(true);
			if (ceilswas==false){
				ctx.strokeStyle='rgba(0,0,0,0.06)';
				ctx.lineWidth = 4
				for (let i = 0; i < (canvas.height - (canvas.height&320*s)/320+1); i++) {
					ctx.beginPath();
					ctx.moveTo(cx +i*320*s,cy);
					ctx.lineTo(cx +i*320*s,cy +canvas.height + 320*s);
					ctx.closePath();
					ctx.stroke();
				}
				for (let i = 0; i < (canvas.width - (canvas.width&320*s)/320*s+1); i++) {
					ctx.beginPath();
					ctx.moveTo(cx,cy +i*320*s);
					ctx.lineTo(cx +canvas.width + 320*s,cy +i*320*s);
					ctx.closePath();
					ctx.stroke();
				}
				ceilswas = true
			}
			ctx.fillStyle = '#2d2d25';
			// ctx.strokeStyle = '#1a1715';
			ctx.lineWidth= 4*s;
			ctx.beginPath();
			for (let l = 1; l < larr.length; l+=2) {
				if (l == 1){
					ctx.moveTo(Number(larr[1]),Number(larr[2]));
				}else{
					ctx.lineTo(Number(larr[l]),Number(larr[l+1]));
				}
			}
			ctx.lineTo(Number(larr[1]),Number(larr[2]));
			ctx.closePath();
			ctx.fill();
			// ctx.stroke();
		}else 	if (larr[0] == 'o'){
			// console.log(true);
			ctx.fillStyle = '#6c6c69';
			// ctx.strokeStyle = '#3b3b39';
			ctx.lineWidth= 4*s;
			ctx.beginPath()
			ctx.arc(Number(larr[1]),Number(larr[2]),Number(larr[3]),0,Math.PI*2);
			ctx.closePath()
			ctx.fill();
			// ctx.stroke();
		}else 	if (larr[0] == '|'){
			// console.log(true);
			ctx.strokeStyle = '#9b9b93';
			// ctx.strokeStyle = '#3b3b39';
			ctx.lineWidth= Number(larr[5])*s;
			ctx.beginPath()
			ctx.moveTo(Number(larr[1]),Number(larr[2]));
			ctx.lineTo(Number(larr[3]),Number(larr[4]))
			// ctx.arc(Number(larr[1]),Number(larr[2]),Number(larr[3]),0,Math.PI*2);
			ctx.closePath()
			// ctx.fill();
			ctx.stroke();
		}else 	if (larr[0] == 'k'){
//			console.log(larr[1] + ' destroyed '+ larr[2])
            if (MSGs.indexOf(Number(larr[3]))==-1){
                let div = document.createElement('div');
                div.className = "MSGk";
                div.innerHTML = "<b>"+larr[1]+"</b> destroyed <b>"+larr[2]+"</b>";
                chatview.append(div);
                MSGs.push(Number(larr[3]))
            }
		}else 	if (larr[0] == 'm'){
		    console.log('!')
//			console.log(larr[1] + ' destroyed '+ larr[2])
            if (MSGs.indexOf(Number(larr[3]))==-1){
                let div = document.createElement('div');
                div.className = "MSG";
                div.innerHTML = "<b>"+larr[1]+"</b> > "+larr[2];
                chatview.append(div);
                MSGs.push(Number(larr[3]))
            }
		}else 	if (larr[0] == 'n'){
			// console.log(true);
			ctx.fillStyle = '#ff0000';
			ctx.strokeStyle = '#000'
			ctx.lineWidth = 1
			ctx.textAlign = 'center'
			ctx.font = "20px Supermercado One";
			ctx.fillText(larr[3], Number(larr[1]), Number(larr[2])-50);
			ctx.fillStyle = '#00ff00';
			ctx.fillStyle = 'rgb('+255*(1-Number(larr[4]))+','+255*Number(larr[4])+',0)'
			ctx.fillRect(Number(larr[1])-25,Number(larr[2])-45,50*Number(larr[4]),10) //50*Number(larr[4])
			ctx.strokeRect(Number(larr[1])-25,Number(larr[2])-45,50,10)
			// ctx.strokeStyle = '#9b9b93';
			// ctx.strokeStyle = '#3b3b39';
			// ctx.strokeWidth= Number(larr[5])*s;
			// ctx.beginPath()
			// ctx.moveTo(Number(larr[1]),Number(larr[2]));
			// ctx.lineTo(Number(larr[3]),Number(larr[4]))
			// ctx.arc(Number(larr[1]),Number(larr[2]),Number(larr[3]),0,Math.PI*2);
			// ctx.closePath()
			// ctx.fill();
			// ctx.stroke();
		}else 	if (larr[0] == '>'){
		// console.log(true);
		// ctx.strokeStyle = '#9b9b93';
		// ctx.strokeStyle = '#3b3b39';
			grad=ctx.createLinearGradient(Number(larr[1]),Number(larr[2]),Number(larr[3]),Number(larr[4]));
			grad.addColorStop(0,"#FFFFFF00");
			grad.addColorStop(1,"#FFFF0088");
			ctx.strokeStyle = grad
			ctx.lineWidth= Number(larr[5])*s;
			ctx.beginPath()
			ctx.moveTo(Number(larr[1]),Number(larr[2]));
			ctx.lineTo(Number(larr[3]),Number(larr[4]))
			// ctx.arc(Number(larr[1]),Number(larr[2]),Number(larr[3]),0,Math.PI*2);
			ctx.closePath()
			// ctx.fill();
			ctx.stroke();
		}
	}
	// console.log('2')
}

//fillText("Hello World", 10, 50);
let loop = setInterval(drawing,20);
function mousepos(e){
	mouseX = e.pageX;
	mouseY = e.pageY;
}
//messageinput.addEventListener('keyup',)
canvas.addEventListener("mousedown", mclick, false);
document.addEventListener("mouseup", mrelease, false);
document.addEventListener('mousemove', mousepos, false);
document.addEventListener('resize', resize , false);
document.addEventListener('keydown',keydown);
document.addEventListener('keyup', keyup);
