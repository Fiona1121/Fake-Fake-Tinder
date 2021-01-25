# 109-1-Web-Project
[109-1] Web Programming Final X (Group 19) fake-fake-tinder

fake-fake-Tinder | Dating, Make Friends and Meet New People

❤ Deployed :https://fake-fake-tinder.herokuapp.com/

❤ Github :https://github.com/Fiona1121/109-1-Web-Project

❤ Demo Video :https://youtu.be/AnTxWJNuSIc

MEMBERS 成員 : 

電機二 尤韻嘉： 登入跟使用者介面前後端,聊天介面subscribe,整合
電機二 吳詩昀： 整體css,卡片滑動主界面前後端,各介面獲取user資訊,整合
電機二 羅昱翔： 聊天介面前後端

INSTRUCTION 使用說明 :

1)	進入主頁面後，點選Login按鈕，登入已有帳號或是點選下方 "Sign up"按鈕註冊新帳號（註冊時記得要輸入每格的資料，以完成註冊手續。）

2） 成功登入後，進入到主頁面可以看到其他使用者的圖片，透過將照片向右拉以表示喜歡，將照片向左拉以表示不喜歡。

3)	只要配對成功（兩個使用者互相喜歡）他們就能點按右上角的聊天室按鈕進入聊天室開始聊天（但因前期使用者不多，所以也可以在聊天室搜尋其他使用者的資料）。

4)	只要好好使用這個網站，你就能交到很多朋友，孤單寂寞也將不再是你的問題。

＊注意事項：
- 有時切回使用者資料介面時資料會看不到，但其實accountinferface有收到只是傳不進userinfo。
- setting pages 的部分有時第一次看會有資料，但切回去第二次時資料會顯示不出來，但是是真的可以改資料，從登入口就會發現資料其實有改。
- 滑動時真的會紀錄Like和Dislike，只是目前在聊天頁面還沒可以正確filt。
- 因為我們user schema的sex是設required，所以在註冊時如果沒改過sex的值，雖然成功傳到後端且前端顯示sign up successfully ,但因為sex沒有值，所以沒有成功儲存到後端，因此要設定male時要先按female再按回male。

FEATURES 特色 :

💡 完整的登入登出系統

💡 特殊的滑動卡片配對系統

💡 立即更新的聊天室系統

💡 經過設計的UI/UX



PACKAGE USED 第三方套件 :

🛠React

🛠Material-UI

🛠Node.js

🛠Express

🛠WebSocket

🛠GraphQL-Yoga

🛠MongoDB

EXPERIENCE 心得 :

👱‍♂️尤韻嘉：這次final project花了很多心力，最後看到有做出成品很感動，平常作業都是已經寫好的架構，真正做project時才體會到從無到有的困難。很感謝組員們都很努力解決遇到的各種bug，真的是值得回憶的經驗。經過這學期從對網頁一無所知到能做出一點東西，覺得學到很多東西!

👱吳詩昀：從一個空空的app介面一直到最後做出來的成品，雖然說不上很好，可是也是成就感滿滿，組員們都第一次接觸網服相關的東西，所要在寫code的過程中遇到了各種問題，大家一起熬夜、一起坐在會議室一整天、一起debug，這種經驗真的難得，雖然很幸苦、很累、很想睡覺，但是還是很開心可以跟大家一起做這個期末專題，我也收穫很多！

👱‍♂️羅昱翔：這次做這個Project獲益良多，最主要都是從我的兩個厲害組員身上學到的，也非常感謝友善的組員們願意陪我一起熬夜打code，幫我de一些我de不出來的bug。雖然當下整天坐在電二的時候覺得很累，但現在想起來真的是充滿記憶點的時光，最後也要謝謝柏志助教在最後的deploy幫了很多忙。
