# @winner-fed/plugin-rsdoctor

WinJS 的 Rsdoctor 插件，用于构建分析和性能优化。

<p>
  <a href="https://npmjs.com/package/@winner-fed/plugin-rsdoctor">
   <img src="https://img.shields.io/npm/v/@winner-fed/plugin-rsdoctor?style=flat-square&colorA=564341&colorB=EDED91" alt="npm version" />
  </a>
  <img src="https://img.shields.io/badge/License-MIT-blue.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="license" />
  <a href="https://npmcharts.com/compare/@winner-fed/plugin-rsdoctor?minimal=true"><img src="https://img.shields.io/npm/dm/@winner-fed/plugin-rsdoctor.svg?style=flat-square&colorA=564341&colorB=EDED91" alt="downloads" /></a>
</p>

## 介绍

[Rsdoctor](https://rsdoctor.rs) 是一个面向 Rspack 和 Webpack 的构建分析工具，提供构建时间分析、编译分析、产物分析等能力，帮助开发者分析并优化构建性能。

本插件将 Rsdoctor 集成到 WinJS 框架中，支持 Rspack、Webpack 和 Rsbuild 构建工具。

## 构建工具支持

| 构建工具 | 支持情况 | 实现方式 | 所需依赖 |
|---------|---------|---------|---------|
| **Webpack** | ✅ 支持 | `@rsdoctor/webpack-plugin` | `@rsdoctor/webpack-plugin` |
| **Rsbuild** | ✅ 支持 | Rsbuild 内置 `performance.rsdoctor` | 无需额外依赖 |
| **Vite** | ❌ 不支持 | - | - |

## 安装

根据你使用的构建工具选择安装：

### Webpack 项目

```bash
# pnpm（推荐）
pnpm add -D @winner-fed/plugin-rsdoctor @rsdoctor/webpack-plugin

# npm
npm add -D @winner-fed/plugin-rsdoctor @rsdoctor/webpack-plugin
```

### Rsbuild 项目

```bash
# pnpm（推荐）
pnpm add -D @winner-fed/plugin-rsdoctor @rsdoctor/rspack-plugin

# npm
npm add -D @winner-fed/plugin-rsdoctor @rsdoctor/rspack-plugin
```

## 使用

在 `.winrc.ts` 中配置插件：

```ts
// .winrc.ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  // 启用 rsdoctor
  rsdoctor: true
};
```

然后运行构建命令，Rsdoctor 会自动打开分析页面：

```bash
npm run dev
# 或
npm run build
```

## 配置选项

### 基础用法

简单启用，使用默认配置：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: true
};
```

### 高级配置

传递详细配置给 Rsdoctor：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    // 禁用客户端服务器（构建完成后不自动打开浏览器）
    disableClientServer: false,
    
    // 报告模式：brief（简要）、normal（正常）、full（完整）
    mode: 'normal',
    
    // 启用的分析特性
    features: {
      loader: true,      // Loader 分析
      plugins: true,     // 插件分析
      resolver: true,    // 解析器分析
      bundle: true,      // 产物分析
      treeShaking: true  // Tree Shaking 分析
    },
    
    // Linter 规则配置
    linter: {
      level: 'warn',     // 规则级别：off | warn | error
      extends: [],       // 扩展的规则集
      rules: {}          // 自定义规则
    },
    
    // 其他支持特性
    supports: {
      generateTileGraph: true  // 生成平铺图
    },
    
    // 分析报告输出配置
    output: {
      mode: 'normal',                     // 报告模式：brief | normal
      reportCodeType: {
        noModuleSource: false,            // 不输出模块源代码
        noAssetsAndModuleSource: false    // 不输出资源和模块源代码
      },
      reportDir: './reports',             // 报告输出目录
      options: {
        type: ['html', 'json'],           // 输出类型
        htmlOptions: {
          reportHtmlName: 'report-rsdoctor.html'  // HTML 文件名
        },
        jsonOptions: {
          sections: {
            moduleGraph: true,            // 包含模块图数据
            chunkGraph: true,             // 包含 Chunk 图数据
            rules: true                   // 包含规则数据
          }
        },
        compressData: false               // 是否压缩数据
      }
    },
    
    // Rsdoctor 分析服务器端口号
    port: 8791
  }
};
```

### 配置选项说明

#### disableClientServer

- 类型：`boolean`
- 默认值：`false`
- 说明：是否禁用客户端服务器。设置为 `true` 时，构建完成后不会自动打开浏览器分析页面。

#### features

- 类型：`object`
- 说明：控制启用的分析特性

  - `loader`：是否启用 Loader 分析，分析各个 loader 的执行时间和输入输出
  - `plugins`：是否启用插件分析，分析各个插件的执行时间
  - `resolver`：是否启用解析器分析，分析模块解析过程
  - `bundle`：是否启用产物分析，分析最终产物的体积和组成
  - `treeShaking`：是否启用 Tree Shaking 分析，分析未使用的代码

#### linter

- 类型：`object`
- 说明：Linter 规则配置，用于检测构建过程中的潜在问题

  - `level`：规则级别，可选值 `'off'` | `'warn'` | `'error'`
  - `extends`：扩展的规则集数组
  - `rules`：自定义规则对象

#### supports

- 类型：`object`
- 说明：其他支持的特性配置

  - `generateTileGraph`：是否生成平铺图，用于可视化模块关系

#### output

- 类型：`object`
- 默认值：`undefined`
- 说明：分析报告输出配置对象

**子配置项：**

##### output.mode

- 类型：`'brief' | 'normal'`
- 默认值：`'normal'`
- 说明：报告模式
  - `normal`：在构建产物目录中生成一个 `.rsdoctor` 文件夹，包含各种数据文件，并在报告页面中展示代码
  - `brief`：在构建产物目录中生成单个 HTML 报告文件，所有构建信息都整合到这个 HTML 文件中

##### output.reportCodeType

- 类型：`{ noModuleSource?: boolean; noAssetsAndModuleSource?: boolean }`
- 默认值：`undefined`
- 说明：报告代码类型配置，用于控制输出数据大小，适用于大型项目减小报告体积
  - `noModuleSource`：不输出模块源代码
  - `noAssetsAndModuleSource`：不输出资源和模块源代码

##### output.reportDir

- 类型：`string`
- 默认值：`undefined`
- 说明：报告输出目录路径，相对于当前工作目录或绝对路径。指定报告文件存放的位置

##### output.options

- 类型：`object`
- 默认值：`undefined`
- 说明：分析报告输出选项配置

**子配置项：**

###### output.options.type

- 类型：`Array<'html' | 'json'>`
- 默认值：`undefined`
- 说明：输出类型，支持 `'html'` 和 `'json'` 数组，可同时选择多种格式
  - 如果配置了 `['html', 'json']`，则会生成一个 html 文件，同时生成一个 json 文件
  - 如果配置了 `['json']`，则会生成一个 json 文件。文件名为 `rsdoctor-data.json`
  - 如果配置了 `['html']`，则会生成一个 html 文件。文件名可通过 `htmlOptions.reportHtmlName` 配置

###### output.options.htmlOptions

- 类型：`object`
- 说明：HTML 输出相关配置
  - `reportHtmlName`：HTML 报告文件名，默认为 `report-rsdoctor.html`

###### output.options.jsonOptions

- 类型：`object`
- 说明：JSON 输出相关配置
  - `sections`：JSON 输出包含的模块配置
    - `moduleGraph`：是否包含模块图数据，默认为 `true`
    - `chunkGraph`：是否包含 Chunk 图数据，默认为 `true`
    - `rules`：是否包含规则数据，默认为 `true`

###### output.options.compressData

- 类型：`boolean`
- 默认值：`false`
- 说明：是否压缩分析数据。启用后可以减小报告文件大小

**使用示例：**

```ts
output: {
  mode: 'normal',
  reportDir: './reports',
  reportCodeType: {
    noModuleSource: true
  },
  options: {
    type: ['html', 'json'],
    htmlOptions: {
      reportHtmlName: 'my-report.html'
    },
    jsonOptions: {
      sections: {
        moduleGraph: true,
        chunkGraph: true,
        rules: false
      }
    },
    compressData: true
  }
}
```

参考：[Rsdoctor Output 配置文档](https://rsdoctor.rs/zh/config/options/output)

#### port

- 类型：`number`
- 默认值：`8791`
- 说明：指定 Rsdoctor 分析服务器的端口号。当启用客户端服务器时（`disableClientServer: false`），会在此端口启动本地服务来展示分析报告。


## 常见使用场景

### 场景 1：仅在需要时启用

建议仅在需要分析构建时启用 Rsdoctor，通过环境变量控制：

```ts
// .winrc.ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: process.env.RSDOCTOR === 'true'
};
```

在 `package.json` 中添加专门的脚本：

```json
{
  "scripts": {
    "dev": "win dev",
    "dev:doctor": "RSDOCTOR=true win dev",
    "build": "win build",
    "build:doctor": "RSDOCTOR=true win build"
  }
}
```

### 场景 2：轻量级分析

如果只需要快速分析，可以使用简要模式并禁用部分特性：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    mode: 'brief',
    features: {
      loader: true,
      bundle: true,
      plugins: false,
      resolver: false,
      treeShaking: false
    }
  }
};
```

### 场景 3：CI/CD 环境

在持续集成环境中，可能不需要打开浏览器：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    disableClientServer: true,
    mode: 'normal'
  }
};
```

### 场景 4：深度优化分析

需要全面分析和优化时，开启所有特性：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    mode: 'normal',
    features: {
      loader: true,
      plugins: true,
      resolver: true,
      bundle: true,
      treeShaking: true
    },
    linter: {
      level: 'warn'
    },
    supports: {
      generateTileGraph: true
    }
  }
};
```

### 场景 5：自定义输出路径和端口

自定义报告输出位置和服务器端口：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    // 自定义输出配置
    output: {
      mode: 'normal',
      reportDir: './dist/reports'
    },
    // 使用 9000 端口启动分析服务器
    port: 9000
  }
};
```

### 场景 6：多项目共存

在多个项目同时开启 Rsdoctor 时，避免端口冲突：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    // 为不同项目配置不同端口
    port: 8792, // 项目 A 使用 8792
    output: {
      reportDir: `./rsdoctor-report-${Date.now()}` // 按时间戳命名避免覆盖
    }
  }
};
```

### 场景 7：大型项目优化报告体积

对于大型项目，可以通过配置减小报告文件大小：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    output: {
      mode: 'brief',  // 使用 brief 模式生成轻量级报告
      reportDir: './reports',
      // 不输出模块源代码，减小报告体积
      reportCodeType: {
        noModuleSource: true
      },
      options: {
        type: ['json'],  // 只生成 JSON 文件
        jsonOptions: {
          sections: {
            moduleGraph: false,  // 不包含模块图数据
            chunkGraph: true,
            rules: false
          }
        },
        compressData: true  // 启用数据压缩
      }
    }
  }
};
```

### 场景 8：同时生成 HTML 和 JSON 报告

同时生成 HTML 和 JSON 格式的报告，方便不同场景使用：

```ts
export default {
  plugins: ['@winner-fed/plugin-rsdoctor'],
  rsdoctor: {
    output: {
      mode: 'normal',
      reportDir: './reports',
      options: {
        type: ['html', 'json'],  // 同时生成 HTML 和 JSON
        htmlOptions: {
          reportHtmlName: 'analysis-report.html'
        },
        jsonOptions: {
          sections: {
            moduleGraph: true,
            chunkGraph: true,
            rules: true
          }
        }
      }
    }
  }
};
```

## Rsdoctor 分析内容

启用 Rsdoctor 后，你可以获得以下分析数据：

- **构建时间分析**：各个阶段的构建时间分布
- **Loader 分析**：各个 loader 的执行时间和转换结果
- **插件分析**：各个插件的执行时间和影响
- **模块分析**：模块的依赖关系和体积
- **产物分析**：最终产物的体积、重复依赖等
- **Tree Shaking 分析**：未使用的代码检测
- **Resolver 分析**：模块解析路径和性能

## 版本要求

- `@rsdoctor/rspack-plugin`: >= 1.3.6
- `@winner-fed/winjs`: >= 0.17.0

## 更多信息

- [Rsdoctor 官网](https://rsdoctor.rs)
- [Rsdoctor GitHub](https://github.com/web-infra-dev/rsdoctor)
- [使用指南](https://rsdoctor.rs/zh/guide/start/intro)

## License

[MIT](./LICENSE).
