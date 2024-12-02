const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');

// 创建一个 git 实例
const git = simpleGit();

// 定义 Git 操作的目录
const dirPath = 'E:/NOTE_STORAGE/stackedit-app-data';

// 定义日志文件路径
const logFilePath = path.join(__dirname, 'git_operations.log');

// 写入日志的辅助函数
function logToFile(message) {
  const timestamp = new Date().toISOString(); // 获取当前时间戳
  const logMessage = `[${timestamp}] ${message}\n`;

  // 将日志写入文件
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('写入日志失败:', err);
    }
  });
}

// Git 操作函数
async function performGitOperations() {
  try {
    logToFile('启动时立即执行命令...');

    // 设置操作目录
    await git.cwd(dirPath);

    // 执行 fetch 操作
    logToFile('执行 git fetch...');
    await git.fetch();

    // 执行 checkout 操作
    logToFile('执行 git checkout master...');
    await git.checkout('master');

    // 执行 pull 操作
    logToFile('执行 git pull...');
    await git.pull('origin', 'master');

    logToFile('Git 操作完成');

  } catch (error) {
    logToFile(`Git 操作失败: ${error.message}`);
    console.error('Git 操作失败:', error);
  }
}

// 定时执行 Git 操作
setInterval(performGitOperations, 120000);  // 每隔 120 秒执行一次
