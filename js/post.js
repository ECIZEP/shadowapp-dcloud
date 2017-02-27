
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
	
	document.addEventListener('postLoaded', function(){
		actionBinder();
	},false);
	
	function actionBinder() {
		//like and comment action
		mui('.action').each(function() {
			this.addEventListener('tap', function(event) {
				//comment
				if(event.target.className == "mui-icon mui-icon-chatbubble") {
					mui.openWindow({
						url: "../htmls/post_comment.html",
						id: "comment_" + this.getAttribute("data-postid"),
						extras: {
							username: this.getAttribute("data-username"),
							postId: this.getAttribute("data-postid")
						}
					});
				} else {
					if(event.target.className == "mui-icon-extra mui-icon-extra-heart") {
						//like
						event.target.className = "mui-icon-extra mui-icon-extra-heart-filled";
						var likeList = this.parentNode.nextSibling.getElementsByClassName('likeList')[0];
						var htmls = '<li><a href="javascript:;" class="userLink" data-username="' + plus.storage.getItem('account') + '">' + plus.storage.getItem('nickname') + '</a></li>';
						likeList.innerHTML = likeList.innerHTML + htmls;
						wilddogData.wirteData("/posts_board/" + this.getAttribute("data-username") + "/" + this.getAttribute("data-postid") + "/likelist/", plus.storage.getItem('account'), "");
					} else {
						//unlike
						event.target.className = "mui-icon-extra mui-icon-extra-heart";
						var likeList = this.parentNode.nextSibling.getElementsByClassName('likeList')[0];
						var links = likeList.getElementsByClassName('userLink');
						for(var i = 0; i < links.length; i++) {
							if(links[i].getAttribute('data-username') == plus.storage.getItem('account')) {
								likeList.removeChild(links[i].parentNode);
								wilddogData.removeData("/posts_board/" + this.getAttribute("data-username") + "/" + this.getAttribute("data-postid") + "/likelist/", plus.storage.getItem('account'));
							}
						}
					}
				}
			}, false);
		});
	}
	
	
	
})();
