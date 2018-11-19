$( document ).ready(function() {
});

var min = 40;
var hr = 1;
//setting game clock
$("#clock").text("1:40");

//function for game clock
var clock = function(h, m) {
    min = min + m;
    hr = hr + h;
    if (min >= 60) {
      if (min == 60) {
        hr++;
        min = 0;
      } else if (min == 70) {
        hr++;
        min = 10;
      } else if (min == 80) {
        hr++;
        min = 20;
      } else if (min == 90) {
        hr++;
        min = 30;
      };
    };
  var time = hr+":"+min;
  $("#clock").text(time);
}

//display game over page
var gameOver = function() {
  $("#text-box").text("Game Over");
  $("#buttons").remove();
};

//backpack stuff
var bkpkList = ["Wallet","Phone","Keys"];

var bkpk = function(item, action) {
  if (action = "Add") {
    bkpkList.push(item);
    $("#backpack").append("<li>"+item+"</li>");
  } else {
    bkpkList.splice( bkpkList.indexOf(item), 1 );
    $("#backpack").remove("<li>"+item+"</li>");
  }
}

var initAdd = function() {
  bkpk("Phone", "Add");
  bkpk("Wallet", "Add");
  bkpk("Keys", "Add");
  bkpk("Sweater", "Add");
};

//creates buttons according to how many options there are in the object
var makeBtns = function(btnList) {
  var i = 0;
  buttons.innerHTML = "";
  for (i;i<btnList.length;i++) {
    buttons.innerHTML += "<button class='btn btn-outline-light mx-2' onClick="+btnList[i][1]+">" + btnList[i][0] + "</button>";
  };
};


//function that replaces fields according to active scenario
var nextScen = function(s) {
    $("#clock").attr("style","opacity:100;")
    $("#buttons").animate({opacity:0});
    $("#image").fadeOut(1000,function() {
      $(this).attr("src",s.simg);});
    $(this).fadeIn(1000);
    $("#text-box").fadeOut(1000,function() {
      $(this).text(s.stext);
      makeBtns(s.sbtns);
    $(this).fadeIn(1000, function() {
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
    sbtns:[["Continue", "nextScen(scen.s5);clock(0,10)"]]
  },
  s4: {
    stext:"You have no new notifications.",
    simg:"",
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
    sbtns:[["Continue", "nextScen(scen.s8);clock(0,20)"]]
  },
  s7: {
    stext:"Scroll, scroll, scroll… (+10 mins)",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s8);clock(0,10)"]]
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
    sbtns:[["Continue", "nextScen(scen.s12);initAdd()"]]
  },
  s12: {
    stext:"Carefully placing your steps, you sneak out of your room and through the front door.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s13)"]]
  },
  s13: {
    stext:"You get in your car and put the key in the ignition.",
    simg:"",
    sbtns:[["Continue", "nextScen(scen.s14)"]]
  },
  s14: {
    stext:"Your car won't start.",
    simg:"",
    sbtns:[["Just go back to bed...", "nextScen(scen.s15)"],["Try again", "nextScen(scen.s16)"]]
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
    sbtns:[["Just go back to bed...", "nextScen(scen.s15)"],["Try again", "nextScen(scen.s18)"]]
  },
  s18: {
    stext:"The engine finally turns over. You let out a sigh of relief as you put the car in gear.",
    simg:"",
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
    stext:"placeholder",
    simg:"",
    sbtns:[]
  },
  s24: {
    stext:"placeholder",
    simg:"",
    sbtns:[]
  },
  s25: {
    stext:"placeholder",
    simg:"",
    sbtns:[]
  },
};

//  s11: {
//    stext:"",
//    simg:"",
//    sbtns:[]

//game startup animations
  $('#start-button').click(function() {
    $('#main-screen').fadeOut(1000,function() {
      $(this).remove();});
    $("#text-box").fadeOut(1000,function() {
      $(this).text(scen.s1.stext);});
    $("#text-box").fadeIn(1000).delay(2000);
      nextScen(scen.s2);

  });
