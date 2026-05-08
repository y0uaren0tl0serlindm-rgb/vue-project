import db from './db.js'

const fragments = [
  {
    title: '姑妄言之',
    text: '我经过深思熟虑、反复权衡利弊、咨询了内心最理性的那一面之后，决定再睡五分钟。',
    category: 'misc',
  },
  {
    title: 'SHELL',
    text: '经过长达三十年的田野调查和参与式观察，我初步认为：我妈说得对。',
    category: 'shell',
  },
  {
    title: 'BOARD',
    text: '引脚、时钟、启动日志。很多问题从没有反应开始。',
    category: 'board',
  },
  {
    title: '雨后',
    text: '路边的叶子还湿着，虫子不急着走。',
    category: 'photo',
  },
  {
    title: '终端',
    text: '光标停在那里，好像它也在等我想明白。',
    category: 'shell',
  },
]

const insert = db.prepare(`
  INSERT INTO fragments (title, text, category)
  VALUES (@title, @text, @category)
`)

for (const item of fragments) {
  insert.run(item)
}

console.log('Seed completed.')