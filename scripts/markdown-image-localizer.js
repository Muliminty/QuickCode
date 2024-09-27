const fs = require('fs');
const path = require('path');
const axios = require('axios');
const config = require('../config.js')

const MD_config = config['markdown-image-localizer']

// 定义要扫描的Markdown文件夹和图片存储目录
const MD_PATH = MD_config['MD_PATH'];
const markdownDir = path.resolve(MD_PATH);
const imageSaveDir = path.resolve(MD_PATH, MD_config['imageSaveDir']);


// 确保图片保存文件夹存在
if (!fs.existsSync(imageSaveDir)) {
  fs.mkdirSync(imageSaveDir);
}

// 正则表达式匹配Markdown中的图片链接 ![alt](url)
const imageRegex = /!\[.*?\]\((https?:\/\/[^\s)]+)\)/g;

// 下载图片并返回新的本地路径
const downloadImage = async (url, index) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
    });

    // 根据响应头中的 Content-Type 确定文件扩展名
    const contentType = response.headers['content-type'];
    let imageExt = '.jpg'; // 默认后缀
    if (contentType.includes('image/jpeg')) imageExt = '.jpg';
    else if (contentType.includes('image/png')) imageExt = '.png';
    else if (contentType.includes('image/gif')) imageExt = '.gif';
    else if (contentType.includes('image/webp')) imageExt = '.webp';

    const imageName = `image_${index}${imageExt}`; // 使用索引创建唯一文件名
    const imagePath = path.join(imageSaveDir, imageName);

    const writer = fs.createWriteStream(imagePath);
    response.data.pipe(writer);

    return new Promise((resolve, reject) => {
      writer.on('finish', () => resolve(imagePath)); // 下载成功
      writer.on('error', reject); // 下载失败
    });
  } catch (error) {
    console.error(`下载图片失败: ${url}`, error);
  }
};

// 处理单个Markdown文件
const processMarkdownFile = async (filePath) => {
  let content = fs.readFileSync(filePath, 'utf-8');
  const images = [...content.matchAll(imageRegex)];

  for (let i = 0; i < images.length; i++) {
    const [imageMarkdown, imageUrl] = images[i];

    console.log(`发现图片: ${imageUrl}`);
    const localImagePath = await downloadImage(imageUrl, i);

    if (localImagePath) {
      // 替换Markdown中的远程链接为本地链接
      const relativePath = `./images/${path.basename(localImagePath)}`;
      content = content.replace(imageUrl, relativePath);
    }
  }

  // 将更新后的Markdown写回原文件
  fs.writeFileSync(filePath, content, 'utf-8');
  console.log(`已处理文件: ${filePath}`);
};

// 处理文件夹中的所有Markdown文件
const processMarkdownFiles = async () => {
  const files = fs.readdirSync(markdownDir);

  for (const file of files) {
    const filePath = path.join(markdownDir, file);
    if (path.extname(file) === '.md') {
      await processMarkdownFile(filePath);
    }
  }
};

processMarkdownFiles()
  .then(() => console.log('所有文件处理完成'))
  .catch((err) => console.error('处理过程中发生错误:', err));
