var crowbar = {
        npcBlock: function(npcList,system){
			fillObjects = $('div.npcBlock');
			$.each(fillObjects, function(){
				content = $(this).attr('content');
				console.log(content);
				character = npcList[content];
				crowbar.calculateJson(character);
				if(system=="GURPS"){
					if(character!=undefined){
						fill = ""
						fill += '<div class="cardborder">';
						fill += '<table style="width:100%"><tr><th colspan="8">';
						fill += character.name;
						fill += '</th></tr><tr><td style="border-right:1px solid">';
						fill += 'ST</td><td style="border-right:1px solid">'+ character.attributes.stValue+'</td><td style="border-right:1px solid">DX</td><td style="border-right:1px solid">'+ character.attributes.dxValue+'</td><td style="border-right:1px solid">IQ</td><td style="border-right:1px solid">'+ character.attributes.iqValue+'</td><td style="border-right:1px solid">HT</td><td>'+character.attributes.htValue;
						fill += '</td></tr><tr><td style="border: 1px solid; border-left:0px none">';
						fill += 'HP</td><td style="border: 1px solid;">'+ character.attributes.hpValue+'</td><td style="border: 1px solid;">Will</td><td style="border: 1px solid;">'+ character.attributes.willValue+'</td><td style="border: 1px solid;">Per</td><td style="border: 1px solid;">'+ character.attributes.perValue+'</td><td style="border: 1px solid;">FP</td><td style="border: 1px solid; border-right:0px none">'+character.attributes.fpValue;
						fill += '</td></tr><tr><td style="border: 1px solid; border-left:0px none">';
						fill += 'BS</td><td style="border: 1px solid;">'+ character.attributes.bsValue+'</td><td style="border: 1px solid;">BM</td><td style="border: 1px solid;">'+ character.attributes.bmValue+'</td><td style="border: 1px solid;">Dodge</td><td style="border: 1px solid;">'+ character.attributes.dodgeValue+'</td><td style="border: 1px solid;">SM</td><td style="border: 1px solid; border-right:0px none">'+character.attributes.smValue;
						fill += '</tr><tr><td colspan="8" style="border-bottom:1px solid black"> <b>Traits:</b> '
						$.each(character.advantages,function(i,o){
							fill += '<a title="hello">'+o.name+'</a>; ';
						});
						fill+= '<hr>';
						$.each(character.disadvantages,function(i,o){
							fill += '<a title="hello">'+o.name+'</a>; ';
						});
						fill += '</tr><tr><td colspan="8"> <b>Skills:</b> '
						$.each(character.skills,function(i,o){
							fill += '<a title="hello">'+o.name+'</a>; ';
						});
						fill += '</td></tr></table>';
						fill += '</div>';
						$(this).html(fill);
					}
				}
			});
		},
		checkValue: function(value) {
			if(value==undefined){
				value=0;
			}
			return value;
		},
		calculateJson: function(character) {
			// console.log("CALCULATE!")
			console.log(character);
			character.attributes.smValue =		crowbar.checkValue(character.attributes.smValue);
			character.attributes.stCost =		Math.ceil(((crowbar.checkValue(character.attributes.stValue))-10)*10*(1-(character.attributes.smValue*.1)));
			character.attributes.dxCost =		((crowbar.checkValue(character.attributes.dxValue))-10)*20;
			character.attributes.iqCost =		((crowbar.checkValue(character.attributes.iqValue))-10)*20;
			character.attributes.htCost =		((crowbar.checkValue(character.attributes.htValue))-10)*10;
			character.attributes.hpValue =		parseInt(crowbar.checkValue(character.attributes.hpOffValue))+parseInt(crowbar.checkValue(character.attributes.stValue));
			character.attributes.perValue =		parseInt(crowbar.checkValue(character.attributes.perOffValue))+parseInt(crowbar.checkValue(character.attributes.iqValue));
			character.attributes.willValue =	parseInt(crowbar.checkValue(character.attributes.willOffValue))+parseInt(crowbar.checkValue(character.attributes.iqValue));
			character.attributes.fpValue =		parseInt(crowbar.checkValue(character.attributes.fpOffValue))+parseInt(crowbar.checkValue(character.attributes.htValue));
			character.attributes.bsValue =		parseFloat(crowbar.checkValue(character.attributes.bsOffValue))+((parseInt(character.attributes.dxValue)+parseInt(character.attributes.htValue))/4);
			character.attributes.bmValue =		parseFloat(crowbar.checkValue(character.attributes.bmOffValue))+Math.floor(((parseInt(character.attributes.dxValue)+parseInt(character.attributes.htValue))/4));
			// character.attributes.blValue =	roundToOne(((character.attributes.stValue*character.attributes.stValue)/5)*0.453592);
			character.attributes.hpCost =		crowbar.checkValue(character.attributes.hpOffValue)*2;
			character.attributes.perCost =		crowbar.checkValue(character.attributes.perOffValue)*5;
			character.attributes.willCost =		crowbar.checkValue(character.attributes.willOffValue)*5;
			character.attributes.fpCost =		crowbar.checkValue(character.attributes.fpOffValue)*3;
			character.attributes.bsCost =		crowbar.checkValue(character.attributes.bsOffValue)*20;
			character.attributes.bmCost =		crowbar.checkValue(character.attributes.bmOffValue)*5;
			stLookup =		"st"+character.attributes.stValue;
			// character.attributes.thrValue =	strChart[stLookup].thr;
			// character.attributes.swiValue =	strChart[stLookup].swi;
			character.attributes.dodgeValue =	character.attributes.bmValue+3;
			character.attributes.bl0 =			Math.ceil(character.attributes.blValue);
			character.attributes.bl1 =			Math.ceil(character.attributes.blValue*2);
			character.attributes.bl2 =			Math.ceil(character.attributes.blValue*3);
			character.attributes.bl3 =			Math.ceil(character.attributes.blValue*6);
			character.attributes.bl4 =			Math.ceil(character.attributes.blValue*10);
			character.attributes.bm0 =			Math.floor(character.attributes.bmValue*1);
			character.attributes.bm1 =			Math.floor(character.attributes.bmValue*0.8);
			character.attributes.bm2 =			Math.floor(character.attributes.bmValue*0.6);
			character.attributes.bm3 =			Math.floor(character.attributes.bmValue*0.4);
			character.attributes.bm4 =			Math.floor(character.attributes.bmValue*0.2);
			character.attributes.do0 =			character.attributes.dodgeValue-0;
			character.attributes.do1 =			character.attributes.dodgeValue-1;
			character.attributes.do2 =			character.attributes.dodgeValue-2;
			character.attributes.do3 =			character.attributes.dodgeValue-3;
			character.attributes.do4 =			character.attributes.dodgeValue-4;
			// $.each(character.attributes.lan, function(i,k){
			// 	if (i==0){
			// 	var lanReplace = {"Native":0,"Accented":-1, "Broken":-2, "None":-3};
			// 		if(k.Spoken != undefined){
			// 		var lanS = k.Spoken;
			// 		var lanSCost = lanS.replace(/Native|Accented|Broken|None/gi, function(matched){return lanReplace[matched];});
			// 	}
			// 	if(k.Wri != undefined){
			// 		var lanW = k.Wri;
			// 		var lanWCost = lanW.replace(/Native|Accented|Broken|None/gi, function(matched){return lanReplace[matched];});
			// 	}
			// 	}else{
			// 	var lanReplace = {"Native":3,"Accented":2, "Broken":1, "None":0};
			// 		if(k.Spoken != undefined){
			// 		var lanS = k.Spoken;
			// 		var lanSCost = lanS.replace(/Native|Accented|Broken|None/gi, function(matched){return lanReplace[matched];});
			// 	}
			// 	if(k.Wri != undefined){
			// 		var lanW = k.Wri;
			// 		var lanWCost = lanW.replace(/Native|Accented|Broken|None/gi, function(matched){return lanReplace[matched];});
			// 	}	
			// 	}
			// 		k.Cost = parseInt(lanSCost)+parseInt(lanWCost);
			// });
			// $.each(character.attributes.clFam, function(i,k){
			// 	if (i==0){
			// 	var clCost = 0;
			// 	}else{
			// 	var clCost = 1;
			// 	}
			// 	k.Cost = clCost;
			// });
			
			// $.each(character.attributes.rep, function(i,k){
			// 	var repReplace = {"+4":20,"+3":15, "+2":10, "+1":5, "+0":-0, "-1":-5, "-2":-10, "-3":-15, "-4":-20};
			// 	var repReplace2 = {"Almost Everyone":1,"Excluding One Large Class":0.67,"Large Class":0.5,"Small Class":0.33};
			// 	var repReplace3 = {"<18":1,"<10":0.5,"<7":0.33};
			// 		console.log(k.Value);
			// 		if(k.Name != undefined&&k.Name != ""){
			// 		var repV = k.Value;
			// 		var repVCost = repV.replace(/\+4|\+3|\+2|\+1|\+0|\-1|\-2|\-3|\-4/gi, function(matched){return repReplace[matched];});
			// 		var repVMod1 = (k.Affected).replace(/Almost Everyone|Excluding One Large Class|Large Class|Small Class/gi, function(matched){return repReplace2[matched];});
			// 		var repVMod2 = (k.Frequency).replace(/<18|<10|<7/gi, function(matched){return repReplace3[matched];});
			// 		k.Display = k.Name +" "+k.Value+" ("+k.DAffected +", "+ k.Frequency+")";
			// 	}else{
			// 		var repVCost = 0;
			// 		var repVMod1 = 0;
			// 		var repVMod2 = 0;
			// 		k.Display = "";
			// 	}
			// 	Decimal.config({ rounding: 1 })
			// 	k.Cost = Decimal(parseInt(repVCost)*repVMod1*repVMod2).round();
			// });

			// var costsTable = [];
			
			// var aJq = jsonQ(a),
			// jqCosts = aJq.find('Cost');
			// var costsIndex = 0;
			// var keyNames = Object.keys(a);
			// $.each(keyNames, function(){
			// 	var keyName = String(this);
			// 	if (keyName.indexOf("Cost") > -1){
			// 		costsTable[costsIndex] = a[keyName];
			// 		costsIndex += 1;
			// 		}
			// });
			// console.log(costsTable);
			// console.log(jqCosts.value())
			// var allCosts = costsTable.concat(jqCosts.value());
			// // console.log(allCosts);
			// var costTotal = 0;
			// $.each(allCosts,function(){
			// 	costTotal += this;
			// });
			// // console.log(costTotal);
			// character.attributes.ptValue = costTotal;
			// character.attributes.uptValue = character.attributes.ptLimit-costTotal;

			// $.each(a, returnAttr);
		},
		generatePool: function(){
			$.each(characterList,function(i,object){
			pC += '<div id="'+i+'"class="character">';
			pC += '<a class="selector" status="'+object.status+'">'+object.name+'</a>';
			pC += '<span class="right">';
			// pC += '<img id="family" src="ico/shield.svg" class="ico" style="display:none;" width="20" height="20">';
			// pC += '<img id="ally" src="ico/shield-2.svg" class="ico" style="display:none;" width="20" height="20">';
			// pC += '<img id="enemy" src="ico/war.svg" class="ico" style="display:none;" width="20" height="20">';
			// pC += '<img id="uboss" src="ico/fashion.svg" class="ico" style="display:none;" width="20" height="20">';
			// pC += '<img id="boss" src="ico/up-chevron.svg" class="ico" style="display:none;" width="20" height="20">';
			// pC += '<img id="minion" src="ico/down-chevron.svg" class="ico" style="display:none;" width="20" height="20">';
			pC += '</span><br>';
			pC += '<a class="selSub">'+object.race+' - </a>';
			pC += '<a class="selSub">'+object.occupation+'</a>';
			// pC += '<span class="image"> <img src="http://chopperhandbook.com/images/Facebook-Icon-small.jpg" width="20" height="20"></div>';
			// pC += '</span>';
			pC += '</div>';
			});
			$('div.pool').html(pC);
		}


}
