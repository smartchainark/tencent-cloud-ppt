# 腾讯云 PPT 设计系统

## 配色方案

```javascript
const COLORS = {
  primary: "0064CE",       // 主色调 - 腾讯云蓝
  primaryLight: "E6F0FF",  // 浅主色 - 背景/卡片
  primaryDark: "004A99",   // 深主色 - 强调
  text: "333333",          // 正文文字
  muted: "44474F",         // 次要文字
  white: "FFFFFF",         // 白色
  accent: "006CFF",        // 强调色
  decoration: "39C0E8",    // 装饰色 - 青色
  gray: "8B8C8C",          // 灰色
  secondary: "F5F7FA",     // 次要背景
  success: "10B981",       // 成功 - 绿色
  warning: "F59E0B",       // 警告 - 橙色
  error: "EF4444",         // 错误 - 红色
};
```

### 色彩使用规则

| 场景 | 颜色 | 用途 |
|------|------|------|
| 标题文字 | `primary` | 章节标题、重要信息 |
| 正文文字 | `text` | 主要内容 |
| 次要文字 | `muted` | 副标题、说明文字 |
| 卡片背景 | `white` | 内容卡片 |
| 提示背景 | `primaryLight` | 要点、技巧提示 |
| 成功状态 | `success` | 完成、通过 |
| 警告状态 | `warning` | 问题、注意 |
| 错误状态 | `error` | 失败、不支持 |

---

## 字体规范

```javascript
const FONTS = {
  title: "PingFang SC",
  body: "PingFang SC",
  code: "SF Mono",
};
```

| 元素 | 字号 | 字重 |
|------|------|------|
| 封面主标题 | 42pt | Bold |
| 封面副标题 | 20pt | Regular |
| 章节标识 | 24pt | Bold |
| 页面标题 | 18pt | Bold |
| 卡片标题 | 16-20pt | Bold |
| 正文内容 | 14-16pt | Regular |
| 次要说明 | 12-14pt | Regular |

---

## 阴影效果

```javascript
// 普通阴影 - 卡片、图片
const makeShadow = () => ({
  type: "outer",
  blur: 8,
  offset: 4,
  angle: 135,
  color: "0064CE",
  opacity: 0.08,
});

// 深阴影 - 重要元素、封面卡片
const makeDeepShadow = () => ({
  type: "outer",
  blur: 12,
  offset: 6,
  angle: 145,
  color: "0064CE",
  opacity: 0.12,
});
```

---

## 边距规范

| 位置 | 数值 |
|------|------|
| 左/右边距 | 0.5" |
| 顶部边距 | 0.35-0.4" |
| 底部边距 | 0.3" |
| 元素间距 | 0.2-0.4" |

---

## 组件

### 章节标签

```javascript
function addSectionTag(slide, num, title) {
  slide.addShape(pres.shapes.OVAL, {
    x: 0.4, y: 0.35, w: 0.45, h: 0.45,
    fill: { type: "none" },
    line: { color: COLORS.primary, width: 1.5 },
  });
  slide.addText(num, {
    x: 0.4, y: 0.35, w: 0.45, h: 0.45,
    fontSize: 14, fontFace: FONTS.title, color: COLORS.primary,
    align: "center", valign: "middle", bold: true,
  });
  slide.addText(title, {
    x: 0.95, y: 0.35, w: 6, h: 0.45,
    fontSize: 18, fontFace: FONTS.title, color: COLORS.primary,
    bold: true, valign: "middle",
  });
}
```

### 内容卡片

```javascript
function addCard(slide, { x, y, w, h, title, content, titleSize = 18, contentSize = 14 }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.white },
    shadow: makeShadow(),
    rectRadius: 0.15,
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.2, y: y + 0.15, w: w - 0.4, h: 0.4,
      fontSize: titleSize, fontFace: FONTS.title, color: COLORS.text, bold: true,
    });
  }
  if (content) {
    slide.addText(content, {
      x: x + 0.2, y: y + (title ? 0.55 : 0.15), w: w - 0.4, h: h - (title ? 0.7 : 0.3),
      fontSize: contentSize, fontFace: FONTS.body, color: COLORS.muted, valign: "top",
    });
  }
}
```

### 左侧装饰线

```javascript
slide.addShape(pres.shapes.RECTANGLE, {
  x: 0.35, y: 0.6, w: 0.06, h: 2.0,
  fill: { color: COLORS.primary },
});
```

### 提示卡片（浅蓝背景）

```javascript
slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
  x: 0.5, y: 3.9, w: leftWidth, h: 1.4,
  fill: { color: COLORS.primaryLight },
  rectRadius: 0.1,
});
slide.addText("要点标题", {
  x: 0.7, y: 4.05, w: leftWidth - 0.4, h: 0.35,
  fontSize: 14, fontFace: FONTS.title, color: COLORS.primary, bold: true,
});
slide.addText("要点内容...", {
  x: 0.7, y: 4.5, w: leftWidth - 0.4, h: 0.6,
  fontSize: 14, fontFace: FONTS.body, color: COLORS.text,
});
```

---

## 图片处理

```javascript
// 固定高度，按比例计算宽度
const imgHeight = 4.5;
const imgWidth = imgHeight * imageRatio;

// 图片靠右对齐（基于 10" 宽度）
const imgX = 10 - imgWidth - 0.5;

// 左侧内容区宽度
const leftWidth = imgX - 1.0;

// 图片添加深阴影
slide.addImage({
  path: imagePath,
  x: imgX, y: 0.9, w: imgWidth, h: imgHeight,
  shadow: makeDeepShadow(),
});
```

---

## 背景图

```javascript
const BG_IMAGE = __dirname + "/bg.png";
slide.background = { path: BG_IMAGE };
```

背景图位于技能的 `assets/bg.png`，也可使用项目中 `docs/0313-PPT制作/ppt-generator/bg.png`。

---

## 缩放适配

如果原始坐标基于 LAYOUT_WIDE（13.333" × 7.5"），使用 `wrapSlide()` 代理自动缩放到 LAYOUT_16x9（10" × 5.625"）：

```javascript
const S = 10 / 13.333;  // 0.75
function wrapSlide(rawSlide) {
  function scaleOpts(opts) {
    const o = { ...opts };
    for (const k of ["x", "y", "w", "h"])
      if (typeof o[k] === "number") o[k] = Math.round(o[k] * S * 10000) / 10000;
    if (typeof o.fontSize === "number") o.fontSize = Math.max(10, Math.round(o.fontSize * S));
    if (typeof o.rectRadius === "number") o.rectRadius = Math.round(o.rectRadius * S * 100) / 100;
    return o;
  }
  return {
    addShape: (shape, opts) => rawSlide.addShape(shape, scaleOpts(opts)),
    addText: (text, opts) => rawSlide.addText(text, scaleOpts(opts)),
    addImage: (opts) => rawSlide.addImage(scaleOpts(opts)),
    addNotes: (text) => rawSlide.addNotes(text),
    set background(v) { rawSlide.background = v; },
    get background() { return rawSlide.background; },
  };
}

// 用法：所有 pres.addSlide() 替换为 wrapSlide(pres.addSlide())
let slide = wrapSlide(pres.addSlide());
// 之后正常使用 slide.addText() 等，坐标自动缩放
```
