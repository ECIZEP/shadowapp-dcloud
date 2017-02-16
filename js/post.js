
(function(){
	//user link
	mui('.post-wrapper').on('tap', ".userLink", function(){
		var username = this.dataset.username;
		if(username){
			mui.openWindow({
				url: "../htmls/profile.html",
				id: "profile_" + username,
				extras:{
					account: username
				}
			});
		}
	});
	
	
	
})();