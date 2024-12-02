module.exports = {
    "markdown-image-localizer": {
        MD_PATH: "E:\\NOTE_STORAGE\\Muliminty-Note\\小技巧\\RustDesk",
        imageSaveDir: "附件"
    },
    "gitpull": {
        "directories": [
            "E:\NOTE_STORAGE\stackedit-app-data"
        ],
        "interval": 120,                  // 间隔时间（单位：秒）
        "branch": "master",                 // 指定分支，留空为当前分支
        "logPath": "./gitpull.log",       // 日志文件路径，留空则不记录日志
        "executeOnStart": true,           // 是否启动时立即执行
        "commands": [                     // 要执行的命令
            "git fetch",
            "git checkout main",
            "git pull origin main"
        ]
    }
};
