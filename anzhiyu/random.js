var posts=["2024/05/31/Linux基础防护/","2023/10/30/Windows基础知识/","2022/05/07/first-blog/","2023/09/07/centos7-9安装python3-8/","2024/09/30/html基本样式/","2024/06/03/vulfocus靶场redis 未授权访问漏洞之CNVD-2015-07557/","2024/10/10/nginx配置https的ssl证书和域名/","2025/05/09/xxx代码审计面试/","2024/09/23/数学公式/","2024/06/03/毕业旅行/","2025/05/03/流量特征/","2024/10/03/渗透测试题50道/","2024/10/01/落魄谷中寒风吹/","2024/09/26/软件工程复习(1)/","2024/09/27/软件工程复习(2)/","2024/09/28/软件工程复习(3)/","2025/05/03/面试提升题库(更新中)/","2025/07/23/面试提升题库（更新中-）/"];function toRandomPost(){
    pjax.loadUrl('/'+posts[Math.floor(Math.random() * posts.length)]);
  };var friend_link_list=[{"name":"liaodada","link":"https://www.github.com/liaodada","avatar":"https://pic.imgdb.cn/item/66e5b9f1d9c307b7e977e204.jpg","descr":"生活明朗，万物可爱","color":"vip","tag":"技术"},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","siteshot":"https://npm.elemecdn.com/anzhiyu-theme-static@1.1.6/img/blog.anheyu.com.jpg","color":"vip","tag":"技术"},{"name":"liaodada","link":"https://www.github.com/liaodada","avatar":"https://pic.imgdb.cn/item/66e5b9f1d9c307b7e977e204.jpg","recommend":true},{"name":"安知鱼","link":"https://blog.anheyu.com/","avatar":"https://npm.elemecdn.com/anzhiyu-blog-static@1.0.4/img/avatar.jpg","descr":"生活明朗，万物可爱","recommend":true}];
    var refreshNum = 1;
    function friendChainRandomTransmission() {
      const randomIndex = Math.floor(Math.random() * friend_link_list.length);
      const { name, link } = friend_link_list.splice(randomIndex, 1)[0];
      Snackbar.show({
        text:
          "点击前往按钮进入随机一个友链，不保证跳转网站的安全性和可用性。本次随机到的是本站友链：「" + name + "」",
        duration: 8000,
        pos: "top-center",
        actionText: "前往",
        onActionClick: function (element) {
          element.style.opacity = 0;
          window.open(link, "_blank");
        },
      });
    }
    function addFriendLinksInFooter() {
      var footerRandomFriendsBtn = document.getElementById("footer-random-friends-btn");
      if(!footerRandomFriendsBtn) return;
      footerRandomFriendsBtn.style.opacity = "0.2";
      footerRandomFriendsBtn.style.transitionDuration = "0.3s";
      footerRandomFriendsBtn.style.transform = "rotate(" + 360 * refreshNum++ + "deg)";
      const finalLinkList = [];
  
      let count = 0;

      while (friend_link_list.length && count < 4) {
        const randomIndex = Math.floor(Math.random() * friend_link_list.length);
        const { name, link, avatar } = friend_link_list.splice(randomIndex, 1)[0];
  
        finalLinkList.push({
          name,
          link,
          avatar,
        });
        count++;
      }
  
      let html = finalLinkList
        .map(({ name, link }) => {
          const returnInfo = "<a class='footer-item' href='" + link + "' target='_blank' rel='noopener nofollow'>" + name + "</a>"
          return returnInfo;
        })
        .join("");
  
      html += "<a class='footer-item' href='/link/'>更多</a>";

      document.getElementById("friend-links-in-footer").innerHTML = html;

      setTimeout(()=>{
        footerRandomFriendsBtn.style.opacity = "1";
      }, 300)
    };