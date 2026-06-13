import type { Contractor } from '@/types'

// Not: Aşağıdaki firmalar ve projeler gerçek müteahhit firmalarının kamuya açık
// tanıtım bilgilerinden derlenmiştir. Fiyat / satış / tamamlanma oranları
// platform demosu için güncel piyasaya göre temsilî olarak ayarlanmıştır.

export const contractors: Contractor[] = [
  {
    id: 'c1',
    name: 'AK Yapı',
    taxId: '1234567890',
    rating: 4.8,
    projectCount: 18,
    completedProjects: 14,
    plan: 'enterprise',
    phone: '+90 212 438 00 00',
    email: 'info@akyapi.com.tr',
    website: 'https://www.akyapi.com.tr',
    address: 'Başakşehir, İstanbul',
    city: 'İstanbul',
    foundedYear: 1997,
    specialties: ['Konut', 'Villa', 'Ofis', 'AVM', 'Lojistik'],
    about:
      'AK Yapı, inşaat ve proje geliştirme alanında çeyrek asrı aşan tecrübesiyle ' +
      'İstanbul’da konut, villa, ofis, alışveriş merkezi ile üretim ve lojistik ' +
      'projelerine imza atmaktadır. Estetik tasarımı işlevsel planlamayla ' +
      'birleştirerek; ulaşım olanakları, çevresel gelişim potansiyeli ve dengeli ' +
      'yerleşim anlayışını ön planda tutan, hem yaşanabilir hem de yatırım değeri ' +
      'yüksek yaşam alanları üretir. Başakşehir’deki Mavera serisi ve Büyükçekmece ' +
      'Big Country projeleri öne çıkan çalışmaları arasındadır.',
  },
  {
    id: 'c2',
    name: 'Zeray İnşaat',
    taxId: '9876543210',
    rating: 4.6,
    projectCount: 12,
    completedProjects: 8,
    plan: 'pro',
    phone: '+90 262 335 00 00',
    email: 'info@zeray.com.tr',
    website: 'https://www.zeray.com.tr',
    address: 'İzmit, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 2005,
    specialties: ['Rezidans', 'Konut', 'Karma Proje'],
    about:
      'Zeray İnşaat, Kocaeli’nin geleceğine yatırım yapan ileri görüşlü yönetim ' +
      'anlayışı, inşaat alanındaki uzmanlığı ve deneyimli kadrosuyla bölgede ' +
      'sektör standartlarını değiştiren, katma değeri yüksek konut projeleri üretir. ' +
      'İzmit Dora Hill, Kartepe Esil ve Başiskele Güneşi gibi geniş arazilere kurulu, ' +
      'sosyal donatıları zengin yaşam kampüsleri firmanın imza projeleridir.',
  },
  {
    id: 'c3',
    name: 'Mamikler İnşaat',
    taxId: '5556667780',
    rating: 4.5,
    projectCount: 13,
    completedProjects: 10,
    plan: 'pro',
    phone: '+90 262 341 00 00',
    email: 'info@mamikler.com.tr',
    website: 'https://www.mamikler.com.tr',
    address: 'Başiskele, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 2008,
    specialties: ['Konut', 'Rezidans', 'Karma Proje'],
    about:
      'Mamikler Grup, Kocaeli’nin İstanbul, Ankara ve Bursa’ya yakınlığını ve doğal ' +
      'güzelliğini koruyan konumunu değerlendirerek Başiskele bölgesinde yeni ve ' +
      'özel yaşam alanları geliştirir. Geniş yeşil alanlar, sosyal tesisler ve ' +
      'modern mimariyi bir araya getiren Mamik Life ve Çiçek Residence projeleriyle ' +
      'bölgede tanınan bir markadır.',
  },
  {
    id: 'c4',
    name: 'Zincirlikuyu İnşaat',
    taxId: '4441112220',
    rating: 4.4,
    projectCount: 14,
    completedProjects: 14,
    plan: 'free',
    phone: '+90 262 323 27 08',
    email: 'info@zincirlikuyuinsaat.com',
    website: 'https://zincirlikuyuinsaat.com',
    address: 'Kartepe, Kocaeli',
    city: 'Kocaeli',
    foundedYear: 2003,
    specialties: ['Konut', 'Ticari', 'Endüstriyel'],
    about:
      '2003 yılında Kocaeli’de kurulan Zincirlikuyu İnşaat; konuttan iş yerine, ' +
      'endüstriyel tesislerden restorasyona kadar farklı bölgelerde projeler ' +
      'gerçekleştiren köklü bir firmadır. Yenilikçi tasarımları, gelişmiş inşaat ' +
      'teknikleri ve sürdürülebilir yapı yaklaşımıyla; Kartepe, İzmit ve Başiskele’de ' +
      'tamamladığı Garden serisi konut projeleriyle bölgeye değer katmaktadır.',
  },
]
