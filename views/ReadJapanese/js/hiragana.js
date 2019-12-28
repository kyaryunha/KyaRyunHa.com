let hiraganaDict = {
あ:"a",	か:"ka", が:"ga", さ:"sa", ざ:"za", た:"ta", だ:"da", な:"na", は:"ha", ば:"ba", ぱ:"pa", ま:"ma", や:"ya", ら:"ra", わ:"wa",
い:"i", き:"ki", ぎ:"gi", し:"si", じ:"zi", ち:"chi", ぢ:"di", に:"ni", ひ:"hi", び:"bi", ぴ:"pi", み:"mi", り:"ri",
う:"u", く:"ku", ぐ:"gu", す:"su", ず:"zu", つ:"tsu", づ:"du", ぬ:"nu", ふ:"hu", ぶ:"bu", ぷ:"pu", む:"mu", ゆ:"yu", る:"ru",
え:"e", け:"ke", げ:"ge", せ:"se", ぜ:"ze", て:"te", で:"de", ね:"ne", へ:"he", べ:"be", ぺ:"pe", め:"me", れ:"re",
お:"o", こ:"ko", ご:"go", そ:"so", ぞ:"zo", と:"to", ど:"do", の:"no", ほ:"ho", ぼ:"bo", ぽ:"po", も:"mo", よ:"yo", ろ:"ro", を:"wo",
ん:"nn"
}

let hiraganaArr = new Array();

let hiraganaNum = 0
for(let key in hiraganaDict){
    hiraganaArr[hiraganaNum] = key;
    hiraganaNum++;
}

let score = 0;
let successNumber = 0, failNumber = 0;


function IsAnswerEnter(){
    if(event.keyCode === 13){
        let yourAnswer = document.getElementById("your-answer");
        IsTypingAnswer();
        yourAnswer.value="";
    }

}

function IsTypingAnswer(){
    let realAnswer =  document.getElementById("question");
    let yourAnswer = document.getElementById("your-answer");
    let yourScore = document.getElementById("your-score");

    if(hiraganaDict[realAnswer.innerHTML]===yourAnswer.value){

        let randNumber = Math.floor(Math.random() * hiraganaNum);
        realAnswer.innerHTML = hiraganaArr[randNumber];

        score++; successNumber++;
        yourScore.innerHTML = score.toString();
        realAnswer.style = "color:green";

    }
    else{
        failNumber++;
        realAnswer.style = "color:red";
    }
}

function IsClickAnswer(e){
    let realAnswer =  document.getElementById("question");
    let yourAnswer = e;
    let yourScore = document.getElementById("your-score");

    console.log(realAnswer.innerHTML, yourAnswer.innerHTML)
    if(realAnswer.innerHTML===yourAnswer.innerHTML[0]){

        let randNumber = Math.floor(Math.random() * hiraganaNum);
        realAnswer.innerHTML = hiraganaArr[randNumber];

        score++; successNumber++;
        yourScore.innerHTML = score.toString();
        realAnswer.style = "color:green";

    }
    else{
        failNumber++;
        realAnswer.style = "color:red";
    }
}

var storageHover;
function ChangeColor(e){
    if(hiraganaDict[e.innerHTML]!=undefined){
        storageHover = e.innerHTML;
        e.innerHTML = e.innerHTML + "<font size=\"3px\">(" + hiraganaDict[e.innerHTML] + ")</font>";
        e.style = "background-color:#ffbb33";
    }
}
function ChangeOriginalColor(e){
    e.innerHTML = storageHover;
    e.style = "background-color:white";
}
