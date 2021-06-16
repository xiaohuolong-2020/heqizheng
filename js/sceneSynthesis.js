// 合成图像
var stage3 = new createjs.Stage("sceneSynthersis"); //创建场景
createjs.Ticker.setFPS(60); //设置页面每秒显示60帧
createjs.Ticker.addEventListener("tick", stage3);//更新阶段将呈现下一帧

//<!-----------------最终合成图------------------->
function sceneSynthesis(curNum){
	//大背景
	synthesisBg = new createjs.Bitmap("images/scene/scene_"+curNum+".jpg");
	synthesisBg.x = 0;
	synthesisBg.y = 0;
	stage3.addChild(synthesisBg);
	
	//用户编辑页合成图
	var synthesis_img = $(".synthesis_img"+curNum).attr("src");
	synthesisImg = new createjs.Bitmap(synthesis_img);
	synthesisImg.x = 63;
	synthesisImg.y = 170;
	synthesisImg.scaleX = 0.64;
	synthesisImg.scaleY = 0.64;
	synthesisImg.rotation = -5;
	stage3.addChild(synthesisImg);


	//遮罩
	var mask = $(".mask").attr("src");
	maskImg = new createjs.Bitmap(mask);
	maskImg.x = 63;
	maskImg.y = 170;
	maskImg.rotation = -5;
	stage3.addChild(maskImg);

	//装饰1
	maskImg = new createjs.Bitmap('images/scene/decorate_01.png');
	maskImg.x = 63;
	maskImg.y = 170;
	maskImg.rotation = -5;
	stage3.addChild(maskImg);

	//装饰1
	maskImg = new createjs.Bitmap('images/scene/decorate_02.png');
	maskImg.x = 63;
	maskImg.y = 170;
	maskImg.rotation = -5;
	stage3.addChild(maskImg);


	
	// //日期
	// var dateCon = $(".curDate").html();
	// var date = new createjs.Text(dateCon, "30px Microsoft YaHei", "#ad1e14");
	// date.x = 354;
	// date.y = 167;
	// stage3.addChild(date);
	
	// //头像
	// var head_img = $(".head_img").attr("src");
	// var head = new createjs.Bitmap(head_img);
 //    //可进行图片位移
 //    head.x = 20;
 //    head.y = 258;
 //    head.scaleX = 0.5;
	// head.scaleY = 0.5;
 //    //创建圆形
 //    var circle = new createjs.Shape();
 //    circle.graphics.beginFill().drawCircle(70, 308, 50); //圆心的X坐标，Y坐标，半径
 //    stage3.addChild(head);
 //    stage3.addChild(circle);
 //    //进行遮罩处理
 //    head.mask = circle;
	
	// //态度文案
	// var attitudeImg = $(".step3_select2").attr("src");
	// attitudeTxt = new createjs.Bitmap(attitudeImg);
	// attitudeTxt.x = 60;
	// attitudeTxt.y = 276;
	// stage3.addChild(attitudeTxt);

	var canvas = document.getElementById("sceneSynthersis");
	var context = canvas.getContext("2d");
	var n=0;
	setTimeout(function(){
		var dataurl = canvas.toDataURL("image/jpeg",0.8);//dataurl： 后台获取base64图片
		
		//以下代码需要接口返回图片地址后执行
		var imgurl = dataurl;  //后台接口返回的图片
		setTimeout(function(){
			var img = new Image();
			img.onload =function () {
				//判断是返回无法加载的图片重新在加载图片，直到加载成功
					if(img.width==120){
						setTimeout(function(){
							img.src=imgurl+"?r="+Math.random();
						},1000);
					}else{
						$(".scene_synthesis").attr("src",img.src);
						$(".page_step4").fadeOut(800);
						$(".page_step5").fadeIn(800);
						console.log(img.src)
					}
			}
			img.src=imgurl; 
		},1000);
		//end

	},700);

	
}