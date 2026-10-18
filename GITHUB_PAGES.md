# 使用 GitHub Pages 部署 PAWLY 官网

> 适用项目：`pawly-storefront`
>
> 目标：把项目推到 GitHub，用 GitHub Actions 自动构建，并发布到 GitHub Pages。
>
> 项目已经包含：
> - `.github/workflows/deploy-pages.yml`
> - `base` 路径支持（`PUBLIC_BASE_PATH`）
> - 动态 `robots.txt`（Sitemap 自动跟随域名和 base）
> - `public/.nojekyll`（避免 GitHub Pages 的 Jekyll 处理 `_astro` 目录）
>
> 你只需要选择下面三种方式之一。

---

## 0. 先选部署方式

| 方式 | 访问地址 | 需要域名 | 推荐场景 |
|---|---|---|---|
| **A. 项目站点** | `https://<用户名>.github.io/<仓库名>/` | 否 | 快速预览、作品展示、内部评审 |
| **B. 自定义域名** | `https://pawly.com/` 或 `https://www.pawly.com/` | 是 | 正式公司官网、SEO、客户访问 |
| **C. 用户站点** | `https://<用户名>.github.io/` | 否 | 个人/品牌主站，仓库名必须是 `<用户名>.github.io` |

**正式上线推荐 B（自定义域名）**。GitHub Pages 的项目站点虽然免费，但域名是共享的 `github.io`，且站点在子路径下，robots、Cookie、SEO 都不如独立域名干净。

---

## 1. 前置准备

### 1.1 本地环境

- Node.js 20+，推荐 22
- pnpm 11.x
- Git
- 一个 GitHub 账号

确认：

```bash
node -v
pnpm -v
git --version
```

### 1.2 创建仓库

在 GitHub 新建一个仓库，例如：

```text
pawly-storefront
```

建议：

- 公开仓库（Public）：GitHub Pages 免费
- 私有仓库：需要 GitHub Pro/Team/Enterprise 才可使用 Pages
- 不要勾选自动生成 README（本地已有 README）

### 1.3 推送本地代码

在项目根目录：

```bash
git init
git add .
git commit -m "Initial PAWLY website"

git branch -M main
git remote add origin https://github.com/<你的用户名>/pawly-storefront.git
git push -u origin main
```

`.gitignore` 已排除：

```text
node_modules/
dist/
.astro/
.pnpm-store/
_screenshots/
_assets_src/
pawly-website.zip
```

---

## 2. 方式 A：项目站点（不需要域名）

### 2.1 开启 GitHub Pages

进入仓库：

```text
Settings -> Pages -> Build and deployment
```

把 **Source** 设为：

```text
GitHub Actions
```

不要选 “Deploy from a branch”，本项目使用 Actions 构建。

### 2.2 触发部署

推送代码后，`.github/workflows/deploy-pages.yml` 会自动运行。

也可以手动触发：

```text
Actions -> Deploy to GitHub Pages -> Run workflow
```

第一次部署可能会要求批准 `github-pages` 环境：

```text
Review deployments -> Approve and deploy
```

### 2.3 访问地址

部署完成后：

```text
https://<你的用户名>.github.io/pawly-storefront/
```

中文首页：

```text
https://<你的用户名>.github.io/pawly-storefront/zh/
```

> 仓库名包含大写字母时，GitHub Pages 的路径通常按仓库名原样显示；建议仓库名统一使用小写和连字符，例如 `pawly-storefront`。

### 2.4 这个地址为什么能正常工作？

Workflow 会自动设置：

```text
PUBLIC_SITE_URL  = https://<用户名>.github.io
PUBLIC_BASE_PATH = /<仓库名>
```

项目中的 `withLang()`、`productPath()`、`asset()` 会给所有内部链接、图片、CSS、JS 加上 base 前缀。

例如：

```text
/                              -> /pawly-storefront/
/products/                     -> /pawly-storefront/products/
/images/hero-pawly.webp        -> /pawly-storefront/images/hero-pawly.webp
/_astro/about.xxxx.css         -> /pawly-storefront/_astro/about.xxxx.css
```

因此不需要改代码。

### 2.5 项目站点的限制

- 站点在子路径下，`robots.txt` 也在子路径下，搜索引擎可能不会把它当作域名根目录的 robots 使用。
- canonical / sitemap 会带 `/pawly-storefront/`，适合预览，但不适合作为长期公司官网。
- 如果以后绑定自定义域名，需要把 `BASE_PATH` 改为 `/`，否则会出现路径错乱。

正式对外建议继续看方式 B。

---

## 3. 方式 B：自定义域名（推荐正式上线）

### 3.1 准备域名

假设你的域名是：

```text
pawly.com
```

推荐选择其中一个作为主域名：

- `pawly.com`（apex 根域名）
- `www.pawly.com`（www 子域名）

下面的示例以 `www.pawly.com` 为主域名；如果你用根域名，把 `www` 换成 `@`，并调整 CNAME 配置即可。

### 3.2 设置 GitHub Actions 变量

进入仓库：

```text
Settings -> Secrets and variables -> Actions -> Variables
```

新建：

| 变量名 | 值（示例） | 说明 |
|---|---|---|
| `SITE_URL` | `https://www.pawly.com` | 最终访问地址，不带结尾 `/` |
| `BASE_PATH` | `/` | 自定义域名部署在根目录 |
| `CNAME` | `www.pawly.com` | 写入构建产物的 CNAME |

Workflow 会在构建前自动生成 `public/CNAME`，内容就是 `CNAME` 变量的值。

> 如果不想用变量，也可以手动创建 `public/CNAME`，内容写 `www.pawly.com`，然后不要在 GitHub 变量里设置 `CNAME`。两种方式二选一。

### 3.3 配置 DNS

在域名服务商处添加：

#### 使用 `www.pawly.com` 作为主域名

| 类型 | 主机记录 | 值 |
|---|---|---|
| CNAME | `www` | `<你的用户名>.github.io` |
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |

A 记录用于让根域名也能访问/跳转。GitHub Pages 推荐使用这四个 IP。

#### 使用 `pawly.com` 作为主域名

| 类型 | 主机记录 | 值 |
|---|---|---|
| A | `@` | `185.199.108.153` |
| A | `@` | `185.199.109.153` |
| A | `@` | `185.199.110.153` |
| A | `@` | `185.199.111.153` |
| CNAME | `www` | `<你的用户名>.github.io` |

> 不要同时保留冲突的 A/AAAA 记录。配错 AAAA 记录会导致 GitHub Pages 证书验证失败。
>
> 如果使用 Cloudflare，先把代理状态设为 **DNS only（灰色云朵）**，等 GitHub Pages 证书签发成功后再考虑是否开启代理。

验证：

```bash
dig +short www.pawly.com
dig +short pawly.com
```

### 3.4 在 GitHub Pages 中设置自定义域名

进入：

```text
Settings -> Pages -> Custom domain
```

填写：

```text
www.pawly.com
```

保存后等待 GitHub 检查 DNS。DNS 生效后，GitHub 会自动申请 TLS 证书。

然后打开：

```text
Enforce HTTPS
```

> 证书签发可能需要几分钟到 24 小时。没签发前不要反复改 DNS。

### 3.5 触发部署

```text
Actions -> Deploy to GitHub Pages -> Run workflow
```

或直接 push 一次：

```bash
git commit --allow-empty -m "Trigger Pages deploy"
git push
```

部署完成后访问：

```text
https://www.pawly.com/
https://www.pawly.com/zh/
```

### 3.6 检查 CNAME 是否进入构建产物

Actions 的构建步骤会执行：

```bash
echo "www.pawly.com" > public/CNAME
pnpm build
```

所以 `dist/CNAME` 应该存在。GitHub Pages 会读取它。

如果你在本地构建，也可以手动验证：

```bash
PUBLIC_SITE_URL=https://www.pawly.com PUBLIC_BASE_PATH=/ pnpm build
cat dist/CNAME
```

Windows PowerShell：

```powershell
$env:PUBLIC_SITE_URL = 'https://www.pawly.com'
$env:PUBLIC_BASE_PATH = '/'
pnpm build
Get-Content dist\CNAME
```

---

## 4. 方式 C：用户站点 `<用户名>.github.io`

如果你想要根路径 `https://<用户名>.github.io/`，可以把仓库命名为：

```text
<用户名>.github.io
```

例如用户名是 `pawly`，仓库名就是：

```text
pawly.github.io
```

使用这种方式时，在仓库变量中设置：

```text
BASE_PATH=/
```

`SITE_URL` 可以设置为 `https://<用户名>.github.io`；不设置时，workflow 会默认使用 `https://<用户名>.github.io`。但 `BASE_PATH` 必须显式设为 `/`，否则会按普通项目站点处理，生成 `/用户名.github.io/` 的错误路径。

访问：

```text
https://<用户名>.github.io/
```

这种方式也不需要买域名，但品牌域名仍然是 `github.io`。

---

## 5. 手动本地构建 GitHub Pages 版本

Workflow 之外，也可以本地验证 GitHub Pages 的构建结果。

### 5.1 项目站点

Windows PowerShell：

```powershell
$env:PUBLIC_SITE_URL = 'https://<用户名>.github.io'
$env:PUBLIC_BASE_PATH = '/pawly-storefront'
pnpm build
```

macOS / Linux：

```bash
PUBLIC_SITE_URL="https://<用户名>.github.io" \
PUBLIC_BASE_PATH="/pawly-storefront" \
pnpm build
```

### 5.2 自定义域名

```powershell
$env:PUBLIC_SITE_URL = 'https://www.pawly.com'
$env:PUBLIC_BASE_PATH = '/'
pnpm build
```

### 5.3 检查构建结果

```bash
# 首页里的资源路径应带 /pawly-storefront/
grep -o 'href="[^"]*"' dist/index.html | head

# robots.txt 的 Sitemap 应带 base
cat dist/robots.txt

# sitemap 应带 base
cat dist/sitemap-0.xml

# 链接/图片完整性
pnpm check:site
```

> `pnpm check:site` 会读取 `PUBLIC_SITE_URL` 和 `PUBLIC_BASE_PATH`，所以运行前要确保环境变量与构建时一致。

### 5.4 本地模拟子路径

不要直接打开 `dist/index.html`。可以在临时目录中模拟：

```bash
mkdir -p /tmp/pawly-pages
cp -R dist /tmp/pawly-pages/pawly-storefront
cd /tmp/pawly-pages
python -m http.server 8080
```

打开：

```text
http://localhost:8080/pawly-storefront/
```

---

## 6. 工作流说明

文件：

```text
.github/workflows/deploy-pages.yml
```

关键点：

```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

```yaml
env:
  PUBLIC_SITE_URL: ${{ vars.SITE_URL || format('https://{0}.github.io', github.repository_owner) }}
  PUBLIC_BASE_PATH: ${{ vars.BASE_PATH || format('/{0}', github.event.repository.name) }}
```

- 没有设置变量时：按“项目站点”处理，base 为 `/<仓库名>`
- 设置 `BASE_PATH=/`：按“自定义域名/用户站点”处理
- `CNAME` 变量存在时：构建前写入 `public/CNAME`

工作流步骤：

1. 拉取代码
2. 安装 pnpm / Node 22
3. `pnpm install --frozen-lockfile`
4. 写入 CNAME（可选）
5. `pnpm check`
6. `pnpm build`
7. `pnpm check:site`
8. 上传 `dist` 为 Pages artifact
9. 部署到 GitHub Pages

---

## 7. 更新与回滚

### 更新

直接推送：

```bash
git add .
git commit -m "Update website"
git push
```

Actions 会自动重新构建并部署。

### 回滚

方式一：回退代码

```bash
git revert <commit>
git push
```

方式二：在 GitHub Actions 中找到上一次成功的部署，重新运行对应 commit 的 workflow。

> 不要直接修改 `dist/`，它不会被提交，也会在下次构建时被覆盖。

---

## 8. 常见问题

### 8.1 页面能打开，但 CSS / 图片 404

最常见原因是 base 不匹配。

检查 Actions 日志中的：

```text
PUBLIC_BASE_PATH
PUBLIC_SITE_URL
```

项目站点必须是：

```text
PUBLIC_BASE_PATH=/<仓库名>
```

自定义域名必须是：

```text
PUBLIC_BASE_PATH=/
```

然后看构建出的 HTML：

```bash
grep -o 'src="[^"]*"' dist/index.html | head
```

项目站点应该看到：

```text
/pawly-storefront/images/...
```

自定义域名应该看到：

```text
/images/...
```

### 8.2 `https://<用户名>.github.io/<仓库名>/` 404

检查：

- 仓库 Settings -> Pages -> Source 是否为 **GitHub Actions**
- Actions 是否成功
- 部署环境 `github-pages` 是否已批准
- 是否在 `main` 分支触发

### 8.3 Actions 报 `Get Pages site failed`

通常是 Pages 还没开启，或 Source 不是 GitHub Actions。

去：

```text
Settings -> Pages -> Build and deployment -> Source -> GitHub Actions
```

再重新运行 workflow。

### 8.4 自定义域名一直验证失败

检查：

```bash
dig +short www.pawly.com
dig +short pawly.com
```

常见原因：

- CNAME 写成了 `https://...`（DNS 里不要带协议）
- 还保留着冲突的 AAAA 记录
- Cloudflare 代理开启（先改 DNS only）
- DNS 还没生效
- `CNAME` 变量与 GitHub Pages 设置里的域名不一致

### 8.5 自定义域名下图片 404，`github.io` 地址正常

说明构建时 `BASE_PATH` 还是仓库子路径。把 GitHub Actions 变量改成：

```text
BASE_PATH=/
SITE_URL=https://www.pawly.com
CNAME=www.pawly.com
```

然后重新运行 workflow。

### 8.6 私有仓库无法使用 Pages

GitHub Pages 对私有仓库需要付费计划。公开仓库免费。

### 8.7 `pnpm check:site` 报错

本地运行时需要与构建相同的环境变量：

```powershell
$env:PUBLIC_SITE_URL = 'https://<用户名>.github.io'
$env:PUBLIC_BASE_PATH = '/pawly-storefront'
pnpm build
pnpm check:site
```

### 8.8 `robots.txt` 在哪里

由 `src/pages/robots.txt.ts` 生成，不再使用 `public/robots.txt`。

内容会自动包含：

```text
Sitemap: https://<域名>/<base>/sitemap-index.xml
```

### 8.9 表单能提交吗

GitHub Pages 只能托管静态文件，不能运行后端。

当前表单仍是 `mailto:`，会打开访客的邮件客户端。要真正收集询盘，需要接 Formspree / Netlify Forms / 自建 API。

### 8.10 中国大陆访问慢

`github.io` 和 GitHub Pages 的 CDN 在中国大陆访问可能不稳定。正式面向国内客户时，建议使用国内云服务器 + 已备案域名，或使用国内静态托管/CDN。面向海外客户时 GitHub Pages 通常可用。

---

## 9. 安全与注意事项

- GitHub Actions 变量不是密钥，不要放密码、API Key。
- 如果表单接入第三方服务，密钥放在 GitHub Secrets，不要写进源码。
- 不要把 `node_modules/`、`dist/`、`.env` 提交到仓库。
- 自定义域名证书由 GitHub 管理；开启 Enforce HTTPS 后不要随意关闭。
- 如果使用 Cloudflare，先 DNS only，证书和站点稳定后再决定是否代理。
- GitHub Pages 不支持服务端重定向、表单处理、数据库；需要这些能力时使用 VPS/Nginx 或 Netlify/Vercel Functions。

---

## 10. 最短操作清单

### 只想快速看效果（项目站点）

```bash
git init
git add .
git commit -m "Deploy PAWLY"
git branch -M main
git remote add origin https://github.com/<用户名>/pawly-storefront.git
git push -u origin main
```

然后在 GitHub：

```text
Settings -> Pages -> Source -> GitHub Actions
Actions -> Deploy to GitHub Pages -> Run workflow
```

访问：

```text
https://<用户名>.github.io/pawly-storefront/
```

### 正式域名

在仓库变量中设置：

```text
SITE_URL=https://www.pawly.com
BASE_PATH=/
CNAME=www.pawly.com
```

DNS：

```text
www  CNAME  <用户名>.github.io
@    A      185.199.108.153
@    A      185.199.109.153
@    A      185.199.110.153
@    A      185.199.111.153
```

GitHub Pages 设置自定义域名 `www.pawly.com`，开启 Enforce HTTPS，重新运行 workflow。
