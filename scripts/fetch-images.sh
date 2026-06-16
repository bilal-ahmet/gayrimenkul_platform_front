#!/usr/bin/env bash
# Gerçek müteahhit firma görsellerini public/projects altına indirir.
# Çalıştır: bash scripts/fetch-images.sh
set -u
ROOT="$(cd "$(dirname "$0")/.." && pwd)"
UA="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124 Safari/537.36"
OK=0; FAIL=0

# dl <dest-relative-path> <url>
dl() {
  local dest="$ROOT/public/$1"; local url="$2"
  mkdir -p "$(dirname "$dest")"
  local code
  code=$(curl -sL -A "$UA" -e "https://www.google.com/" -o "$dest" -w "%{http_code}" --max-time 30 "$url")
  local size; size=$(wc -c < "$dest" 2>/dev/null || echo 0)
  if [ "$code" = "200" ] && [ "${size:-0}" -gt 5000 ]; then
    OK=$((OK+1)); echo "  ok  $1  (${size}B)"
  else
    FAIL=$((FAIL+1)); rm -f "$dest"; echo "  XX  [$code ${size}B] $1  <- $url"
  fi
}

# ───────── c1 AK Yapı ─────────
echo "== AK Yapı / Big Country =="
i=1; for n in 1 2 3 4 5 6; do dl "projects/big-country/g$i.png" "https://www.akyapi.com.tr/uploads/big-country-dis-$n.png"; i=$((i+1)); done
for n in 1 2 3 4; do dl "projects/big-country/g$i.png" "https://www.akyapi.com.tr/uploads/big-country-ic_$n.png"; i=$((i+1)); done

echo "== AK Yapı / Mavera Villaları =="
i=1
dl "projects/mavera-villalari/g$i.jpg" "https://www.akyapi.com.tr/uploads/mavera_villalar_banner.jpg"; i=$((i+1))
for n in 1 2 3 4; do dl "projects/mavera-villalari/g$i.jpg" "https://www.akyapi.com.tr/uploads/mavera_villalari_proje_galeri_$n.jpg"; i=$((i+1)); done
dl "projects/mavera-villalari/g$i.jpg" "https://www.akyapi.com.tr/uploads/mavera_villalar_sosyal_olanak_kapali_havuz.jpg"; i=$((i+1))

echo "== AK Yapı / Limonlu Bahçe =="
i=1
dl "projects/limonlu-bahce/g$i.jpg" "https://www.akyapi.com.tr/uploads/limonlu_bahce_konaklari_banner_-1.jpg"; i=$((i+1))
for n in 1 2 3 4; do dl "projects/limonlu-bahce/g$i.png" "https://www.akyapi.com.tr/uploads/limonlu_bahce_konaklari_dis_$n.png"; i=$((i+1)); done
for n in 1 2 3 4; do dl "projects/limonlu-bahce/g$i.jpg" "https://www.akyapi.com.tr/uploads/limonlu_bahce_konaklari_ic_$n.jpg"; i=$((i+1)); done

# ───────── c2 Zeray ─────────
echo "== Zeray / Esil Kartepe =="
i=1
dl "projects/zeray-esil/g$i.jpg" "https://www.zerayinsaat.com.tr/application/files/5316/7689/5408/ESIL_SLIDER.jpg"; i=$((i+1))
for f in 5416/7160/6897/1 5316/7160/6898/2 5816/7160/6900/3 9316/7160/6902/4 9316/7160/6903/5 8716/7160/6905/6 8116/7160/6906/7 8816/7160/6908/8; do
  dl "projects/zeray-esil/g$i.webp" "https://www.zerayinsaat.com.tr/application/files/$f.webp"; i=$((i+1)); done

echo "== Zeray / Gazania Life =="
dl "projects/zeray-gazania/g1.jpg" "https://www.zerayinsaat.com.tr/application/files/9917/0056/4541/GAZANIA_SLIDER.jpg"

echo "== Zeray / Residence =="
i=1
for f in 9317/0109/4838/ZerayResidence_1 4917/0109/4805/ZerayResidence_2 9817/0109/4807/ZerayResidence_3 5817/0109/4809/ZerayResidence_4 1017/0109/4812/ZerayResidence_5 7817/0109/4815/ZerayResidence_6 3217/0109/4834/ZerayResidence_BirdView_1; do
  dl "projects/zeray-residence/g$i.webp" "https://www.zerayinsaat.com.tr/application/files/$f.webp"; i=$((i+1)); done

# ───────── c3 Mamikler ─────────
echo "== Mamikler / Orka Residence =="
i=1
for f in q38w9I60V317774733700 j3YUBBYoGd17774733701 4iRZ7IBk3117774733702 BHT59m3Qqb17774733703 g2fjb7M5SR17774733704 rRLWNoOBab17774733705; do
  dl "projects/orka-residence/g$i.png" "https://www.mamikler.com.tr/uploads/project-galery/outside/orka-residence-gallery-$f.png"; i=$((i+1)); done
for f in D0xdHO0RRE17774866270 hAHy2Wj4uI17774866271 DiYdITmGZt17774866272 3vdu1Ayh9017774866273; do
  dl "projects/orka-residence/g$i.jpg" "https://www.mamikler.com.tr/uploads/project-galery/inside/orka-residence-gallery-$f.jpg"; i=$((i+1)); done

echo "== Mamikler / Orka Life II =="
i=1
dl "projects/orka-life-ii/g$i.jpg" "https://www.mamikler.com.tr/uploads/banners/orka-life-ii-cover_photo.jpg"; i=$((i+1))
dl "projects/orka-life-ii/g$i.jpg" "https://www.mamikler.com.tr/uploads/project-background/orka-life-ii-background.jpg"; i=$((i+1))
for f in khhP9JKxfl1655148364 pjaZQ9RE3e1655148388 pDN0TFO4sQ1655148421 PmKUo7HW421655148452 c9Fl9qRBec1655148477 pPJ5gQL9ez1655148501; do
  dl "projects/orka-life-ii/g$i.jpg" "https://www.mamikler.com.tr/uploads/project-features/-image-$f.jpg"; i=$((i+1)); done

echo "== Mamikler / Zümrüd-ü Anka Bahçecik =="
i=1
for f in CjR6FKU2UP16551507780 slr0vEQ4dz16551507781 CESH6ZPbWk16551507782 i2eZHe94kG16551507783 9o0K8U7rzT16551507784; do
  dl "projects/zumrud-anka/g$i.jpg" "https://www.mamikler.com.tr/uploads/project-galery/outside/zumrud-u-anka-bahcecik-gallery-$f.jpg"; i=$((i+1)); done
for f in qO8venWKv716551507860 UT0duqZi4116551507861 SbSvsi9OhK16551507862; do
  dl "projects/zumrud-anka/g$i.jpg" "https://www.mamikler.com.tr/uploads/project-galery/inside/zumrud-u-anka-bahcecik-gallery-$f.jpg"; i=$((i+1)); done

# ───────── c4 Zincirlikuyu ─────────
echo "== Zincirlikuyu / Özbek Premium =="
i=1
for h in caee94a63c22b4eab0d16220c32fc2ca.jpeg 5c707827fd95a8ada726fd7420b2898f.jpg bba7b87a038ffc6db619fe7a38d614b5.jpg 0616a7715db25d5e4566220a879026bd.jpg d54822573a3a5ef72648045c2d249cc0.jpg 3e6cdb9e0ed6d87f00f7f115e649cae6.jpg; do
  dl "projects/ozbek-premium/g$i.jpg" "https://docs.zincirlikuyuinsaat.com/images/upload/$h"; i=$((i+1)); done

echo "== Zincirlikuyu / Umuttepe Villa =="
i=1
for h in d985b6fcf987e32c6a98d606e82c2763.jpg e882198521e9614235d7adda6e998f09.jpg d382fd218e223ae5779faeea6c6c2eab.jpg b4ee82889021e757c5e980eefb52fb5c.jpg 00d5949fe37181ba8124e88e289a5d5b.jpg ee228a30e7caf817f8b49c3307e67104.jpg; do
  dl "projects/umuttepe-villa/g$i.jpg" "https://docs.zincirlikuyuinsaat.com/images/upload/$h"; i=$((i+1)); done

echo "== Zincirlikuyu / Plajyolu Premium =="
i=1
for h in 2c11c22425bb912531ae7600c11c7ff7.jpeg 92399ef5c9c5f0f7a3dc120df4b1c29b.jpg 0f471927e143ddddc9b48b3b74a6e620.jpg 42d9ea2153f11b7673dd04af7fd0fc74.jpg 766bd1167882faad712d45da8383e34b.jpg 53599afa017cf781296f02cc10a59bc2.jpg; do
  dl "projects/plajyolu-premium/g$i.jpg" "https://docs.zincirlikuyuinsaat.com/images/upload/$h"; i=$((i+1)); done

echo "== Zincirlikuyu / Garden Kartepe =="
i=1
for h in d0f418a0e884c3dae8e8044058b1dcd8.jpg d1a24696b5c8ad4368cb733794eaa8c5.jpg 4482ffff598a5be69f94fe2e83e3e26d.jpg 493c143c3c1722948677195572dedeeb.jpg de3624a22510c94f69aaf6db54eae837.jpg 2ce46881215f2157315b846cb97289c5.jpg; do
  dl "projects/garden-kartepe/g$i.jpg" "https://docs.zincirlikuyuinsaat.com/images/upload/$h"; i=$((i+1)); done

# ───────── c5 Haldız ─────────
echo "== Haldız / Paye Sakarya (render) =="
i=1
for n in paye1 paye3 paye5 paye7 paye8 paye10; do
  dl "projects/paye-sakarya/g$i.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/03/$n.jpg"; i=$((i+1)); done

echo "== Haldız / Paye Sakarya (GERÇEK ŞANTİYE — inşaat aşamaları) =="
# Kronolojik şantiye fotoğrafları -> /public/phases/ aşama kütüphanesi
dl "phases/temel-1.jpg"     "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/08/payesantiye1.jpg"
dl "phases/temel-2.jpg"     "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/08/payesantiye2.jpg"
dl "phases/temel-3.jpg"     "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/08/payesantiye4.jpg"
dl "phases/kaba-1.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/10/payesantiye5.jpg"
dl "phases/kaba-2.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2023/10/payesantiye7.jpg"
dl "phases/kaba-3.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/01/payesantiye9.jpg"
dl "phases/kaba-4.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/01/payesantiye11.jpg"
dl "phases/ince-1.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/02/payesantiye13.jpg"
dl "phases/ince-2.jpg"      "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/03/payesantiye14.jpg"
dl "phases/dis-cephe-1.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/05/payesantiye151.jpg"
dl "phases/dis-cephe-2.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/08/payesantiye17.jpg"
dl "phases/dis-cephe-3.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2024/10/payesantiye18.jpg"
dl "phases/peyzaj-1.jpg"    "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2025/04/payesantiye20.jpg"
dl "phases/peyzaj-2.jpg"    "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2025/12/payesantiye22.jpg"

echo "== Haldız / Medyan Kadıköy =="
i=1
for n in 1 2 3 4 5 6; do
  dl "projects/medyan-kadikoy/g$i.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/2016/10/$n.jpg"; i=$((i+1)); done

echo "== Haldız / Bizimtepe Aydos =="
i=1
for n in 2015/11/12 2015/11/32 2015/11/41 2015/11/51 2015/11/71 2015/11/8 2016/04/121 2016/04/131; do
  dl "projects/bizimtepe-aydos/g$i.jpg" "https://www.haldizinsaat.com.tr/dcms-sites/haldizinsaat.com.tr/uploads/$n.jpg"; i=$((i+1)); done

echo ""
echo "==================================="
echo "TOPLAM: $OK indirildi, $FAIL başarısız"
