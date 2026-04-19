"""
Debugging de preenchimento de campos AcroForm.

Para cada ficha:
  1. Extrai nomes de campos do .md (fonte autoritativa)
  2. Extrai nomes de campos do PDF real (via pypdf)
  3. Preenche o PDF com valor sentinela = nome do próprio campo
  4. Relê o PDF gerado e verifica quais campos receberam o valor
  5. Reporta discrepâncias

Uso:
  python debug_pdf_fields.py                     # todas as fichas
  python debug_pdf_fields.py acidente            # filtra por nome
"""

import re
import sys
import io
from pathlib import Path
from pypdf import PdfReader, PdfWriter

FICHAS_DIR = Path(__file__).parent / "fichas"

# Mapeamento ficha → (pdf, md)
FICHAS = {
    "acidente":   ("DRT_Acidente_Trabalho_editavel.pdf",          "DRT_Acidente_Trabalho_editavel.md"),
    "biologico":  ("DRT_Acidente_Trabalho_Biologico_editavel.pdf", "DRT_Acidente_Trabalho_Biologico_editavel.md"),
    "cancer":     ("DRT_CANCER_editavel.pdf",                      "DRT_CANCER_editavel.md"),
    "dermatoses": ("DRT_DERMATOSES_editavel.pdf",                  "DRT_DERMATOSES_editavel.md"),
    "lerdort":    ("DRT_LERDORT_editavel.pdf",                     "DRT_LERDORT_editavel.md"),
    "pair":       ("DRT_PAIR_editavel.pdf",                        "DRT_PAIR_editavel.md"),
    "pneumo":     ("DRT_Pneumoconioses_editavel.pdf",              "DRT_Pneumoconioses_editavel.md"),
    "transtornos":("DRT_TranstornosMentais_editavel.pdf",          "DRT_TranstornosMentais_editavel.md"),
    "intoxicacao":("Intoxicacao_Exogena_v5_editavel.pdf",          "Intoxicacao_Exogena_v5_editavel.md"),
    "voz":        ("disturbio_voz_editavel.pdf",                   "disturbio_voz_editavel.md"),
    "violencia":  ("violencia_editavel.pdf",                       "violencia_editavel.md"),
}

SENTINEL_PREFIX = "OK:"


def extrair_campos_md(md_path: Path) -> set[str]:
    """Extrai todos os nomes de campos AcroForm documentados no .md."""
    texto = md_path.read_text(encoding="utf-8")
    # Captura nomes dentro de backticks em linhas de tabela: | `nome_campo` |
    return set(re.findall(r"`([a-z][a-z0-9_]+)`", texto))


def extrair_campos_pdf(pdf_path: Path) -> set[str]:
    """Extrai todos os nomes de campos AcroForm presentes no PDF."""
    reader = PdfReader(str(pdf_path))
    fields = reader.get_fields() or {}
    return set(fields.keys())


def preencher_e_verificar(pdf_path: Path, campos_para_testar: set[str]) -> dict[str, bool]:
    """
    Preenche o PDF com valores sentinela e verifica quais campos foram preenchidos.
    Retorna {nome_campo: True se preenchido com sucesso}.
    """
    reader = PdfReader(str(pdf_path))
    writer = PdfWriter()
    writer.append(reader)

    # Monta dicionário sentinela: campo → "OK:<campo>"
    sentinelas = {c: f"{SENTINEL_PREFIX}{c}" for c in campos_para_testar}

    # Preenche todos de uma vez (page=None → todas as páginas)
    try:
        writer.update_page_form_field_values(None, sentinelas, auto_regenerate=False)
    except Exception as e:
        print(f"  [AVISO] Erro ao preencher campos: {e}")

    # Salva em memória e relê
    buf = io.BytesIO()
    writer.write(buf)
    buf.seek(0)

    reader2 = PdfReader(buf)
    campos_preenchidos = reader2.get_fields() or {}

    resultado = {}
    for nome, sentinela in sentinelas.items():
        campo_obj = campos_preenchidos.get(nome)
        if campo_obj is None:
            resultado[nome] = False  # campo não existe no PDF
        else:
            valor = campo_obj.get("/V", "")
            # Para checkboxes/radio o valor pode ser /Off ou /Yes etc — só verifica texto
            resultado[nome] = isinstance(valor, str) and valor == sentinela
    return resultado


def analisar_ficha(chave: str, pdf_nome: str, md_nome: str) -> None:
    pdf_path = FICHAS_DIR / pdf_nome
    md_path  = FICHAS_DIR / md_nome

    if not pdf_path.exists():
        print(f"[ERRO] PDF não encontrado: {pdf_path}")
        return
    if not md_path.exists():
        print(f"[ERRO] MD não encontrado: {md_path}")
        return

    campos_md  = extrair_campos_md(md_path)
    campos_pdf = extrair_campos_pdf(pdf_path)

    # Campos do MD que são apenas nomes de campos (não palavras genéricas curtas)
    # Filtra falsos positivos: palavras do markdown que aparecem em backtick mas não são campos
    campos_md_filtrados = {c for c in campos_md if "_" in c}

    # --- Análise estática (sem preencher) ---
    so_no_md  = campos_md_filtrados - campos_pdf   # documentado mas ausente no PDF
    so_no_pdf = campos_pdf - campos_md_filtrados   # existe no PDF mas não documentado no MD

    # --- Teste de preenchimento (apenas campos que existem no PDF E estão no MD) ---
    campos_texto_md = campos_md_filtrados & campos_pdf
    resultado_preench = preencher_e_verificar(pdf_path, campos_texto_md)

    nao_preenchidos = [c for c, ok in resultado_preench.items() if not ok]
    preenchidos_ok  = [c for c, ok in resultado_preench.items() if ok]

    # --- Relatório ---
    sep = "─" * 60
    print(f"\n{sep}")
    print(f"  FICHA: {chave.upper()}  ({pdf_nome})")
    print(sep)
    print(f"  Campos no MD (com _):  {len(campos_md_filtrados)}")
    print(f"  Campos no PDF real:    {len(campos_pdf)}")
    print(f"  Testados (interseção): {len(campos_texto_md)}")

    if so_no_md:
        print(f"\n  ⚠  NO MD MAS AUSENTES NO PDF ({len(so_no_md)}):")
        for c in sorted(so_no_md):
            print(f"       {c}")

    if so_no_pdf:
        print(f"\n  ℹ  NO PDF MAS NÃO DOCUMENTADOS NO MD ({len(so_no_pdf)}):")
        for c in sorted(so_no_pdf):
            print(f"       {c}")

    if nao_preenchidos:
        print(f"\n  ✗  FALHA NO PREENCHIMENTO ({len(nao_preenchidos)}) — campo existe no PDF mas não aceitou valor de texto:")
        for c in sorted(nao_preenchidos):
            print(f"       {c}")
    else:
        print(f"\n  ✓  Todos os {len(preenchidos_ok)} campos testados foram preenchidos com sucesso.")

    if not so_no_md and not so_no_pdf and not nao_preenchidos:
        print("  ✓  MD e PDF 100% consistentes.")


def main():
    filtro = sys.argv[1].lower() if len(sys.argv) > 1 else None

    fichas_a_testar = {
        k: v for k, v in FICHAS.items()
        if filtro is None or filtro in k
    }

    if not fichas_a_testar:
        print(f"Nenhuma ficha encontrada para o filtro '{filtro}'.")
        print(f"Fichas disponíveis: {', '.join(FICHAS)}")
        return

    for chave, (pdf, md) in fichas_a_testar.items():
        analisar_ficha(chave, pdf, md)

    print("\n" + "─" * 60)


if __name__ == "__main__":
    main()
