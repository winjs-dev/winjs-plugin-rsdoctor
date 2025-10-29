import { RsdoctorRspackPlugin } from '@rsdoctor/rspack-plugin';
import { RsdoctorWebpackPlugin } from '@rsdoctor/webpack-plugin';
import type { IApi } from '@winner-fed/winjs';

export type {
  LinterLevel,
  RsdoctorConfig,
  RsdoctorFeatures,
  RsdoctorHtmlOptions,
  RsdoctorJsonOptions,
  RsdoctorJsonSections,
  RsdoctorLinter,
  RsdoctorMode,
  RsdoctorOptions,
  RsdoctorOutputOptions,
  RsdoctorOutputType,
  RsdoctorReportCodeType,
  RsdoctorReportOptions,
  RsdoctorSupports,
} from './types.js';

export default (api: IApi) => {
  api.describe({
    key: 'rsdoctor',
    enableBy: api.EnableBy.config,
    config: {
      // biome-ignore lint/suspicious/noExplicitAny: zod 参数来自 winjs API
      schema({ zod }: any) {
        return zod
          .union([
            // 支持简单的布尔值启用/禁用
            zod
              .boolean()
              .describe('是否启用 Rsdoctor 构建分析工具'),
            // 支持详细配置对象
            zod.object({
              // 是否禁用客户端服务器（不自动打开浏览器）
              disableClientServer: zod
                .boolean()
                .optional()
                .describe(
                  '是否禁用客户端服务器。设置为 true 时，构建完成后不会自动打开浏览器展示分析报告',
                ),

              // 报告模式：brief-简要、normal-正常
              mode: zod
                .enum(['brief', 'normal'])
                .optional()
                .describe(
                  '报告模式（V1.2.4 新增）。brief: 在构建产物目录中生成单个 HTML 报告文件；normal: 在构建产物目录中生成 .rsdoctor 文件夹，包含各种数据文件并在报告页面中展示代码。默认为 normal',
                ),

              // 分析特性配置
              features: zod
                .object({
                  loader: zod
                    .boolean()
                    .optional()
                    .describe(
                      '是否启用 Loader 分析，用于分析各个 loader 的执行时间和输入输出',
                    ),
                  plugins: zod
                    .boolean()
                    .optional()
                    .describe('是否启用插件分析，用于分析各个插件的执行时间'),
                  resolver: zod
                    .boolean()
                    .optional()
                    .describe('是否启用解析器分析，用于分析模块解析过程和性能'),
                  bundle: zod
                    .boolean()
                    .optional()
                    .describe(
                      '是否启用产物分析，用于分析最终产物的体积、重复依赖等',
                    ),
                  treeShaking: zod
                    .boolean()
                    .optional()
                    .describe(
                      '是否启用 Tree Shaking 分析，用于检测未使用的代码',
                    ),
                })
                .optional()
                .describe('分析特性配置，可以选择性启用需要的分析功能'),

              // Linter 规则配置
              linter: zod
                .object({
                  level: zod
                    .enum(['off', 'warn', 'error'])
                    .optional()
                    .describe(
                      'Linter 规则级别。off: 关闭；warn: 警告；error: 错误',
                    ),
                  extends: zod
                    .array(zod.any())
                    .optional()
                    .describe('扩展的 Linter 规则集数组'),
                  rules: zod
                    .record(zod.any())
                    .optional()
                    .describe('自定义 Linter 规则对象'),
                })
                .optional()
                .describe('Linter 规则配置，用于检测构建过程中的潜在问题'),

              // 其他支持特性
              supports: zod
                .object({
                  generateTileGraph: zod
                    .boolean()
                    .optional()
                    .describe('是否生成平铺图，用于可视化模块之间的依赖关系'),
                })
                .optional()
                .describe('其他支持特性配置'),

              // 分析报告输出配置
              output: zod
                .object({
                  mode: zod
                    .enum(['brief', 'normal'])
                    .optional()
                    .describe(
                      'brief: 用于生成轻量级的分析报告，支持 HTML 和 JSON 两种输出格式；normal: 在构建产物目录中生成 .rsdoctor 文件夹，包含各种数据文件。默认为 normal',
                    ),
                  reportCodeType: zod
                    .object({
                      noModuleSource: zod
                        .boolean()
                        .optional()
                        .describe(
                          '输出除模块（Module）代码外的数据，模块（Module）代码即产物（（Module））内各个文件的打包模块代码',
                        ),
                      noAssetsAndModuleSource: zod
                        .boolean()
                        .optional()
                        .describe(
                          '输出除模块（Module）代码和 Assets 产物代码外的数据',
                        ),
                    })
                    .optional()
                    .describe('选择输出的分析数据范围，用于控制输出数据的大小'),
                  reportDir: zod
                    .string()
                    .optional()
                    .describe('Rsdoctor 报告输出目录，默认是构建产物输出目录'),
                  options: zod
                    .object({
                      type: zod
                        .array(zod.enum(['html', 'json']))
                        .optional()
                        .describe(
                          '输出类型，支持 html 和 json 数组，可同时选择多种格式。如 ["html", "json"] 会同时生成 html 和 json 文件',
                        ),
                      htmlOptions: zod
                        .object({
                          reportHtmlName: zod
                            .string()
                            .optional()
                            .describe(
                              'HTML 报告文件名，默认为 report-rsdoctor.html',
                            ),
                        })
                        .optional()
                        .describe('HTML 输出相关配置'),
                      jsonOptions: zod
                        .object({
                          sections: zod
                            .object({
                              moduleGraph: zod
                                .boolean()
                                .optional()
                                .describe('是否包含模块图数据，默认为 true'),
                              chunkGraph: zod
                                .boolean()
                                .optional()
                                .describe('是否包含 Chunk 图数据，默认为 true'),
                              rules: zod
                                .boolean()
                                .optional()
                                .describe('是否包含规则数据，默认为 true'),
                            })
                            .optional()
                            .describe('JSON 输出包含的模块配置'),
                        })
                        .optional()
                        .describe('JSON 输出相关配置'),
                      compressData: zod
                        .boolean()
                        .optional()
                        .describe(
                          '是否压缩分析数据，启用后可以减小报告文件大小',
                        ),
                    })
                    .optional()
                    .describe(
                      '分析报告输出选项配置，包含 type、htmlOptions、jsonOptions、compressData 等',
                    ),
                })
                .optional()
                .describe(
                  '分析报告输出配置对象，包含 mode、reportCodeType、reportDir、options 等选项',
                ),

              // Rsdoctor 分析服务器端口号
              port: zod
                .number()
                .optional()
                .describe(
                  'Rsdoctor 分析服务器的端口号。当启用客户端服务器时，会在此端口启动本地服务展示分析报告。默认值: 8791',
                ),
            }),
          ])
          .describe(
            'Rsdoctor 构建分析工具配置。可以传入布尔值快速启用，或传入配置对象进行详细配置',
          );
      },
    },
  });

  // Vite 模式下不支持
  if (api.userConfig.vite) {
    api.logger.warn(
      '[rsdoctor] Rsdoctor 不支持 Vite 模式，请使用 Webpack 或 Rsbuild',
    );
    return;
  }

  // Rsbuild 模式使用自带功能
  if (api.userConfig.rsbuild) {
    api.modifyRspackConfig((memo) => {
      const cfg = api.userConfig.rsdoctor;
      if (!cfg) return memo;

      const opts =
        typeof cfg === 'boolean' ? { port: 8791 } : { port: 8791, ...cfg };

      memo.plugins ||= [];
      memo.plugins.push(new RsdoctorRspackPlugin(opts));

      api.logger.info('[plugin-rsdoctor] 已启用 Rsbuild 内置 Rsdoctor 功能');
      return memo;
    });
    return;
  }

  // Webpack 模式
  api.modifyWebpackConfig((memo) => {
    const cfg = api.userConfig.rsdoctor;
    if (!cfg) return memo;

    const opts =
      typeof cfg === 'boolean' ? { port: 8791 } : { port: 8791, ...cfg };

    memo.plugins = (memo.plugins || []).concat([
      new RsdoctorWebpackPlugin(opts),
    ]);

    api.logger.info('[plugin-rsdoctor] 已启用 Webpack Rsdoctor 插件');
    return memo;
  });
};
