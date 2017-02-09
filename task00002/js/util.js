// task 2.2
// 使用递归来实现一个深度克隆，可以复制一个目标对象，返回一个完整拷贝
// 被复制的对象类型会被限制为数字、字符串、布尔、日期、数组、Object对象。不会包含函数、正则对象等


function cloneObject(src){
    var a;
    if (Object.prototype.toString.call(src) === "[object Array]") {
        var a = [] ;
    }
    else{
        var a = {};
    }

    for(var key in src){
        if(src.hasOwnProperty(key)){
            if (typeof src[key] === "object") { //大写Object,则无法识别出对象
                                                //同 src[key] instanceof Object
                                                //此时Object为大写
                                                //详情可以看12.5日笔记
                a[key] = cloneObject(src[key]);

            }
            else{
                
                a[key] = src[key];
            }

        }
    }

    return a;
}

// 对数组进行去重操作，只考虑数组中元素为数字或字符串，返回一个去重后的数组
function uniqArray(arr) {
    var arrBlank = [];

    //遍历数组
    for(var i in arr){

    	if(arrBlank.indexOf(arr[i]) == -1){

    		arrBlank.push(arr[i]);
    	}
    }

    return arrBlank;
}

// 使用示例
var a = [1, 3, 5, 7, 5, 3];
var b = uniqArray(a);
console.log(b); // [1, 3, 5, 7]



// 中级班同学跳过此题
// 实现一个简单的trim函数，用于去除一个字符串，头部和尾部的空白字符
// 假定空白字符只有半角空格、Tab
// 练习通过循环，以及字符串的一些基本方法，分别扫描字符串str头部和尾部是否有连续的空白字符，并且删掉他们，最后返回一个完成去除的字符串
function simpleTrim(str) {
    for (var i = 0; i < str.length; i++) {  //索引 = 长度 - 1
    	if (str.charAt(i) != '' && str.charAt(i) != '\t') {
    		break;
    	}
    }

    for (var j = str.length - 1 ; j <= 0; j--) {
    	if (str.charAt(j) != '' && str.charAt(j) != '\t') {
    		break
    	}
    }

    return str.slice(i, j-1);
}

// 很多同学肯定对于上面的代码看不下去，接下来，我们真正实现一个trim
// 对字符串头尾进行空格字符的去除、包括全角半角空格、Tab等，返回一个字符串
// 尝试使用一行简洁的正则表达式完成该题目
function trim(str) {
    // your implement
    return str.replace(/^\s+|\s+$/g, ''); //不太懂正则表达式
}

// 使用示例
var str = '   hi!  ';
str = trim(str);
console.log(str); // 'hi!'









// 实现一个遍历数组的方法，针对数组中每一个元素执行fn函数，并将数组索引和元素作为参数传递
function each(arr, fn) {
   for(var i in arr){
   	fn(arr[i], i);
   }
}

// 其中fn函数可以接受两个参数：item和index

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item) {
    console.log(item)
}
each(arr, output);  // java, c, php, html

// 使用示例
var arr = ['java', 'c', 'php', 'html'];
function output(item, index) {
    console.log(index + ': ' + item)
}
each(arr, output);  // 0:java, 1:c, 2:php, 3:html



// 判断是否为邮箱地址
function isEmail(emailStr) {//邮箱:(数字字母,点)的组合,@符号,数字字母,(点,数字字母)
   var emailReg =  /^(\w+\.)*@\w+(\.\w)*$/;
   return emailReg.test(emailStr);

}

// 判断是否为手机号
function isMobilePhone(phone) {
    var phoneReg = /^(\+\d{1,4})?\d{7,11}$/;
    return phoneReg.test(phone)
}




// 为element增加一个样式名为newClassName的新样式
function addClass(element, newClassName) {
    var oldClassName = element.className;

    if (oldClassName === " ") {
    	oldClassName = newClassName;
    }
    else{
    	oldClassName = oldClassName + " " + newClassName;
    }

}

// 移除element中的样式oldClassName
function removeClass(element, oldClassName) {
    var originalClass = element.className;
    var pattern = new RegExp("//b" + oldClassName + "//b");

    return element.className = originalClass.replace(pattern , '');
}

// 判断siblingNode和element是否为同一个父元素下的同一级的元素，返回bool值
function isSiblingNode(element, siblingNode) {
    return element.parentNode === siblingNode.parentNode;
}

// 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
/*
	因为是相对位置

	所以用getBoundingClientRect()即可
	如果计算绝对位置
	才需要scrollLeft/scrollTop


*/
function getPosition(element) {
    var pos = {};

    pos.x = element.getBoundingClientRect().left
    pos.y = element.getBoundingClientRect().top

    return pos ;
}

//接下来挑战一个mini $，它和之前的$是不兼容的，它应该是document.querySelector的功能子集，在不直接使用document.querySelector的情况下，在你的util.js中完成以下任务：

// 实现一个简单的Query
function $(selector) {
    var ele = document;
    var sele = selector.replace(/\s+/, ' ').split(' ');    // 去除多余的空格并分割

    for (var i = 0, len = sele.length; i < len; i++) {

        switch (sele[i][0]) {    // 从子节点中查找
            case '#':
                ele = ele.getElementById(sele[i].substring(1));
                break;
            case '.':
                ele = ele.getElementsByClassName(sele[i].substring(1))[0];
                break;
            case '[':
                var valueLoc = sele[i].indexOf('=');
                var temp = ele.getElementsByTagName('*');
                var tLen = temp.length;
                if (valueLoc !== -1) {
                    var key = sele[i].substring(1, valueLoc);
                    var value = sele[i].substring(valueLoc + 1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key] === value) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                else {
                    var key = sele[i].substring(1, sele[i].length - 1);
                    for (var j = 0; j < tLen; j++) {
                        if (temp[j][key]) {
                            ele = temp[j];
                            break;
                        }
                    }
                }
                break;
            default :
                ele = ele.getElementsByTagName(sele[i])[0];
                break;
        }
    }

    if (!ele) {
        ele = null;
    }

    return ele;
}




//query做不出来...




//4. 事件

//4.1 任务描述

//我们来继续用封装自己的小jQuery库来实现我们对于JavaScript事件的学习，还是在你的util.js，实现以下函数

// 给一个element绑定一个针对event事件的响应，响应函数为listener
function addEvent(element, event, listener) {
    if(element.addEventListener){
        element.addEventListener(event , listener );
    }
    else{
        element.attachEvent(event , listener);
    }
}




// 移除element对象对于event事件发生时执行listener的响应
function removeEvent(element, event, listener) {
    if(element.removeEventListener){
        element.removeEventListener(event , listener);
    }
    else{
        element.detachEvent(event , listener);
    }
}

// 实现对click事件的绑定
function addClickEvent(element, listener) {
    element.addEventListener('click' , listener); //使用了上面写好的方法 增加兼容性
}

// 实现对于按Enter键时的事件绑定
function addEnterEvent(element, listener) {
    addEvent(element, "keydown", function(event) {
        if (event.keyCode == 13) {
            listener();
        }
    });
}

/*我们增加了一个按钮，当点击按钮时，改变list里面的项目，这个时候你再点击一下li，绑定事件不再生效了。
那是不是我们每次改变了DOM结构或者内容后，都需要重新绑定事件呢？当然不会这么笨，接下来学习一下事件代理，
然后实现下面新的方法：*/
//事件代理
//我理解是 element为子元素 tag为父元素 这样的delagation才有意义
function delegateEvent(element,tag,eventName,listener){
    addEvent(element, eventName, function(event){
        var target = event.target || event.srcElement;
        if(target.tagName.toLowerCase() == tag.toLowerCase()) {
            listener.call(target, event);
        }
    });
}

//BOM
//任务与实现：

// 设置cookie

function setCookie(cookieName, cookieValue, expiredays) {
    //encodeURIComponent可把某些字符转成十六进制
    //cookie名称遵循键值规则 中间不能有符号 可以用encode等方法转义
    //cookie内,不同属性之间用分号间隔
    var cookie = cookieName + "=" + encodeURIComponent(cookieValue) + ";" + expiredays; 

    document.cookie = cookie ;
}

// 判断是否为IE浏览器，返回-1或者版本号
function isIE(){ 
    var u_agent = navigator.userAgent; 
    var browser_name= '-1'; 

    if(u_agent.indexOf('Trident')>-1&&u_agent.indexOf('rv:11')>-1){ 
    browser_name='IE11'; 
    }else if(u_agent.indexOf('MSIE')>-1&&u_agent.indexOf('Trident')>-1){ 
    browser_name='IE(8-10)'; 
    }else if(u_agent.indexOf('MSIE')>-1){ 
    browser_name='IE(6-7)'; 
    }else{ 
    browser_name;
    } 

    document.write('browser_name:'+browser_name+'<br>'); 
} 

// 获取cookie值
function getCookie(cookieName) {
    var s_cookie = document.cookie.split(";"); //先将cookie分开

    var a_cookie = s_cookie.split("="); //把cookie拆掉键值对

    for(var key in a_cookie){
        if(a_cookie[key] == "cookieName"){
            return a_cookie[key]        
        }
    }

}

//6.Ajax

//6.1 任务描述

//学习Ajax，并尝试自己封装一个Ajax方法。实现如下方法：

//function ajax(url, options) {
    // your implement
//}

// 使用示例：
/*ajax(
    'http://localhost:8080/server/ajaxtest', 
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            console.log(responseText);
        }
    }
);*/

/*
options是一个对象，里面可以包括的参数为：

type: post或者get，可以有一个默认值
data: 发送的数据，为一个键值对象或者为一个用&连接的赋值字符串
onsuccess: 成功时的调用函数
onfail: 失败时的调用函数
*/

function ajax(url, options) {
    //data 是个对象 根据要求处理成键值对 处理完成后使用send()函数发出

    var dataResult;
    var str = '';
    for(var key in options.data){
       str = str + key + '=' + options.data[key] + '&';
    }
    dataResult = str.substring(0,str.length - 1);

    //处理type
    
    options.type = options.type || 'GET'

    //生成xmlHttpRequest对象
    //问号表示问号前的语句成立与否
    //成立执行冒号前语句,不成立执行冒号后语句
    var xhr = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject('Microsoft.XMLHTTP');

    //发送请求

    xhr.open(options.type, url);
    if (options.type == 'GET') {
        xhr.send(null);
    } else {
        xhr.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
        xhr.send(dataResult);
    }
    

    //任务要求成功后执行onsucess函数,判断成功与否则用到了onreadystatechange函数的两个属性~
    xhr.onreadystatechange = function(){
        if(xhr.readyState == 4 && xhr.status == 200){
            options.onsuccess(xhr.responseText, xhr.responseXML);
        }
        else if(options.onfail){
            options.onfail();
        }
        
        
    }
}


