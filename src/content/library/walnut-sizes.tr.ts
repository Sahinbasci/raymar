import { libraryImages } from './images'
import { cite } from './sources'
import type { ProductPage } from './types'

/*
 * Ceviz içi boyları — boy başına bir sayfa, `walnut-kernels` sayfasının altında.
 *
 * "kırık ceviz içi toptan", "kırık ceviz içi nedir", "pirinç ceviz nedir",
 * "çeyrek ceviz içi" ve "yarım ceviz içi" ayrı ayrı aranıyor (Google otomatik
 * tamamlama, 2026-09-15 ve 2026-09-18): alıcı boyu bilerek arıyor ve genel
 * ceviz içi sayfası o aramanın cevabı değil.
 *
 * Adlar Raymar Nuts'ın ürün adlarıdır (yarım, çeyrek, kırık, pirinç), ama
 * tanımlar standartlara dayanır ve fark açıkça yazılır: TS 1276'da (Resmî
 * Gazete 2008/53; UİB Ek-1/C'deki 2010 ve 2012 tadilleriyle güncel metin)
 * "kırık (pirinç)" TEK tiptir — 8 mm'lik elekten geçip 3 mm'lik elekte kalan
 * parçalar. Raymar'ın "kırık" dediği daha iri parçalar standartta "büyük"
 * tipine karşılık gelir. Bu ayrım yazılmazsa bir alıcı "kırık" sipariş edip
 * standarttaki kırığı (yani pirinci) bekleyebilir.
 *
 * 2026-09-18 kaynak denetimiyle çıkarılanlar: "aynı renk sınıfında tadı
 * yarımla aynı" (kaynağı yok; standartlar yalnızca kalite sınıfının boydan
 * ayrı belirlendiğini söylüyor), "pirinç tanesi büyüklüğünde" (standart boyu
 * elekle tanımlar), "baklavalık ceviz = iki boy" (standartta böyle bir tip
 * yok), çeyreğin fiyatı hakkındaki karşılaştırmalar (kaynağı yok).
 *
 * Şirkete özgü teknik değer (nem, kalibre, menşei, minimum sipariş, fiyat)
 * yazılmaz. Milimetre değerleri standardın tanımıdır, ürün şartnamesi değil.
 */
export const walnutSizesTr: readonly ProductPage[] = [
  {
    id: 'walnut-halves',
    parent: 'walnut-kernels',
    slug: 'yarim-ceviz-ici',
    name: 'Yarım Ceviz İçi',
    metaTitle: 'Toptan Yarım Ceviz İçi: Özellikler ve Kullanım',
    metaDescription:
      'Toptan yarım ceviz içi: TS 1276 ve ABD standardındaki tanımı, renk sınıfı seçimi, kullanım alanları, sipariş kriterleri, depolama ve fiyat teklifi.',
    eyebrow: 'Ceviz İçi',
    heading: 'Toptan Yarım Ceviz İçi',
    lead: 'Yarım ceviz içi, ceviz içinin yaklaşık eşit iki parçaya ayrılmış hâlidir; Türk Standardı TS 1276’da “yarım (çenet)” olarak tanımlanır. Cevizin doğal biçimiyle görünmesi istenen ürünlerde tercih edilir. Raymar Nuts, yarım ceviz içini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.walnutHalves,
    imageAlt: 'Yarım ceviz içi — bütün yarımlar, yakın çekim',
    sections: [
      {
        heading: 'Yarım Ceviz İçi Nedir?',
        paragraphs: [
          'TS 1276, yarımı bütün ceviz içinin yaklaşık olarak eşit şekilde ikiye ayrılmış parçası olarak tanımlar. ABD Tarım Bakanlığının (USDA) standardında yarım iç, en fazla sekizde biri kopmuş yarımdır; bir partinin “halves” (yarım) sayılması için ağırlıkça en az yüzde 85’inin yarımlardan oluşması gerekir.',
          'Kırmada elde edilen yarım miktarı kabuğun yapısına bağlıdır: Kaliforniya Üniversitesinde (UC Davis) yapılan bir araştırmaya göre dikiş yeri zayıf olan kabuklar yanlış yönde kırılır ve yarım elde edilmesini azaltır ya da engeller.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Yarım ceviz içi, cevizin doğal biçimiyle görünmesi istenen ürünlerde kullanılır:',
        ],
        list: [
          'Pasta, kek ve tatlı süslemesi',
          'Çikolata ve şekerleme',
          'Çerezlik ürünler ve kuruyemiş karışımları',
        ],
      },
      {
        heading: 'Renk Sınıfı Seçimi',
        paragraphs: [
          'Yarımlar çoğunlukla görünür bir malzeme olarak kullanıldığı için renk bu boyda özellikle önemlidir. USDA standardı rengi açıktan koyuya Extra Light, Light, Light Amber ve Amber sınıflarıyla tanımlar; California Walnuts, estetik nedenlerle en çok açık renkli cevizin tercih edildiğini belirtir. Ticarette boy ve renk birlikte söylenir: “Light Halves”, Light renk sınıfındaki yarımlar demektir.',
        ],
      },
      {
        heading: 'Sipariş Verirken Belirtilmesi Gerekenler',
        paragraphs: [
          'Teklif isterken şu bilgileri netleştirmek karşılaştırmayı kolaylaştırır:',
        ],
        list: [
          'Renk sınıfı',
          'Partide kabul edilen yarım dışı parça oranı',
          'Ambalaj tipi ve koli ağırlığı',
          'Yaklaşık miktar, teslim yeri ve takvimi',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Ceviz yağının yaklaşık yüzde 72’si çoklu doymamış yağdır; bu oran çoğu kuruyemişten yüksektir ve ceviz içini oksidasyona açık hâle getirir. Isı ve ışık oksidasyonu hızlandırır. Yarım ceviz içi serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda ve kokulu maddelerden uzakta saklanmalıdır. TS 1276, uzun süre bekletilecek ceviz içinin bağıl nemi yüzde 50’nin altındaki soğuk hava depolarında tutulmasını ister.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Yarım ceviz içi fiyatı renk sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyacınızı teklif formu üzerinden paylaşın; ekibimiz size uygun seçeneklerle dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Yarım ceviz içi neden kırık ceviz içinden pahalıdır?',
        answer:
          'Yarımların bütün kalması gerekir ve piyasa raporları yarımların parça cevizden daha yüksek fiyatla alındığını gösterir; USDA’nın 2024 tarihli Ukrayna raporu bunun bir örneğidir. Kalite sınıfı boydan ayrı belirlendiği için aynı sınıfta parça ceviz de bulunabilir.',
      },
      {
        question: 'Yarım ceviz içi hangi ürünlerde kullanılır?',
        answer:
          'Pasta ve tatlı süslemesi, çikolata ve şekerleme ile çerezlik ürünler gibi cevizin doğal biçimiyle görünmesi istenen ürünlerde kullanılır.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'walnutSutureStrength',
      'wikiWalnut',
      'gainUkraineTreeNuts2025',
    ),
    relatedGuides: ['walnut-kernel-grades', 'walnut-colour-grades'],
  },
  {
    id: 'walnut-quarters',
    parent: 'walnut-kernels',
    slug: 'ceyrek-ceviz-ici',
    name: 'Çeyrek Ceviz İçi',
    metaTitle: 'Toptan Çeyrek Ceviz İçi: Özellikler ve Kullanım',
    metaDescription:
      'Toptan çeyrek ceviz içi: TS 1276 ve UNECE standardındaki tanımı, kek, kurabiye ve fırın ürünlerinde kullanımı, sipariş kriterleri, depolama ve teklif.',
    eyebrow: 'Ceviz İçi',
    heading: 'Toptan Çeyrek Ceviz İçi',
    lead: 'Çeyrek ceviz içi, bütün ceviz içinin uzunlamasına yaklaşık eşit dört parçaya ayrılmış hâlidir; TS 1276 ve UNECE standardı bu tipi aynı biçimde tanımlar. Cevizin üründe iri parçalar hâlinde hissedilmesi istendiğinde kullanılır. Raymar Nuts, çeyrek ceviz içini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.walnutQuarters,
    imageAlt: 'Çeyrek ceviz içi — iri parçalı, dökme',
    sections: [
      {
        heading: 'Çeyrek Ceviz İçi Nedir?',
        paragraphs: [
          'TS 1276, çeyreği bütün ceviz içinin uzunluğuna yaklaşık olarak eşit şekilde dörde ayrılmış parçası olarak tanımlar. Birleşmiş Milletler Avrupa Ekonomik Komisyonunun ceviz içi standardı UNECE DDP-02 de “quarters” tipini uzunlamasına dörde bölünmüş iç olarak tanımlar.',
          'ABD standardında ayrı bir çeyrek sınıfı yoktur; çeyrek büyüklüğündeki parçalar orada “pieces” (parça) sınıfına girer.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Çeyrek ceviz içi, cevizin üründe iri parçalar hâlinde hissedilmesi istendiğinde kullanılır:',
        ],
        list: [
          'Kek, kurabiye ve muffin',
          'Cevizli ekmek ve fırın ürünleri',
          'Brownie ve tart',
          'Bar ürünleri ve dondurma',
        ],
      },
      {
        heading: 'Sipariş Kriterleri',
        paragraphs: ['Çeyrek ceviz içi alırken genellikle şu kriterler belirtilir:'],
        list: [
          'Parça büyüklüğünün homojenliği',
          'İnce parça ve toz oranı',
          'Renk sınıfı',
          'Ambalaj tipi, miktar ve teslim koşulları',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Çeyrek ceviz içi ısı, ışık, nem ve oksijenden etkilenir; serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanmalıdır. California Walnuts, açılan ambalajdaki cevizin hava geçirmez bir kaba aktarılmasını önerir; TS 1276, uzun süre bekletilecek ceviz içinin soğuk hava deposunda tutulmasını ister.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan çeyrek ceviz içi fiyatı renk sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyacınızı teklif formu üzerinden paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Çeyrek ceviz içi ile kırık ceviz içi arasındaki fark nedir?',
        answer:
          'Çeyrek, uzunlamasına yaklaşık dörde bölünmüş düzenli bir parçadır. Raymar Nuts’ın ürün listesindeki kırık ceviz içi ise çeyrekten küçük, düzensiz parçalardır; TS 1276’da bu büyüklük “büyük” tipine karşılık gelir. Fark doku ve görünümdedir; kalite sınıfı boydan ayrı belirlenir.',
      },
      {
        question: 'Çeyrek ceviz içi en çok nerede kullanılır?',
        answer:
          'Kek, kurabiye, cevizli ekmek ve brownie gibi cevizin iri parçalar hâlinde hissedilmesi istenen fırın ürünlerinde kullanılır.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'cwBuyCare',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
  {
    id: 'walnut-pieces',
    parent: 'walnut-kernels',
    slug: 'kirik-ceviz-ici',
    name: 'Kırık Ceviz İçi',
    metaTitle: 'Toptan Kırık Ceviz İçi: Özellikler ve Kullanım',
    metaDescription:
      'Kırık ceviz içi nedir? TS 1276’daki karşılığı, pastane ve gıda sanayisindeki kullanımı, renk seçimi, sipariş kriterleri, depolama ve fiyat teklifi.',
    eyebrow: 'Ceviz İçi',
    heading: 'Toptan Kırık Ceviz İçi',
    lead: 'Kırık ceviz içi, Raymar Nuts’ın ürün listesinde çeyrekten küçük, pirinçten iri, düzensiz ceviz içi parçalarının adıdır. Bu büyüklük Türk Standardı TS 1276’da “büyük” tipine karşılık gelir; standartta “kırık” adı pirinç boyu ifade eder. Cevizin bütün görünmesinin gerekmediği ürünlerde kullanılır.',
    image: libraryImages.walnutBroken,
    imageAlt: 'Kırık ceviz içi — naylon kaplı koli içinde',
    sections: [
      {
        heading: 'Kırık Ceviz İçi Nedir?',
        paragraphs: [
          'TS 1276, “büyük” tipini bütün ceviz içinin yarısının dörtte üçünden küçük ama kırık parçadan büyük parça olarak tanımlar; UNECE’nin DDP-02 standardı bu büyüklüğü “large pieces” olarak adlandırır. ABD standardında ise 24/64 inçlik (yaklaşık 9,5 mm) yuvarlak delikli elekten geçmeyen parçalar “pieces” sınıfındadır.',
          'Adlandırma: TS 1276’da “kırık (pirinç)” 8 mm’lik elekten geçip 3 mm’lik elekte kalan en ince fraksiyondur ve bu sayfalarda “pirinç” denen boya karşılık gelir; bir tanenin dörtte birinden küçük, kırıktan iri düzensiz parçalar ise standartta “büyük” tipidir ve Raymar Nuts’ın listesinde “kırık ceviz içi” adıyla satılır. Bu yüzden siparişte tip adının yanına standart tipini ya da elek aralığını yazmak gerekir.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Kırık ceviz içi, cevizin tat ve doku için kullanıldığı ancak bütün görünmesinin gerekmediği ürünlerde tercih edilir:',
        ],
        list: [
          'Kek, kurabiye ve fırın ürünleri',
          'Çikolata ve bar ürünleri',
          'Dondurma',
          'Hazır kek ve pasta karışımları',
        ],
      },
      {
        heading: 'Renk Seçimi',
        paragraphs: [
          'Görünümün önemli olduğu ürünlerde açık renk sınıfları seçilir; rengin ön planda olmadığı kullanımlarda daha koyu sınıflar da değerlendirilebilir. California Walnuts, Light Amber sınıfını daha ekonomik bir seçenek olarak tanımlar.',
        ],
      },
      {
        heading: 'Sipariş Kriterleri',
        paragraphs: ['Kırık ceviz içi alırken genellikle şu kriterler netleştirilir:'],
        list: [
          'Parça büyüklüğü aralığı veya standart tipi',
          'İnce parça ve toz oranı',
          'Kabuk parçası ve yabancı madde toleransı',
          'Renk sınıfı',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Küçük parçalar bütün içlere göre daha kısa sürede bozulur: UC Davis hasat sonrası uzmanları, doğranmış bademin, pikan cevizinin ve fındığın bütün hâllerine göre yaklaşık yarı süre saklanabildiğini belirtir. Bu yüzden kırık ceviz içinde serin, kuru ve karanlık depolama, hava geçirmez ambalaj ve düzenli stok devri daha da önemlidir; uzun süreli stoklar soğuk hava deposunda tutulmalıdır.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Kırık ceviz içinde yarım görünüm şartı aranmaz; USDA’nın 2024 tarihli Ukrayna raporu da parça cevizin yarımlardan daha düşük fiyatla alındığını aktarır. Fiyat renk sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir; ihtiyacınızı teklif formu üzerinden paylaşın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Kırık ceviz içi nedir?',
        answer:
          'Raymar Nuts’ın ürün listesinde kırık ceviz içi, çeyrekten küçük ve pirinçten iri, düzensiz ceviz içi parçalarıdır. TS 1276’da bu büyüklük “büyük” tipine karşılık gelir; standartta “kırık (pirinç)” adı 3–8 mm arasındaki en küçük parçalar için kullanılır.',
      },
      {
        question: 'Kırık ceviz içi kalitesiz midir?',
        answer:
          'Hayır. TS 1276 ve UNECE DDP-02’de kalite sınıfı (Ekstra, Sınıf I, Sınıf II) boydan ayrı belirlenir; her boy bu sınıflardan birinde olabilir. Farklar parça büyüklüğü ve daha kısa saklama ömrüdür.',
      },
      {
        question: 'Kırık ceviz içi daha çabuk bozulur mu?',
        answer:
          'Küçük parçalar bütün içlere göre daha kısa sürede bozulur. Serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanmalı; açılan ambalaj kısa sürede tüketilmelidir.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeColor',
      'ucDavisDicedNuts',
      'gainUkraineTreeNuts2025',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
  {
    id: 'walnut-small-pieces',
    parent: 'walnut-kernels',
    slug: 'pirinc-ceviz-ici',
    name: 'Pirinç Ceviz İçi',
    metaTitle: 'Toptan Pirinç Ceviz İçi: Pirinç Ceviz Nedir?',
    metaDescription:
      'Pirinç ceviz nedir? TS 1276’daki 3–8 mm’lik kırık (pirinç) tipi, baklava ve iç harçtaki kullanımı, toz cevizden farkı, depolama ve toptan fiyat teklifi.',
    eyebrow: 'Ceviz İçi',
    heading: 'Toptan Pirinç Ceviz İçi',
    lead: 'Pirinç ceviz içi, ceviz içinin en küçük boyudur. Türk Standardı TS 1276 bu tipi “kırık (pirinç)” adıyla, 8 mm’lik elekten geçen ancak 3 mm’lik elekte kalan parçalar olarak tanımlar. Raymar Nuts, pirinç ceviz içini kurumsal alıcılara toptan olarak tedarik eder.',
    image: libraryImages.walnutSmall,
    imageAlt: 'Pirinç ceviz içi — en küçük boy, dökme',
    sections: [
      {
        heading: 'Pirinç Ceviz Nedir?',
        paragraphs: [
          'TS 1276, kırık (pirinç) tipini bütün ceviz içinin göz açıklığı 8 mm olan elekten geçen ancak göz açıklığı 3 mm olan elekten geçemeyen parçası olarak tanımlar. UNECE DDP-02 aynı aralığı “broken pieces” olarak adlandırır; ABD standardında buna en yakın sınıf, 24/64 inçlik elekten geçip 8/64 inçlik elekte kalan “small pieces” sınıfıdır.',
          'Raymar Nuts’ın ürün listesinde “pirinç”, standarttaki bu en küçük tipi; “kırık” ise daha iri parçaları ifade eder. Siparişte standart tipini belirtmek karışıklığı önler.',
        ],
      },
      {
        heading: 'Kullanım Alanları',
        paragraphs: [
          'Pirinç ceviz içi, cevizin ürüne eşit dağılması istenen kullanımlarda tercih edilir:',
        ],
        list: [
          'Baklava, kadayıf ve şerbetli tatlılar',
          'Kurabiye ve hamur işi iç harçları',
          'Muhammara gibi mezeler',
          'Tatlı ve dondurma üst süslemesi',
        ],
      },
      {
        heading: 'Pirinç Ceviz ile Toz Ceviz Arasındaki Fark',
        paragraphs: [
          'Pirinç ceviz, standarda göre 3–8 mm aralığındaki parçalardan oluşur. Toz ceviz (ceviz unu) ise cevizin en ince biçimidir; California Walnuts’a göre iri öğütülmüşten ince toza kadar değişen kıvamlarda olur ve kek üzerine serpmede, hamurlarda ve ceviz bazlı karışımlarda kullanılır.',
        ],
      },
      {
        heading: '“Baklavalık Ceviz” Hangi Boydur?',
        paragraphs: [
          '“Baklavalık ceviz” standart bir boy adı değildir; TS 1276’nın tipleri arasında yer almaz. Bu adla satılan ürünün boyunu standart belirlemediği için siparişte standart tipini veya parça aralığını belirtmek gerekir. Cevizli baklavada genellikle ince kıyılmış ceviz kullanılır.',
        ],
      },
      {
        heading: 'Depolama',
        paragraphs: [
          'Küçük parçalar bütün içlere göre daha kısa sürede bozulur; UC Davis hasat sonrası uzmanları doğranmış kuruyemişin (badem, pikan cevizi, fındık) bütün hâline göre yaklaşık yarı süre saklanabildiğini belirtir. Pirinç ceviz serin, kuru ve karanlık bir ortamda, hava geçirmez ambalajda saklanmalı; California Walnuts’ın önerdiği gibi stoklar ilk giren ilk çıkar usulüyle döndürülmelidir.',
        ],
      },
      {
        heading: 'Fiyat Teklifi',
        paragraphs: [
          'Toptan pirinç ceviz içi fiyatı renk sınıfı, miktar, ambalaj ve teslim koşuluna göre değişir. İhtiyacınızı teklif formu üzerinden paylaşın; ekibimiz size dönüş yapsın.',
        ],
      },
    ],
    faq: [
      {
        question: 'Pirinç ceviz nedir?',
        answer:
          'Pirinç ceviz, ceviz içinin en küçük boyudur. TS 1276’da “kırık (pirinç)” adıyla, 8 mm’lik elekten geçen ancak 3 mm’lik elekte kalan parçalar olarak tanımlanır. Baklava, kadayıf ve iç harçlarda kullanılır.',
      },
      {
        question: 'Baklavalık ceviz hangi boydur?',
        answer:
          '“Baklavalık ceviz” standart bir boy adı değildir ve TS 1276’da tanımlanmaz. Cevizli baklavada genellikle ince kıyılmış ceviz kullanılır; siparişte istediğiniz standart tipini veya parça aralığını belirtin.',
      },
    ],
    sources: cite(
      'tr',
      'ts1276Gazette',
      'ts1276Current',
      'uneceWalnutKernels',
      'usdaShelledWalnuts',
      'cwSizeChart',
      'cwHandlingStorage',
      'ucDavisDicedNuts',
      'wikiBaklava',
      'wikiMuhammara',
      'vikipediKadayif',
    ),
    relatedGuides: ['walnut-kernel-grades', 'storing-walnut-kernels'],
  },
]
