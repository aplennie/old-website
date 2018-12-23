$( document ).ready(function() {
});

var min = 100;
var cash = 0;

//setting game clock
$("#clock").text("1:40");

//function for game clock
function clock(m) {
  min += m;
  if (min%60 < 10) {
  const time = `${Math.floor(min/60)}:0${min%60}`;
    $("#clock").text(time);
} else {
  const time = `${Math.floor(min/60)}:${min%60}`; //thanks Leander 😎
    $("#clock").text(time);
};
};

//display game over page
function gameOver() {
  $("#text-box").text("Game Over");
  $("#buttons").remove();
};

function wallet(num) {
    cash += num;
    $("#cash").text(`$${cash}`);
};


//backpack stuff
var bkpkList = ["Phone","Keys"];


function bkpkAdd(item) {
  bkpkList.push(item);
  $("#backpack").append("<li>"+item+"</li>");
}

function bkpkRem(item) {
  bkpkList.splice( bkpkList.indexOf(item), 1 );
  $(`#backpack li:contains(${item})`).remove(); //WOOO THIS IS COOL AND IT WORKS WOw
}

function initAdd() {
  bkpkAdd("Phone");
  bkpkAdd("Keys");
  bkpkAdd("Sweater");
};

function playlist() {
  $("#plylst").attr("style","opacity:100;");
};

//creates buttons according to how many options there are in the object
function makeBtns(btnList) {
  var i = 0;
  buttons.innerHTML = "";
  for (i;i<btnList.length;i++) {
    buttons.innerHTML += "<button class='btn btn-outline-light mx-2 my-2' onClick="+btnList[i][1]+">" + btnList[i][0] + "</button>";
  };
};

// this function selects a random scenario number from the ones in the arg
function rng(arr) {
    var item = arr[Math.floor(Math.random()*arr.length)];
    const sel = `s${item}`;
    nextScen(scen[sel]); // has to be in this notation otherwise the key shows up as undefined. TOOK ME 3 DAYS TO FIGURE OUT WHY IT WASNT WORKING BUT I FIGURED IT OUT AND IM SO HAPPY AAAAAHHHHH
};

//function that replaces fields according to active scenario
function nextScen(s) {
    $("#clock").attr("style","opacity:100;")
    $("#buttons").animate({opacity:0});
    $("#image").fadeOut(1000,function() {
      $("#image").attr("src",s.simg);});
    $("#image").fadeIn(1000);
    $("#text-box").fadeOut(1000,function() {
      $("#text-box").text(s.stext);
      makeBtns(s.sbtns);
    $("#text-box").fadeIn(1000, function() {
      $("#buttons").animate({opacity:100});
      });
    });
};


//this object contains all possible scenarios in the game
var scen = {
  s1: {
    stext:"It’s a quiet, rainy, night.",
    simg:"",
    sbtns:""
  },
  s2: {
    stext:"The gentle sound of raindrops hitting your window should be enough to soothe you… but you can’t sleep.",
    simg:"",
    sbtns:[["Keep trying to sleep", "nextScen(scen.s3)"],["Check phone","nextScen(scen.s4)"]]
  },
  s3: {
    stext:"Your mind is racing. You can’t sleep. (+10 mins)",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s5);clock(10)"]]
  },
  s4: {
    stext:"You have no new notifications.",
    simg:"images/phone-screen.png",
    sbtns:[["Continue", "nextScen(scen.s5)"]]
  },
  s5: {
    stext:"You still can’t sleep.",
    simg:"",
    sbtns:[["Keep trying to sleep", "nextScen(scen.s6)"], ["Check social media","nextScen(scen.s7)"]]
  },
  s6: {
    stext:"You toss and turn. Still no luck (+20 mins)",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s8);clock(20)"]]
  },
  s7: {
    stext:"Scroll, scroll, scroll… (+10 mins)",
    simg:"images/phone-screen.png",
    sbtns:[["Continue", "nextScen(scen.s8);clock(10)"]]
  },
  s8: {
    stext:"Still awake...",
    simg:"",
    sbtns:[["Keep trying to sleep", "nextScen(scen.s9)"], ["Get out of bed","nextScen(scen.s10)"]]
  },
  s9: {
    stext:"Maybe some music will help you doze off...",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s10: {
    stext:"You decide to do the one thing that calms you best, so you grab your keys.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s11)"]]
  },
  s11: {
    stext:"You throw your wallet and a few other things in your backpack.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s12);initAdd();wallet(200);"]]
  },
  s12: {
    stext:"Carefully placing your steps, you sneak out of your room and through the front door.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s13);clock(6)"]]
  },
  s13: {
    stext:"You get in your car and put the key in the ignition.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s14)"]]
  },
  s14: {
    stext:"Your car won't start.",
    simg:"",
    sbtns:[["Just go back to bed...", "nextScen(scen.s15)"],["Try again", "nextScen(scen.s16);clock(2)"]]
  },
  s15: {
    stext:"'Never mind.' You say. As you sneak back to your room, you run into your mom. 'I heard your car trying to start, where were you going?'",
    simg:"",
    sbtns:[["Nowhere", "nextScen(scen.s19)"],["Sleepwalking", "nextScen(scen.s20)"]]
  },
  s16: {
    stext:"You try again. This tends to happen when it’s cold…",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s17)"]]
  },
  s17: {
    stext:"The engine struggles. You hope the sound doesn't wake anyone up.",
    simg:"",
    sbtns:[["Just go back to bed...", "nextScen(scen.s15)"],["Try again", "nextScen(scen.s18);playlist();clock(1)"]]
  },
  s18: {
    stext:"The engine finally turns over. You let out a sigh of relief as you put the car in gear. You put on your favorite playlist.",
    simg:"images/car-headlights.png",
    sbtns:[["Continue", "nextScen(scen.s22)"]]
  },
  s19: {
    stext:"Nowhere. I'm going back to sleep. Sorry for waking you up.",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s20: {
    stext:"Oh...I was sleepwalking...?",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s21)"]]
  },
  s21: {
    stext:"'Sleepwalking?! I'm tired of your bullshit excuses. Go to sleep before I decide to get rid of that deathtrap of yours.'",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s22: {
    stext:"Coming out of your driveway, on the right is a road that leads to the city. The bustling nightlife could help boost your spirits. On the left, is a winding country road that isn’t very travelled. It’s probably more dangerous in the rainy weather though…",
    simg:"",
    sbtns:[["Go left", "nextScen(scen.s23)"],["Go right", "nextScen(scen.s24)"]]
  },
  s23: {
    stext:"You decide to take a scenic drive.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s350);clock(5)"]]
  },
  s24: {
    stext:"You head to the city.",
    simg:"images/city.png",
    sbtns:[["Continue", "nextScen(scen.s25);clock(10)"]]
  },
  s25: {
    stext:"It looks like everything's pretty much closed at this hour. Coming up, you see there's a diner still open.",
    simg:"images/diner.png",
    sbtns:[["Stop here", "nextScen(scen.s26)"],["Keep driving", "nextScen(scen.s50);clock(6);"]]
  },
  s26: {
    stext:"As you walk into the diner, you see it's pretty empty. You take a seat at the counter. The waitress shifts her attention from her cell phone over to you. 'What can I get for ya, hon?'",
    simg:"",
    sbtns:[["Coffee (- $2.00)", "nextScen(scen.s27);wallet(-2)"],["Apple Pie (- $4.00)", "nextScen(scen.s27);wallet(-4)"], ["Water", "nextScen(scen.s27)"]]
  },
  s27: {
    stext:"'Comin' right up.'",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s28);clock(1)"]]
  },
  s28: {
    stext:"She sets your order down in front of you. 'What's a young kid like you doin in this sorry diner? You should be out somewhere fun... like that nightclub downtown.'",
    simg:"",
    sbtns:[["Yea, maybe", "nextScen(scen.s29)"],["Not my scene", "nextScen(scen.s29)"]]
  },
  s29: {
    stext:"'I heard it's all kinds of fun. You look pretty down, maybe it'll make ya feel better. Ya know, maybe you could find a nice girl... take her dancin... I always loved dancin. Ya know, I was wild back then. Used to hit up the club every weekend. Caused all sortsa trouble too!'",
    simg:"",
    sbtns:[["...", "nextScen(scen.s30);clock(1)"]]
  },
  s30: {
    stext:"'Oh...well there goes ol blabbin Beth, talkin folks ears off again. Enjoy your night darlin.'",
    simg:"",
    sbtns:[["Leave", "nextScen(scen.s31);clock(2)"]]
  },
  s31: {
    stext:"You get back in your car. You decide to keep driving.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s50);clock(2)"]]
  },
  s32: {
    stext:"You drive out of the city and eventually end up on a rural road. You pass a sign that reads 'SUNSET BEACH  24 mi'",
    simg:"",
    sbtns:[["Head to beach", "nextScen(scen.s358);clock(10)"]]
  },
  s50: {
    stext:"You head into the inner city. Driving through, you hear the thumping bass from a nightclub. It could be fun, if you find some way to get in.",
    simg:"images/club-outside.png",
    sbtns:[["Stop here", "nextScen(scen.s51)"],["Keep driving", "nextScen(scen.s32);clock(15)"]]
  },
  s51: {
    stext:"You decide to stop at the club. Too bad you're underage. Although... you remember that somebody told you there was somewhere around here to get a fake ID. Might be worth a try... or you could sneak in.",
    simg:"",
    sbtns:[["Go look for fake ID", "nextScen(scen.s52)"],["Try to sneak in", "nextScen(scen.s53)"]]
  },
  s52: {
    stext:"You try to recall your friend's story. They said there's a convenience store around here...Lucky's? ...That's probably it... ",
    simg:"images/luckys.png",
    sbtns:[["Go to Lucky's Convenience Store", "nextScen(scen.s61);clock(5)"]]
  },
  s53: {
    stext:"Not much of a line at this time of night... the bouncer might be willing to let you in. Still risky though. You could check the side door.",
    simg:"",
    sbtns:[["Try the side door", "nextScen(scen.s54);clock(2)"],["Bribe the bouncer (- $50)", "nextScen(scen.s73);clock(1);wallet(-50)"]]
  },
  s54: {
    stext:"You walk down the dark alley until you reach the door. 'EMPLOYEES ONLY' it reads.",
    simg:"",
    sbtns:[["Pull the handle", "nextScen(scen.s55);clock(1)"],["Wait for someone to come out", "nextScen(scen.s56)"]]
  },
  s55: {
    stext:"It's locked.",
    simg:"",
    sbtns:[["Wait for someone to come out", "nextScen(scen.s56)"],["Go back and bribe the bouncer", "nextScen(scen.s55);clock(2)"]]
  },
  s56: {
    stext:"You lean back against the wall and wait. You pull out your phone. '2 New Text Messages' ",
    simg:"",
    sbtns:[["Check messages", "nextScen(scen.s57)"]]
  },
  s57: {
    stext:"Bri❤️ says: 'I'm sorry.' 'Can we talk?'",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s58)"]]
  },
  s58: {
    stext:"...You put your phone away. You continue to wait.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s59);clock(8)"]]
  },
  s59: {
    stext:"The door bursts wide open. A couple stumbles out, barely holding themselves up while making out. They continue babbling and giggling as they walk away, unaware of your presence. You catch the door and walk into the club.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s60);clock(2)"]]
  },
  s60: {
    stext:"You follow the music through a dimly lit hallway. You reach the main area of the nightclub. To your right, there's the bar, which isn't very busy. The dance floor is straight ahead.",
    simg:"",
    sbtns:[["Sit at the bar", "nextScen(scen.s77);clock(8)"],["Go to the dance floor", "nextScen(scen.s78);clock(8)"]]
  },
  s61: {
    stext:"After a short walk, you reach the store. Luckily, it's still open. You walk in and lock eyes with the cashier. Might be less suspicious if you buy something...",
    simg:"",
    sbtns:[["Buy chocolate (- $2.50)", "nextScen(scen.s62);clock(1);bkpkAdd('Chocolate');wallet(-2.5)"],["Buy water (- $3.00)", "nextScen(scen.s62);clock(1);bkpkAdd('Water');wallet(-3)"],["Buy sunglasses (- $7.00)", "nextScen(scen.s62);clock(1);bkpkAdd('Sunglasses');wallet(-7)"]]
  },
  s62: {
    stext:"You approach the cashier. He is an older asian man with a stern, tired look on his face. How should you do this?",
    simg:"",
    sbtns:[["Bribe (- $50)", "nextScen(scen.s63);wallet(-50)"],["Smooth talk", "rng(66,67,68)"],["Don't ask about fake ID", "nextScen(scen.s64)"]]
  },
  s63: {
    stext:"You put your item on the counter, along with a little bonus cash... You let the cashier know you're planning on doing some clubbing tonight. He replies 'Ah yes? Wait here a minute.'",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s69);clock(3)"]]
  },
  s64: {
    stext:"You pay for the item and leave quietly. You're debating whether you should try sneaking into the club, or if you should get back in your car.",
    simg:"",
    sbtns:[["Try to sneak in", "nextScen(scen.s53);clock(5)"],["Go back to the car", "nextScen(scen.s65);clock(6)"]]
  },
  s65: {
    stext:"You decide to leave the club. Where should you go next?",
    simg:"",
    sbtns:[["Go back to the diner", "nextScen(scen.s26);clock(6)"],["Keep driving", "nextScen(scen.s65);clock(14)"],["Just go home", "nextScen(scen.s300);clock(16)"]]
  },
  s66: {
    stext:"You subtly ask about a special 'backstage pass' for the club down the street. The cashier knows what you mean. 'Ok, I can help you with that. For a small fee. Wait here, I have a gift for you.'",
    simg:"",
    sbtns:[["Pay his fee (- $50)", "nextScen(scen.s69);clock(3);wallet(-50)"]]
  },
  s67: {
    stext:"You try to bring it up subtly, but the man doesn't understand what you mean. You stutter trying to get your words out. You never were a good liar.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s64);clock(1)"]]
  },
  s68: {
    stext:"You try to bring it up subtly, but the man doesn't understand what you mean. You stutter trying to get your words out. You never were a good liar.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s64);clock(1)"]]
  },
  s69: {
    stext:"The man goes to the back room for a few minutes. He comes back with a small red envelope, embellished with gold markings and chinese symbols. 'Good fortune to you.' He says.",
    simg:"",
    sbtns:[["Get ID", "nextScen(scen.s70);bkpkAdd('FakeID')"]]
  },
  s70: {
    stext:"You thank the man and walk out of the store. On your way back to the club, you pull the drivers license out of the envelope. It reads:  Grace, Daniel J.  Age: 28. Sorta looks like you...",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s71);clock(3)"]]
  },
  s71: {
    stext:"You adjust your hair in the car mirror and take a deep breath. Time to do this...",
    simg:"",
    sbtns:[["Try to get into club", "nextScen(scen.s72);clock(2)"]]
  },
  s72: {
    stext:"You nonchalantly walk up to the bouncer and hand over the ID. He carefully examines it while eyeing you up and down.",
    simg:"",
    sbtns:[["Continue", "rng(74,75)"]]
  },
  s73: {
    stext:"You fold up $50 and put it under your ID. You hand it to the bouncer.",
    simg:"",
    sbtns:[["Continue", "rng(74,75)"]] //50% chance you get in
  },
  s74: {
    stext:"He gives back the ID. 'Enjoy yourself...' He says, and lets you enter.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s76)"]]
  },
  s75: {
    stext:"'I'm gonna need you to step aside sir,' says the bouncer. He pulls out a ziptie and cuffs your wrists. He calls the police.",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s76: {
    stext:"You walk in and see the dance floor ahead of you. The bar is on the right, towards the back.",
    simg:"",
    sbtns:[["Go to the dance floor", "nextScen(scen.s78);clock(2)"],["Sit at the bar", "nextScen(scen.s77);clock(3)"]]
  },
  s77: {
    stext:"You take a seat at one of the stools. Sitting a few seats away from you is an older looking man. His salt and pepper hair is slicked back, and the leather jacket he's wearing looks like it's seen better days. Out of it, he pulls out a cigarette and starts smoking.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s79)"]]
  },
  s78: {
    stext:"You approach the dancefloor, subtly bobbing your head to the beat. The sweaty crowd moves around you. They seem... lost in the music.",
    simg:"",
    sbtns:[["Dance", "nextScen(scen.s200)"]]
  },
  s79: {
    stext:"'What can I get you?' asks the bartender. You remember you drove here. Not a good idea to drink...",
    simg:"",
    sbtns:[["Just a water...", "nextScen(scen.s80);clock(1)"]]
  },
  s80: {
    stext:"'Can't argue with that...one water coming right up,' says the bartender. You hear a scoff from the sketchy man." ,
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s81)"]]
  },
  s81: {
    stext:"You sit quietly, staring down at your glass. You notice the sketchy man get up and walk over to you. He sits down and starts talking. 'What's got you so down, sonny?'" ,
    simg:"",
    sbtns:[["Say nothing", "nextScen(scen.s82)"],["A girl", "nextScen(scen.s84)"]]
  },
  s82: {
    stext:"...'Hey son, I'm talking to you.'" ,
    simg:"",
    sbtns:[["...", "nextScen(scen.s83)"]]
  },
  s83: {
    stext:"'This about a girl?'" ,
    simg:"",
    sbtns:[["...", "nextScen(scen.s84)"],["Get up", "nextScen()"]]
  },
  s84: {
    stext:"'Let me tell you something about love, sonny. It makes your brain all foggy... blinds you too. Tells you what you wanna hear. Yea, feels nice, till it doesn't anymore. Then it beats you up and breaks you down.'" ,
    simg:"",
    sbtns:[["Uhh...", "nextScen(scen.s85);clock(1)"]]
  },
  s85: {
    stext:"'But one day you get up. And you walk away. And with fresh eyes you see what's really important.'" ,
    simg:"",
    sbtns:[["What's important?", "nextScen(scen.s86)"]]
  },
  s86: {
    stext:"'Well...women ain't shit, boy!' he exclaims. 'C'mon now, let Uncle T buy you a man's drink.'" ,
    simg:"",
    sbtns:[["Can't drink", "nextScen(scen.s87)"]]
  },
  s87: {
    stext:"You say no. 'It ain't nice to refuse a gift, son...' his tone becomes deadpan." ,
    simg:"",
    sbtns:[["I can't.", "nextScen(scen.s88);clock(1)"]]
  },
  s88: {
    stext:"'But I insist...' he aggresses. Suddenly, you feel something press against your abdomen. You glance down and see the man is holding a gun to your body." ,
    simg:"",
    sbtns:[["Accept drink", "nextScen(scen.s89)"]]
  },
  s89: {
    stext:"Your chest tightens up. You can barely manage to squeeze out the words...'Ok, sure...' He tucks the gun back into his waistline." ,
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s90);clock(1)"]]
  },
  s90: {
    stext:"The man calls on the bartender. 'Two whiskeys, neat.' As he pours the drinks, you notice your phone go off." ,
    simg:"",
    sbtns:[["Check phone", "nextScen(scen.s91)"]]
  },
  s91: {
    stext:"You've got 21 Messages from Mom... and 6 missed calls. Maybe you should find a way to leave..." ,
    simg:"",
    sbtns:[["Text Mom", "nextScen(scen.s92)"]]
  },
  s92: {
    stext:"'If I were you.. I'd put that phone down, boy.' says Uncle T. His hand hovers near his gun. " ,
    simg:"",
    sbtns:[["Comply", "nextScen(scen.s93);clock(1)"]]
  },
  s93: {
    stext:"You try not to make the man angrier than he already is. You put the phone down on the counter. He takes it and puts it into his jacket pocket." ,
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s94);bkpkRem('Phone')"]]
  },
  s94: {
    stext:"'If I were you.. I'd put down that phone, boy.' says Uncle T. His hand hovers near his gun. " ,
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s95);clock(1)"]]
  },
  s95: {
    stext:"You stay silent as you sip your drink. You usually hate the way liquor burns your throat, but right now the only thing you can focus on is your uneasiness.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s96)"]]
  },
  s96: {
    stext:"'You know boy, you remind me of my own son. It's like you've got some kinda fire burning inside you... I like that. Shows potential.'",
    simg:"",
    sbtns:[["Fire?", "nextScen(scen.s97)"],["Your son?", "nextScen(scen.s98)"]]
  },
  s97: {
    stext:"'Like a volcano. Seems all quiet on the outside, but really there's much more bubbling under the surface.. something deadly.' He says with a smirk.  ",
    simg:"",
    sbtns:[]
  },
  s98: {
    stext:"'The family calls him Baby Angelo. He's a crazy kid. Always been more of a lone wolf, but the kid's determined.. I'll give him that.'",
    simg:"",
    sbtns:[]
  },
  s99: {
    stext:"placeholder",
    simg:"",
    sbtns:[]
  },
  s100: {
    stext:"placeholder",
    simg:"",
    sbtns:[]
  },
  s300: {
    stext:"You get home after a disappointing drive. At least you got some fresh air...",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s301)"]]
  },
  s301: {
    stext:"As you walk through the front door, your parents are pacing through the living room. Your mom sees you and starts crying. 'It's ok officer, he just came home,' your dad says before hanging up the phone. ",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s350: {
    stext:"You drive for a while, until you reach the outer limits of the town. Houses and strip malls start becoming trees and empty fields. You approach a red light. There's no cars around you...",
    simg:"",
    sbtns:[["Stop", "nextScen(scen.s351)"],["Don't stop", "nextScen(scen.s353)"]]
  },
  s351: {
    stext:"You slow down to a halt. You look left and right, there's still no one around.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s352);clock(2)"]]
  },
  s352: {
    stext:"Waiting for the light to turn green, you start to rev the engine. Finally, it turns. You swiftly drop your foot onto the gas pedal... the wheels spin for a bit as your car struggles to gain traction on the wet road. You hold the wheel steady as you start to accelerate.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s353)"]]
  },
  s353: {
    stext:"You barrel through the intersection, climbing past the 60mph limit.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s354);clock(4)"]]
  },
  s354: {
    stext:"It's been a while since you've driven this way... you tend to get reckless when you're angry.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s355);clock(2)"]]
  },
  s355: {
    stext:"You ease off of the throttle as you approach some bends. You wouldn't wanna go sliding into a guardrail.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s356);clock(1)"]]
  },
  s356: {
    stext:"Up ahead, the road splits off into two. The left goes towards the mountains, the right goes to the beach.",
    simg:"",
    sbtns:[["Go Left", "nextScen(scen.s356);clock(1)"],["Go Right", "nextScen(scen.s357);clock(1)"]]
  },
  s357: {
    stext:"You exit right to a rural road. Looks pretty dead.",
    simg:"images/rural-road.png",
    sbtns:[["Continue", "nextScen(scen.s358);clock(5)"]]
  },
  s358: {
    stext:"After a few miles of nothing, you approach an intersection up ahead. There's a small gas station on the corner. You stop at the red light.",
    simg:"images/gas-station.png",
    sbtns:[["Look around", "nextScen(scen.s359)"],["Check phone", "nextScen(scen.s359)"]]
  },
  s359: {
    stext:"You observe your surroundings. Really quiet out here... the only other car you see is parked at the gas station.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s360)"]]
  },
  s360: {
    stext:"After looking around for a bit, you notice a strange figure coming towards you. You lean forward for a better view. ",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s361)"]]
  },
  s361: {
    stext:"The strange figure has a black hood over their head... their face is concealed by a clown mask. As they get even closer, you realize they're holding a crowbar. ",
    simg:"",
    sbtns:[["Drive", "nextScen(scen.s360)"]]
  },
  s361: {
    stext:"Barely a foot away from your window, they swing the crowbar. You manage to floor the gas pedal quick enough to not get your window smashed. Unfortunately, now you've got a dent in your rear fender.",
    simg:"",
    sbtns:[["Drive", "nextScen(scen.s360)"]]
  },
  s362: {
    stext:"You've got two new texts.",
    simg:"",
    sbtns:[["Read texts", "nextScen(scen.s363);clock(1)"],["Put phone away", "nextScen(scen.s359)"]]
  },
  s363: {
    stext:"Bri❤️ says: 'I'm sorry.' 'Can we talk?'",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s364)"]]
  },
  s364: {
    stext:"Your thoughts are interrupted by a sudden loud crashing noise. You see glass shards fly past your face as you try to process what's going on. You're grabbed by your shirt collar and dragged onto the pavement.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s365)"]]
  },
  s365: {
    stext:"Towering over you is a clown-masked man dressed in all black. He's just smashed your window with a crowbar.",
    simg:"",
    sbtns:[["Fight", "nextScen(scen.s366);clock(1)"], ["Run", "nextScen(scen.s369)"]]
  },
  s366: {
    stext:"Think quick, what do you do?",
    simg:"",
    sbtns:[["Grab his crowbar", "rng(367,368)"], ["Kick his leg", "nextScen(scen.s371)"]]
  },
  s367: {
    stext:"You reach for his crowbar, but he anticipates your move. In one swift motion he swings it up and strikes it down on your face.",
    simg:"",
    sbtns:[["Continue", "gameOver()"]]
  },
  s368: {
    stext:"You manage to wrestle the crowbar out of his hand. You roll over and get back on your feet. The man lunges towards you.",
    simg:"",
    sbtns:[["Dodge", "nextScen(scen.s369);clock(1)"], ["Strike", "nextScen(scen.s370)"]]
  },
  s369: {
    stext:"You dodge away from him. 'Oh you sneaky boy...' he snaps. Angrily, he raises his fists and starts throwing punches at you.",
    simg:"",
    sbtns:[["Fight back", "rng(375,376,377)"]]
  },
  s370: {
    stext:"He tackles you to the ground before you can swing at him. You struggle to free yourself from under him. You manage to knee him in the groin get your arm free. As he winces in pain, you hit him on the head with the crowbar. He finally stops moving.",
    simg:"",
    sbtns:[["Get up", "nextScen(scen.s374)"]]
  },
  s371: {
    stext:"You kick the back of his knee, causing him to lose his balance. He trips over your leg and falls to the ground, dropping the crowbar in the process.",
    simg:"",
    sbtns:[["Pick up crowbar", "nextScen(scen.s372)"], ["Run to car", "nextScen(scen.s373)"]]
  },
  s372: {
    stext:"You roll over and reach for the crowbar. You and the man get up at the same time. He lunges forward to attack you.",
    simg:"",
    sbtns:[["Dodge", "nextScen(scen.s369)"]]
  },
  s373: {
    stext:"You quickly get up off the ground and into your car. You slam the door and drive off before the man can catch you.",
    simg:"",
    sbtns:[["Pick up crowbar", "gameOver()"], ["Run to car", "gameOver()"]]
  },
  s374: {
    stext:"You push his body off of yours and sit up. He doesn't seem to be breathing.",
    simg:"",
    sbtns:[["Search body", "gameOver()"], ["Leave", "gameOver()"]]
  },
  s375: {
    stext:"You violently wave your crowbar around, but the man catches your wrist and twists it around, causing you to drop the crowbar. He picks it up and starts beating you with it.",
    simg:"",
    sbtns:[["Ow", "gameOver()"]]
  },
  s376: {
    stext:"You carefully dodge his punches and look for an opening. You swing the crowbar and hit his side. You continue hitting him until he falls to the ground. ",
    simg:"",
    sbtns:[["Keep hitting him", "nextScen(scen.s378)"],["Run to car", "nextScen(scen.s379)"]]
  },
  s377: {
    stext:"You carefully dodge his punches and look for an opening. You swing the crowbar and miss. He lunges towards you.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s370)"]]
  },
  s378: {
    stext:"You beat him until he stops moving.",
    simg:"",
    sbtns:[["Continue", "nextScen()"]]
  },

};



//  s11: {
//    stext:"",
//    simg:"",
//    sbtns:[]

//game startup animations
  $('#start-button').click(function() {
    $('#main-screen').fadeOut(1000,function() {
      $('#main-screen').remove();});
    $("#text-box").fadeOut(1000,function() {
      $("#text-box").text(scen.s1.stext);});
    $("#text-box").fadeIn(1000).delay(2000);
      nextScen(scen.s2);

  });
