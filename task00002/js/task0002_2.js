/*
	先获取当下的时间 curTime() 格式为 YYYY年-MM月-DD日-HH时-MM分-SS秒
	再用定时器 每隔一秒刷新curTime() 获得动态时间dyTime
	var dyTime = setTimeout(curTime(), 1000)
	再拿用户输入的时间YYYY年-MM月-DD日,手动添加上0时-0分-0秒
*/

//2017-01-08-12-57-33								//系统时间
//2017-01-09-00-00-00 -- 2017-01-08-23-59-59		//目标时间

//若目标时间<系统时间 则show: 输入年份必须在未来~~
//若目标时间>系统时间
	//若目标时间(年) > 系统时间(年)
		//若目标时间(月) > 系统时间(月)

		var clock;
var btn = document.getElementById('btn');
addEvent(btn, "click", function() {
    
    clearInterval(clock);
    
    var showDiv = document.getElementById('show');
    var inputValue = document.getElementById('ipt').value;
    var pattern = /^\d{4}-((0[1-9])|(1[0-2]))-((0[1-9])|([1-2]\d)|(3[0-1]))$/; //判断时间格式

    if (pattern.test(inputValue)) {
        console.log("right");
        var futureTime = new Date(inputValue.replace("-", "/"));
        var futureTimeArr = inputValue.split("-");

        clock = setInterval(count, 900);

        function count() {
            var currentTime = new Date();
            console.log(futureTime);
            console.log(currentTime);
            var gap = futureTime - currentTime;
            if (gap < 0) {
                clearInterval(clock);
                showDiv.innerHTML = "请输入未来的某一天";
                return;
            } else if (gap === 0) {
                clearInterval(clock);
                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有0天0小时0分0秒";
                return;
            } else { //倒计时开始
                var day = Math.floor(gap / 1000 / 3600 / 24);
                var hour = Math.floor(gap % (1000 * 3600 * 24) / (3600 * 1000));
                var minute = Math.floor(gap % (1000 * 3600 * 24) % (3600 * 1000) / (60 * 1000));
                var second = Math.floor(gap % (1000 * 3600 * 24) % (3600 * 1000) % (60 * 1000) / 1000);
                console.log(day + "  " + hour + "   " + minute + "   " + second);

                showDiv.innerHTML = "距离" + futureTimeArr[0] + "年" + futureTimeArr[1] + "月" + futureTimeArr[2] + "日还有" + day + "天" + hour + "小时" + minute + "分" + second + "秒";
            }
        }
    } else {
        showDiv.innerHTML = "请检查输入格式";
    }
});