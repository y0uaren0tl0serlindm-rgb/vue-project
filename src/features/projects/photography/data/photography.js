export const heroStats = [
{ val: '8', label: '出行次数' },
{ val: '12', label: '问题记录' },
{ val: '6', label: '物种存档' },
{ val: '2025', label: '开始年份' },
]

// 拍摄日志
export const shootingLogs = [
    {
    id: 1,
    date: '2025-08-20',
    weather: '☀️ 晴',
    location: '山路沿途',
    subjects: ['雨后昆虫', '植物'],
    note: '雨后出行，发现很多昆虫在叶片上静止，是难得的拍摄窗口。水珠配合昆虫的画面出乎意料的好。但湿度高镜片起雾问题需要解决。',
    keepers: 11,
    duration: '4h',
    },
    {
    id: 2,
    date: '2026-04-11',
    weather: '🌧️ 小雨后',
    location: '乡下小公路',
    subjects: ['昆虫', '微距'],
    note: '第一次专门去拍昆虫,发现手持摄影拍摄昆虫没有想象的那么简单,三个原因: 1.手持 2.环境风 3.近对焦 ',
    keepers: 2,
    duration: '3h',
    },
    {
    id: 3,
    date: '2026-04-12',
    weather: '🌤️ 多云',
    location: '室内',
    subjects: ['小物件', '微距'],
    note: '使用三脚架结合105mm定焦,拍摄室内的小物品,一颗小冰糖、枸杞、大理石台上水珠等,打光有一定影响如果光线好可以使用更小光圈有更大景深可以更好地拍摄后续可能需要买个补光灯',
    keepers: 5,
    duration: '2h',
    },
    {
    id: 4,
    date: '2026-04-18',
    weather: '🌧️ 小雨后',
    location: '乡下小公路',
    subjects: ['种子', '微距'],
    note: '寻找昆虫拍摄，没修的路段在下雨天后很难走，即使是雨后蝴蝶依旧行动活跃，后续可能需要刚停就出门',
    keepers: 5,
    duration: '1h',
    },
    {
    id: 5,
    date: '2026-04-18',
    weather: '🌧️ 小雨后',
    location: '室内',
    subjects: ['种子', '微距'],
    note: '使用三脚架,配合105mm定焦,延时摄影,拍摄室内种子萌发过程,光影会变化,后续拍摄过程可能需要稳定光源，这样拍摄中不需要调整相机设置',
    keepers: 5,
    duration: '2h',
    },
    {
    id: 6,
    date: '2026-04-19',
    weather: '☀️ 晴',
    location: '乡下小公路',
    subjects: ['微距', '蝴蝶'],
    note: '寻找昆虫拍摄，尝试拍摄逆光花瓣，即从花瓣下方向上拍摄，结果难以拍摄出阳光射透花瓣的感觉，且晴天的话阳光大无法看清屏幕无法正常对焦',
    keepers: 5,
    duration: '2.5h',
    },
    {
    id: 7,
    date: '2026-04-19',
    weather: '☀️ 晴',
    location: '室内',
    subjects: ['种子', '微距'],
    note: '使用三脚架,配合105mm定焦,延时摄影,拍摄室内种子萌发过程,不知道是柠檬茶喝了还是光照影响,反正晚上睡觉拍摄有点影响睡眠',
    keepers: 5,
    duration: '8h',
    },
]


export const issues = [
{
    id: 1,
    title: '拍摄街头、风光难以拍出满意成片',
    status: 'unsolved',
    problem: '审美',
    attempt: '输出、提供审美',
    solution: '',
    tags: ['审美局限', '构图', '色彩'],
    },
{
    id: 2,
    title: '拍摄风中蝴蝶照片难以合成',
    status: 'unsolved',
    problem: '拍摄风中蝴蝶时,即使相机不动,连拍拍摄出的蝴蝶也容易不在照片同一位置产生形变合成后会有重影或者模糊',
    attempt: '',
    solution: '',
    tags: ['手持', '环境影响', '对焦'],
},
{
    id: 3,
    title: '手持摄影焦点变化连拍容易抖动',
    status: 'unsolved',
    problem: '手持摄影,即使在等待风过去的瞬间,连拍拍摄出的照片依旧会有一定位移,没法做到完全平稳',
    attempt: '夹紧手臂，放弃堆栈，降低快门时间',
    solution: null,
    tags: ['对焦', '追踪', '静态拍摄'],
},
{
    id: 4,
    title: '延迟摄影光源不稳定',
    status: 'unsolved',
    problem: '手持摄影,即使在等待风过去的瞬间,连拍拍摄出的照片依旧会有一定位移,没法做到完全平稳',
    attempt: '夹紧手臂，放弃堆栈，降低快门时间',
    solution: null,
    tags: ['对焦', '追踪', '静态拍摄'],
},
]

// 物种档案
export const species = [
{
    id: 1,
    icon: '🦋',
    //物种名称
    name: '玉斑凤蝶',

    latin: 'Papilionidae',
    //第一次拍摄时间
    firstSeen: '2026-04-12',
    //拍摄难点
    difficulty: '停歇时好拍，飞行中极难追焦',
    //特点
    note: '翅膀纹路细节丰富，停歇吸蜜时非常配合。顺光拍翅膀颜色最饱和。',
},
{
    id: 2,
    icon: '🦋',
    //物种名称
    name: '东方菜粉蝶',

    latin: 'Papilionidae',
    //第一次拍摄时间
    firstSeen: '2026-04-12',
    //拍摄难点
    difficulty: '停歇时好拍，飞行中极难追焦',
    //特点
    note: '',
},
{
    id: 3,
    icon: '❀',
    //物种名称
    name: '鬼针草',

    latin: 'Papilionidae',
    //第一次拍摄时间
    firstSeen: '2026-04-12',
    //拍摄难点
    difficulty: '',
    //特点
    note: '',
},
{
    id: 4,
    icon: '',
    //物种名称
    name: '八哥',

    latin: 'Papilionidae',
    //第一次拍摄时间
    firstSeen: '2026-05-01',
    //拍摄难点
    difficulty: '鸟类警惕性高，仅有105mm焦段镜头难以拍摄好的近景照片',
    //特点
    note: '头上有一撮毛像是刘海，保留出这个特点拍出的照片可能会有意思',
},
{
    id: 5,
    icon: '',
    //物种名称
    name: '跳甲',

    latin: 'Papilionidae',
    //第一次拍摄时间
    firstSeen: '2026-05-01',
    //拍摄难点
    difficulty: '虫子很小，所以距离极近，于是景深极浅，难以有前后全部完整的照片，只能完整一部分',
    //特点
    note: '通体黑色，在阳光照射下会有蓝色显现，每一寸甲壳都有颗颗白色或者蓝色颗粒',
},
]


//器材设备
export const gear = [
{
    icon: '📷',
    name: 'Nikon Z7 II',
    notes: [
    { type: 'good', text: '4500万像素裁切空间大，小型昆虫后期裁切后依然够用。' },
    { type: 'good', text: '双卡槽设计，拍摄时心理安全感强。' },
    { type: 'limit', text: '动物眼睛追踪对焦对快速运动的昆虫效果有限，飞行中对焦成功率低。' },
    { type: 'tip', text: '关闭 IBIS 在手持微距拍摄时反而有时更稳，避免 IBIS 与镜头 VR 相互干扰。' },
],
},
{
    icon: '🔭',
    name: 'Z 24-70mm f/4 S',
    notes: [
    { type: 'good', text: '24mm 端拍风景带前景昆虫，环境感强。' },
    { type: 'good', text: '成像锐利，色彩还原准确，是支老实的镜头。' },
    { type: 'limit', text: '最近对焦距离约 0.3m，拍 1cm 以下小型昆虫基本不够用。' },
    { type: 'limit', text: 'f/4 在树荫下光线不足时快门速度压力大，需要提高 ISO。' },
    { type: 'wishlist', text: '考虑补一支专用微距镜头，105mm f/2.8 左右焦段更适合昆虫。' },
    ],
},
{
icon: '🔭',
name: 'NIKKOR Z MC 105mm f/2.8 VR S',
notes: [
    { type: 'good', text: '1:1 等倍微距，拍小型昆虫终于够用，体长 5mm 以下的虫子也能填满画面。' },
    { type: 'good', text: 'f/2.8 大光圈在树荫等弱光环境下快门速度压力小很多，比 24-70mm f/4 明显改善。' },
    { type: 'good', text: '105mm 焦距工作距离约 30cm，不会因为太靠近昆虫而惊扰它。' },
    { type: 'limit', text: '等倍拍摄时景深极浅，f/2.8 下昆虫触角清晰时身体可能已经虚化，需要收光圈到 f/8 以上。' },
    { type: 'limit', text: '镜头较重，长时间手持拍摄容易疲劳，微距距离下抖动放大明显。' },
    { type: 'tip', text: '等倍微距建议用快门优先或手动模式，快门不低于 1/500s，宁可提高 ISO 也要保证快门速度。' },
    { type: 'tip', text: '对焦方式建议固定焦距后靠身体前后移动来精确对焦，比转对焦环更容易控制。' },
],
},
{
icon: '📐',
name: '科曼三脚架',
notes: [
    { type: 'good', text: '拍风景长曝光完全稳定，夜景城市题材必备。' },
    { type: 'good', text: '搭配微距拍摄静止昆虫（如清晨未活动的蜻蜓）时，稳定性远超手持。' },
    { type: 'limit', text: '昆虫拍摄移动频繁，三脚架架设耗时，动态场景基本用不上。' },
    { type: 'limit', text: '野外地形复杂时收展脚架不便，遇到好机会容易错过。' },
    { type: 'tip', text: '微距拍摄时配合快门线或 2 秒延迟快门使用，消除按快门时的震动。' },
    { type: 'tip', text: '雨后拍昆虫可以提前架好三脚架等待，此时昆虫行动慢，是三脚架发挥价值的场景。' },
],
},
{
icon: '📐',
name: 'V860Ⅲ闪光灯',
notes: [
    { type: 'good', text: '拍摄微距' },
    { type: 'good', text: '' },
    { type: 'limit', text: '目前只有一个等没法拍出体积感' },
    { type: 'limit', text: '离体打光不方便' },
    { type: 'tip', text: '微距拍摄时，极短时间的闪光能确保画面清晰' },
    { type: 'tip', text: '对于光线不足的场景，落日或者清晨，无法调高快门速度，闪光灯大显神威' },
],
},
]


//灵感和思考
export const thoughts = [
{
    id: 1,
    date: '2026-04-13',
    type: 'inspiration',
    content: '买相机的直接触发点是电影《白日梦想家》里的摄影师肖恩——他并非故事的主角,但故事围绕着如何找到他拿到底片展开,故事不断铺垫使其极富神秘色彩,后续在雪山上找到肖恩他在拍摄雪豹,他没有着急地按下快门拍下着价值千金的照片,而是就在那静静欣赏雪豹,直到它从镜头内溜走也没有按下快门。',
    tags: ['起源'],
},

]