# jot-vocab

> CPE405 final project

Technical Objectives
---------------------
- [x] 1. VueJS (main JavaScript framework)
- [x] 2. Bootstrap 4 (front-end framework)
- [ ] 3. Github Pages (for deploy front-end)
- [x] 4. ResponsiveVoice.JS (play sound from text to voice)
- [ ] ~~5. Oxford Dictionaries API (search meaning of a word)~~
- [x] 6. Words API (dictionary + thesaurus)
- [ ] 7. VeeValidate (Input Validation)
- [x] 8. Firebase (authentication)
- [x] 9. Express.js (back-end framework)
- [x] 10. Heroku (for deploy back-end)

High-level Objectives
---------------------
- [ ] a. เว็บจดคำศัพท์ออนไลน์ 
- [ ] b. สามารถค้นหาคำศัพท์ที่ต้องการเพื่อเพิ่มเข้าไปยังคลังคำศัพท์ของผู้ใช้เอง
- [x] c. แสดงความหมายภาษาอังกฤษที่จากพจนานุกรม
- [x] d. รวมไปถึง synonyms และ acronyms ด้วย
- [x] e. ในคำศัพท์แต่ละคำ ผู้ใช้สามารถกดเพื่อฟังการออกเสียงคำศัพท์นั้น
- [x] f. ผู้ใช้สามารถเพิ่ม comment หรือ description ของคำศัพท์ใน form ได้ด้วยตัวเอง
- [x] g. ผู้ใช้จะต้องยืนยันตัวผ่านระบบบัญชีสื่อสังคมต่าง ๆ เช่น Facebook (ผ่าน OAuth)
- [x] h. ข้อมูลการใช้งานของผู้ใช้จะถูกเก็บไว้ในฐานข้อมูลออนไลน์ของเว็บไซต์ (เช่น คำศัพท์)

---------------------------------------------------
This project is built using Vue.js webpack template (`vue init webpack JotVocab`)

#### Related Global Packages
+

#### Related Local Dependencies
+ vue-router@3.0.1
+ firebase@4.6.2
+ firebaseui@2.5.1
+ vue-resource@1.3.4

#### Special Thanks to
+ [rstormsf/friendsmap](https://github.com/rstormsf/friendsmap) for the nice solution of using firebase authentication along with vue _(He also used **Vuex** for managing state inside the app)_

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
