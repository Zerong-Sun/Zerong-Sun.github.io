---
title: "双血输入函数动态 PET：肝炎与肺癌诊断中的定量建模方法"
date: "2024-11-19"
tags:
  - "research"
  - "pet"
description: "DBIF 动态 PET 在肝脏炎症与肺肿瘤药代动力学建模中的概念、方法与临床意义。"
---

根据《QP Pre ppt》整理 | Zerong SUN, Qi WANG | 2024-11-19

**摘要：** 本文基于原 PPT 内容整理双血输入函数（DBIF）动态 PET 的核心概念、建模逻辑与应用价值。文章重点讨论 18F-FDG PET 在肝脏炎症和肺肿瘤中的药代动力学建模，说明为什么单血输入函数在双血供器官中可能不足，以及 DBIF 如何提高参数估计、疾病分级和组织区分的可靠性。

## 引言：为什么需要双血输入函数

18F-FDG PET 能通过葡萄糖代谢活性反映炎症和肿瘤等病理过程，但传统静态 SUV 或单血输入函数模型往往把复杂血供简化为一个输入源。对于肝脏和肺部，这种简化尤其容易造成偏差：肝脏同时接受肝动脉和门静脉供血；肺部病灶则处在肺循环与支气管循环共同影响下。双血输入函数（dual-blood input function, DBIF）的核心价值，正是在动态 PET 与药代动力学模型中显式区分不同血源，使示踪剂进入组织的过程更接近真实生理。

## 肝脏场景：双血供使 SBIF 不够充分

肝脏约四分之三血流来自门静脉，约四分之一来自肝动脉。非酒精性脂肪性肝病（NAFLD）已成为全球重要健康问题，系统综述估计其全球患病率约为 25% [1]。在炎症或纤维化评估中，如果只用单血输入函数（SBIF）表示血浆放射性输入，就会忽略门静脉与肝动脉到达时间、浓度曲线和贡献比例的差异。DBIF 模型因此更适合描述肝组织中 18F-FDG 的真实输入过程。

![图1  肝脏双血供示意：肝动脉与门静脉共同决定示踪剂输入。来源：原 PPT 配图。](/assets/notes/dbif-dynamic-pet/image4.png)

图1  肝脏双血供示意：肝动脉与门静脉共同决定示踪剂输入。来源：原 PPT 配图。

## 肺部场景：肿瘤血供改变让 DBIF 更有意义

肺组织具有两套循环系统：肺动脉提供去氧血，支气管动脉提供氧合血。正常肺组织中支气管动脉贡献较小，常可近似忽略；但肺肿瘤发生血管生成后，支气管动脉供血比例可能升高。肺癌仍是全球癌症死亡的首要原因，WHO 报告 2022 年全球约有 250 万新发病例和 180 万死亡 [2]。因此，能够更早、更稳健地区分肿瘤组织与正常肺组织的定量 PET 模型，具有明确的临床意义。

![图2  肺部双循环系统：肺动脉与支气管动脉构成肺部 DBIF 建模基础。来源：原 PPT 配图。](/assets/notes/dbif-dynamic-pet/image6.png)

图2  肺部双循环系统：肺动脉与支气管动脉构成肺部 DBIF 建模基础。来源：原 PPT 配图。

## 18F-FDG 与动态 PET：从“亮不亮”到“为什么亮”

18F-FDG 是葡萄糖类似物，可通过 GLUT 转运进入细胞，并被己糖激酶磷酸化为 FDG-6-phosphate。由于 FDG-6-phosphate 难以继续参与糖酵解，它会在代谢活跃细胞中滞留，因此炎症细胞和肿瘤细胞常表现为 FDG 摄取升高。动态 PET 不只记录某一时刻的分布，而是连续追踪示踪剂摄取、清除和代谢转化过程；再结合药代动力学模型，就可以估计 K1、k2、k3、k4 和血容量分数 Vb 等参数。

![图3  18F-FDG 分子结构。FDG 的葡萄糖类似物特性使其可用于代谢显像。来源：原 PPT 配图。](/assets/notes/dbif-dynamic-pet/image7.png)

图3  18F-FDG 分子结构。FDG 的葡萄糖类似物特性使其可用于代谢显像。来源：原 PPT 配图。

## 药代动力学参数的解释

经典两组织室模型把示踪剂状态分为血液中游离 FDG、组织中游离 FDG，以及组织中已磷酸化的 FDG-6P。K1 表示 FDG 从血液进入组织的转运速率；k2 表示从组织回到血液的清除速率；k3 表示磷酸化速率；k4 表示去磷酸化速率；Vb 表示血容量分数。对于肝炎和肿瘤等病变，K1、k3 与 Vb 的改变可能反映血流、转运蛋白活性和代谢活性的综合变化。

![图4  18F-FDG 两组织室模型：血液、组织游离 FDG 与组织 FDG-6P 构成动力学分析框架。来源：原 PPT 配图。](/assets/notes/dbif-dynamic-pet/image18.png)

图4  18F-FDG 两组织室模型：血液、组织游离 FDG 与组织 FDG-6P 构成动力学分析框架。来源：原 PPT 配图。

## 肝炎 DBIF 模型：优化推导的输入函数提高参数可信度

Wang 等在人体肝炎动态 PET 研究中比较了三种模型：使用图像推导单血输入函数的传统模型、基于群体平均的 DBIF 模型，以及通过联合估计框架优化推导 DBIF 的模型 [4]。结果显示，优化推导 DBIF 模型具有更小的 AIC 和更强的 F 检验表现；其估计的 K1 与病理炎症分级显著相关，而其他模型未达到同样的统计显著性。Zuo 等进一步从结构和实际可辨识性角度分析了肝脏双输入建模，提示模型参数能否稳定估计本身就是临床转化前必须回答的问题 [3]。

![图5  肝脏双血输入模型框架：将动脉输入和门静脉输入合并为组织输入函数。来源：原 PPT 配图，参见文献 [3,4]。](/assets/notes/dbif-dynamic-pet/image19.jpeg)

图5  肝脏双血输入模型框架：将动脉输入和门静脉输入合并为组织输入函数。来源：原 PPT 配图，参见文献 [3,4]。

## 肺肿瘤 DBIF 模型：总身动态 PET 带来高时间分辨率

在肺肿瘤研究中，Wang 等利用总身动态 PET 的高时间分辨率，将右心室输入近似为肺动脉输入，将左心室输入近似为支气管动脉输入，并建立包含时间延迟、血容量分数和支气管动脉贡献比例的 DBIF 模型 [5]。研究显示，DBIF 在区分肺组织与肺肿瘤方面更稳健；模型估计的支气管动脉贡献也更接近文献参考值。换言之，DBIF 不只是拟合曲线更漂亮，而是把肿瘤血供改变这一生理事实纳入了定量参数。

![图6  肺肿瘤 DBIF 模型：右心室/左心室输入分别近似肺动脉与支气管动脉输入。来源：原 PPT 配图，参见文献 [5]。](/assets/notes/dbif-dynamic-pet/image27.jpeg)

图6  肺肿瘤 DBIF 模型：右心室/左心室输入分别近似肺动脉与支气管动脉输入。来源：原 PPT 配图，参见文献 [5]。

![图7  肺部模型比较结果示例：DBIF 用于提高肿瘤与正常肺组织区分性能。来源：原 PPT 配图，参见文献 [5]。](/assets/notes/dbif-dynamic-pet/image36.jpeg)

图7  肺部模型比较结果示例：DBIF 用于提高肿瘤与正常肺组织区分性能。来源：原 PPT 配图，参见文献 [5]。

## 临床意义与局限

DBIF 动态 PET 的意义可以概括为三点。第一，它提升了示踪剂动力学参数的精确性，使 K1、Ki、Vb 等指标更具有生理解释力。第二，它支持个体化评估，因为不同患者的血流比例、输入延迟和组织代谢状态可能不同。第三，它可能为炎症分级和肿瘤评估提供非侵入性补充，减少单纯依赖活检或静态影像的局限。与此同时，该技术仍面临样本量较小、PET 空间分辨率有限、病理与影像空间配准困难、模型复杂度增加等问题。未来需要更大规模验证、高分辨率 PET 技术、病理-影像精确配准，以及面向具体疾病机制的模型优化。

![图8  肺肿瘤 DBIF 参数统计表。来源：原 PPT 配图，参见文献 [5]。](/assets/notes/dbif-dynamic-pet/image42.png)

图8  肺肿瘤 DBIF 参数统计表。来源：原 PPT 配图，参见文献 [5]。

### 局限与未来方向

| 当前局限 | 未来方向 |
|---|---|
| 样本量较小 | 开展多中心、大样本验证研究 |
| PET 空间分辨率有限 | 应用高分辨率 PET 与总身动态 PET 技术 |
| 病理与影像空间配准困难 | 建立更精确的病理-影像配准流程 |
| 模型参数更多、估计更复杂 | 优化模型约束并探索更明确的生理机制 |

## 结论

双血输入函数动态 PET 将“器官和肿瘤真实接受哪几路血供”这一生理问题放回成像模型之中。对于肝炎，它能更合理地处理肝动脉与门静脉输入；对于肺肿瘤，它能刻画肺动脉和支气管动脉共同作用下的示踪剂动力学。现有研究表明，DBIF 可提升模型拟合质量、参数可解释性和组织区分能力。随着总身 PET、高时间分辨率采集和更稳健的参数估计方法发展，DBIF 有望成为炎症与肿瘤定量 PET 诊断中的重要技术路线。

## 参考文献

[1] Younossi, Z. M., et al. (2016). Global epidemiology of nonalcoholic fatty liver disease: Meta-analytic assessment of prevalence, incidence, and outcomes. Hepatology, 64(1), 73-84. https://doi.org/10.1002/hep.28431

[2] World Health Organization. (2025). Lung cancer fact sheet. https://www.who.int/news-room/fact-sheets/detail/lung-cancer

[3] Zuo, Y., Sarkar, S., Corwin, M. T., Olson, K., Badawi, R. D., & Wang, G. (2019). Structural and practical identifiability of dual-input kinetic modeling in dynamic PET of liver inflammation. Physics in Medicine and Biology, 64(17), 175023. https://doi.org/10.1088/1361-6560/ab1f29

[4] Wang, G., Corwin, M. T., Olson, K. A., Badawi, R. D., & Sarkar, S. (2018). Dynamic PET of human liver inflammation: Impact of kinetic modeling with optimization-derived dual-blood input function. Physics in Medicine and Biology, 63(15), 155004. https://doi.org/10.1088/1361-6560/aac8cb

[5] Wang, Y., Abdelhafez, Y. G., Spencer, B. A., et al. (2024). High-temporal-resolution kinetic modeling of lung tumors with dual-blood input function using total-body dynamic PET. Journal of Nuclear Medicine, 65(5), 714-721. https://doi.org/10.2967/jnumed.123.267036