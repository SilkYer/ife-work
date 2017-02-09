	var btn = document.getElementById('btn');

	btn.addEventListener('click', function(){
		var content = document.getElementById('text').value;
		var contentArr = content.split(/\n|\s+|,|，|;|；|、/);//此内容无法去重,但已经是数组了

		var contentArr2 = [];
		for(var key in contentArr){
			if (contentArr2.indexOf(contentArr[key]) == -1 ) {
				contentArr2.push(contentArr[key]); //此处contentArr2已成功去重
		}
	
	}

		//处理点击事件了
		var warnDiv = document.getElementById('warning');
		var showDiv = document.getElementById('showing');
		var showDivStr = '';
		if (contentArr2 == '' || contentArr2.length >10) {
			warnDiv.style.display = "block";
		}
		else{

			for(var key in contentArr2){
				showDivStr += '<br><input type="checkbox"><label>' + contentArr2[key] + '</label>'
			}
		}
		
		showDiv.innerHTML = showDivStr;
	})

