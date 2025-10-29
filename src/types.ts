/**
 * Rsdoctor 插件配置类型定义
 */

/**
 * 报告模式
 * - brief: 在构建产物目录中生成单个 HTML 报告文件
 * - normal: 在构建产物目录中生成 .rsdoctor 文件夹，包含各种数据文件
 */
export type RsdoctorMode = 'brief' | 'normal';

/**
 * Linter 规则级别
 */
export type LinterLevel = 'off' | 'warn' | 'error';

/**
 * 分析特性配置
 */
export interface RsdoctorFeatures {
  /** 是否启用 Loader 分析 */
  loader?: boolean;
  /** 是否启用插件分析 */
  plugins?: boolean;
  /** 是否启用解析器分析 */
  resolver?: boolean;
  /** 是否启用产物分析 */
  bundle?: boolean;
  /** 是否启用 Tree Shaking 分析 */
  treeShaking?: boolean;
}

/**
 * Linter 配置
 */
export interface RsdoctorLinter {
  /** 规则级别 */
  level?: LinterLevel;
  /** 扩展的规则集 */
  extends?: unknown[];
  /** 自定义规则 */
  rules?: Record<string, unknown>;
}

/**
 * 其他支持特性配置
 */
export interface RsdoctorSupports {
  /** 是否生成平铺图 */
  generateTileGraph?: boolean;
}

/**
 * 报告代码类型配置
 */
export interface RsdoctorReportCodeType {
  /** 不输出模块源代码 */
  noModuleSource?: boolean;
  /** 不输出资源和模块源代码 */
  noAssetsAndModuleSource?: boolean;
}

/**
 * HTML 输出相关配置
 */
export interface RsdoctorHtmlOptions {
  /** HTML 报告文件名，默认为 report-rsdoctor.html */
  reportHtmlName?: string;
}

/**
 * JSON 输出包含的模块配置
 */
export interface RsdoctorJsonSections {
  /** 是否包含模块图数据，默认为 true */
  moduleGraph?: boolean;
  /** 是否包含 Chunk 图数据，默认为 true */
  chunkGraph?: boolean;
  /** 是否包含规则数据，默认为 true */
  rules?: boolean;
}

/**
 * JSON 输出相关配置
 */
export interface RsdoctorJsonOptions {
  /** JSON 输出包含的模块配置 */
  sections?: RsdoctorJsonSections;
}

/**
 * 输出类型
 */
export type RsdoctorOutputType = 'html' | 'json';

/**
 * 报告输出选项配置
 */
export interface RsdoctorReportOptions {
  /** 输出类型，支持 'html' 和 'json' 数组，可同时选择多种格式 */
  type?: RsdoctorOutputType[];
  /** HTML 输出相关配置 */
  htmlOptions?: RsdoctorHtmlOptions;
  /** JSON 输出相关配置 */
  jsonOptions?: RsdoctorJsonOptions;
  /** 是否压缩分析数据 */
  compressData?: boolean;
}

/**
 * Output 输出配置
 */
export interface RsdoctorOutputOptions {
  /** 报告模式 */
  mode?: RsdoctorMode;
  /** 报告代码类型配置 */
  reportCodeType?: RsdoctorReportCodeType;
  /** 报告输出目录 */
  reportDir?: string;
  /** 报告输出选项配置 */
  options?: RsdoctorReportOptions;
}

/**
 * Rsdoctor 插件完整配置
 */
export interface RsdoctorOptions {
  /** 是否禁用客户端服务器（不自动打开浏览器） */
  disableClientServer?: boolean;
  /** 报告模式：brief-简要、normal-正常（已废弃，请使用 output.mode） */
  mode?: RsdoctorMode;
  /** 启用的分析特性 */
  features?: RsdoctorFeatures;
  /** Linter 规则配置 */
  linter?: RsdoctorLinter;
  /** 其他支持特性 */
  supports?: RsdoctorSupports;
  /** 分析报告输出配置 */
  output?: RsdoctorOutputOptions;
  /** Rsdoctor 分析服务器端口号 */
  port?: number;
}

/**
 * Rsdoctor 配置（可以是布尔值或完整配置对象）
 */
export type RsdoctorConfig = boolean | RsdoctorOptions;
