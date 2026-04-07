import re

with open('sinan_pair.html', encoding='utf-8') as f:
    content = f.read()

def replace_at(s, pos, old, new):
    idx = s.find(old, pos)
    if idx == -1:
        print(f"  NOT FOUND: {old!r} after pos {pos}")
        return s, False
    print(f"  FOUND at {idx}: {old!r} -> {new!r}")
    return s[:idx] + new + s[idx+len(old):], True

# Conduta section starts at ~83330 (where "Condutas adotadas" text is)
# Search backward from there for the section div
conduta_body_pos = content.find('Condutas adotadas e outros trabalhadores')
conduta_search_start = conduta_body_pos - 700

print("Fixing Conduta section:")
content, _ = replace_at(content, conduta_search_start, 'id="sec8"', 'id="sec10"')
content, _ = replace_at(content, conduta_search_start, '<div class="sec-num">8</div>', '<div class="sec-num">10</div>')

# Badge: search in wider range around conduta
print("Looking for badge around conduta:")
badge_area = content[conduta_search_start:conduta_body_pos+500]
print("badge matches:", re.findall(r'id="badge\d+"', badge_area))
# Find badge8 after conduta_search_start
content, _ = replace_at(content, conduta_search_start, 'id="badge8"', 'id="badge10"')

# Encerramento
enc_body_pos = content.find('Evolução do caso, CAT e observações')
# After prior changes, recalc
enc_search_start = enc_body_pos - 700

print("\nFixing Encerramento section:")
content, _ = replace_at(content, enc_search_start, 'id="sec9"', 'id="sec11"')
content, _ = replace_at(content, enc_search_start, '<div class="sec-num">9</div>', '<div class="sec-num">11</div>')
content, _ = replace_at(content, enc_search_start, 'id="badge9"', 'id="badge11"')

print("\nFinal section/badge IDs:")
print("  Sections:", re.findall(r'id="sec(\d+)"', content))
print("  Badges:", re.findall(r'id="badge(\d+)"', content))

with open('sinan_pair.html', 'w', encoding='utf-8') as f:
    f.write(content)
print("Saved!")
