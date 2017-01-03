var wilddogData = {
	//配置信息
	config:{
		authDomain: "shadow.wilddog.com",
		syncURL: "https://shadow.wilddogio.com" //输入节点 URL
	},
	//写入数据
	wirteData: function(path,key,value){
		wilddog.initializeApp(this.config);
		var ref = wilddog.sync().ref(path);
		ref.child(key).set(value);
	},
	//查询数据
	getData: function(path,callback){
		if(typeof callback != "function"){
			console.log("回调函数有误");
		}
		wilddog.initializeApp(this.config);
		var ref = wilddog.sync().ref(path);
		ref.once("value",function(value){
			var data = value.val();
			callback(data);
		});
	},
	//删除path路径下的key节点数据
	removeData: function(path,key){
		wilddog.initializeApp(this.config);
		var ref = wilddog.sync().ref(path);
		ref.child(key).remove();
	},
	//监听子节点数据增加
	getDataOnChildAdded: function(path,callback){
		if(typeof callback != "function"){
			console.log("回调函数有误");
		}
		wilddog.initializeApp(this.config);
		var ref = wilddog.sync().ref(path);
		ref.on("child_added",function(value){
			var data = value.val();
			var key = value.key();
			callback(data,key);
		});
	}
}
