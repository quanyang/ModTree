$(function() {
    connect('CS1010','CS1020',"#888","1");
    connect('CS1020','CS2010',"#888","1");
    connect('CS1020','CS2020',"#888","1");
    $( ".moduleBlock" ).draggable({ containment: "parent", drag: function(e){ redrawLine(e) },stop: function(e){redrawLine(e)}
    });
  });

function redrawLine(e){
            var dblock = e['target'].getAttribute('id');
             if ($('.connect.'+dblock).length){
                 $.each($('.connect.'+dblock),function(key,value){
                var clas = value.getAttribute('class'); 
                dblock = clas.split(" ")[2];
                clas = clas.split(" ")[1];
                
                var off1 = getOffset(document.getElementById(clas));
                var off2 = getOffset(document.getElementById(dblock));
                // bottom right
                var x1 = off1.left + off1.width/2;
                var y1 = off1.top + off1.height + $("body").scrollTop()-1;
                // top right
                var x2 = off2.left + off2.width/2;
                var y2 = off2.top  + $("body").scrollTop();
                // distance
                var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
                // center
                var cx = ((x1 + x2) / 2) - (length / 2);
                var cy = ((y1 + y2) / 2) - (1 / 2);
                // angle
                var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
                $('.connect.'+dblock).css({"left":cx,"top":cy,"width":length,"-moz-transform":"rotate(" + angle + "deg)","-webkit-transform":"rotate(" + angle + "deg)", "-o-transform":"rotate(" + angle + "deg)", "-ms-transform":"rotate(" + angle + "deg)","transform":"rotate(" + angle + "deg)"});
                 });
}
}

function getOffset( el ) { // return element top, left, width, height
    var _x = 0;
    var _y = 0;
    var _w = el.offsetWidth|0;
    var _h = el.offsetHeight|0;
    while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        _x += el.offsetLeft - el.scrollLeft;
        _y += el.offsetTop - el.scrollTop;
        el = el.offsetParent;
    }
    return { top: _y, left: _x, width: _w, height: _h };
}

function connect(div1, div2, color, thickness) { // draw a line connecting elements
    var off1 = getOffset(document.getElementById(div1));
    var off2 = getOffset(document.getElementById(div2));
    // bottom right
    var x1 = off1.left + off1.width/2;
    var y1 = off1.top + off1.height + $("body").scrollTop()-1;
    // top right
    var x2 = off2.left + off2.width/2;
    var y2 = off2.top  + $("body").scrollTop();
    // distance
    var length = Math.sqrt(((x2-x1) * (x2-x1)) + ((y2-y1) * (y2-y1)));
    // center
    var cx = ((x1 + x2) / 2) - (length / 2);
    var cy = ((y1 + y2) / 2) - (thickness / 2);
    // angle
    var angle = Math.atan2((y1-y2),(x1-x2))*(180/Math.PI);
    // make hr
    var htmlLine = "<div class='connect "+div1+" "+div2+"' style='padding:0px; margin:0px; height:" + thickness + "px; background-color:" + color + "; line-height:1px; position:absolute; left:" + cx + "px; top:" + cy + "px; width:" + length + "px; -moz-transform:rotate(" + angle + "deg); -webkit-transform:rotate(" + angle + "deg); -o-transform:rotate(" + angle + "deg); -ms-transform:rotate(" + angle + "deg); transform:rotate(" + angle + "deg);' />";
    //
    // alert(htmlLine);
    $("body").append(htmlLine);
}