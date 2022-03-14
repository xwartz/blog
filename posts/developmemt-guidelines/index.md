---
title: 团队开发规范
date: '2019-07-03'
spoiler: 团队开发的一些约定与流程
tags: ['gitflow', 'guideline']
---

在团队中，经常多人合作项目，因此需要设计良好的开发规范, 提升团队开发效率, 降低维护成本。

## 创建任务

在开始一个开发任务之前，根据任务的需求在「看板」创建卡片，用于协作、跟踪。

卡片内容：

- 任务标题
- 任务标签
- 任务描述：尽量详细，内容包括不限于，产品设计文档、UI 设计、技术文档、关联任务
- 检查项：指定各个小任务的负责人

## 技术调研

明确需求后，开发前做好技术调研，并 @ 相关人员 review。

最终技术方案确定之后，将技术文档落地统一管理，例如：github wiki、google doc。

## 开发

根据确定的技术方案，进入开发工作。

### 分支规范

#### 主要分支

`master`：线上版本的最新代码

`release-**`：下个迭代版本的分支，功能、bugfix 会合并到该分支，等待发布

`feat/**`：新功能分支，以 `master` 创建，开发完成后，创建 PR 合并至 `release-**`

`fix/**`：修复分支，以 `master` 创建，开发完成后，创建 PR 合并至 `release-**`

#### 新建分支

根据任务类型不同，创建不同前缀的分支名，例如 `feat`、`fix`、`refactor`、`docs`、`e2e`、`hotfix`...

**新增功能、bugfix 等都应该基于 `master` 创建新的分支，`hotfix` 应该基于版本 `tag` 创建分支。**

#### merge 分支

分支操作优先使用 `rebase`

1. merge 当前远程分支代码
```
git pull -r
```
2. merge 其他分支
```
git rebase master -i
```

#### 删除分支

当 `PR` review、merge 之后，应该将该分支删除，保持分支简洁。

### Commit 规范

#### 原则

1. 一个 commit 包含的内容尽量少
2. commit 内容应该和 `commit message` 对应，不掺杂其他修改
3. ....

#### Commit Message 约定

每个 commit message 由 `header`、`body`、`footer` 组成。
`header` 由 `type`、`scope`、`subject` 组成。

一个完整的 commit message 格式如下：

```
<type>(<scope>): <subject>
<BLANK LINE>
<body>
<BLANK LINE>
<footer>
```

commit message 必须包含 `header`，`scope` 是可选的，每一行长度限定在 `100 字符`。

例如：
```
docs(changelog): update changelog to beta.5
```

**Type**

`type` 可以是以下中的一个(小写)：

> - feat: A new feature
> - fix: A bug fix
> - perf: A code change that improves performance
> - refactor: A code change that neither fixes a bug nor adds a feature
> - style: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
> - test: Adding missing tests or correcting existing tests
> - build: Changes that affect the build system or external dependencies (example scopes: yarn、pod、tokenCore、imkey)
> - ci: Changes to our CI configuration files and scripts
> - docs: Documentation only changes

**Scope**

`scope` 可以是任意的，只要能指明改动的地方，例如：tokenCore、yarn、pod...

**Subject**

`subject` 应该包含改动的简要说明

**Body**

`body` 可以选择填写任务的链接，或者不写，在 `PR` 上写即可。

**Footer**

`footer` 应该写上 `Breaking Changes`，但是我们也可以在 `PR` 上写。

**Revert**

如果是 `revert` 应该在 `body` 写明 revert 哪个 commit hash，例如：

```
Revert: Docs(changelog): update changelog to beta.5

This reverts commit 667ecc1654a317a13331b17617d973392f415f02.
```

### PR

#### PR 内容:

- 标题：一句话说明 PR 更改了什么
- 内容：详细说明 PR 修改内容，可贴上任务链接、文档链接，让其他 review 人员了解上下文
- 除了修改的功能，还应增加相关测试用例

#### code review:

1. CI 单元测试通过
2. 指派给相关人员 review
3. 两人以上 approved

如果 PR review 有反馈，需要及时修改反馈的问题。

指派人 review 通过之后，`merge` 代码到 `release-**`，然后打包提交 QA 验证。

## 发布

### 迭代发布

迭代开始时，会以 `release-**` 分支创建 `Release PR`，当迭代的功能开发完成，`merge` 到 `release-**` 分支后会基于该 PR 打包发布。

PR 内容包括迭代所有的修改，PR 描述即为 `changelog`，当有新的修改 `merge` 时，就应该更新描述。

例如：
```
Features
  - support dynamic directive arguments for v-on, v-bind and custom directives (#9373)

Improvements
  - improve scoped slots change detection accuracy (#9371)

BugFixes
  - fix checkbox event edge case in Firefox (#1868)
```

### Hotfix

`hotfix` 是为了解决线上紧急问题，分支以版本 `tag` 创建，只修改紧急修复的问题，不掺杂其他内容，严格按照 `PR 流程` 执行。

## Tag

发布版本之后，创建 `tag`，并更新版本日志。

## 参考文档

- [Git Commit Message Convention](https://github.com/vuejs/vue/blob/dev/.github/COMMIT_CONVENTION.md)
- [Contributing to Angular](https://github.com/angular/angular/blob/master/CONTRIBUTING.md)
