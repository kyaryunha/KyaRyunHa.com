/* ===================================================================
 * 05. drawgraph
 *
 * ------------------------------------------------------------------- */
var N=-1,M=-1;

var now_canvas_color;
var vertex_wx = [], vertex_wy = [];
var bidirect = 1;

var adj = [];

var isMst = 0;
var isLight = 0;
var lighting = [];

var colorgesu;
var colorarr = [];

/* -----------------------------------------------*/
var text_mode=0;
var now_text_weight = 15;
var now_text_color = "#FFFF00";

var textArr = [];
var textWeight = [];
var textColor = [];
var text_wx = [], text_wy = [];
var textVertex = [];
/* -----------------------------------------------*/
const shape_cir=1,shape_ecir=2;
const shape_squ=3,shape_esqu=4;
const shape_tri=5,shape_etri=6;
/* -----------------------------------------------*/
var vertex_number =[];
var vertex_indexing =[];
/* -----------------------------------------------*/

var exist_vertex = [];
var exist_adj = [];

/* -----------------------------------------------*/

var now_vertex_shape = 1;
var now_node_shape = 1;

var now_vertex_weight=10;
var now_node_weight=4;

var now_vertex_color="#000000";
var now_node_color="#00A000";
var browncolor="#BB8000";

var now_direct_true=1;

/* -----------------------------------------------*/

var vertex_shape = []; /* 1 : 기존 정점 모양 */
var node_shape = []; /* 1 : 기존 간선 모양 */

var vertex_weight = [];
var node_weight = [];

var vertex_color = [];
var node_color = [];

/* -----------------------------------------------*/
var par = [];

function _find(k)
{
    if(k==par[k]) return k;
    else return par[k]=_find(par[k]);
}

function _merge(x,y)
{
    x=_find(x); y=_find(y);
    if(x==y) return 0;
    par[y]=x; return 1;
}
/* -----------------------------------------------*/
var canvas_x,canvas_y;

var vertex_numbering;

function drawgraph_graphicgraph()
{
    newPan();
}
function newPan()
{
    var pan = document.getElementById("drawgraph_pan"); pan.innerHTML="";

    var ncanvas = document.createElement("canvas");
    ncanvas.innerHTML="캔버스가 지원되지 않는 브라우저입니다. 다른 브라우저로 접속해주세요.";
    ncanvas.id="drawgraph_canvas";
    ncanvas.width = (window.innerWidth);
    ncanvas.height = (window.innerHeight);
    ncanvas.style.background = "transform";
    now_canvas_color = "transforms";
    canvas_x = ncanvas.width; canvas_y = ncanvas.height;
    pan.appendChild(ncanvas);
    canvas_init();

}

function change_textmode()
{
    var textmode=document.getElementById("textmode_button");
    if(text_mode==1)
    {
        text_mode = 0;
        textmode.style.color = "#3b3b3b";
        textmode.innerHTML = "Off";
    }
    else if(text_mode==0)
    {
        text_mode = 1;
        textmode.style.color = "#339900";
        textmode.innerHTML = "On";

    }
}
function download_img(a)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var image = canvas.toDataURL("image/jpg");
    a.href = image;
};
function download_txt(a)
{
    var json = 'data:text/json;charset=utf-8,'
    const Texting = {
        N,
        exist_vertex:exist_vertex,
        vertex_wx: vertex_wx,
        vertex_wy: vertex_wy,
        vertex_number: vertex_number,
        vertex_indexing: vertex_indexing,
        adj: adj,
        exist_adj:exist_adj,
        vertex_shape:vertex_shape,
        node_shape: node_shape,
        vertex_weight: vertex_weight,
        node_weight: node_weight,
        vertex_color: vertex_color,
        node_color: node_color,
        M,
        textArr: textArr ,
        textColor:textColor,
        text_wx:text_wx,text_wy:text_wy,
        textVertex
     }
     json += encodeURIComponent(JSON.stringify(Texting));
     a.href = json;
}

var colorvis = [];

function colordfs(u)
{
    var colorcnt = colorvis[i];
    for(var i = 0; i <= N ;i++ )
    {
        if(i==u) continue;
        if(adj[u][i]==0&&adj[i][u]==0) continue;
        if(colorvis[i]==0)
        {
            colorvis[i] = colorarr[colorcnt++];
            //if(colorcnt==)
            if(colorcnt==colorgesu) colorcnt = 0;
            colordfs(i);
        }
    }
}
function coloring()
{
    colorgesu = 4;
    colorarr[0] = "red";
    colorarr[1] = "yellow";
    colorarr[2] = "green";
    colorarr[3] = "blue";
    for(var i = 0; i <= N; i++ ) colorvis[i] = 0;
    for(var i = 0; i <= N; i++ )
    {
        if(par[i]==i)
        {
            console.log(i);
            lighting[i]=browncolor;
            colorvis[i]=1;
            colordfs(i);
        }
    }

    for(var i = 0; i <= N ; i++ ) vertex_color[i] = colorvis[i];
    erasing();
    draw_all();

}
function blacking()
{
    for(var i = 0; i <= N; i++ ) vertex_color[i]=now_vertex_color;
    erasing();
    draw_all();
}
function lightOn()
{
    if(isLight==1) isLight = 0;
    else isLight = 1;
    var lightId = document.getElementById("lightId");
    if(isLight==1)
    {
        lightId.style.color = "#00FF00";
        lightId.innerHTML = "<i>LightOn</i>";
    
        coloring();
    }
    else
    {
        lightId.style.color = "#FF0000";
        lightId.innerHTML = "<i>LightOff</i>";
        blacking();
    }
}
function structMST()
{
    var first, second, cost;
}
function MSTon()
{
    if(isMst==1) isMst = 0;
    else isMst = 1;
    var MSTid = document.getElementById("MSTid");
    if(isMst==1)
    {
        MSTid.style.color = "#00FF00";
        MSTid.innerHTML = "<i>MST</i>";
    
        MST();
    }
    else
    {
        MSTid.style.color = "#FF0000";
        MSTid.innerHTML = "<i>Tree</i>";
       
    }
}
function MST()
{
    if(N<=0) return;
    var mstarr = [];
    var nodegesu = 0;
    var mstcnt = 0;
    for(var i = 0; i <= N; i++ ) par[i]=i;

    for(var i = 0; i <= N; i++ )
    {
        for(var j = 0; j < i ; j++ )
        {
            if(i==j) continue;
            mstarr[nodegesu] = new structMST();
            mstarr[nodegesu].first = i;
            mstarr[nodegesu].second = j;
            mstarr[nodegesu++].cost = ((vertex_wx[i]-vertex_wx[j])*(vertex_wx[i]-vertex_wx[j]))+((vertex_wy[i]-vertex_wy[j])*(vertex_wy[i]-vertex_wy[j]));
        }
    }

    for(var i = 0; i <= N; i++ )
    {
        for(var j = 0; j <= N ; j++ )
        {
            adj[i][j]=0, exist_adj[i][j]=0;
            node_color[i][j]=0;
            node_shape[i][j]=0;
            node_weight[i][j]=0;
    
            adj[N][i]=0, exist_adj[N][i]=0;
            node_color[N][i]=0;
            node_shape[N][i]=0;
            node_weight[N][i]=0;
        }
    }

   mstarr.sort(function(a,b){
       return a.cost<b.cost?-1:a.cost>b.cost?1:0;
   });

    for(var i = 0 ; i < nodegesu; i++)
    {
        console.log(mstcnt,xx,yy,mstarr[i].cost);
        var xx = mstarr[i].first;
        var yy = mstarr[i].second;
        var xxx = _find(xx);
        var yyy = _find(yy);

        if(xxx>yyy)
        {
            var tmp = xx;
            xx = yy;
            yy = tmp;
        }

        if(_merge(xx,yy)==1)
        {
            mstcnt++;
            if(xx>yy)
            {
                var tmp = xx;
                xx = yy;
                yy = tmp;
            }
            exist_adj[xx][yy] = bidirect;
            adj[xx][yy] = 1; 
            node_shape[xx][yy]=now_node_shape;
            node_color[xx][yy]=now_node_color;
            node_weight[xx][yy]=now_node_weight;

            if(mstcnt==N) break;
        }
    }
    erasing();
    draw_all();
}
function draw_all(){
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    /* node draw */
    for(var i = 0; i <= N ; i++ )
    {
        for(var j = 0; j <= N ; j++ )
        {
            if(exist_adj[i][j]==0||(exist_adj[i][j]==2&&i>j)) continue;
            if(node_shape[i][j]==1) /* 실선 */
            {
                context.beginPath();
                context.setLineDash([node_weight[i][j],0]);
                if(i==par[i]) context.strokeStyle = browncolor;
                else context.strokeStyle=node_color[i][j];
                context.lineWidth=node_weight[i][j];
                context.moveTo(vertex_wx[i],vertex_wy[i]);
                context.lineTo(vertex_wx[j],vertex_wy[j]);
                context.stroke();
            }

        }

    }
    /* vertex draw */
    for(var i = 0; i <= N ; i++ )
    {
        if(!exist_vertex[i]) continue;
        draw_vertex(i);
    }

    /* text draw */
    for(var i = 0; i <= M ; i++ )
    {
        text_input_normal(i);
    }

    /* select draw */
    if(first_chk_point!=-1)
    {
        context.beginPath();
        context.fillStyle="#FF0000"; 
        context.arc(vertex_wx[first_chk_point], vertex_wy[first_chk_point], vertex_weight[first_chk_point]/3*2, 0,Math.PI*2);
        context.fill();
    }

}

function canvas_init()
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    canvas.addEventListener("mousemove",function(e){ move(e); });
    canvas.addEventListener("mousedown",function(e){ down(e); });
    canvas.addEventListener("mouseout",function(e){ out(e); });
    canvas.addEventListener("click",function(e){ clicking(e); });
    canvas.addEventListener("dblclick",function(e){ dbclicking(e); });    
    
}

var startX=0, startY=0;
var dragging = false, moving = false;
var selectdot = -1;
var first_chk_point=-1,second_chk_point=-1;
var inputbox = 0;


function text_input_normal(k)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");
    
    context.beginPath();
    var fonting = "bold "+textWeight[k]+"px consolas";
    context.font = fonting;
    context.fillStyle = textColor[k]; 

   if(textVertex[k]==-1)
   {
        context.textAlign = "left";
        context.fillText(textArr[k], text_wx[k],text_wy[k]);
   }
   else
   {
        context.textAlign = "center";
        context.fillText(textArr[k], vertex_wx[textVertex[k]],vertex_wy[textVertex[k]]+(now_text_weight/2));
   }
}
function clicking(e)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    startX = e.offsetX, startY = e.offsetY;

    var neardot = nearing(e.offsetX,e.offsetY);

    dragging = false;
    if(moving==true)
    {
        moving = false;
        return;
    }

    if(text_mode==1)
    {
        if(inputbox==0)
        {
            /****************************** */
            var textInput = document.createElement("input");
            textInput.setAttribute("type", "text");
            textInput.style.position = "absolute";
            textInput.style.left = e.pageX;
            textInput.style.top = e.pageY-(now_text_weight/2);
            textInput.style.textAlign = "left"
            textInput.style.font="bold "+now_text_weight+"px consolas";
            textInput.style.color = now_text_color;
            textInput.style.backgroundColor = "transparent";
            document.body.appendChild(textInput);

            
            textInput.addEventListener("focusin", function(e){

            });
            textInput.addEventListener("focusout", function(e){
                if(this.value.length!=0)
                {
                    if(neardot==-1)
                    {
                        M++;
                        textArr[M] = this.value;
                        textWeight[M] = now_text_weight;
                        textColor[M] = now_text_color;
                        text_wx[M] = startX, text_wy[M] = startY+(now_text_weight/2);
                        textVertex[M]=-1;
                        text_input_normal(M);
                    }
                    else
                    {
                        M++;
                        textArr[M] = this.value;
                        textWeight[M] = now_text_weight;
                        textColor[M] = now_text_color;
                        textVertex[M] = neardot;
                        text_input_normal(M);
                    }

                }
                document.body.removeChild(textInput);
            });
            
  
        }
        return;
    }

    if(neardot==-1)
    {
        N++;
        par[N]=N; lighting[N]=0; colorvis[N] = 0;
        exist_vertex[N] = 1;
        vertex_wx[N] = startX; vertex_wy[N] = startY;
        vertex_color[N]= now_vertex_color;
        vertex_weight[N] = now_vertex_weight;
        vertex_shape[N] = now_vertex_shape;

        adj[N]=[]; exist_adj[N]=[];
        node_color[N]=[];
        node_shape[N]=[];
        node_weight[N]=[];
        for(var i=0;i<=N;i++)
        {
            adj[i][N]=0, exist_adj[i][N]=0;
            node_color[i][N]=0;
            node_shape[i][N]=0;
            node_weight[i][N]=0;

            adj[N][i]=0, exist_adj[N][i]=0;
            node_color[N][i]=0;
            node_shape[N][i]=0;
            node_weight[N][i]=0;
        }

        draw_vertex(N);
        if(isMst==1){ MST(); }

    }
    else
    {
        if(isMst==1) return;
        if(first_chk_point==-1)
        {
            first_chk_point = neardot;
            context.beginPath();
            context.fillStyle="#FF0000"; 
            context.arc(vertex_wx[neardot], vertex_wy[neardot], vertex_weight[neardot]/3*2, 0,Math.PI*2);
            context.fill();
        }
        else
        {
            second_chk_point = neardot;

            if(first_chk_point==second_chk_point)
            {
                first_chk_point = -1; second_chk_point = -1;
                erasing(); draw_all();
                return;
            }

            var xx = _find(first_chk_point);
            var yy = _find(second_chk_point);

            if(xx==yy)
            {
                first_chk_point = -1; second_chk_point = -1;
                erasing();
                draw_all();
                return;
            }
            if(xx<=yy) _merge(xx,yy);
            else{
                _merge(yy,xx);
                var tmp = first_chk_point;
                first_chk_point = second_chk_point;
                second_chk_point = tmp;
            }

            exist_adj[first_chk_point][second_chk_point] = bidirect;
            adj[first_chk_point][second_chk_point] = 1; /* 추후 node_value로 변경하기..! */
            node_shape[first_chk_point][second_chk_point]=now_node_shape;
            node_color[first_chk_point][second_chk_point]=now_node_color;
            node_weight[first_chk_point][second_chk_point]=now_node_weight;
    
            first_chk_point = -1; second_chk_point = -1;
    
            erasing();
            draw_all();
        }
    }
}
function dbclicking(e)
{  
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");
    /* text 구현하기..! */
}
function nearing(x,y)
{
    var mini = 1000000,midx=-1;
    for( var i = 0; i <= N ; i++ )
    {
        var nx = parseInt(vertex_wx[i]); nx = (nx-x); if(nx<0) nx = -nx;
        var ny = parseInt(vertex_wy[i]); ny = (ny-y); if(ny<0) ny = -ny;
        var nr=parseInt(vertex_weight[i]);
        if(nr*nr<nx*nx+ny*ny) continue;
        if((nx+ny)<mini)
        {
            mini = nx+ny;
            midx = i;
        }
    }
    return midx;
}

function down(e)
{
    var nx = e.offsetX; var ny = e.offsetY;
    var neardot = nearing(nx,ny);
    if(neardot!=-1)
    {
        select_dot = neardot;
        dragging = true;
    }
}
function move(e)
{
    var nx = e.offsetX; var ny = e.offsetY;
    var neardot = nearing(nx,ny);

    if(dragging)
    {
        moving = true;
        vertex_wx[select_dot]=e.offsetX;
        vertex_wy[select_dot]=e.offsetY;
        erasing();
        draw_all();
    }
}

function up(e)
{
    dragging = false;
}
function out(e)
{
    dragging = false;
    moving = false;
    select_dot = -1;
}

function erasing()
{
    var canvas = document.getElementById("drawgraph_canvas");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function draw_vertex(k)
{   
    if(vertex_shape[k]==shape_cir) draw_shape_cir(k);
    else if(vertex_shape[k]==shape_ecir) draw_shape_ecir(k);
    else if(vertex_shape[k]==shape_squ) draw_shape_squ(k);
    else if(vertex_shape[k]==shape_esqu) draw_shape_esqu(k);
}
function draw_shape_cir(k)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle = vertex_color[k];
    context.arc(vertex_wx[k], vertex_wy[k], vertex_weight[k], 0,Math.PI*2);
    context.fill();
}
function draw_shape_ecir(k)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle = vertex_color[k];
    context.arc(vertex_wx[k], vertex_wy[k], vertex_weight[k], 0,Math.PI*2);
    context.fill();

    context.beginPath();
    context.fillStyle = now_canvas_color;
    context.arc(vertex_wx[k], vertex_wy[k], vertex_weight[k]/4*3, 0,Math.PI*2);
    context.fill();
}
function draw_shape_squ(k)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle = vertex_color[k];
    context.fillRect(vertex_wx[k]-vertex_weight[k], vertex_wy[k]-vertex_weight[k],vertex_weight[k]*2, vertex_weight[k]*2 );
}
function draw_shape_esqu(k)
{
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");

    context.beginPath();
    context.fillStyle = vertex_color[k];
    context.fillRect(vertex_wx[k]-vertex_weight[k], vertex_wy[k]-vertex_weight[k],vertex_weight[k]*2, vertex_weight[k]*2 );
    
    context.beginPath();
    context.fillStyle = now_canvas_color;
    context.fillRect(vertex_wx[k]-vertex_weight[k]/4*3, vertex_wy[k]-vertex_weight[k]/4*3,vertex_weight[k]/2*3, vertex_weight[k]/2*3 );
}
