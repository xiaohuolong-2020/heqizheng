
var stage = new createjs.Stage("starCanvas"); //创建场景
createjs.Ticker.setFPS(60); //设置页面每秒显示60帧
createjs.Ticker.addEventListener("tick", stage);//更新阶段将呈现下一帧

var bitmap,touchTop=0;
var p = new Image(),//用户上传的图片
    bgImg = new Image(),
    temImg = new Image();
    bgImg.src = "images/draw_bg.png";
    temImg.src = "images/draw_bg.png";
    
    window.onload = function () {
        if (createjs.Touch.isSupported()) {
            createjs.Touch.enable(stage, true, false);
        }
        //添加插画背景
        model = new createjs.Bitmap('images/synthesis/synthesis_img1.png');
        model.x = 0;
        model.y = 0;
        stage.addChild(model);

        //用户上传图片
        bitmap = new createjs.Bitmap('images/draw_bg.png');
        bitmap.x = 6;
        bitmap.y = 6;
        stage.addChild(bitmap);
        
        //选择插画，上一页
        $(".btn_prev").click(function(){
            var curNum = $(this).attr("curNum");
            if(curNum==1){
                curNum = 10;
            }else{
                curNum--;
            }
            temImg.src = 'images/synthesis/synthesis_img' + curNum + '.png';
            model.image = temImg;
            $(".btn_prev,.btn_next").attr("curNum",curNum);
        })
        //选择插画，下一页
        $(".btn_next").click(function(){
            var curNum = $(this).attr("curNum");
            if(curNum==10){
                curNum = 1;
            }else{
                curNum++;
            }
            temImg.src = 'images/synthesis/synthesis_img' + curNum + '.png';
            model.image = temImg;
            $(".btn_prev,.btn_next").attr("curNum",curNum);
        })
    
        var dx2, dy2;//文字坐标x,y的定义
        //判断如果是ios需要顺时针旋转90度
        var u = navigator.userAgent, app = navigator.appVersion;
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
        
        //预览图片
        var initialScale;
        window.preview = function (e) {
            var f = e.files[0];
            var reader = new FileReader();//读取文件初始化
            reader.onload = function (e) {
                var src = e.target.result;
                var index = src.indexOf("base64");
                src = "data:image/jpeg;" + src.substring(index, src.length);
                p.src = src;
                var ratio = 1;
                p.onload = function () {
                    $(".btn_synthesis").attr("isUpload","1");
                    //上传照片后需要执行操作
                    $(".btn_upload").hide();
                    
                    if (p.width > 3000) {
                        initialScale = 0.3;//缩放比例
                    }
                    else if (p.width > 1000) {
                        initialScale = 0.5;
                    }
                    else {
                        initialScale = 1;
                    }
                    
                    bitmap.image = p;
                    if (p.width < p.height) {
                        ratio = 789 / p.height;
                        bitmap.x = (640 - p.width * ratio) / 2;
                        if (p.width > 1000) {
                            bitmap.scaleX = bitmap.scaleY = 0.5;
                        }
                        if (p.width > 3000) {
                            bitmap.scaleX = bitmap.scaleY = 0.3;
                        }

                    }
                    else {
                        ratio = 789 / p.width;
                        bitmap.y = (640 - p.height * ratio) / 2;
                        if (p.width > 1000) {
                            bitmap.scaleX = bitmap.scaleY = 0.5;
                        }
                        if (p.width > 3000) {
                            bitmap.scaleX = bitmap.scaleY = 0.3;
                        }
                    }
                    
                     /*控制上传位置居中显示*/
                    bitmap.x = 640 / 2; 
                    bitmap.y = 789 / 2;
                    bitmap.scaleX = ratio;
                    bitmap.scaleY = ratio;
                    bitmap.regX = p.width / 2;
                    bitmap.regY = p.height / 2;
                }
            }
            reader.readAsDataURL(f);

        }
        
        
        var target = document.getElementById("starCanvas");
        //旋转
        var angle = bitmap.rotation;
        touch.on(target, 'touchstart', function (ev) {
            if (ev.fingersCount == 2) {
                ev.startRotate();
            }
            ev.preventDefault();
        });

        //抓取并移动 
        var dx, dy;
        touch.on("#starCanvas", 'drag', function (ev) {
            if (ev.fingersCount == 1) {
                dx = dx || bitmap.x;
                dy = dy || bitmap.y;
                var offx = dx + ev.x;
                var offy = dy + ev.y;
                bitmap.x = offx;
                bitmap.y = offy;
            }
        });

        touch.on("#starCanvas", 'dragend', function (ev) {
            dx += ev.x;
            dy += ev.y;
        });

        //缩放并旋转
        var currentScale;
        touch.on(target, 'pinch', function (ev) {
            angle = bitmap.rotation;
            var totalAngle = angle + ev.rotation;
            if (ev.fingerStatus === 'move') {
                angle = angle + ev.rotation / 40;
                bitmap.rotation = angle;
            }
            currentScale = (ev.scale - 1) / 4;
            currentScale = initialScale + currentScale;
            currentScale = currentScale > 2 ? 1.5 : currentScale;
            currentScale = currentScale < 0 ? 0.4 : currentScale;

            bitmap.scaleX = bitmap.scaleY = currentScale;

        });

        touch.on(target, 'pinchend', function (ev) {
            initialScale = currentScale;
            bitmap.rotation = angle;
        });


    }
// 合成图像
var dataURL;
function saveImage() {
    var canvas = document.getElementById("starCanvas");
    var context = canvas.getContext("2d");
    // 将canvas的透明背景设置成白色   
    var imageData = context.getImageData(0, 0, canvas.width, canvas.height);   
    for(var i = 0; i < imageData.data.length; i += 4) {   
        // 当该像素是透明的，则设置成白色   
        if(imageData.data[i + 3] == 0) {   
            imageData.data[i] = 241;   
            imageData.data[i + 1] = 241;   
            imageData.data[i + 2] = 241;   
            imageData.data[i + 3] = 241;    
        }   
    }   
    context.putImageData(imageData, 0, 0);  
    
    dataURL = canvas.toDataURL("image/jpg"); //用户人像和插画合成图
    $(".tem_synthesis_img").attr("src",dataURL);
    pictureSynthesis();
}