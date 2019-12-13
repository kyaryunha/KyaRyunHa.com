/* ===================================================================
 * 05. drawgraph
 *
 * ------------------------------------------------------------------- */
var N=-1,M=-1;

var now_canvas_color;
var vertex_wx = [], vertex_wy = [];
var bidirect = 1;

var adj = [];


/* -----------------------------------------------*/
var text_mode=0;
var now_text_weight = 15;
var now_text_color = "#FF0000";

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

var now_vertex_weight=12;
var now_node_weight=2;

var now_vertex_color="#000000";
var now_node_color="#0000FF";

var now_direct_true=1;

/* -----------------------------------------------*/

var vertex_shape = []; /* 1 : 기존 정점 모양 */
var node_shape = []; /* 1 : 기존 간선 모양 */

var vertex_weight = [];
var node_weight = [];

var vertex_color = [];
var node_color = [];

/* -----------------------------------------------*/

var canvas_x,canvas_y;

var vertex_numbering;

function drawgraph_graphicgraph()
{
    newPan();

    append_menu_canvas();
    append_menu_text();
    append_menu_vertex();
    append_menu_node();

    append_aremenu_nowneardot();
    append_aremenu_downloading();
    // append_aremenu_uploading();
}
function newPan()
{
    var pan = document.getElementById("drawgraph_pan"); pan.innerHTML="";

    var ntable = document.createElement("table");
    ntable.id="drawgraph_menu";
    pan.appendChild(ntable);

    var ncanvas = document.createElement("canvas");
    ncanvas.innerHTML="캔버스가 지원되지 않는 브라우저입니다. 다른 브라우저로 접속해주세요.";
    ncanvas.id="drawgraph_canvas";
    /*ncanvas.width = (window.innerWidth)*0.99-((window.innerWidth)*0.99%10);
    ncanvas.height = (window.innerHeight)*0.7-((window.innerHeight)*0.7%10);*/
    ncanvas.width = 500;
    ncanvas.height = 500;
    ncanvas.style.background = "white";
    now_canvas_color = "white";
    canvas_x = ncanvas.width; canvas_y = ncanvas.height;
    pan.appendChild(ncanvas);
    canvas_init();

    var aretable = document.createElement("table");
    aretable.id="drawgraph_aremenu";
    pan.appendChild(aretable);

}
function append_menu_canvas()
{
    var menu_table = document.getElementById("drawgraph_menu");
    var canvas = document.getElementById("drawgraph_canvas");
    var canvas_menu = document.createElement("td");
    canvas_menu.style.color = "white";
    canvas_menu.style.background = "#505050";

    var xy_menu_title = document.createElement("tr");
    xy_menu_title.innerHTML = "<span id=\"menu_title\">Canvas</span>";
    canvas_menu.appendChild(xy_menu_title);

    var xlenTd = document.createElement("td");
    var cwidth = canvas.scrollWidth;
    xlenTd.innerHTML+="<span id=\"menu_contents\"> Size <input type=\"number\" id=\"xlen\" min=\"100.0\" max = \"1500.0\" step=\"10.0\" value ="+cwidth+"></span>";
    xlenTd.getElementsByTagName('input')[0].addEventListener('input', function(e){
        canvas_x = parseInt(this.value);
        change_canvas_size(canvas_x,canvas_y);
    }); 
    canvas_menu.appendChild(xlenTd);


    var ylenTd = document.createElement("td");
    var cheight = canvas.scrollHeight;
    ylenTd.innerHTML+="<span id=\"menu_contents\"> x <input type=\"number\" id=\"ylen\" min=\"100.0\" max = \"1500.0\" step=\"10.0\" value ="+cheight+"></span>";
    ylenTd.getElementsByTagName('input')[0].addEventListener('input', function(e){
        canvas_y = parseInt(this.value);
        change_canvas_size(canvas_x,canvas_y);
    });
    canvas_menu.appendChild(ylenTd);

    var canvas_colorTd = document.createElement("td");
    canvas_colorTd.innerHTML+="<span id=\"menu_contents\"> Color <input id=\"input_color\" type=\"color\" value=\"#FFFFFF\"></span>";
    canvas_colorTd.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_canvas_color = this.value;

        var target = document.getElementById("drawgraph_vertexkind");
        target.style.background = now_canvas_color;
        for( var i=0 ; i<target.options.length ; i++ )
            target.options[i].style.background = now_canvas_color;

        var target2 = document.getElementById("drawgraph_nodekind");
        target2.style.background = now_canvas_color;
        for( var i=0 ; i<target2.options.length ; i++ )
            target2.options[i].style.background = now_canvas_color;
        canvas.style.background = now_canvas_color;
        erasing();
        draw_all();
    });
    canvas_menu.appendChild(canvas_colorTd);

    menu_table.appendChild(canvas_menu);
}
function change_canvas_size(xlen,ylen)
{
    var canvas = document.getElementById("drawgraph_canvas");
    canvas.width = xlen;
    canvas.height = ylen;
    draw_all();
}

function append_menu_text(){
    var menu_table = document.getElementById("drawgraph_menu");
    var text_menu = document.createElement("td");
    text_menu.style.color = "white";
    text_menu.style.background = "#505050";

    var text_menu_title = document.createElement("tr");
    text_menu_title.innerHTML = "<span id=\"menu_title\">Text</span>";
    text_menu.appendChild(text_menu_title);

    var textmode = document.createElement("td");
    textmode.innerHTML+="<span id=\"menu_contents\"> Write <button id=\"textmode_button\" onclick=\"javascript:change_textmode()\">Off</button> </span>";
    text_menu.appendChild(textmode);

    var textsize = document.createElement("td");
    textsize.innerHTML+="<span id=\"menu_contents\"> Size <input type=\"number\" id=\"textsize\" min=\"1.0\" max = \"30.0\" step=\"1.0\" value ="+now_text_weight+"></span>";
    textsize.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_text_weight = parseInt(this.value);
    });
    text_menu.appendChild(textsize);

    var textcolor = document.createElement("td");
    textcolor.innerHTML+="<span id=\"menu_contents\"> Color <input id=\"input_color\" type=\"color\" value=#FF0000></span>";
    textcolor.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_text_color = this.value;
        var target = document.getElementById("drawgraph_textsize");
        target.style.color = now_text_color;
    });
    text_menu.appendChild(textcolor);

    menu_table.appendChild(text_menu);
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
function append_menu_vertex()
{
    var menu_table = document.getElementById("drawgraph_menu");
    var vertex_menu = document.createElement("td");
    vertex_menu.style.color = "white";
    vertex_menu.style.background = "#505050";
    
    var vertex_menu_title = document.createElement("tr");
    vertex_menu_title.innerHTML = "<span id=\"menu_title\">Vertex</span>";
    vertex_menu.appendChild(vertex_menu_title);

    var vertexkind = document.createElement("td");
    vertexkind.innerHTML+="<span id=\"menu_contents\"> Kind <select id=\"drawgraph_vertexkind\" style = \"background-color : now_canvas_color\" ><option value=1 selected>●</option><option value=2>○</option><option value=3>■</option><option value=4>□</option></select></span>"
    vertexkind.getElementsByTagName('select')[0].addEventListener('change', function(e){
        now_vertex_shape = parseInt(this.value);
    });
    vertex_menu.appendChild(vertexkind);

    var vertexsize = document.createElement("td");
    vertexsize.innerHTML+="<span id=\"menu_contents\"> Size <input type=\"number\" id=\"vertexsize\" min=\"1.0\" max = \"30.0\" value ="+now_vertex_weight+"></span>";
    vertexsize.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_vertex_weight = parseInt(this.value);
    });
    vertex_menu.appendChild(vertexsize);

    var vertexcolor = document.createElement("td");
    vertexcolor.innerHTML+="<span id=\"menu_contents\"> Color <input id=\"input_color\" type=\"color\" value=\"#000000\"></span>";
    vertexcolor.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_vertex_color = this.value;
        var target = document.getElementById("drawgraph_vertexkind");
        target.style.color = now_vertex_color;
        for( var i=0 ; i<target.options.length ; i++ )
            target.options[i].style.color = now_vertex_color;
    });
    vertex_menu.appendChild(vertexcolor);

    menu_table.appendChild(vertex_menu);

}

function append_menu_node()
{
    var menu_table = document.getElementById("drawgraph_menu");
    var node_menu = document.createElement("td");
    node_menu.style.color = "white";
    node_menu.style.background = "#505050";

    var node_menu_title = document.createElement("tr");
    node_menu_title.innerHTML = "<span id=\"menu_title\">Node</span>";
    node_menu.appendChild(node_menu_title);

    var nodekind = document.createElement("td");
    nodekind.innerHTML+="<span id=\"menu_contents\"> Kind <select id=\"drawgraph_nodekind\" style = \"background-color : now_canvas_color\"><option value=1 selected> ― </option><option value=2> … </option></select></span>";
    nodekind.getElementsByTagName('select')[0].addEventListener('change', function(e){
        now_node_shape = parseInt(this.value);
        console.log(now_node_shape);
    });
    node_menu.appendChild(nodekind);

    var nodesize = document.createElement("td");
    nodesize.innerHTML+="<span id=\"menu_contents\"> Size <input type=\"number\" id=\"nodesize\" min=\"1.0\" max = \"30.0\" step=\"0.5\" value ="+now_node_weight+"></span>";
    nodesize.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_node_weight = parseInt(this.value);
    });
    node_menu.appendChild(nodesize);

    var nodecolor = document.createElement("td");
    nodecolor.innerHTML+="<span id=\"menu_contents\"> Color <input id=\"input_color\" type=\"color\" value=\"#0000FF\"></span>";
    nodecolor.getElementsByTagName('input')[0].addEventListener('input', function(e){
        now_node_color = this.value;
        var target = document.getElementById("drawgraph_nodekind");
        target.style.color = now_node_color;
        for( var i=0 ; i<target.options.length ; i++ )
            target.options[i].style.color = now_node_color;
    });
    node_menu.appendChild(nodecolor);

    /* var nodedirect = document.createElement("td");
    nodedirect.innerHTML+="<span id=\"menu_contents\"> Direct <select name=\"drawgraph_nodedirect\"><option value=\"1\" selected>bi-direct</option><option value=\"2\">-></option><option value=\"3\"><-></option></select></span>";
    nodedirect.getElementsByTagName('select')[0].addEventListener('change', function(e){
        bidirect = parseInt(this.value);
    });
    node_menu.appendChild(nodedirect);*/

    menu_table.appendChild(node_menu); 

    var nodekind_initing = document.getElementById("drawgraph_nodekind");
    nodekind_initing.style.color = now_node_color;
    for( var i=0 ; i<nodekind_initing.options.length ; i++ )
        nodekind_initing.options[i].style.color = now_node_color;
}


function append_aremenu_nowneardot()
{
    var menu_table = document.getElementById("drawgraph_aremenu");
    var neartd = document.createElement("td");
    neartd.style.color = "white";
    neartd.style.background = "#505050";
    neartd.style.width = "450px";
    neartd.innerHTML+="<span id=\"menu_contents\"><span id=\"now_location\">&nbsp;Mouse Location : </span><span id =\"neartd\"></span></span>";
    menu_table.appendChild(neartd);
}
function append_aremenu_downloading()
{
    var menu_table = document.getElementById("drawgraph_aremenu");
    var downloading = document.createElement("td");
    downloading.style.color = "white";
    downloading.style.background = "#505050";
    downloading.innerHTML = "<span id=\"menu_title\">&nbsp;Download</span>";
    downloading.innerHTML += "<a class = \"download_link\" download=\"Graph.jpg\" onclick=\"download_img(this);\"> Image </a>";
    downloading.innerHTML += "<a class = \"download_link\" download=\"Graph.txt\" onclick=\"download_txt(this);\"> Text </a>";

    menu_table.appendChild(downloading);
}
/*
function append_aremenu_uploading()
{
    var menu_table = document.getElementById("drawgraph_aremenu");
    var upload_menu = document.createElement("td");
    upload_menu.style.color = "white";
    upload_menu.style.background = "#505050";
    upload_menu.innerHTML = "<span id=\"menu_title\">&nbsp;Upload</span>";

    upload_menu.innerHTML+="<span id=\"menu_contents\"> Text <input id=\"input_json\" type=\"file\" accept=\"txt\"></span>";
    menu_table.appendChild(upload_menu);
    input_json.getElementsByTagName('input')[0].addEventListener('change', function(e){

    });
}
*/
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

function change_canvas_color(){}

function draw_all(){
    var canvas = document.getElementById("drawgraph_canvas");
    var context = canvas.getContext("2d");


    context.fillStyle=now_canvas_color;
    context.fillRect(0, 0, canvas_x, canvas_y);

    /* node draw */
    for(var i = 0; i <= N ; i++ )
    {
        for(var j = 0; j <= N ; j++ )
        {
            if(exist_adj[i][j]>=2)
            {
                context.beginPath();
                context.setLineDash([node_weight[i][j],0]);
                context.strokeStyle=node_color[i][j];
                context.lineWidth=node_weight[i][j];
                context.moveTo(vertex_wx[j],vertex_wy[j]);
                context.lineTo(vertex_wx[j],vertex_wy[j]);
                context.stroke();
            }
            if(exist_adj[i][j]==0||(exist_adj[i][j]==2&&i>j)) continue;
            if(node_shape[i][j]==1) /* 실선 */
            {
                context.beginPath();
                context.setLineDash([node_weight[i][j],0]);
                context.strokeStyle=node_color[i][j];
                context.lineWidth=node_weight[i][j];
                context.moveTo(vertex_wx[i],vertex_wy[i]);
                context.lineTo(vertex_wx[j],vertex_wy[j]);
                context.stroke();
            }
            else if(node_shape[i][j]==2) /* 점선 */
            {
                context.beginPath();
                context.setLineDash([node_weight[i][j],node_weight[i][j]]);
                context.strokeStyle=node_color[i][j];
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

    }
    else
    {

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
    
            exist_adj[first_chk_point][second_chk_point] = bidirect;
            adj[first_chk_point][second_chk_point] = 1; /* 추후 node_value로 변경하기..! */
            node_shape[first_chk_point][second_chk_point]=now_node_shape;
            node_color[first_chk_point][second_chk_point]=now_node_color;
            node_weight[first_chk_point][second_chk_point]=now_node_weight;
    
            if(bidirect==1||bidirect==3)
            {
                exist_adj[second_chk_point][first_chk_point] = bidirect;
                adj[second_chk_point][first_chk_point] = 1; /* 추후 node_value로 변경하기..! */
                node_shape[second_chk_point][first_chk_point]=now_node_shape;
                node_color[second_chk_point][first_chk_point]=now_node_color;
                node_weight[second_chk_point][first_chk_point]=now_node_weight;
            }        
    
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

    if(!dragging)
    {
        var explain = document.getElementById("now_location");
        var neartd =  document.getElementById("neartd"); 
        if(neardot!=-1)
        {
            neartd.style.color = "yellow";
            explain.innerHTML = "&nbsp;Mouse Pointing : ";
            neartd.innerHTML = " ( x : ";
        
            var xlen = vertex_wx[neardot].toString().length;
            for(var i=0; i<=3-xlen;i++) neartd.innerHTML+="&nbsp;";
            neartd.innerHTML += vertex_wx[neardot].toString();

            neartd.innerHTML += " y : ";
            var ylen = vertex_wy[neardot].toString().length;
            for(var i=0; i<=3-ylen;i++) neartd.innerHTML+="&nbsp;";
            neartd.innerHTML += vertex_wy[neardot].toString();
            neartd.innerHTML +=" ) ";

            neartd.innerHTML += "&nbsp;no."+"<span style=\" color : #00FF00 \">"+neardot+"</span>";

            neartd.innerHTML += "&nbsp; size : ";
            var rlen = vertex_weight[neardot].toString().length;
            for(var i=0; i<=2-rlen;i++) neartd.innerHTML+="&nbsp;"; neartd.innerHTML += vertex_weight[neardot].toString();
          
        }
        else
        {
            neartd.style.color = "#FFFFFF";
            explain.innerHTML = "&nbsp;Mouse Location : ";
            neartd.innerHTML = " ( x : ";
        
            var xlen = nx.toString().length;
            for(var i=0; i<=3-xlen;i++) neartd.innerHTML+="&nbsp;";
            neartd.innerHTML += nx.toString();

            neartd.innerHTML += " y : ";
            var ylen = ny.toString().length;
            for(var i=0; i<=3-ylen;i++) neartd.innerHTML+="&nbsp;";
            neartd.innerHTML += ny.toString();
            neartd.innerHTML +=" ) ";
        }
    }
    else
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
    
    var neartd = document.getElementById("neartd");
    neartd.innerHTML="&nbsp;";
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