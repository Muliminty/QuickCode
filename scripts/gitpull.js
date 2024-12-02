const simpleGit = require('simple-git');
const path = require('path');
const fs = require('fs');
const dayjs = require('dayjs'); // 引入 dayjs

// 创建一个 git 实例
const git = simpleGit();

// 定义日志文件路径
const logFilePath = path.join(__dirname, 'log', 'git_operations.log');

// 确保日志目录存在，如果不存在则创建
function ensureLogDirectoryExists() {
  const logDir = path.dirname(logFilePath);
  if (!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir, { recursive: true });
    console.log('日志目录创建成功:', logDir);
  }
}

// 格式化日志时间
function getFormattedDate() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss'); // 格式化时间为：2024-12-02 14:30:45
}

// 写入日志的辅助函数
function logToFile(message) {
  const timestamp = getFormattedDate(); // 使用 dayjs 获取格式化的时间
  const logMessage = `[${timestamp}] ${message}\n`;

  // 将日志写入文件
  fs.appendFile(logFilePath, logMessage, (err) => {
    if (err) {
      console.error('写入日志失败:', err);
    }
  });
}

// 配置需要同步的仓库信息
const repositories = [
  {
    name: 'repository-obsidian',
    path: 'E:/NOTE_STORAGE/repository-obsidian',
    branch: 'main',  // 需要同步的分支
    remote: 'origin',  // 默认远程仓库名
  },
  {
    name: 'stackedit-app-data',
    path: 'E:/NOTE_STORAGE/stackedit-app-data',
    branch: 'master',  // 需要同步的分支
    remote: 'origin',
  }
];

// Git 操作函数
async function performGitOperations(repoConfig) {
  try {
    logToFile(`开始同步仓库: ${repoConfig.name}`);

    // 设置操作目录
    await git.cwd(repoConfig.path);

    // 执行 fetch 操作，拉取远程更新
    logToFile(`执行 git fetch 操作: ${repoConfig.remote}`);
    await git.fetch(repoConfig.remote);

    // 检查本地是否存在远程分支
    const branches = await git.branch();
    if (!branches.all.includes(repoConfig.branch)) {
      logToFile(`本地仓库没有找到分支 ${repoConfig.branch}`);
      console.error(`本地仓库没有找到分支 ${repoConfig.branch}`);
      return;
    }

    // 执行 checkout 操作，更新本地文件，覆盖为远程代码
    logToFile(`执行 git checkout ${repoConfig.remote}/${repoConfig.branch} -- .`);
    await git.checkout([`${repoConfig.remote}/${repoConfig.branch}`, '--']);  // 更新本地文件为远程仓库状态

    logToFile(`仓库 ${repoConfig.name} 同步完成`);

  } catch (error) {
    logToFile(`仓库 ${repoConfig.name} 同步失败: ${error.message}`);
    console.error(`Git 操作失败: ${error.message}`);
  }
}

// 确保日志目录存在
ensureLogDirectoryExists();

// 定时执行 Git 操作，每个仓库同步一次
repositories.forEach(repoConfig => {
  // 定时任务：每隔3秒同步一次
  setInterval(() => {
    performGitOperations(repoConfig);
  }, 1000 * 3);  // 每隔 3 秒执行一次
});
