# PAWLY 官网部署指南

> 适用项目：`pawly-storefront`（Astro 5 静态站点）
>
> 文档版本：2026-10-18
>
> 目标：让你能在本地电脑运行、在 Linux 服务器上线，并知道后续如何更新、回滚和排查问题。

---

## 0. 先看结论

### 推荐方案

| 场景 | 推荐做法 |
|---|---|
| 本地开发 / 预览 | Node.js 22 + pnpm 11 + `pnpm dev` |
| 正式生产 | Ubuntu 24.04 LTS + Nginx 静态托管 `dist/` |
| 构建位置 | 服务器上构建，或本地/CI 构建后上传 `dist/` |
| HTTPS | Let's Encrypt + Certbot |
| 进程守护 | 静态站点不需要 Node 进程，Nginx 直接托管文件 |
| 备选方案 | Docker + Nginx；Netlify / Vercel / Cloudflare Pages |

### 最重要的三点

1. **这是一个纯静态站**，构建产物在 `dist/`。生产环境不需要运行 `astro dev` 或 Node 服务。
2. **部署前必须改域名**：`astro.config.mjs` 的 `site` 目前是 `pawly.example.com`。不改会导致 canonical、hreflang、sitemap、robots 指向错误域名。`robots.txt` 由 `src/pages/robots.txt.ts` 自动生成。
3. **表单目前是 `mailto:` 方案**，上线前如果要真正收集询盘，需要接 Formspree、Netlify Forms 或自己的后端接口。

---

## 1. 架构与部署模型

```text
本地/CI                           Linux 服务器
┌──────────────┐                ┌──────────────────────────────┐
│ 源码          │  pnpm build    │  Nginx                       │
│ src/ public/  │ ─────────────► │  root /var/www/pawly/current │
│ package.json  │    dist/       │  ├─ index.html               │
└──────────────┘                │  ├─ products/...             │
                                │  ├─ zh/...                   │
                                │  ├─ _astro/                  │
                                │  └─ images/                  │
                                └──────────────────────────────┘
                                           │
                                           ▼
                                     https://example.com
```

### 发布目录模型

推荐用“release + symlink”的方式，便于回滚：

```text
/var/www/pawly/
├─ source/                         # Git 源码，构建在这里
├─ releases/
│  ├─ 20261018193000/              # 每次发布的静态文件
│  ├─ 20261019101500/
│  └─ ...
└─ current -> releases/20261019101500
```

Nginx 的 `root` 永远指向 `/var/www/pawly/current`。更新时只需要切换软链接，回滚也是切换软链接。

---

## 2. 环境要求

### 2.1 本地电脑

| 项目 | 要求 |
|---|---|
| 操作系统 | Windows 10/11、macOS 13+、Ubuntu 22.04+ 均可 |
| Node.js | 20+，推荐 22 LTS（项目在 22.18 验证） |
| pnpm | 11.x，推荐 11.28.5 |
| 浏览器 | Chrome / Edge / Firefox / Safari 最近两个大版本 |
| 内存 | 4 GB 以上 |
| 磁盘 | 项目 + `node_modules` 约 500 MB |

### 2.2 Linux 服务器

| 项目 | 最低配置 | 推荐配置 |
|---|---|---|
| 系统 | Ubuntu 22.04 LTS / Debian 12 | Ubuntu 24.04 LTS |
| CPU | 1 vCPU | 2 vCPU |
| 内存 | 1 GB | 2 GB |
| 磁盘 | 10 GB | 20 GB |
| 带宽 | 1 Mbps | 3 Mbps 以上 |
| 软件 | Nginx 1.22+、Git、Certbot | Nginx 1.24+、Git、Certbot |
| 端口 | 22、80、443 | 22、80、443 |
| 域名 | 一个已备案/可解析域名（按所在地区要求） | 主域名 + `www` |

> 1 GB 内存的服务器构建 Astro 可能偏紧。如果构建时被 OOM 杀掉，增加 1–2 GB swap，或改为本地构建后只上传 `dist/`。

### 2.3 不需要的东西

- 不需要数据库
- 不需要 Redis
- 不需要 PM2
- 不需要长期运行 Node 进程
- 不需要 Docker（除非你选择 Docker 方案）

---

## 3. 本地电脑运行方案

### 3.1 Windows（PowerShell）

#### 安装 Node.js

方式一：winget

```powershell
winget install OpenJS.NodeJS.LTS
```

方式二：从 <https://nodejs.org/> 下载 Windows LTS 安装包。

安装完成后关闭并重新打开 PowerShell，验证：

```powershell
node -v
npm -v
```

#### 安装 pnpm

```powershell
corepack enable
corepack prepare pnpm@11.28.5 --activate
pnpm -v
```

如果 `corepack` 不可用或权限报错，改用 npm：

```powershell
npm install -g pnpm@11.28.5
pnpm -v
```

#### 进入项目并安装依赖

```powershell
cd D:\mycode\dshworkspace
pnpm install
```

如果看到类似：

```text
Ignored build scripts: esbuild, sharp
```

执行：

```powershell
pnpm approve-builds --all
pnpm rebuild esbuild sharp
```

`pnpm-workspace.yaml` 已经声明了 `esbuild` 和 `sharp` 的构建许可，正常情况下不需要手动处理。

#### 启动开发服务器

```powershell
pnpm dev
```

浏览器打开：

```text
http://localhost:4321/
```

中文版：

```text
http://localhost:4321/zh/
```

开发服务器支持热更新，修改 `src/` 下的文件会自动刷新。

如果 4321 被占用：

```powershell
pnpm dev --port 4322
```

查找并结束占用端口的进程：

```powershell
Get-NetTCPConnection -LocalPort 4321 | Select-Object OwningProcess
Stop-Process -Id <PID>
```

#### 构建与本地预览生产版本

```powershell
pnpm build
pnpm preview
```

- `pnpm build` 生成 `dist/`
- `pnpm preview` 预览构建后的生产版本，默认也在 4321

#### 不安装 Node 的静态预览方式

如果只想看构建产物，可以直接用 Python：

```powershell
python -m http.server 8080 --directory dist
```

打开 `http://localhost:8080/`。

> 不要直接双击 `dist/index.html`。站点使用绝对路径（`/images/...`、`/_astro/...`），用 `file://` 打开会丢失样式和图片。

---

### 3.2 macOS / Linux

```bash
# 安装 Node（推荐用 nvm，或系统包管理器）
node -v

# 安装 pnpm
corepack enable
corepack prepare pnpm@11.28.5 --activate
pnpm -v

# 安装依赖
cd /path/to/pawly-storefront
pnpm install

# 开发
pnpm dev

# 构建 + 预览
pnpm build
pnpm preview
```

macOS 如果没有 `corepack`：

```bash
npm install -g pnpm@11.28.5
```

---

### 3.3 本地验收清单

打开以下地址，确认都正常：

| 地址 | 检查内容 |
|---|---|
| `http://localhost:4321/` | 英文首页、图片、导航 |
| `http://localhost:4321/zh/` | 中文首页、字体、换行 |
| `http://localhost:4321/products/` | 产品列表、分类筛选、搜索 |
| `http://localhost:4321/products/cloudstep-harness/` | 产品详情、图集切换 |
| `http://localhost:4321/wholesale/` | 批发页、FAQ、表单 |
| `http://localhost:4321/contact/` | 联系页、表单校验 |
| `http://localhost:4321/404.html` | 404 页面 |
| 手机宽度（DevTools） | 汉堡菜单、单列布局、无横向滚动 |

命令行检查：

```bash
pnpm check
pnpm build
pnpm check:site
```

预期：

```text
0 errors
0 warnings
PAGES=38
ERRORS=0
```

---

## 4. 上线前必须修改的配置

### 4.1 域名

编辑 `astro.config.mjs`：

```js
export default defineConfig({
  site: 'https://你的域名.com',
  // ...
});
```

`site` 会同时影响 canonical、hreflang、OG URL、sitemap 和自动生成的 `robots.txt`。修改后必须重新执行 `pnpm build`。

`robots.txt` 由 `src/pages/robots.txt.ts` 在构建时生成，Sitemap 地址会自动使用 `site` + `base`，不需要手动维护静态文件。

### 4.2 联系方式

编辑 `src/data/site.ts`：

```ts
export const site = {
  name: 'PAWLY',
  legalName: 'PAWLY Pet Goods',
  domain: 'https://你的域名.com',
  email: 'hello@你的域名.com',
  whatsappDisplay: '+86 ...',
  whatsappHref: 'https://wa.me/86...',
  address: {
    en: '...',
    zh: '...'
  },
  socials: [
    { label: 'Instagram', href: 'https://instagram.com/...' },
    { label: 'TikTok', href: 'https://tiktok.com/@...' },
    { label: 'LinkedIn', href: 'https://linkedin.com/company/...' }
  ]
};
```

### 4.3 产品、图片与文案

- 产品：`src/data/products.ts`
- 全部中英文文案：`src/i18n/ui.ts`
- 图片：`public/images/`
- 上线前替换清单：见 `README.md`

### 4.4 表单

当前 `src/components/InquiryForm.astro` 在提交时：

1. 做前端校验；
2. 拼出 `mailto:`；
3. 打开访客本机邮件客户端。

如果只是展示，这可以工作；如果要稳定收集询盘，请接入 Formspree / Netlify Forms / 自建 API。具体改法见 `README.md` 的“询盘表单”一节。

---

## 5. Linux 服务器部署（Nginx 静态托管，推荐）

以下命令以 **Ubuntu 24.04 LTS** 为例。Debian 12 基本一致；CentOS/RHEL 需要把 `apt` 换成 `dnf`，包名略有不同。

示例参数，请替换成你自己的：

| 变量 | 示例 |
|---|---|
| 域名 | `example.com` |
| `www` | `www.example.com` |
| 服务器 IP | `203.0.113.10` |
| 部署用户 | `deploy` |
| 项目目录 | `/var/www/pawly` |
| Git 仓库 | `git@github.com:your-org/pawly.git` |

---

### 5.1 准备服务器和 DNS

#### 服务器

购买一台 Ubuntu 24.04 LTS VPS，记录公网 IPv4。

#### DNS

在域名服务商处添加：

| 类型 | 主机记录 | 值 |
|---|---|---|
| A | `@` | 服务器 IPv4 |
| A | `www` | 服务器 IPv4 |
| AAAA（可选） | `@` | 服务器 IPv6 |

等待 DNS 生效，本地验证：

```bash
dig +short example.com
dig +short www.example.com
```

应返回服务器 IP。

> 如果使用 Cloudflare，先关闭代理（灰色云朵）再申请证书；证书成功后可再按需开启代理。

#### SSH 登录

```bash
ssh root@203.0.113.10
```

---

### 5.2 初始化服务器

```bash
# 更新系统
apt update && apt upgrade -y

# 可选：设置时区
timedatectl set-timezone Asia/Shanghai

# 安装基础软件
apt install -y nginx git curl ca-certificates gnupg ufw certbot python3-certbot-nginx rsync

# 确认 Nginx
nginx -v
```

#### 创建部署用户

不建议用 root 跑构建和日常部署：

```bash
adduser deploy
usermod -aG www-data deploy

# 给 deploy 用户 sudo 权限（可选，但便于运维）
usermod -aG sudo deploy
```

之后重新登录：

```bash
ssh deploy@203.0.113.10
```

#### 创建目录

```bash
sudo mkdir -p /var/www/pawly/releases
sudo chown -R deploy:www-data /var/www/pawly
sudo chmod 755 /var/www/pawly
```

最终结构：

```text
/var/www/pawly/
├─ source/
├─ releases/
└─ current
```

---

### 5.3 安装 Node.js 与 pnpm（服务器构建时需要）

> 如果你选择“本地构建后只上传 dist”，可以跳过本节，服务器只保留 Nginx。

```bash
# NodeSource Node 22
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt install -y nodejs

node -v
npm -v
```

安装 pnpm：

```bash
sudo npm install -g pnpm@11.28.5
pnpm -v
```

也可以使用 corepack：

```bash
sudo corepack enable
corepack prepare pnpm@11.28.5 --activate
pnpm -v
```

> 如果 corepack 作为 root 准备版本后普通用户找不到 pnpm，直接用上面的 `npm install -g` 方式最稳。
>
> 不要用 Node 18 构建当前项目。Node 20+ 是底线，推荐 22 LTS。

---

### 5.4 获取源码

#### 方式 A：Git 克隆（推荐）

```bash
cd /var/www/pawly
git clone <你的仓库地址> source
cd source
```

私有仓库建议给服务器配置只读 Deploy Key，或使用带权限的 SSH Key。

#### 方式 B：从本地 rsync 上传

在本地项目目录执行：

```bash
rsync -avz \
  --exclude node_modules \
  --exclude .git \
  --exclude dist \
  --exclude .astro \
  ./ deploy@203.0.113.10:/var/www/pawly/source/
```

Windows 可使用 WSL、Git Bash，或 `scp`。确保服务器上 `/var/www/pawly/source` 已存在。

---

### 5.5 构建

```bash
cd /var/www/pawly/source

pnpm install --frozen-lockfile
pnpm build
```

检查产物：

```bash
test -f dist/index.html && echo "dist OK"
du -sh dist
```

应该能看到：

```text
dist/index.html
dist/products/index.html
dist/zh/index.html
dist/_astro/*.css
dist/images/*.webp
```

如果出现 `ERR_PNPM_IGNORED_BUILDS`：

```bash
pnpm approve-builds --all
pnpm rebuild esbuild sharp
pnpm build
```

如果构建时内存不足：

```bash
# 查看内存
free -h

# 临时加 2GB swap（示例）
sudo fallocate -l 2G /swapfile
sudo chmod 600 /swapfile
sudo mkswap /swapfile
sudo swapon /swapfile
echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
```

---

### 5.6 发布一个 release

每次构建后复制到一个带时间戳的目录：

```bash
cd /var/www/pawly/source

RELEASE=$(date +%Y%m%d%H%M%S)
sudo mkdir -p /var/www/pawly/releases/$RELEASE
sudo cp -a dist/. /var/www/pawly/releases/$RELEASE/

# 权限：目录 755，文件 644
sudo find /var/www/pawly/releases/$RELEASE -type d -exec chmod 755 {} \;
sudo find /var/www/pawly/releases/$RELEASE -type f -exec chmod 644 {} \;

# 切换 current 软链接
sudo ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current

echo "Published: $RELEASE"
```

确认软链接：

```bash
ls -l /var/www/pawly/current
sudo -u www-data test -r /var/www/pawly/current/index.html && echo "Nginx can read files"
```

---

### 5.7 配置 Nginx

项目已经提供配置模板：

```text
deploy/nginx/pawly.conf
```

复制到 Nginx：

```bash
sudo cp /var/www/pawly/source/deploy/nginx/pawly.conf /etc/nginx/sites-available/pawly.conf
sudo nano /etc/nginx/sites-available/pawly.conf
```

至少修改：

```nginx
server_name example.com www.example.com;
```

如果你没有使用 `www`，只保留一个域名。如果服务器没有 IPv6，配置中已经避免写 `listen [::]:80`；如需 IPv6，可自行添加。

启用站点：

```bash
sudo ln -s /etc/nginx/sites-available/pawly.conf /etc/nginx/sites-enabled/pawly.conf
sudo rm -f /etc/nginx/sites-enabled/default

# 检查语法
sudo nginx -t

# 重载
sudo systemctl reload nginx
```

查看状态：

```bash
sudo systemctl status nginx --no-pager
```

#### 配置中的关键点

- `root /var/www/pawly/current;`：永远指向当前 release
- `try_files $uri $uri/ =404;`：支持 Astro 的目录式路由
- `expires -1;`：HTML 不缓存，发布后立即生效
- `/_astro/`：带内容哈希的 CSS/JS 长期缓存
- `/images/`：图片缓存 30 天
- `error_page 404 /404.html;`：使用站点自己的 404 页面
- gzip + 基础安全响应头

#### 如果 80 端口被占用

```bash
sudo ss -lntp | grep ':80'
```

常见原因是系统自带 Nginx 默认站点，或另一个 Web 服务。停掉冲突服务，或修改监听端口。

---

### 5.8 配置 HTTPS

先确认：

```bash
curl -I http://example.com
```

返回 `200` 或 `301` 后再申请证书。

```bash
sudo certbot --nginx -d example.com -d www.example.com
```

如果只使用主域名：

```bash
sudo certbot --nginx -d example.com
```

按提示操作，建议选择 **Redirect**，把 HTTP 自动跳转到 HTTPS。

验证自动续期：

```bash
sudo certbot renew --dry-run
sudo systemctl status certbot.timer --no-pager
```

确认：

```bash
curl -I https://example.com
```

#### HSTS（可选，确认 HTTPS 稳定后再开）

在 Nginx 配置的 `server` 块中加入：

```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

然后：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

> 不要在 HTTPS 还没稳定时开 HSTS。开启后浏览器会强制走 HTTPS。

---

### 5.9 防火墙

```bash
sudo ufw allow OpenSSH
sudo ufw allow 'Nginx Full'
sudo ufw enable
sudo ufw status verbose
```

确认 22、80、443 已放行。

> 如果你的 SSH 端口不是 22，请先放行实际端口，再启用 UFW，避免把自己锁在外面。

---

### 5.10 上线验证

```bash
# 首页
curl -I https://example.com

# 中文首页
curl -I https://example.com/zh/

# 产品详情
curl -I https://example.com/products/cloudstep-harness/

# 404
curl -I https://example.com/this-page-does-not-exist

# sitemap
curl -I https://example.com/sitemap-index.xml

# 页面标题
curl -s https://example.com | grep -o '<title>[^<]*</title>'

# 静态资源 MIME
curl -I https://example.com/images/hero-pawly.webp
```

预期：

| 请求 | 预期 |
|---|---|
| `/` | `200 OK`，`text/html` |
| `/zh/` | `200 OK`，`text/html` |
| `/products/cloudstep-harness/` | `200 OK` |
| 不存在的页面 | `404`，返回站点 404 页面 |
| `/images/hero-pawly.webp` | `200`，`image/webp` |
| `http://` | `301` 到 `https://`（Certbot 配置后） |

浏览器再检查：

- 地址栏锁标志正常
- 切换 `EN / 中文` 正常
- 手机端菜单正常
- 产品筛选和详情正常
- 控制台无 404、无 JS 报错

---

### 5.11 更新发布

```bash
cd /var/www/pawly/source

git pull --ff-only
pnpm install --frozen-lockfile
pnpm build

RELEASE=$(date +%Y%m%d%H%M%S)
sudo mkdir -p /var/www/pawly/releases/$RELEASE
sudo cp -a dist/. /var/www/pawly/releases/$RELEASE/
sudo chown -R deploy:www-data /var/www/pawly/releases/$RELEASE
sudo find /var/www/pawly/releases/$RELEASE -type d -exec chmod 755 {} \;
sudo find /var/www/pawly/releases/$RELEASE -type f -exec chmod 644 {} \;
sudo ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current

echo "Published: $RELEASE"
```

Nginx 的 `root` 是软链接，通常不需要重启；如果遇到缓存或打开文件句柄问题，可以：

```bash
sudo systemctl reload nginx
```

#### 保留最近 5 个版本

先查看：

```bash
ls -1dt /var/www/pawly/releases/*
```

确认后再清理旧版本：

```bash
ls -1dt /var/www/pawly/releases/* | tail -n +6 | sudo xargs -r rm -rf
```

> 执行删除前务必先 `ls` 确认路径，避免误删。

---

### 5.12 回滚

查看历史版本：

```bash
ls -1dt /var/www/pawly/releases/*
```

切换到上一个版本：

```bash
sudo ln -sfn /var/www/pawly/releases/<上一个版本目录> /var/www/pawly/current
sudo systemctl reload nginx
```

验证：

```bash
curl -I https://example.com
```

回滚只切换静态文件，不涉及数据库，速度快、风险低。

---

## 6. 方案 B：本地构建，服务器只装 Nginx

如果不想在服务器安装 Node/pnpm，或服务器内存较小，可以这样做：

### 本地构建

```bash
cd /path/to/pawly-storefront
pnpm install
pnpm build
```

### 上传

```bash
RELEASE=$(date +%Y%m%d%H%M%S)

# 先在服务器创建目录（deploy 用户拥有 /var/www/pawly）
ssh deploy@203.0.113.10 "mkdir -p /var/www/pawly/releases/$RELEASE"

# 上传 dist 内容，并设置目录 755 / 文件 644
rsync -avz --delete --chmod=D755,F644 dist/ deploy@203.0.113.10:/var/www/pawly/releases/$RELEASE/

# 服务器切换软链接
ssh deploy@203.0.113.10 "ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current"
```

Windows 没有 rsync 时，可在 WSL/Git Bash 中执行，或使用：

```powershell
scp -r .\dist\* deploy@203.0.113.10:/var/www/pawly/releases/20261018193000/
```

> 上传后仍需在服务器设置权限：目录 `755`，文件 `644`。

---

## 7. Docker 方案（可选）

项目已经包含：

```text
Dockerfile
docker-compose.yml
deploy/nginx/docker.conf
.dockerignore
```

### 7.1 构建和启动

先安装 Docker（Ubuntu）：

```bash
curl -fsSL https://get.docker.com | sudo sh
sudo usermod -aG docker $USER
newgrp docker

docker --version
docker compose version
```

构建并启动：

```bash
cd /var/www/pawly/source

# 正式域名构建参数（Dockerfile 会在构建阶段写入 site/base）
export PUBLIC_SITE_URL=https://www.pawly.com
export PUBLIC_BASE_PATH=/

docker compose build
docker compose up -d
docker compose ps
```

> 如果暂时用默认的 `pawly.example.com` 预览，可以省略这两个变量；正式上线前必须改成真实域名并重新构建镜像。

默认映射：

```text
127.0.0.1:8080 -> 容器 80
```

测试：

```bash
curl -I http://127.0.0.1:8080/
```

### 7.2 如果这台机器只跑这一个站点

编辑 `docker-compose.yml`：

```yaml
ports:
  - "80:80"
```

然后：

```bash
docker compose up -d
```

如果还要 HTTPS，建议保留 `127.0.0.1:8080`，用宿主机 Nginx 做反向代理和 Certbot。

### 7.3 宿主机 Nginx 反代 Docker

```nginx
server {
    listen 80;
    server_name example.com;

    location / {
        proxy_pass http://127.0.0.1:8080;
        proxy_http_version 1.1;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

然后照常：

```bash
sudo nginx -t && sudo systemctl reload nginx
sudo certbot --nginx -d example.com
```

### 7.4 更新 Docker 部署

```bash
cd /var/www/pawly/source
git pull --ff-only
docker compose build --no-cache
docker compose up -d
docker image prune -f
```

### 7.5 Docker 注意事项

- Docker 构建同样需要执行 `pnpm build`，构建阶段会安装依赖。
- 首次构建需要访问 npm registry，服务器网络需能下载依赖。
- `.dockerignore` 已排除 `node_modules`、`dist`、`.git`、`docs` 等。
- 容器内的 Nginx 配置是 `deploy/nginx/docker.conf`。
- 如果使用宿主机 Nginx + Certbot，容器不要直接占用 80/443。

---

## 8. 其他托管方式（不买服务器）

如果不想维护 Linux 服务器，这个站点可以直接部署到静态托管平台。

| 平台 | 构建命令 | 输出目录 | 备注 |
|---|---|---|---|
| Netlify | `pnpm build` | `dist` | 在环境变量中设 `NODE_VERSION=22` |
| Vercel | `pnpm build` | `dist` | 导入 Git 仓库即可 |
| Cloudflare Pages | `pnpm build` | `dist` | Node 版本选 22 |
| GitHub Pages | `pnpm build` | `dist` | 已内置 workflow 与 base 支持，详见 [GITHUB_PAGES.md](GITHUB_PAGES.md) |

这些平台都不需要你维护 Nginx、证书和服务器。自定义域名、HTTPS、CDN 通常由平台处理。

> GitHub Pages 的完整步骤，包括项目站点子路径、自定义域名、DNS、CNAME 和排错，见 [GITHUB_PAGES.md](GITHUB_PAGES.md)。

---

## 9. GitHub Actions 自动部署（可选）

如果代码放在 GitHub，可以每次 push 到 `main` 自动构建并发布。

在仓库 Settings → Secrets and variables → Actions 中添加：

- `SSH_HOST`：服务器 IP
- `SSH_USER`：`deploy`
- `SSH_KEY`：deploy 用户的私钥
- `SSH_PORT`：SSH 端口，默认 22

`.github/workflows/deploy.yml`：

```yaml
name: Deploy PAWLY

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - name: Deploy over SSH
        uses: appleboy/ssh-action@v1.2.0
        with:
          host: ${{ secrets.SSH_HOST }}
          username: ${{ secrets.SSH_USER }}
          key: ${{ secrets.SSH_KEY }}
          port: ${{ secrets.SSH_PORT }}
          script: |
            set -e
            cd /var/www/pawly/source
            git pull --ff-only
            pnpm install --frozen-lockfile
            pnpm build

            RELEASE=$(date +%Y%m%d%H%M%S)
            sudo mkdir -p /var/www/pawly/releases/$RELEASE
            sudo cp -a dist/. /var/www/pawly/releases/$RELEASE/
            sudo chown -R deploy:www-data /var/www/pawly/releases/$RELEASE
            sudo find /var/www/pawly/releases/$RELEASE -type d -exec chmod 755 {} \;
            sudo find /var/www/pawly/releases/$RELEASE -type f -exec chmod 644 {} \;
            sudo ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current
```

> 该方案要求服务器已安装 Node、pnpm，并且 deploy 用户有 sudo 权限。也可以改成“本地构建 + scp 上传 dist”，减少服务器构建压力。

---

## 10. 日常运维

### 10.1 日志

```bash
# Nginx 访问日志
sudo tail -f /var/log/nginx/pawly.access.log

# Nginx 错误日志
sudo tail -f /var/log/nginx/pawly.error.log

# Nginx 服务状态
sudo systemctl status nginx --no-pager

# 系统日志
sudo journalctl -u nginx -n 100 --no-pager
```

### 10.2 证书续期

Certbot 安装时会创建定时器：

```bash
sudo systemctl status certbot.timer --no-pager
sudo certbot renew --dry-run
```

Let's Encrypt 证书有效期 90 天，自动续期。

### 10.3 健康检查

```bash
curl -fsS -o /dev/null -w '%{http_code}\n' https://example.com/
```

可接入 UptimeRobot、BetterStack 等监控服务，定时请求首页和 `/zh/`。

### 10.4 备份

至少备份：

```bash
# Nginx 配置
sudo cp /etc/nginx/sites-available/pawly.conf /root/pawly-nginx.conf.bak

# 发布目录（可选，源码和 Git 是主要备份）
sudo tar -czf /root/pawly-releases-$(date +%Y%m%d).tar.gz /var/www/pawly/releases
```

源码本身应由 Git 仓库托管。

### 10.5 系统更新

```bash
sudo apt update
sudo apt upgrade -y
sudo reboot
```

重启后检查：

```bash
sudo systemctl status nginx --no-pager
curl -I https://example.com
```

---

## 11. 常见问题排查

### 11.1 `pnpm: command not found`

```bash
node -v
corepack enable
corepack prepare pnpm@11.28.5 --activate
pnpm -v
```

如果仍失败：

```bash
sudo npm install -g pnpm@11.28.5
```

### 11.2 安装时提示 `Ignored build scripts: esbuild, sharp`

```bash
pnpm approve-builds --all
pnpm rebuild esbuild sharp
pnpm build
```

确认 `pnpm-workspace.yaml` 存在：

```yaml
allowBuilds:
  esbuild: true
  sharp: true
```

### 11.3 Nginx 返回 403 Forbidden

检查：

```bash
ls -ld /var/www /var/www/pawly /var/www/pawly/current
ls -l /var/www/pawly/current/index.html
sudo -u www-data test -r /var/www/pawly/current/index.html && echo readable
```

常见原因：

- 目录权限不是 755
- 文件权限不是 644
- `current` 软链接指向了不存在的目录
- Nginx `root` 路径写错

修复：

```bash
sudo chmod 755 /var/www /var/www/pawly
sudo find /var/www/pawly/releases/<VERSION> -type d -exec chmod 755 {} \;
sudo find /var/www/pawly/releases/<VERSION> -type f -exec chmod 644 {} \;
```

### 11.4 首页正常，子页面 404

检查 Nginx：

```nginx
location / {
    try_files $uri $uri/ =404;
}
```

并确认发布目录里存在：

```text
/var/www/pawly/current/products/index.html
/var/www/pawly/current/zh/index.html
```

Astro 使用目录式输出；如果只上传了 `dist/index.html`，子页面会缺失。

### 11.5 页面没有样式，`/_astro/...` 404

通常是把站点部署到了子路径，或 Nginx `root` 指错。

确认：

```bash
ls /var/www/pawly/current/_astro/
curl -I https://example.com/_astro/<实际文件名>.css
```

如果部署在子路径，需要在 `astro.config.mjs` 配置 `base`，并调整 Nginx。当前项目默认部署在域名根目录。

### 11.6 canonical / sitemap 里还是 `pawly.example.com`

修改：

- `astro.config.mjs` 的 `site`
- `src/pages/robots.txt.ts` 自动生成的 Sitemap（依赖 `site` 配置）

然后重新构建、重新发布：

```bash
pnpm build
```

### 11.7 Certbot 申请证书失败

检查：

```bash
dig +short example.com
curl -I http://example.com
sudo ss -lntp | grep ':80'
```

常见原因：

- DNS 未生效
- 安全组/防火墙未放行 80
- Cloudflare 代理开启，HTTP-01 验证被拦截（先改 DNS only）
- 服务器有 IPv6 AAAA 记录，但 IPv6 未正确配置
- 另一个服务占用了 80

### 11.8 Nginx 启动失败：`[::]:80 failed`

服务器禁用了 IPv6。删除配置中的：

```nginx
listen [::]:80;
```

然后：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

### 11.9 构建时内存不足

```bash
free -h
```

增加 swap（见 5.5），或改为本地构建后上传 `dist/`。

### 11.10 Docker 端口冲突

```bash
sudo ss -lntp | grep ':80'
```

修改 `docker-compose.yml` 的端口映射，例如：

```yaml
ports:
  - "127.0.0.1:8081:80"
```

### 11.11 修改后页面没变化

- HTML 配置了 `expires -1`，一般不应缓存
- 确认 `current` 指向新 release：

```bash
ls -l /var/www/pawly/current
```

- 强制刷新浏览器
- 如果用了 Cloudflare/CDN，清理缓存
- 检查是否构建了新的 `dist/`

### 11.12 表单提交没有收到邮件

当前实现是 `mailto:`：

- 访客必须配置了邮件客户端
- 不会在服务器端保存或发送
- 移动端可能没有默认邮件应用

正式收集询盘请接入 Formspree / Netlify Forms / 自建 API。具体改法见 `README.md`。

### 11.13 WebP 返回 `application/octet-stream`

确认 Nginx 主配置包含：

```nginx
include /etc/nginx/mime.types;
```

Ubuntu 默认的 `/etc/nginx/nginx.conf` 已有。若被自定义配置覆盖，补上后：

```bash
sudo nginx -t && sudo systemctl reload nginx
```

---

## 12. 上线验收清单

### 构建

- [ ] `pnpm install` 成功
- [ ] `pnpm check` 0 错误
- [ ] `pnpm build` 成功，生成 `dist/`
- [ ] `pnpm check:site` 0 断链

### 域名与 SEO

- [ ] `astro.config.mjs` 的 `site` 已改为真实域名
- [ ] `robots.txt` 中的 Sitemap 已指向真实域名
- [ ] 重新构建并发布
- [ ] 首页 / 中文页 canonical 正确
- [ ] `sitemap-index.xml` 可访问

### 服务器

- [ ] 域名 A 记录指向服务器
- [ ] Nginx `nginx -t` 通过
- [ ] `current` 软链接指向正确 release
- [ ] 80/443/SSH 防火墙放行
- [ ] HTTPS 证书有效
- [ ] HTTP 自动跳转 HTTPS
- [ ] `/`、`/zh/`、产品详情、404 均正常
- [ ] WebP 图片 MIME 正确

### 内容

- [ ] 品牌名、Logo、联系方式已替换
- [ ] 产品参数、MOQ、图片已替换
- [ ] 隐私条款已由法律顾问审阅
- [ ] 表单接收方式已确认

### 运维

- [ ] 已配置自动续期检查
- [ ] 已保留至少 2 个历史 release
- [ ] 已记录回滚命令
- [ ] 已配置基础监控

---

## 13. 命令速查

### 本地

```bash
pnpm install
pnpm dev
pnpm build
pnpm preview
pnpm check
pnpm check:site
```

### 服务器首次部署

```bash
sudo mkdir -p /var/www/pawly/releases
sudo chown -R deploy:www-data /var/www/pawly

cd /var/www/pawly
git clone <REPO> source
cd source

pnpm install --frozen-lockfile
pnpm build

RELEASE=$(date +%Y%m%d%H%M%S)
sudo mkdir -p /var/www/pawly/releases/$RELEASE
sudo cp -a dist/. /var/www/pawly/releases/$RELEASE/
sudo chown -R deploy:www-data /var/www/pawly/releases/$RELEASE
sudo find /var/www/pawly/releases/$RELEASE -type d -exec chmod 755 {} \;
sudo find /var/www/pawly/releases/$RELEASE -type f -exec chmod 644 {} \;
sudo ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current

sudo cp deploy/nginx/pawly.conf /etc/nginx/sites-available/pawly.conf
sudo ln -s /etc/nginx/sites-available/pawly.conf /etc/nginx/sites-enabled/pawly.conf
sudo rm -f /etc/nginx/sites-enabled/default
sudo nginx -t
sudo systemctl reload nginx

sudo certbot --nginx -d example.com -d www.example.com
```

### 更新

```bash
cd /var/www/pawly/source
git pull --ff-only
pnpm install --frozen-lockfile
pnpm build

RELEASE=$(date +%Y%m%d%H%M%S)
sudo mkdir -p /var/www/pawly/releases/$RELEASE
sudo cp -a dist/. /var/www/pawly/releases/$RELEASE/
sudo chown -R deploy:www-data /var/www/pawly/releases/$RELEASE
sudo find /var/www/pawly/releases/$RELEASE -type d -exec chmod 755 {} \;
sudo find /var/www/pawly/releases/$RELEASE -type f -exec chmod 644 {} \;
sudo ln -sfn /var/www/pawly/releases/$RELEASE /var/www/pawly/current
```

### 回滚

```bash
ls -1dt /var/www/pawly/releases/*
sudo ln -sfn /var/www/pawly/releases/<VERSION> /var/www/pawly/current
sudo systemctl reload nginx
```

---

## 附录 A：项目中的部署文件

| 文件 | 用途 |
|---|---|
| `deploy/nginx/pawly.conf` | 宿主机 Nginx 静态站点配置 |
| `deploy/nginx/docker.conf` | Docker 容器内 Nginx 配置 |
| `Dockerfile` | 多阶段构建：Node 构建 + Nginx 运行 |
| `docker-compose.yml` | Docker 运行编排 |
| `.dockerignore` | 减少 Docker 构建上下文 |
| `README.md` | 项目说明与内容替换指南 |
| `DEPLOYMENT.md` | 本文件 |

## 附录 B：常用路径

| 路径 | 说明 |
|---|---|
| `/var/www/pawly/source` | Git 源码 |
| `/var/www/pawly/releases` | 历史发布 |
| `/var/www/pawly/current` | 当前线上版本软链接 |
| `/etc/nginx/sites-available/pawly.conf` | Nginx 站点配置 |
| `/etc/nginx/sites-enabled/pawly.conf` | 已启用配置 |
| `/var/log/nginx/pawly.access.log` | 访问日志 |
| `/var/log/nginx/pawly.error.log` | 错误日志 |

---

## 附录 C：上线前最终检查

```bash
# 本地
pnpm check
pnpm build
pnpm check:site

# 服务器
sudo nginx -t
curl -I https://example.com
curl -I https://example.com/zh/
curl -I https://example.com/products/cloudstep-harness/
curl -I https://example.com/sitemap-index.xml
curl -I https://example.com/images/hero-pawly.webp
```

全部通过后，再在目标市场常用浏览器和真实手机上做一次人工检查。
