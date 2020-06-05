# 餐廳收藏網

#### 具備完整CRUD的餐廳收藏網 

---


## 功能

- 使用者可以瀏覽所有餐廳
- 使用者可以刪除特定的餐廳
- 使用者可以編輯特定的餐廳
- 使用者可以使用名稱、英文名和類別進行搜尋
- 具備註冊功能，可供多人使用
- 支援 Facebook 登錄

---

## 配備需求

- [Node.js](https://nodejs.org/en/)
- [MongoDB](https://www.mongodb.com/)

---

## 安裝及設定

1. 建立資料夾

```
$ mkdir restaurant_list
```

2. 下載專案

```
$ git clone https://github.com/robert913152750/Resaturant_List.git
$ cd restaurant_list
```

3. 安裝相依套件

```
$ npm install
```

4. 建立種子資料

```
$ npm run seeder
```

5. 新增.env 檔，並前往[facebooks for developers](https://developers.facebook.com/)獲取必要數據

```
//請自行至facebooks for developers創建專案
$ FACEBOOK_ID='創建的facebook開發專案id'
$ FACEBOOK_SECRET='創建的facebook開發專案secret'
$ FACEBOOK_CALLBACK=http://localhost:3000/auth/facebook/callback
```

6. 執行專案

```
$ node app.js
// 出現以下訊息即開啟成功
// App is running
// mongodb connected!
```

7. 使用測試帳號登錄或是自行創建帳戶

```
帳號: user1@example.com
密碼: 12345678
```
```
帳號: user2@example.com
密碼: 12345678
```

## 介面預覽

- 登入介面
  ![login](https://github.com/robert913152750/Resaturant_List/blob/master/public/img/login_img.png)
- 首頁介面
  ![index](https://github.com/robert913152750/Resaturant_List/blob/master/public/img/index_img.png)
- 新增頁面
  ![create](https://github.com/robert913152750/Resaturant_List/blob/master/public/img/create_img.png)
- 單一詳細資訊介面
  ![show](https://github.com/robert913152750/Resaturant_List/blob/master/public/img/show_img.png)
