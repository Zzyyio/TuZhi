import type { ArticleVideo } from "./types";
import { WIKI_GUIDES } from "@/lib/encyclopedia-guides";

export type KnowledgeVideo = {
  bvid: string;
  title: string;
  /** True when the clip is same-symptom / same-practice, not a perfect title match. */
  reference?: boolean;
  whyThisVideo?: string;
  searchQueryUsed?: string;
};

/** 100 slug → public Bilibili BV. Max two uses per BV. */
export const KNOWLEDGE_VIDEOS: Record<string, KnowledgeVideo> = {
  "suan-hua": { bvid: "BV1jT6TYXEjx", title: "如何调理土壤酸化问题？", whyThisVideo: "标题直接讲土壤酸化调理，是总论片，不讲茶园禁忌或铝毒特写。", searchQueryUsed: "土壤酸化 调理 石灰 农技" },
  "yan-jian": { bvid: "BV1zU4y1b7eg", title: "土壤盐渍化", whyThisVideo: "讲盐渍化本身，比化肥板结混谈片更贴白霜出苗。", searchQueryUsed: "盐碱地 白霜 出苗 治理" },
  "ban-jie": { bvid: "BV1po4y1W7Fv", title: "农田土壤板结的原因（二）", whyThisVideo: "专讲农田板结成因，不是犁底层特写。", searchQueryUsed: "农田土壤板结 原因 深松" },
  "you-ji-zhi": { bvid: "BV1Si421h7bY", title: "如何给土壤加有机质", whyThisVideo: "换掉「土壤板结不用怕」。本片标题就是加有机质。", searchQueryUsed: "土壤有机质 下降 提升 秸秆还田" },
  "que-dan": { bvid: "BV1hV4y1o7NV", title: "常见作物的缺素症（一）", whyThisVideo: "缺素系列第一集，覆盖下部老叶发黄的氮。", searchQueryUsed: "作物缺氮 下部老叶发黄" },
  "que-jia": { bvid: "BV1aV4y1o7r9", title: "常见作物的缺素症（二）", whyThisVideo: "缺素系列第二集，叶缘焦枯对缺钾。", searchQueryUsed: "作物缺钾 叶缘焦枯" },
  "que-lin": { bvid: "BV1jvtK6DE43", title: "如何判断你的植物需要施肥？植物营养缺乏识别基本指南", whyThisVideo: "已检索无更专「苗紫缺磷」田间片，用营养缺乏识别指南，本文专写紫苗与酸锁磷。", searchQueryUsed: "作物缺磷 苗紫 发僵", reference: true },
  "que-tie": { bvid: "BV1cN4y1g742", title: "叶片发黄，叶脉深绿，缺铁or缺镁？", whyThisVideo: "标题就在分新叶缺铁和老叶缺镁，比泛微量片更贴。", searchQueryUsed: "作物缺铁黄化 新叶 叶脉绿" },
  "que-xin": { bvid: "BV1uCedeDEFn", title: "植物缺锌症状与锌肥补充", whyThisVideo: "标题含缺锌症状与补锌。", searchQueryUsed: "玉米花白苗 缺锌" },
  "que-gai": { bvid: "BV1YT411b7bA", title: "想要瓜果长得好 钙肥硼肥不能少 缺硼缺钙容易落花落果 裂果", whyThisVideo: "讲缺钙裂果落花，不是草莓广告。", searchQueryUsed: "作物缺钙 脐腐 顶芽 番茄" },
  "que-mei": { bvid: "BV1mHaMekEkU", title: "作物缺镁的症状及解决方法", whyThisVideo: "标题就是作物缺镁。", searchQueryUsed: "作物缺镁 老叶脉间黄" },
  "que-peng": { bvid: "BV1mfYYe7EKH", title: "植物缺素，硼元素，硼肥缺失，硼肥补充", whyThisVideo: "专讲硼与落花落果，不是泛缺素图谱。", searchQueryUsed: "作物缺硼 花而不实 空心茎" },
  "que-meng": { bvid: "BV1z1eoeMEHR", title: "植物缺素的症状，缺锰的症状与锰肥补充", whyThisVideo: "标题含缺锰症状。", searchQueryUsed: "作物缺锰 新叶褐斑" },
  "que-liu": { bvid: "BV1hV4y1o7NV", title: "常见作物的缺素症（一）", whyThisVideo: "已检索无更专缺硫片。第一集含新叶也黄的对照，本文专写硫氮叶位差。", searchQueryUsed: "作物缺硫 新叶也黄 和缺氮区别", reference: true },
  "que-tong": { bvid: "BV1YNhueJEBd", title: "钼肥的重要性", whyThisVideo: "已检索无「叶尖发白穗不实」专片。微量元素讲解退到邻近微量肥片，本文写铜。", searchQueryUsed: "作物缺铜 叶尖发白 穗不实", reference: true },
  "que-mu": { bvid: "BV1YNhueJEBd", title: "钼肥的重要性", whyThisVideo: "标题含钼肥，贴豆科固氮。", searchQueryUsed: "作物缺钼 豆科 固氮" },
  "huang-ye-jian-bie": { bvid: "BV118411T7F1", title: "农作物缺素图谱大全", whyThisVideo: "图谱适合总鉴别，不给任何一种元素的完整施肥方案。", searchQueryUsed: "黄叶鉴别 缺素 药害 病害 涝害" },
  "lian-zuo": { bvid: "BV1Xo4y1H7W5", title: "土壤连作障碍的定义及危害", whyThisVideo: "标题即连作障碍定义，总论片。", searchQueryUsed: "土壤连作障碍 定义 危害" },
  "dashe-yanzhi": { bvid: "BV1QY4y1d7CR", title: "设施蔬菜生产中土壤盐渍化、重金属污染及农药残留的危害", whyThisVideo: "设施盐渍化专讲，不是露地盐碱。", searchQueryUsed: "大棚 设施 土壤盐渍化" },
  "shao-gen": { bvid: "BV1yB4y1Y74z", title: "到底什么是肥害和烧根？一个视频全讲清！", whyThisVideo: "换掉与盐碱片共用。本片标题就是肥害烧根。", searchQueryUsed: "施肥烧根 肥害 浓度过高" },
  "miao-qi-fei-hai": { bvid: "BV1yB4y1Y74z", title: "到底什么是肥害和烧根？一个视频全讲清！", whyThisVideo: "与烧根同一讲次，主题高度重叠：浓度伤根。本文只写苗期贴籽。", searchQueryUsed: "苗期肥害 烧籽 出苗不齐", reference: true },
  "an-hai": { bvid: "BV1Tm411z78B", title: "尿素与氨", whyThisVideo: "换掉盐碱共用片。本片讲尿素和氨，贴棚内氨气来源。", searchQueryUsed: "大棚氨气害 尿素 熏叶" },
  "lv-hai": { bvid: "BV1aV4y1o7r9", title: "常见作物的缺素症（二）", whyThisVideo: "已检索无忌氯专片。用叶缘焦枯片作对照，本文写清氯害与缺钾怎么分。", searchQueryUsed: "忌氯作物 氯化钾 氯害 马铃薯", reference: true },
  "di-guan-nong-du": { bvid: "BV1EkeaePEzk", title: "揭秘水肥一体化工作原理", whyThisVideo: "换掉蓝莓栽培全集。水肥一体化原理贴滴灌浓度。", searchQueryUsed: "滴灌 肥液浓度 EC 烧根" },
  "wei-fu-shu-you-ji-fei": { bvid: "BV1i3411m7vT", title: "鸡粪如何快速腐熟？", whyThisVideo: "讲腐熟过程，正对未腐熟烧苗。", searchQueryUsed: "未腐熟有机肥 烧苗 鸡粪腐熟" },
  "yao-hai": { bvid: "BV1dH4y1j7TG", title: "作物出现药害怎么办？", whyThisVideo: "换掉缺素图谱。标题就是药害。", searchQueryUsed: "农作物药害 症状 和缺素区别" },
  "lao-hai": { bvid: "BV16P411r738", title: "地理小知识——水稻土", whyThisVideo: "已检索无「旱地积水根发黑」专片。用水稻土渍水片作大类，本文写旱地菜地明水。", searchQueryUsed: "农田积水 涝害 淹水 根发黑", reference: true },
  "fan-yan": { bvid: "BV1Cs4y1i7gU", title: "地理小知识——土壤盐渍化", whyThisVideo: "讲盐随水来、水走盐留的时间过程，贴返盐。", searchQueryUsed: "土壤返盐 浇水后白霜" },
  "shi-hui-xing-tu": { bvid: "BV1cN4y1g742", title: "叶片发黄，叶脉深绿，缺铁or缺镁？", whyThisVideo: "换掉酸化片。高 pH 锁铁的黄化鉴别，贴石灰性土。", searchQueryUsed: "石灰性土壤 缺铁黄化 华北 钙质土", reference: true },
  "shi-gao-gai-jian": { bvid: "BV1eF4m1c79o", title: "央视《盐碱地上的生机》盐碱化的治理措施", whyThisVideo: "治理措施含石膏改碱，不是所有白霜。", searchQueryUsed: "石膏 改良碱土 苏打盐碱" },
  "sha-tu-lou-fei": { bvid: "BV12bbaz9EcV", title: "改良土壤排水透气，不容易板结烂根", whyThisVideo: "已检索无更专沙土漏肥片。改排水透气片作大类，本文写沙土漏肥漏水。", searchQueryUsed: "沙土地 漏肥漏水 怎么改", reference: true },
  "nian-tu-nan-geng": { bvid: "BV1su4y1f73T", title: "堆肥后土太黏，怎么办？土壤改良万用公式", whyThisVideo: "讲黏土改良，不是犁底层。", searchQueryUsed: "黏土地 难耕 干裂 改良" },
  "li-di-ceng": { bvid: "BV1kB4y1y7Rh", title: "有效打破犁底层可以助作物防涝抗旱", whyThisVideo: "标题就是犁底层，只给这一篇用。", searchQueryUsed: "犁底层 旋耕 深松" },
  "hei-tu-tui-hua": { bvid: "BV1HP411L7FE", title: "世界上仅有的3块黑土地", whyThisVideo: "东北黑土背景，贴变瘦变薄。", searchQueryUsed: "东北黑土地 退化 有机质" },
  "jie-gan-huan-tian": { bvid: "BV15z4y1Y7fx", title: "秸秆还田的方法", whyThisVideo: "还田方法，本文补烧苗抢氮。", searchQueryUsed: "秸秆还田 烧苗 抢氮" },
  "shi-hui-yong-liang": { bvid: "BV1jT6TYXEjx", title: "如何调理土壤酸化问题？", whyThisVideo: "与酸化总论同一讲次。本篇只写石灰种类、用量和隔开铵态氮。", searchQueryUsed: "农用石灰 用量 生石灰 熟石灰", reference: true },
  "xiu-shui-tian": { bvid: "BV1w24y1s7V4", title: "青岗泥，冷浸田", whyThisVideo: "换掉酸化成因。冷浸锈水同一潜育环境，本文专写锈水亚铁。", searchQueryUsed: "锈水田 亚铁毒 水稻 赤枯", reference: true },
  "qian-yu-tian": { bvid: "BV1w24y1s7V4", title: "青岗泥，冷浸田", whyThisVideo: "标题含冷浸田，正对本篇。", searchQueryUsed: "冷浸田 潜育化 青岗泥" },
  "shui-tian-huan-yuan": { bvid: "BV16GrdYqECv", title: "水稻土，对土壤的改良", whyThisVideo: "换掉犁底层。水稻土改良贴还原层，本文写黑根臭根。", searchQueryUsed: "水田还原障碍 黑根 硫化氢 臭根" },
  "wei-sheng-wu": { bvid: "BV1PQ4y1i7eD", title: "【实验】土壤微生物的分离与观察", whyThisVideo: "换掉板结变肥沃。微生物观察片，本文写失衡不是菌剂广告。", searchQueryUsed: "土壤微生物 菌群失衡 土传" },
  "ce-tu-bao-gao": { bvid: "BV13E421M7Ly", title: "测土配方，科学施肥", whyThisVideo: "测土配方总论，贴化验单阅读顺序。", searchQueryUsed: "如何看懂测土化验单" },
  "ce-tu-qu-yang": { bvid: "BV1kZfsBdEBc", title: "土壤采样技术规范及要点", whyThisVideo: "采样规范，正对取样不准。", searchQueryUsed: "土壤取样 采样规范" },
  "cha-yuan-guo-suan": { bvid: "BV1Az4y157io", title: "土壤为什么会酸化？如何判断？", whyThisVideo: "已检索无更专茶园酸化片。用酸化判断大类，本文只写茶树耐酸不等于越酸越好。", searchQueryUsed: "茶园土壤酸化 pH 改良", reference: true },
  "ma-ling-shu-tu": { bvid: "BV1Vj411H7xm", title: "马铃薯疮痂病粉痂病全流程防治方案", whyThisVideo: "换掉盐渍化。标题含疮痂病。", searchQueryUsed: "马铃薯疮痂病 土壤偏碱" },
  "sheng-wu-you-ji-fei": { bvid: "BV1f1tA6jEEe", title: "畜禽粪便无害化处理：有机肥堆肥技术", whyThisVideo: "堆肥技术，贴什么时候菌剂才不是安慰剂。", searchQueryUsed: "生物有机肥 怎么用 不是智商税" },
  "guo-yuan-tu-rang": { bvid: "BV1fa4y1G7RR", title: "绿肥：大面积改良土壤的简单有效的方法", whyThisVideo: "生草绿肥贴果园行间养土。", searchQueryUsed: "果园 树盘 土壤培肥 生草", reference: true },
  "da-peng-lian-zuo-zong-he": { bvid: "BV1QmXdBGESj", title: "连作障碍有三怪", whyThisVideo: "三怪对应盐病肥叠加。", searchQueryUsed: "大棚连作障碍 盐 病 肥害" },
  "yang-fen-kang-kang": { bvid: "BV14G4y1x79n", title: "测土配方施肥技术", whyThisVideo: "配方施肥含养分平衡，本文只写拮抗。", searchQueryUsed: "养分拮抗 磷锌 钾镁", reference: true },
  "gen-fu-jian-bie": { bvid: "BV1fQgE61EQz", title: "作物莫名蔫棵死棵？分不清根腐还是枯萎？", whyThisVideo: "标题就是先看根再分。", searchQueryUsed: "根腐 枯萎 鉴别 看根" },
  "han-yan-jian-bie": { bvid: "BV18N411N7ce", title: "土壤盐渍化形成的自然原因", whyThisVideo: "已检索无萎蔫对照专片。盐渍化成因作大类，本文写旱和咸怎么分。", searchQueryUsed: "作物萎蔫 干旱 盐害 怎么区分", reference: true },
  "hong-huang-rang-gai-suan": { bvid: "BV12a411M7yK", title: "中国近30年土壤酸化堪比过去1000年", whyThisVideo: "南方酸化背景，贴红黄壤改酸，不讲茶园。", searchQueryUsed: "红黄壤 改酸 石灰" },
  "lv-du-shang-gen": { bvid: "BV1G2cJeTELe", title: "酸性土壤条件下，根际细菌群可有效提高水稻铝毒及低磷耐受性", whyThisVideo: "检索到的最贴「铝毒」片子。偏文献，本文把根尖秃褐写成田间动作。", searchQueryUsed: "土壤铝毒 根尖 酸性土" },
  "suan-yu-que-gai": { bvid: "BV1oe4y1r7rb", title: "3分钟弄懂糖醇钙、EDTA螯合钙", whyThisVideo: "讲叶面钙形态，本文强调叶面只救急、酸土要改。", searchQueryUsed: "土壤酸化 缺钙 脐腐 裂果" },
  "suan-tu-shi-lin": { bvid: "BV1MK4y1X7AS", title: "测土配方精准施肥", whyThisVideo: "已检索无更专酸土锁磷片。配方施肥大类，本文写先改酸再补磷。", searchQueryUsed: "酸性土 磷固定 有效磷", reference: true },
  "sheng-li-suan-xing-fei": { bvid: "BV1hM411z71g", title: "土壤酸化是如何形成的？（农业土壤）", whyThisVideo: "酸化成因含生理酸性肥，正对本篇。", searchQueryUsed: "生理酸性肥料 尿素 土壤酸化" },
  "cha-yuan-shi-hui-jin-ji": { bvid: "BV1Az4y157io", title: "怎么防止土壤酸化", whyThisVideo: "已检索无「茶园能不能施石灰」专片。用防酸化大类，本文只写茶园禁忌。", searchQueryUsed: "茶园 能不能施石灰 禁忌", reference: true },
  "su-da-yan-jian": { bvid: "BV1gL4y1u718", title: "盐碱地，如何形成的？我国竟有近15亿亩", whyThisVideo: "盐碱形成含碱化，贴苏打土和石膏边界。", searchQueryUsed: "苏打盐碱地 碱化土 石膏" },
  "bin-hai-yan-tu": { bvid: "BV1GoDtYKE4B", title: "垦利滨海盐碱地治理与利用", whyThisVideo: "滨海治理，先排水洗盐。", searchQueryUsed: "滨海盐碱地 洗盐 排水" },
  "wei-xian-shui-guan-gai": { bvid: "BV13MrQBPEuq", title: "盐碱地治理 / 咸水结冰灌溉法", whyThisVideo: "标题含咸水灌溉。", searchQueryUsed: "微咸水灌溉 盐碱地" },
  "di-biao-fu-yan": { bvid: "BV1Cs4y1i7gU", title: "地理小知识——土壤盐渍化", whyThisVideo: "与返盐同一盐随水走讲次。本篇专写膜边白霜位置。", searchQueryUsed: "地膜 返盐 膜边白霜", reference: true },
  "yan-jian-di-xuan-zuo": { bvid: "BV1z2SRBVEJK", title: "盐碱地长不出丰硕的果实", whyThisVideo: "适种与活苗，不是石膏配方。", searchQueryUsed: "盐碱地 种什么 耐盐作物" },
  "xi-yan-pai-shui": { bvid: "BV1eF4m1c79o", title: "盐碱化的治理措施", whyThisVideo: "与石膏篇同一治理讲次。本篇只写有灌必须有排。", searchQueryUsed: "洗盐 排水 暗管 排碱沟", reference: true },
  "da-peng-huan-tu-xi-yan": { bvid: "BV1QY4y1d7CR", title: "设施蔬菜土壤盐渍化", whyThisVideo: "与大棚盐渍化同一设施讲次。本篇写换土还是洗盐。", searchQueryUsed: "大棚盐渍化 换土 还是洗盐", reference: true },
  "xuan-geng-bian-qian": { bvid: "BV15J4m1A7d4", title: "土壤板结都是怎么形成的?", whyThisVideo: "板结形成含旋耕变浅。", searchQueryUsed: "年年旋耕 耕层变浅" },
  "shen-song-shi-ji": { bvid: "BV13x411E7VU", title: "深松翻转犁", whyThisVideo: "深松机具演示，贴何时松、松多深。", searchQueryUsed: "深松 时间 深度" },
  "tu-rang-tuan-ju-ti": { bvid: "BV1184y1z7LV", title: "土壤板结硬邦邦，怎么办？", whyThisVideo: "改结构，贴面土浆土。", searchQueryUsed: "土壤团聚体 结构 面土 浆土" },
  "ji-ya-che-zhe": { bvid: "BV1po4y1W7Fv", title: "农田土壤板结的原因（二）", whyThisVideo: "与板结总论同一成因讲次。本篇只写车辙碾压。", searchQueryUsed: "农机碾压 车辙 土壤压实", reference: true },
  "ban-jie-yu-gen-xi": { bvid: "BV1oUVG6NEmF", title: "一分钟了解土壤板结", whyThisVideo: "板结与根系关系短片。", searchQueryUsed: "土壤板结 根系浅" },
  "fu-gai-gai-zhi-di": { bvid: "BV12bbaz9EcV", title: "配土提高排水透气性，不容易板结", whyThisVideo: "透气覆盖方向，本文写覆盖不能当鹤嘴镐。", searchQueryUsed: "秸秆覆盖 地膜 改良板结", reference: true },
  "lv-fei-fan-ya": { bvid: "BV1fa4y1G7RR", title: "绿肥：大面积改良土壤", whyThisVideo: "绿肥片，本文补翻压憋苗。", searchQueryUsed: "绿肥翻压 憋苗 注意" },
  "sheng-wu-tan": { bvid: "BV1V94y1a73M", title: "三分钟了解什么是生物炭", whyThisVideo: "生物炭是什么，本文写不是撒一点就翻身。", searchQueryUsed: "生物炭 土壤改良 用量" },
  "you-ji-fei-ru-he-xuan": { bvid: "BV1GY4y1D7kf", title: "教你怎么发酵鸡粪有机肥", whyThisVideo: "发酵选肥，贴腐熟盐分碳氮比。", searchQueryUsed: "有机肥怎么选 腐熟 盐分 碳氮比" },
  "jie-gan-bu-dan": { bvid: "BV1R2LwzXEVu", title: "秸秆还田的意义", whyThisVideo: "还田意义，本文专写补氮怎么算。", searchQueryUsed: "秸秆还田 补氮 碳氮比" },
  "hei-tu-you-ji-zhi-shou-hu": { bvid: "BV1e44y1h7Mh", title: "秸秆生物炭的制备、性能及其在黑土资源保护中的应用", whyThisVideo: "黑土保护，贴怎么守有机质。", searchQueryUsed: "黑土地保护 有机质 秸秆覆盖" },
  "sha-tu-zeng-you-ji-zhi": { bvid: "BV1sA411r7Ts", title: "增加土壤有机质，快速有效的好方法", whyThisVideo: "增有机质方法，本文写沙土必须少量多次。", searchQueryUsed: "沙土 增加有机质" },
  "que-xin-yu-lin": { bvid: "BV1uCedeDEFn", title: "植物缺锌症状与锌肥补充", whyThisVideo: "与缺锌同一讲次。本篇写高磷掩盖。", searchQueryUsed: "高磷 抑制锌 缺锌", reference: true },
  "que-peng-hua-er-bu-shi": { bvid: "BV1gQgHzWEEr", title: "番茄缺硼症的识别与防治", whyThisVideo: "花而不实现场，比泛缺素片更贴。", searchQueryUsed: "花而不实 缺硼 干旱 盐害" },
  "qi-zi-huang-hua": { bvid: "BV1haJAzoEvS", title: "葡萄叶片黄化原因知多少", whyThisVideo: "已检索无柑橘黄龙病专片。黄化鉴别大类，本文写柑橘三路。", searchQueryUsed: "柑橘黄化 缺铁 根腐 黄龙病 鉴别", reference: true },
  "pu-tao-shi-hui-tu-que-tie": { bvid: "BV1haJAzoEvS", title: "葡萄叶片黄化原因知多少", whyThisVideo: "标题就是葡萄黄化，换掉板结调酸片。", searchQueryUsed: "葡萄 缺铁黄化 石灰性土壤" },
  "hua-sheng-kong-jia": { bvid: "BV1YT411b7bA", title: "缺硼缺钙容易落花落果 裂果", whyThisVideo: "换掉草莓缺钙广告。已检索无花生空荚专片，用缺钙机理片，本文写果针吸钙。", searchQueryUsed: "花生空荚 空壳 缺钙 果针", reference: true },
  "ye-cai-xiao-xing-yuan-su": { bvid: "BV1544tzXEL4", title: "植物缺各类元素判断与补充方法", whyThisVideo: "微量判断，本文强调叶菜叶面只救急。", searchQueryUsed: "叶菜 微量元素 叶面肥" },
  "shui-dao-jiang-miao": { bvid: "BV1CP4y1L7o8", title: "什么是僵苗？植物僵苗了怎么办？", whyThisVideo: "僵苗定义，本文写水稻四路。", searchQueryUsed: "水稻僵苗 原因 酸化 冷害 肥害" },
  "yu-mi-miao-huang": { bvid: "BV1zGSqYPEGf", title: "绿植养护小课堂｜看叶子识病变", whyThisVideo: "已检索无更专玉米苗黄四路片。看叶鉴别大类，本文写玉米四路。", searchQueryUsed: "玉米苗黄 缺氮 缺锌 除草剂 涝", reference: true },
  "gen-jie-xian-chong": { bvid: "BV1RtBsB9EqN", title: "根瘤！根节！根结线虫！应对方法最全最简", whyThisVideo: "标题含根结线虫。", searchQueryUsed: "根结线虫 根瘤 防治" },
  "tu-chuan-ku-wei": { bvid: "BV1vx4y1p7QJ", title: "什么是土传病害?土传病害的解决方案", whyThisVideo: "土传总论，本文写剖茎看维管束。", searchQueryUsed: "枯萎病 维管束 土传" },
  "qing-ku-bing-tu": { bvid: "BV1et42157fX", title: "番茄的青枯病，是最严重的致死性病害", whyThisVideo: "标题含青枯病。", searchQueryUsed: "青枯病 土壤 闷棚" },
  "cao-mei-lian-zuo": { bvid: "BV1oZo4B2Efh", title: "草莓根腐病的症状、原因和解决办法", whyThisVideo: "草莓根腐，贴连作棚。", searchQueryUsed: "草莓连作障碍 根腐 线虫" },
  "ping-guo-zai-zhi": { bvid: "BV13t4y1B7UA", title: "连作障碍，导致不能常年种植一种作物", whyThisVideo: "已检索无苹果再植专片。连作障碍大类，本文写老树坑。", searchQueryUsed: "苹果再植障碍 重茬", reference: true },
  "gao-wen-men-peng": { bvid: "BV1LG8MzGEa8", title: "高温闷棚这些细节不注意白花钱", whyThisVideo: "闷棚注意事项，贴能压菌也会伤结构。", searchQueryUsed: "高温闷棚 注意事项" },
  "han-lao-ji-zhuan": { bvid: "BV1kB4y1y7Rh", title: "有效打破犁底层可以助作物防涝抗旱", whyThisVideo: "已检索无旱涝急转专片。防涝抗旱片作大类，本文写急转先伤根。", searchQueryUsed: "旱涝急转 伤根 黄叶", reference: true },
  "di-xia-shui-wei-gao": { bvid: "BV16GrdYqECv", title: "水稻土，对土壤的改良", whyThisVideo: "已检索无地下水位专片。水稻土渍水大类，本文写水位高根不深。", searchQueryUsed: "地下水位高 渍害 根系", reference: true },
  "yu-hou-ban-jie-kai-lie": { bvid: "BV1QE466iEFF", title: "土壤板结开裂这样做", whyThisVideo: "标题含板结开裂。", searchQueryUsed: "雨后土壤开裂 板结" },
  "leng-shui-guan-miao": { bvid: "BV1CP4y1L7o8", title: "什么是僵苗？植物僵苗了怎么办？", whyThisVideo: "与水稻僵苗同一讲次。本篇只写进水口冷水一条带。", searchQueryUsed: "冷水灌苗 水稻 僵苗", reference: true },
  "yan-jiang-qi-hou-tu": { bvid: "BV124hGz3EHn", title: "地理老师摩旅日记:水稻土形成的底层逻辑", whyThisVideo: "换掉滨海盐碱。水稻土形成贴沿江潜育。", searchQueryUsed: "潜育化水稻土 沿江 湿地土" },
  "shui-fei-yi-ti-hua-ec": { bvid: "BV14U4y1o7bN", title: "水肥一体化系统介绍", whyThisVideo: "系统介绍，本文写 EC 超了就是腌根。", searchQueryUsed: "水肥一体化 EC 值 烧根" },
  "ji-zhi-yu-tu-rang": { bvid: "BV1LafAYRE2m", title: "基质蓝莓滴灌施肥各阶段最佳EC值范围", whyThisVideo: "基质 EC，贴基质和大田不是同一套方子。", searchQueryUsed: "基质栽培 和土壤施肥 区别 EC" },
  "tu-rang-xiao-du-bian-jie": { bvid: "BV19Au16gExA", title: "土壤消毒该怎么做？", whyThisVideo: "消毒怎么做，本文写消完必须养土。", searchQueryUsed: "土壤消毒 之后养土" },
  "jian-yi-ph-ec": { bvid: "BV1nu4y1Y7mH", title: "如何用pH试纸测试土壤酸碱度", whyThisVideo: "标题就是 pH 试纸。", searchQueryUsed: "土壤 pH试纸 电导率仪 地头" },
  "shi-fei-tiao-tu-rang": { bvid: "BV14G4y1x79n", title: "测土配方施肥技术", whyThisVideo: "测土配方，贴看叶不能代替化验单。", searchQueryUsed: "看叶子施肥 不能代替测土", reference: true },
  "nan-fang-shui-tian-yang-fen": { bvid: "BV124hGz3EHn", title: "水稻土形成的底层逻辑", whyThisVideo: "与沿江湿地同一水稻土讲次。本篇写还原层锁养分。", searchQueryUsed: "南方水稻土 还原层 养分有效性", reference: true },
};

export function videoForSlug(slug: string, fallbackTitle: string): ArticleVideo {
  const hit = KNOWLEDGE_VIDEOS[slug];
  const bvid = hit?.bvid ?? "BV13E421M7Ly";
  return {
    platform: "bilibili",
    title: hit?.title ?? fallbackTitle,
    url: `https://www.bilibili.com/video/${bvid}/`,
  };
}

export function videoMeta(slug: string): KnowledgeVideo | undefined {
  if (KNOWLEDGE_VIDEOS[slug]) return KNOWLEDGE_VIDEOS[slug];
  const wiki = WIKI_GUIDES[slug];
  if (wiki) return { bvid: wiki.bvid, title: wiki.videoTitle };
  return undefined;
}
