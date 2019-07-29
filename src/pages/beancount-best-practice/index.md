---
title: Beancount 最佳实践
date: '2019-06-02'
spoiler: 个人使用 Beancount 的最佳实践
---

## Beancount 是什么

[Beancount](https://github.com/beancount/beancount) 是一个开源的复式记账软件，使用 python 实现，可自己本地运行部署

数据文件是 Plain Text，可以用喜欢的方式管理自己的账单数据

## 为什么需要记账

有规律的记录自己的收入、负债、资产、花费情况，把这些记录留存，随着时间推移，累积历史数据

当我们复盘回顾的时候，有了这些数据记录，可以轻易的了解过去，了解自己的消费习惯，记账是一个对我自己认知提升的方式

当我们想分析当前的财务情况时，可以对着资金表格，清楚地知道资产分配、负债情况、净资产有多少

当我们想规划未来时，看看在哪些方面的资产增长最快，更好的分配自己的资金、精力

例如，工资收入是增长最快的，而投资的资产则是亏损，那么是否更应该把精力花在职业发展上呢？(可能更应该花精力学习投资 🤔)

当我们想做预算时，可以从过去的花费情况里，更准确预计将来的花费，有心理预期，花多少钱都不慌 🙃

有了记账后，可以获取资产占比报表，对于个人的投资理财也会方便很多，优化资金分配

总之，记账之后让我更从容一些

## 为什么选择 Beancount

我之前 2-3 年使用的记账软件是「网易有钱」，当初选择记账软件大概有以下几点考量：

1. 漂亮的 UI
2. 支持数据导入、导出
3. 可视化：收入、支出、资产，变化图
4. 预算功能
5. 多账本
6. 信用卡数据同步

「网易有钱」当时满足了(不完全)以上的 1、2、3、5、6，因为其他国内产品也各有缺点，所以只能将就

放弃他的原因如下：

1. 导出功能需要会员，个人的数据竟然不让导出？(满屏广告了，还这么小气)
2. 预算功能在不断向他们提需求后，加上了简陋版
3. 资产变化图迟迟不增加
4. 信用卡数据同步 bug 不解决，有次出差，把打车费分类到「出差」，从此导入的交通费都被自动分类到「出差」🙃

Beancount 的优点：

1. 开源工具，可自己修改定制 UI
2. 账本是基于文本的语法，数据自己掌握
3. 有丰富的图表，还可以根据 SQL 查询，生成报表
4. 支持预算
5. 支持无限账本，除了给自己记账，还可以帮家人记账
6. 可导入信用卡账单文件(其实可以任意文件，自己写脚本转化即可)

此外，Beancount 可高度自定义，可自定义货币，因此可轻松应对不同币种账单，甚至可以用他记录所有的交易

例如，可以把「年假」想象成交易，每年的「年假」相当于工作收入，从公司账户转账到个人账户，变成资产

当请假时，相当于把「年假」消费出去了，因此，可以记录年假的「交易」，货币单位为「天」

```
2019-04-24 * "CompanyName" "请假一天休息"
  Assets:Leave                                 -1.00 DAY
  Expenses:Health

2019-04-01 * "CompanyName" "年假-初始化"
  Income:Job:CompanyName:Leave
  Assets:Leave                                 +7.00 DAY
```

选择 Beancount 的理由，也可以从作者创造 Beancount 的动机上了解，详情查看 [Command-line Accounting in Context](https://docs.google.com/document/d/1e4Vz3wZB_8-ZcAwIFde8X5CjzKshE4-OXtVVHm4RQ8s/edit#heading=h.7r5losli85n7)

## 基本语法

以下只是一些经常使用到基本语法，完整语法查看文档：[Beancount Language Syntax](https://docs.google.com/document/d/1wAMVrKIA2qtRGmoVDSUBJGmYZSygUaR0uOMW1GV3YE0/edit)

指令格式：
```
YYYY-MM-DD <directive> <arguments...>
```

1. 声明货币

不是必须的，可以不定义

定义币种 CNY，代表 China Yuan
```
1949-10-01 commodity CNY
  name: "China Yuan"
```

2. 创建/关闭账户

创建和关闭账户使用关键词 `open` 和 `close`，例如：

2014-01-01 创建一个「人民币现金」账户
```
2014-01-01 open Assets:Cash:CNY CNY
2014-01-01 note Assets:Cash:CNY "现金"
```

2018-01-01 关闭人民币现金账户
```
2018-01-01 close Assets:Cash:CNY
```

3. 设置价格

2019-01-01 当天，1 USD = 6.75 CNY
```
2019-01-01 price USD   6.75 CNY
```

4. 交易

2019-01-01 在星巴克用花呗买了一杯红茶拿铁
```
2019-01-01 * "Eat" "星巴克-红茶拿铁"
  Liabilities:Huabei                          -33.00 CNY
  Expenses:Eat
```

5. 余额断言

2019-01-01 招商信用卡欠款 5000 元人民币
```
2019-01-01 balance Liabilities:CreditCard:CMD  -5000.00 CNY
```

6. 余额自动调整

2019-01-01 之前的人民币现金余额变化，自动使用 Opening-Balances 调整
```
2019-01-01 pad Assets:Cash:CNY Equity:Opening-Balances
```

## 开始使用 Beancount

在开始使用 Beancount 之前，有必要整体浏览一下官网文档 [Beancount Documentation](https://docs.google.com/document/d/1RaondTJCS_IUPBHFNdT8oqFKJjVJDsfsn6JEjBG04eA/edit#)

### 安装

首先需要安装 [python 3](http://python.org/)，然后安装 `beancout`、`fava`

```bash
pip3 install beancount fava
```

[fava](https://github.com/beancount/fava) 是一个网页可视化工具，平常看报表都使用她

文本编辑器推荐 [vscode](https://github.com/microsoft/vscode)，再配合语法高亮插件 [vscode-beancount](https://github.com/Lencerf/vscode-beancount) 即可

### 使用 git

在 github 创建仓库，用于保存账本文件，使用 git 进行版本管理

> 注意：请一定创建私密仓库，账单信息量巨大，属于很隐私的东西，避免泄露

### 目录

创建如下目录结构：

```
.
├── README.md
├── main.bean
├── account
│   ├── assets.bean
│   ├── equity.bean
│   ├── expenses.bean
│   ├── income.bean
│   ├── index.bean
│   └── liabilities.bean
└── txs
    ├── 2018
    │   └── index.bean
    ├── 2019
    │   ├── 01.bean
    │   ├── 02.bean
    │   ├── 03.bean
    │   ├── 04.bean
    │   ├── 05.bean
    │   ├── 06.bean
    │   ├── 07.bean
    │   ├── 08.bean
    │   ├── 09.bean
    │   ├── 10.bean
    │   ├── 11.bean
    │   ├── 12.bean
    │   ├── index.bean
    │   └── invest.bean
    └── index.bean
```

其中：

`main.bean`：为账单入口文件，该文件只用来 `include` 其他文件

`account`：账户目录，文件可按类型划分为收入、资产、负债、消费、初始金额

`txs`：存放交易，可以按年、月管理，方便记录和查找账单；有些特殊的可以按照类型单独创建，例如：投资账单

每个大目录下都创建 `index.bean` 文件，作为目录入口来 `include` 其他文件

### 创建账户

#### 收入账户:

可以是投资收入、工作收入、利息等

例如：

```
; --- 投资盈亏 ---
2016-02-15 open Income:PnL
2016-02-15 note Income:PnL "盈亏"

2016-02-15 open Income:PnL:Fund
2016-02-15 note Income:PnL:Fund "基金"

2016-02-15 open Income:PnL:Stock
2016-02-15 note Income:PnL:Stock "股票"

2016-02-15 open Income:PnL:DigitalCy
2016-02-15 note Income:PnL:DigitalCy "数字货币"
; --- /投资盈亏 ---
```

工作收入使用 `CompanyName:Salary` 这样的分类，开户日期使用入职时间

这样做的好处是，可以直观知道在某个公司期间的回报情况

```
; --- 工作 ---
; Salary
2016-10-24 open Income:Job:CompanyName:Salary USD,CNY
2016-10-24 note Income:Job:CompanyName:Salary "工资"
; Bonus
2016-10-24 open Income:Job:CompanyName:Bonus USD,CNY
2016-10-24 note Income:Job:CompanyName:Bonus "奖金"
; --- /工作 ---
```

#### 负债账户:

信用卡、花呗、应付款等

```
; 花呗
2014-01-01 open Liabilities:Huabei CNY
2014-01-01 note Liabilities:Huabei "花呗"
; 信用卡
2014-01-01 open Liabilities:CreditCard:CMB CNY
2014-01-01 note Liabilities:CreditCard:CMB "招商信用卡"
; 应付款
2014-01-01 open Liabilities:Payables
2014-01-01 note Liabilities:Payables "应付款"
```

#### 资产:

现金、银行卡、理财产品、房子、车子、应收款等

```
; --- 现金 ---
2014-01-01 open Assets:Cash
2014-01-01 note Assets:Cash "现金"

2014-01-01 open Assets:Cash:CNY CNY
2014-01-01 note Assets:Cash:CNY "现金-人民币"

2014-01-01 open Assets:Cash:USD USD
2014-01-01 note Assets:Cash:USD "现金-美元"
; --- / 现金 ---
```

#### 花费:

购物、交通、旅游等

```
; --- 购物 ---
2014-01-01 open Expenses:Shopping
2014-01-01 note Expenses:Shopping "购物"
; --- /购物 ---
```

### 数据迁移

账户创建完之后，开始记录交易，但是如果有以前的账单数据，如果处理呢？我们需要将数据迁移过来

> 在迁移数据之前，可以使用余额断言，记录各个账户当前的余额

这样做的好处是，我们可以慢慢迁移老数据，又不影响使用 Beancount 记录后面发生的交易

例如：

在 2019-05-01 开始使用 Beancount，目前有港币现金 23000，招商银行余额 50000

```
; 现金
2019-05-01 pad Assets:Cash:HKD Equity:Opening-Balances
2019-05-01 balance Assets:Cash:HKD          23000.00 HKD

2019-05-01 pad Assets:Cash:Bank:CMB Equity:Opening-Balances
2019-05-01 balance Assets:Cash:Bank:CMB     50000.00 CNY
```

这样，在 2019-05-01 之前的数据变化不会影响账户余额了，而 2019-05-01 之后发生的交易可以使用 Beancount 正常记录

当把 2019-05-01 之前的数据补充完整，账单变化即可在 Beancount 显示了

数据迁移可使用官方提供的[导入插件](https://docs.google.com/document/d/11EwQdujzEo2cxqaF5PgxCEZXWfKKQCYSMfdJowp_1S8/edit)，或者手动迁移(记录重要的部分即可)

## 记录投资

相比较现金的流水，投资理财的记录就难多了，投资理财很难用一个币种表示，因此需要创建很多货币单位

> 以股票代号、代币符号作为货币单位更适合记录

例如：阿毛在 2019-05-01 用 7000 人民币，买了 1000 个 USDT(一种数字货币)，然后用 USDT 买了 5 个 ETH(以太坊)

```
2019-05-01 * "Huobi" "Buy 1000 USDT"
  Assets:DemandDeposit:YuEBao              -7000.00 CNY
  Assets:DigitalCy:USDT                     1000.00 USDT {7 CNY} @@ 7000.00 CNY

2019-05-01 * "Huobi" "Buy 5 ETH"
  Assets:DigitalCy:USDT                   -1000.00 USDT
  Assets:DigitalCy:ETH                      5.00 ETH {200 USDT} @@ 1000.00 USDT
```

过了一个月，阿毛想知道当前数字货币账户的价值时，可以使用 price 语句设置当前价格

```
2019-06-01 price USDT  7 CNY
2019-06-01 price ETH   300 USDT
```

Beancount 即可将 USDT、ETH 的价值转化为 CNY

## 预算

fava 支持预算功能，可按天、周、月、季度、年来规划

```
2012-01-01 custom "budget" Expenses:Coffee       "daily"         4.00 EUR
2013-01-01 custom "budget" Expenses:Books        "weekly"       20.00 EUR
2014-02-10 custom "budget" Expenses:Groceries    "monthly"      40.00 EUR
2015-05-01 custom "budget" Expenses:Electricity  "quarterly"    85.00 EUR
2016-06-01 custom "budget" Expenses:Holiday      "yearly"     2500.00 EUR
```

如果是按月来做预算，那么可以在该月的文件开头设置这个月的预算(*任何地方都可以，只是为了查起来方便*)

## 多账本

生活中可能不止一个账本就可以完全记录

例如：需要帮助爸妈记录账单，和自己账户不可共用，这时就需要新建另一个账本

fava 支持多个账本同时显示，可在根目录创建另一个账本 `test.bean`

执行以下命令，即可在 fava 网页端切换多个账本

```
fava *.bean
```

## 参考

- [Beancount Documentation](https://docs.google.com/document/d/1RaondTJCS_IUPBHFNdT8oqFKJjVJDsfsn6JEjBG04eA/edit#heading=h.hzs9xa5699ul)
- [Awesome Beancount](https://github.com/wzyboy/awesome-beancount)
- [Beancount —— 命令行复式簿记](https://wzyboy.im/post/1063.html)
- [使用 Beancount 记录证券投资](https://wzyboy.im/post/1317.html)
- [Beancount 最佳实践](/beancount-best-practice/)
