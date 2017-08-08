window.onload=function(){
    var slideShow=document.getElementById("slide-show");
    var imgList=document.getElementById("imgList");
    var prev=document.getElementById("prev");
    var next=document.getElementById("next");
    var btn=document.getElementsByClassName("slide-show-btn")[0].getElementsByTagName("span");
    var timer=null; //定义定时器
    var index=1;

    /**轮播的动画效果----函数 */
    function animate(offset){
        var currentLeft=parseInt(imgList.style.left);
        var newLeft=currentLeft+offset;
        imgList.style.left=newLeft+'px';
        if(newLeft<-2400){ //next到最后一张图后，马上转回到第一张图片
            imgList.style.left=-600+'px';
        }
        if(newLeft>-600){//prev到第一张图后，马上转回到最后一张图片
            imgList.style.left=-2400+'px';
        }
    }

    /**自动轮播效果-----函数 */
    function play(){
        timer=setInterval(function(){
          animate(-600);
          index++;
          if(index>4){
              index=1;
          }
          btnAnimate(); 
        },3000);
    }
    /**停止自动轮播效果-----函数 */
    function stop(){
        clearInterval(timer);
    }

    function btnAnimate(){
        for(var i=0;i<btn.length;i++){
            if(btn[i].className=="on"){
                btn[i].className="";
            }
        }
        btn[index-1].className="on";
    }


    play();  //自动轮播

    /**点击next和prev按钮 */
    prev.onclick=function(){
        index--;
        if(index<1){
            index=4;
        }
        btnAnimate();
        animate(600);
    }
    next.onclick=function(){
        index++;
        if(index>4){
            index=1;
        }
        btnAnimate();
        animate(-600);
    }

    /*当鼠标放在图片上时，清除定时器（停止轮播）*/
    /*当鼠标离开图片上时，设定定时器（重新开始轮播）*/
    slideShow.onmouseover=function(){
        stop();
    }
    slideShow.onmouseout=function(){
        play();
    }

    for(var i=0;i<btn.length;i++){
        (function(i){
            btn[i].onclick=function(){
            // console.log(i+1);
            // var clickIndex= parseInt(this.getAttribute('index'));
            var clickIndex=i+1;
            var offset=600*(index-clickIndex);
            index=clickIndex;
            animate(offset); 
            btnAnimate();
        }
        })(i);
    }

}