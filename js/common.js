$(function(){
	//锁定屏幕
	// var t=function(e){
	// 	e.preventDefault();
	// }
	// window.addEventListener('touchmove',t,false);
	
	//报纸开启
	$(".btn_open").click(function(){
		$(".step1_icon").fadeOut(200)
		$(".step1_newspaper").addClass("newspaper_a");
		var time1 = setTimeout(function(){
			$(".page_step1").fadeOut(500);
			$(".page_step2").fadeIn(500);
			$(".step2_newspaper").addClass("newspaper_show");
			$(".step2_product").addClass("product_show");
			clearTimeout(time1)
		},600)
	});

	//拍出中国范
	$(".btn_photo").click(function(){
		$(".page_step2").fadeOut(500)
		$(".page_step3").fadeIn(500)
	})
	//获取当前日期
	$(".curDate").html(getCurrentDate());

	
	//上传照片判断
	$(".btn_synthesis").click(function(){
		if($(".btn_synthesis").attr("isUpload")==0){
			alert("请先上传照片！");
			return false;	
		}else if($(".step3_select2").attr("src")=='images/draw_bg.png'){
			alert("请选择您的态度！");	
			return false;	
		}else{
			saveImage();//海报合成中
		}
	});


    //选择您的态度
    $("select").change(function(){
    	var num = $(this).val()
        $(".step3_select2").attr("src",'images/attitude/txt_'+num+'.png');
        $(".select_default").hide();
    });

	
	//返回
	$(".btn_return").click(function(){
		$(".page_step4").fadeOut(500); 
		$(".page_step3").fadeIn(500); 
	});
	

	//选择场景，上一页
	$(".btn_prev2").click(function(){
		var curNum = $(this).attr("curNum");
		if(curNum==1){
			curNum = 5;
		}else{
			curNum--;
		}
		$(".scene").each(function(){
			$(this).fadeOut(500);
		})
		$(".scene_"+curNum).fadeIn(500).attr("src","images/scene/scene_"+curNum+".png");
		$(".btn_prev2,.btn_next2").attr("curNum",curNum);
	})
	//选择场景，下一页
	$(".btn_next2").click(function(){
		var curNum = $(this).attr("curNum");
		if(curNum==5){
			curNum = 1;
		}else{
			curNum++;
		}
		$(".scene").each(function(){
			$(this).fadeOut(500);
		})
		$(".scene_"+curNum).fadeIn(500).attr("src","images/scene/scene_"+curNum+".png");
		$(".btn_prev2,.btn_next2").attr("curNum",curNum);
	})

	
	//确认场景
	$(".btn_sceneOK").click(function(){
		var curNum = $(".btn_next2").attr("curNum")
		sceneSynthesis(curNum);//场景合成调用
	});
	
	$(".btn_close").click(function(){
		Dialog.close();
		window.addEventListener('touchmove',t,false);
	});
	
	//分享指引
	$(".btn_share").click(function(){
		Dialog.showDiv("j_hopup_share");
		
		$("#j_hopup_share").click(function(){
			Dialog.close();
		});
	});
	
	//保存到相册
	$(".btn_save").click(function(){
		
	});
	
});
//弹窗调用
var Dialog={
	showDiv:function(Dsobj,mask){
		if(Dsobj===null || Dsobj===undefined){alert("参数未定义！");return false;}
		if(mask==true||mask==undefined){Dialog.showMask();}
		jQuery(".layerbox").hide();
		$Dsobj=jQuery("#"+Dsobj);
		$Dsobj.stop();
		var wHeight = jQuery(parent.window).height();
		var scrollTop = jQuery(parent.window).scrollTop();
		var oHeight = $Dsobj.css("height").replace(/px/,'')/2
		var offsetHeight = wHeight/2+scrollTop - oHeight;
		if(offsetHeight < 0) offsetHeight = 0;
		var w = $Dsobj.css("width");	
		var marginleft = w.replace(/px/,'')/2;
		$Dsobj.addClass("layerbox");
		$Dsobj.css({"position":"absolute","left": "50%","z-index":"100","margin-left":-marginleft});
		
		$Dsobj.css("top",offsetHeight).show()

		jQuery('.close_btn').unbind();
		jQuery('.close_btn').bind('click', function(){Dialog.close();})
		return false;
	},
	showMask : function(){
		var height = jQuery(document).height();
		jQuery("body").append("<div style='background:#000; display:none; filter:alpha(opacity=85);opacity: 0.85; z-index:99;  width:100%;  position:absolute; left:0; top:0;'  id='bgdiv'></div>");
		jQuery("#bgdiv").css("height",height+1);
		jQuery("#bgdiv").fadeIn();
	},
	close : function(){
		jQuery(".layerbox").hide()
		jQuery("#bgdiv").fadeOut(function(){jQuery("#bgdiv").remove();});
	}
}
//获取当前日期
function getCurrentDate() {
      var myDate = new Date();
      var year = myDate.getFullYear(); //年
      var month = myDate.getMonth() + 1; //月
      var day = myDate.getDate(); //日
      var days = myDate.getDay();
      switch(days) {
            case 1:
                  days = '星期一';
                  break;
            case 2:
                  days = '星期二';
                  break;
            case 3:
                  days = '星期三';
                  break;
            case 4:
                  days = '星期四';
                  break;
            case 5:
                  days = '星期五';
                  break;
            case 6:
                  days = '星期六';
                  break;
            case 0:
                  days = '星期日';
                  break;
      }
      var str = year + "年" + month + "月" + day + "日/" + days;
      return str;
}