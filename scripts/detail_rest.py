"""Unique thickened copy for remaining articles. Imported by gen_article_detail.py."""
from detail_fast import U, S

def C(slug, look, when, plain, zh, en, elook, ewhen, eplain, steps, esteps, **opt):
    U(slug, look, when, plain, zh, en, elook, ewhen, eplain, steps, esteps, **opt)

# --- original handbook (except suan-hua) ---
C("yan-jian",
  "土面白粉或白霜，干了结皮；出苗慢、缺苗断垄；叶缘焦枯，像被开水烫过。浇小水有时更蔫，不像旱了浇完就缓。",
  "干旱蒸发大、地下水咸、大水漫灌后又旱。华北、西北、黄淮海和滨海。春季返盐最明显。",
  "根喝水靠浓度差。土太咸，水被盐抢走。盐害看 EC/全盐，碱害看 pH 和钠，两码事。没有排水，大水只是把盐赶到田边。",
  ["抓一把表土：干、白、有霜。再问浇水后是缓还是更蔫。旱了能缓，咸了小水有时更蔫。出苗花斑加焦边，先当盐的名片。",
   "咸是汤咸，涩是汤挂碗。氯化物盐土靠灌排洗；苏打碱土才考虑石膏。见白霜就撒石膏，药会吃错。",
   "有沟能排，才能洗。覆盖切断返盐电梯，耐盐作物先活苗。肥要淡，盐斑上不要再抓一把高盐复合肥。",
   "测 EC、pH、钠三项。没沟不要大水漫灌。先小面积，看新叶焦边还在不在。"],
  ["Grab the surface: dry, white, frosted. Ask whether a drink helps or wilts more. Drought eases; salt sometimes wilts more after a small watering. Patchy emergence plus scorch is salt’s name card.",
   "Salty soup and soapy soup are different medicines. Chloride soils want leaching with an outlet; soda alkali may want gypsum. Gypsum on every white crust is the wrong pill.",
   "No ditch, no leach. Mulch cuts the salt elevator. Salt-tolerant crops first. Keep fertiliser dilute; don’t throw high-salt compound on the crust.",
   "Measure EC, pH and sodium. Don’t flood without an outlet. Trial a patch and watch new leaf margins."],
  "White frost or powder on the surface, crust when dry, patchy emergence, leaf margins as if scalded. A small watering may wilt more.",
  "Dry evaporative districts, saline groundwater, flood-then-drought. North, northwest, Huang-Huai-Hai and the coast. Spring is loudest.",
  "Roots drink by a concentration gradient. Too much salt and the water is stolen. Salt is EC; alkali is pH and sodium. Flooding without drainage parks salt on the edge.",
  S("看土面白霜和出苗，不要先怪缺钾。","测 EC/全盐、pH 和钠，分清咸还是涩。","有排水再洗盐；覆盖减蒸发。","盐斑上停高盐肥，改淡、改薄。","选耐盐作物和品种保苗。","先小面积，看焦边是否还在扩大。"),
  S("Read frost and emergence before blaming potassium.","Test EC, pH and sodium — salt versus alkali.","Leach only with drainage; mulch against evaporation.","Stop high-salt fertiliser on crusts; go dilute.","Use salt-tolerant crops and cultivars.","Trial a patch; watch whether scorch still spreads."))

C("ban-jie",
  "锄头刨不动，土成硬块或硬盖。雨后表面积水，干了裂缝扯根。刨开看根横着走，下不去。苗矮、黄、午后萎蔫。",
  "黏土、年年浅旋、雨后进车、有机质低的地。全国都有，机耕道和车辙更重。",
  "土的房间塌了。水和根要走孔隙。旋耕只剪头发，下面形成犁底层。有机质是胶水，胶没了就板。深松是开路，不是年年翻生土。",
  ["锄不动、雨后积水、根横走，三件叠在一起才像板结。不要一板就怪缺肥。车辙里不出苗，是一条死土。",
   "年年旋十几厘米，下面被压成发亮的硬盖。雨点砸表土，干了成锅盖。有机质低的粉土，一碰就面、一下雨就浆。",
   "适墒才耕。隔年深松，刚过硬盖就停，大约 25～40 厘米这个量级，不是越深越好。配有机肥和覆盖，少在泥里开拖拉机。",
   "先小条试验深松。松完看新根是否往下。不要雨后马上进车，不要年年深翻把生土翻上来。"],
  ["Hard hoe, ponding after rain, roots turning sideways — that trio is compaction, not hunger. A tyre rut is a strip of dead soil.",
   "Rotary tillage every year cuts hair and irons a shiny pan underneath. Raindrops smash the surface into a lid. Low-organic powder soils turn to flour then slurry.",
   "Work at crumb-moist. Subsoil in alternate years, just through the pan, often 25–40 cm — not deeper-is-better. Organic matter and cover; stay off wet fields.",
   "Trial a strip. Watch whether new roots go down. Don’t drive in mud. Don’t invert raw subsoil every year."],
  "The hoe bounces. Clods or a hard cap. Water sits after rain; cracks tear roots when it dries. Roots run sideways.",
  "Clay, shallow rotary tillage, traffic after rain, low organic matter. Wheelings are worst.",
  "Pores are rooms. Rotary tillage is a haircut; a plough pan forms below. Organic matter is the glue. Subsoiling opens a path — it is not annual inversion.",
  S("刨到 20 厘米以下看硬盖，不要只旋表面。","适墒深松，刚过硬盖就停。","加腐熟有机肥，覆盖防雨点砸。","泥里不要进车，固定车道。","隔年松一次，不要年年翻生土。","松完看新根下不下，再谈肥。"),
  S("Dig below 20 cm for the pan; don’t only fluff the top.","Subsoil at crumb-moist, just through the pan.","Rotted organic matter and cover against raindrop smash.","Keep off mud; fix traffic lanes.","Loose in alternate years; don’t invert raw subsoil yearly.","Watch new roots go down before you fertilise."))
