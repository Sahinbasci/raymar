import { libraryImages } from './images'
import { cite } from './sources'
import type { ProductPage } from './types'

/*
 * Türkçe ürün sayfaları.
 *
 * Yazım kuralı: yalnızca doğrulanabilir, genel sektör bilgisi. Şirkete özgü
 * hiçbir teknik değer (nem oranı, kalibre, menşei, minimum sipariş, sertifika,
 * fiyat) yazılmaz — Raymar bu bilgileri paylaşmadı ve bir B2B alıcı bu
 * sayfalardaki rakamlara güvenerek sipariş verir. Bu tür ayrıntılar teklif
 * talebine yönlendirilir. Fiyat paragrafları fiyatın genel olarak neye bağlı
 * olduğunu söyler; Raymar'ın hangi biçimleri sunduğunu değil.
 *
 * Anahtar kelimeler Google otomatik tamamlama verisinden seçildi (2026-09-15):
 * "toptan ceviz içi fiyatları", "kırık ceviz içi toptan", "pirinç ceviz nedir",
 * "toptan kabak çekirdeği", "toptan pikan cevizi", "makademya fındığı" vb.
 *
 * Yazım: TDK sözlüğünde "makadamya", "makademya", "pikan" ve "pekan" yer
 * almaz; başlıklarda "makadamya" ve sitenin kullandığı "pikan cevizi" tercih
 * edilir, halk arasındaki biçimler metinde geçer. TDK "kuru yemiş" yazar;
 * sitede aranan biçim olan "kuruyemiş" bilerek korunur. "Ham madde" ayrı
 * yazılır.
 *
 * GTİP bilgisi: 6 haneli uluslararası HS kodları ABD Uyumlaştırılmış Tarife
 * Cetveli (hts.usitc.gov) üzerinden doğrulandı. 12 haneli Türk GTİP'i ulusal
 * alt kırılımlar içerdiği ve dönemsel değiştiği için yazılmaz; teyit edilmesi
 * gerektiği belirtilir. Kodlar çiğ ürün içindir; kavrulmuş ve işlenmiş ürünler
 * genellikle 20. fasılda yer alır. Kabak çekirdeği için tek ve net bir kod
 * doğrulanamadığından kod verilmez.
 */
export const productsTr: readonly ProductPage[] = [
  {
    id: 'walnut-kernels',
    slug: 'ceviz-ici',
    name: 'Ceviz İçi',
    metaTitle: 'Toptan Ceviz İçi: Yarım, Çeyrek, Kırık, Pirinç',
    metaDescription:
      'Toptan ceviz içi tedariki: yarım, çeyrek, kırık ve pirinç boylar, TS 1276 tipleri, renk sınıfları, kullanım alanları, GTİP bilgisi ve fiyat teklifi.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Ceviz İçi',
    lead: 'Ceviz içi; pastacılık, çikolata ve şekerleme, dondurma, granola ve hazır gıda üretiminde kullanılan bir kuruyemiştir. Uluslararası Kuruyemiş ve Kuru Meyve Konseyine (INC) göre 2023/24 sezonunda dünya sert kabuklu meyve üretiminin yaklaşık beşte biri cevizdi. Raymar Nuts, kurumsal alıcılara ceviz içini yarım, çeyrek, kırık ve pirinç boy seçenekleriyle toptan olarak tedarik eder.',
    image: libraryImages.walnutKernels,
    imageAlt: 'Ceviz içi — dökme, yakın çekim',
    childrenHeading: 'Boylarına Göre Ceviz İçi',
    sections: [
      {
        id: 'kaliteler',
        heading: 'Ceviz İçi Boyları: Yarım, Çeyrek, Kırık ve Pirinç',
        paragraphs: [
          'Ceviz içi, kabuğundan ayrıldıktan sonra eleklerden geçirilerek parça büyüklüğüne göre ayrılır. Dış ticarette ticari kalite denetiminde esas alınan Türk Standardı TS 1276, ceviz içini büyüklüğüne göre yarım, çeyrek, büyük, kırık (pirinç), küçük ve “yarım ve büyük” olmak üzere altı tipe ayırır. ABD standardı “halves”, “pieces and halves”, “pieces” ve “small pieces” sınıflarını; UNECE’nin DDP-02 standardı ise “halves”, “quarters”, “large pieces” ve “broken pieces” gibi adları kullanır.',
          'Raymar Nuts’ın ürün listesindeki dört boy yarımdan pirince doğru küçülür. Standarttaki karşılıkları aşağıdadır; “kırık” adının standartta pirinç boyu ifade ettiğine dikkat edin:',
        ],
        list: [
          'Yarım ceviz içi: Ceviz içinin yaklaşık eşit iki parçaya ayrılmış hâlidir (TS 1276: yarım). Görünümün öne çıktığı ürünlerde, süslemede ve çerezlik ürünlerde tercih edilir.',
          'Çeyrek ceviz içi: Ceviz içinin uzunlamasına yaklaşık eşit dört parçaya ayrılmış hâlidir (TS 1276: çeyrek). Kek, kurabiye ve fırın ürünlerinde iri ceviz dokusu için kullanılır.',
          'Kırık ceviz içi: Çeyrekten küçük, pirinçten iri, düzensiz parçalardır (TS 1276: büyük). Hamur işi, çikolata ve dondurma gibi cevizin bütün görünmesinin gerekmediği ürünlerde kullanılır.',
          'Pirinç ceviz içi: 8 mm’lik elekten geçip 3 mm’lik elekte kalan en küçük parçalardır (TS 1276: kırık (pirinç)). Baklava, kadayıf, iç harç ve karışımlarda cevizin eşit dağılmasını sağlar.',
        ],
      },
      {
        heading: 'Renk Sınıfları',
        paragraphs: [
          'Ceviz içi boyunun yanında zarının rengine göre de sınıflandırılır. ABD Tarım Bakanlığı (USDA) standardı rengi, USDA ceviz renk kartelasına göre açıktan koyuya Extra Light, Light, Light Amber ve Amber sınıflarıyla tanımlar; kırmızı zarlı çeşitler için ayrıca “red” tanımı vardır. TS 1276 ise renk koşulunu kalite sınıflarına bağlar: Ekstra sınıftaki içlerin her yeri açık renkli olmalı, Sınıf I açık kahverengi veya limon sarısından, Sınıf II koyu kahverenginden koyu olmamalıdır.',
          'California Walnuts, Light sınıfı içleri hafif aromalı ve tanen etkisi belirsiz, Light Amber içleri ise daha yoğun aromalı ve daha ekonomik bir seçenek olarak tanımlar. Görünümün önemli olduğu ürünlerde açık sınıflar, iç harç veya karışım gibi rengin ön planda olmadığı kullanımlarda daha koyu sınıflar değerlendirilebilir.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Ceviz içi hem ürünün üzerinde görünen bir malzeme hem de reçeteye karışarak tat veren bir bileşen olarak kullanılır. Başlıca kullanım alanları şunlardır:',
        ],
        list: [
          'Pastane ve fırın ürünleri: kek, kurabiye, ekmek ve tart',
          'Baklava, kadayıf ve şerbetli tatlılar',
          'Çikolata, şekerleme ve bar ürünleri',
          'Dondurma ve soğuk tatlılar',
          'Granola, müsli ve kahvaltılık karışımlar',
          'Muhammara gibi mezeler ve soslar',
          'Çerezlik ürünler ve kuruyemiş karışımları',
        ],
      },
      {
        heading: 'Depolama ve Raf Ömrü',
        paragraphs: [
          'Ceviz yağının yaklaşık yüzde 72’si çoklu doymamış yağdır; bu oran çoğu kuruyemişten yüksektir ve ceviz içini oksidasyona açık hâle getirir. Isı ve ışık oksidasyonu hızlandırır. Ceviz içi serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda ve güçlü kokulardan uzakta saklanmalıdır; ceviz, uzun süre maruz kaldığı kokuları alabilir.',
          'TS 1276, uzun süre bekletilecek ceviz içinin bağıl nemi yüzde 50’nin altındaki soğuk hava depolarına konulmasını ister. California Walnuts, soğuk depolamanın acılaşmayı ve iç renginin koyulaşmasını sınırladığını belirtir ve açılan ambalajın buzdolabında saklanmasını önerir.',
        ],
      },
      {
        id: 'gtip',
        heading: 'Ceviz İçi GTİP ve HS Kodu',
        paragraphs: [
          'Uluslararası Armonize Sistem’de (HS) ceviz, 0802 pozisyonu altında sınıflandırılır. Kabuklu ceviz 0802.31, kabuğu çıkarılmış ceviz içi ise 0802.32 alt pozisyonundadır. Kavrulmuş, tuzlanmış ya da başka şekilde işlenmiş ürünler ise genellikle 20. fasılda yer alır.',
          'Türk Gümrük Tarife Cetveli’ndeki 12 haneli GTİP kodunun ilk 6 hanesi Armonize Sistem kodudur; 7 ve 8. haneler Avrupa Birliğinin Kombine Nomenklatürünü, sonraki haneler ulusal pozisyonları gösterir. Beyanname öncesinde güncel tarife cetvelinden veya gümrük müşavirinizden teyit edilmesi gerekir.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan ceviz içi fiyatları; boy, renk sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyaç duyduğunuz boyu, yaklaşık miktarı ve teslim beklentinizi teklif formu üzerinden paylaşın; ekibimiz size uygun seçeneklerle dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Toptan ceviz içi hangi boylarda satılır?',
        answer:
          'Raymar Nuts ceviz içini yarım, çeyrek, kırık ve pirinç olmak üzere dört boyda tedarik eder. Türk Standardı TS 1276 ise yarım, çeyrek, büyük, kırık (pirinç), küçük ve “yarım ve büyük” olmak üzere altı tip tanımlar; standarttaki “kırık (pirinç)”, 8 mm’lik elekten geçip 3 mm’lik elekte kalan en ince fraksiyondur ve bu listedeki “pirinç” boyuna karşılık gelir; Raymar Nuts’ın “kırık” dediği boy ise standartta “büyük” tipidir.',
      },
      {
        question: 'Kırık ceviz içi ile yarım ceviz içi arasındaki fark nedir?',
        answer:
          'Temel fark parça büyüklüğüdür; TS 1276 ve UNECE standardında kalite sınıfı (Ekstra, Sınıf I, Sınıf II) boydan ayrı belirlenir. Yarım ceviz içi cevizin göründüğü ürünlerde, kırık ceviz içi hamur işi, dolgu ve dondurmada kullanılır; küçük parçalar bütün içlere göre daha kısa sürede bozulur.',
      },
      {
        question: 'Pirinç ceviz nedir?',
        answer:
          'Pirinç ceviz, ceviz içinin en küçük boyudur; TS 1276’da “kırık (pirinç)” adıyla, 8 mm’lik elekten geçen ancak 3 mm’lik elekte kalan parçalar olarak tanımlanır. Baklava, kadayıf, iç harç ve karışımlarda kullanılır.',
      },
      {
        question: 'Ceviz içinin GTİP kodu nedir?',
        answer:
          'Kabuğu çıkarılmış ceviz içi Armonize Sistem’de 0802.32 alt pozisyonunda yer alır; kabuklu ceviz ise 0802.31’dir. 12 haneli Türk GTİP kodunun güncel tarife cetvelinden teyit edilmesi gerekir.',
      },
      {
        question: 'Ceviz içi nasıl saklanmalıdır?',
        answer:
          'Serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda ve kokulu maddelerden uzakta saklanmalıdır. TS 1276, uzun süre bekletilecek ceviz içinin bağıl nemi yüzde 50’nin altındaki soğuk hava depolarında tutulmasını ister.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwHandlingStorage',
      'incYearbook2024',
      'wikiWalnut',
      'ukTariff0802',
      'tariffFaq',
    ),
    relatedGuides: [
      'walnut-kernel-grades',
      'walnut-colour-grades',
      'storing-walnut-kernels',
      'walnut-kernel-defects',
      'walnut-harvest-season',
    ],
  },
  {
    id: 'pumpkin-seed-kernels',
    slug: 'kabak-cekirdegi-ici',
    name: 'Kabak Çekirdeği İçi',
    metaTitle: 'Toptan Kabak Çekirdeği İçi',
    metaDescription:
      'Toptan kabak çekirdeği içi: kabuğu ayrılan ve doğal kabuksuz çeşitler, fırıncılıkta ve çerezde kullanımı, spesifikasyonda tanımlanan başlıklar, depolama.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Kabak Çekirdeği İçi',
    lead: 'Kabak çekirdeği içi, fırın ürünlerinde ve çerez olarak yaygın biçimde kullanılan yeşil renkli bir ham maddedir. Raymar Nuts, kabak çekirdeği içini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.pumpkin,
    imageAlt: 'Kabak çekirdeği içi — yeşil, kabuksuz, dökme',
    sections: [
      {
        heading: 'Kabak Çekirdeği İçi Nedir?',
        paragraphs: [
          'Kabak çekirdeği içi, kabak çekirdeğinin yenilebilir kısmıdır. Çekirdekler genellikle beyaz bir dış kabukla kaplıdır; kabuk ayrıldığında iç açık yeşil renktedir. Bazı kabak çeşitleri ise sert kabuksuz çekirdek verir ve yalnızca bu yenilebilir çekirdeği için yetiştirilir.',
          'Ayrım işlemeyi de belirler: kalın ve deri gibi tohum kabuğunun mekanik olarak ayrılması gerekir, kabuksuz çeşitlerde ise bu işçilik gerektiren kabuk ayırma (dekortikasyon) adımına gerek kalmaz.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Kabak çekirdeği içi hem görünür bir malzeme hem de bileşen olarak kullanılır:',
        ],
        list: [
          'Ekmek ve unlu mamuller',
          'Kavrulmuş ve baharatlanmış çerezler',
          'Meksika mutfağında geleneksel yemekler',
          'Kabak çekirdeği yağı üretimi',
        ],
      },
      {
        heading: 'Toptan Alımda Kalite Kriterleri',
        paragraphs: [
          'Kabak çekirdeği içinde kalite başlıkları alıcı ile tedarikçi arasında ürün spesifikasyonunda tanımlanır. Benzer bir üründe — ay çekirdeği içinde — ABD Ulusal Ayçiçeği Birliğinin yayımladığı spesifikasyon; tane büyüklüğü, kabuk ve kabuğu ayrılmamış tane dâhil yabancı madde, nem, hasarlı tane, kırık ve parça oranı ile renk, koku ve tat başlıklarını sıralar. Kabak çekirdeği içinde de değerlendirilecek başlıkların spesifikasyonda bu ayrıntıda tanımlanması, teslimatta anlaşmazlığı önler.',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Kabak çekirdeği içi yağca zengindir: kurutulmuş ve kavrulmuş çekirdeğin yaklaşık yüzde 49’u yağdır. Isı ve ışık yağların oksijenle tepkime hızını artırdığından ürün serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanmalıdır.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan kabak çekirdeği içi fiyatları tip, kalite, miktar, ambalaj ve teslim koşuluna göre belirlenir. İhtiyacınızı teklif formunda paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Kabak çekirdeği içi çiğ mi, kavrulmuş mu satılır?',
        answer:
          'İkisi de ticarete konudur. ABD gümrük idaresinin sınıflandırma kararlarında hem çiğ ve kabuğu ayrılmış kabak çekirdeği içi hem de kavrulmuş kabak çekirdeği yer alır; hangisinin seçileceği son üründe uygulanacak işleme bağlıdır.',
      },
      {
        question: 'Kabuksuz kabak çekirdeği ne demek?',
        answer:
          'Bazı kabak çeşitleri sert kabuksuz çekirdek verir ve yalnızca yenilebilir çekirdeği için yetiştirilir. Bu çeşitlerde kabuk ayırma işlemi gerekmez; kalın kabuklu çekirdeklerde ise kabuk mekanik olarak ayrılır.',
      },
      {
        question: 'Kabak çekirdeği içi nasıl saklanır?',
        answer:
          'Serin, kuru ve ışık almayan bir ortamda, hava geçirmez ambalajda saklanmalıdır. Isı ve ışık, yağın oksijenle tepkimesini hızlandırarak acılaşmaya yol açar.',
      },
    ],
    sources: cite(
      'tr',
      'wikiPumpkinSeed',
      'pumpkinHullless',
      'nsaKernelSpec',
      'wikiRancidification',
      'cbpHulledPumpkinSeeds',
      'cbpRoastedPumpkinSeeds',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'nut-export-documents'],
  },
  {
    id: 'sunflower-kernels',
    slug: 'ay-cekirdegi-ici',
    name: 'Ay Çekirdeği İçi',
    metaTitle: 'Toptan Ay Çekirdeği İçi',
    metaDescription:
      'Toptan ay çekirdeği içi: çerezlik ve yağlık tiplerin farkı, spesifikasyonda tanımlanan kalite başlıkları, kullanım alanları, GTİP 1206.00 ve fiyat teklifi.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Ay Çekirdeği İçi',
    lead: 'Ay çekirdeği içi, kabuğu ayrılmış ay çekirdeğidir; çiğ ya da kavrulmuş olarak satılır, ekmek ve diğer fırın ürünlerinde ve çerez karışımlarında kullanılır. Raymar Nuts, ay çekirdeği içini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.sunflowerKernels,
    imageAlt: 'Ay çekirdeği içi — kabuğu ayrılmış, dökme',
    sections: [
      {
        heading: 'Ay Çekirdeği İçi Nedir?',
        paragraphs: [
          'Ay çekirdeğinin kabuğu ayrıldığında geriye kalan yenilebilir kısma ay çekirdeği içi denir. Mekanik olarak kabuğu ayrılmış içler çiğ ya da kavrulmuş satılır; ekmek ve diğer fırın ürünlerine tadı için katılır.',
          'Çekirdekler kabuk desenine göre ayrılır: kabuğu düz siyah olanlar yağlık (black oil) tiplerdir ve çoğunlukla yağı çıkarılmak üzere preslenir. Çizgili taneler ise başlıca çerez olarak tüketildiği için çerezlik (confectionery) olarak anılır.',
        ],
      },
      {
        heading: 'Çerezlik ve Yağlık Tiplerden Elde Edilen İç',
        paragraphs: [
          'Kabuk ayırma her iki tipe de uygulanır. NDSU’nun ayçiçeği üretim rehberine göre yağlık çeşitlerin ince kabuğu içe yapışıktır ve tanede yüzde 38–50 yağ bulunur; çerezlik çeşitlerde ise kalınca kabuk içe gevşek bağlıdır, bu da kabuğun daha eksiksiz ayrılmasını sağlar. Çerezlik tiplerin tanesi daha iri, yağ oranı ve hektolitre ağırlığı daha düşüktür.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: ['Ay çekirdeği içi başlıca şu ürünlerde kullanılır:'],
        list: [
          'Ekmek ve unlu mamuller',
          'Çerez ve karışık kuruyemiş paketleri',
          'Salata ve yemek üzerine serpme',
          'Kavrulmuş ve tuzlanmış atıştırmalıklar',
        ],
      },
      {
        heading: 'Toptan Alımda Kalite Kriterleri',
        paragraphs: [
          'ABD Ulusal Ayçiçeği Birliğinin yayımladığı ay çekirdeği içi spesifikasyonu, alıcının hangi başlıkları tanımladığını gösterir:',
          'Aynı belge tadı “iyi, tipik, yumuşak”, kokuyu “temiz ve taze”, rengi ise kırık beyaz–gri olarak tanımlar.',
        ],
        list: [
          'Boy: bir onstaki, yani yaklaşık 28 gramdaki tane sayısı',
          'Yabancı madde: kabuk ve kabuğu ayrılmamış tane dâhil',
          'Nem: en çok yüzde 8',
          'Hasarlı tane: belirgin renk değişimi veya böcek hasarı',
          'Kırık ve parça: yarım taneden küçük taneler',
          'Kabuk parçası yapışık kalmış taneler',
        ],
      },
      {
        heading: 'Depolama ve GTİP',
        paragraphs: [
          'Kurutulmuş ay çekirdeğinin yaklaşık yüzde 51’i yağdır; ısı ve ışık bu yağın oksijenle tepkimesini hızlandırır. İç, serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanmalıdır.',
          'Armonize Sistem’in 2022 sürümünde 12.06 pozisyonu “kırılmış olsun olmasın ayçiçeği tohumu” olarak tanımlanır ve tek alt pozisyonu 1206.00’dır. Kavrulmuş, tuzlanmış veya başka şekilde hazırlanmış çekirdekler 20.08 pozisyonuna girer; ABD gümrüğü kavrulmuş ve tuzlanmış kabuklu ay çekirdeğini 2008.19 altında sınıflandırmıştır. 12 haneli Türk GTİP kodu güncel tarife cetvelinden teyit edilmeli, bağlayıcı bir sonuç için Bağlayıcı Tarife Bilgisi (BTB) başvurusu yapılmalıdır.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan ay çekirdeği içi fiyatları kalite, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyacınızı teklif formu üzerinden paylaşın; ekibimiz size uygun seçeneklerle dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Çerezlik ve yağlık ay çekirdeği arasındaki fark nedir?',
        answer:
          'Kabuğu düz siyah olan yağlık tipler başlıca yağ üretimi için preslenir; çizgili kabuklu çerezlik tipler doğrudan tüketim içindir. NDSU’ya göre yağlık çeşitlerde tanenin yağ oranı yüzde 38–50 arasındadır, çerezlik çeşitlerin tanesi daha iri ve yağ oranı daha düşüktür. Kabuğu ayrılmış iç her iki tipten de elde edilebilir.',
      },
      {
        question: 'Ay çekirdeği içi hangi ürünlerde kullanılır?',
        answer:
          'Mekanik olarak kabuğu ayrılmış içler çiğ ya da kavrulmuş satılır; ekmek ve diğer fırın ürünlerinde, çerez karışımlarında, salata ve yemek üzerinde kullanılır.',
      },
      {
        question: 'Ay çekirdeğinin GTİP kodu nedir?',
        answer:
          'Çiğ ay çekirdeği, kırılmış olsun olmasın, Armonize Sistem’de 1206.00 alt pozisyonundadır. Kavrulmuş veya tuzlanmış çekirdekler 20.08 pozisyonunda değerlendirilir. 12 haneli Türk GTİP kodu için güncel tarife cetveline bakılmalı, bağlayıcı sonuç için BTB başvurusu yapılmalıdır.',
      },
    ],
    sources: cite(
      'tr',
      'wikiSunflowerSeed',
      'ndsuSunflowerGuide',
      'nsaKernelSpec',
      'wcoHs2022Ch12',
      'wcoHs2022Ch20',
      'cbpRoastedSunflowerSeeds',
      'tariffFaq',
      'wikiRancidification',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'nut-export-documents'],
  },
  {
    id: 'in-shell-sunflower-seeds',
    slug: 'cerezlik-ay-cekirdegi',
    name: 'Çerezlik Ay Çekirdeği',
    metaTitle: 'Toptan Çerezlik Ay Çekirdeği',
    metaDescription:
      'Toptan çerezlik ay çekirdeği: kabuklu çerezlik çeşitlerin özellikleri, Türkiye’de aranan tane tipleri, kavurma ve paketleme yapan alıcılar, depolama.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Çerezlik Ay Çekirdeği',
    lead: 'Çerezlik ay çekirdeği Türkiye’de yoğun olarak tüketilen bir çerezdir; kabuklu olarak kavrulur, sade, tuzlu ya da aromalı satılır. Raymar Nuts, çerezlik ay çekirdeğini perakende ve toptan dağıtım yapan kurumsal alıcılara tedarik eder.',
    image: libraryImages.sunflowerInShell,
    imageAlt: 'Çerezlik ay çekirdeği — kabuklu, dökme',
    sections: [
      {
        heading: 'Çerezlik Ay Çekirdeği Nedir?',
        paragraphs: [
          'Çerezlik ay çekirdeği, doğrudan tüketim için yetiştirilen iri taneli çeşitlerden elde edilir. NDSU’nun üretim rehberine göre bu çeşitlerin üretimi kabuklu (“in-shell”) pazara göre planlanır, üreticiye çoğu zaman iri tane oranına göre ödeme yapılır ve çerezlik ayçiçeğinde kalite standartları yüksektir: renk bozukluğuna ve böcek hasarına çok az tolerans tanınır.',
          'Trakya Tarımsal Araştırma Enstitüsünün yayımladığı değerlendirmede çerezlik tiplerin yağlık tiplere göre daha iri ve uzun taneli olduğu, kabuk oranının daha yüksek, yağ oranının ise yüzde 25–35 dolayında olduğu belirtilir. Aynı yazıya göre Türkiye piyasasında gri-beyaz alacalı tipler daha çok aranırken Balkan ülkelerinde siyah, orta irilikteki tane tipleri tercih edilmektedir.',
        ],
      },
      {
        heading: 'Kimler İçin?',
        paragraphs: [
          'Toptan çerezlik ay çekirdeği başlıca şu alıcılar tarafından tercih edilir:',
        ],
        list: [
          'Kuruyemiş üreticileri ve kavurma tesisleri',
          'Perakende paketleme yapan firmalar',
          'Toptan kuruyemiş dağıtıcıları',
          'Zincir marketlere ve satış noktalarına tedarik yapan işletmeler',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Kabuklu çekirdek, kabuğu ayrılmış içe göre dış etkilere daha dayanıklıdır; yine de serin, kuru ve havalandırılan bir ortamda, doğrudan güneş ışığından ve nemden uzak tutulmalıdır. NDSU, depoda tane sıcaklığını denetlemek için havalandırmanın şart olduğunu, çekirdeğin soğutulmasının böcek ve küf kaynaklı bozulmayı azalttığını belirtir; aynı rehbere göre çerezlik ayçiçeği kışın yüzde 11, yazın yüzde 10’un üzerinde nemle depolanmamalıdır.',
          'Kabuğu kırılmış ya da olgunlaşmamış tane oranı yüksek partiler depoda daha çabuk bozulur. Kavrulmuş üründe tazeliğin korunmasına hava geçirmez ambalaj yardımcı olur.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan çerezlik ay çekirdeği fiyatları tane büyüklüğü, miktar ve ambalaja göre belirlenir. İhtiyacınızı teklif formunda paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Çerezlik ay çekirdeği ile ay çekirdeği içi aynı mı?',
        answer:
          'Hayır. Çerezlik ay çekirdeği kabuklu olarak, genellikle kavrulmuş hâlde tüketilir; kabuk dişle kırılır. Ay çekirdeği içi ise kabuğu ayrılmış üründür, çiğ ya da kavrulmuş satılır ve ekmek gibi fırın ürünlerinde de kullanılır.',
      },
      {
        question: 'Çerezlik ay çekirdeği nasıl saklanır?',
        answer:
          'Serin, kuru ve havalandırılan bir ortamda, güneş ışığından uzakta saklanmalıdır. NDSU’ya göre depoda havalandırma şarttır ve soğutma bozulmayı azaltır; kavrulmuş ürün için hava geçirmez ambalaj tazeliğin korunmasına yardımcı olur.',
      },
    ],
    sources: cite(
      'tr',
      'ttaeConfectionerySunflower',
      'ndsuSunflowerGuide',
      'wikiSunflowerSeed',
      'wikiRancidification',
    ),
    relatedGuides: ['buying-nuts-wholesale'],
  },
  {
    id: 'macadamia',
    slug: 'makadamya',
    name: 'Makadamya',
    metaTitle: 'Toptan Makadamya (Makademya Fındığı)',
    metaDescription:
      'Toptan makadamya: Style 0–8 iç sınıfları, kullanım alanları, saklama sıcaklığı, fındıkla neden akraba olmadığı, GTİP 0802.62 ve fiyat teklifi.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Makadamya',
    lead: 'Makadamya, Türkçede makademya fındığı olarak da anılan; krem rengi ve yumuşak, tereyağımsı tadıyla çikolata, fırın ürünleri, dondurma ve çerez karışımlarında kullanılan bir kuruyemiştir. Raymar Nuts, makadamyayı kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.macadamia,
    imageAlt: 'Kabuklu makadamyalar ve kabuğu kırılmış, krem rengi makadamya içleri',
    sections: [
      {
        heading: 'Makadamya Nedir?',
        paragraphs: [
          'Macadamia, Proteaceae familyasından dört ağaç türünü kapsayan bir cinstir ve Avustralya’ya — kuzeydoğu Yeni Güney Galler ile orta ve güneydoğu Queensland’e — özgüdür; meyvesi için ticari olarak iki türü yetiştirilir. Kabuğu çok serttir: sıradan bir cevizkıracağı yetmez, ticari ölçekte kabuk ayırmada dönen çelik merdaneler kullanılır. Bu nedenle gıda üretimine ürün çoğunlukla iç olarak girer; örneğin Avustralya’da hasadın büyük bölümü işleyicilerde kırılıp iç olarak satılır.',
          'Türkçede sıkça “makademya fındığı” denir. Makadamya Proteaceae familyasından, fındık (Corylus) ise huşgiller (Betulaceae) familyasındandır; iki bitki yakın akraba değildir.',
        ],
      },
      {
        heading: 'İç Sınıfları: Style 0–8',
        paragraphs: [
          'Makadamya içi, numaralanmış sınıflarla (“style”) ticarete konu olur. Avustralya Makadamya Derneğinin kalite standardında her sınıf, en az bütün ya da yarım tane oranını ve milimetre cinsinden bir boy aralığını birlikte tanımlar:',
          'Tanımlar kuruluşlar arasında küçük farklar gösterir: ABD’deki Association of Food Industries’in makadamya spesifikasyonunda Style 1 16–20 mm, Style 8 ise “fines or meal” olarak tanımlanır. Bu nedenle sınıf tanımı sipariş spesifikasyonunda teyit edilmelidir; sınıfların tam listesi makadamya iç sınıfları rehberimizde.',
        ],
        list: [
          'Style 0 — en az yüzde 95 bütün tane, 20 mm üzeri',
          'Style 1 — en az yüzde 90 bütün tane, 17–20 mm',
          'Style 2 — en az yüzde 50 bütün tane, 13 mm üzeri',
          'Style 4L — en az yüzde 80 yarım tane, 13 mm üzeri',
          'Style 5, 6 ve 7 — sırasıyla 8–12, 5–9 ve 3–6 mm parçalar',
          'Style 8 — 4 mm’nin altındaki parça ve un',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Avustralya makadamya endüstrisinin yayımladığı önerilen kullanım tablosu, sınıfları uygulamalara şöyle eşler:',
        ],
        list: [
          'Çerezlik: bütün ve iri yarım taneler (Style 0–4L)',
          'Çikolata ve şekerleme: bütün taneden parçaya geniş aralık (Style 1–6) ve ezme',
          'Fırın ürünleri: yarım tane, parça ve un (Style 4L–8) ile ezme',
          'Dondurma ve tatlılar: parçalar (Style 5–7) ve ezme',
        ],
      },
      {
        heading: 'Depolama ve GTİP',
        paragraphs: [
          'Yağ oranı yüksek olduğundan makadamya içi ısı, ışık ve oksijenden etkilenir. Avustralya Makadamya Derneği, makadamya içinin uygun ambalajda 12 °C’nin altında saklanmasını önerir; AFI spesifikasyonu ise 5–10 °C, en çok yüzde 1,8 nem ve oksijensiz ortam koşulunda 24 aya kadar tazelik süresinden söz eder.',
          'Armonize Sistem’in 2022 sürümünde kabuklu makadamya 0802.61, kabuğu çıkarılmış makadamya içi 0802.62 alt pozisyonundadır. Kavrulmuş, tuzlanmış veya başka şekilde hazırlanmış makadamya ise 20.08 pozisyonunda (2008.19) yer alır. 12 haneli Türk GTİP kodu güncel tarife cetvelinden teyit edilmeli, bağlayıcı sonuç için Bağlayıcı Tarife Bilgisi (BTB) başvurusu yapılmalıdır.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan makadamya fiyatları iç sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyacınızı teklif formu üzerinden paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Makademya fındığı ile fındık aynı şey mi?',
        answer:
          'Hayır. Makadamya (makademya) Avustralya kökenlidir ve Proteaceae familyasındandır; fındık (Corylus) ise huşgiller (Betulaceae) familyasında yer alır. İki bitki yakın akraba değildir.',
      },
      {
        question: 'Makadamya hangi ürünlerde kullanılır?',
        answer:
          'Avustralya makadamya endüstrisinin kullanım tablosuna göre bütün ve iri yarım taneler çerezlikte, yarım tane ile parçalar fırın ürünlerinde, parçalar dondurma ve tatlılarda kullanılır; çikolata ve şekerlemede bütün taneden parçaya kadar geniş bir aralık tercih edilir.',
      },
      {
        question: 'Makadamya içinin GTİP kodu nedir?',
        answer:
          'Çiğ (kavrulmamış) makadamya içi Armonize Sistem’de 0802.62, kabuklu makadamya 0802.61 alt pozisyonundadır; kavrulmuş veya hazırlanmış ürün 2008.19 altında değerlendirilir. 12 haneli Türk GTİP kodu güncel tarife cetvelinden teyit edilmelidir.',
      },
    ],
    sources: cite(
      'tr',
      'amsKernelStandard',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'wikiMacadamia',
      'vikipediMacadamia',
      'wikiHazel',
      'wcoHs2022Ch08',
      'wcoHs2022Ch20',
      'tariffFaq',
    ),
    relatedGuides: [
      'what-is-macadamia',
      'macadamia-kernel-styles',
      'buying-nuts-wholesale',
    ],
  },
  {
    id: 'pecans',
    slug: 'pikan-cevizi',
    name: 'Pikan Cevizi',
    metaTitle: 'Toptan Pikan Cevizi (Pekan Cevizi)',
    metaDescription:
      'Toptan pikan cevizi: pekan cevizinin özellikleri, ABD standardındaki boy ve renk sınıfları, kullanım alanları, depolama süreleri ve fiyat teklifi.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Pikan Cevizi',
    lead: 'Pikan cevizi (pekan cevizi), zengin ve tereyağımsı tadıyla başta pikan turtası olmak üzere pastacılık ve şekerlemede kullanılan bir kuruyemiştir. Raymar Nuts, pikan cevizini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.pecan,
    imageAlt: 'Pikan cevizi — kabuklu ve iç, yakın çekim',
    sections: [
      {
        heading: 'Pikan Cevizi Nedir?',
        paragraphs: [
          'Pikan cevizi (Carya illinoinensis), Mississippi Nehri havzasında ABD’nin güneyi ile kuzey Meksika’ya özgü bir hikori türüdür. Meyvesi kahverengi, silindirik ve ince kabukludur; dört kanatlı bir dış kabuk içinde gelişir. İçi iki yarımdan oluşur.',
          'INC’nin 2024 yıllığına göre 2023/24 sezonunda dünya pikan üretiminde Meksika yüzde 44, ABD yüzde 43 pay almıştır; Güney Afrika yüzde 7 ile üçüncü sıradadır.',
        ],
      },
      {
        heading: 'Cevizden Farkları',
        paragraphs: [
          'Pikan cevizi, cevizle aynı familyadandır (cevizgiller, Juglandaceae) ancak ayrı bir cinse, hikorileri kapsayan Carya’ya aittir; ceviz Juglans cinsindendir. Pikanın meyvesi ince kabuklu ve uzunca, ceviz kabuğu ise kırışık yüzeylidir. İki kuruyemişin ayrıntılı karşılaştırması için pikan cevizi ile ceviz arasındaki farkları anlatan rehberimize bakabilirsiniz.',
        ],
      },
      {
        heading: 'Boy ve Renk Sınıfları',
        paragraphs: [
          'ABD’nin kabuğu çıkarılmış pikan standardı, yarım içleri bir librede (454 g) kaç tane olduğuna göre sınıflandırır: Mammoth 250 ve altı, Junior Mammoth 251–350, Jumbo 351–450, Large 451–550, Medium 551–650, Topper 651–750, King Topper 751 ve üzeri. Boy, sınıf adı yerine doğrudan tane sayısı ya da tane sayısı aralığı olarak da belirtilebilir.',
          'Aynı standart iç rengini dört sınıfta tanımlar: Light, Light Amber, Amber ve Dark Amber. Renk yoğunlukları USDA’nın PEC-MC-1 renk standardındaki “golden”, “light brown”, “medium brown” ve “dark brown” tonlarına dayanır.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: ['Pikan cevizi başlıca şu ürünlerde kullanılır:'],
        list: [
          'Pikan turtası, kek ve kurabiye',
          'Pralin ve şekerleme',
          'Dondurma ve soğuk tatlılar',
          'Çerez ve karışık kuruyemiş paketleri',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'New Mexico Eyalet Üniversitesinin depolama rehberine göre iyi kalite bir pikan içinin yüzde 73–75’i yağdır; bu nedenle sıcakta acılaşma pek çok kuruyemişten daha belirgindir. Aynı rehberdeki tabloda kabuğu çıkarılmış pikan yaklaşık 21 °C’de 3 ay, 0–2 °C’de 12 ay, −18 °C’de 24–60 ay dayanır; parça hâlindeki iç, bütün yarımlardan daha kısa sürede bozulur.',
          'Pikan içi ortamdaki kokuları çabuk aldığından depo kokusuz olmalı, ürün nem ve koku geçirmeyen ambalajda tutulmalıdır. Uzun süreli stok için soğuk hava deposu tercih edilir.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan pikan cevizi fiyatları ürünün biçimine, iç boyuna, miktara ve teslim koşuluna göre değişir. İhtiyacınızı teklif formunda paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Pikan cevizi ile pekan cevizi aynı mı?',
        answer:
          'Evet. Türkçede bu kuruyemiş için hem “pikan” hem “pekan” yazımı kullanılır; iki biçim de Türk Dil Kurumunun Güncel Türkçe Sözlük’ünde yer almaz. Türkçe Vikipedi “pekan cevizi” adını kullanır; bilimsel adı Carya illinoinensis’tir.',
      },
      {
        question: 'Pikan cevizi ile ceviz arasındaki fark nedir?',
        answer:
          'Pikan cevizi Kuzey Amerika kökenlidir; cevizle aynı familyadan (cevizgiller) olsa da ayrı bir cinse, Carya’ya aittir. Meyvesi ince kabuklu ve uzuncadır, ceviz kabuğu ise kırışık yüzeylidir.',
      },
      {
        question: 'Pikan cevizi en çok nerede kullanılır?',
        answer:
          'Başta pikan turtası olmak üzere kek ve kurabiyede, pralin ve şekerlemede, dondurmada ve çerez karışımlarında kullanılır.',
      },
    ],
    sources: cite(
      'tr',
      'wikiPecan',
      'vikipediPekan',
      'feisPecan',
      'usdaShelledPecans',
      'incYearbook2024',
      'nmsuStoringPecans',
      'ucanrNutSafety',
    ),
    relatedGuides: ['pecan-vs-walnut', 'buying-nuts-wholesale'],
  },
  {
    id: 'pistachios',
    slug: 'antep-fistigi',
    name: 'Antep Fıstığı',
    metaTitle: 'Toptan Antep Fıstığı ve Antep Fıstığı İçi',
    metaDescription:
      'Toptan Antep fıstığı: kabuklu fıstık, iç ve erken hasat boz iç, coğrafi işaret tescili, kullanım alanları, GTİP 0802.52 ve fiyat teklifi.',
    eyebrow: 'Ürünler',
    heading: 'Toptan Antep Fıstığı',
    lead: 'Antep fıstığı, baklavadan dondurmaya pek çok tatlıda kullanılan bir kuruyemiştir; en koyu yeşil iç, erken hasat edilen “boz” fıstıktan elde edilir. Raymar Nuts, Antep fıstığını kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.pistachio,
    imageAlt: 'Antep fıstığı içi — yeşil, dökme',
    sections: [
      {
        heading: 'Antep Fıstığı Nedir?',
        paragraphs: [
          'Antep fıstığı adını Antep’ten, yani bugünkü Gaziantep’ten alır: şehir Türkçeye “Antep fıstığı” adını vermiştir ve Türkiye’deki fıstık işlemenin yaklaşık yüzde 80’i burada yapılır.',
          'USDA’nın Türkiye raporuna göre üretim büyük ölçüde iki ilde toplanır; Gaziantep ve Şanlıurfa ülke üretiminin yüzde 80’ini karşılar. Türkiye’de yetişen başlıca iki tip Antep ve Siirt’tir; rapor bu iki tipin İran ve ABD’de yetişen fıstıklardan boy ve şekil bakımından ayrıldığını, Antep tipinin İran fıstığına göre daha ince ve küçük olduğunu aktarır.',
        ],
      },
      {
        heading: 'Coğrafi İşaret Tescili',
        paragraphs: [
          '“Antep Fıstığı”, Türk Patent ve Marka Kurumunda 27 numarayla tescilli bir menşe adıdır; tescil ettiren Gaziantep Ticaret Odasıdır. Tescil belgesine göre coğrafi işaret 22.04.2000 tarihli ve 24028 sayılı Resmî Gazete’de ilan edilmiş, aynı tarihten geçerli olmak üzere tescil edilmiştir; kullanım biçimi markalamadır.',
          'Belgede çeşitler Uzun, Kırmızı, Halebi ve Ohadi olarak sayılır ve iç meyve rengi çeşide göre yeşil-güliçten sarıya kadar değişir. 03.02.2025 tarihli ve 190 sayılı Bültende yayımlanan değişiklikle coğrafi sınır 22 ili kapsar: Adıyaman, Antalya, Aydın, Balıkesir, Batman, Çanakkale, Denizli, Diyarbakır, Gaziantep, Hakkâri, Hatay, Kahramanmaraş, Kilis, Malatya, Manisa, Mardin, Mersin, Muğla, Siirt, Şanlıurfa, Şırnak ve Tunceli.',
        ],
      },
      {
        heading: 'Kabuklu, İç ve Boz İç',
        paragraphs: ['Antep fıstığı ticarette farklı biçimlerde alınıp satılır:'],
        list: [
          'Kabuklu Antep fıstığı: kabuğu çıkarılmamış üründür; içler çoğunlukla bütün olarak, taze ya da kavrulup tuzlanarak tüketilir.',
          'Antep fıstığı içi: kabuğundan ayrılmış içtir. USDA’ya göre Türkiye’de fıstığın yaklaşık yüzde 65’i başta baklava olmak üzere tatlı ve şekerleme üretiminde kullanılır; son on yılda çikolata ve dondurmada kullanım artmıştır.',
          'Boz iç: tam olgunlaşmadan, normal hasattan yaklaşık bir ay önce toplanan fıstıkların içidir. Koyu yeşil rengiyle aranır ve baklavanın karakteristik altın-yeşil rengi ile aromasının kaynağıdır.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: ['Antep fıstığının başlıca kullanım alanları şunlardır:'],
        list: [
          'Baklava ve şerbetli tatlılar',
          'Dondurma ve soğuk tatlılar',
          'Çikolata ve pralin',
          'Lokum, helva ve şekerleme',
          'Çerezlik ve perakende paketleme',
        ],
      },
      {
        heading: 'Depolama ve GTİP',
        paragraphs: [
          'Antep fıstığı içi yağca zengin olduğundan acılaşmaya yatkındır; ısı ve ışık yağın oksijenle tepkimesini hızlandırır. Serin, kuru ve karanlık bir ortamda, nem ve koku geçirmeyen ambalajda saklanmalıdır.',
          'Armonize Sistem’in 2022 sürümünde kabuklu Antep fıstığı 0802.51, kabuğu çıkarılmış iç 0802.52 alt pozisyonundadır; kavrulmuş ve hazırlanmış ürünler 20.08 pozisyonunda (2008.19) yer alır. 12 haneli Türk GTİP kodu güncel tarife cetvelinden teyit edilmeli, bağlayıcı sonuç için Bağlayıcı Tarife Bilgisi (BTB) başvurusu yapılmalıdır.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan Antep fıstığı fiyatları ürünün biçimine, boyuna, miktara ve teslim koşuluna göre değişir. İhtiyacınızı teklif formunda paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Boz iç Antep fıstığı nedir?',
        answer:
          'Boz iç, tam olgunlaşmadan — normal hasattan yaklaşık bir ay önce — toplanan fıstıkların içidir. Koyu yeşil rengiyle aranır; baklavanın karakteristik rengini ve aromasını veren bileşendir.',
      },
      {
        question: 'Antep fıstığı coğrafi işaret tescilli midir?',
        answer:
          '“Antep Fıstığı”, Türk Patent ve Marka Kurumunda 27 numarayla tescilli bir menşe adıdır. Tescili Gaziantep Ticaret Odası yaptırmıştır; 2025’teki değişiklikle tescilin coğrafi sınırı 22 ili kapsamaktadır.',
      },
      {
        question: 'Antep fıstığı içinin GTİP kodu nedir?',
        answer:
          'Çiğ (kavrulmamış) Antep fıstığı içi Armonize Sistem’de 0802.52, kabuklu fıstık 0802.51 alt pozisyonundadır; kavrulmuş ve hazırlanmış ürün 2008.19 altında değerlendirilir. 12 haneli Türk GTİP kodu güncel tarife cetvelinden teyit edilmelidir.',
      },
    ],
    sources: cite(
      'tr',
      'turkpatentAntepFistigi',
      'gainTurkeyTreeNuts2022',
      'gainTurkeyTreeNuts2015',
      'bozPistachioHarvest',
      'pistachioSpread',
      'wikiGaziantep',
      'wikiPistachio',
      'wcoHs2022Ch08',
      'wcoHs2022Ch20',
    ),
    relatedGuides: ['buying-nuts-wholesale', 'aflatoxin-in-nuts', 'nut-export-documents'],
  },
]
