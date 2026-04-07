import re
with open('sinan_pair.html', encoding='utf-8') as f:
    html = f.read()
ids = re.findall(r'id="sec\d+"', html)
print(ids)
