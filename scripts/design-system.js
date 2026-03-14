/**
 * 腾讯云 PPT 设计系统
 *
 * 统一的配色、字体、阴影和组件，确保所有幻灯片视觉一致。
 *
 * 用法：
 *   const { COLORS, FONTS, makeShadow, makeDeepShadow, addSectionTag, addCard, addDecoLine, addTipCard } = require("./design-system");
 */

// ─── 配色方案 ───────────────────────────────────────────

const COLORS = {
  primary: "0064CE",       // 腾讯云蓝
  primaryLight: "E6F0FF",  // 浅主色 - 背景/卡片
  primaryDark: "004A99",   // 深主色 - 强调
  text: "333333",          // 正文文字
  muted: "44474F",         // 次要文字
  white: "FFFFFF",
  accent: "006CFF",        // 强调色
  decoration: "39C0E8",    // 装饰色 - 青色
  gray: "8B8C8C",
  secondary: "F5F7FA",     // 次要背景
  success: "10B981",
  warning: "F59E0B",
  error: "EF4444",
};

// ─── 字体 ───────────────────────────────────────────────

const FONTS = {
  title: "PingFang SC",
  body: "PingFang SC",
  code: "SF Mono",
};

// ─── 阴影工厂 ───────────────────────────────────────────

/** 普通阴影 - 卡片、图片 */
const makeShadow = () => ({
  type: "outer",
  blur: 8,
  offset: 4,
  angle: 135,
  color: "0064CE",
  opacity: 0.08,
});

/** 深阴影 - 重要元素、封面卡片 */
const makeDeepShadow = () => ({
  type: "outer",
  blur: 12,
  offset: 6,
  angle: 145,
  color: "0064CE",
  opacity: 0.12,
});

// ─── 组件 ───────────────────────────────────────────────

/**
 * 章节标签（圆形编号 + 标题）
 * @param {object} pres - pptxgenjs 实例（用于 pres.shapes）
 * @param {object} slide - 幻灯片对象
 * @param {string} num - 编号文字，如 "01"
 * @param {string} title - 标题文字
 */
function addSectionTag(pres, slide, num, title) {
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

/**
 * 内容卡片（圆角矩形 + 标题 + 内容）
 * @param {object} pres - pptxgenjs 实例
 * @param {object} slide - 幻灯片对象
 * @param {object} opts - { x, y, w, h, title?, content?, titleSize?, contentSize? }
 */
function addCard(pres, slide, { x, y, w, h, title, content, titleSize = 18, contentSize = 14 }) {
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

/**
 * 左侧装饰线（封面/过渡页）
 * @param {object} pres - pptxgenjs 实例
 * @param {object} slide - 幻灯片对象
 * @param {object} [opts] - { x?, y?, w?, h? } 可选覆盖默认位置
 */
function addDecoLine(pres, slide, opts = {}) {
  slide.addShape(pres.shapes.RECTANGLE, {
    x: opts.x || 0.35,
    y: opts.y || 0.6,
    w: opts.w || 0.06,
    h: opts.h || 2.0,
    fill: { color: COLORS.primary },
  });
}

/**
 * 提示卡片（浅蓝背景）
 * @param {object} pres - pptxgenjs 实例
 * @param {object} slide - 幻灯片对象
 * @param {object} opts - { x, y, w, h, title, content }
 */
function addTipCard(pres, slide, { x, y, w, h, title, content }) {
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x, y, w, h,
    fill: { color: COLORS.primaryLight },
    rectRadius: 0.1,
  });
  if (title) {
    slide.addText(title, {
      x: x + 0.2, y: y + 0.15, w: w - 0.4, h: 0.35,
      fontSize: 14, fontFace: FONTS.title, color: COLORS.primary, bold: true,
    });
  }
  if (content) {
    slide.addText(content, {
      x: x + 0.2, y: y + (title ? 0.55 : 0.15), w: w - 0.4, h: h - (title ? 0.7 : 0.3),
      fontSize: 14, fontFace: FONTS.body, color: COLORS.text,
    });
  }
}

// ─── 导出 ───────────────────────────────────────────────

module.exports = {
  COLORS,
  FONTS,
  makeShadow,
  makeDeepShadow,
  addSectionTag,
  addCard,
  addDecoLine,
  addTipCard,
};
