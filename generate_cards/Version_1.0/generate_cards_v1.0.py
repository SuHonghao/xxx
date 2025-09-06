import pandas as pd

# 读取 Excel 文件
df = pd.read_excel("papers_v1.0.xlsx")   # 确保和脚本放在同一文件夹

html_cards = []

for _, row in df.iterrows():
    card = f"""
    <article class="cite-card">
      <a class="thumb" href="{row['link']}" target="_blank" rel="noopener">
        <img src="{row['image']}" alt="cover image" />
      </a>
      <div class="content">
        <h4 class="cite-title">
          <a href="{row['link']}" target="_blank" rel="noopener">{row['title']}</a>
        </h4>
        <p class="cite-brief">{row['abstract']}</p>
        <div class="tagbar" aria-label="tags">
          {''.join(f'<span class="tag">{tag.strip()}</span>' for tag in str(row['tags']).split(';'))}
        </div>
      </div>
    </article>
    """
    html_cards.append(card)

# 包装成完整网页
html_page = f"""
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8" />
  <title>card</title>
  <link rel="stylesheet" href="styles.css" />
</head>
<body>
  <section class="card-list">
    {"".join(html_cards)}
  </section>
</body>
</html>
"""

# 输出结果
with open("card_v1.0.html", "w", encoding="utf-8") as f:
    f.write(html_page)

print("✅ Done：card_v1.0.html")
