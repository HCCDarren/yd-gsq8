# YdGsq

yd-gsq Google Sheets Query(Google Sheets 查詢)

## 基本使用

- 在 sheets內用 Yd設定 命名，設定查詢方式
- url: ...v2/gsq/<encrypted_sheet_id>

## 啟動 查詢log

- 使用方式:  …/v2/gsq/<encrypted_sheet_id>?log=1
- 查詢log 寫在 yd-gsql log 檔案
- 此功能採用 yd-do-post-paste-filter app script’s api 存取 sheet 資料

## 用非 Yd設定 命名 查詢 gsq

使用方式:

- 在 sheet 內設定 替代 Yd設定 的查詢設定，例如 Query2設定
- url : …/v2/gsq/<encrypted_sheet_id>?config=Query2設定

## Run using node express server

+ npm run build:ssr-tony
  - ng build --prod --buildOptimizer=false --optimization=false      // build client
  - ng run yd-gsq:server:production --bundleDependencies all         // build server with external dependencies to bundle into the module
  - node_modules/.bin/webpack --config webpack.server.config.js --progress --colors
  - node --inspect --trace-warnings --pending-deprecation dist/server
- npm run ssr-tony
  - node --inspect --trace-warnings --pending-deprecation dist/server
- in dist/server/main.js replace 'new Buffer(' with 'Buffer.alloc('
- <http://localhost:4000/> to see result
- Debugger listening using   chrome://inspect   on ws://127.0.0.1:9229
- Node.js Debugging Guide(<https://nodejs.org/en/docs/guides/debugging-getting-started/#enabling-remote-debugging-scenarios>)

## 開發環境
1. 用 windows 安裝
    1. install [VS Code(Latest Version)](https://code.visualstudio.com/download)
    1. install [nvm-windows(Latest Version): Node.js version manager for Windows](https://github.com/coreybutler/nvm-windows)
    1. install Node.js 16.19.1. Angular 8 needs openssl v1.1.1, but node v17.x+ uses openssl v3
        ```
        nvm install 16.19.1
        nvm use 16.19.1
        npm install -g yarn
        ```
    1. Install Angular CLI(Latest Version)
        ```
        npm install -g @angular/cli
        ```
    1. install Firebase CLI Tools(Latest Version)
        ```
        npm install -g firebase-tools
        ```
2. clone yd-gsq 專案
    1. create a yd-gsq folder
    1. in yd-gsq folder, run 
        ```
        git clone https://github.com/YudaHighschool/angular-yd-gsq.git
        ```
    1. rename angular-yd-gsq to yd-gsq8
    1. copy old private environment.ts to src/environement/envoronment.ts
3. 安裝 yd-gsq's npm packages: in yd-gsq8 folder, run
    ```
    npm install
    npm audit fix
    ```
4. 執行測試環境, run
    ```
    ng serve
    ```

## git 版本控制

### 常用指令
1. git pull // 將 GitHub數據庫 同步至 本地數據庫
1. git checkout tony-branch // 取出 tony-branch 分支
1. git merge master // 將 master branch 最新內容 merge 至 tony-branch 分支
1. // 用 VS Code 介面將修正 commit 至 tony-branch
1. git push origin tony-branch // 將修正內容上傳 至 origin/tony-branch
1. git checkout master // 取出 master 分支
1. git merge --no-ff tony-branch  // 將 tony-branch 合併至 master, --no-ff: 不要 fast forward
1. git push // 將本地數據庫 同步到 GitHub數據庫

### [其他 git 說明](https://github.com/YudaHighschool/yd-software-knowledge-base/blob/main/核心技術/git)
