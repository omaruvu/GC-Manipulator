Game.registerMod("GC Manipulator",{ 
	init:function(){

		Game.GCOutcome="";
		Game.Backfire="";
		Game.luckyDay="";
		Game.prefs.DEoRL=0;

		eval('Game.UpdateMenu='+Game.UpdateMenu.toString().replace(`game will reload")+')</label><br>'+`,`game will reload")+')</label><br>'+
        Game.WritePrefButton('DEoRL','DEoRLButton',loc("Always DEoRL")+ON,loc("Always DEoRL")+OFF)+'<label>('+loc("all shimmers are always doubled (requires Distilled essence of redoubled luck upgrade).")+')</label><br>'+`));

		Game.EnableOutcome=function(){
			if (Game.keys[49]) {Game.GCOutcome="Frenzy"; Game.Popup('Frenzy has been choosen.');};
			if (Game.keys[50]) {Game.GCOutcome="ClickFrenzy"; Game.Popup('Click frenzy has been choosen.');};
			if (Game.keys[51]) {Game.GCOutcome="Storm"; Game.Popup('Cookie storm has been choosen.');};
			if (Game.keys[52]) {Game.GCOutcome="Sweet"; Game.Popup('Sweet has been choosen.');};
			if (Game.keys[53]) {Game.GCOutcome="DragonHarvest"; Game.Popup('Dragon Harvest has been choosen.');};
			if (Game.keys[54]) {Game.GCOutcome="Dragonflight"; Game.Popup('Dragonflight has been choosen.');};
			if (Game.keys[55]) {Game.GCOutcome="BuildingSpecial"; Game.Popup('Building special has been choosen.');};
			if (Game.keys[56]) {Game.GCOutcome="ElderFrenzy"; Game.Popup('Elder frenzy has been choosen.');};
			if (Game.keys[67]) {Game.GCOutcome="Chain"; Game.Popup('Cookie chain has been choosen.');};
			if (Game.keys[57]) {Game.GCOutcome=""; Game.Popup('Buff manipulator disabled.');};
			if (Game.keys[66]) {Game.Backfire="True"; Game.Popup('Backfire mode enabled.');};
			if (Game.keys[83]) {Game.Backfire="False"; Game.Popup('Success mode enabled.');};
			if (Game.keys[82]) {Game.Backfire=""; Game.Popup('Spell modifier disabled.');};
		}
		Game.registerHook('logic',Game.EnableOutcome);

		var grimoireUpdated=false;

		Game.registerHook('check', () => {
			if (Game.Objects['Wizard tower'].minigameLoaded && !grimoireUpdated) {

				eval("Game.Objects['Wizard tower'].minigame.spells['hand of fate'].win="+Game.Objects['Wizard tower'].minigame.spells['hand of fate'].win.toString().replace('newShimmer.force=choose(choices);', "if (Game.GCOutcome==`ClickFrenzy`) {choose(`click frenzy`);} else if (Game.GCOutcome==`Frenzy`) {choose(`frenzy`);} else if (`building special`) {choose(`building special`);} else if (Game.GCOutcome==`Sweet`) {choose(`free sugar lump`);} else newShimmer.force=choose(choices);"));
				eval("Game.Objects['Wizard tower'].minigame.spells['hand of fate'].fail="+Game.Objects['Wizard tower'].minigame.spells['hand of fate'].fail.toString().replace('newShimmer.force=choose(choices);', "if (Game.GCOutcome==`ElderFrenzy`) {choose(`blood frenzy`);}  else newShimmer.force=choose(choices);"));
				eval("Game.Objects['Wizard tower'].minigame.getFailChance="+Game.Objects['Wizard tower'].minigame.getFailChance.toString().replace('if (spell.failFunc) failChance=spell.failFunc(failChance);', "if (spell.failFunc) failChance=spell.failFunc(failChance); if (Game.Backfire==`True`) failChance=10000000; if (Game.Backfire==`False`) failChance*=0.001;"));

				grimoireUpdated=true;											
			}
		});

		Game.shimmerTypes["golden"].getMaxTime=Game.shimmerTypes["golden"].getMinTime;
		Game.shimmerTypes["reindeer"].getMaxTime=Game.shimmerTypes["reindeer"].getMinTime;

		eval('Game.getNewTicker='+Game.getNewTicker.toString().replace("if (!manual && Game.T>Game.fps*10 && Game.Has('Fortune cookies') && Math.random()<(Game.HasAchiev('O Fortuna')?0.04:0.02))","if (!manual && Game.T>Game.fps*10 && Game.Has('Fortune cookies') && Math.random()<(Game.HasAchiev('O Fortuna')?1.04:1.02))"));

		for (let i in Game.Objects) {
			eval('Game.Objects["'+i+'"].sell='+Game.Objects[i].sell.toString().replace(`*0.1)`, "*1.1)"));
		}

       
		eval('Game.shimmerTypes["golden"].popFunc='+Game.shimmerTypes['golden'].popFunc.toString().replace("if (Math.random()<0.01 || nextMoni>=maxPayout)","if (nextMoni>=maxPayout)"));
		eval('Game.shimmerTypes["golden"].popFunc='+Game.shimmerTypes['golden'].popFunc.toString().replace("var choice=choose(list);","if (Game.GCOutcome==`ClickFrenzy`) {var choice=`click frenzy`;} else if (Game.GCOutcome==`Frenzy`) {var choice=`frenzy`;} else if (Game.GCOutcome==`Storm`) {var choice=`cookie storm`;} else if (Game.GCOutcome==`Sweet`) {var choice=`free sugar lump`;} else if (Game.GCOutcome==`DragonHarvest`) {var choice=`dragon harvest`;} else if (Game.GCOutcome==`Dragonflight`) {var choice=`dragonflight`;} else if (Game.GCOutcome==`BuildingSpecial`) {var choice=`building special`;} else if (Game.GCOutcome==`ElderFrenzy`) {var choice=`blood frenzy`;} else if (Game.GCOutcome==`Chain`) {var choice=`chain cookie`;} else var choice=choose(list);"));
		eval('Game.updateShimmers='+Game.updateShimmers.toString().replace("if (Game.Has('Distilled essence of redoubled luck') && Math.random()<0.01) var newShimmer=new Game.shimmer(i);","if (Game.Has('Distilled essence of redoubled luck') && Game.prefs.DEoRL) var newShimmer=new Game.shimmer(i);"));
		eval('Game.dropRateMult='+Game.dropRateMult.toString().replace("rate*=5;","rate*=5; rate*=1e40;"));//all season drops are really common

		l('httpsSwitch').insertAdjacentHTML('afterend','<div class="title" style="font-size:25px;" id="PlsDontRemoveThis"></div>');

		Game.registerHook('draw', () => {
            l('PlsDontRemoveThis').innerHTML ='<div class style="display:none;"></div>'+'<b>'+'</b>'+("GC Manipulator is on");
						
	    });
	},
    save:function() {
    },
	load:function(str) {
    }
});