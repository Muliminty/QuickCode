const path = require('path');

module.exports = {
    "markdown-image-localizer": {
        MD_PATH: "E:\\NOTE_STORAGE\\Muliminty-Note\\小技巧\\RustDesk",
        imageSaveDir: "附件"
    },
    "gitpull": {
        // 多个仓库的配置
        repos: [
            // {
            //     repoPath: 'E:/NOTE_STORAGE/stackedit-app-data',
            //     branch: 'master',
            // },
            {
                repoPath: 'E:/NOTE_STORAGE/repository-obsidian',
                branch: 'main',
            },
            // 你可以继续添加更多仓库
        ],

        // 日志文件路径
        logFilePath: path.join(__dirname, 'log', 'git_operations.log'),

        // 定时执行 Git 操作的间隔（单位：毫秒）
        interval: 1000 * 3, // 20 秒

        // Git 操作日志前缀
        logPrefix: '[Git 操作日志]',

        // Git 操作失败的日志前缀
        errorPrefix: '[Git 操作错误]',

        // 如果仓库有更新才执行 pull 操作
        shouldCheckStatus: true,
    }
};
