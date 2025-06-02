Game.registerMod("GC Manipulator", {
	init: function () {
		
		let BSmenu = document.createElement('div');
        BSmenu.id = 'BSmenu';
        BSmenu.className = 'framed prompt offScreen';

        document.getElementById('game').insertBefore(BSmenu, versionNumber);
		
		var css=document.createElement('style');
	    css.type='text/css';
	    css.innerHTML='#BSmenu{position:absolute;left:70px;bottom:55px;margin:8px;font-size:22px;z-index:1000;}'+
		'.ascending #sectionMiddle,.ascending #sectionRight,.ascending #sectionLeft,.ascending .separatorLeft,.ascending #BSmenu,.ascending .separatorRight,.reincarnating  #backgroundCanvas{display:none;opacity:0;}';
	    document.head.appendChild(css);

		Game.GCOutcome = "";
		Game.Backfire = "";
		Game.luckyDay = "";
		Game.prefs.DEoRL = 0;

		eval('Game.UpdateMenu=' + Game.UpdateMenu.toString().replace(`game will reload")+')</label><br>'+`, `game will reload")+')</label><br>'+
        Game.WritePrefButton('DEoRL','DEoRLButton',loc("Always DEoRL")+ON,loc("Always DEoRL")+OFF)+'<label>('+loc("all shimmers are always doubled (requires Distilled essence of redoubled luck upgrade).")+')</label><br>'+`));

		window.addEventListener('keydown', function (e) {
			if (e.keyCode == 49) { Game.GCOutcome = "Frenzy"; Game.Popup('Frenzy has been choosen.'); };
			if (e.keyCode == 50) { Game.GCOutcome = "ClickFrenzy"; Game.Popup('Click frenzy has been choosen.'); };
			if (e.keyCode == 51) { Game.GCOutcome = "Storm"; Game.Popup('Cookie storm has been choosen.'); };
			if (e.keyCode == 52) { Game.GCOutcome = "Sweet"; Game.Popup('Sweet has been choosen.'); };
			if (e.keyCode == 53) { Game.GCOutcome = "DragonHarvest"; Game.Popup('Dragon Harvest has been choosen.'); };
			if (e.keyCode == 54) { Game.GCOutcome = "Dragonflight"; Game.Popup('Dragonflight has been choosen.'); };
			if (e.keyCode == 55) { Game.GCOutcome = "BuildingSpecial"; Game.Popup('Building special has been choosen.'); };
			if (e.keyCode == 56) { Game.GCOutcome = "ElderFrenzy"; Game.Popup('Elder frenzy has been choosen.'); };
			if (e.keyCode == 67) { Game.GCOutcome = "Chain"; Game.Popup('Cookie chain has been choosen.'); };
			if (e.keyCode == 57) { Game.GCOutcome = ""; Game.Popup('Buff manipulator disabled.'); };
			if (e.keyCode == 66) { Game.Backfire = "True"; Game.Popup('Backfire mode enabled.'); };
			if (e.keyCode == 83) { Game.Backfire = "False"; Game.Popup('Success mode enabled.'); };
			if (e.keyCode == 82) { Game.Backfire = ""; Game.Popup('Spell modifier disabled.'); };

			if (e.keyCode == 79) { for (let i in Game.shimmers) { Game.shimmers[i].pop(); } };
		});
	
		var grimoireUpdated = false;

		Game.registerHook('check', () => {
			if (Game.Objects['Wizard tower'].minigameLoaded && !grimoireUpdated) {

				eval("Game.Objects['Wizard tower'].minigame.spells['hand of fate'].win=" + Game.Objects['Wizard tower'].minigame.spells['hand of fate'].win.toString().replace('newShimmer.force=choose(choices);', "if (Game.GCOutcome==`ClickFrenzy`) {choose(`click frenzy`);} else if (Game.GCOutcome==`Frenzy`) {choose(`frenzy`);} else if (Game.GCOutcome==`building special`) {choose(`building special`);} else if (Game.GCOutcome==`Sweet`) {choose(`free sugar lump`);} else newShimmer.force=choose(choices);"));
				eval("Game.Objects['Wizard tower'].minigame.spells['hand of fate'].fail=" + Game.Objects['Wizard tower'].minigame.spells['hand of fate'].fail.toString().replace('newShimmer.force=choose(choices);', "if (Game.GCOutcome==`ElderFrenzy`) {choose(`blood frenzy`);}  else newShimmer.force=choose(choices);  console.log(`hmmm`);"));
				eval("Game.Objects['Wizard tower'].minigame.getFailChance=" + Game.Objects['Wizard tower'].minigame.getFailChance.toString().replace('if (spell.failFunc) failChance=spell.failFunc(failChance);', "if (spell.failFunc) failChance=spell.failFunc(failChance); if (Game.Backfire==`True`) failChance=10000000; if (Game.Backfire==`False`) failChance*=0.001;"));

				grimoireUpdated = true;
			}
		});
		
		Game.selectedBS = 0;
		// good name
        Game.BSes = {
			0:{pic:[0,14],id:0},
			1:{pic:[1,14],id:1},
			2:{pic:[2,14],id:2},
			3:{pic:[3,14],id:3},
			4:{pic:[4,14],id:4},
			5:{pic:[15,14],id:5},
			6:{pic:[16,14],id:6},
			7:{pic:[17,14],id:7},
			8:{pic:[5,14],id:8},
			9:{pic:[6,14],id:9},
			10:{pic:[7,14],id:10},
			11:{pic:[8,14],id:11},
			12:{pic:[13,14],id:12},
			13:{pic:[14,14],id:13},
			14:{pic:[19,14],id:14},
			15:{pic:[20,14],id:15},
			16:{pic:[32,14],id:16},
			17:{pic:[33,14],id:17},
			18:{pic:[34,14],id:18},
			19:{pic:[35,14],id:19},
		};
		
		Game.toggleBSMenu = function () {
            if (l('bsContainer').style.display == 'none') {
            	l('bsContainer').style.display = 'block'
 			} else {
			    l('bsContainer').style.display = 'none'
			}	
		}
		
		Game.test = '<div id="bsContainer" style="width:320px; height:200px; overflow-x:hidden; overflow-y:scroll;">';
		for (var i in Game.BSes) {
			var icon = Game.BSes[i].pic;
			Game.test+='<div class="crate enabled" style="opacity:1;float:none;display:inline-block;'+writeIcon(icon)+'" '+Game.clickStr+'="PlaySound(\'snd/tick.mp3\'); Game.selectedBS = Game.BSes['+i+'].id"'+
			'></div>';		
		}
		Game.test += '</div>';
		Game.test += '<a id="toggle" class="option" onclick="Game.toggleBSMenu()">toggle</a>';
		
		l('BSmenu').innerHTML = l('BSmenu').innerHTML + Game.test;
		
		eval('Game.shimmerTypes["golden"].popFunc=' + Game.shimmerTypes['golden'].popFunc.toString().replace(`if (Game.Objects[i].amount>=10) list.push(Game.Objects[i].id);`, `if (Game.Objects[i].amount>=10) list.push(Game.selectedBS);`));

		Game.shimmerTypes["golden"].getMaxTime = Game.shimmerTypes["golden"].getMinTime;
		Game.shimmerTypes["reindeer"].getMaxTime = Game.shimmerTypes["reindeer"].getMinTime;

		eval('Game.getNewTicker=' + Game.getNewTicker.toString().replace("if (!manual && Game.T>Game.fps*10 && Game.Has('Fortune cookies') && Math.random()<(Game.HasAchiev('O Fortuna')?0.04:0.02))", "if (!manual && Game.T>Game.fps*10 && Game.Has('Fortune cookies') && Math.random()<(Game.HasAchiev('O Fortuna')?1.04:1.02))"));

		for (let i in Game.Objects) {
			eval('Game.Objects["' + i + '"].sell=' + Game.Objects[i].sell.toString().replace(`*0.1)`, "*1.1)"));
		}
		
		eval('Game.shimmerTypes["golden"].popFunc=' + Game.shimmerTypes['golden'].popFunc.toString().replace("if (Math.random()<0.01 || nextMoni>=maxPayout)", "if (nextMoni>=maxPayout)"));
		eval('Game.shimmerTypes["golden"].popFunc=' + Game.shimmerTypes['golden'].popFunc.toString().replace("var choice=choose(list);", "if (Game.GCOutcome==`ClickFrenzy`) {var choice=`click frenzy`;} else if (Game.GCOutcome==`Frenzy`) {var choice=`frenzy`;} else if (Game.GCOutcome==`Storm`) {var choice=`cookie storm`;} else if (Game.GCOutcome==`Sweet`) {var choice=`free sugar lump`;} else if (Game.GCOutcome==`DragonHarvest`) {var choice=`dragon harvest`;} else if (Game.GCOutcome==`Dragonflight`) {var choice=`dragonflight`;} else if (Game.GCOutcome==`BuildingSpecial`) {var choice=`building special`;} else if (Game.GCOutcome==`ElderFrenzy`) {var choice=`blood frenzy`;} else if (Game.GCOutcome==`Chain`) {var choice=`chain cookie`;} else var choice=choose(list);"));
		eval('Game.updateShimmers=' + Game.updateShimmers.toString().replace("if (Game.Has('Distilled essence of redoubled luck') && Math.random()<0.01) var newShimmer=new Game.shimmer(i);", "if (Game.Has('Distilled essence of redoubled luck') && Game.prefs.DEoRL) var newShimmer=new Game.shimmer(i);"));
		eval('Game.updateShimmers=' + Game.updateShimmers.toString().replace("newShimmer.spawnLead=1;", "newShimmer.spawnLead=1; if (i == 'golden') newShimmer.l.style.background = 'url(https://omaruvu.github.io/GC-Manipulator/SpawnleadGoldCookie.png)';"));

		eval('Game.dropRateMult=' + Game.dropRateMult.toString().replace("rate*=5;", "rate*=5; rate*=1e40;"));//all season drops are really common

		/*l('httpsSwitch').insertAdjacentHTML('afterend', '<div class="title" style="font-size:25px;" id="PlsDontRemoveThis"></div>');

		Game.registerHook('draw', () => {
			l('PlsDontRemoveThis').innerHTML = '<div class style="display:none;"></div>' + '<b>' + '</b>' + ("GC Manipulator is on");
		});*/
	},
	save: function () {
	},
	load: function (str) {
	}
});
