#!/usr/bin/env python3
"""Emit src/lib/encyclopedia-guides.ts — 32 glossary entries in handbook shape."""
from __future__ import annotations

import json
from pathlib import Path

OUT = Path("/workspace/src/lib/encyclopedia-guides.ts")


def js(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


# id, zh name, en name, group, related slugs, bvid, video title,
# see_zh, see_en, why_zh, why_en, mix_zh, mix_en, word_zh, word_en
# mix = what farmers confuse it with
ROWS = [
("ph","pH（酸碱度）","pH","基础",["suan-hua","shi-hui-yong-liang","jian-yi-ph-ec"],"BV1nu4y1Y7mH","如何用pH试纸测试土壤酸碱度",
 "报告上先找 pH。低于大约 5.5，根尖容易褐秃；高于 8，新叶容易黄、脉还绿。",
 "Find pH first. Below about 5.5 root tips brown; above 8 new leaves yellow with green veins.",
 "雨水淋、铵态氮会把数字往下推；石灰性母质会往上推。茶树耐酸，粮菜多数不是。",
 "Rain and ammonium-N push it down; lime parent material pushes it up. Tea likes acid; most grain does not.",
 "有机质是肉，EC 是咸。pH 只说酸甜。",
 "Organic matter is meat, EC is salt. pH is only sour or sweet.",
 "pH 是尺子，不是病名。改酸改碱都冲着这个数字。",
 "pH is a ruler, not a disease. Lime and alkali work aim at this number."),
("om","有机质","Organic matter","基础",["you-ji-zhi","jie-gan-huan-tian","sha-tu-zeng-you-ji-zhi"],"BV1Si421h7bY","如何给土壤加有机质",
 "土色发浅、一抓就散、肥效年年飘，常常是肉薄了。颜色深不是化验。",
 "Pale powdery soil whose fertiliser ‘evaporates’ is often thin meat. Dark colour is not a lab number.",
 "沙土、裸冬、秸秆全拿走，肉掉得快。还田是慢功夫。",
 "Sand, bare winters and straw hauled off drop it fast. Straw return is slow work.",
 "质地说沙黏，容重说紧。有机质说有没有肉。",
 "Texture is sand or clay, bulk density is tightness. Organic matter is meat.",
 "有机质是家底，不是一袋菌的名字。",
 "Organic matter is the house and the meal, not the name of a microbe bag."),
("cec","CEC（阳离子交换量）","CEC","基础",["you-ji-zhi","sha-tu-lou-fei","nian-tu-nan-geng"],"BV1sA411r7Ts","增加土壤有机质，快速有效的好方法",
 "CEC 低的沙土，肥下去留不住；黏土和有机质高的土一次能多留一点。",
 "Low-CEC sand will not hold fertiliser. Clay and high-OM soils hold a bigger meal.",
 "质地和有机质决定磁力。质地改不掉，只能把肉养厚。",
 "Texture and OM set the magnet. You cannot change texture; you thicken OM.",
 "质地是沙黏本身，CEC 是抓肥的结果。",
 "Texture is sand or clay; CEC is the holding that follows.",
 "磁力弱就少量多次，磁力强才一次能多留。",
 "A weak magnet needs little-and-often. A strong magnet can hold more at once."),
("texture","质地","Texture","基础",["sha-tu-lou-fei","nian-tu-nan-geng","tu-rang-tuan-ju-ti"],"BV12bbaz9EcV","改良土壤排水透气",
 "搓一把：刺手是沙，能搓条是黏，中间是壤。质地改不掉。",
 "A handful: grit is sand, a ribbon is clay, in between is loam. Texture does not change.",
 "河滩、风沙是沙；湖积、老红土常黏。质地决定漏还是涝。",
 "River sand and dunes are sand; lake clay and old red earth often clay. Texture decides leak or waterlog.",
 "团粒是结构，质地是颗粒。沙土也能养出团粒。",
 "Aggregation is structure; texture is the particles. Sand can still crumb.",
 "质地是天生的骨架，管理只能改结构。",
 "Texture is the skeleton you were given. Management only changes structure."),
("aggregate","团粒结构","Aggregation","基础",["tu-rang-tuan-ju-ti","ban-jie","you-ji-zhi"],"BV1184y1z7LV","土壤板结硬邦邦，怎么办？",
 "好土能搓团又易散，里面有孔隙。面土干了像面粉，湿了像浆。",
 "Good soil holds and breaks, with pores inside. Broken structure is flour when dry, soup when wet.",
 "有机质、根系、菌丝是胶水。旋耕过碎、雨打裸地，团粒就散。",
 "OM, roots and hyphae are the glue. Over-rotavating and rain on bare soil smash crumbs.",
 "板结是团粒散了又被压死。质地没变，路封了。",
 "Compaction is crumbs smashed then smeared. Texture did not change; the road closed.",
 "团粒是土的面包结构，不是化肥能立刻捏出来的。",
 "Crumbs are the loaf structure. Fertiliser will not pinch them into being."),
("n","氮（N）","Nitrogen (N)","养分",["que-dan","huang-ye-jian-bie","yu-mi-miao-huang"],"BV1hV4y1o7NV","常见作物的缺素症（一）",
 "缺了下部老叶先匀黄，新叶相对还绿。根白才像缺氮。新叶也黄要想别的。",
 "Too little: old leaves yellow first, new leaves greener. White roots fit N. New-leaf yellow is another road.",
 "氮会搬家。沙土一次倒全年留不住。涝了根吃不到。",
 "Nitrogen moves. Sand cannot hold a season in one pour. Waterlogged roots cannot eat it.",
 "缺硫新叶也黄；缺铁新叶黄脉绿；涝害土湿还蔫。",
 "Sulphur yellows new leaves too; iron yellows new leaves with green veins; waterlog wilts on wet soil.",
 "氮是长叶子的养分。词是 N，地里的事看叶位。",
 "Nitrogen builds leaves. The word is N; the field job is leaf position."),
("alkn","碱解氮","Available N","养分",["que-dan","ce-tu-bao-gao","shi-fei-tiao-tu-rang"],"BV14G4y1x79n","测土配方施肥技术",
 "化验单上“现在能用的氮”大概有多少。不是土里全部的氮。",
 "A rough “N the crop can use this season”. Not total nitrogen.",
 "过低容易脱肥黄叶，过高容易旺长倒伏。按当地标准读。",
 "Too low, yellowing; too high, lodging. Use local ranges.",
 "全氮高、碱解氮低，说明库在、当年饭不够。",
 "High total N with low available N means a warehouse and an empty plate this season.",
 "碱解氮是当季饭量的尺子，不是处方。",
 "Available N is this season’s plate, not a prescription."),
("p","磷（P）","Phosphorus (P)","养分",["que-lin","suan-tu-shi-lin","que-xin-yu-lin"],"BV1jvtK6DE43","植物营养缺乏识别基本指南",
 "缺了苗紫红发僵、根短少。回暖仍不发棵。",
 "Deficiency: purple, stunted seedlings, few roots. Warmth does not restart them.",
 "酸土被铁铝钉住，钙质土被钙钉住。土里有磷，根摸不着。",
 "Acid soils nail it with Fe/Al; calcareous soils nail it with calcium. The soil has P; the root cannot touch it.",
 "缺氮是匀黄，缺磷是暗绿带紫。高磷还会把门堵住让锌进不来。",
 "N is even yellow; P is dark green with purple. High P also blocks zinc.",
 "磷管生根和开花。词是 P，地里先看紫苗和 pH。",
 "Phosphorus is roots and flowering. The word is P; the field job is purple seedlings and pH."),
("avp","有效磷","Available P","养分",["que-lin","suan-tu-shi-lin","ce-tu-bao-gao"],"BV1MK4y1X7AS","测土配方精准施肥",
 "报告上根能吃到的那部分磷。全磷高、有效磷低，常见于过酸或石灰性土。",
 "The P column the root can actually use. High total, low available: acid or lime soils.",
 "先改 pH 和集中施肥，不要只猛撒磷肥。",
 "Fix pH and band it. Don’t only dump more powder.",
 "有效磷不是全磷。两项对着看才知道是缺还是被锁。",
 "Available P is not total P. Read both to see lack versus lock.",
 "有效磷是根能碰到的磷，不是袋子上的纯度。",
 "Available P is what the root meets, not the purity on a bag."),
("k","钾（K）","Potassium (K)","养分",["que-jia","han-yan-jian-bie","jie-gan-huan-tian"],"BV1aV4y1o7r9","常见作物的缺素症（二）",
 "缺了老叶叶缘焦枯像火燎。土面不一定白。盐害也焦边，但常有白霜。",
 "Deficiency: old-leaf margins scorch like fire. The surface need not be white. Salt scorches too, usually with frost.",
 "高产田带走钾很多。秸秆还田能还钾。忌氯作物宜用硫酸钾。",
 "High-yield fields export a lot. Straw returns K. Chloride-sensitive crops prefer sulfate of potash.",
 "盐害、氯害、旱害都会焦边。先看土面和根，再谈钾。",
 "Salt, chloride and drought all scorch margins. Read the surface and the root before you say K.",
 "钾管水分和品质。词是 K，地里先把焦边和白霜分开。",
 "Potassium runs water use and quality. The word is K; split scorch from white crust first."),
("avk","速效钾","Available K","养分",["que-jia","ce-tu-bao-gao","sha-tu-lou-fei"],"BV15z4y1Y7fx","秸秆还田的方法",
 "当季能用的钾。沙土、高产、拿走秸秆的地容易低。",
 "K the crop can use this season. Sand, high yield, straw removed — often low.",
 "叶缘焦不一定只是缺钾。看速效钾，也看盐。",
 "Margin scorch is not only K. Read available K, and salt.",
 "全钾高、速效钾低，库在、当年不够。",
 "High total K, low available K: warehouse full, plate empty.",
 "速效钾是当季钾饭，不是岩石里的钾。",
 "Available K is this season’s plate, not potassium in the rock."),
("ca","交换性钙","Exchangeable Ca","养分",["que-gai","suan-yu-que-gai","hua-sheng-kong-jia"],"BV1YT411b7bA","缺硼缺钙容易落花落果 裂果",
 "缺钙走顶芽、脐腐、裂果、心叶焦。老叶相对还好。土里有钙也会吃不到。",
 "Ca lack hits the tip, blossom-end rot, split fruit, scorched heart leaves. Old leaves stay finer. Soil can have Ca the plant never sees.",
 "钙几乎不搬家。干旱、盐、铵态氮、过酸，都会让生长点饿着。",
 "Calcium barely moves. Drought, salt, ammonium-N and acid starve the tip.",
 "病害脐腐会烂深；缺钙常从脐部或顶芽开始，且水肥不稳更明显。",
 "Pathogen rot goes deep; Ca lack starts at the tip or blossom end and tracks wet–dry swings.",
 "交换性钙是土能交出的钙砖。叶面钙只救急。",
 "Exchangeable Ca is the brick the soil can hand over. A foliar spray is only a rescue."),
("al","交换性铝","Exchangeable Al","养分",["lv-du-shang-gen","suan-hua","hong-huang-rang-gai-suan"],"BV1G2cJeTELe","酸性土壤条件下水稻铝毒",
 "pH 低于大约 5.5，铝溶出来咬根尖：褐、秃、少白尖。地上才发僵。",
 "Below about pH 5.5, aluminium dissolves and bites root tips: brown, bald, few white tips. Then the top stalls.",
 "南方红黄壤、茶园、连年铵态氮的粮田常见。茶叶耐酸，也不是越酸越好。",
 "Southern red-yellow earth, tea, and ammonium-N grain fields show it. Tea likes acid — not ever-more-acid.",
 "缺肥根还在、只是细；铝毒是尖被咬掉。先洗根再谈肥。",
 "Hunger keeps a root, just thin; aluminium bites the tip off. Wash roots before you talk fertiliser.",
 "交换性铝是酸土里的牙。治本是改酸，不是再追氮。",
 "Exchangeable Al is the tooth in acid soil. The job is lime and organic matter, not more N."),
("zn","有效锌","Available Zn","养分",["que-xin","que-xin-yu-lin","yu-mi-miao-huang"],"BV1uCedeDEFn","植物缺锌症状与锌肥补充",
 "缺锌走新叶：脉间失绿、节间短、小叶簇生，玉米花白苗最典型。",
 "Zn hits new growth: interveinal yellow, short internodes, little leaves clustered. Maize white-bud is the type.",
 "高 pH、高磷会把门堵住。石灰性土更常见。",
 "High pH and high P crowd the door. Calcareous soils show it more.",
 "缺铁也是新叶黄脉绿，但不是花白苗那种缩节。药害来得快还扭曲。",
 "Iron also yellows new leaves with green veins, but not the white-bud shortening. Spray injury is fast and twisted.",
 "有效锌是用量很小的门。土施按年计，不要年年猛倒。",
 "Available Zn is a small door. Soil zinc is measured in years, not every trip."),
("b","有效硼","Available B","养分",["que-peng","que-peng-hua-er-bu-shi","hua-sheng-kong-jia"],"BV1mfYYe7EKH","植物缺素，硼元素",
 "缺硼花而不实、蕾铃掉、茎空心或裂，生长点萎缩。",
 "B lack: bloom without fruit, dropped buds, hollow or split stems, growing point stalled.",
 "沙土、干旱更容易缺。缺和毒只隔一层纸。",
 "Sand and drought show lack more. Deficiency and toxicity are a thin window.",
 "旱和盐也会落花。先看墒和土面，再谈硼。",
 "Drought and salt also drop flowers. Check moisture and the surface before boron.",
 "有效硼窗口很窄。没有化验不要土里一把倒。",
 "Available B is a narrow window. Don’t broadcast it without a test."),
("ec","EC（电导率）","EC","检测",["yan-jian","dashe-yanzhi","shui-fei-yi-ti-hua-ec"],"BV1zU4y1b7eg","土壤盐渍化",
 "EC 说土水有多咸。数字高，根喝水费劲。苗期更敏感。",
 "EC is how salty the soil water is. High numbers make roots work to drink. Seedlings are more sensitive.",
 "大棚、盐碱地、滴灌过浓，EC 最容易高。降低靠洗盐、控肥。",
 "Greenhouses, salt country and strong drip push EC up. Lower it by leaching and thinner feeds.",
 "pH 说酸甜，全盐说盐的总量。EC 是当季能喝到的咸。",
 "pH is sour/sweet; total salt is the pile. EC is the saltiness the root drinks now.",
 "EC 是咸度计。超了就是在腌根，不是缺水。",
 "EC is a salt meter. Too high pickles the root — it is not drought."),
("salt","全盐","Total soluble salt","检测",["yan-jian","fan-yan","bin-hai-yan-tu"],"BV1Cs4y1i7gU","地理小知识——土壤盐渍化",
 "土里可溶盐一共有多少。和 EC 一起看盐害。",
 "How much soluble salt is in the soil. Read it with EC.",
 "滨海、干旱灌区、大棚底肥拍胸脯，全盐容易高。",
 "Coast, dry irrigated country, and heavy greenhouse base dressings push it up.",
 "碱害看 pH 和钠。盐害可以 pH 并不高。见白霜不要一律石膏。",
 "Alkali is pH and sodium. Salt injury can sit near pH 7. Don’t gypsum every white crust.",
 "全盐是盐的总量。咸和涩不是一回事。",
 "Total salt is the pile. Salty and soapy are different jobs."),
("bulk","容重","Bulk density","检测",["ban-jie","li-di-ceng","ji-ya-che-zhe"],"BV1kB4y1y7Rh","有效打破犁底层可以助作物防涝抗旱",
 "同样体积的土有多重。耕层过大说明板结。",
 "How heavy a given volume of soil is. High in the tilled layer means compaction.",
 "车辙、湿耕、年年旋耕会把容重抬上去。有机质能慢慢降。",
 "Wheelings, tilling wet, and yearly rotavating lift it. Organic matter lowers it slowly.",
 "孔隙度是反面：容重高，孔隙就少。不是两个无关的词。",
 "Porosity is the other face: high bulk density, few pores. Not two unrelated words.",
 "容重是紧不紧的尺子。锄不动要问它，不要先问缺肥。",
 "Bulk density is the tightness ruler. A hoe that will not bite asks this before hunger."),
("test","测土配方","Test-based fertiliser","检测",["ce-tu-bao-gao","ce-tu-qu-yang","shi-fei-tiao-tu-rang"],"BV13E421M7Ly","测土配方，科学施肥",
 "先化验土，再决定施什么、施多少。取样错了，后面全错。",
 "Test first, then decide what and how much. A bad sample poisons every later decision.",
 "多点混合耕作层。阅读顺序：pH、有机质、盐分，再氮磷钾。",
 "Mix many cores of the tilled layer. Read pH, OM, salt, then NPK.",
 "看叶片能猜，不能代替这四个字。邻县袋子不是配方。",
 "Leaves can guess; they cannot replace a test. A neighbour’s bag is not a formula.",
 "测土配方是方法，不是一张万能处方。",
 "Test-based fertiliser is a method, not a universal recipe."),
("saline","盐碱","Saline-alkali","障碍",["yan-jian","su-da-yan-jian","xi-yan-pai-shui"],"BV1gL4y1u718","盐碱地，如何形成的？",
 "盐是咸，碱是涩。都能让苗出不来、叶焦边。白霜是盐的场面，肥皂水感是碱的场面。",
 "Salt is salty; alkali is soapy. Both stop emergence and scorch margins. White frost is salt; a soapy feel is alkali.",
 "干旱灌区、滨海、大棚盆里，盐碱最常见。咸看 EC，涩看 pH 和钠。",
 "Dry irrigated country, the coast, and greenhouse bowls show it. Salt is EC; alkali is pH and sodium.",
 "缺钾也焦边，但土面不一定白。旱了土干，咸了常有白霜还湿着蔫。",
 "K also scorches margins without a white surface. Drought is dry; salt often has frost and still wilts when wet.",
 "盐碱是一类障碍的总名。具体是盐还是碱，要拆开看。",
 "Saline-alkali is a family name. Split salt from alkali before you treat."),
("acid","酸化","Acidification","障碍",["suan-hua","sheng-li-suan-xing-fei","cha-yuan-guo-suan"],"BV1jT6TYXEjx","如何调理土壤酸化问题？",
 "土越种越酸。根被铝咬，苗发僵，有时浇水冒锈水。",
 "The soil sours over years. Aluminium bites roots, seedlings stall, water may run rusty.",
 "铵态氮、淋溶、有机质薄，账越记越酸。茶叶耐酸，粮田不是。",
 "Ammonium-N, leaching and thin OM add to the bill. Tea likes acid; grain fields do not.",
 "缺肥是根还在；酸化常先伤根尖。茶园过酸和粮田酸化不是同一篇文章。",
 "Hunger keeps a root; acidification bites the tip first. Tea-too-acid and grain acidification are different pages.",
 "酸化是 pH 往下走这件事的名字。用量看酸化知识条。",
 "Acidification is the name of pH walking down. Rates live on the acid handbook page."),
("compaction","板结 / 犁底层","Compaction / plough pan","障碍",["ban-jie","li-di-ceng","xuan-geng-bian-qian"],"BV1po4y1W7Fv","农田土壤板结的原因（二）",
 "锄不动、雨后积水、根横走。旋耕层下面压出的硬盖叫犁底层。",
 "A hoe that will not bite, ponding, sideways roots. The hard lid under the rotavator layer is a plough pan.",
 "湿耕、车碾、年年只旋不松，硬盖越来越浅。有机质是胶水。",
 "Tilling wet, wheelings, and rotavating without subsoiling iron a shallow lid. OM is the glue.",
 "干旱硬土浇水还能化；犁底层是下面一层发亮的盖，水过不去。",
 "Dry hard soil melts when watered; a pan is a shiny lid underneath that water cannot cross.",
 "板结是路封了。深松是修路，不是当年的肥。",
 "Compaction is a closed road. Subsoiling is roadwork, not this season’s fertiliser."),
("mg","交换性镁","Exchangeable Mg","养分",["que-mei","yang-fen-kang-kang","ce-tu-bao-gao"],"BV1mHaMekEkU","作物缺镁的症状及解决方法",
 "缺镁走老叶：脉间黄、叶脉还绿，从下部开始。不要当成缺铁。",
 "Mg hits old leaves: yellow between green veins, from the bottom up. That is not iron.",
 "镁在叶绿素里。钾太高会把镁挤掉。沙土、高钾菜地常见。",
 "Magnesium sits in chlorophyll. High K crowds it out. Sand and high-K vegetable ground show it.",
 "缺铁走新叶，缺镁走老叶。叶位一错，肥就下错。",
 "Iron is new leaves; magnesium is old leaves. Wrong leaf position, wrong bag.",
 "交换性镁是土能交出的镁。这项是指标，不是叶面肥商品名。",
 "Exchangeable Mg is what the soil can hand over. A lab number, not a foliar brand."),
("fe","有效铁","Available Fe","养分",["que-tie","shi-hui-xing-tu","pu-tao-shi-hui-tu-que-tie"],"BV1cN4y1g742","叶片发黄，叶脉深绿，缺铁or缺镁？",
 "缺铁走新叶：黄、叶脉还绿，顶端更明显。老叶相对还绿。",
 "Fe hits new leaves: yellow with green veins, worst at the tip. Old leaves stay greener.",
 "高 pH 把铁锁住。土里有铁，根吃不到。石灰性土、葡萄、柑橘常见。",
 "High pH locks iron. The soil has iron; the root cannot eat it. Calcareous soils, grapes and citrus show it.",
 "缺氮老叶先黄；缺硫新老一起黄；缺铁只黄新叶且脉绿。",
 "N yellows old leaves first; S yellows new and old; Fe yellows only new leaves with green veins.",
 "有效铁是根能吃到的铁。高 pH 土猛撒硫酸亚铁，当季常常吃不进。",
 "Available Fe is iron the root can eat. Dumping ferrous sulphate on high-pH soil often fails this season."),
("mn","有效锰","Available Mn","养分",["que-meng","que-tie","ce-tu-bao-gao"],"BV1z1eoeMEHR","植物缺素的症状，缺锰的症状与锰肥补充",
 "缺锰走新叶脉间失绿，常带褐斑或灰白小点。小麦上更常见。",
 "Mn yellows new leaves between veins, often with brown or grey specks. Wheat shows it clearly.",
 "过酸或过碱都会乱。有机质很高的石灰性土有时也锁锰。",
 "Too acid or too alkaline both scramble it. High-organic calcareous soils can lock it too.",
 "缺铁较少褐斑；缺锰常有小褐点。先看 pH，不要混成一瓶微量元素猛喷。",
 "Iron rarely speckles; manganese often does. Read pH; don’t tank-mix a micronutrient blast.",
 "有效锰是新叶上的锰。这项是指标，先改极端 pH。",
 "Available Mn is manganese on new leaves. A lab number — fix extreme pH first."),
("s","有效硫","Available S","养分",["que-liu","que-dan","huang-ye-jian-bie"],"BV1544tzXEL4","植物缺各类元素判断与补充方法",
 "缺硫整株偏黄，新叶也黄，和缺氮只黄老叶相反。",
 "S pales the whole plant, including new leaves — the opposite of nitrogen’s old-leaf yellow.",
 "硫不容易从老叶搬到新叶。沙土、长期只施尿素更容易显。",
 "Sulphur does not move from old to new leaves. Sand and years of urea-only show it more.",
 "缺氮老叶先黄、新叶还绿；缺硫新叶跟着黄。叶位是分水岭。",
 "N yellows old leaves while new stay greener; S takes the new leaves with it. Leaf position is the split.",
 "有效硫是当季能用的硫。尿素本身不含硫。",
 "Available S is sulphur the crop can use now. Urea itself has none."),
("cu","有效铜","Available Cu","养分",["que-tong","ye-cai-xiao-xing-yuan-su","ce-tu-bao-gao"],"BV118411T7F1","农作物缺素图谱大全",
 "缺铜叶尖发白卷曲，穗不实、结实差。新叶先出事。",
 "Cu bleaches and curls leaf tips; ears set poorly. New leaves go first.",
 "有机质很高的沙土、过酸过碱都可能缺。窗口也不宽。",
 "Very organic sands, and soils too acid or too alkaline, can run short. The toxic window is not wide either.",
 "病害穗枯常有病斑和湿度；缺铜更干净地白尖、结实差。先看化验再打药。",
 "Disease on ears brings lesions and humidity; Cu is cleaner white tips and poor set. Test before you spray a fungicide.",
 "有效铜是花和穗要用的铜。没有化验不要土里猛倒。",
 "Available Cu is copper for flowers and ears. Don’t dump it without a test."),
("mo","有效钼","Available Mo","养分",["que-mu","suan-hua","ce-tu-bao-gao"],"BV1YNhueJEBd","钼肥的重要性",
 "缺钼豆科叶片畸形发黄，固氮差、植株瘦。新叶皱缩。",
 "Mo: legume leaves distort and yellow; nodulation poor; plants thin. New leaves crinkle.",
 "过酸土钼被锁。豆科最显。先问 pH，再问钼。",
 "Too-acid soil locks molybdenum. Legumes show it. Ask pH before Mo.",
 "缺氮是匀黄、根瘤还在；缺钼是固氮先垮、叶形不对。不要豆叶黄了就猛氮。",
 "N lack is even yellow with nodules still there; Mo drops fixation and distorts the leaf. Don’t pour N on yellow beans first.",
 "有效钼是微量中的微量。加倍会出事。",
 "Available Mo is a trace among traces. Doubling hurts."),
("porosity","孔隙度","Porosity","基础",["tu-rang-tuan-ju-ti","ban-jie","you-ji-zhi"],"BV1su4y1f73T","堆肥后土太黏，怎么办？",
 "土里空气和水走的路。孔隙少，根闷、雨后积水、锄下去发亮。",
 "The roads air and water take. Few pores: roots smother, water ponds, the hoe shines.",
 "团粒多则孔隙多。压实、湿耕、有机质薄，路就封。",
 "Crumbs make pores. Compaction, wet tillage and thin OM close the roads.",
 "容重是重量，孔隙度是空着的比例。一个高了另一个就低。",
 "Bulk density is weight; porosity is empty space. When one rises the other falls.",
 "孔隙度是呼吸的路。改它靠结构，不靠当季氮。",
 "Porosity is the breathing road. You change it with structure, not in-season nitrogen."),
("fc","田间持水量","Field capacity","基础",["sha-tu-lou-fei","lao-hai","nian-tu-nan-geng"],"BV1kZfsBdEBc","测土配方施肥技术",
 "排干重力水之后，土还能握住的水。沙土握得少，黏土握得多但未必能给根。",
 "Water the soil still holds after gravity has drained. Sand holds little; clay holds much but may not give it to the root.",
 "质地和有机质决定它。低于这个数苗旱，长期高于它根闷。",
 "Texture and OM set it. Below it the crop dries; stuck above it, roots smother.",
 "涝害是水赶走了气；干旱是水低于能握住的量。田间持水量是中间那条线。",
 "Waterlog is water pushing air out; drought is water below what the soil can hold. Field capacity is the line between.",
 "田间持水量是土的水杯刻度。浇水浇到过线就是涝。",
 "Field capacity is the cup mark. Irrigating past it is waterlog."),
("gley","潜育化","Gleying","障碍",["qian-yu-tian","xiu-shui-tian","yan-jiang-qi-hou-tu"],"BV1w24y1s7V4","青岗泥，冷浸田",
 "长期渍水，土发青灰、有锈斑，摸着冷。水稻上叫冷浸田这一类。",
 "Long waterlogging: blue-grey soil, rust mottles, cold to the touch. In rice, the cold-soaked fields.",
 "山垄低洼、沿江湿地、排水不畅。亚铁、锰起来，根不爱往下。",
 "Hollows, riverside wetlands, poor drainage. Ferrous iron and manganese rise; roots dislike going down.",
 "普通涝害是一场雨；潜育化是长期的房间就是湿的。锈水田是它的近亲。",
 "A flood is one rain; gleying is a room that stays wet. Rusty-water paddies are cousins.",
 "潜育化是土长期泡在水里变成的脸色。先排水，再谈肥。",
 "Gleying is the complexion of soil that lives underwater. Drain first, then talk fertiliser."),
("replant","连作障碍","Replant trouble","障碍",["lian-zuo","da-peng-lian-zuo-zong-he","cao-mei-lian-zuo"],"BV1Xo4y1H7W5","土壤连作障碍的定义及危害",
 "同一茬越种越差，点片死棵，邻地轮作的却好。根上可能有结或褐腐。",
 "The same crop gets worse; patch death while a rotated neighbour is fine. Knots or brown rot on roots.",
 "病菌、线虫、盐和偏肥熬在一口锅里。棚里更明显。",
 "Pathogens, nematodes, salt and lopsided fertiliser stew in one pot. Houses show it faster.",
 "单纯缺肥是整片匀；连作是点片、越种越重。先看根，再看盐。",
 "Hunger is even across a plot; replant is patchy and worse each year. Read the root, then salt.",
 "连作障碍是重茬这件事的名字。菌剂代替不了换科轮作。",
 "Replant trouble is the name of growing the same family again. A microbe bag is not a rotation."),
]

GROUP_PROBLEM = {
    "基础": "其他",
    "养分": "缺素",
    "障碍": "其他",
    "检测": "其他",
}
PROBLEM_OVERRIDE = {
    "saline": "盐碱",
    "acid": "酸化",
    "compaction": "板结",
    "gley": "涝害",
    "replant": "连作障碍",
    "om": "有机质低",
}


def pad_zh(see: str, why: str, mix: str, word: str) -> str:
    raw = (
        f"{see.rstrip('。')}。"
        f"你到地里先对这一条：{why.rstrip('。')}。"
        f"容易认错的是：{mix.rstrip('。')}。"
        f"{word.rstrip('。')}。"
    )
    import re
    han = lambda s: len(re.findall(r"[\u4e00-\u9fff]", s))
    n = han(raw)
    if n < 120:
        raw += "邻垄要是更绿，把两处的叶子、根和土面摆一起看。对不上就先停手。"
    if han(raw) > 220:
        raw = raw[:220]  # not by chars; trim later
    # trim by han
    if han(raw) > 220:
        chars = []
        c = 0
        for ch in raw:
            chars.append(ch)
            if "\u4e00" <= ch <= "\u9fff":
                c += 1
                if c >= 218:
                    break
        raw = "".join(chars).rstrip("，、；") + "。"
    return raw


def pad_en(see_en: str, why_en: str, mix_en: str, word_en: str) -> str:
    return (
        f"{see_en.rstrip('.')} In the field: {why_en.rstrip('.')} "
        f"Easy to mix up: {mix_en.rstrip('.')} {word_en.rstrip('.')}."
    )


def emit_one(row: tuple) -> str:
    (id_, name, name_en, group, related, bvid, vtitle,
     see, see_en, why, why_en, mix, mix_en, word, word_en) = row
    problem = PROBLEM_OVERRIDE.get(id_, GROUP_PROBLEM[group])
    long_zh = pad_zh(see, why, mix, word)
    long_en = pad_en(see_en, why_en, mix_en, word_en)
    photos = f"""[
      {{ src: "/images/wiki/{id_}.jpg", alt: {js(name + " 田间对照")}, caption: {js("示意图，不能单凭此图下肥。")} }},
      {{ src: "/images/wiki/{id_}-2.jpg", alt: {js(name + " 特写")}, caption: {js("特写对照，请以自家地为准。")} }},
    ]"""
    related_js = "[" + ", ".join(js(s) for s in related) + "]"
    confuse_zh = f"""[
      {{ lookalike: {js(mix.split("。")[0][:24] or "相近的词")}, difference: {js(mix)}, photoHint: {js("把两张化验单或两种场面对照着看。")} }},
      {{ lookalike: {js("只看叶子下肥")}, difference: {js(word + " 叶子只是线索，对不上就测，不要猜。")}, photoHint: {js("化验单和植株放一起看。")} }},
    ]"""
    confuse_en = f"""[
      {{ lookalike: {js(mix_en.split(".")[0][:40] or "A nearby word")}, difference: {js(mix_en)}, photoHint: {js("Put two sheets or two scenes next to each other.")} }},
      {{ lookalike: "Guessing from leaves alone", difference: {js(word_en + " Leaves are clues. If they disagree, test.")}, photoHint: "Sheet and plant together." }},
    ]"""
    ind2_zh = "有机质" if id_ == "ph" else "pH"
    ind2_en = "Organic matter" if id_ == "ph" else "pH"
    return f"""  {js(id_)}: {{
    id: {js(id_)},
    relatedSlugs: {related_js},
    bvid: {js(bvid)},
    videoTitle: {js(vtitle)},
    problem: {js(problem)},
    group: {js(group)},
    photos: {photos},
    zh: {{
      title: {js(name)},
      subtitle: {js(word)},
      summary: {js(word)},
      appearance: {js(see)},
      conditions: {js(why)},
      commonCrops: {js("粮、菜、果都可能碰到。按自家作物读化验单，别抄邻县。")},
      fieldCheck: {js("你到地里先对这一条：" + see + " 对不上就测，别先倒肥。")},
      longform: [{js(long_zh)}],
      confuse: {confuse_zh},
      plainExplain: {js(word + " " + why)},
      natural: [{js(why)}, {js("母质、降雨和质地会改这个数的底子。")}],
      human: [{js("只抄邻县袋子，不问自家化验单。")}, {js("场面和数字对不上还猛追肥。")}],
      steps: [
        {js("先在化验单上找到这个词，再下地对照叶子、根和土面。")},
        {js(see)},
        {js("用量看对应的明白纸、测土和当地农技站，宁少勿多。化验词不直接给亩用量。")},
      ],
      dosage: [{{ name: {js("这条只讲化验单上的词")}, range: {js("用量去明白纸里看")}, note: {js("按测土、按当地农技站和包装说明，宁少勿多。具体袋子数看相关明白纸。")} }}],
      dontDo: [{js("不要把化验词当成处方抄亩用量。")}, {js("叶子和化验单对不上时不要先倒肥。")}, {js(mix)}],
      whenToTest: {js("读不懂这个词、或准备改土施肥前：0～20 厘米多点混合。先读 pH、有机质、盐分，再读这一项。")},
      prevention: [{js("有机质、排水和轮作是公共底子。")}, {js("先认这个词再下肥。")}, {js("改完隔一季再测，不要连年加码。")}],
      indicators: [
        {{ name: {js(name)}, meaning: {js(word)}, typical: {js("按当地实验室分级，不要跨省死套。")} }},
        {{ name: {js(ind2_zh)}, meaning: {js("酸碱尺子，很多微量元素先看它。" if ind2_zh=="pH" else "土里的肉。肉薄了，别的数字也站不稳。")}, typical: {js("多数粮菜 6.0～7.5" if ind2_zh=="pH" else "慢慢培，不要指望一季翻身")} }},
      ],
    }},
    en: {{
      title: {js(name_en)},
      subtitle: {js(word_en)},
      summary: {js(word_en)},
      appearance: {js(see_en)},
      conditions: {js(why_en)},
      commonCrops: {js("Grain, vegetables and fruit can all meet this word. Read the sheet with your own crop.")},
      fieldCheck: {js("In the field first: " + see_en + " If it does not fit, test before you pour anything.")},
      longform: [{js(long_en)}],
      confuse: {confuse_en},
      plainExplain: {js(word_en + " " + why_en)},
      natural: [{js(why_en)}, {js("Parent material, rain and texture set the floor of the number.")}],
      human: [{js("Copying a neighbour’s bags without your own sheet.")}, {js("Chasing a mismatch with more fertiliser.")}],
      steps: [
        {js("Find the word on the sheet, then match leaves, roots and the soil surface.")},
        {js(see_en)},
        {js("Rates live on the matching field note, a soil test and local extension. Better too little. A lab word is not a mu rate.")},
      ],
      dosage: [{{ name: {js("This page names the lab word")}, range: {js("Rates live in Field notes")}, note: {js("Follow a soil test, local extension and the label. Bag counts live on the related field notes.")} }}],
      dontDo: [{js("Don’t copy a mu rate out of a lab-word page.")}, {js("Don’t pour fertiliser when the leaf and the sheet disagree.")}, {js(mix_en)}],
      whenToTest: {js("When you cannot read this word, or before you amend: 0–20 cm, several spots mixed. Read pH, organic matter and salt first, then this column.")},
      prevention: [{js("Organic matter, drainage and rotation are the common floor.")}, {js("Name the word before you feed.")}, {js("Retest next season. Don’t stack the same amendment.")}],
      indicators: [
        {{ name: {js(name_en)}, meaning: {js(word_en)}, typical: {js("Use the local lab’s classes. Don’t paste another province’s table.")} }},
        {{ name: {js(ind2_en)}, meaning: {js("The acid–alkaline ruler. Many micronutrients wait on it." if ind2_en=="pH" else "The soil’s meat. Thin meat makes other numbers wobble.")}, typical: {js("Most grain 6.0–7.5" if ind2_en=="pH" else "Slow work — not a one-season flip")} }},
      ],
    }},
  }}"""


def main() -> None:
    assert len(ROWS) == 32, len(ROWS)
    ids = [r[0] for r in ROWS]
    assert len(set(ids)) == 32
    bvids_new = [r[5] for r in ROWS if r[0] in {"mg","fe","mn","s","cu","mo","porosity","fc","gley","replant"}]
    assert len(set(bvids_new)) == 10, bvids_new
    body = ",\n".join(emit_one(r) for r in ROWS)
    text = f"""import type {{ Article, ArticlePhoto }} from "@/lib/knowledge/types";
import {{ ARTICLE_REVIEWER, ARTICLE_UPDATED_AT }} from "@/lib/constants";

export type WikiPack = {{
  id: string;
  relatedSlugs: string[];
  bvid: string;
  videoTitle: string;
  problem: string;
  group: string;
  photos: ArticlePhoto[];
  zh: WikiCopy;
  en: WikiCopy;
}};

export type WikiCopy = {{
  title: string;
  subtitle: string;
  summary: string;
  appearance: string;
  conditions: string;
  commonCrops: string;
  fieldCheck: string;
  longform: string[];
  confuse: {{ lookalike: string; difference: string; photoHint: string }}[];
  plainExplain: string;
  natural: string[];
  human: string[];
  steps: string[];
  dosage: {{ name: string; range: string; note: string }}[];
  dontDo: string[];
  whenToTest: string;
  prevention: string[];
  indicators: {{ name: string; meaning: string; typical: string }}[];
}};

export const WIKI_GUIDES: Record<string, WikiPack> = {{
{body},
}};

export function wikiToArticle(id: string, lang: "zh" | "en"): Article | undefined {{
  const g = WIKI_GUIDES[id];
  if (!g) return undefined;
  const c = lang === "en" ? g.en : g.zh;
  const url = `https://www.bilibili.com/video/${{g.bvid}}/`;
  return {{
    slug: g.id,
    title: c.title,
    subtitle: c.subtitle,
    summary: c.summary,
    crops: ["全国"],
    problems: [g.problem],
    regions: ["全国"],
    seasons: ["全年"],
    tags: [c.title],
    coverCrop: null,
    coverType: "soil",
    photos: g.photos,
    phenomenon: {{
      appearance: c.appearance,
      conditions: c.conditions,
      commonCrops: c.commonCrops,
    }},
    confuse: c.confuse,
    causes: {{
      natural: c.natural,
      human: c.human,
      plainExplain: c.plainExplain,
    }},
    solutions: {{
      steps: c.steps,
      videos: [{{ platform: "bilibili", title: g.videoTitle, url }}],
    }},
    dosage: c.dosage,
    prevention: c.prevention,
    indicators: c.indicators,
    relatedSlugs: g.relatedSlugs,
    updatedAt: ARTICLE_UPDATED_AT,
    reviewer: ARTICLE_REVIEWER,
    fieldCheck: c.fieldCheck,
    dontDo: c.dontDo,
    whenToTest: c.whenToTest,
    longform: c.longform,
  }};
}}
"""
    # fix nested f-string for url - I used doubled braces incorrectly inside the output
    text = text.replace(
        "const url = `https://www.bilibili.com/video/${{g.bvid}}/`;",
        "const url = `https://www.bilibili.com/video/${g.bvid}/`;",
    )
    OUT.write_text(text)
    print("wrote", len(ROWS), "guides", OUT, "bytes", OUT.stat().st_size)


if __name__ == "__main__":
    main()
