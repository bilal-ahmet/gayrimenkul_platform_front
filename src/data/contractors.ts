import type { Contractor } from '@/types'

// Aşağıdaki firmalar gerçek müteahhit firmalarının kamuya açık tanıtım
// bilgilerinden derlenmiştir. Proje/tamamlanan sayıları ve "Son Tamamlanan
// Projeler" vitrini firmaların kendi sitelerindeki gerçek projelerden alınmıştır.
// Fiyat / satış oranları platform demosu için temsilî ayarlanmıştır.

export const contractors: Contractor[] = [
  {
    id: 'c1',
    name: 'AK Yapı',
    taxId: '1234567890',
    rating: 4.8,
    projectCount: 24,
    completedProjects: 20,
    plan: 'enterprise',
    phone: '+90 212 438 00 00',
    email: 'satis@akyapi.com.tr',
    website: 'https://www.akyapi.com.tr',
    address: 'Başakşehir, İstanbul',
    city: 'İstanbul',
    foundedYear: 1997,
    specialties: ['Konut', 'Villa', 'Ofis', 'AVM', 'Lojistik'],
    about:
      'AK Yapı, inşaat ve proje geliştirme alanında çeyrek asrı aşan tecrübesiyle ' +
      'İstanbul’da konut, villa, ofis, alışveriş merkezi ile üretim ve lojistik ' +
      'projelerine imza atmaktadır. Estetik tasarımı işlevsel planlamayla birleştirerek; ' +
      'ulaşım olanakları, çevresel gelişim potansiyeli ve dengeli yerleşim anlayışını ' +
      'ön planda tutan, hem yaşanabilir hem de yatırım değeri yüksek yaşam alanları üretir. ' +
      'Başakşehir’deki Mavera serisi ve Büyükçekmece Big Country projeleri öne çıkan çalışmaları arasındadır.',
    pastProjects: [
      { name: 'Mavera Villaları', year: 2022, location: 'Başakşehir, İstanbul', type: 'Villa', imageUrl: '/projects/mavera-villalari/g1.jpg' },
      { name: 'Mavera Comfort', year: 2020, location: 'Başakşehir, İstanbul', type: 'Rezidans', imageUrl: '/projects/akyapi-mavera-comfort.jpg' },
    ],
  },
  {
    id: 'c2',
    name: 'Zeray İnşaat',
    taxId: '9876543210',
    rating: 4.6,
    projectCount: 47,
    completedProjects: 32,
    plan: 'pro',
    phone: '+90 262 335 00 00',
    email: 'info@zerayinsaat.com.tr',
    website: 'https://www.zerayinsaat.com.tr',
    address: 'İzmit, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 1998,
    specialties: ['Rezidans', 'Konut', 'Villa', 'Karma Proje'],
    about:
      'Zeray İnşaat, Kocaeli’nin geleceğine yatırım yapan ileri görüşlü yönetim anlayışı, ' +
      'inşaat alanındaki uzmanlığı ve deneyimli kadrosuyla bölgede sektör standartlarını ' +
      'değiştiren, katma değeri yüksek konut projeleri üretir. İzmit ve Kartepe’de geniş ' +
      'arazilere kurulu, sosyal donatıları zengin yaşam kampüsleri ile 30’u aşkın tamamlanmış ' +
      'projeye imza atmıştır. Esil Kartepe, Dora Hill ve Residence serisi imza projeleridir.',
    pastProjects: [
      { name: 'Zeray Esil Kartepe', year: 2024, location: 'Kartepe, Kocaeli', type: 'Karma', imageUrl: '/projects/zeray-esil/g1.jpg' },
      { name: 'Zeray Güneşi', year: 2021, location: 'Başiskele, Kocaeli', type: 'Konut', imageUrl: '/projects/zeray-gunesi.jpg' },
    ],
  },
  {
    id: 'c3',
    name: 'Mamikler İnşaat',
    taxId: '5556667780',
    rating: 4.5,
    projectCount: 18,
    completedProjects: 7,
    plan: 'pro',
    phone: '+90 262 341 00 00',
    email: 'info@mamikler.com.tr',
    website: 'https://www.mamikler.com.tr',
    address: 'Başiskele, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 2004,
    specialties: ['Konut', 'Rezidans', 'Villa', 'Turizm'],
    about:
      'Mamikler Grup, 20 yılı aşan tecrübesiyle Kocaeli Başiskele’den Bodrum’a uzanan ' +
      'özel yaşam alanları geliştirir. Kocaeli’nin İstanbul, Ankara ve Bursa’ya yakınlığını ' +
      've doğal güzelliğini değerlendiren projelerinin yanı sıra; Bodrum’da Orka serisi ile ' +
      'turizm odaklı rezidans projelerine yönelmiştir. Geniş yeşil alanlar, sosyal tesisler ' +
      've modern mimariyi bir araya getiren markası bölgede tanınmaktadır.',
    pastProjects: [
      { name: 'Orka Life II', year: 2022, location: 'Yuvacık, Kocaeli', type: 'Rezidans', imageUrl: '/projects/orka-life-ii/g1.jpg' },
    ],
  },
  {
    id: 'c4',
    name: 'Zincirlikuyu İnşaat',
    taxId: '4441112220',
    rating: 4.4,
    projectCount: 63,
    completedProjects: 58,
    plan: 'free',
    phone: '+90 262 323 27 08',
    email: 'info@zincirlikuyuinsaat.com',
    website: 'https://zincirlikuyuinsaat.com',
    address: 'Kartepe, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 2003,
    specialties: ['Konut', 'Villa', 'Ticari', 'Endüstriyel'],
    about:
      '2003 yılında Kocaeli’de kurulan Zincirlikuyu İnşaat; konuttan iş yerine, endüstriyel ' +
      'tesislerden restorasyona kadar farklı alanlarda 58’i aşkın projeyi tamamlamış köklü bir ' +
      'firmadır. Yenilikçi tasarımları, gelişmiş inşaat teknikleri ve sürdürülebilir yapı ' +
      'yaklaşımıyla; Kartepe, İzmit ve Başiskele’de tamamladığı Garden serisi ve Premium konut ' +
      'projeleriyle bölgeye değer katmaktadır.',
    pastProjects: [
      { name: 'Garden Kartepe', year: 2021, location: 'Kartepe, Kocaeli', type: 'Konut', imageUrl: '/projects/garden-kartepe/g1.jpg' },
      { name: 'Garden Başiskele', year: 2020, location: 'Başiskele, Kocaeli', type: 'Konut', imageUrl: '/projects/zincirlikuyu-garden-basiskele.jpg' },
    ],
  },
  {
    id: 'c5',
    name: 'Haldız İnşaat',
    taxId: '3338889990',
    rating: 4.7,
    projectCount: 40,
    completedProjects: 30,
    plan: 'enterprise',
    phone: '+90 216 470 00 00',
    email: 'info@haldizinsaat.com.tr',
    website: 'https://www.haldizinsaat.com.tr',
    address: 'Ataşehir, İstanbul',
    city: 'İstanbul',
    foundedYear: 1979,
    specialties: ['Toplu Konut', 'Ticari', 'Endüstriyel', 'Kentsel Dönüşüm', 'Altyapı'],
    about:
      'Haldız İnşaat, 1979’dan bu yana Türkiye genelinde konut, ticari, endüstriyel ve ' +
      'mühendislik projeleri gerçekleştiren köklü bir taahhüt firmasıdır. Halk GYO ve Vakıf GYO ' +
      'gibi kurumlarla yürüttüğü büyük ölçekli toplu konut projelerinin yanı sıra; Borsa İstanbul ' +
      'Finans Kampüsü, Bilişim Vadisi ve 41 Burda AVM gibi prestijli yapılara imza atmıştır. ' +
      'İstanbul, Kocaeli, Sakarya ve Hatay’da on binlerce konutu sahibiyle buluşturmuştur.',
    pastProjects: [
      { name: 'Bizimtepe Aydos Evleri', year: 2018, location: 'Sancaktepe, İstanbul', type: '1.037 Konut', imageUrl: '/projects/bizimtepe-aydos/g1.jpg' },
      { name: 'SağlıkKent Konutları', location: 'Kocaeli', type: 'Toplu Konut' },
    ],
  },
]
