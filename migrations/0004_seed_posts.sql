insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '南方水稻田苗发僵，浇水有时冒锈水',
  '湖南一季稻，秧苗矮、根尖发褐，邻居说是酸化。想问问要不要撒石灰，撒多少才不把土改过劲。',
  '酸化', '水稻', '长江中下游'
where not exists (select 1 from posts where title = '南方水稻田苗发僵，浇水有时冒锈水');

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '雨后土硬得像砖，苗戴帽出土',
  '河南麦田，下雨一包脓、天晴锄不动。根横着走，是板结还是下面有犁底层？',
  '板结', '小麦', '黄淮海'
where not exists (select 1 from posts where title = '雨后土硬得像砖，苗戴帽出土');

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '黄瓜新叶发黄叶脉还绿，老叶还好',
  '大棚黄瓜顶端新叶黄、叶脉绿。有人说缺氮，有人说缺铁。土是偏碱的。求鉴别。',
  '缺素', '设施蔬菜', '华北'
where not exists (select 1 from posts where title = '黄瓜新叶发黄叶脉还绿，老叶还好');

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '种肥贴着种子，出苗就烧、根尖发黑',
  '玉米穴播把复合肥和种子拌在一个窝，出苗不齐、叶子焦。已经浇过一次水。下一步停肥还是再补？',
  '肥害', '玉米', '东北'
where not exists (select 1 from posts where title = '种肥贴着种子，出苗就烧、根尖发黑');

insert into posts (user_id, display_name, title, body, problem_type, crop, region)
select 'system-seed', '平台农技员', '暴雨后地里有明水，白天蔫晚上缓',
  '苏南菜地积水两天，叶子白天打蔫晚上又能起来，根有点臭。是涝害还是缺肥？能不能马上追尿素？',
  '涝害', '蔬菜', '长江中下游'
where not exists (select 1 from posts where title = '暴雨后地里有明水，白天蔫晚上缓');
