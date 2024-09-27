以下是补充了 `markdown-image-localizer` 相关内容的 **QuickCode** 文档：

---

# QuickCode

**QuickCode** 是一个小工具脚本库，旨在提升效率并解决常见问题。

## 安装

1. 克隆仓库并进入目录：

   ```bash
   git clone https://github.com/你的用户名/quickcode.git
   cd quickcode
   ```

2. 安装依赖：

   ```bash
   npm install
   ```

## 使用方法

+ **查询 CPU 温度**  
  指令：`npm run system:cpu-temp`  
  使用效果：输出当前 CPU 温度信息，例如 `当前 CPU 温度: 55°C, 最大 CPU 温度: 65°C`。

+ **Markdown 图片本地化工具** (`markdown-image-localizer`)  
  指令：`npm run markdown:image-localize`  
  使用效果：扫描指定文件夹中的 Markdown 文件，下载其中的所有远程图片，并将图片路径替换为本地路径。  
  适用场景：当你有大量 Markdown 文件且其中的图片为外链时，该工具能够批量下载图片到本地，并修改图片引用路径，确保本地查看时图片能够正常显示。  


## 贡献

欢迎提交问题、建议或贡献新脚本！我们鼓励大家为 **QuickCode** 做出贡献，尤其是新的工具脚本。如果你有任何想法，请提交 pull request 或打开 issue 与我们讨论。

---

这个补充包含了如何使用 `markdown-image-localizer` 的详细步骤和功能介绍。希望这能帮助用户更好地了解和使用这个工具。