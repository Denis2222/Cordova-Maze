function Dungeon () {
    this.width = 50;
	this.height = 50;
	this.ccX = 20;
	this.ccY = 20;
	this.map = [];
	this.nb_non_visite = 0;
	this.lastDirection = 1;

    this.init = function(newWidth,newHeight) {
		this.width=newWidth;
		this.height=newHeight;
		for(x=0;x<this.width;x++){
			this.map[x] = [];
		  for(y=0;y<this.height;y++){
			  this.map[x][y]= [];
			  this.map[x][y][1]=0; // 0 c'est � dire une porte(mur)
			  this.map[x][y][2]=0;
			  this.map[x][y][3]=0;
			  this.map[x][y][4]=0;
			  this.map[x][y]['v']=1; // 1: non visite, 2:visite, 3: visite plus de solution
			  this.map[x][y]['c']=0;
			  this.map[x][y]['s']=0;
		  }
		}
		
		this.nb_non_visite = this.height*this.width;
		console.log('init: non visite:'+this.nb_non_visite);
		
    };
	
	this.generate = function(ccX,ccY){
		this.ccX = ccX;
		this.ccY = ccY;
		direction = 0;

	};
	
	
	
	
	
	this.breakWall = function(direction){
		switch(direction) {
		
			case 1 :
						this.map[this.ccX][this.ccY][1]=1;//breakWall ccY-1
						this.ccY=this.ccY-1;
						this.map[this.ccX][this.ccY][2]=1;
						break;
			case 2 :
						this.map[this.ccX][this.ccY][2]=1;//breakWall ccY+1
						this.ccY=this.ccY+1;
						this.map[this.ccX][this.ccY][1]=1;
						break;
			case 3 :
						this.map[this.ccX][this.ccY][3]=1;//breakWall ccX+1 
						this.ccX=this.ccX+1;
						this.map[this.ccX][this.ccY][4]=1;
						break;
			case 4 :
						this.map[this.ccX][this.ccY][4]=1;//breakWall ccX-1 
						this.ccX=this.ccX-1;
						this.map[this.ccX][this.ccY][3]=1;
						break;
		}
	};
	
	this.markView = function (cX,cY){
		this.map[cX][cY]['v']++;
		this.nb_non_visite--;
	};
	
	this.seekDirection = function (prevDir){
		var array = [];
		array[0]=1;
		array[1]=2;
		array[2]=3;
		array[3]=4;
		array = this.shuffle(array);

		if(prevDir != 0) {
			piece=this.mt_rand(0,100);
			if(piece > RANDOMNESS) {
			   // on conserve la direction
			   pos_cour=0;
			   tmp=array[pos_cour];
			   array[pos_cour]=prevDir;
			   fini=0;
			   pos_cour++;
			   while(fini==0 && pos_cour<=3) {
				 if(array[pos_cour]==prevDir) {
					fini=1;
					array[pos_cour]=tmp;
				 }
				 pos_cour++;
			   }
			}
		}
		
		var resultat=0;
		var nb_dir_teste = 1;
		var trouve =0;
		
		
		while(trouve==0 && nb_dir_teste <= 4) {
		  cond1=0;
		  cond2=0;
		  switch(array[nb_dir_teste-1]) {
				case 1:
					if(this.checkCase(this.ccX,this.ccY-1)){
						cond1=1; 
						if(this.getMap(this.ccX,this.ccY-1)['v']==1){cond2=1;};
					}
					break;
				
				case 2:
					if (this.checkCase(this.ccX,this.ccY+1)){
						cond1=1; 
						if(this.getMap(this.ccX,this.ccY+1)['v']==1){cond2=1;};
					}
					break;
			
				case 3:
					if(this.checkCase(this.ccX+1,this.ccY) ) {
						cond1=1; 
						if(this.getMap(this.ccX+1,this.ccY)['v']==1){cond2=1;};
					}
					break;
				case 4:
					if(this.checkCase(this.ccX-1,this.ccY)){
						cond1=1; 
						if(this.getMap(this.ccX-1,this.ccY)['v']==1){cond2=1};
					}
					break;
		  }

		  if(cond1==1 && cond2==1) {
			trouve=1;
			resultat=array[nb_dir_teste-1];
		  }
		  nb_dir_teste++;
		}
		return(resultat);	
	};
	
	this.checkCase = function(x,y){
		if(typeof this.map[x] != 'undefined'){
		if(typeof this.map[x][y] != 'undefined'){
			return 1;
		}}
		
		return 0;
	}
	
	this.shuffle = function(o){
		for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
		return o;
	};
	
	this.getMap = function(x,y){
		if(typeof this.map[x] != 'undefined'){
			if(typeof this.map[x][y] != 'undefined'){
				return this.map[x][y];
			}
		}
		
		return 0;
	}
	
	this.mt_rand = function(min, max) {
	  var argc = arguments.length;
	  if (argc === 0) {
		min = 0;
		max = 2147483647;
	  }
	  else if (argc === 1) {
		throw new Error('Warning: mt_rand() expects exactly 2 parameters, 1 given');
	  }
	  else {
		min = parseInt(min, 10);
		max = parseInt(max, 10);
	  }
	  return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	this.view = function(imgDir,divID) { // Affichage classique 
        
	if(imgDir==""){
		imgDir = './img/';
	}
	
		if(document.getElementById("ID0_0")){
			var container = $('#'+divID);
			for(y=0;y<this.height;y++){
				for(x=0;x<this.width;x++){
					var C = this.getMap(x,y);
					if($("#ID"+x+"_"+y).attr('src') != imgDir+'N'+C[1]+'S'+C[2]+'E'+C[3]+'O'+C[4]+'.jpg'){
						$("#ID"+x+"_"+y).attr('src',   imgDir+'N'+C[1]+'S'+C[2]+'E'+C[3]+'O'+C[4]+'.jpg');
						
						if(this.ccX == x && this.ccY == y){
							//$("#ID"+x+"_"+y).css('border','1px solid red');
						}
					}
				}
			}
		}else{
			
			if(document.getElementById(divID)){
				console.log('#'+divID+' Here ! ');
			}else{
				console.log(divID+' not here ');
				$('body').append($('<div>',{'id':divID}));
			};
			
			$('#'+divID).css('width',(20*SIZE_X)+'px');
		
			
			for(y=0;y<this.height;y++){
				for(x=0;x<this.width;x++){
				var C = this.getMap(x,y);
					if(this.map[x][y]['s']==0) {
						$('#'+divID).append($('<img/>',{'style':'float:left;','src': imgDir+'N'+C[1]+'S'+C[2]+'E'+C[3]+'O'+C[4]+'.jpg','id':'ID'+x+'_'+y}));
						//$("#ID"+x+"_"+y).css('border','1px solid blue')
					}
				}
			}
    	}
	}
		
	this.onGenerateEvent = function(){
		//return [this.ccX,this.ccY];
	}

	this.generateEvent = function(direction){
	
			if(direction == 0){
				direction = this.lastDirection;
			}
		if(this.nb_non_visite>0){
			direction = this.seekDirection(direction);//choisir_direction(direction)
			if(direction == 0) {
		
				this.map[this.ccX][this.ccY]['v']=3;

				// Aucune direction valide
		   
				trouve=0;
				testX=0;
				testY=0;
				while(trouve==0) {

					testX = this.mt_rand(0,this.width-1);
					testY = this.mt_rand(0,this.height-1);

					if(this.map[testX][testY]['v']==2){
						trouve=1;
					};

				}

				this.ccX=testX;
				this.ccY=testY;
				
				
				
			}else{

				this.breakWall(direction);//casser_mur(direction)
				this.lastDirection = direction;
				if(this.map[this.ccX][this.ccY]['v']==1) {
					this.markView(this.ccX,this.ccY);// marquer_visite(ccX,ccY)
				}else if(this.map[this.ccX][this.ccY]['v']==2){
					this.map[this.ccX][this.ccY]['v']=3;
				}
			
			}
			//this.view();
			
			
		}else{
			console.log('Stop');
			return 1;
		}
	}
	
	this.openDoor = function(x,y) { // Renvoi le nombre de porte ouverte d'une case
		nbOpen = 0;
		WallData = this.getMap(x,y);
		if(WallData!=0){
			for(x=1;x<5;x++){ if(WallData[x]==1) nbOpen++; }
		}
		
		return nbOpen;
	}
	
	this.fermerTout = function (x,y) {  // Fermer toute les portes d'une case
	
		if(this.getMap(x,y)!=0){
			console.log('sparf:'+x+' '+y);
		
			this.map[x][y]['c']=0;
			this.map[x][y][1]=0;
			
			if(this.getMap(x,y-1)!=0){this.map[x][y-1][2]=0;};
			
			this.map[x][y][2]=0;
			if(this.getMap(x,y+1)!=0){this.map[x][y+1][1]=0;};
			
			this.map[x][y][3]=0;
			if(this.getMap(x+1,y)!=0){this.map[x+1][y][4]=0;};
			
			this.map[x][y][4]=0;
			if(this.getMap(x-1,y)!=0){this.map[x-1][y][3]=0;};
		}
	}
	
	this.sparsify = function() {   // Enlever des couloir 
		console.log('sparsify');
		nb_sparse=0;
		while(nb_sparse< SPARSENESS) {
			for(x=0;x<this.width;x++) {
				for(y=0;y<=this.height-1;y++) {
				   res=this.openDoor(x,y);
				   if(res==1) this.map[x][y]['c']=1; else this.map[x][y]['c']=0;
				}
			}
			for(x=0;x<=this.width-1;x++) {
				for(y=0;y<=this.height-1;y++) {
				   if(this.map[x][y]['c']==1) this.fermerTout(x,y);
				}
			}

			//this.afficher();
			nb_sparse++;
		}


	}
	
}