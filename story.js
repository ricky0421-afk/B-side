export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { song, artist } = req.body;
  if (!song) return res.status(400).json({ error: '请输入歌曲名称' });

  const prompt = `你是一位专业的音乐评论人和文化记者，擅长用深度、文学性的笔触讲述音乐背后的故事。

请为以下音乐写一篇深度背景报道：
歌曲/专辑：${song}${artist ? `\n艺术家：${artist}` : ''}

请用中文撰写，内容要求：
1. 首先用一段引言抓住读者（不加标题）
2. 创作背景：这首歌/专辑诞生于什么背景？艺术家当时处于怎样的人生阶段？
3. 幕后故事：录制过程、灵感来源、有趣的幕后细节
4. 歌词解读：重要歌词的隐喻或故事含义（如适用）
5. 时代意义：这首歌对当时的音乐或文化有什么影响？
6. 留存至今：为什么这首歌/专辑依然被人记住？

写作风格：像《滚石》杂志或《GQ》的深度音乐报道，有温度、有细节、有文学感。每个章节用 ## 开头的标题分隔。适当使用 > 引用重要的歌词或名言。重要信息用 **加粗**。

如果对这首歌不太了解，请如实说明，并基于你已知的信息提供有价值的内容。`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'anthropic-beta': 'interleaved-thinking-2025-05-14'
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 1500,
        tools: [{ type: 'web_search_20250305', name: 'web_search' }],
        messages: [{ role: 'user', content: prompt }]
      })
    });

    if (!response.ok) {
      const err = await response.text();
      return res.status(500).json({ error: 'API 错误: ' + err });
    }

    const data = await response.json();
    const textBlocks = data.content.filter(b => b.type === 'text');
    const text = textBlocks.map(b => b.text).join('\n');

    return res.status(200).json({ text });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
