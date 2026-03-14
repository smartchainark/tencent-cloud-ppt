---
name: tencent-cloud-ppt
description: "Generate Tencent Cloud-styled PPT presentations using pptxgenjs with a consistent visual identity. Use this skill whenever the user mentions PPT, slides, presentations, decks, or 幻灯片 — even if they don't say 'Tencent Cloud' explicitly, as long as the context is this project's presentations. 生成腾讯云风格 PPT（腾讯云蓝 #0064CE、PingFang SC、统一背景图、蓝色阴影系统）。触发词：'生成PPT'、'做PPT'、'腾讯云PPT'、'公开课PPT'、'OpenClaw PPT'、'做幻灯片'、'演示文稿'、'slide deck'。适用于公开课、技术分享、产品介绍。不适用于：读取/解析已有 PPT（用 pptx 技能）、非腾讯云风格的通用 PPT（用 pptx 技能）。依赖 pptx 技能。"
---

# 腾讯云风格 PPT 生成

## 环境检查

首次使用前，验证依赖：

```bash
# pptx 技能（提供 pptxgenjs 指南和 QA 流程）
ls ~/.claude/skills/pptx/SKILL.md 2>/dev/null && echo "✅ pptx skill" \
  || echo "❌ 请安装: npx skills add https://github.com/anthropics/skills --skill pptx"

# pptxgenjs（全局或项目本地均可）
node -e "require('pptxgenjs')" 2>/dev/null && echo "✅ pptxgenjs" \
  || echo "❌ 请安装: npm install pptxgenjs"

# QA 文本提取（推荐）
pip3 -q show markitdown 2>/dev/null && echo "✅ markitdown" \
  || echo "⚠️ 推荐安装: pip install 'markitdown[pptx]'"
```

> **Note**: pptxgenjs 检查需在项目目录下运行（如果是本地安装而非全局）。

## 快速开始

1. 在生成器脚本中 `require("./design-system")` 加载本技能的 [scripts/design-system.js](scripts/design-system.js)
2. 参考 `pptx` 技能的 pptxgenjs.md 了解 API 细节
3. 背景图：`assets/bg.png`
4. QA：遵循 `pptx` 技能的 QA 流程（markitdown 文本检查 + soffice 转图片视觉检查）

## 生成模板

```javascript
const pptxgen = require("pptxgenjs");
const { COLORS, FONTS, makeShadow, makeDeepShadow, addSectionTag, addCard } = require("./design-system");

const BG_IMAGE = __dirname + "/bg.png";

let pres = new pptxgen();
pres.layout = "LAYOUT_16x9";
pres.author = "OpenClaw";

let slide = pres.addSlide();
slide.background = { path: BG_IMAGE };

addSectionTag(pres, slide, "01", "页面标题");
addCard(pres, slide, { x: 0.5, y: 1.0, w: 4, h: 3, title: "卡片标题", content: "内容..." });

slide.addNotes("【1 分钟】要点提示...");

pres.writeFile({ fileName: "output.pptx" });
```

## 设计原则

- **布局用 LAYOUT_16x9**（10" × 5.625"）。LAYOUT_WIDE 虽然也是 16:9 但尺寸不同（13.333" × 7.5"），混用会导致合并时比例失调。
- **每页设背景图**，因为 pptxgenjs 不支持全局默认背景，漏设某页会变成纯白。
- **阴影统一用工厂函数** `makeShadow()` / `makeDeepShadow()`，它们使用腾讯云蓝作为阴影色，这是品牌一致性的关键细节。
- **每页加演讲者备注** `slide.addNotes()`，含时长标记（如 `【1 分钟】`）和口头要点，方便演讲者视图使用。
- **主色 0064CE** 是腾讯云品牌蓝，所有标题、装饰线、编号圈都用这个色值，而非随意选蓝色。

## 页面类型速查

| 类型 | 特点 | 关键组件 |
|------|------|----------|
| 封面页 | 装饰线 + P标识24pt + 主标题42pt + 副标题20pt | addDecoLine |
| 内容页 | 圆形编号 + 标题18pt + 左侧内容 + 右侧截图 | addSectionTag + addCard |
| 双图页 | 两张图并排/上下 + 卡片包裹 | makeDeepShadow |
| 过渡页 | 装饰线 + 大字32pt + 下一章预告24pt | addDecoLine |

## 合并多 PPT

用 python-pptx 合并时需解决两个问题（详见项目中的 merge-all.py）：
1. **媒体文件名去重** — 不同 PPT 可能有同名媒体，重命名为 `merged-NNNN.ext` 避免覆盖
2. **rId 重映射** — 复制 slide XML 后，关系 ID 可能不匹配，需扫描并更新 `r:embed`/`r:link`/`r:id`

## 缩放适配

如果已有代码基于 LAYOUT_WIDE 坐标编写，用 `wrapSlide()` 代理自动缩放，无需重写坐标。详见 [design-system.md 缩放适配](references/design-system.md#缩放适配)。

## 参考资料

- 完整配色/字体/阴影/组件代码：[references/design-system.md](references/design-system.md)
- 可直接 require 的模块：[scripts/design-system.js](scripts/design-system.js)
