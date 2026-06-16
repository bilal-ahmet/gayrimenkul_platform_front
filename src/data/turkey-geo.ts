// Türkiye il/ilçe veri kaynağı — 81 il, tüm ilçeleriyle, 7 coğrafi bölgeye gruplu.
// Filtreleme ve talep ekranlarının tek doğruluk kaynağıdır.

export type RegionKey =
  | 'marmara' | 'ege' | 'akdeniz' | 'ic_anadolu'
  | 'karadeniz' | 'dogu_anadolu' | 'guneydogu'

export const REGIONS: { key: RegionKey; label: string }[] = [
  { key: 'marmara',      label: 'Marmara' },
  { key: 'ege',          label: 'Ege' },
  { key: 'akdeniz',      label: 'Akdeniz' },
  { key: 'ic_anadolu',   label: 'İç Anadolu' },
  { key: 'karadeniz',    label: 'Karadeniz' },
  { key: 'dogu_anadolu', label: 'Doğu Anadolu' },
  { key: 'guneydogu',    label: 'Güneydoğu Anadolu' },
]

export interface Province {
  /** İl adı, örn. "İstanbul" */
  name: string
  /** Plaka kodu */
  plate: number
  region: RegionKey
  /** İlin tüm ilçeleri */
  districts: string[]
}

export const PROVINCES: Province[] = [
  // ── Marmara ───────────────────────────────────────────────────────────────
  { name: 'İstanbul', plate: 34, region: 'marmara', districts: ['Adalar', 'Arnavutköy', 'Ataşehir', 'Avcılar', 'Bağcılar', 'Bahçelievler', 'Bakırköy', 'Başakşehir', 'Bayrampaşa', 'Beşiktaş', 'Beykoz', 'Beylikdüzü', 'Beyoğlu', 'Büyükçekmece', 'Çatalca', 'Çekmeköy', 'Esenler', 'Esenyurt', 'Eyüpsultan', 'Fatih', 'Gaziosmanpaşa', 'Güngören', 'Kadıköy', 'Kağıthane', 'Kartal', 'Küçükçekmece', 'Maltepe', 'Pendik', 'Sancaktepe', 'Sarıyer', 'Silivri', 'Sultanbeyli', 'Sultangazi', 'Şile', 'Şişli', 'Tuzla', 'Ümraniye', 'Üsküdar', 'Zeytinburnu'] },
  { name: 'Edirne', plate: 22, region: 'marmara', districts: ['Merkez', 'Enez', 'Havsa', 'İpsala', 'Keşan', 'Lalapaşa', 'Meriç', 'Süloğlu', 'Uzunköprü'] },
  { name: 'Kırklareli', plate: 39, region: 'marmara', districts: ['Merkez', 'Babaeski', 'Demirköy', 'Kofçaz', 'Lüleburgaz', 'Pehlivanköy', 'Pınarhisar', 'Vize'] },
  { name: 'Tekirdağ', plate: 59, region: 'marmara', districts: ['Çerkezköy', 'Çorlu', 'Ergene', 'Hayrabolu', 'Kapaklı', 'Malkara', 'Marmaraereğlisi', 'Muratlı', 'Saray', 'Süleymanpaşa', 'Şarköy'] },
  { name: 'Çanakkale', plate: 17, region: 'marmara', districts: ['Merkez', 'Ayvacık', 'Bayramiç', 'Biga', 'Bozcaada', 'Çan', 'Eceabat', 'Ezine', 'Gelibolu', 'Gökçeada', 'Lapseki', 'Yenice'] },
  { name: 'Balıkesir', plate: 10, region: 'marmara', districts: ['Altıeylül', 'Karesi', 'Ayvalık', 'Balya', 'Bandırma', 'Bigadiç', 'Burhaniye', 'Dursunbey', 'Edremit', 'Erdek', 'Gömeç', 'Gönen', 'Havran', 'İvrindi', 'Kepsut', 'Manyas', 'Marmara', 'Savaştepe', 'Sındırgı', 'Susurluk'] },
  { name: 'Bursa', plate: 16, region: 'marmara', districts: ['Nilüfer', 'Osmangazi', 'Yıldırım', 'Büyükorhan', 'Gemlik', 'Gürsu', 'Harmancık', 'İnegöl', 'İznik', 'Karacabey', 'Keles', 'Kestel', 'Mudanya', 'Mustafakemalpaşa', 'Orhaneli', 'Orhangazi', 'Yenişehir'] },
  { name: 'Yalova', plate: 77, region: 'marmara', districts: ['Merkez', 'Altınova', 'Armutlu', 'Çınarcık', 'Çiftlikköy', 'Termal'] },
  { name: 'Kocaeli', plate: 41, region: 'marmara', districts: ['İzmit', 'Başiskele', 'Çayırova', 'Darıca', 'Derince', 'Dilovası', 'Gebze', 'Gölcük', 'Kandıra', 'Karamürsel', 'Kartepe', 'Körfez'] },
  { name: 'Sakarya', plate: 54, region: 'marmara', districts: ['Adapazarı', 'Serdivan', 'Akyazı', 'Arifiye', 'Erenler', 'Ferizli', 'Geyve', 'Hendek', 'Karapürçek', 'Karasu', 'Kaynarca', 'Kocaali', 'Pamukova', 'Sapanca', 'Söğütlü', 'Taraklı'] },
  { name: 'Bilecik', plate: 11, region: 'marmara', districts: ['Merkez', 'Bozüyük', 'Gölpazarı', 'İnhisar', 'Osmaneli', 'Pazaryeri', 'Söğüt', 'Yenipazar'] },

  // ── Ege ─────────────────────────────────────────────────────────────────
  { name: 'İzmir', plate: 35, region: 'ege', districts: ['Konak', 'Bornova', 'Karşıyaka', 'Buca', 'Bayraklı', 'Çiğli', 'Gaziemir', 'Karabağlar', 'Balçova', 'Narlıdere', 'Güzelbahçe', 'Aliağa', 'Bayındır', 'Bergama', 'Beydağ', 'Çeşme', 'Dikili', 'Foça', 'Karaburun', 'Kemalpaşa', 'Kınık', 'Kiraz', 'Menderes', 'Menemen', 'Ödemiş', 'Seferihisar', 'Selçuk', 'Tire', 'Torbalı', 'Urla'] },
  { name: 'Manisa', plate: 45, region: 'ege', districts: ['Şehzadeler', 'Yunusemre', 'Akhisar', 'Alaşehir', 'Demirci', 'Gökçeoba', 'Gördes', 'Kırkağaç', 'Köprübaşı', 'Kula', 'Salihli', 'Sarıgöl', 'Saruhanlı', 'Selendi', 'Soma', 'Turgutlu', 'Ahmetli', 'Gölmarmara'] },
  { name: 'Aydın', plate: 9, region: 'ege', districts: ['Efeler', 'Bozdoğan', 'Buharkent', 'Çine', 'Didim', 'Germencik', 'İncirliova', 'Karacasu', 'Karpuzlu', 'Koçarlı', 'Köşk', 'Kuşadası', 'Kuyucak', 'Nazilli', 'Söke', 'Sultanhisar', 'Yenipazar'] },
  { name: 'Denizli', plate: 20, region: 'ege', districts: ['Merkezefendi', 'Pamukkale', 'Acıpayam', 'Babadağ', 'Baklan', 'Bekilli', 'Beyağaç', 'Bozkurt', 'Buldan', 'Çal', 'Çameli', 'Çardak', 'Çivril', 'Güney', 'Honaz', 'Kale', 'Sarayköy', 'Serinhisar', 'Tavas'] },
  { name: 'Muğla', plate: 48, region: 'ege', districts: ['Menteşe', 'Bodrum', 'Dalaman', 'Datça', 'Fethiye', 'Kavaklıdere', 'Köyceğiz', 'Marmaris', 'Milas', 'Ortaca', 'Seydikemer', 'Ula', 'Yatağan'] },
  { name: 'Afyonkarahisar', plate: 3, region: 'ege', districts: ['Merkez', 'Başmakçı', 'Bayat', 'Bolvadin', 'Çay', 'Çobanlar', 'Dazkırı', 'Dinar', 'Emirdağ', 'Evciler', 'Hocalar', 'İhsaniye', 'İscehisar', 'Kızılören', 'Sandıklı', 'Sinanpaşa', 'Sultandağı', 'Şuhut'] },
  { name: 'Kütahya', plate: 43, region: 'ege', districts: ['Merkez', 'Altıntaş', 'Aslanapa', 'Çavdarhisar', 'Domaniç', 'Dumlupınar', 'Emet', 'Gediz', 'Hisarcık', 'Pazarlar', 'Simav', 'Şaphane', 'Tavşanlı'] },
  { name: 'Uşak', plate: 64, region: 'ege', districts: ['Merkez', 'Banaz', 'Eşme', 'Karahallı', 'Sivaslı', 'Ulubey'] },

  // ── Akdeniz ───────────────────────────────────────────────────────────────
  { name: 'Antalya', plate: 7, region: 'akdeniz', districts: ['Muratpaşa', 'Kepez', 'Konyaaltı', 'Aksu', 'Döşemealtı', 'Akseki', 'Alanya', 'Demre', 'Elmalı', 'Finike', 'Gazipaşa', 'Gündoğmuş', 'İbradı', 'Kaş', 'Kemer', 'Korkuteli', 'Kumluca', 'Manavgat', 'Serik'] },
  { name: 'Isparta', plate: 32, region: 'akdeniz', districts: ['Merkez', 'Aksu', 'Atabey', 'Eğirdir', 'Gelendost', 'Gönen', 'Keçiborlu', 'Senirkent', 'Sütçüler', 'Şarkikaraağaç', 'Uluborlu', 'Yalvaç', 'Yenişarbademli'] },
  { name: 'Burdur', plate: 15, region: 'akdeniz', districts: ['Merkez', 'Ağlasun', 'Altınyayla', 'Bucak', 'Çavdır', 'Çeltikçi', 'Gölhisar', 'Karamanlı', 'Kemer', 'Tefenni', 'Yeşilova'] },
  { name: 'Mersin', plate: 33, region: 'akdeniz', districts: ['Akdeniz', 'Mezitli', 'Toroslar', 'Yenişehir', 'Anamur', 'Aydıncık', 'Bozyazı', 'Çamlıyayla', 'Erdemli', 'Gülnar', 'Mut', 'Silifke', 'Tarsus'] },
  { name: 'Adana', plate: 1, region: 'akdeniz', districts: ['Seyhan', 'Çukurova', 'Yüreğir', 'Sarıçam', 'Aladağ', 'Ceyhan', 'Feke', 'İmamoğlu', 'Karaisalı', 'Karataş', 'Kozan', 'Pozantı', 'Saimbeyli', 'Tufanbeyli', 'Yumurtalık'] },
  { name: 'Osmaniye', plate: 80, region: 'akdeniz', districts: ['Merkez', 'Bahçe', 'Düziçi', 'Hasanbeyli', 'Kadirli', 'Sumbas', 'Toprakkale'] },
  { name: 'Hatay', plate: 31, region: 'akdeniz', districts: ['Antakya', 'Defne', 'Arsuz', 'Altınözü', 'Belen', 'Dörtyol', 'Erzin', 'Hassa', 'İskenderun', 'Kırıkhan', 'Kumlu', 'Payas', 'Reyhanlı', 'Samandağ', 'Yayladağı'] },
  { name: 'Kahramanmaraş', plate: 46, region: 'akdeniz', districts: ['Dulkadiroğlu', 'Onikişubat', 'Afşin', 'Andırın', 'Çağlayancerit', 'Ekinözü', 'Elbistan', 'Göksun', 'Nurhak', 'Pazarcık', 'Türkoğlu'] },

  // ── İç Anadolu ───────────────────────────────────────────────────────────
  { name: 'Ankara', plate: 6, region: 'ic_anadolu', districts: ['Çankaya', 'Keçiören', 'Yenimahalle', 'Mamak', 'Etimesgut', 'Sincan', 'Altındağ', 'Pursaklar', 'Gölbaşı', 'Polatlı', 'Akyurt', 'Ayaş', 'Bala', 'Beypazarı', 'Çamlıdere', 'Çubuk', 'Elmadağ', 'Evren', 'Güdül', 'Haymana', 'Kalecik', 'Kazan', 'Kızılcahamam', 'Nallıhan', 'Şereflikoçhisar'] },
  { name: 'Konya', plate: 42, region: 'ic_anadolu', districts: ['Selçuklu', 'Meram', 'Karatay', 'Akören', 'Akşehir', 'Altınekin', 'Beyşehir', 'Bozkır', 'Cihanbeyli', 'Çeltik', 'Çumra', 'Derbent', 'Derebucak', 'Doğanhisar', 'Emirgazi', 'Ereğli', 'Güneysınır', 'Hadim', 'Halkapınar', 'Hüyük', 'Ilgın', 'Kadınhanı', 'Karapınar', 'Kulu', 'Sarayönü', 'Seydişehir', 'Taşkent', 'Tuzlukçu', 'Yalıhüyük', 'Yunak'] },
  { name: 'Karaman', plate: 70, region: 'ic_anadolu', districts: ['Merkez', 'Ayrancı', 'Başyayla', 'Ermenek', 'Kazımkarabekir', 'Sarıveliler'] },
  { name: 'Aksaray', plate: 68, region: 'ic_anadolu', districts: ['Merkez', 'Ağaçören', 'Eskil', 'Gülağaç', 'Güzelyurt', 'Ortaköy', 'Sarıyahşi', 'Sultanhanı'] },
  { name: 'Niğde', plate: 51, region: 'ic_anadolu', districts: ['Merkez', 'Altunhisar', 'Bor', 'Çamardı', 'Çiftlik', 'Ulukışla'] },
  { name: 'Nevşehir', plate: 50, region: 'ic_anadolu', districts: ['Merkez', 'Acıgöl', 'Avanos', 'Derinkuyu', 'Gülşehir', 'Hacıbektaş', 'Kozaklı', 'Ürgüp'] },
  { name: 'Kırşehir', plate: 40, region: 'ic_anadolu', districts: ['Merkez', 'Akçakent', 'Akpınar', 'Boztepe', 'Çiçekdağı', 'Kaman', 'Mucur'] },
  { name: 'Kırıkkale', plate: 71, region: 'ic_anadolu', districts: ['Merkez', 'Bahşılı', 'Balışeyh', 'Çelebi', 'Delice', 'Karakeçili', 'Keskin', 'Sulakyurt', 'Yahşihan'] },
  { name: 'Çankırı', plate: 18, region: 'ic_anadolu', districts: ['Merkez', 'Atkaracalar', 'Bayramören', 'Çerkeş', 'Eldivan', 'Ilgaz', 'Kızılırmak', 'Korgun', 'Kurşunlu', 'Orta', 'Şabanözü', 'Yapraklı'] },
  { name: 'Yozgat', plate: 66, region: 'ic_anadolu', districts: ['Merkez', 'Akdağmadeni', 'Aydıncık', 'Boğazlıyan', 'Çandır', 'Çayıralan', 'Çekerek', 'Kadışehri', 'Saraykent', 'Sarıkaya', 'Sorgun', 'Şefaatli', 'Yenifakılı', 'Yerköy'] },
  { name: 'Sivas', plate: 58, region: 'ic_anadolu', districts: ['Merkez', 'Akıncılar', 'Altınyayla', 'Divriği', 'Doğanşar', 'Gemerek', 'Gölova', 'Gürün', 'Hafik', 'İmranlı', 'Kangal', 'Koyulhisar', 'Suşehri', 'Şarkışla', 'Ulaş', 'Yıldızeli', 'Zara'] },
  { name: 'Kayseri', plate: 38, region: 'ic_anadolu', districts: ['Melikgazi', 'Kocasinan', 'Talas', 'Hacılar', 'İncesu', 'Akkışla', 'Bünyan', 'Develi', 'Felahiye', 'Özvatan', 'Pınarbaşı', 'Sarıoğlan', 'Sarız', 'Tomarza', 'Yahyalı', 'Yeşilhisar'] },
  { name: 'Eskişehir', plate: 26, region: 'ic_anadolu', districts: ['Odunpazarı', 'Tepebaşı', 'Alpu', 'Beylikova', 'Çifteler', 'Günyüzü', 'Han', 'İnönü', 'Mahmudiye', 'Mihalgazi', 'Mihalıççık', 'Sarıcakaya', 'Seyitgazi', 'Sivrihisar'] },

  // ── Karadeniz ───────────────────────────────────────────────────────────
  { name: 'Zonguldak', plate: 67, region: 'karadeniz', districts: ['Merkez', 'Alaplı', 'Çaycuma', 'Devrek', 'Ereğli', 'Gökçebey', 'Kilimli', 'Kozlu'] },
  { name: 'Karabük', plate: 78, region: 'karadeniz', districts: ['Merkez', 'Eflani', 'Eskipazar', 'Ovacık', 'Safranbolu', 'Yenice'] },
  { name: 'Bartın', plate: 74, region: 'karadeniz', districts: ['Merkez', 'Amasra', 'Kurucaşile', 'Ulus'] },
  { name: 'Kastamonu', plate: 37, region: 'karadeniz', districts: ['Merkez', 'Abana', 'Ağlı', 'Araç', 'Azdavay', 'Bozkurt', 'Cide', 'Çatalzeytin', 'Daday', 'Devrekani', 'Doğanyurt', 'Hanönü', 'İhsangazi', 'İnebolu', 'Küre', 'Pınarbaşı', 'Seydiler', 'Şenpazar', 'Taşköprü', 'Tosya'] },
  { name: 'Sinop', plate: 57, region: 'karadeniz', districts: ['Merkez', 'Ayancık', 'Boyabat', 'Dikmen', 'Durağan', 'Erfelek', 'Gerze', 'Saraydüzü', 'Türkeli'] },
  { name: 'Samsun', plate: 55, region: 'karadeniz', districts: ['İlkadım', 'Atakum', 'Canik', 'Tekkeköy', 'Alaçam', 'Asarcık', 'Ayvacık', 'Bafra', 'Çarşamba', 'Havza', 'Kavak', 'Ladik', 'Ondokuzmayıs', 'Salıpazarı', 'Terme', 'Vezirköprü', 'Yakakent'] },
  { name: 'Çorum', plate: 19, region: 'karadeniz', districts: ['Merkez', 'Alaca', 'Bayat', 'Boğazkale', 'Dodurga', 'İskilip', 'Kargı', 'Laçin', 'Mecitözü', 'Oğuzlar', 'Ortaköy', 'Osmancık', 'Sungurlu', 'Uğurludağ'] },
  { name: 'Amasya', plate: 5, region: 'karadeniz', districts: ['Merkez', 'Göynücek', 'Gümüşhacıköy', 'Hamamözü', 'Merzifon', 'Suluova', 'Taşova'] },
  { name: 'Tokat', plate: 60, region: 'karadeniz', districts: ['Merkez', 'Almus', 'Artova', 'Başçiftlik', 'Erbaa', 'Niksar', 'Pazar', 'Reşadiye', 'Sulusaray', 'Turhal', 'Yeşilyurt', 'Zile'] },
  { name: 'Ordu', plate: 52, region: 'karadeniz', districts: ['Altınordu', 'Akkuş', 'Aybastı', 'Çamaş', 'Çatalpınar', 'Çaybaşı', 'Fatsa', 'Gölköy', 'Gülyalı', 'Gürgentepe', 'İkizce', 'Kabadüz', 'Kabataş', 'Korgan', 'Kumru', 'Mesudiye', 'Perşembe', 'Ulubey', 'Ünye'] },
  { name: 'Giresun', plate: 28, region: 'karadeniz', districts: ['Merkez', 'Alucra', 'Bulancak', 'Çamoluk', 'Çanakçı', 'Dereli', 'Doğankent', 'Espiye', 'Eynesil', 'Görele', 'Güce', 'Keşap', 'Piraziz', 'Şebinkarahisar', 'Tirebolu', 'Yağlıdere'] },
  { name: 'Trabzon', plate: 61, region: 'karadeniz', districts: ['Ortahisar', 'Akçaabat', 'Araklı', 'Arsin', 'Beşikdüzü', 'Çarşıbaşı', 'Çaykara', 'Dernekpazarı', 'Düzköy', 'Hayrat', 'Köprübaşı', 'Maçka', 'Of', 'Sürmene', 'Şalpazarı', 'Tonya', 'Vakfıkebir', 'Yomra'] },
  { name: 'Rize', plate: 53, region: 'karadeniz', districts: ['Merkez', 'Ardeşen', 'Çamlıhemşin', 'Çayeli', 'Derepazarı', 'Fındıklı', 'Güneysu', 'Hemşin', 'İkizdere', 'İyidere', 'Kalkandere', 'Pazar'] },
  { name: 'Artvin', plate: 8, region: 'karadeniz', districts: ['Merkez', 'Ardanuç', 'Arhavi', 'Borçka', 'Hopa', 'Kemalpaşa', 'Murgul', 'Şavşat', 'Yusufeli'] },
  { name: 'Gümüşhane', plate: 29, region: 'karadeniz', districts: ['Merkez', 'Kelkit', 'Köse', 'Kürtün', 'Şiran', 'Torul'] },
  { name: 'Bayburt', plate: 69, region: 'karadeniz', districts: ['Merkez', 'Aydıntepe', 'Demirözü'] },
  { name: 'Bolu', plate: 14, region: 'karadeniz', districts: ['Merkez', 'Dörtdivan', 'Gerede', 'Göynük', 'Kıbrıscık', 'Mengen', 'Mudurnu', 'Seben', 'Yeniçağa'] },
  { name: 'Düzce', plate: 81, region: 'karadeniz', districts: ['Merkez', 'Akçakoca', 'Cumayeri', 'Çilimli', 'Gölyaka', 'Gümüşova', 'Kaynaşlı', 'Yığılca'] },

  // ── Doğu Anadolu ───────────────────────────────────────────────────────────
  { name: 'Erzurum', plate: 25, region: 'dogu_anadolu', districts: ['Yakutiye', 'Palandöken', 'Aziziye', 'Aşkale', 'Çat', 'Hınıs', 'Horasan', 'İspir', 'Karaçoban', 'Karayazı', 'Köprüköy', 'Narman', 'Oltu', 'Olur', 'Pasinler', 'Pazaryolu', 'Şenkaya', 'Tekman', 'Tortum', 'Uzundere'] },
  { name: 'Erzincan', plate: 24, region: 'dogu_anadolu', districts: ['Merkez', 'Çayırlı', 'İliç', 'Kemah', 'Kemaliye', 'Otlukbeli', 'Refahiye', 'Tercan', 'Üzümlü'] },
  { name: 'Kars', plate: 36, region: 'dogu_anadolu', districts: ['Merkez', 'Akyaka', 'Arpaçay', 'Digor', 'Kağızman', 'Sarıkamış', 'Selim', 'Susuz'] },
  { name: 'Ardahan', plate: 75, region: 'dogu_anadolu', districts: ['Merkez', 'Çıldır', 'Damal', 'Göle', 'Hanak', 'Posof'] },
  { name: 'Iğdır', plate: 76, region: 'dogu_anadolu', districts: ['Merkez', 'Aralık', 'Karakoyunlu', 'Tuzluca'] },
  { name: 'Ağrı', plate: 4, region: 'dogu_anadolu', districts: ['Merkez', 'Diyadin', 'Doğubayazıt', 'Eleşkirt', 'Hamur', 'Patnos', 'Taşlıçay', 'Tutak'] },
  { name: 'Malatya', plate: 44, region: 'dogu_anadolu', districts: ['Battalgazi', 'Yeşilyurt', 'Akçadağ', 'Arapgir', 'Arguvan', 'Darende', 'Doğanşehir', 'Doğanyol', 'Hekimhan', 'Kale', 'Kuluncak', 'Pütürge', 'Yazıhan'] },
  { name: 'Elazığ', plate: 23, region: 'dogu_anadolu', districts: ['Merkez', 'Ağın', 'Alacakaya', 'Arıcak', 'Baskil', 'Karakoçan', 'Keban', 'Kovancılar', 'Maden', 'Palu', 'Sivrice'] },
  { name: 'Bingöl', plate: 12, region: 'dogu_anadolu', districts: ['Merkez', 'Adaklı', 'Genç', 'Karlıova', 'Kiğı', 'Solhan', 'Yayladere', 'Yedisu'] },
  { name: 'Tunceli', plate: 62, region: 'dogu_anadolu', districts: ['Merkez', 'Çemişgezek', 'Hozat', 'Mazgirt', 'Nazımiye', 'Ovacık', 'Pertek', 'Pülümür'] },
  { name: 'Muş', plate: 49, region: 'dogu_anadolu', districts: ['Merkez', 'Bulanık', 'Hasköy', 'Korkut', 'Malazgirt', 'Varto'] },
  { name: 'Bitlis', plate: 13, region: 'dogu_anadolu', districts: ['Merkez', 'Adilcevaz', 'Ahlat', 'Güroymak', 'Hizan', 'Mutki', 'Tatvan'] },
  { name: 'Van', plate: 65, region: 'dogu_anadolu', districts: ['İpekyolu', 'Tuşba', 'Edremit', 'Bahçesaray', 'Başkale', 'Çaldıran', 'Çatak', 'Erciş', 'Gevaş', 'Gürpınar', 'Muradiye', 'Özalp', 'Saray'] },
  { name: 'Hakkari', plate: 30, region: 'dogu_anadolu', districts: ['Merkez', 'Çukurca', 'Derecik', 'Şemdinli', 'Yüksekova'] },

  // ── Güneydoğu Anadolu ───────────────────────────────────────────────────────
  { name: 'Gaziantep', plate: 27, region: 'guneydogu', districts: ['Şahinbey', 'Şehitkamil', 'Oğuzeli', 'Araban', 'İslahiye', 'Karkamış', 'Nizip', 'Nurdağı', 'Yavuzeli'] },
  { name: 'Kilis', plate: 79, region: 'guneydogu', districts: ['Merkez', 'Elbeyli', 'Musabeyli', 'Polateli'] },
  { name: 'Şanlıurfa', plate: 63, region: 'guneydogu', districts: ['Eyyübiye', 'Haliliye', 'Karaköprü', 'Akçakale', 'Birecik', 'Bozova', 'Ceylanpınar', 'Halfeti', 'Harran', 'Hilvan', 'Siverek', 'Suruç', 'Viranşehir'] },
  { name: 'Adıyaman', plate: 2, region: 'guneydogu', districts: ['Merkez', 'Besni', 'Çelikhan', 'Gerger', 'Gölbaşı', 'Kahta', 'Samsat', 'Sincik', 'Tut'] },
  { name: 'Diyarbakır', plate: 21, region: 'guneydogu', districts: ['Bağlar', 'Kayapınar', 'Sur', 'Yenişehir', 'Bismil', 'Çermik', 'Çınar', 'Çüngüş', 'Dicle', 'Eğil', 'Ergani', 'Hani', 'Hazro', 'Kocaköy', 'Kulp', 'Lice', 'Silvan'] },
  { name: 'Mardin', plate: 47, region: 'guneydogu', districts: ['Artuklu', 'Dargeçit', 'Derik', 'Kızıltepe', 'Mazıdağı', 'Midyat', 'Nusaybin', 'Ömerli', 'Savur', 'Yeşilli'] },
  { name: 'Batman', plate: 72, region: 'guneydogu', districts: ['Merkez', 'Beşiri', 'Gercüş', 'Hasankeyf', 'Kozluk', 'Sason'] },
  { name: 'Siirt', plate: 56, region: 'guneydogu', districts: ['Merkez', 'Baykan', 'Eruh', 'Kurtalan', 'Pervari', 'Şirvan', 'Tillo'] },
  { name: 'Şırnak', plate: 73, region: 'guneydogu', districts: ['Merkez', 'Beytüşşebap', 'Cizre', 'Güçlükonak', 'İdil', 'Silopi', 'Uludere'] },
]

/** Bir bölgenin illeri, Türkçe alfabetik sırada */
export const provincesByRegion = (r: RegionKey): Province[] =>
  PROVINCES.filter(p => p.region === r).sort((a, b) => a.name.localeCompare(b.name, 'tr'))

/** Bir ilin ilçeleri, Türkçe alfabetik sırada */
export const districtsOf = (city: string): string[] =>
  [...(PROVINCES.find(p => p.name === city)?.districts ?? [])].sort((a, b) => a.localeCompare(b, 'tr'))

/** Tüm il adları */
export const allProvinceNames = (): string[] => PROVINCES.map(p => p.name)
