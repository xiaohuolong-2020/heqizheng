// 合成图像
var stage2 = new createjs.Stage("synthesis"); //创建场景
createjs.Ticker.setFPS(60); //设置页面每秒显示60帧
createjs.Ticker.addEventListener("tick", stage2);//更新阶段将呈现下一帧
var nickname,totle=1;

//<!-----------------最终合成图------------------->
function pictureSynthesis(){
	//大背景
	synthesisBg = new createjs.Bitmap("images/bg_synthesis.jpg");
	synthesisBg.x = 0;
	synthesisBg.y = 0;
	stage2.addChild(synthesisBg);
	
	var tem_synthesis_img = $(".tem_synthesis_img").attr("src");
	//用户人像和插画合成图
	templateImg = new createjs.Bitmap(tem_synthesis_img);
	templateImg.x = 235;
	templateImg.y = 273;
	stage2.addChild(templateImg);
	
	//日期
	var dateCon = $(".curDate").html();
	var date = new createjs.Text(dateCon, "30px Microsoft YaHei", "#ad1e14");
	date.x = 354;
	date.y = 167;
	stage2.addChild(date);
	
	//头像
	var head_img = $(".head_img").attr("src");
	var head = new createjs.Bitmap(head_img);
    //可进行图片位移
    head.x = 20;
    head.y = 258;
    head.scaleX = 0.5;
	head.scaleY = 0.5;
    //创建圆形
    var circle = new createjs.Shape();
    circle.graphics.beginFill().drawCircle(70, 308, 50); //圆心的X坐标，Y坐标，半径
    stage2.addChild(head);
    stage2.addChild(circle);
    //进行遮罩处理
    head.mask = circle;
	
	//态度文案
	var attitudeImg = $(".step3_select2").attr("src");
	attitudeTxt = new createjs.Bitmap(attitudeImg);
	attitudeTxt.x = 60;
	attitudeTxt.y = 276;
	stage2.addChild(attitudeTxt);

	var canvas = document.getElementById("synthesis");
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
						$(".synthesis_save").attr("src",img.src);
						$(".page_step3").fadeOut(800);
						$(".page_step4").fadeIn(800);
						console.log(img.src)
					}
			}
			img.src=imgurl; 
		},1000);
		//end

	},700);

	
}