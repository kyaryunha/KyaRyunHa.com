/* ===================================================================
 * 03. sleepcomputer
 *
 * ------------------------------------------------------------------- */
function change_sleepcomputer(a){
    var what = document.getElementById("sleepcomputer_link");
    what.style.color = a;
}
function getParameterByName(){
    var url = window.location.href;
    var name = url.split('?')[1];
    var name_parse = name.split("%20");
    if(name_parse.length==3) name = name_parse[0]+name_parse[1]+name_parse[2];
    else name = "black"
    document.body.style.background=name;
    return name;
}
function sleepcomputer_linking(){
    var what = document.getElementById("sleepcomputer_link");
    var str = "sleepcomputer?"+what.style.color;
    window.open(str,"","");
}
/* ===================================================================
 * 04. arithmetic
 *
 * ------------------------------------------------------------------- */

function arithmetic_explanation_linking(){
    window.open("arithmetic_explanation","","");
}
function arithmetic_archive(){
    window.open("arithmetic_archive","","");
}

var number = [],cnt,firstchk=-1,secondchk=-1,arithmetic_final_score=0;
const edge_num = 6;


function arithmetic_new_randing(){
    for(var i = 0; i < edge_num ; i++){
        number[i] = [];
        for(var j = 0; j < edge_num ; j++) number[i][j]=Math.floor(Math.random()*20,20)+1;
    }
}

function arithmetic_new_first_td(){
    arithmetic_new_randing();
    var obj = document.getElementById("arithmetic_game_pan"); obj.innerHTML="";
    var obj2 = document.getElementById("arithmetic_score_td"); obj2.innerHTML="";
    cnt = 0;
    var newTr = document.createElement("tr");
    for(var i=0,j=0;j<edge_num;j++){
        newTr.innerHTML += "<td id = \"arithmetic_game_kan\""+"name = \"arithmetic_names\">"+number[i][j]+"</td>";
    } cnt++;
    newTr.innerHTML += "<td><button id = \"arithmetic_game_button\" onclick=\"javascript:arithmetic_new_td()\"> next </button> </td>";
    obj.appendChild(newTr);

    var now_kans = document.getElementsByName("arithmetic_names");
    var kan_size = now_kans.length;
    for(var i = 0; i < kan_size; i++){
        var chk=(i-(i%edge_num))/edge_num;
        if((cnt-1)==chk){
            now_kans[i].addEventListener("click",arithmetic_select_one);
        }
    }
}
function arithmetic_new_td(){
    arithmetic_color_init();
    var but = document.getElementById("arithmetic_game_button").parentElement; but.innerHTML="";
    var obj = document.getElementById("arithmetic_game_pan");
    var newTr = document.createElement("tr");
    for(var i=cnt,j=0;j<edge_num;j++){
        newTr.innerHTML += "<td id = \"arithmetic_game_kan\""+"name = \"arithmetic_names\">"+number[i][j]+"</td>";
    } cnt++;
    if(cnt<=edge_num-1)  newTr.innerHTML += "<td><button id = \"arithmetic_game_button\" onclick=\"javascript:arithmetic_new_td()\"> next </button> </td>";
    else        newTr.innerHTML += "<td><button id = \"arithmetic_game_button\" onclick=\"javascript:arithmetic_new_last_td()\"> finish </button> </td>";
    obj.appendChild(newTr);

    var now_kans = document.getElementsByName("arithmetic_names");
    var kan_size = now_kans.length;
    for(var i = 0; i < kan_size; i++){
        var chk=(i-(i%edge_num))/edge_num;
        if((cnt-1)==chk){
            now_kans[i].addEventListener("click",arithmetic_select_one);
        }
    }

    if(cnt>=2)
    {
        for(var i = 0; i < kan_size; i++){
            var chk=(i-(i%edge_num))/edge_num;
            if((cnt-2)==chk){
                now_kans[i].removeEventListener("click",arithmetic_select_one);
            }
        }
    }

}
function arithmetic_new_last_td(){
    arithmetic_color_init();
    var but = document.getElementById("arithmetic_game_button").parentElement; but.innerHTML="";
    var obj = document.getElementById("arithmetic_score_td");
    obj.innerHTML="<td width = \"16%\"></td>"
    var newTd = document.createElement("td");
    arithmetic_scoring();
    newTd.innerHTML += "Game is Finish. Your Score is : "+arithmetic_final_score;
    obj.appendChild(newTd);
}
function arithmetic_color_init(){
    var now_kans = document.getElementsByName("arithmetic_names");
    var kan_size = now_kans.length;
    for(var i = 0; i < kan_size; i++){
        now_kans[i].style.color = "gray";
    }
}
function arithmetic_select_one(){
    var now_kans = document.getElementsByName("arithmetic_names");
    var kan_size = now_kans.length;
    var red_chk = 0;
    for(var i = 0; i < kan_size; i++){
        if(now_kans[i].style.color=="red"){
            red_chk = 1;
            var limsi_innerHTML = now_kans[i].innerHTML;
            now_kans[i].innerHTML = this.innerHTML;
            this.innerHTML = limsi_innerHTML;

            now_kans[i].style.color = "gray";
        }
    }
    if(!red_chk) this.style.color = "red";
}
function arithmetic_scoring(){
    var now_kans = document.getElementsByName("arithmetic_names");
    var kan_size = now_kans.length;
    var red_chk = 0;
    var coloring = [];
    for(var i = 0; i < edge_num ; i++){
        coloring[i] = [];
        for(var j = 0; j < edge_num ; j++) coloring[i][j]=0;
    }
    for(var i = 0,j=0; i < kan_size; i++){
        number[j][(i%edge_num)]=parseInt(now_kans[i].innerHTML);
        if(i%edge_num==edge_num-1) j++;
    }

    var score_chk = 0,cha;
    arithmetic_final_score=0;
    for(var j=0;j<edge_num;j++)
    {
        score_chk = 0,cha = 1000;
        for(var i=2;i<edge_num;i++)
        {
            if(!score_chk) {
                if(number[i][j]-number[i-1][j]==number[i-1][j]-number[i-2][j])
                    cha=number[i][j]-number[i-1][j],score_chk=3;
            }
            else {
                if(number[i][j]-number[i-1][j]==cha) score_chk++;
                else {
                    for(var k = 1; k <= score_chk ; k++ )
                    {
                        arithmetic_final_score+=number[i-k][j];
                        coloring[i-k][j]++;
                    }
                    if(score_chk==4) arithmetic_final_score+=20;
                    else if(score_chk==5) arithmetic_final_score+=40;
                    else if(score_chk==6) arithmetic_final_score+=60;
                    score_chk = 0;
                }
            }

            if(i==edge_num-1 && score_chk>=3){
                for(var k = 0; k < score_chk ; k++ )
                {
                    arithmetic_final_score+=number[i-k][j];
                    coloring[i-k][j]++;
                }
                if(score_chk==4) arithmetic_final_score+=20;
                else if(score_chk==5) arithmetic_final_score+=40;
                else if(score_chk==6) arithmetic_final_score+=60;
                score_chk = 0;
            }
        }
    }
    for(var i = 0,j=0; i < kan_size; i++){
        if(coloring[j][(i%edge_num)]==0){
            now_kans[i].style.color = "gray";
        }
        if(coloring[j][(i%edge_num)]==1){
            now_kans[i].style.color = "blue";
        }
        if(coloring[j][(i%edge_num)]==2){
            now_kans[i].style.color = "purple";
        }
        if(i%edge_num==edge_num-1) j++;
    }
}
/* ===================================================================
 * 05. drawgraph
 *
 * ------------------------------------------------------------------- */
function drawgraph_linking(){
    window.open("drawgraph","","");
}
/* ===================================================================
 * 06. christmas
 *
 * ------------------------------------------------------------------- */
function christmas_linking(){
    window.open("christmas","","");
}
/* ===================================================================
 * Another * Computer Lesson
 *
 * ------------------------------------------------------------------- */
function education_bloglink(){
    window.open("https://blog.naver.com/kyaryunha/221438808162","","");
}
/* ===================================================================
 * Another * downloads
 *
 * ------------------------------------------------------------------- */
function downloadfile(){
    var url="/downloads"
  
    document.getElementById('fileDown').src = url;
    document.getElementById('fileDown').location.reload();
   }