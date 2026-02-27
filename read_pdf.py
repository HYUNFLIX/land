import fitz  # PyMuPDF
import sys

sys.stdout.reconfigure(encoding='utf-8')

pdf_path = "260212_동래 푸르지오 에듀포레.pdf"
doc = fitz.open(pdf_path)

print(f"총 페이지 수: {len(doc)}\n")
print("=" * 60)

for i, page in enumerate(doc):
    text = page.get_text().strip()
    lines = [l.strip() for l in text.split('\n') if l.strip() and len(l.strip()) > 1]
    img_count = len(page.get_images())
    
    # 메뉴/면책문구 같은 반복 텍스트 제거
    skip = {'MENU', 'PRUGIO', 'P R U G I O', '■사업개요', '■프리미엄', '■상품구성',
            '■분양안내', '■유의사항', '■입지여건', '사업개요', '공급대상', '사업지전경',
            '위치도', '교통환경', '생활편의환경', '교육환경', '개발환경',
            '0.5km', '1km'}
    meaningful = [l for l in lines if l not in skip and '자료에포함된' not in l and '인허가' not in l]
    
    print(f"\n[ 페이지 {i+1:02d} ]  이미지: {img_count}개")
    if meaningful:
        for m in meaningful[:10]:
            print(f"  · {m}")
        if len(meaningful) > 10:
            print(f"  ... 외 {len(meaningful)-10}줄")
    else:
        print("  (이미지/도면 중심 페이지)")
    print("-" * 50)
