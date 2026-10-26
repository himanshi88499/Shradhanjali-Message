import { DatabaseSchema } from './types';

export const initialDatabase: DatabaseSchema = {
  users: [
    {
      id: 'usr_admin',
      name: 'Admin',
      email: 'Admin@Shradhanjalimsg.com',
      passwordHash: '$2b$10$ntOgfqDwsCfZJRHMebpEBeex3ApMBnnrQZgyJSsg1P6/jkm9BMXRK', // Karan@#0007043
      role: 'admin',
      avatar: '/images/author-team.jpg',
      bio: 'શ્રદ્ધાંજલિ પોર્ટલના મુખ્ય એડમિનિસ્ટ્રેટર',
      createdAt: '2025-01-01T00:00:00.000Z',
    },
  ],
  authors: [
    {
      id: 'author-1',
      name: 'હિના પટેલ',
      roleTitle: 'લેખક અને સમાજસેવિકા',
      bio: 'હું હિના પટેલ, છેલ્લા 5 વર્ષથી ગુજરાતી ભાષામાં શ્રદ્ધાંજલિ, શોક સંદેશ અને જીવન મૂલ્ય સંબંધિત લેખો લખું છું. મારો ઉદ્દેશ્ય છે કે આ શબ્દો દ્વારા સંવેદનાઓ જોડાય અને લોકોના હૃદયને શાંતિ મળે.',
      avatar: '/images/author-hina.jpg',
      socials: {
        twitter: 'https://twitter.com',
        instagram: 'https://instagram.com',
        youtube: 'https://youtube.com',
      },
    },
    {
      id: 'author-2',
      name: 'શ્રદ્ધાંજલિ સંપાદકીય ટીમ',
      roleTitle: 'સંપાદકીય મંડળ',
      bio: 'આપણા સમાજ અને સંસ્કૃતિના સાચા મૂલ્યોને ઉજાગર કરતા, સ્મૃતિઓ અને સંતોષજનક વિચારો લોકો સુધી પહોંચાડવા માટે કાર્યરત ટીમ.',
      avatar: '/images/author-team.jpg',
      socials: {
        website: 'https://shradhanjali.in',
      },
    },
  ],
  categories: [
    {
      id: 'cat-1',
      name: 'શ્રદ્ધાંજલિ સંદેશ',
      slug: 'shradhanjali',
      description: 'પ્રિયજનને યાદ કરવા માટે ભાવપૂર્ણ સંદેશો',
      image: '/images/card-1-diya.jpg',
      icon: 'Heart',
      order: 1,
    },
    {
      id: 'cat-2',
      name: 'પુણ્યતિથિ',
      slug: 'punyatithi',
      description: 'પુણ્યતિથિ પર શુભેચ્છા અને સંદેશ',
      image: '/images/card-2-lotus.jpg',
      icon: 'Sparkles',
      order: 2,
    },
    {
      id: 'cat-3',
      name: 'શાયરી',
      slug: 'shayari',
      description: 'હૃદયસ્પર્શી શ્રદ્ધાંજલિ શાયરીઓ',
      image: '/images/card-3-sunset-person.jpg',
      icon: 'Feather',
      order: 3,
    },
    {
      id: 'cat-4',
      name: 'માહિતી',
      slug: 'information',
      description: 'અંતિમ સંસ્કાર, વિધિ, અને ઉપયોગી માહિતી',
      image: '/images/card-4-hands-flowers.jpg',
      icon: 'BookOpen',
      order: 4,
    },
    {
      id: 'cat-5',
      name: 'વિશેષ લેખ',
      slug: 'vishesh-lekh',
      description: 'જીવન, સંસ્કાર અને પ્રેરણાદાયક લેખો',
      image: '/images/card-12-scriptures.jpg',
      icon: 'Scroll',
      order: 5,
    },
    {
      id: 'cat-6',
      name: 'અમારા વિશે',
      slug: 'about',
      description: 'અમારી દ્રષ્ટિ, ઉદ્દેશ્ય અને સેવા',
      image: '/images/card-10-temple-dusk.jpg',
      icon: 'Users',
      order: 6,
    },
  ],
  tags: [
    { id: 'tag-1', name: 'માતાજી', slug: 'mataji' },
    { id: 'tag-2', name: 'પિતાજી', slug: 'pitaji' },
    { id: 'tag-3', name: 'દાદા-દાદી', slug: 'dada-dadi' },
    { id: 'tag-4', name: 'ભાવપૂર્ણ', slug: 'bhavpurna' },
    { id: 'tag-5', name: 'શોક સંદેશ', slug: 'shok-sandesh' },
    { id: 'tag-6', name: 'સંસ્કાર', slug: 'sanskar' },
  ],
  posts: [
    {
      id: 'post-1',
      title: 'પિતાશ્રીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ',
      slug: 'pitashrini-punyatithi-par-shradhanjali-sandesh',
      excerpt: 'પિતાશ્રી યાદ હંમેશા આપણા હૃદયમાં જીવંત રહેલે... તેમની પ્રેરણા અને મૂલ્યોને યાદ કરતા શ્રેષ્ઠ સંદેશાઓ.',
      quote: 'પિતા એ વટવૃક્ષ છે જેની છાયામાં આખો પરિવાર સુરક્ષિત રહે છે.',
      featuredImage: '/images/card-1-diya.jpg',
      imageAlt: 'પિતાશ્રી સ્મરણ દીવો',
      categoryId: 'cat-1',
      categoryName: 'શ્રદ્ધાંજલિ સંદેશ',
      categorySlug: 'shradhanjali',
      authorId: 'author-1',
      status: 'published',
      readingTime: '5 મિનિટ વાંચો',
      views: 1420,
      publishedAt: '2025-04-12T10:00:00.000Z',
      updatedAt: '2025-04-12T10:00:00.000Z',
      tags: ['પિતાજી', 'પુણ્યતિથિ', 'ભાવપૂર્ણ'],
      showTableOfContents: true,
      seoTitle: 'પિતાશ્રીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ | શ્રદ્ધાંજલિ',
      seoDescription: 'પિતાશ્રીની પુણ્યતિથિ પર શ્રેષ્ઠ ભાવપૂર્ણ ગુજરાતી શ્રદ્ધાંજલિ સંદેશાઓ, શાયરી અને સ્મરણ પંક્તિઓ.',
      focusKeyword: 'પિતાશ્રીની પુણ્યતિથિ',
      messageCards: [
        {
          id: 1,
          text: 'પિતાજી, તમારો કઠોર પરિશ્રમ અને અમને આપેલી ઉમદા કેળવણી અમારા જીવનનો પાયો છે. તમારી વાર્ષિક પુણ્યતિથિ પર કોટિ કોટિ વંદન.',
        },
        {
          id: 2,
          text: 'જેમણે પોતાના સપના ભૂલીને અમારા સપના સાકાર કર્યા, તેવા પૂજ્ય પિતાશ્રીની પવિત્ર સ્મૃતિને ભાવભીની શ્રદ્ધાંજલિ.',
        },
        {
          id: 3,
          text: 'પિતાની હાજરી એ સુરક્ષાની છત્રછાયા છે. ભલે તમે આજે અમારી સાથે નથી, પણ તમારા આદર્શો હંમેશા અમારી સાથે રહેશે.',
        },
        {
          id: 4,
          text: 'સંઘર્ષમાં હાર ન માનવી અને સત્યના માર્ગે ચાલવું એ આપે જ શીખવ્યું છે. પૂજ્ય પિતાજીના દિવ્ય આત્માને પ્રભુ શાંતિ અર્પે.',
        },
        {
          id: 5,
          text: 'પિતાજી, તમારી વાતો, તમારી હૂંફ અને તમારી મૌન કાળજી આજે ખૂબ યાદ આવે છે. ભાવપૂર્ણ શ્રદ્ધાંજલિ.',
        },
        {
          id: 6,
          text: 'તમે શીખવેલું સ્વાભિમાન અને ઈમાનદારી અમારા જીવનની સૌથી મોટી મૂડી છે. પિતાશ્રીને નમન.',
        },
        {
          id: 7,
          text: 'ઈશ્વર દરેક જગ્યાએ પહોંચી નથી શકતો એટલે તેણે પિતાનું સર્જન કર્યું. આપની પુણ્યતિથિએ અંજલિ અર્પણ.',
        },
        {
          id: 8,
          text: 'પિતાજીની યાદો અમારા જીવનનો દીવાદાંડી બનીને અમને અંધકારમાંથી પ્રકાશ તરફ દોરી જાય છે.',
        },
        {
          id: 9,
          text: 'પૂજ્ય પિતાશ્રી, આપના ચરણોમાં શ્રદ્ધાસુમન અર્પણ કરતા અમારું મસ્તક સદાય નમેલું રહેશે.',
        },
        {
          id: 10,
          text: 'તમારા વગર ઘર અધૂરું છે, પણ તમારી સ્મૃતિઓથી આખું જીવન ભરેલું છે. ઓમ શાંતિ.',
        },
      ],
      content: `## પિતાના આશીર્વાદ અને સંસ્કારો

પિતાનું સ્થાન પરિવારમાં અદ્વિતીય હોય છે. પિતા બહારથી કઠોર દેખાય પણ અંદરથી પુષ્કળ સ્નેહ ધરાવતા હોય છે. તેમની પુણ્યતિથિ પર તેમને આદરપૂર્વક યાદ કરવાથી આપણને માનસિક બળ મળે છે.

### પિતાના જીવનમૂલ્યો

તેમના શિસ્તબદ્ધ જીવન અને પરિશ્રમમાંથી શીખ મેળવવી એ જ સાચી અંજલિ છે.`,
    },
    {
      id: 'post-2',
      title: 'માતાની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ',
      slug: 'matani-punyatithi-par-shradhanjali-sandesh',
      excerpt: 'માતાની મમતા અને આશીર્વાદ જીવનભર સાથે છે... તેમની યાદમાં લખેલા ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશો.',
      quote: 'માતાનો પ્રેમ કદી ભુલાય નહિ... એ તો જીવનભરનું આશીર્વાદ છે.',
      featuredImage: '/images/card-2-lotus.jpg',
      imageAlt: 'માતાજી પુણ્યતિથિ કમળ પુષ્પ',
      categoryId: 'cat-2',
      categoryName: 'પુણ્યતિથિ',
      categorySlug: 'punyatithi',
      authorId: 'author-1',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 980,
      publishedAt: '2025-04-10T09:00:00.000Z',
      updatedAt: '2025-04-10T09:00:00.000Z',
      tags: ['માતાજી', 'પુણ્યતિથિ', 'સંસ્કાર'],
      showTableOfContents: true,
      seoTitle: 'માતાની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ | શ્રદ્ધાંજલિ',
      seoDescription: 'માતાની પુણ્યતિથિ પર ભાવભીના ગુજરાતી સંદેશા અને સંસ્મરણો.',
      focusKeyword: 'માતાની પુણ્યતિથિ',
      messageCards: [
        {
          id: 1,
          text: 'માતાજી, તમે અમને જે પ્રેમ, સંસ્કાર અને આશીર્વાદ આપ્યા છે, એ જીવનભર અમારું માર્ગદર્શન કરશે. તમારી યાદો હંમેશા અમારા દિલમાં જીવંત રહેશે. ભાવપૂર્ણ શ્રદ્ધાંજલિ.',
        },
        {
          id: 2,
          text: 'માતાજીનું સ્મરણ જ જીવનની પ્રેરણા છે. તેમનું હસતું મુખ અને મમતા ભરેલો સ્પર્શ આજે પણ યાદ આવે છે. પ્રભુ તેમના દિવ્ય આત્માને પરમ શાંતિ અર્પે.',
        },
        {
          id: 3,
          text: 'તમે હંમેશા અમારી સાથે છો... અમારી દરેક સફળતામાં, હરેક ખુશીમાં અને દુઃખમાં. તમારા આશીર્વાદ અમને હંમેશા મળતા રહે. ભાવપૂર્ણ શ્રદ્ધાંજલિ.',
        },
        {
          id: 4,
          text: 'માતાજી, તમારું જીવન એક પ્રેરણાયક કથા છે. તમારા સંસ્કારો અમને હંમેશા સાચો માર્ગ બતાવતા રહેશે. શ્રદ્ધાંજલિ.',
        },
        {
          id: 5,
          text: 'માતાના ખોળા જેવો આશરો દુનિયામાં ક્યાંય નથી મળતો. માતાજી, તમારી અછત ક્યારેય પુરાઈ શકે તેમ નથી. તમારી પવિત્ર સ્મૃતિને કોટિ કોટિ વંદન.',
        },
        {
          id: 6,
          text: 'જે ઘરમાં મા ની હાજરી નથી હોતી તે ઘર સુનું લાગે છે. હે માતાજી, તમે જ્યાં પણ હોવ, તમારા સંતાનો પર સ્નેહની છત્રછાયા રાખજો. ઓમ શાંતિ.',
        },
        {
          id: 7,
          text: 'તમારી નિસ્વાર્થ સેવા અને બલિદાનને અમે ક્યારેય ભૂલી શકીશું નહીં. માતાજી, તમારી પુણ્યતિથિ પર અમારી હૃદયપૂર્વકની શ્રદ્ધાંજલિ અર્પણ કરીએ છીએ.',
        },
        {
          id: 8,
          text: 'આંખો ભીની છે અને હૃદય ભારે છે, પણ તમારી શીખામણો અમને હિંમત આપે છે. માતાજીની દિવ્ય સ્મૃતિને નમન.',
        },
        {
          id: 9,
          text: 'માતાજી, તમારો પ્રેમ સાક્ષાત ઈશ્વરનો આશીર્વાદ હતો. તમારી શાંત છબી હંમેશા અમારા હૃદયમંદિરમાં સ્થાપિત રહેશે.',
        },
        {
          id: 10,
          text: 'સ્નેહ અને વાત્સલ્યની મૂર્તિ સમાન અમારા પૂજ્ય માતાજીની વાર્ષિક પુણ્યતિથિ પર ભાવભીની શ્રદ્ધાંજલિ.',
        },
      ],
      content: `## માતાજી પર શ્રદ્ધાંજલિ સંદેશ

માતાજીનું જીવન પ્રેમ, ત્યાગ અને સંસ્કારોની ખાણ હતું. તેમના આશીર્વાદ, સંઘર્ષ અને સ્નેહ આજે પણ અમારા હૃદયમાં જીવંત છે. અહીં અમુક પસંદગીના શ્રદ્ધાંજલિ સંદેશો આપેલા છે, જે તમે તમારા હૃદયની ભાવનાઓ વ્યક્ત કરવા માટે ઉપયોગ કરી શકો છો.

### માતાજી માટે શાયરી

માતાની યાદો જ્યારે આંખોમાં આંસુ બનીને વહે છે, ત્યારે શબ્દો જ મનની શાંતિ બને છે. માતાજીના ચરણોમાં શ્રદ્ધાસુમન અર્પણ કરવા માટે નીચેના સંદેશાઓ ઉત્તમ છે.`,
    },
    {
      id: 'post-3',
      title: 'શ્રદ્ધાંજલિ શાયરી – હૃદયસ્પર્શી પંક્તિઓ',
      slug: 'shradhanjali-shayari-hridaysparshi-panktiyo',
      excerpt: 'યાદોનું ઝરણું ક્યારેય સુકાતું નથી... દિલના ઉંડાણમાંથી નીકળતી શ્રદ્ધાંજલિ શાયરીઓ.',
      quote: 'યાદો એ જીવનની સૌથી સુંદર સંપત્તિ છે.',
      featuredImage: '/images/card-3-sunset-person.jpg',
      imageAlt: 'શ્રદ્ધાંજલિ શાયરી સ્મરણ સંધ્યા',
      categoryId: 'cat-3',
      categoryName: 'શાયરી',
      categorySlug: 'shayari',
      authorId: 'author-1',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 1890,
      publishedAt: '2025-04-08T11:30:00.000Z',
      updatedAt: '2025-04-08T11:30:00.000Z',
      tags: ['શાયરી', 'ભાવપૂર્ણ'],
      showTableOfContents: true,
      seoTitle: 'શ્રદ્ધાંજલિ શાયરી ગુજરાતી | હૃદયસ્પર્શી પંક્તિઓ',
      seoDescription: 'ગુજરાતી શ્રદ્ધાંજલિ શાયરી અને કાવ્ય પંક્તિઓ સગા-સ્નેહીઓ માટે.',
      focusKeyword: 'શ્રદ્ધાંજલિ શાયરી',
      messageCards: [
        {
          id: 1,
          text: 'જિંદગીની રાહમાં તમે છોડી ગયા સાથ,\nયાદો તમારી બની ગઈ અમારો સહારો નાથ.\nઆંખો ભીની થાય જ્યારે આવે તમારી યાદ,\nહૃદયથી અર્પીએ છીએ ભાવપૂર્ણ શ્રદ્ધાંજલિ સાદ.',
        },
        {
          id: 2,
          text: 'ફૂલ ખીલીને કરમાઈ જાય છે,\nપણ તેની સુગંધ હવામાં રહી જાય છે.\nમાણસ દુનિયા છોડી જાય છે,\nપણ તેની સ્મૃતિઓ હૃદયમાં વસી જાય છે.',
        },
        {
          id: 3,
          text: 'નથી શબ્દો કે વ્યક્ત કરી શકીએ દર્દ અમારું,\nતમારા ગયા પછી સુનું થઈ ગયું આંગણું તમારું.\nઈશ્વર તમારા આત્માને આપે પરમ સુખ,\nબસ આ જ પ્રાર્થનામાં સમાયું છે અમારું દુઃખ.',
        },
        {
          id: 4,
          text: 'તમારી વાતો, તમારું હાસ્ય ક્યારેય ભુલાશે નહિ,\nસમય વહી જશે પણ તમારો સ્નેહ ઘટશે નહિ.\nભાવભીની અશ્રુપૂરિત શ્રદ્ધાંજલિ.',
        },
      ],
      content: `## શ્રદ્ધાંજલિ શાયરીનું મહત્વ

લાગણીઓને જ્યારે સામાન્ય વાક્યોમાં ઢાળવી અઘરી બને ત્યારે કાવ્યાત્મક પંક્તિઓ હૃદયના તાર ઝણઝણાવે છે. અહીં આપેલી શાયરીઓ સદ્ગતની સ્મૃતિમાં સમર્પિત છે.`,
    },
    {
      id: 'post-4',
      title: 'અંતિમ સંસ્કારની વિધિ અને મહત્વ',
      slug: 'antim-sanskar-vidhi-ane-mahatva',
      excerpt: 'અંતિમ સંસ્કાર એક ધાર્મિક અને સામાજિક વિધિ છે. ભારતીય સંસ્કૃતિમાં તેનું આધ્યાત્મિક મહત્વ સમજો.',
      featuredImage: '/images/card-4-hands-flowers.jpg',
      imageAlt: 'અંતિમ સંસ્કાર વિધિ અને દીપ',
      categoryId: 'cat-4',
      categoryName: 'માહિતી',
      categorySlug: 'information',
      authorId: 'author-2',
      status: 'published',
      readingTime: '7 મિનિટ વાંચો',
      views: 750,
      publishedAt: '2025-04-05T08:00:00.000Z',
      updatedAt: '2025-04-05T08:00:00.000Z',
      tags: ['સંસ્કાર', 'માહિતી'],
      showTableOfContents: true,
      seoTitle: 'અંતિમ સંસ્કારની વિધિ અને મહત્વ | ધાર્મિક માહિતી',
      seoDescription: 'અંતિમ સંસ્કાર વિધિ, ગરુડ પુરાણ અનુસાર તેનું મહત્વ અને સામાજિક રિવાજો.',
      focusKeyword: 'અંતિમ સંસ્કાર વિધિ',
      messageCards: [
        {
          id: 1,
          text: 'જીવન અનિત્ય છે અને આત્મા અમર છે. અંતિમ યાત્રા એ જીવની પરમાત્મા તરફની યાત્રા છે. સદ્ગતના આત્માને મોક્ષ મળે તેવી પ્રાર્થના.',
        },
        {
          id: 2,
          text: 'દુઃખની આ ઘડીમાં સમગ્ર પરિવારને ઈશ્વર ધૈર્ય આપે. ઓમ શાંતિ શાંતિ શાંતિ.',
        },
      ],
      content: `## સોળ સંસ્કારોમાં અંતિમ સંસ્કાર

ભારતીય સનાતન પરંપરામાં મનુષ્ય જીવનના 16 સંસ્કારો વર્ણવવામાં આવ્યા છે, જેમાં અંતિમ સંસ્કાર એટલે કે અગ્નિ સંસ્કાર સૌથી મહત્વનો છે.

### વિધિ અને આત્માની શાંતિ

અંતિમ સંસ્કાર બાદ બેસણું, પ્રાર્થના સભા અને ઉત્તરક્રિયા દ્વારા સદ્ગતના પરિવારને સાંત્વના આપવાની પરંપરા સદીઓ જૂની છે.`,
    },
    {
      id: 'post-5',
      title: 'જીવનમાં સંસ્કારનું મહત્વ',
      slug: 'jivanma-sanskarnu-mahatva',
      excerpt: 'સંસ્કારથી જ જીવન ઉજ્જવળ બને છે. વડીલોના આદર્શો અને જીવનમૂલ્યો પર ચિંતન.',
      featuredImage: '/images/card-5-mountain.jpg',
      imageAlt: 'જીવનમાં સંસ્કાર અને કમળ',
      categoryId: 'cat-5',
      categoryName: 'વિશેષ લેખ',
      categorySlug: 'vishesh-lekh',
      authorId: 'author-2',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 890,
      publishedAt: '2025-04-03T14:00:00.000Z',
      updatedAt: '2025-04-03T14:00:00.000Z',
      tags: ['સંસ્કાર', 'ભાવપૂર્ણ'],
      showTableOfContents: true,
      seoTitle: 'જીવનમાં સંસ્કારનું મહત્વ | પ્રેરણાદાયક લેખ',
      seoDescription: 'ભારતીય પારિવારિક પરંપરામાં સંસ્કારો અને વડીલોના આશીર્વાદનું મૂલ્ય.',
      focusKeyword: 'સંસ્કારનું મહત્વ',
      content: `## સંસ્કાર જ સાચી સંપત્તિ છે

ધન-દોલત તો સમય જતાં નાશ પામે છે, પરંતુ વડીલો દ્વારા વારસામાં મળેલા સંસ્કારો આખી જિંદગી આપણને મુશ્કેલ પરિસ્થિતિઓમાં પણ અડગ રાખે છે.`,
    },
    {
      id: 'post-6',
      title: 'દાદા-દાદીની પુણ્યતિથિ પર સંદેશ',
      slug: 'dada-dadini-punyatithi-par-sandesh',
      excerpt: 'તેમના આશીર્વાદ અને સંસ્મરણો હંમેશા અમારા માથે છત્રછાયા સમાન રહે છે.',
      featuredImage: '/images/card-6-diya-flowers.jpg',
      imageAlt: 'દાદા દાદી સ્મરણ દીવો',
      categoryId: 'cat-1',
      categoryName: 'શ્રદ્ધાંજલિ સંદેશ',
      categorySlug: 'shradhanjali',
      authorId: 'author-1',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 1100,
      publishedAt: '2025-03-31T09:00:00.000Z',
      updatedAt: '2025-03-31T09:00:00.000Z',
      tags: ['દાદા-દાદી', 'ભાવપૂર્ણ'],
      showTableOfContents: true,
      seoTitle: 'દાદા-દાદી માટે ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશ',
      seoDescription: 'દાદા અને દાદીની પુણ્યતિથિ પર યાદગાર ગુજરાતી શ્રદ્ધાંજલિ સંદેશાઓ.',
      focusKeyword: 'દાદા દાદી શ્રદ્ધાંજલિ',
      messageCards: [
        {
          id: 1,
          text: 'પૂજ્ય દાદા-દાદીના વહાલ અને તેમની વાર્તાઓ આજે પણ અમારા કાનમાં ગૂંજે છે. તેમના દિવ્ય આત્માને શત શત નમન.',
        },
        {
          id: 2,
          text: 'ઘરના વડીલ એ કુટુંબનો પાયો છે. પૂજ્ય દાદાજીની પુણ્યતિથિ પર અમારા હૃદયના ભાવભીના પ્રણામ.',
        },
      ],
      content: `## દાદા-દાદીનો નિર્મળ પ્રેમ

બાળપણમાં જેમના ખભા પર બેસીને દુનિયા જોઈ, તેમની સ્મૃતિ ક્યારેય હૃદયમાંથી ભૂંસાતી નથી.`,
    },
    {
      id: 'post-7',
      title: 'ગુરુજીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ',
      slug: 'gurujini-punyatithi-par-shradhanjali',
      excerpt: 'ગુરુજીનો માર્ગદર્શન જીવનભર માટે દીપ સમાન છે. અજ્ઞાનનો અંધકાર દૂર કરનાર ગુરુદેવને વંદન.',
      featuredImage: '/images/card-7-water-lotus.jpg',
      imageAlt: 'ગુરુજી પુણ્યતિથિ કમળ',
      categoryId: 'cat-2',
      categoryName: 'પુણ્યતિથિ',
      categorySlug: 'punyatithi',
      authorId: 'author-1',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 620,
      publishedAt: '2025-03-28T12:00:00.000Z',
      updatedAt: '2025-03-28T12:00:00.000Z',
      tags: ['પુણ્યતિથિ', 'સંસ્કાર'],
      showTableOfContents: true,
      seoTitle: 'ગુરુજીની પુણ્યતિથિ પર શ્રદ્ધાંજલિ સંદેશ',
      seoDescription: 'પૂજ્ય ગુરુદેવની પુણ્યતિથિ પર કૃતજ્ઞતા અને શ્રદ્ધાંજલિ વ્યક્ત કરતા સંદેશાઓ.',
      focusKeyword: 'ગુરુજી પુણ્યતિથિ',
      messageCards: [
        {
          id: 1,
          text: 'ગુરુ બ્રહ્મા ગુરુ વિષ્ણુ ગુરુ દેવો મહેશ્વરા... પૂજ્ય ગુરુજીના ચરણોમાં શ્રદ્ધાપૂર્વક પ્રણામ.',
        },
      ],
      content: `## ગુરુકૃપા અને જીવન સાધના

ગુરુ વિના સાચો માર્ગ મળતો નથી. સદ્ગત ગુરુજીના ઉપદેશો આપણી આંતરિક ચેતનાને હંમેશા જાગૃત રાખે છે.`,
    },
    {
      id: 'post-8',
      title: 'વિદાય શાયરી – હૃદયને સ્પર્શતી પંક્તિઓ',
      slug: 'viday-shayari-hridayne-sparshati-panktiyo',
      excerpt: 'કેટલાક સંબંધો ક્યારેય સમાપ્ત થતા નથી... વિદાયની વેળાએ આંખોમાં છલકાતી ભાવનાઓ.',
      featuredImage: '/images/card-8-sunset-birds.jpg',
      imageAlt: 'વિદાય શાયરી સંધ્યા સ્મરણ',
      categoryId: 'cat-3',
      categoryName: 'શાયરી',
      categorySlug: 'shayari',
      authorId: 'author-1',
      status: 'published',
      readingTime: '4 મિનિટ વાંચો',
      views: 890,
      publishedAt: '2025-03-25T16:00:00.000Z',
      updatedAt: '2025-03-25T16:00:00.000Z',
      tags: ['શાયરી', 'ભાવપૂર્ણ'],
      showTableOfContents: true,
      seoTitle: 'વિદાય શાયરી ગુજરાતી | હૃદયસ્પર્શી સંવેદના',
      seoDescription: 'પ્રિયજનની વિદાય પર સુંદર ગુજરાતી શાયરી અને કવિતા.',
      focusKeyword: 'વિદાય શાયરી',
      messageCards: [
        {
          id: 1,
          text: 'તમારી વિદાયથી ખાલી થયેલી જગ્યા કોઈ ક્યારેય ભરી શકશે નહીં. ઈશ્વર તમને ચિર શાંતિ અર્પે.',
        },
      ],
      content: `## વિદાયની વેદના અને સ્મૃતિ

જીવનમાં જે વ્યક્તિનો સાથ સૌથી વધુ વહાલો હોય, તેમની વિદાય સહન કરવી અત્યંત કઠિન હોય છે.`,
    },
    {
      id: 'post-9',
      title: 'શોક સંદેશ કેવી રીતે લખવો?',
      slug: 'shok-sandesh-kevi-rite-lakhvo',
      excerpt: 'શોક સંદેશ લખતી વખતે ધ્યાનમાં રાખવા જેવી મહત્વપૂર્ણ બાબતો અને યોગ્ય શબ્દોની પસંદગી.',
      featuredImage: '/images/card-9-white-lotus.jpg',
      imageAlt: 'શોક સંદેશ માર્ગદર્શન પુસ્તક અને દીવો',
      categoryId: 'cat-4',
      categoryName: 'માહિતી',
      categorySlug: 'information',
      authorId: 'author-2',
      status: 'published',
      readingTime: '5 મિનિટ વાંચો',
      views: 1250,
      publishedAt: '2025-03-22T10:00:00.000Z',
      updatedAt: '2025-03-22T10:00:00.000Z',
      tags: ['શોક સંદેશ', 'માહિતી'],
      showTableOfContents: true,
      seoTitle: 'શોક સંદેશ કેવી રીતે લખવો? | યોગ્ય માર્ગદર્શન',
      seoDescription: 'ગુજરાતીમાં શોક સંદેશ, બેસણા સંદેશ અને સાંત્વના પત્ર લખવાની સાચી પદ્ધતિ.',
      focusKeyword: 'શોક સંદેશ કેવી રીતે લખવો',
      messageCards: [
        {
          id: 1,
          text: 'આ દુઃખદ સમાચાર સાંભળીને અત્યંત આઘાત લાગ્યો. પ્રભુ સદ્ગતના આત્માને મોક્ષ આપે અને પરિવારને આ વજ્રાઘાત સહન કરવાની શક્તિ આપે.',
        },
        {
          id: 2,
          text: 'અમે તમારા દુઃખમાં પૂર્ણપણે સહભાગી છીએ. કોઈપણ જરૂરિયાત વખતે અમે સદાય તમારી સાથે છીએ.',
        },
      ],
      content: `## શોક સંદેશમાં શાલીનતા અને સંવેદનશીલતા

જ્યારે કોઈ સ્વજનનું અવસાન થાય છે, ત્યારે તેમના શોકગ્રસ્ત પરિવારને શાંતિ અને હિંમત આપતા શબ્દો લખવા અત્યંત જરૂરી છે.`,
    },
    {
      id: 'post-10',
      title: 'પુણ્યતિથિનો મહિમા અને પરંપરા',
      slug: 'punyatithino-mahima-ane-parampara',
      excerpt: 'આપણા સંસ્કૃતિમાં પુણ્યતિથિનું વિશેષ મહત્વ છે. પિતૃ તર્પણ, દાન અને પ્રાર્થનાનું આધ્યાત્મિક રહસ્ય.',
      featuredImage: '/images/card-10-temple-dusk.jpg',
      imageAlt: 'પુણ્યતિથિ મહિમા પવિત્ર જળ અને દીપ',
      categoryId: 'cat-5',
      categoryName: 'વિશેષ લેખ',
      categorySlug: 'vishesh-lekh',
      authorId: 'author-2',
      status: 'published',
      readingTime: '7 મિનિટ વાંચો',
      views: 540,
      publishedAt: '2025-03-18T11:00:00.000Z',
      updatedAt: '2025-03-18T11:00:00.000Z',
      tags: ['પુણ્યતિથિ', 'સંસ્કાર'],
      showTableOfContents: true,
      seoTitle: 'પુણ્યતિથિનો મહિમા અને પરંપરા | ભારતીય સંસ્કૃતિ',
      seoDescription: 'શા માટે પુણ્યતિથિ ઉજવવામાં આવે છે અને તે દિવસે શું પુણ્ય કર્મ કરવું જોઈએ.',
      focusKeyword: 'પુણ્યતિથિ મહિમા',
      content: `## પુણ્યતિથિ એટલે પવિત્ર સ્મરણનો દિવસ

પુણ્યતિથિ એ માત્ર શોકનો દિવસ નથી, પરંતુ સદ્ગત આત્માએ કરેલા સારા કાર્યોને યાદ કરીને દીન-દુઃખિયાને દાન આપવાનો અને સત્કર્મ કરવાનો પાવન અવસર છે.`,
    },
    {
      id: 'post-11',
      title: 'મિત્રના નિધન પર શ્રદ્ધાંજલિ સંદેશ',
      slug: 'mitrana-nidhan-par-shradhanjali-sandesh',
      excerpt: 'મિત્રતા એક અમૂલ્ય બંધન છે. મિત્રની અચાનક વિદાય પર હૃદયદ્રાવક શ્રદ્ધાંજલિ સંદેશાઓ.',
      featuredImage: '/images/card-11-brass-diya.jpg',
      imageAlt: 'મિત્ર શ્રદ્ધાંજલિ સ્મરણ દીપ',
      categoryId: 'cat-1',
      categoryName: 'શ્રદ્ધાંજલિ સંદેશ',
      categorySlug: 'shradhanjali',
      authorId: 'author-1',
      status: 'published',
      readingTime: '4 મિનિટ વાંચો',
      views: 790,
      publishedAt: '2025-03-14T09:30:00.000Z',
      updatedAt: '2025-03-14T09:30:00.000Z',
      tags: ['ભાવપૂર્ણ', 'શોક સંદેશ'],
      showTableOfContents: true,
      seoTitle: 'મિત્રના નિધન પર શ્રદ્ધાંજલિ સંદેશ | મિત્ર સ્મરણ',
      seoDescription: 'સાચા મિત્રની વિદાય પર સંવેદનશીલ ગુજરાતી સંદેશ અને સ્મરણ પંક્તિઓ.',
      focusKeyword: 'મિત્ર શ્રદ્ધાંજલિ',
      messageCards: [
        {
          id: 1,
          text: 'વહાલા દોસ્ત, તું ભલે આજે અમારી વચ્ચે નથી પણ તારી સાથે વિતાવેલી દરેક ક્ષણ હંમેશા અમારા દિલમાં જીવંત રહેશે. અશ્રુભીની શ્રદ્ધાંજલિ.',
        },
      ],
      content: `## સાચા મિત્રની ખોટ ક્યારેય પુરાતી નથી

જે મિત્ર સુખ-દુઃખમાં પડછાયાની જેમ સાથ આપતો હતો, તેની વિદાય હૃદયને હચમચાવી મૂકે છે.`,
    },
    {
      id: 'post-12',
      title: 'શોક અને જીવનનો સત્ય',
      slug: 'shok-ane-jivanno-satya',
      excerpt: 'દુઃખ એ જીવનનો એક હિસ્સો છે. આત્માની અમરતા અને કાળચક્રના સનાતન સિદ્ધાંતોનું વિશ્લેષણ.',
      featuredImage: '/images/card-12-scriptures.jpg',
      imageAlt: 'જીવનનું સત્ય સંધ્યા દ્રશ્ય',
      categoryId: 'cat-5',
      categoryName: 'વિશેષ લેખ',
      categorySlug: 'vishesh-lekh',
      authorId: 'author-2',
      status: 'published',
      readingTime: '6 મિનિટ વાંચો',
      views: 670,
      publishedAt: '2025-03-10T15:00:00.000Z',
      updatedAt: '2025-03-10T15:00:00.000Z',
      tags: ['સંસ્કાર', 'માહિતી'],
      showTableOfContents: true,
      seoTitle: 'શોક અને જીવનનો સત્ય | આધ્યાત્મિક ચિંતન',
      seoDescription: 'ભગવદ્ ગીતા અનુસાર મૃત્યુ અને આત્માની અમરતાનું તાત્વિક દર્શન.',
      focusKeyword: 'જીવનનું સત્ય',
      content: `## વાસાંસિ જીર્ણાનિ યથા વિહાય

જેમ મનુષ્ય જૂના વસ્ત્રો ત્યજીને નવા વસ્ત્રો ધારણ કરે છે, તેમ જીવાત્મા જૂના શરીરને છોડીને નવું શરીર ધારણ કરે છે. આ શાશ્વત સત્ય જ શોકની ઘડીમાં મનને શાંતિ આપે છે.`,
    },
  ],
  pages: [
    {
      id: 'page-home',
      title: 'હોમ',
      slug: 'home',
      content: 'મુખ્ય પૃષ્ઠ',
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'શ્રદ્ધાંજલિ - સ્મૃતિઓમાં સદાય... | ગુજરાતી શ્રદ્ધાંજલિ પોર્ટલ',
      seoDescription: 'ગુજરાતી ભાષામાં શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શુભેચ્છા, શાયરી અને અંતિમ સંસ્કાર સંબંધિત ઉપયોગી માહિતી.',
    },
    {
      id: 'page-about',
      title: 'અમારા વિશે',
      slug: 'about',
      content: 'શ્રદ્ધાંજલિ એક એવું મંચ છે, જ્યાં પ્રિયજનોની યાદોને શબ્દોમાં વ્યક્ત કરવા, સંવેદનશીલ સંદેશ શોધવા અને જીવન તથા સ્મૃતિઓ સંબંધિત ઉપયોગી માહિતી મેળવવા માટે સામગ્રી રજૂ કરવામાં આવે છે.',
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'અમારા વિશે | શ્રદ્ધાંજલિ પોર્ટલ',
      seoDescription: 'શ્રદ્ધાંજલિ પોર્ટલનો પરિચય, અમારો હેતુ, અમારી સફર અને સંપાદકીય ટીમ.',
    },
    {
      id: 'page-contact',
      title: 'સંપર્ક કરો',
      slug: 'contact',
      content: 'તમને કોઈ પ્રશ્ન હોય, સૂચન આપવું હોય કે સાઈટ અંગે કોઈ પણ માહિતી જોઈતી હોય, તો નિઃસંકોચ અમારો સંપર્ક કરો.',
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'સંપર્ક કરો | શ્રદ્ધાંજલિ',
      seoDescription: 'શ્રદ્ધાંજલિ પોર્ટલનો સંપર્ક કરો. ઇમેઇલ, ફોન અથવા સંદેશ ફોર્મ દ્વારા.',
    },
    {
      id: 'page-privacy',
      title: 'ગોપનીયતા નીતિ',
      slug: 'privacy-policy',
      content: `## ગોપનીયતા નીતિ (Privacy Policy)

શ્રદ્ધાંજલિ પોર્ટલ પર આપનું સ્વાગત છે. અમે અમારા મુલાકાતીઓની વ્યક્તિગત ગોપનીયતાનું પૂર્ણ આદર કરીએ છીએ.

### માહિતી સંગ્રહ
અમે મુલાકાતીઓ પાસેથી કોઈ બિનજરૂરી માહિતી એકત્રિત કરતા નથી. સંપર્ક ફોર્મ દ્વારા મોકલેલ નામ અને ઇમેઇલ માત્ર પ્રત્યુત્તર આપવા માટે વપરાય છે.

### કૂકીઝ (Cookies)
સાઈટના બહેતર અનુભવ અને વપરાશકર્તાની પસંદગીઓ (જેમ કે ડે/નાઈટ થીમ) સાચવવા માટે કૂકીઝનો ઉપયોગ થઈ શકે છે.

### તૃતીય પક્ષ સેવાઓ
અમે કોઈ પણ મુલાકાતીની અંગત માહિતી કોઈ અન્ય કંપની કે તૃતીય પક્ષને વેચતા કે શેર કરતા નથી.

### સુરક્ષા
અમારી સાઈટ પર મોકલવામાં આવેલ તમામ વિગતો SSL એન્ક્રિપ્શન દ્વારા સુરક્ષિત છે.`,
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'ગોપનીયતા નીતિ | શ્રદ્ધાંજલિ',
      seoDescription: 'શ્રદ્ધાંજલિ વેબસાઇટની વિગતવાર ગોપનીયતા નીતિ અને ડેટા સુરક્ષા માહિતી.',
    },
    {
      id: 'page-disclaimer',
      title: 'અસ્વીકરણ',
      slug: 'disclaimer',
      content: `## અસ્વીકરણ (Disclaimer)

શ્રદ્ધાંજલિ વેબસાઇટ પર પ્રદર્શિત તમામ સંદેશાઓ, શાયરી અને માહિતી માત્ર સંવેદનાત્મક અભિવ્યક્તિ અને સામાન્ય જાણકારી માટે છે.

### કન્ટેન્ટનો ઉપયોગ
આ સાઈટ પર ઉપલબ્ધ સંદેશાઓ તમે તમારા અંગત ઉપયોગ, કુટુંબીજનો કે સ્નેહીજનો સાથે શેર કરવા માટે મુક્તપણે ઉપયોગ કરી શકો છો.

### ચોકસાઈ અને સત્યતા
અમે માહિતીની શુદ્ધતા માટે બનતા પ્રયાસો કરીએ છીએ, છતાં કોઈ ક્ષતિ જણાય તો અમારો સંપર્ક કરવો.`,
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'અસ્વીકરણ | શ્રદ્ધાંજલિ',
      seoDescription: 'શ્રદ્ધાંજલિ વેબસાઇટનું અસ્વીકરણ અને કાયદાકીય શરતો.',
    },
    {
      id: 'page-terms',
      title: 'નિયમો અને શરતો',
      slug: 'terms',
      content: `## નિયમો અને શરતો (Terms and Conditions)

આ વેબસાઇટનો ઉપયોગ કરતા પહેલા કૃપા કરીને આ નિયમો અને શરતો ધ્યાનપૂર્વક વાંચી લો.

1. આ પોર્ટલનો ઉપયોગ સામાજિક સૌહાર્દ અને શ્રદ્ધાંજલિ અર્પણ કરવા માટે જ કરવો.
2. કોઈપણ પ્રકારનું અસભ્ય કે વાંધાજનક વર્તન સ્વીકાર્ય નથી.
3. તમામ લખાણ પર શ્રદ્ધાંજલિ પોર્ટલનો અધિકાર સુરક્ષિત છે.`,
      status: 'published',
      updatedAt: '2025-04-12T10:00:00.000Z',
      seoTitle: 'નિયમો અને શરતો | શ્રદ્ધાંજલિ',
      seoDescription: 'શ્રદ્ધાંજલિ વેબસાઇટ ઉપયોગ કરવાના નિયમો અને શરતો.',
    },
  ],
  headerMenu: [
    { id: 'm1', label: 'હોમ', url: '/', order: 1 },
    { id: 'm2', label: 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali', order: 2 },
    { id: 'm3', label: 'પુણ્યતિથિ', url: '/category/punyatithi', order: 3 },
    { id: 'm4', label: 'શાયરી', url: '/category/shayari', order: 4 },
    { id: 'm5', label: 'માહિતી', url: '/category/information', order: 5 },
    { id: 'm6', label: 'વિશેષ લેખ', url: '/category/vishesh-lekh', order: 6 },
    { id: 'm7', label: 'અમારા વિશે', url: '/about', order: 7 },
    { id: 'm8', label: 'સંપર્ક', url: '/contact', order: 8 },
  ],
  footerMenu: [
    { id: 'f1', label: 'હોમ', url: '/', order: 1 },
    { id: 'f2', label: 'શ્રદ્ધાંજલિ સંદેશ', url: '/category/shradhanjali', order: 2 },
    { id: 'f3', label: 'પુણ્યતિથિ', url: '/category/punyatithi', order: 3 },
    { id: 'f4', label: 'શાયરી', url: '/category/shayari', order: 4 },
    { id: 'f5', label: 'માહિતી', url: '/category/information', order: 5 },
    { id: 'f6', label: 'વિશેષ લેખ', url: '/category/vishesh-lekh', order: 6 },
    { id: 'f7', label: 'અમારા વિશે', url: '/about', order: 7 },
    { id: 'f8', label: 'સંપર્ક', url: '/contact', order: 8 },
  ],
  media: [
    {
      id: 'med-1',
      name: 'hero-candle.jpg',
      url: '/images/hero-candle.jpg',
      altText: 'સ્મરણ દીવો અને સફેદ કમળ',
      title: 'દીવો અને કમળ પુષ્પ',
      size: 750033,
      mimeType: 'image/jpeg',
      createdAt: '2025-04-12T10:00:00.000Z',
    },
    {
      id: 'med-2',
      name: 'lotus-water.jpg',
      url: '/images/lotus-water.jpg',
      altText: 'જળમાં ખીલેલું શ્વેત કમળ અને દીવો',
      title: 'શ્વેત કમળ અને દીવો',
      size: 673351,
      mimeType: 'image/jpeg',
      createdAt: '2025-04-12T10:00:00.000Z',
    },
    {
      id: 'med-3',
      name: 'peaceful-sunset.jpg',
      url: '/images/peaceful-sunset.jpg',
      altText: 'શાંત સંધ્યાકાળ સૂર્યાસ્ત',
      title: 'સૂર્યાસ્ત સ્મરણ સંધ્યા',
      size: 905619,
      mimeType: 'image/jpeg',
      createdAt: '2025-04-12T10:00:00.000Z',
    },
  ],
  contactSubmissions: [
    {
      id: 'sub-1',
      name: 'રાજેશભાઈ પટેલ',
      email: 'rajesh@example.com',
      phone: '+91 98250 12345',
      subject: 'સંદેશ વિશે માર્ગદર્શન',
      message: 'નમસ્કાર, તમારી વેબસાઇટ પર ખૂબ જ સંવેદનશીલ અને સુંદર સંદેશાઓ મૂકવામાં આવ્યા છે. અભિનંદન.',
      createdAt: '2025-04-10T14:20:00.000Z',
      status: 'read',
    },
  ],
  settings: {
    siteName: 'Shradhanjali Msg',
    tagline: 'Everlasting in Loving Memories...',
    logoUrl: '/images/lotus-logo.svg',
    faviconUrl: '/favicon.ico',
    contactEmail: 'info@shradhanjali.in',
    contactPhone: '+91 98765 43210',
    contactAddress: 'અમદાવાદ, ગુજરાત - 380001 ભારત',
    copyrightText: '© 2026 Shradhanjali Msg. All rights reserved.',
    heroBadge: '|| શ્રદ્ધાંજલિ ||',
    heroHeading: 'પ્રિયજનની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી...',
    heroSubtitle: 'આપણી પ્રિયજનોને યાદ રાખવું એ માત્ર સંસ્મરણ નથી, પણ એ તેમની પ્રત્યેની આપણી અખંડ શ્રદ્ધાંજલિ છે.',
    heroQuote: 'યાદો એ જીવનની સૌથી સુંદર સંપત્તિ છે, જેને ક્યારેય કોઈ છીનવી શકતું નથી.',
    searchPlaceholder: 'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અથવા વિષય શોધો...',
    infoCardsTitle: 'અમારી વેબસાઇટ વિશે',
    infoCards: [
      {
        id: 1,
        title: 'ભાવપૂર્ણ શ્રદ્ધાંજલિ',
        description: 'દરેક પ્રિયજનને અમારી તરફથી હૃદયપૂર્વક શ્રદ્ધાંજલિ.',
        icon: 'Heart',
      },
      {
        id: 2,
        title: 'ઉપયોગી માહિતી',
        description: 'અંતિમ સંસ્કાર, વિધિ અને મહત્વપૂર્ણ માહિતી એક જ જગ્યાએ.',
        icon: 'BookOpen',
      },
      {
        id: 3,
        title: 'વિશ્વસનીય માહિતી',
        description: 'સચોટ અને પ્રામાણિક માહિતી માટે અમારી પ્રાથમિકતા.',
        icon: 'ShieldCheck',
      },
      {
        id: 4,
        title: 'સોશિયલ શેરિંગ',
        description: 'મનની વાતો જાતે શેર કરો અને અન્ય સુધી પહોંચાડો.',
        icon: 'Share2',
      },
    ],
    socials: {
      facebook: 'https://facebook.com',
      twitter: 'https://x.com',
      youtube: 'https://youtube.com',
      instagram: 'https://instagram.com',
      telegram: 'https://t.me',
      whatsappNumber: '919876543210',
    },
    technical: {
      gaMeasurementId: '',
      adsensePublisherId: '',
      enableAdPlacements: false,
      allowIndexing: true,
    },
  },
};
