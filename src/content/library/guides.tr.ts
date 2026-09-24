import { libraryImages } from './images'
import { cite } from './sources'
import type { GuidePage } from './types'

/*
 * Türkçe rehberler.
 *
 * Konular Google otomatik tamamlamada gerçekten aranan sorulardan seçildi:
 * "ceviz içi çeşitleri", "kırık ceviz içi nedir", "ceviz içi nasıl saklanır",
 * "ceviz içi buzlukta saklanır mı", "pikan cevizi ile normal ceviz arasındaki
 * fark", "makademya fındığı nedir", "kuruyemiş ihracatı için gerekli belgeler".
 *
 * Bu yazılar yapay zekâ arama motorlarının (ChatGPT, Gemini, Perplexity)
 * alıntıladığı türden içeriktir; bu yüzden her bölüm tek başına okunduğunda da
 * anlaşılır ve net bir cevapla açılır.
 *
 * Doğruluk kuralı ürün sayfalarıyla aynıdır: genel, doğrulanabilir bilgi.
 * Mevzuata ilişkin yazıda (ihracat belgeleri) kaynağı belli olmayan hüküm
 * kurulmaz, gereklilikler ürüne ve varış ülkesine göre değiştiği için okuyucu
 * yetkili kuruma yönlendirilir. Kurum adlarına gelen ekler TDK kuralına göre
 * kesmeyle ayrılmaz ("Tarım Bakanlığının").
 */
const PUBLISHED = '2026-09-15'
/** The source check of 2026-09-18 rewrote every guide against its references. */
const UPDATED = '2026-09-18'
/** The guides added in the second wave, researched and written on this date. */
const ADDED = '2026-09-21'

export const guidesTr: readonly GuidePage[] = [
  {
    id: 'walnut-kernel-grades',
    slug: 'ceviz-ici-cesitleri',
    metaTitle: 'Ceviz İçi Çeşitleri: Yarım, Çeyrek, Kırık, Pirinç',
    metaDescription:
      'Yarım, çeyrek, kırık ve pirinç ceviz içi arasındaki farklar; TS 1276, UNECE ve ABD standartlarındaki karşılıkları ve hangi üründe hangi boyun kullanıldığı.',
    eyebrow: 'Rehber',
    heading: 'Ceviz İçi Çeşitleri: Yarım, Çeyrek, Kırık ve Pirinç Ceviz',
    lead: 'Ceviz içi, kabuğundan ayrıldıktan sonra parça büyüklüğüne göre farklı boylarda alınıp satılır. Raymar Nuts’ın da kullandığı yarım, çeyrek, kırık ve pirinç adları ticari adlardır; Türk Standardı TS 1276 ise tipleri farklı tanımlar. Bu rehberde her boyun ne olduğunu, standartlardaki karşılığını ve hangi ürünlerde kullanıldığını anlatıyoruz.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Kırık ceviz içi — naylon kaplı koli içinde',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Ceviz İçi Neden Boylara Ayrılır?',
        paragraphs: [
          'Ceviz kırıldığında içlerin bir bölümü yarım kalır, bir bölümü farklı büyüklüklerde parçalanır. Kırmadan sonra içler ayıklanır ve eleklerden geçirilerek parça büyüklüğüne göre ayrılır; standartlar da boyları bu eleklerin göz açıklığıyla tanımlar.',
          'Her boy farklı bir kullanıma uygundur ve fiyat da boya göre değişir: USDA’nın 2024 tarihli Ukrayna raporu, bu pazarda yarımların parça cevizden daha yüksek fiyatla alındığını aktarır.',
        ],
      },
      {
        heading: 'TS 1276’ya Göre Ceviz İçi Tipleri',
        paragraphs: [
          'Dış ticarette ticari kalite denetiminde esas alınan TS 1276, ceviz içini büyüklüğüne göre altı tipe ayırır:',
        ],
        list: [
          'Yarım (çenet): Bütün ceviz içinin yaklaşık eşit ikiye ayrılmış parçası',
          'Çeyrek: Bütün ceviz içinin uzunluğuna yaklaşık eşit dörde ayrılmış parçası',
          'Büyük: Yarımın dörtte üçünden küçük ama kırık parçadan büyük parça',
          'Kırık (pirinç): 8 mm’lik elekten geçen ancak 3 mm’lik elekten geçemeyen parça',
          'Küçük: 3 mm’lik elekten geçmeyen ve çeyrekten küçük olan taneler',
          'Yarım ve büyük: Yarım ve büyük parçaların karışımı',
          'Not: standart, “küçük” tipini elek ölçüsüyle değil boyut karşılaştırmasıyla tanımlar ve bu tanım kırık (pirinç) aralığıyla örtüşür. Bu yüzden siparişte tip adının yanına elek aralığını da yazmak gerekir.',
        ],
      },
      {
        heading: 'Yarım Ceviz İçi',
        paragraphs: [
          'Yarım, ceviz içinin yaklaşık eşit iki parçaya ayrılmış hâlidir ve en düzgün görünen boydur. ABD standardında bir partinin “halves” sayılması için ağırlıkça en az yüzde 85’inin yarımlardan oluşması gerekir.',
          'California Walnuts, yarımları cevizin doğal biçimini gösteren ürünlerde, yani şekerlemede, fırın ürünlerinin süslemesinde ve kuruyemiş karışımlarında kullanmayı önerir.',
        ],
      },
      {
        heading: 'Çeyrek Ceviz İçi',
        paragraphs: [
          'Çeyrek, ceviz içinin uzunlamasına dörde bölünmüş hâlidir; TS 1276 ve UNECE DDP-02 bu tipi aynı biçimde tanımlar. ABD standardında ayrı bir çeyrek sınıfı yoktur, çeyrekler “pieces” sınıfına girer.',
          'Kek, kurabiye ve ekmek gibi fırın ürünlerinde, cevizin iri parçalar hâlinde hissedilmesi istendiğinde kullanılır.',
        ],
      },
      {
        heading: 'Kırık Ceviz İçi Nedir?',
        paragraphs: [
          'Raymar Nuts’ın ürün listesinde kırık ceviz içi, çeyrekten küçük ve pirinçten iri, düzensiz parçaları ifade eder; TS 1276’da bu büyüklük “büyük” tipine, UNECE DDP-02’de “large pieces” tipine karşılık gelir. TS 1276’da “kırık” adının pirinç boyu ifade ettiğini unutmamak gerekir.',
          'California Walnuts, orta boy parçaları ürünün her yerinde eşit tat ve doku istenen hazır kek karışımlarında ve çikolatalı barlarda, iri parçaları ise dondurma ve bar ürünlerinde kullanmayı önerir.',
        ],
      },
      {
        heading: 'Pirinç Ceviz Nedir?',
        paragraphs: [
          'Pirinç ceviz, ceviz içinin en küçük boyudur. TS 1276 bu tipi “kırık (pirinç)” adıyla, 8 mm’lik elekten geçen ancak 3 mm’lik elekte kalan parçalar olarak tanımlar.',
          'California Walnuts, küçük parçaların hazır fırın karışımlarında cevizin eşit dağılmasını sağladığını belirtir. Cevizli baklavada ve kadayıfta da ince kıyılmış ceviz kullanılır.',
        ],
      },
      {
        heading: 'Hangi Ürün İçin Hangi Boy?',
        paragraphs: ['California Walnuts’ın boy önerileri özetle şöyledir:'],
        list: [
          'Şekerleme, süsleme ve kuruyemiş karışımları: yarım',
          'Dondurma, bar ürünleri ve fırın ürünlerinin üstü: iri parça',
          'Hazır kek karışımları ve çikolatalı barlar: orta boy parça',
          'Baharat ve pane karışımları, hazır fırın karışımları, dondurma süslemesi: küçük parça',
        ],
      },
      {
        heading: 'Boy ile Birlikte Renge de Bakın',
        paragraphs: [
          'Ceviz içi boyunun yanında renk sınıfına göre de ayrılır ve ABD standardı renk sınıfının boy sınıfıyla birlikte belirtilmesini ister; “Light Halves” gibi. Renk sınıflarını ayrı bir rehberde anlattık.',
        ],
      },
    ],
    faq: [
      {
        question: 'Kırık ceviz içi kalitesiz midir?',
        answer:
          'Hayır. TS 1276 ve UNECE DDP-02’de kalite sınıfı (Ekstra, Sınıf I, Sınıf II) boydan ayrı belirlenir; her boy bu sınıflardan birinde olabilir. Fark parça büyüklüğündedir; UC Davis’e göre doğranmış kuruyemiş bütün içlerin yaklaşık yarısı kadar süre saklanabilir.',
      },
      {
        question: 'Pirinç ceviz ile toz ceviz aynı mı?',
        answer:
          'Hayır. Pirinç ceviz, standarda göre 3–8 mm aralığındaki parçalardan oluşur. Toz ceviz (ceviz unu) ise cevizin en ince biçimidir; iri öğütülmüşten ince toza kadar değişen kıvamlarda olur.',
      },
      {
        question: 'Baklava için hangi ceviz içi kullanılır?',
        answer:
          'Cevizli baklavada genellikle ince kıyılmış ceviz kullanılır. Standartta “baklavalık” diye bir boy yoktur; siparişte TS 1276 tipini veya parça aralığını belirtmek gerekir.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwSizeChart',
      'ucDavisDicedNuts',
      'gainUkraineTreeNuts2025',
      'wikiBaklava',
      'vikipediKadayif',
    ),
    relatedProducts: ['walnut-kernels'],
  },
  {
    id: 'walnut-colour-grades',
    slug: 'ceviz-ici-renk-siniflari',
    metaTitle: 'Ceviz İçi Renk Sınıfları: Extra Light’tan Amber’e',
    metaDescription:
      'Extra Light, Light, Light Amber ve Amber ne demek? USDA renk sınıfları, TS 1276’nın renk koşulları, rengin neden değiştiği ve lezzetle ilişkisi.',
    eyebrow: 'Rehber',
    heading: 'Ceviz İçi Renk Sınıfları: Extra Light, Light, Light Amber ve Amber',
    lead: 'Ceviz içi ticaretinde boy kadar belirleyici bir diğer özellik renktir. ABD Tarım Bakanlığının (USDA) standardı ceviz içi rengini açıktan koyuya Extra Light, Light, Light Amber ve Amber sınıflarıyla tanımlar; Türk Standardı TS 1276 ise rengi kalite sınıflarına bağlar. Bu rehberde renk sınıflarının ne anlama geldiğini ve alım kararını nasıl etkilediğini anlatıyoruz.',
    image: libraryImages.walnutPaleHalves,
    imageAlt: 'Açık renkli, bütün yarım ceviz içleri — yakın çekim',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Renk Sınıfı Neyi Anlatır?',
        paragraphs: [
          'Renk sınıfı, ceviz içini saran ince zarın rengini ifade eder. USDA standardı rengi, USDA ceviz renk kartelasına göre dört sınıfla tanımlar: Extra Light (çok açık), Light (açık), Light Amber (açık kehribar) ve Amber (kehribar). Kırmızı zarlı çeşitler için ayrıca “red” tanımı vardır; “off color” (renk dışı) ise bir renk sınıfı sayılmaz.',
          'Kaliforniya Üniversitesi (UC Davis) araştırmacıları bu dört sınıfın ceviz derecelendirmesinde yaygın olarak kullanıldığını ve daha açık zar renginin daha iyi sınıf ve daha yüksek fiyat anlamına geldiğini belirtir.',
        ],
      },
      {
        heading: 'TS 1276’da Renk: Kalite Sınıfları',
        paragraphs: [
          'Türk Standardı TS 1276 ayrı renk adları kullanmaz; renk koşulunu kalite sınıfına bağlar:',
        ],
        list: [
          'Ekstra: Her yeri açık renkli; koyu, limon sarısı ya da koyu kahverengi izi olmayan içler',
          'Sınıf I: Açık kahverengiden veya limon sarısından daha koyu olmayan içler',
          'Sınıf II: Koyu kahverenginden daha koyu olmayan içler; daha koyu içler bu sınıfa girebilir ancak işaretlemede belirtilmelidir',
        ],
      },
      {
        heading: 'Ceviz İçinin Rengi Neden Değişir?',
        paragraphs: ['Araştırmalar rengi etkileyen şu etkenleri gösterir:'],
        list: [
          'Çeşit: Zar rengi kalıtsaldır; örneğin Chandler çeşidi Jamal çeşidinden daha açık renkli iç verir.',
          'Yetişme koşulları: Aşırı güneş ve sıcaklık stresi içleri koyulaştırır.',
          'Hasat ve kurutma: Geç hasat ve 43 °C’nin üzerindeki kurutma havası iç rengini koyulaştırır.',
          'Depolama: Uzun depolamada zardaki fenolik bileşikler oksijenle tepkimeye girerek rengi koyulaştırabilir; soğuk depolama bunu sınırlar.',
        ],
      },
      {
        heading: 'Renk ve Lezzet İlişkisi',
        paragraphs: [
          'California Walnuts, Light sınıfı içleri toprak notalı, hafif aromalı ve tanen etkisi belirsiz; Light Amber içleri ise daha yoğun aromalı, yuvarlak tanenli ve hafif tatlı bitişli olarak tanımlar.',
          'Her kullanım için en açık sınıf gerekmez: California Walnuts, Light Amber sınıfını daha ekonomik bir seçenek olarak tanımlar. Rengin göründüğü ürünlerde açık sınıflar, cevizin hamur veya dolgu içinde kaldığı kullanımlarda daha koyu sınıflar değerlendirilebilir.',
        ],
      },
      {
        heading: 'Ticarette Boy ve Renk Birlikte Kullanılır',
        paragraphs: [
          'USDA standardı, renk sınıfının boy sınıfıyla birlikte belirtilmesini ister. “Light Halves”, Light renk sınıfındaki yarımları; “Light Amber Pieces” ise Light Amber sınıfındaki parçaları (USDA “pieces” sınıfı) ifade eder.',
          'Teklif alırken ihtiyacınızı hem boy hem renk olarak tanımlamanız, karşılaştırma yapmayı kolaylaştırır ve beklentinizle teslim edilen ürünün örtüşmesine yardımcı olur.',
        ],
      },
      {
        heading: 'Hangi Renk Sınıfı Nerede Kullanılır?',
        paragraphs: [
          'California Walnuts’ın renk sınıflarına göre verdiği kullanım örnekleri şöyledir:',
        ],
        list: [
          'Light: açık renkli salata sosları ve soslar için püre; kaplama ve kabuk için kıyılmış; tart, şekerleme ve salata üstü',
          'Light Amber: sos ve ezmeler için kavrulup püre; yoğun çikolatalı tatlılar; kaplama ve kızartma için ince kıyılmış',
        ],
      },
    ],
    faq: [
      {
        question: 'Light Halves ne demek?',
        answer:
          '“Light Halves”, USDA renk sınıflarına dayanan ticari bir tanımdır: “Light” renk sınıfını, “Halves” ise yarım boyu belirtir.',
      },
      {
        question: 'Koyu renkli ceviz içi bozuk mudur?',
        answer:
          'Tek başına hayır. UC Davis araştırmasında açık ve koyu renkli içlerin peroksit değerleri arasında fark bulunmamıştır; renk çeşitten ve yetişme koşullarından da kaynaklanabilir. Tiner benzeri koku, yumuşamış doku veya gözle görülür küf ise bozulmayı gösterir.',
      },
    ],
    sources: cite(
      'tr',
      'usdaShelledWalnuts',
      'ts1276Gazette',
      'cwSizeColor',
      'walnutSkinLightness',
      'ucanrDehydration',
      'ucanrHomeOrchardNuts',
      'cwHandlingStorage',
      'cwBuyCare',
    ),
    relatedProducts: ['walnut-kernels'],
  },
  {
    id: 'storing-walnut-kernels',
    slug: 'ceviz-ici-nasil-saklanir',
    metaTitle: 'Ceviz İçi Nasıl Saklanır? Acılaşmayı Geciktirme',
    metaDescription:
      'Ceviz içi neden acılaşır, buzdolabında veya dondurucuda saklanır mı? Toptan alınan ceviz içini tazeliğini kaybetmeden saklamanın koşullarını anlatıyoruz.',
    eyebrow: 'Rehber',
    heading: 'Ceviz İçi Nasıl Saklanır? Acılaşmayı Geciktiren Koşullar',
    lead: 'Ceviz içi yağca zengin olduğu için oksidasyonla acılaşmaya yatkındır ve oda sıcaklığı bu süreci hızlandırır. Toptan alımlarda depolama koşulları ürünün kalitesini doğrudan etkiler. Bu rehberde ceviz içinin neden bozulduğunu ve kaynakların önerdiği saklama koşullarını anlatıyoruz.',
    image: libraryImages.walnutSmall,
    imageAlt: 'Pirinç ceviz içi — en küçük boy, dökme',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Ceviz İçi Neden Acılaşır?',
        paragraphs: [
          'Çoğu kuruyemişin yağında tekli doymamış yağ asitleri ağır basarken ceviz yağının yaklaşık yüzde 72’si çoklu doymamış yağdır. Bu yağlar oksijenle tepkimeye girerek acılaşır; California Walnuts’a göre acılaşmış ceviz boya tineri gibi kokar.',
          'Acılaşma bayatlıkla aynı şey değildir: USDA standardı, tadı sönük ama rahatsız edici olmayan bayat cevizi acılaşmış cevizden ayırır. Isı ve ışık yağların oksijenle tepkimesini hızlandırır; sıcak ve nemli koşullar ise küf gelişimini kolaylaştırır.',
        ],
      },
      {
        heading: 'Temel Saklama Kuralları',
        paragraphs: [
          'California Walnuts ile TS 1276’nın önerileri şu kurallarda birleşir:',
        ],
        list: [
          'Serin tutun: Kısa süreli depolamada 10 °C’nin altında, altı aya kadar depolamada 0–5 °C arasında.',
          'Kuru tutun: Bağıl nem yüzde 65’in altında; TS 1276’ya göre uzun süre bekletilecek içlerde yüzde 50’nin altında.',
          'Işıktan ve havadan koruyun: Işık ve hava geçirmeyen ambalaj kullanın.',
          'Kokulardan uzak tutun: Ceviz, uzun süre maruz kaldığı kokuları alabilir.',
          'Stoku döndürün: Önce giren ürün önce çıkmalıdır.',
        ],
      },
      {
        heading: 'Ceviz İçi Buzdolabında veya Dondurucuda Saklanır mı?',
        paragraphs: [
          'Evet. California Walnuts, cevizin buzdolabında altı aya kadar saklanabileceğini, daha uzun süre için dondurucuda saklanmasını önerir; önemli olan hava geçirmez bir kap ve kokulu gıdalardan uzaklıktır.',
          'Dondurucudan çıkarılan kuruyemişte yoğuşma sorun olabilir; UC Davis hasat sonrası uzmanları ürünün önce en az 7 °C’ye, ardından kademeli olarak oda sıcaklığına getirilmesini önerir.',
        ],
      },
      {
        heading: 'Toptan Alımlarda Depolama',
        paragraphs: [
          'TS 1276, uzun süre bekletilecek ceviz içinin bağıl nemi yüzde 50’nin altındaki soğuk hava depolarına konulmasını ister. California Walnuts ise sıcak aylarda cevizin soğutmalı araç ve konteynerlerle taşınmasını önerir.',
          'Işık ve hava geçirmeyen ambalaj ile ambalajdaki oksijenin azot gazıyla yer değiştirmesi, açılmamış ürünün raf ömrünü uzatır. Bir araştırmada vakum ambalaj ve 4 °C’de depolama, ceviz içinde oksidasyonu en düşük düzeyde tutmuştur. Stok yönetiminde önce giren ürünün önce çıkması, ürünün depoda gereğinden uzun beklemesini önler.',
        ],
      },
      {
        heading: 'Bozulmuş Ceviz İçi Nasıl Anlaşılır?',
        paragraphs: ['Aşağıdaki işaretler ceviz içinin bozulmuş olabileceğini gösterir:'],
        list: [
          'Tiner veya boya benzeri koku ya da keskin, acı tat',
          'Gevrekliğini kaybetmiş, yumuşak veya lastiğimsi doku',
          'Gözle görülür küf',
          'Depolamada belirgin koyulaşma (tek başına bozulma göstergesi değildir; koku ve tatla birlikte değerlendirilmelidir)',
        ],
      },
    ],
    faq: [
      {
        question: 'Ceviz içi bozulur mu?',
        answer:
          'Evet. Ceviz içi yağca zengin olduğu için zamanla okside olup acılaşabilir. Serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanması bu süreci yavaşlatır; California Walnuts soğuk depolamanın acılaşmayı en aza indirdiğini belirtir.',
      },
      {
        question: 'Ceviz içi buzlukta saklanır mı?',
        answer:
          'Evet. California Walnuts altı aydan uzun saklama için dondurucuyu önerir. UC Davis, yoğuşmayı önlemek için ürünün dondurucudan çıkarıldıktan sonra önce en az 7 °C’ye, ardından oda sıcaklığına kademeli olarak getirilmesini önerir.',
      },
    ],
    sources: cite(
      'tr',
      'wikiWalnut',
      'wikiRancidification',
      'usdaShelledWalnuts',
      'ts1276Gazette',
      'cwHandlingStorage',
      'cwUsageStorage',
      'cwBuyCare',
      'ucDavisDicedNuts',
      'walnutStorageVacuum',
      'walnutSkinLightness',
      'ucanrNutSafety',
      'codexAflatoxinTreeNuts',
    ),
    relatedProducts: ['walnut-kernels', 'pecans'],
  },
  {
    id: 'walnut-kernel-defects',
    slug: 'ceviz-ici-neden-acilasir',
    metaTitle: 'Ceviz İçi Neden Acılaşır ve Kararır?',
    metaDescription:
      'Ceviz içinde acılaşma, kararma ve büzüşmenin nedenleri: standartların tanımları, ölçülmüş mekanizma, bahçede başlayan kusurlar ve sınıflardaki karşılığı.',
    eyebrow: 'Rehber',
    heading: 'Ceviz İçi Neden Acılaşır, Kararır ve Büzüşür?',
    lead: 'Bir partide en çok tartışılan üç kusur acılaşma, kararma ve büzüşmedir. Üçünün de standartlarda yazılı bir tanımı, ölçülmüş bir nedeni ve ticari sınıflarda bir karşılığı vardır. Bu rehber, hangi kusurun nereden geldiğini ve neyin geciktirdiğini anlatır.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Kırık ceviz içi — naylon kaplı koli içinde',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'Standartlar Bu Kusurları Nasıl Tanımlar?',
        paragraphs: [
          'Kusur adları ticarette gelişigüzel kullanılır; oysa UNECE’nin kuru ve kurutulmuş ürün standartlarında her birinin yazılı tanımı vardır. Bir spesifikasyon hazırlarken bu tanımlara atıf yapmak, iki tarafın aynı şeyi konuşmasını sağlar:',
        ],
        list: [
          'Acılık (rancidity): Lipitlerin oksidasyonu ya da serbest yağ asidi oluşumu sonucu ortaya çıkan, karakteristik bir hoşa gitmeyen tat. Standart ayrıca uyarır: iç meyvenin yağlı görünmesi tek başına acılaşmış olduğunu göstermez.',
          'Büzüşmüş ve çekmiş (shrivelled and shrunken): Anormal biçimde kırışmış ya da yassılaşmış; su kaybetmiş, kurumuş veya sertleşmiş iç.',
          'Yeterince gelişmemiş: Biçimsiz, anormal küçük ya da kısmen körelmiş iç — büzüşmüş ve çekmiş içler de bu tanıma dâhildir.',
          'Isı hasarı: Kurutma ya da işleme sırasında aşırı ısının yol açtığı, tadı, görünümü veya yenilebilirliği belirgin biçimde etkileyen hasar.',
          'Renk değişimi: Tipik iç ya da dış rengin belirgin ve yaygın biçimde değişmesi; özellikle kararma ve çok koyu renklerin ortaya çıkması.',
        ],
      },
      {
        heading: 'Acılaşma: Nedeni ve Hızı',
        paragraphs: [
          'Ceviz, kuruyemişler arasında acılaşmaya en yatkın olanlardandır. Kaliforniya Üniversitesinde yürütülen bir çalışma bunu açıkça yazar: ceviz içinin yağ oranı yaklaşık yüzde 65–70’tir ve bu yağın büyük bölümü çoklu doymamış yağ asitlerinden oluşur. Bozulma iki yoldan ilerler; lipitlerin hidrolizi serbest yağ asitleri açığa çıkarır ve bu asitler daha sonra daha kolay okside olur.',
          'Hız, depolama koşullarına bağlıdır. Türkiye’de yayımlanan bir derleme, yığın hâlinde depolamada tanelerin havasız kalabildiğini, üstteki yükün hücre zarlarını zedeleyerek acılaşmayı hızlandırdığını aktarır; aynı çalışma düşük sıcaklığın acılaşmayı geciktirdiğini belirtir. Pratikte bu, yüksek istif yerine havalandırılmış, serin ve karanlık bir depo anlamına gelir.',
        ],
      },
      {
        heading: 'Kararma: Zar, Oksijen ve Sıcaklık',
        paragraphs: [
          'Cevizin kararması esas olarak içi saran ince zardaki (pellikül) fenolik bileşiklerin polifenol oksidaz enzimleriyle oksitlenmesinden gelir; bazı kuruyemişlerdeki Maillard esmerleşmesinden farklı bir olaydır. Aynı çalışmada kabuk kırma sırasında zarı fazla zedelenen içler (yüzeyinin yüzde 20–22’si hasarlı) depolamada daha çok “amber” sınıfına düşmüş, serbest yağ asitleri de bu grupta hep daha yüksek çıkmıştır. Kabuk kırma ne kadar yumuşak olursa renk o kadar açık kalır.',
          'Oksijen ve sıcaklık ikinci belirleyicidir: aynı denemede oksijen kısmi basıncı 6 kPa’nın altında tutulan içler üç hafta boyunca kararmadan korunmuş, buna karşılık tam 6 kPa’da amber oranı yaklaşık yüzde 20 olmuştur. Kurutma sıcaklığı da doğrudan etkiler; UC ANR’nin kurutma bölümü, havanın 43 °C’yi (110 °F) aşmaması gerektiğini, bunun üzerindeki sıcaklığın içleri karartıp depo ömrünü kısalttığını yazar. Hasatta gecikme de aynı yöne çalışır: Kaliforniya yayım servisine göre kalite kaybının büyük bölümü hasadı izleyen ilk dokuz saatte olur ve sıcakta içler daha hızlı kararır.',
        ],
      },
      {
        heading: 'Büzüşme: Çoğu Zaman Bahçede Başlar',
        paragraphs: [
          'Büzüşmüş iç genellikle depolamanın değil, yetiştirme ve hasat döneminin sonucudur. UC IPM’in ceviz rehberi, yaprak biti baskısının yaprak dökümüne yol açarak meyveleri güneş yanığına açık bıraktığını ve bunun içleri karartıp büzüştürdüğünü; yaz sonunda süren aynı yoğunluktaki bulaşmanın hasatta büzüşmüş iç verdiğini belirtir. Ceviz yeşil kabuk sineğinin (husk fly) sezon başındaki bulaşması da büzüşmüş ve kararmış iç ile küf artışına yol açar.',
          'Sulamanın kesilme zamanı da belirleyicidir: hasattan çok önce suyun kesilmesi yeşil kabuğun büzüşmesine ve zarı kararmış içlere yol açar, aşırı sulama ise yeşil kabuğu yeşil tutup kurumayı geciktirerek küf riskini artırır. Türkçe literatürde aynı denge yazılıdır: zamanından önce yapılan hasatta meyveler içlerini tam dolduramadığı için kurutma sırasında olgunlaşmamış içler büzüşür; geç hasatta ise kabukta ve meyve renginde kararmalar ve kurtlanmalar görülür.',
        ],
      },
      {
        heading: 'Ticari Sınıflarda Karşılığı',
        paragraphs: [
          'Bu kusurlar sınıflandırmada sayıya dökülür. ABD’nin kabuğu çıkarılmış ceviz standardında büzüşme, parçanın sekizde birinden fazlasını kapsıyorsa “damage”, dörtte birinden fazlasını kapsıyorsa “serious damage”, yüzde 50’sini aşıyorsa “very serious damage” sayılır; küf ve iç renk değişimi için de benzer eşikler vardır. Acılık ve böcek hasarı ise alanla ölçülmez: bulunduğu anda “very serious damage”dır. U.S. No. 1 sınıfı tanımı gereği acılıktan, böcek hasarından, çürümeden ve büzüşme, küf ya da renk değişimi kaynaklı hasardan arındırılmış içlerden oluşur.',
          'UNECE’nin ceviz içi standardı da aynı mantığı toleranslarla kurar: partideki acı ya da yabancı koku/tat taşıyan ürün payı Ekstra ve Sınıf I’de yüzde 1, Sınıf II’de yüzde 2 ile sınırlıdır; küflü ürün payı sırasıyla yüzde 0,5, 1 ve 2’dir. Aynı standart ceviz içinin nem oranının yüzde 5,0’ı aşmamasını ister — kuruluk, hem küf hem acılaşma tarafında ortak koşuldur.',
        ],
      },
      {
        heading: 'Pratikte Ne Yapılır?',
        paragraphs: [
          'Alıcı tarafında üç şey işe yarar. Birincisi, spesifikasyonda kusur adlarını standart tanımıyla birlikte yazmak ve sınıf toleransına atıf yapmak. İkincisi, teslim alınan partiyi serin, kuru ve karanlık bir ortamda, mümkünse düşük oksijenli (vakumlu) ambalajda tutmak: Codex’in kuruyemiş rehberi depolarda bağıl nemin yüzde 70’in altında, sıcaklığın 0–10 °C arasında tutulmasını önerir; Türkçe derlemede de düşük sıcaklık, düşük nem, vakum ve karanlık birlikte anılır. Üçüncüsü, renk sınıfını boydan ayrı sormak.',
          'Depolama koşullarının ayrıntısı için ceviz içi nasıl saklanır rehberine, renk sınıfları için ceviz içi renk sınıfları rehberine bakabilirsiniz. Not: cevizde acı tat her zaman acılaşma değildir — Tarım ve Orman Bakanlığının üretici bilgi belgesinde bakteriyel yanıklık hastalığının meyvenin iç kısımlarına yayılarak rengini değiştirip tadını acılaştırdığı belirtilir.',
        ],
      },
    ],
    faq: [
      {
        question: 'Ceviz içi neden acı olur?',
        answer:
          'Acılık, standart tanımıyla lipitlerin oksidasyonu ya da serbest yağ asidi oluşumudur. Ceviz içinin yaklaşık yüzde 65–70’i yağdır ve bu yağın büyük bölümü çoklu doymamış yağ asitlerinden oluşur; ısı, ışık ve oksijen süreci hızlandırır. Bakteriyel yanıklık gibi hastalıklar da içte acı tada yol açabilir.',
      },
      {
        question: 'Ceviz içi neden kararır?',
        answer:
          'Kararma çoğunlukla içi saran zardaki fenolik bileşiklerin oksitlenmesinden gelir. Kabuk kırma sırasında zarın zedelenmesi, yüksek oksijen, sıcak depolama, 43 °C’yi aşan kurutma havası ve hasadın gecikmesi bu süreci hızlandırır.',
      },
      {
        question: 'Büzüşmüş ceviz içi kalitesiz midir?',
        answer:
          'Büzüşme standartlarda tanımlı bir kusurdur ve ölçülür: ABD standardında parçanın sekizde birinden fazlası büzüşmüşse hasar, dörtte birinden fazlası büzüşmüşse ağır hasar sayılır. Nedeni çoğunlukla bahçe ve hasat koşullarıdır — erken hasat, su stresi, güneş yanığı ya da zararlı baskısı.',
      },
    ],
    sources: cite(
      'tr',
      'uneceStandardLayout',
      'uneceWalnutKernels',
      'usdaShelledWalnutsPdf',
      'ortizPellicle',
      'ucipmWalnut',
      'ucceWalnutSeason',
      'ucanrDehydration',
      'kibarNutStorage',
      'unalWalnutHarvest',
      'gkgmCeviz',
      'codexAflatoxinTreeNuts',
    ),
    relatedProducts: ['walnut-kernels', 'walnut-pieces'],
  },
  {
    id: 'walnut-harvest-season',
    slug: 'ceviz-hasadi-ne-zaman',
    metaTitle: 'Ceviz Hasadı Ne Zaman Yapılır?',
    metaDescription:
      'Ceviz hasadı hangi ayda yapılır, olgunluk nasıl anlaşılır, erken ve geç hasadın bedeli nedir, hasattan sonra kurutma hangi sıcaklıkta ve hangi nem oranına yapılır.',
    eyebrow: 'Rehber',
    heading: 'Ceviz Hasadı Ne Zaman Yapılır?',
    lead: 'Cevizde hasat zamanı, iç kalitesini en çok etkileyen karardır: erken toplanan meyve içini dolduramaz, geç toplanan meyvede renk kararır ve küf ile zararlı riski artar. Bu rehber olgunluk ölçütünü, Türkiye’deki takvimi ve hasat sonrası kurutmayı anlatır.',
    image: libraryImages.walnutKernels,
    imageAlt: 'Ceviz içi — dökme, yakın çekim',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'Olgunluk Ölçütü: İç Paket Dokunun Kahverengileşmesi',
        paragraphs: [
          'Cevizde olgunluk, dışarıdan bakılarak anlaşılmaz. Tarım ve Orman Bakanlığının üretici belgesi bunu tek cümlede özetler: dış yeşil kabuk iç meyveden sonra olgunlaştığı için cevizde hasat zamanının tespiti diğer türlerden farklıdır ve hasat kriteri, iç paket dokunun kahverengini almasıdır. Yani meyve kesilip bakılır; iki iç yarım arasındaki paket doku kahverengileştiğinde iç olgunlaşmıştır.',
          'Kaliforniya’daki uygulama da aynı ölçüte dayanır: UC IPM rehberi, paket doku kahverengileştiğinde iç meyvenin en açık renkli ve en yüksek kalitede olduğunu, kaliteyi korumak ve böcek ile küf hasarını azaltmak için hasadın bu döneme olabildiğince yakın yapılmasını yazar. Aynı rehber, yeşil kabuğun ayrılmasının çoğu zaman iç olgunluğundan sonra gerçekleştiğini, sıcak havanın bu gecikmeyi büyüttüğünü de belirtir.',
        ],
      },
      {
        heading: 'Türkiye’de Hasat Takvimi',
        paragraphs: [
          'Türkiye’de ceviz hasadı genel olarak eylül ortasından ekim sonuna kadar sürer; Millî Eğitim Bakanlığının yetiştiricilik modülü erkenci çeşitlerin ağustos ortasına kadar hasat edilebildiğini ekler. Aynı aralık, hasat mekanizasyonu üzerine yayımlanmış bir akademik çalışmada da verilir ve hasat zamanının çeşit, ağaç yaşı ve iklim koşullarına göre değişebildiği belirtilir.',
          'Çeşit farkı takvime doğrudan yansır. Atatürk Bahçe Kültürleri Merkez Araştırma Enstitüsünün tescilli çeşitler kitapçığında Gültekin-1 ve Yalova-1 için hasat periyodu “eylül ayının ortaları”, Bilecik için “eylül ayı sonları”, Kaplan-86 için ise “15 Ağustos’tan itibaren” olarak verilir.',
        ],
      },
      {
        heading: 'Sahada Kullanılan Üç Eşik',
        paragraphs: [
          'Paket doku ölçütü laboratuvar değil, bıçak işidir; sahada ona eşlik eden pratik eşikler kaynaklara göre değişir. Üçünü de bilerek kullanmak gerekir:',
        ],
        list: [
          'Yeşil kabuğun üçte birinin çatlamış olması (Millî Eğitim Bakanlığının MEGEP yetiştiricilik modülü)',
          'Sarsmayla meyvelerin yüzde 80’inin düşürülebilmesi (BAHÇE dergisindeki hasat çalışması)',
          'Meyvelerin yüzde 95’inden fazlasının kabuğundan ayrılabilir duruma gelmesi (Kaliforniya yayım servisi)',
        ],
      },
      {
        heading: 'Erken ve Geç Hasadın Bedeli',
        paragraphs: [
          'Erken hasat, ağırlık ve kalite kaybıdır: meyveler içlerini tam dolduramadığından kurutma sırasında olgunlaşmamış içler büzüşür. Geç hasatta ise sert kabukta ve meyve renginde kararmalar ile kurtlanmalar görülür. UC IPM aynı riski şöyle yazar: hasat gecikirse ya da meyveler yerde uzun süre kalırsa içler yüksek sıcaklık, küf ve yeşil kabuk çatladıktan sonra meyveye kolayca giren kurtlar tarafından zarar görür.',
          'Hasat günü içinde bile zaman önemlidir. Kaliforniya yayım servisine göre kalite kaybının büyük bölümü hasadı izleyen ilk dokuz saatte gerçekleşir; bu yüzden silkeleme günün serin saatinde yapılmalı, meyveler hızlıca toplanıp kabuk soyma ve kurutma tesisine ulaştırılmalıdır. Sıcakta bekleyen meyvede içler daha hızlı kararır.',
        ],
      },
      {
        heading: 'Hasattan Sonra: Kurutma',
        paragraphs: [
          'Hasat edilen ceviz hemen kurutulur. UC ANR’nin kurutma bölümü hedefi net koyar: depolama ömrü ve kalitesi için ceviz, yaş baza göre yüzde 8 neme kadar kurutulmalıdır ve kurutma havası 43 °C’yi (110 °F) aşmamalıdır; bu sıcaklığın üzerinde içler kararır ve depo ömrü kısalır. Sezon başında yüzde 30–40 nemle gelen meyve 24–36 saat kurutma isteyebilirken sezon sonunda gelen meyve neredeyse kuru gelir.',
          'Türkiye kaynakları benzer değerler verir: hasat mekanizasyonu çalışmasında kurutma havasının 38–43 °C arasında olması gerektiği, bu sıcaklığın üzerinin meyve kalitesini düşürdüğü ve cevizlerin yüzde 30–40 nemden yüzde 8 nem düzeyine genellikle 24 saatte kurutulduğu yazılıdır. MEGEP modülü ise standart tarafını hatırlatır: TSE’ye göre kurutulmuş kabuklu cevizde yüzde 8, ceviz içinde yüzde 5 nem istenir ve meyveler doğrudan güneş ışığı altında kurutulmamalıdır.',
        ],
      },
      {
        heading: 'Yeni Mahsul ve Ticaret Takvimi',
        paragraphs: [
          'Ticarette “yeni mahsul” sorusu doğrudan bu takvime bağlıdır. ABD Tarım Bakanlığının Türkiye raporuna göre cevizin pazarlama yılı eylülde başlar; aynı rapor, yıla göre değişmekle birlikte Türkiye’deki toplam ceviz tüketiminin yaklaşık yüzde 45–55’inin yerli üretimle karşılandığını, kalanının ithalatla tamamlandığını aktarır. Yeni mahsul içi, hasat ve kurutmanın ardından sonbaharda piyasaya çıkar; bir önceki yılın ürünü ise depolama koşullarına göre değerlendirilir.',
          'Sipariş planlarken partinin mahsul yılını ve depolama koşulunu sormak, boy ve renk sınıfı kadar belirleyicidir. Ceviz içi boylarının ne anlama geldiğini ceviz içi çeşitleri rehberinde, saklama koşullarını ceviz içi nasıl saklanır rehberinde anlattık.',
        ],
      },
    ],
    faq: [
      {
        question: 'Ceviz hasadı hangi ayda yapılır?',
        answer:
          'Türkiye’de hasat genel olarak eylül ortasından ekim sonuna kadar sürer; erkenci çeşitler ağustos ortasından itibaren hasat edilebilir. Tescilli çeşitler arasında Kaplan-86 için 15 Ağustos’tan itibaren, Gültekin-1 ve Yalova-1 için eylül ortası, Bilecik için eylül sonu verilir.',
      },
      {
        question: 'Cevizin olgunlaştığı nasıl anlaşılır?',
        answer:
          'Ölçüt, iki iç yarım arasındaki paket dokunun kahverengileşmesidir. Sahada buna yeşil kabuğun çatlaması ve meyvelerin sarsmayla düşebilmesi eşlik eder; kullanılan eşikler kaynağa göre üçte bir çatlama, yüzde 80 silkelenebilirlik veya yüzde 95 kabuktan ayrılabilirlik olarak değişir.',
      },
      {
        question: 'Hasat gecikirse ne olur?',
        answer:
          'Kabukta ve iç renginde kararma, küf ve kurtlanma riski artar. Kaliforniya yayım servisine göre kalite kaybının büyük bölümü hasadı izleyen ilk dokuz saatte gerçekleşir; meyveler sıcakta bekledikçe içler daha hızlı kararır.',
      },
    ],
    sources: cite(
      'tr',
      'gkgmCeviz',
      'ucipmWalnut',
      'ucceWalnutSeason',
      'ucanrDehydration',
      'megepCeviz',
      'unalWalnutHarvest',
      'yalovaCultivars',
      'gainTurkeyTreeNuts2020',
    ),
    relatedProducts: ['walnut-kernels', 'walnut-halves'],
  },
  {
    id: 'pecan-vs-walnut',
    slug: 'pikan-cevizi-ile-ceviz-farki',
    metaTitle: 'Pikan Cevizi ile Ceviz Arasındaki Farklar',
    metaDescription:
      'Pikan cevizi ile normal ceviz arasındaki fark nedir? Köken, kabuk, iç rengi, tat, yağ içeriği ve kullanım alanları bakımından iki kuruyemişi karşılaştırıyoruz.',
    eyebrow: 'Rehber',
    heading: 'Pikan Cevizi ile Ceviz Arasındaki Farklar',
    lead: 'Pikan cevizi (pekan cevizi) ile ceviz akrabadır: İkisi de cevizgiller (Juglandaceae) familyasındandır. Yine de köken, görünüm, tat ve kullanım bakımından farklıdırlar. Bu rehberde iki kuruyemişi kaynaklarıyla karşılaştırıyoruz.',
    image: libraryImages.pecan,
    imageAlt: 'Pikan cevizi — kabuklu ve iç, yakın çekim',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Köken ve Sınıflandırma',
        paragraphs: [
          'Ceviz ve pikan cevizi aynı familyada (cevizgiller, Juglandaceae) yer alır ama farklı cinslere aittir: Ceviz Juglans, pikan cevizi ise hikori ağaçlarıyla birlikte Carya cinsindendir.',
          'Yaygın olarak tüketilen ceviz (Juglans regia), Güneydoğu Avrupa ile Güneybatı ve Orta Asya’yı kapsayan bölgenin yerlisi kabul edilir; uzun kültür geçmişi nedeniyle doğal yayılış alanı kesin olarak bilinmez. Uluslararası Kuruyemiş ve Kuru Meyve Konseyine (INC) göre 2023/24’te dünya ceviz üretiminin yüzde 51’i Çin’de, yüzde 28’i ABD’de gerçekleşti. Pikan cevizi (Carya illinoinensis) ise ABD’nin güneyi ile Meksika’ya özgüdür; aynı kaynağa göre dünya üretiminin yüzde 44’ü Meksika’da, yüzde 43’ü ABD’de yapıldı.',
        ],
      },
      {
        heading: 'Kabuk ve Görünüm',
        paragraphs: [
          'Ceviz kabuğu kırışık yüzeylidir. Pikan cevizi ise kahverengi, silindirik ve ince kabukludur.',
          'İç rengi ayrı ölçeklerle derecelendirilir: ABD standardı ceviz içini Extra Light’tan Amber’e, pikan içini ise altın sarısından koyu kahverengiye uzanan kendi ölçeğiyle sınıflandırır.',
        ],
      },
      {
        heading: 'Tat ve Kullanım',
        paragraphs: [
          'Cevizin ince zarı tanenler nedeniyle hafif buruk bir tat verir; USDA standardı bu buruk tadın acılaşmayla karıştırılmaması gerektiğini ayrıca belirtir.',
          'Pikan cevizi ABD mutfağında en çok pikan turtası ve pralin gibi tatlılarla bilinir. Ceviz ise baklava, kek ve brownie gibi tatlıların yanı sıra muhammara gibi tuzlu mezelerde de kullanılır.',
        ],
      },
      {
        heading: 'Yağ İçeriği',
        paragraphs: [
          'Her ikisi de yağca zengindir, ama iki oran farklı şeyleri ölçer. New Mexico Eyalet Üniversitesine göre kaliteli bir pikan içinin yüzde 73–75’i yağdır; bu, içteki yağ payıdır ve yağın başlıca bileşenleri oleik ve linoleik asittir. Cevizde karşılaştırılabilir ölçü, ceviz içinin yaklaşık yüzde 65–70’inin yağ olmasıdır. Ceviz yağının yaklaşık yüzde 72’sinin çoklu doymamış yağ asitlerinden oluşması ise yağın bileşimiyle ilgilidir, içteki payla değil.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: ['İki kuruyemişin öne çıkan kullanımları kaynaklarda şöyle geçer:'],
        list: [
          'Pikan cevizi: pikan turtası, pralin, “butter pecan” aromalı kurabiye, kek ve dondurma, çerez',
          'Ceviz: baklava ve şerbetli tatlılar, kek ve brownie, müsli, muhammara gibi mezeler',
        ],
      },
      {
        heading: 'Birbirinin Yerine Kullanılabilir mi?',
        paragraphs: [
          'Tariflerde birini diğerinin yerine kullanırken iki kuruyemişin tat ve renk farkını hesaba katmak gerekir; özellikle cevizin zarından gelen buruk tadın öne çıktığı ürünlerde sonuç değişir.',
        ],
      },
    ],
    faq: [
      {
        question: 'Pikan cevizi ceviz midir?',
        answer:
          'Botanik açıdan hayır: Pikan cevizi (Carya illinoinensis) cevizle aynı familyadan (cevizgiller) olsa da ayrı bir cinse, Carya’ya aittir. ABD’nin güneyi ile Meksika’ya özgüdür; kabuğu silindirik ve incedir.',
      },
      {
        question: 'Pikan cevizi ile cevizin tadı nasıl farklıdır?',
        answer:
          'Cevizin ince zarı tanenler nedeniyle hafif buruk bir tat verir. Pikan cevizi ise ABD’de en çok pikan turtası ve pralin gibi tatlılarla bilinir.',
      },
    ],
    sources: cite(
      'tr',
      'wikiJuglandaceae',
      'wikiWalnut',
      'wikiJuglansRegia',
      'wikiPecan',
      'vikipediPekan',
      'feisPecan',
      'incYearbook2024',
      'usdaShelledWalnuts',
      'usdaShelledPecans',
      'cwFlavor',
      'nmsuStoringPecans',
      'wikiMuhammara',
    ),
    relatedProducts: ['pecans', 'walnut-kernels'],
  },
  {
    id: 'what-is-macadamia',
    slug: 'makademya-findigi-nedir',
    metaTitle: 'Makademya Fındığı Nedir? Makadamya Rehberi',
    metaDescription:
      'Makademya fındığı nedir, nerede yetişir, fındıktan farkı ne? Makadamyanın kökenini, özelliklerini ve kullanım alanlarını anlatıyoruz.',
    eyebrow: 'Rehber',
    heading: 'Makademya Fındığı Nedir? Makadamya Hakkında Bilinmesi Gerekenler',
    lead: 'Türkiye’de çoğunlukla “makademya fındığı” olarak anılan makadamya, kremsi dokusu ve yumuşak, tereyağımsı tadıyla bilinir. Adındaki “fındık” kelimesine rağmen fındıkla yakın akraba değildir. Bu rehberde makadamyanın nereden geldiğini, neyle ayrıldığını ve nerelerde kullanıldığını anlatıyoruz.',
    image: libraryImages.macadamia,
    imageAlt: 'Kabuklu makadamyalar ve kabuğu kırılmış, krem rengi makadamya içleri',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Makadamya Nereden Gelir?',
        paragraphs: [
          'Macadamia, Proteaceae familyasından dört ağaç türünü kapsayan bir cinstir ve Avustralya’ya — kuzeydoğu Yeni Güney Galler ile orta ve güneydoğu Queensland’e — özgüdür; Doğu Avustralya’nın yağmur ormanlarında yetişir. Meyvesi için ticari olarak iki türü, M. integrifolia ve M. tetraphylla, yetiştirilir.',
          'Cins adını 1857’de Alman asıllı Avustralyalı botanikçi Ferdinand von Mueller vermiştir; ad, 1827’de Glasgow’da doğan İskoç-Avustralyalı kimyager, tıp eğitmeni ve siyasetçi John Macadam’ın onuruna seçilmiştir. Üretim bugün Avustralya’nın çok ötesine geçmiştir: INC’nin 2024 yıllığına göre iç bazındaki dünya üretiminde Güney Afrika yüzde 32, Çin ve Avustralya yüzde 19, Kenya yüzde 10, ABD ise yüzde 4 pay almıştır.',
        ],
      },
      {
        heading: 'Makademya Fındığı ile Fındık Aynı mı?',
        paragraphs: [
          'Hayır. Makadamya Proteaceae, fındık (Corylus) ise huşgiller (Betulaceae) familyasındandır; iki bitki yakın akraba değildir. Besin bileşimleri de ayrışır: çiğ makadamyanın yaklaşık yüzde 76’sı yağ, yüzde 8’i proteindir; çiğ fındıkta bu oranlar yüzde 61 yağ ve yüzde 15 proteindir.',
        ],
      },
      {
        heading: 'Özellikleri',
        paragraphs: [
          'Makadamyanın kabuğu çok serttir; “kırılması en zor yenilebilir kuruyemiş” olarak anılır. Sıradan bir ceviz kıracağı yeterli kuvveti uygulayamadığı için özel kıracaklar geliştirilmiştir, ticari ölçekte kabuk ayırmada ise dönen çelik merdaneler kullanılır. Kabuğun içindeki iç krem ile açık beyaz arası renktedir.',
          'Tadı yumuşak ve tereyağımsıdır. Yağ bakımından zengindir; çiğ makadamyadaki yağın yüzde 59’u tekli doymamış yağ asitlerinden oluşur.',
        ],
      },
      {
        heading: 'Nerelerde Kullanılır?',
        paragraphs: [
          'Avustralya makadamya endüstrisinin yayımladığı önerilen kullanım tablosunda iç sınıfları uygulamalara şöyle eşlenir:',
        ],
        list: [
          'Çerezlik: bütün ve iri yarım taneler',
          'Çikolata ve şekerleme: bütün taneden parçaya geniş bir aralık ve ezme',
          'Fırın ürünleri: yarım tane, parça ve un ile ezme — kurabiye ve bisküvide makadamya klasik bir katkıdır',
          'Dondurma ve tatlılar: parçalar ve ezme',
        ],
      },
      {
        heading: 'Saklama',
        paragraphs: [
          'Yüksek yağ oranı nedeniyle makadamya ısı, ışık ve oksijenden etkilenir. Avustralya Makadamya Derneği, makadamya içinin uygun ambalajda 12 °C’nin altında saklanmasını önerir; AFI spesifikasyonunda 5–10 °C, en çok yüzde 1,8 nem ve oksijensiz ortam koşulunda 24 aya kadar tazelik süresinden söz edilir. Kısa vadede serin, kuru ve karanlık bir ortam ile hava geçirmez ambalaj yeterlidir.',
        ],
      },
    ],
    faq: [
      {
        question: 'Makademya fındığı nereye özgüdür?',
        answer:
          'Makadamya Avustralya’ya — kuzeydoğu Yeni Güney Galler ile orta ve güneydoğu Queensland’e — özgüdür. Bugün üretimin büyük bölümü başka ülkelerde yapılır: INC’ye göre 2024’te iç bazında dünya üretiminin yüzde 32’si Güney Afrika’ya, yüzde 19’u Çin’e, yüzde 19’u Avustralya’ya aittir.',
      },
      {
        question: 'Makadamyanın kabuğu neden bu kadar sert?',
        answer:
          'Makadamya, kırılması en zor yenilebilir kuruyemiş olarak anılır; sıradan bir ceviz kıracağı yeterli kuvveti uygulayamaz. Ticari ölçekte kabuk, dönen çelik merdanelerle ayrılır. Bu yüzden gıda üretiminde ürün çoğunlukla kabuğu kırılmış iç olarak alınır.',
      },
      {
        question: 'Makadamya nasıl yazılır: makadamya mı makademya mı?',
        answer:
          'Her iki yazım da Türk Dil Kurumunun Güncel Türkçe Sözlük’ünde yer almaz. “Makadamya”, adın kaynağı olan Latince Macadamia’ya daha yakındır; Türkçe Vikipedi ise “Makademya” ve “Macadamia fındığı” biçimlerini kullanır.',
      },
    ],
    sources: cite(
      'tr',
      'wikiMacadamia',
      'vikipediMacadamia',
      'wikiJohnMacadam',
      'wikiHazel',
      'wikiHazelnut',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'incYearbook2024',
    ),
    relatedProducts: ['macadamia'],
  },
  {
    id: 'macadamia-kernel-styles',
    slug: 'makadamya-ic-siniflari',
    metaTitle: 'Makadamya İç Sınıfları: Style 0–8',
    metaDescription:
      'Makadamya içinde Style 0’dan Style 8’e sınıflar, boy aralıkları, AMS ile AFI tanımları arasındaki farklar, etiketleme biçimi ve hangi sınıfın nerede kullanıldığı.',
    eyebrow: 'Rehber',
    heading: 'Makadamya İç Sınıfları: Style 0’dan Style 8’e',
    lead: 'Makadamya içi ticarette numaralanmış sınıflarla — “style” ile — alınıp satılır. Bu rehber sınıfların nasıl tanımlandığını, kurumlar arasındaki farkları ve hangi sınıfın hangi üründe kullanıldığını anlatır.',
    image: libraryImages.macadamia,
    imageAlt: 'Kabuklu makadamyalar ve kabuğu kırılmış, krem rengi makadamya içleri',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'Style Nedir?',
        paragraphs: [
          'Avustralya makadamya endüstrisi, iç boylarını ve karışımlarını tanımlamak için “style” terimini kullanır. Her sınıf iki şeyi birlikte söyler: partideki en az bütün ya da yarım tane oranı ve milimetre cinsinden boy aralığı. Yani Style yalnızca bir boy değil, bir boy ile bir karışım tanımıdır.',
          'Boy aralıkları yuvarlak delikli eleklerle belirlenir: ürün, küçük elekten geçmeyip büyük elekten geçen tanelerden oluşur ve ölçüde yüzde 10’luk bir tolerans kabul edilir.',
        ],
      },
      {
        heading: 'Style Tablosu',
        paragraphs: [
          'Avustralya Makadamya Derneğinin (AMS) kalite standardında etiketleme için kabul edilen tanımlar şunlardır:',
        ],
        list: [
          'Style 0 — en az yüzde 95 bütün tane, 20 mm üzeri',
          'Style 1 — en az yüzde 90 bütün tane, 17–20 mm',
          'Style 1S — en az yüzde 90 bütün tane, 14–18 mm',
          'Style 2 — en az yüzde 50 bütün tane, 13 mm üzeri',
          'Style 3 — en az yüzde 15 bütün tane, 13 mm üzeri',
          'Style 4L — en az yüzde 80 yarım tane, 13 mm üzeri',
          'Style 4S — yarım tane ve parçalar, 10–14 mm',
          'Style 5 — parçalar, 8–12 mm',
          'Style 6 — parçalar, 5–9 mm',
          'Style 7 — parçalar, 3–6 mm',
          'Style 8 — parça ve un, 4 mm altı',
        ],
      },
      {
        heading: 'AMS ile AFI Tanımları Arasındaki Farklar',
        paragraphs: [
          'Aynı numaralar ABD’deki Association of Food Industries’in (AFI) makadamya spesifikasyonunda da kullanılır, ancak bazı satırlar birebir aynı değildir. Sipariş verirken sınıfın hangi belgeye göre tanımlandığı yazılmalıdır:',
        ],
        list: [
          'Style 1: AMS’te 17–20 mm, AFI’de 16–20 mm',
          'Style 1S: AMS’te 14–18 mm, AFI’de 13–18 mm',
          'Style 4S: AMS’te “yarım tane ve parçalar 10–14 mm”, AFI’de “en az %50 yarım tane 10–14 mm”',
          'Style 8: AMS’te “parça/un, 4 mm altı”, AFI’de “fines or meal” (ince parça veya un)',
        ],
      },
      {
        heading: 'Etiketleme Biçimi',
        paragraphs: [
          'AMS standardı, sınıfın yanına kalite derecesini ve varsa kavurma biçimini de yazmayı ister: Premium için PREM, Commercial için COM; kavrulmuş üründe DR (tuzsuz kuru kavrulmuş), DRS (kuru kavrulmuş ve tuzlanmış), OR (yağda kavrulmuş) ve ORS (yağda kavrulmuş ve tuzlanmış). Standart dışı sınıflar “SP” ön ekiyle belirtilir. Standardın verdiği örnek etiket şöyledir: yüzde 70 bütün, yüzde 30 yarım taneden oluşan 17–20 mm’lik kuru kavrulmuş ve tuzlanmış bir parti “PREM Style 1 70%W 17-20mm DRS” olarak yazılır.',
          'AFI spesifikasyonu kalite derecelerini de tanımlar: Premium iç, belirgin kusuru olmayan tam olgunlaşmış içtir; Commercial iç, yüzey renk değişimi ve olgunlaşmamışlık gibi küçük görsel kusurlar taşıyabilir ve genellikle doğranarak ya da kaplanarak işlenir; Reject iç ise böcek hasarı, küf, iç renk değişimi gibi kusurlar taşır.',
        ],
      },
      {
        heading: 'Hangi Sınıf Nerede Kullanılır?',
        paragraphs: [
          'Avustralya makadamya endüstrisinin yayımladığı önerilen kullanım tablosu sınıfları uygulamalara eşler:',
        ],
        list: [
          'Çerezlik ve karışık kuruyemiş: Style 0–4L (bütün ve iri yarım taneler)',
          'Çikolata ve şekerleme: Style 1–6 ile ezme',
          'Fırın ürünleri ve ekmek: Style 4L–8 ile ezme',
          'Dondurma, tatlı ve üzerine serpme: Style 5–7 ile ezme',
        ],
      },
      {
        heading: 'Sipariş Ederken Nelere Dikkat Etmeli?',
        paragraphs: [
          'Spesifikasyonda sınıf numarasının yanında hangi standarda atıf yapıldığı (AMS mı, AFI mi), kalite derecesi, kavurma biçimi ve kabul edilen tolerans açıkça yazılmalıdır. Sınıf tanımları belgeden belgeye birkaç milimetre oynadığı için yalnızca “Style 1” yazmak, iki tarafın farklı ürün beklemesine yol açabilir. Toptan makadamya tedariki için makadamya ürün sayfamıza bakabilir, ihtiyacınızı teklif formu üzerinden paylaşabilirsiniz.',
        ],
      },
    ],
    faq: [
      {
        question: 'Style 0 ile Style 1 arasındaki fark nedir?',
        answer:
          'AMS standardında Style 0 en az yüzde 95 bütün tanedir ve 20 mm’nin üzerindedir; Style 1 ise en az yüzde 90 bütün tanedir ve 17–20 mm aralığındadır. AFI spesifikasyonunda Style 1 16–20 mm olarak tanımlanır.',
      },
      {
        question: 'Style 4L ne demek?',
        answer:
          'Style 4L, AMS standardında en az yüzde 80 yarım taneden oluşan ve 13 mm’nin üzerindeki içi tanımlar. Yarım tane ağırlıklı bu sınıf, görünümün önemli olduğu fırın ürünlerinde ve çerez karışımlarında kullanılır.',
      },
      {
        question: 'Style 8 nedir, nerede kullanılır?',
        answer:
          'Style 8, AMS standardında 4 mm’nin altındaki parça ve undur; AFI bunu “fines or meal” olarak adlandırır. Fırın ürünlerinde, ekmek ve soslarda, ezme üretiminde kullanılır.',
      },
    ],
    sources: cite(
      'tr',
      'amsKernelStandard',
      'amsTechnicalGuide',
      'afiMacadamiaSpec',
      'wikiMacadamia',
    ),
    relatedProducts: ['macadamia'],
  },
  {
    id: 'aflatoxin-in-nuts',
    slug: 'kuruyemiste-aflatoksin',
    metaTitle: 'Kuruyemişte Aflatoksin: Limitler ve Önlem',
    metaDescription:
      'Aflatoksin nedir, kuruyemişte Türkiye ve AB limitleri kaçtır, sınırda hangi ürüne kaç kontrol uygulanır, numune nasıl alınır ve bulaşma nasıl önlenir?',
    eyebrow: 'Rehber',
    heading: 'Kuruyemişte Aflatoksin: Limitler, Kontroller ve Önlem',
    lead: 'Aflatoksin, kuruyemiş ticaretinde bir partinin reddedilmesine yol açabilecek başlıkların başında gelir. Bu rehber aflatoksinin ne olduğunu, Türkiye ve Avrupa Birliğinde kuruyemiş için geçerli maksimum limitleri, sınırdaki kontrolleri, numune alma kurallarını ve tedarik zincirindeki önlemleri kaynaklarıyla anlatır.',
    image: libraryImages.pistachio,
    imageAlt: 'Antep fıstığı içi — yeşil, dökme',
    published: ADDED,
    updated: ADDED,
    sections: [
      {
        heading: 'Aflatoksin Nedir?',
        paragraphs: [
          'Aflatoksinler, başlıca Aspergillus flavus ve Aspergillus parasiticus küflerinin ürettiği mikotoksinlerdir. Dünya Sağlık Örgütü bu küflerin toprakta, çürüyen bitki artıklarında ve tahıllarda geliştiğini; etkilenen ürünler arasında sert kabuklu meyvelerin — Antep fıstığı, badem, ceviz, hindistan cevizi ve Brezilya cevizi — sayıldığını belirtir.',
          'Bulaşma hem hasattan önce hem sonra olabilir ve işleme ile ortadan kalkmaz: DSÖ’ye göre mikotoksinlerin çoğu kimyasal olarak kararlıdır ve gıda işlemeden sağ çıkar. Sağlık etkileri ciddidir; yüksek dozda akut zehirlenmeye (aflatoksikoz) yol açabilir, genotoksiktir ve insanda karaciğer kanseri yaptığına dair kanıt vardır. Uluslararası Kanser Araştırmaları Ajansı (IARC) aflatoksinleri (B1, B2, G1, G2, M1) Grup 1 — insanda kanserojen — olarak sınıflandırır.',
        ],
      },
      {
        heading: 'Türkiye’de Maksimum Limitler',
        paragraphs: [
          'Türkiye’de limitler, 5 Kasım 2023 tarihli ve 32360 sayılı Resmî Gazete’de yayımlanan Türk Gıda Kodeksi Bulaşanlar Yönetmeliği ile belirlenir. Yönetmeliğin 5 inci maddesi açıktır: Ek-1’de yer alan ve maksimum limiti aşan miktarda bulaşan içeren gıdalar piyasaya arz edilemez, gıdalarda ham madde veya gıda bileşeni olarak kullanılamaz; limitlere uygun gıdalar, limiti aşanlarla karıştırılamaz.',
          'Ek-1’de cevizin kendi satırı yoktur; ceviz “sert kabuklu meyveler” kategorisindedir. Kademeli geçiş tarihleri (31/12/2024 ve 31/12/2025) geçtiği için bugün geçerli olan değerler şunlardır — birim µg/kg:',
        ],
        list: [
          'Sert kabuklu meyveler, ayıklama veya diğer fiziksel işlemlere tabi tutulacak olanlar (satır 1.1.6): B1 için 5,0 — B1, B2, G1 ve G2 toplamı için 10,0',
          'Sert kabuklu meyveler, son tüketiciye arz edilenler veya gıda bileşeni olarak kullanılanlar (satır 1.1.7): B1 için 2,0 — toplam için 4,0',
          'Badem, Antep fıstığı ve kayısı çekirdeği (satır 1.1.8 ve 1.1.9): ayıklanacaklarda 12,0/15,0; son tüketiciye arz edilenlerde 8,0/10,0',
          'Fındık (satır 1.1.10 ve 1.1.11): ayıklanacaklarda 8,0/15,0; son tüketiciye arz edilenlerde 5,0/10,0',
          'Ek-1’in notu: sert kabuklu meyveler kabuklarıyla birlikte analiz edilirse, aflatoksin miktarı hesaplanırken bulaşanın tümüyle yenilebilir kısımda olduğu kabul edilir.',
        ],
      },
      {
        heading: 'Ayıklanacak Partilerde Etiket Zorunluluğu',
        paragraphs: [
          'Yüksek limitten yararlanan partilerin etiketi bunu söylemek zorundadır. Yönetmeliğin 8 inci maddesi, son tüketiciye arz edilmeden önce ayıklama veya diğer fiziksel işlemlere tabi tutulacak ürünlerde şu ifadenin bulunmasını ister: “Son tüketici için piyasaya arz edilmeden veya gıda bileşeni olarak kullanılmadan önce [bulaşanın adı] miktarını azaltmak amacıyla ayıklama veya diğer fiziksel işlemlere tabi tutulması gereken ürün”. Aynı madde, parti tanımlama kodunun her ambalajın etiketinde ve belgelerde silinmeyecek biçimde yer almasını da zorunlu kılar.',
        ],
      },
      {
        heading: 'Avrupa Birliğindeki Limitler',
        paragraphs: [
          'AB tarafında maksimum limitler, 2023/915 sayılı Komisyon Tüzüğü’nün Ek-1’inde yer alır; tüzüğün 2 nci maddesi, Ek-1’de listelenen gıdaların maksimum limiti aşan bulaşan içermesi hâlinde piyasaya arz edilemeyeceğini ve gıdada ham madde ya da bileşen olarak kullanılamayacağını söyler. Satır numaraları ve değerler Türk mevzuatıyla birebir örtüşür: ayıklanacak sert kabuklu meyvelerde B1 5,0 ve toplam 10,0 µg/kg; son tüketiciye arz edilenlerde 2,0 ve 4,0 µg/kg.',
          'Diğer satırlar da aynıdır: badem, Antep fıstığı ve kayısı çekirdeğinde 12,0/15,0 ve 8,0/10,0; fındık ve Brezilya cevizinde 8,0/15,0 ve 5,0/10,0. Kuru incirin kendi satırı vardır: 6,0/10,0. İki mevzuatın aynı değerlerde buluşması, AB’ye ihracat yapan bir tedarikçi için tek bir spesifikasyonla çalışmayı mümkün kılar.',
        ],
      },
      {
        heading: 'Sınırda Artırılmış Kontrol: Hangi Ürün, Hangi Oran?',
        paragraphs: [
          'Limitlerin yanında, bazı ülke-ürün çiftleri için giriş noktasında artırılmış kontrol uygulanır. Bunu düzenleyen 2019/1793 sayılı Komisyon Uygulama Tüzüğü’nün Ek-II’sinde Türkiye satırı iki ürün içerir: kuru incir ve ürünleri “aflatoksinler ve okratoksin A” tehlikesiyle yüzde 30 sıklıkta, kabuklu Antep fıstığı, Antep fıstığı içi ve fıstık ezmesi gibi ürünler “aflatoksinler” tehlikesiyle yüzde 50 sıklıkta kimlik ve fiziksel kontrole tabidir. Ayrıca ABD menşeli olup Türkiye’den sevk edilen Antep fıstığı için ayrı bir satır vardır; orada da oran yüzde 50’dir.',
          'Ceviz bu tüzükte geçmez: Türkiye menşeli ceviz, artırılmış kontrol ve özel koşul rejimine tabi değildir; genel maksimum limitlere ve olağan resmî kontrollere tabidir. Türkiye tarafındaki uygulama da aynı çerçeveyi izler — Tarım ve Orman Bakanlığının AB’ye kuru meyve ihracatı prosedürü de kapsamına yalnızca kuru incir ve Antep fıstığını alır. Aynı prosedür, Ek-II’de yer almayan ürünlerde model sertifikanın zorunlu olmadığını, ancak ihracatçının ya da alıcının talebi hâlinde prosedür hükümlerine göre düzenlenebileceğini belirtir. Bu, ceviz gibi kapsam dışı ürünlerde alıcı isterse resmî belgeli yola gidilebileceği anlamına gelir.',
        ],
      },
      {
        heading: 'Numune Alma: Rakamların Ağırlığı',
        paragraphs: [
          'Aflatoksin partide homojen dağılmaz; bu yüzden numune alma kuralları mevzuatla belirlenmiştir. AB’de geçerli kural, 401/2006 sayılı Tüzüğü yürürlükten kaldıran 2023/2782 sayılı Komisyon Uygulama Tüzüğü’dür — laboratuvar raporu isterken hangi yönteme göre numune alındığını sormak bu yüzden anlamlıdır.',
          'Sert kabuklu meyveler, iri parçacıklı ürünler grubundadır. Kural şu şekildedir: birincil numunenin ağırlığı yaklaşık 200 gramdır; 15 tondan büyük partilerde 100 birincil numune alınır ve bunlar 20 kilogramlık bir toplu numune oluşturur, bu numune karıştırılıp öğütülmeden önce 10’ar kilogramlık iki laboratuvar numunesine bölünür. 15 tonun altındaki partilerde birincil numune sayısı 10 ile 100 arasında değişir ve toplu numune 20 kilograma kadar çıkar.',
        ],
      },
      {
        heading: 'Tedarik Zincirinde Önleme',
        paragraphs: [
          'Codex Alimentarius’un sert kabuklu meyvelerde aflatoksinin önlenmesine ilişkin uygulama kuralları, ilk savunma hattını iyi tarım uygulamaları olarak tanımlar; ardından iyi üretim ve iyi depolama uygulamaları gelir. Aynı belgenin verdiği eşikler pratikte yol göstericidir: Aspergillus flavus ve A. parasiticus, su aktivitesi 0,70’in altında, bağıl nem yüzde 70’in altında ve sıcaklık 10 °C’nin altında gelişemez ve aflatoksin üretemez.',
          'Operasyonel karşılığı üç adımdır: kabuğu ayrılan ürün en kısa sürede, 25 °C’de 0,70’in altında su aktivitesine karşılık gelen güvenli nem düzeyine kurutulmalı; böcek zararlısı görmüş ve erken çatlamış taneler ayıklamada mutlaka uzaklaştırılmalı (bunlar yüksek aflatoksin riski taşır); depo temiz, kuru ve havalandırılmış olmalı, mümkünse bağıl nem yüzde 70’in altında ve sıcaklık 0–10 °C aralığında tutulmalıdır. Ayıklama görünür küfü almakla bitmez; küf görünmemesi aflatoksin bulunmadığı anlamına gelmediği için analiz raporu ve numune alma yöntemi sözleşmede tanımlanmalıdır.',
        ],
      },
    ],
    faq: [
      {
        question: 'Cevizde aflatoksin limiti nedir?',
        answer:
          'Cevizin ayrı bir satırı yoktur; “sert kabuklu meyveler” kategorisine girer. Türk Gıda Kodeksi Bulaşanlar Yönetmeliği’nde ve AB’nin 2023/915 sayılı Tüzüğü’nde bugün geçerli değerler aynıdır: ayıklanacak partilerde aflatoksin B1 için 5,0 µg/kg ve toplam için 10,0 µg/kg; son tüketiciye arz edilenlerde 2,0 ve 4,0 µg/kg.',
      },
      {
        question: 'Aflatoksin pişirmeyle yok olur mu?',
        answer:
          'Hayır. Dünya Sağlık Örgütü, mikotoksinlerin çoğunun kimyasal olarak kararlı olduğunu ve gıda işlemeden sağ çıktığını belirtir. Bu nedenle çözüm bulaşmayı önlemek, riskli taneleri ayıklamak ve partiyi analizle doğrulamaktır.',
      },
      {
        question: 'Aflatoksin analizinde neden bu kadar büyük numune alınır?',
        answer:
          'Bulaşma partide homojen dağılmadığı için. AB’nin 2023/2782 sayılı Tüzüğü’ne göre sert kabuklu meyvelerde birincil numune yaklaşık 200 gramdır; 15 tondan büyük partilerde 100 birincil numune alınır, 20 kilogramlık toplu numune oluşturulur ve bu numune öğütülmeden önce 10’ar kilogramlık iki laboratuvar numunesine bölünür.',
      },
    ],
    sources: cite(
      'tr',
      'tgkBulasanlar',
      'tgkBulasanlarEk1',
      'eu2023_915',
      'eu2019_1793',
      'eu2023_2782',
      'gkgmDriedFruitExport',
      'codexAflatoxinTreeNuts',
      'whoMycotoxins',
      'iarcClassifications',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios'],
  },
  {
    id: 'buying-nuts-wholesale',
    slug: 'toptan-kuruyemis-alirken-dikkat-edilecekler',
    metaTitle: 'Toptan Kuruyemiş Alırken Nelere Dikkat Edilmeli?',
    metaDescription:
      'Toptan kuruyemiş alımında kalite kriterleri, analiz raporları, numune, ambalaj, teslim şekli ve tedarikçi seçimi. Kurumsal alıcılar için kontrol listesi.',
    eyebrow: 'Rehber',
    heading: 'Toptan Kuruyemiş Alırken Nelere Dikkat Edilmeli?',
    lead: 'Toptan kuruyemiş alımı, perakende alışverişten çok daha fazla değişken içerir: Ürün kalitesi, gıda güvenliği, ambalaj, teslim koşulları ve tedarikçinin güvenilirliği aynı anda değerlendirilmelidir. Bu rehber, kurumsal alıcılar için temel bir kontrol listesi sunar.',
    image: libraryImages.pistachio,
    imageAlt: 'Antep fıstığı içi — yeşil, dökme',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: '1. İhtiyacınızı Net Tanımlayın',
        paragraphs: [
          'Doğru teklif almanın ilk adımı ihtiyacı açık tanımlamaktır. Aynı ürün adı altında çok farklı kalite ve fiyatlar bulunur; ne istediğinizi ne kadar net ifade ederseniz teklifleri o kadar sağlıklı karşılaştırırsınız.',
        ],
        list: [
          'Ürün ve biçim (kabuklu veya iç)',
          'Boy (yarım, çeyrek, kırık, pirinç vb.) ve renk sınıfı',
          'İşlem durumu (çiğ, kavrulmuş, tuzlu vb.)',
          'Yıllık veya dönemlik tahmini miktar',
          'Ambalaj tipi ve birim ağırlığı',
          'Teslim yeri ve takvimi',
        ],
      },
      {
        heading: '2. Kalite Kriterlerini Yazılı Olarak İsteyin',
        paragraphs: [
          'Kaliteyi yoruma bırakmamak için ürün spesifikasyonunun yazılı olarak paylaşılmasını isteyin. Kuruyemişte genellikle boy dağılımı, renk, nem, kırık oranı, yabancı madde ve duyusal özellikler (koku, tat) değerlendirilir.',
        ],
      },
      {
        heading: '3. Analiz Raporlarını İsteyin',
        paragraphs: [
          'Kuruyemişte gıda güvenliği vazgeçilmez bir kriterdir. Aflatoksin ve pestisit kalıntıları için yasal üst sınırlar bulunur (AB’de 2023/915 ve 396/2005 sayılı tüzükler; Türkiye’de mikotoksinler için Türk Gıda Kodeksi Bulaşanlar Yönetmeliği). Codex Alimentarius da kuruyemiş gibi düşük nemli gıdalarda başlıca mikrobiyolojik tehlike olarak Salmonella’yı gösterir. Bu nedenle parti bazında aflatoksin, pestisit kalıntısı ve mikrobiyolojik analiz raporu istemek yerinde bir taleptir.',
          'Tedarikçinin gıda işletmesi olarak yasal kayıt veya onay durumu, ürünlerin parti bazında izlenebilirliği ve varsa sahip olduğu gıda güvenliği yönetim sistemleri de değerlendirilmelidir.',
        ],
      },
      {
        heading: '4. Numune Alın ve Teslimatla Karşılaştırın',
        paragraphs: [
          'Büyük hacimli bir alımdan önce numune istemek, kaliteyi kendi kullanımınızda test etmenize imkân verir. Onaylanan numuneden bir miktar saklamak ise teslim edilen partiyi sonradan bu numuneyle karşılaştırmanızı sağlar.',
        ],
      },
      {
        heading: '5. Ambalaj ve Taşıma Koşullarını Belirleyin',
        paragraphs: [
          'Kuruyemiş ısı ve nemden etkilenir; sıcak ve nemli koşullar küf gelişimini ve aflatoksin oluşumunu kolaylaştırır. Ambalajın ürünü koruma düzeyi (vakum, modifiye atmosfer, çok katlı ambalaj) ve taşıma sırasında sıcaklık ile nemin kontrol altında tutulması, teslim edilen ürünün kalitesini doğrudan etkiler.',
        ],
      },
      {
        heading: '6. Teslim ve Ödeme Koşullarını Netleştirin',
        paragraphs: [
          'Uluslararası alımlarda teslim şekli (EXW, FOB, CIF gibi Incoterms kuralları), sigorta, gümrük sorumluluğu ve ödeme koşulları sözleşmede açıkça belirtilmelidir. Bu koşullar, iki teklif arasındaki gerçek fiyat farkını anlamak için de gereklidir.',
        ],
      },
      {
        heading: '7. Alımı Yeni Sezona Göre Planlayın',
        paragraphs: [
          'Tedarikçinizden ürünün hangi hasat yılına (mahsul yılına) ait olduğunu belirtmesini isteyin ve alımlarınızı yeni sezon mahsulünün piyasaya çıktığı döneme göre planlayın. Ceviz gibi yağ oranı yüksek ürünlerde tazelik zamanla azalır; bu yüzden aynı ürünün eski ve yeni mahsulü aynı değildir.',
        ],
      },
      {
        heading: '8. Tedarikçiyi Değerlendirin',
        paragraphs: [
          'Tedarikçiyi yalnızca fiyata göre değil, iletişimdeki şeffaflığa, kalite tutarlılığına, teslimat güvenilirliğine ve sorun çıktığında üstlendiği sorumluluğa göre de değerlendirin. Fiyat dışındaki bu ölçütler — analiz raporu, ambalaj, teslim koşulu ve teslimat düzeni — tekrarlayan alımlarda toplam maliyeti fiyat kadar etkiler.',
        ],
      },
    ],
    faq: [
      {
        question: 'Toptan kuruyemiş alırken hangi belgeler istenmeli?',
        answer:
          'Genellikle ürün spesifikasyonu, aflatoksin ve pestisit kalıntısı gibi analiz raporları ile tedarikçinin gıda işletmesi kayıt veya onay bilgileri talep edilir. Uluslararası alımlarda menşe belgeleri ile varış ülkesinin istediği bitki sağlığı veya resmî sertifikalar da önem taşır.',
      },
    ],
    sources: cite(
      'tr',
      'codexAflatoxinTreeNuts',
      'codexLowMoisture',
      'eu2023_915',
      'eu396_2005',
      'tgkContaminantsNews',
      'law5996',
      'usdaShelledWalnutsPdf',
      'incoterms',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios', 'pumpkin-seed-kernels'],
  },
  {
    id: 'nut-export-documents',
    slug: 'kuruyemis-ihracati-icin-gerekli-belgeler',
    metaTitle: 'Kuruyemiş İhracatı İçin Gerekli Belgeler',
    metaDescription:
      'Kuruyemiş ihracatında sıkça istenen belgeler: ticari fatura, menşe şahadetnamesi, bitki sağlık sertifikası, analiz raporları ve varış ülkesine göre ek gereklilikler.',
    eyebrow: 'Rehber',
    heading: 'Kuruyemiş İhracatı İçin Gerekli Belgeler',
    lead: 'Kuruyemiş ihracatında sevkiyatın sorunsuz ilerlemesi, doğru belgelerin eksiksiz hazırlanmasına bağlıdır. Gerekli belgeler ürüne ve varış ülkesine göre değişse de çoğu sevkiyatta ortak bir belge seti bulunur. Bu rehber, sık istenen belgeleri genel hatlarıyla özetler.',
    image: libraryImages.sunflowerInShell,
    imageAlt: 'Çerezlik ay çekirdeği — kabuklu, dökme',
    published: PUBLISHED,
    updated: UPDATED,
    sections: [
      {
        heading: 'Önemli Not',
        paragraphs: [
          'Bu yazı genel bilgilendirme amaçlıdır. İhracat mevzuatı ürüne, varış ülkesine ve zamana göre değişir. Sevkiyat öncesinde güncel gereklilikleri Ticaret Bakanlığı, Tarım ve Orman Bakanlığı, üyesi olduğunuz ihracatçı birliği veya gümrük müşavirinizle teyit etmeniz gerekir.',
        ],
      },
      {
        heading: 'Ön Koşul: İhracatçı Birliği Üyeliği',
        paragraphs: [
          '5910 sayılı Kanun’un 4. maddesine göre ihracatçıların ilgili ihracatçı birliğine üye olmaları zorunludur. Ürün grubunuzun sektörel birliği (örneğin ceviz ve Antep fıstığı için kuru meyve ve mamulleri ihracatçı birlikleri) mevzuat ve süreçler konusunda da yol gösterir.',
        ],
      },
      {
        heading: 'Ticari Belgeler',
        paragraphs: ['Hemen her ihracat sevkiyatında bulunan temel belgeler şunlardır:'],
        list: [
          'Ticari fatura: Ürün, miktar, birim fiyat ve teslim şeklini gösterir.',
          'Çeki listesi (packing list): Ambalajların (koli, çuval vb.) sayısını, içeriğini ve ağırlıklarını gösterir.',
          'Taşıma belgesi: Deniz yolunda konşimento, kara yolunda CMR, hava yolunda hava yük senedi kullanılır.',
          'Gümrük beyannamesi: Ürünün doğru GTİP koduyla beyan edilmesi gerekir.',
        ],
      },
      {
        heading: 'Menşe Belgeleri',
        paragraphs: [
          'Menşe şahadetnamesi, eşyanın tercihli olmayan menşeini gösterir ve ithalatçı ülke istediğinde düzenlenir. İhracatçı veya kanuni temsilcisi belgeyi elektronik ortamda doldurup imzalar; ticaret veya sanayi odası ya da ihracatçı birliği inceleyerek onaylar. Bazı ülkeler ayrıca kendi konsolosluklarının onayını isteyebilir.',
          'Tercihli ticaret anlaşması bulunan ülkelere yapılan ihracatta, indirimli gümrük vergisinden yararlanmak için EUR.1 gibi menşe ispat belgeleri kullanılır; Avrupa Birliğine ihraç edilen tarım ürünleri de bu kapsamdadır.',
        ],
      },
      {
        heading: 'Bitki Sağlığı ve Gıda Güvenliği Belgeleri',
        paragraphs: [
          'Bitkisel ürünlerin ihracatında birçok ülke, Tarım ve Orman Bakanlığı tarafından düzenlenen bitki sağlık sertifikası ister.',
          'Kuruyemişte aflatoksin ve pestisit kalıntısı için yasal üst sınırlar bulunduğundan alıcılar analiz raporu isteyebilir; bazı ürün ve pazarlarda bu rapor zorunludur.',
          'Avrupa Birliği, bu yazının hazırlandığı tarihte (2019/1793 sayılı Uygulama Tüzüğünün 30 Haziran 2026’dan beri geçerli hâli), Türkiye menşeli Antep fıstığı ve Antep fıstığı içeren ürünlerin sevkiyatlarının %50’sini aflatoksin, kuru incir ve kuru incir içeren ürünlerin sevkiyatlarının %30’unu aflatoksin ve okratoksin A açısından kimlik ve fiziki kontrole tabi tutmaktadır. Bu sevkiyatlara, yetkili makamın düzenlediği resmî sertifika ile numune alma ve analiz sonuçları eşlik etmelidir. Liste en geç altı ayda bir gözden geçirildiği için güncel hâli resmî metinden teyit edilmelidir.',
        ],
      },
      {
        heading: 'Varış Ülkesine Özgü Gereklilikler',
        paragraphs: ['Bazı ülkeler ek gereklilikler uygular:'],
        list: [
          'Üretici tesisin varış ülkesinde önceden kayıtlı olması (örneğin Çin, kendisine gıda ihraç eden yurt dışındaki üreticilerin Çin Gümrük Genel İdaresine (GACC) kayıtlı olmasını şart koşar; bu yazının hazırlandığı tarihte, 1 Haziran 2026’dan beri yürürlükte olan 280 sayılı düzenlemeye göre kuruyemiş, tohumlar ve kuru meyveler, kayıt başvurusuna ihracatçı ülkenin yetkili makamının denetim raporu ve tavsiye mektubunun eklenmesi gereken ürün grupları arasındadır)',
          'Ülkeye özgü etiketleme ve ambalaj kuralları',
          'Varış ülkesinin gıda mevzuatının öngördüğü ek analiz veya sertifikalar',
        ],
      },
      {
        heading: 'Doğru GTİP Kodu Neden Önemli?',
        paragraphs: [
          'Ürünün doğru GTİP koduyla beyan edilmesi, uygulanacak vergileri, istenecek belgeleri ve tabi olunacak kontrolleri belirler. Örneğin Armonize Sistem’de (HS) kabuğu çıkarılmış ceviz içi 0802.32, kabuğu çıkarılmış Antep fıstığı 0802.52 alt pozisyonunda yer alır; kavrulmuş veya işlenmiş ürünler ise genellikle 20. fasılda sınıflandırılır. 12 haneli kodun güncel tarife cetvelinden teyit edilmesi gerekir.',
        ],
      },
    ],
    faq: [
      {
        question: 'Kuruyemiş ihracatı için hangi belgeler gerekir?',
        answer:
          'Hemen her sevkiyatta ticari fatura, çeki listesi, taşıma belgesi ve gümrük beyannamesi bulunur. Menşe şahadetnamesi veya EUR.1 gibi menşe belgeleri, bitki sağlık sertifikası ve analiz raporları ise varış ülkesine ve alıcının talebine göre istenir. Güncel gereklilikler yetkili kurumlardan teyit edilmelidir.',
      },
      {
        question: 'Kuruyemiş ihracatı için ihracatçı birliğine üye olmak gerekir mi?',
        answer:
          'Evet. 5910 sayılı Kanun’un 4. maddesine göre ihracatçıların ilgili ihracatçı birliğine üye olmaları zorunludur.',
      },
    ],
    sources: cite(
      'tr',
      'law5910',
      'gaibAbout',
      'oaibDocuments',
      'originFaq',
      'originGuide',
      'customsCommunique149',
      'plantHealthExports',
      'eu2019_1793',
      'gainDecree280',
      'gainDecree280Guidance',
      'wcoHs2022',
      'tariffFaq',
    ),
    relatedProducts: ['walnut-kernels', 'pistachios', 'sunflower-kernels'],
  },
]
