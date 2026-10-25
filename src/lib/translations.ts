export type LanguageCode = 'gu' | 'en' | 'hi' | 'mr' | 'te' | 'ta';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
];

export interface TranslationDictionary {
  // Brand
  brand_name: string;
  brand_tagline: string;
  brand_description: string;

  // Navigation
  nav_home: string;
  nav_categories: string;
  nav_blog: string;
  nav_about: string;
  nav_contact: string;
  nav_privacy: string;
  nav_terms: string;
  nav_disclaimer: string;
  nav_admin: string;

  // Theme & Controls
  search_placeholder: string;
  search_button: string;
  theme_light: string;
  theme_dark: string;
  theme_switch_to_light: string;
  theme_switch_to_dark: string;
  language_select: string;

  // Hero Section
  hero_badge: string;
  hero_heading: string;
  hero_subtitle: string;
  hero_quote: string;

  // Homepage Sections
  section_featured_categories: string;
  section_categories_sub: string;
  view_all_categories: string;
  section_latest_posts: string;
  section_posts_sub: string;
  view_all_posts: string;

  // About Page
  about_title: string;
  about_subtitle: string;
  about_mission_quote: string;
  about_mission_sub: string;
  contact_us_btn: string;

  // Article View
  article_language_notice: string;
  article_language_desc: string;
  copy_article: string;
  copied: string;
  share_whatsapp: string;
  share_facebook: string;
  copy_link: string;
  quick_actions: string;
  read_more: string;
  minutes_read: string;

  // Categories translation mapping
  cat_shradhanjali: string;
  cat_punyatithi: string;
  cat_shayari: string;
  cat_information: string;
  cat_vishesh_lekh: string;
  cat_prathana: string;

  // Footer & Misc
  copyright_text: string;
  all_rights_reserved: string;
}

export const translations: Record<LanguageCode, TranslationDictionary> = {
  en: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'Everlasting in Loving Memories...',
    brand_description:
      'A respectful digital memorial and tribute publishing platform dedicated to honoring our loved ones with sincere condolences, memorial messages, and comforting thoughts.',

    nav_home: 'Home',
    nav_categories: 'Categories',
    nav_blog: 'Blog',
    nav_about: 'About Us',
    nav_contact: 'Contact Us',
    nav_privacy: 'Privacy Policy',
    nav_terms: 'Terms & Conditions',
    nav_disclaimer: 'Disclaimer',
    nav_admin: 'Admin Login',

    search_placeholder: 'Search memorial messages, punyatithi, shayari or topics...',
    search_button: 'Search',
    theme_light: 'Light Mode',
    theme_dark: 'Dark Mode',
    theme_switch_to_light: 'Switch to Light Mode',
    theme_switch_to_dark: 'Switch to Dark Mode',
    language_select: 'Select Language',

    hero_badge: '|| SHRADHANJALI MSG ||',
    hero_heading: 'Memories of loved ones never fade away...',
    hero_subtitle:
      'Remembering those dear to us is not merely recollection, but our eternal tribute of love, honor, and gratitude.',
    hero_quote:
      'Memories are life’s most precious treasure, which time can never diminish.',

    section_featured_categories: 'Featured Categories',
    section_categories_sub:
      'Explore thoughtful memorial messages, condolences, and guidance curated for every solemn occasion',
    view_all_categories: 'All Categories',
    section_latest_posts: 'Latest Blog Posts',
    section_posts_sub:
      'Curated articles featuring heartfelt condolence tributes, punyatithi messages, and comforting words',
    view_all_posts: 'View All Articles',

    about_title: 'About Us',
    about_subtitle: 'Shradhanjali Msg — A Compassionate Effort',
    about_mission_quote:
      'Our purpose is not just to share information, but to stand together and support one another through grief.',
    about_mission_sub:
      'If you have questions, need guidance, or wish to contribute, we welcome you to reach out to us.',
    contact_us_btn: 'Contact Us',

    article_language_notice: 'Memorial & Tribute Message (Original Gujarati)',
    article_language_desc:
      'To preserve authentic cultural sentiment, spiritual reverence, and poetic depth, memorial messages and tribute verses remain in their original Gujarati literature, while your navigation interface is fully localized.',
    copy_article: 'Copy Message',
    copied: 'Copied!',
    share_whatsapp: 'Share on WhatsApp',
    share_facebook: 'Share on Facebook',
    copy_link: 'Copy Link',
    quick_actions: 'Quick Actions',
    read_more: 'Read More',
    minutes_read: 'min read',

    cat_shradhanjali: 'Shradhanjali Messages',
    cat_punyatithi: 'Punyatithi Remembrances',
    cat_shayari: 'Memorial Shayari & Verses',
    cat_information: 'Memorial Rituals & Info',
    cat_vishesh_lekh: 'Special Tributes',
    cat_prathana: 'Prarthana & Prayers',

    copyright_text: '© 2026 Shradhanjali Msg. All rights reserved.',
    all_rights_reserved: 'All rights reserved.',
  },

  gu: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'સ્મૃતિઓમાં સદાય...',
    brand_description:
      'આપણા પ્રિયજનોની યાદ સાચવવા અને લાગણીઓને શબ્દોમાં વ્યક્ત કરવા માટે શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ શુભેચ્છા, શાયરી અને ઉપયોગી માહિતીનું સન્માનનીય મંચ.',

    nav_home: 'હોમ',
    nav_categories: 'કેટેગરીઝ',
    nav_blog: 'બ્લોગ',
    nav_about: 'અમારા વિશે',
    nav_contact: 'સંપર્ક',
    nav_privacy: 'પ્રાઈવસી પોલિસી',
    nav_terms: 'નિયમો અને શરતો',
    nav_disclaimer: 'ડિસ્ક્લેમર',
    nav_admin: 'વ્યવસ્થાપક લૉગિન',

    search_placeholder: 'શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ, શાયરી અથવા વિષય શોધો...',
    search_button: 'શોધો',
    theme_light: 'લાઈટ મોડ',
    theme_dark: 'ડાર્ક મોડ',
    theme_switch_to_light: 'લાઈટ મોડ પર સ્વિચ કરો',
    theme_switch_to_dark: 'ડાર્ક મોડ પર સ્વિચ કરો',
    language_select: 'ભાષા પસંદ કરો',

    hero_badge: '|| શ્રદ્ધાંજલિ ||',
    hero_heading: 'પ્રિયજનની સ્મૃતિઓ ક્યારેય ભૂલાતી નથી...',
    hero_subtitle:
      'આપણી પ્રિયજનોને યાદ રાખવું એ માત્ર સંસ્મરણ નથી, પણ એ તેમની પ્રત્યેની આપણી અખંડ શ્રદ્ધાંજલિ છે.',
    hero_quote:
      'યાદો એ જીવનની સૌથી સુંદર સંપત્તિ છે, જેને ક્યારેય કોઈ છીનવી શકતું નથી.',

    section_featured_categories: 'Featured Categories',
    section_categories_sub:
      'તમારી જરૂરિયાત મુજબ શ્રદ્ધાંજલિ સંદેશ, પુણ્યતિથિ અને સંવેદનશીલ માહિતી મેળવો',
    view_all_categories: 'બધી કેટેગરીઝ',
    section_latest_posts: 'Latest Blog Posts',
    section_posts_sub:
      'શ્રદ્ધાંજલિ, પુણ્યતિથિ, શાયરી અને સંબળ આપતી ઉપયોગી માહિતી ભરપૂર લેખો',
    view_all_posts: 'બધા લેખો જુઓ',

    about_title: 'અમારા વિશે',
    about_subtitle: 'શ્રદ્ધાંજલિ – એક ભાવનાત્મક પ્રયાસ',
    about_mission_quote:
      'અમારો હેતુ માત્ર માહિતી આપવાનો નથી, પણ એકબીજાના દુઃખમાં સાથ આપવાનો છે.',
    about_mission_sub:
      'જો તમારી પાસે કોઈ પ્રશ્ન કે સૂચન હોય તો અમને જણાવવા વિનંતી.',
    contact_us_btn: 'અમારો સંપર્ક કરો',

    article_language_notice: 'શ્રદ્ધાંજલિ અને સંવેદનશીલ સામગ્રી — મૂળ ગુજરાતી સાહિત્ય',
    article_language_desc:
      'સાહિત્યિક શુદ્ધતા અને મૂળ ભાવનાઓ જાળવી રાખવા માટે શ્રદ્ધાંજલિ સંદેશાઓ મૂળ ભાષામાં પ્રસ્તુત છે.',
    copy_article: 'આ લેખ કૉપી કરો',
    copied: 'કૉપી થઈ ગયો!',
    share_whatsapp: 'WhatsApp પર શેર કરો',
    share_facebook: 'Facebook પર શેર કરો',
    copy_link: 'લિંક કૉપી કરો',
    quick_actions: 'ઝડપી ક્રિયાઓ',
    read_more: 'વધુ વાંચો',
    minutes_read: 'મિનિટ વાંચો',

    cat_shradhanjali: 'શ્રદ્ધાંજલિ સંદેશ',
    cat_punyatithi: 'પુણ્યતિથિ',
    cat_shayari: 'શાયરી',
    cat_information: 'માહિતી',
    cat_vishesh_lekh: 'વિશેષ લેખ',
    cat_prathana: 'પ્રાર્થના સભા',

    copyright_text: '© 2026 Shradhanjali Msg. સર્વ હકો સુરક્ષિત.',
    all_rights_reserved: 'સર્વ હકો સુરક્ષિત.',
  },

  hi: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'स्मृतियों में सदैव...',
    brand_description:
      'अपने प्रियजनों की स्मृति को नमन करने और भावनाओं को व्यक्त करने के लिए भावपूर्ण श्रद्धांजलि संदेश, पुण्यतिथि स्मरण और संबल देने वाला मंच।',

    nav_home: 'होम',
    nav_categories: 'श्रेणियाँ',
    nav_blog: 'ब्लॉग',
    nav_about: 'हमारे बारे में',
    nav_contact: 'संपर्क करें',
    nav_privacy: 'गोपनीयता नीति',
    nav_terms: 'नियम और शर्तें',
    nav_disclaimer: 'अस्वीकरण',
    nav_admin: 'एडमिन लॉगिन',

    search_placeholder: 'श्रद्धांजलि संदेश, पुण्यतिथि, शायरी या विषय खोजें...',
    search_button: 'खोजें',
    theme_light: 'लाइट मोड',
    theme_dark: 'डार्क मोड',
    theme_switch_to_light: 'लाइट मोड चालू करें',
    theme_switch_to_dark: 'डार्क मोड चालू करें',
    language_select: 'भाषा चुनें',

    hero_badge: '|| श्रद्धांजलि ||',
    hero_heading: 'प्रियजनों की स्मृतियाँ कभी भुलाई नहीं जातीं...',
    hero_subtitle:
      'अपने प्रियजनों को याद करना केवल स्मरण नहीं, बल्कि उनके प्रति हमारी अटूट श्रद्धांजलि और कृतज्ञता है।',
    hero_quote:
      'यादें जीवन की सबसे अनमोल धरोहर हैं, जिन्हें समय भी कभी मिटा नहीं सकता।',

    section_featured_categories: 'प्रमुख श्रेणियाँ',
    section_categories_sub:
      'अपनी आवश्यकतानुसार श्रद्धांजलि संदेश, पुण्यतिथि और संबल देने वाली जानकारी प्राप्त करें',
    view_all_categories: 'सभी श्रेणियाँ',
    section_latest_posts: 'नवीनतम ब्लॉग पोस्ट',
    section_posts_sub:
      'श्रद्धांजलि, पुण्यतिथि, शायरी और सांत्वना देने वाले उपयोगी आलेखों का संग्रह',
    view_all_posts: 'सभी आलेख देखें',

    about_title: 'हमारे बारे में',
    about_subtitle: 'Shradhanjali Msg — एक संवेदनशील प्रयास',
    about_mission_quote:
      'हमारा उद्देश्य केवल जानकारी देना नहीं, बल्कि एक-दूसरे के दुःख में साथ निभाना है।',
    about_mission_sub:
      'यदि आपके पास कोई प्रश्न या सुझाव है, तो कृपया बेझिझक हमसे संपर्क करें।',
    contact_us_btn: 'हमसे संपर्क करें',

    article_language_notice: 'श्रद्धांजलि एवं संस्मरण संदेश (मूल गुजराती साहित्य)',
    article_language_desc:
      'साहित्यिक गरिमा, सांस्कृतिक शुद्धता और मूल भावनाओं को अक्षुण्ण रखने के लिए श्रद्धांजलि संदेश मूल गुजराती में संरक्षित हैं, जबकि आपका इंटरफ़ेस आपकी भाषा में प्रस्तुत है।',
    copy_article: 'यह संदेश कॉपी करें',
    copied: 'कॉपी हो गया!',
    share_whatsapp: 'WhatsApp पर शेयर करें',
    share_facebook: 'Facebook पर शेयर करें',
    copy_link: 'लिंक कॉपी करें',
    quick_actions: 'त्वरित क्रियाएं',
    read_more: 'और पढ़ें',
    minutes_read: 'मिनट पठन',

    cat_shradhanjali: 'श्रद्धांजलि संदेश',
    cat_punyatithi: 'पुण्यतिथि स्मरण',
    cat_shayari: 'स्मृति शायरी एवं पंक्तियाँ',
    cat_information: 'अंतिम संस्कार एवं जानकारी',
    cat_vishesh_lekh: 'विशेष श्रद्धांजलि आलेख',
    cat_prathana: 'प्रार्थना सभा',

    copyright_text: '© 2026 Shradhanjali Msg. सर्वाधिकार सुरक्षित।',
    all_rights_reserved: 'सर्वाधिकार सुरक्षित।',
  },

  mr: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'आठवणींमध्ये सदैव...',
    brand_description:
      'आपल्या प्रिय व्यक्तींच्या स्मृती जपण्यासाठी आणि भावना व्यक्त करण्यासाठी भावपूर्ण श्रद्धांजली संदेश, पुण्यतिथी स्मरण आणि आधार देणारे व्यासपीठ.',

    nav_home: 'मुख्यपृष्ठ',
    nav_categories: 'वर्ग (Categories)',
    nav_blog: 'ब्लॉग',
    nav_about: 'आमच्याबद्दल',
    nav_contact: 'संपर्क साधा',
    nav_privacy: 'गोपनीयता धोरण',
    nav_terms: 'नियम आणि अटी',
    nav_disclaimer: 'अस्वीकरण',
    nav_admin: 'प्रशासक लॉगिन',

    search_placeholder: 'श्रद्धांजली संदेश, पुण्यतिथी, शायरी किंवा विषय शोधा...',
    search_button: 'शोधा',
    theme_light: 'लाईट मोड',
    theme_dark: 'डार्क मोड',
    theme_switch_to_light: 'लाईट मोडवर जा',
    theme_switch_to_dark: 'डार्क मोडवर जा',
    language_select: 'भाषा निवडा',

    hero_badge: '|| श्रद्धांजली ||',
    hero_heading: 'प्रियजनांच्या आठवणी कधीही मिटत नाहीत...',
    hero_subtitle:
      'आपल्या आप्तेष्टांची आठवण ठेवणे म्हणजे केवळ स्मरण नाही, तर त्यांच्याप्रती असलेली आपली अखंड श्रद्धांजली आहे.',
    hero_quote:
      'आठवणी ही जीवनाची अशी अनमोल ठेव आहे, जी वेळही कधी हिरावून घेऊ शकत नाही.',

    section_featured_categories: 'प्रमुख वर्ग',
    section_categories_sub:
      'आपल्या गरजेनुसार श्रद्धांजली संदेश, पुण्यतिथी आणि माहिती सहज मिळवा',
    view_all_categories: 'सर्व वर्ग',
    section_latest_posts: 'नवीनतम ब्लॉग लेख',
    section_posts_sub:
      'श्रद्धांजली, पुण्यतिथी, शायरी आणि दिलासा देणाऱ्या महत्त्वपूर्ण लेखांचा संग्रह',
    view_all_posts: 'सर्व लेख पहा',

    about_title: 'आमच्याबद्दल',
    about_subtitle: 'Shradhanjali Msg — एक संवेदनशील उपक्रम',
    about_mission_quote:
      'आमचा हेतू केवळ माहिती देणे हा नसून, एकमेकांच्या दुःखात साथ देणे हा आहे.',
    about_mission_sub:
      'आपल्याकडे काही प्रश्न किंवा सूचना असल्यास कृपया आमच्याशी संपर्क साधा.',
    contact_us_btn: 'आमच्याशी संपर्क साधा',

    article_language_notice: 'श्रद्धांजली संदेश (मूळ गुजराती साहित्य)',
    article_language_desc:
      'साहित्यिक पावित्र्य आणि मूळ भावना जपण्यासाठी श्रद्धांजली संदेश मूळ गुजराती भाषेत उपलब्ध आहेत, तर इंटरफेस तुमच्या सोयीसाठी भाषांतरित केला आहे.',
    copy_article: 'हा संदेश कॉपी करा',
    copied: 'कॉपी झाले!',
    share_whatsapp: 'WhatsApp वर शेअर करा',
    share_facebook: 'Facebook वर शेअर करा',
    copy_link: 'लिंक कॉपी करा',
    quick_actions: 'जलद कृती',
    read_more: 'अधिक वाचा',
    minutes_read: 'मिनिटे वाचन',

    cat_shradhanjali: 'श्रद्धांजली संदेश',
    cat_punyatithi: 'पुण्यतिथी',
    cat_shayari: 'शायरी व पंक्ती',
    cat_information: 'माहिती व विधी',
    cat_vishesh_lekh: 'विशेष लेख',
    cat_prathana: 'प्रार्थना सभा',

    copyright_text: '© 2026 Shradhanjali Msg. सर्व हक्क सुरक्षित.',
    all_rights_reserved: 'सर्व हक्क सुरक्षित.',
  },

  te: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'జ్ఞాపకాలలో శాశ్వతంగా...',
    brand_description:
      'మన ప్రియమైనవారి స్మృతులను గౌరవిస్తూ, భావోద్వేగాలను పదాలలో వ్యక్తపరచడానికి నివాళి సందేశాలు, వర్ధంతి స్మరణలు మరియు ఆదరణ వేదిక.',

    nav_home: 'హోమ్',
    nav_categories: 'వర్గాలు',
    nav_blog: 'బ్లాగ్',
    nav_about: 'మా గురించి',
    nav_contact: 'సంప్రదించండి',
    nav_privacy: 'గోప్యతా విధానం',
    nav_terms: 'నిబంధనలు & షరతులు',
    nav_disclaimer: 'నిరాకరణ',
    nav_admin: 'అడ్మిన్ లాగిన్',

    search_placeholder: 'నివాళి సందేశాలు, వర్ధంతి, కవితలు లేదా అంశాలను శోధించండి...',
    search_button: 'శోధించండి',
    theme_light: 'లైట్ మోడ్',
    theme_dark: 'డార్క్ మోడ్',
    theme_switch_to_light: 'లైట్ మోడ్‌కు మారండి',
    theme_switch_to_dark: 'డార్క్ మోడ్‌కు మారండి',
    language_select: 'భాషను ఎంచుకోండి',

    hero_badge: '|| నివాళి ||',
    hero_heading: 'ప్రియమైనవారి జ్ఞాపకాలు ఎప్పటికీ మరువలేము...',
    hero_subtitle:
      'మన ప్రియమైనవారిని గుర్తుంచుకోవడం కేవలం స్మరణ మాత్రమే కాదు, వారి పట్ల మన శాశ్వతమైన నివాళి మరియు కృతజ్ఞత.',
    hero_quote:
      'జ్ఞాపకాలు జీవితంలో అత్యంత అమూల్యమైన సంపద, వాటిని కాలం కూడా చెరిపివేయలేదు.',

    section_featured_categories: 'ప్రధాన వర్గాలు',
    section_categories_sub:
      'మీ అవసరాలకు తగిన నివాళి సందేశాలు మరియు సమాచారాన్ని ఇక్కడ కనుగొనండి',
    view_all_categories: 'అన్ని వర్గాలు',
    section_latest_posts: 'తాజా బ్లాగ్ పోస్ట్‌లు',
    section_posts_sub:
      'నివాళి, వర్ధంతి, కవితలు మరియు ఊరటనిచ్చే ఆలోచనలతో కూడిన వ్యాసాల సంకలనం',
    view_all_posts: 'అన్ని వ్యాసాలు చూడండి',

    about_title: 'మా గురించి',
    about_subtitle: 'Shradhanjali Msg — ఒక సానుభూతి ప్రయత్నం',
    about_mission_quote:
      'మా ఉద్దేశం కేవలం సమాచారాన్ని అందించడమే కాదు, ఒకరికొకరు దుఃఖంలో తోడుగా నిలబడటం.',
    about_mission_sub:
      'మీకు ఏవైనా ప్రశ్నలు లేదా సూచనలు ఉంటే మమ్మల్ని సంకోచించకుండా సంప్రదించండి.',
    contact_us_btn: 'మమ్మల్ని సంప్రదించండి',

    article_language_notice: 'నివాళి మరియు సంస్మరణ సందేశాలు (అసలు గుజరాతీలో)',
    article_language_desc:
      'సాహిత్య పవిత్రత మరియు సహజ భావోద్వేగాలను కాపాడటానికి నివాళి సందేశాలు అసలు గుజరాతీలోనే భద్రపరచబడ్డాయి, అయితే మీ సౌలభ్యం కోసం యూజర్ ఇంటర్‌ఫేస్ అనువదించబడింది.',
    copy_article: 'సందేశాన్ని కాపీ చేయండి',
    copied: 'కాపీ అయ్యింది!',
    share_whatsapp: 'WhatsApp లో షేర్ చేయండి',
    share_facebook: 'Facebook లో షేర్ చేయండి',
    copy_link: 'లింక్ కాపీ చేయండి',
    quick_actions: 'శీఘ్ర చర్యలు',
    read_more: 'మరింత చదవండి',
    minutes_read: 'నిమిషాల చదువు',

    cat_shradhanjali: 'నివాళి సందేశాలు',
    cat_punyatithi: 'వర్ధంతి',
    cat_shayari: 'కవితలు & వాక్యాలు',
    cat_information: 'సమాచారం & ఆచారాలు',
    cat_vishesh_lekh: 'ప్రత్యేక వ్యాసాలు',
    cat_prathana: 'ప్రార్థన సభ',

    copyright_text: '© 2026 Shradhanjali Msg. సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.',
    all_rights_reserved: 'సర్వ హక్కులు ప్రత్యేకించబడ్డాయి.',
  },

  ta: {
    brand_name: 'Shradhanjali Msg',
    brand_tagline: 'நினைவுகளில் என்றும்...',
    brand_description:
      'நம் அன்பிற்குரியவர்களின் நினைவுகளைப் போற்றி, உணர்வுகளை வெளிப்படுத்தும் இரங்கல் செய்திகள், நினைவு நாள் நினைவேந்தல் மற்றும் ஆறுதல் தரும் கௌரவமான தளம்.',

    nav_home: 'முகப்பு',
    nav_categories: 'பிரிவுகள்',
    nav_blog: 'வலைப்பதிவு',
    nav_about: 'எங்களை பற்றி',
    nav_contact: 'தொடர்பு கொள்ள',
    nav_privacy: 'தனியுரிமைக் கொள்கை',
    nav_terms: 'விதிமுறைகள் & நிபந்தனைகள்',
    nav_disclaimer: 'பொறுப்புத் துறப்பு',
    nav_admin: 'நிர்வாகி உள்நுழைவு',

    search_placeholder: 'இரங்கல் செய்திகள், நினைவு நாள், கவிதைகள் அல்லது தலைப்புகளைத் தேடுங்கள்...',
    search_button: 'தேடுக',
    theme_light: 'வெளிச்ச முறை',
    theme_dark: 'இருள் முறை',
    theme_switch_to_light: 'வெளிச்ச முறைக்கு மாறவும்',
    theme_switch_to_dark: 'இருள் முறைக்கு மாறவும்',
    language_select: 'மொழியைத் தேர்ந்தெடுக்கவும்',

    hero_badge: '|| இரங்கல் அஞ்சலி ||',
    hero_heading: 'அன்புக்குரியவர்களின் நினைவுகள் என்றும் மறைவதில்லை...',
    hero_subtitle:
      'நம் அன்பிற்குரியவர்களை நினைவுகூர்வது வெறும் நினைவு மட்டுமல்ல, அவர்கள் மீதான நமது அழியாத அஞ்சலியும் நன்றியுமாகும்.',
    hero_quote:
      'நினைவுகள் வாழ்க்கையின் விலைமதிப்பற்ற பொக்கிஷம், அதை யாராலும் பறிக்க முடியாது.',

    section_featured_categories: 'சிறப்பு பிரிவுகள்',
    section_categories_sub:
      'உங்கள் தேவைக்கேற்ப இரங்கல் செய்திகள் மற்றும் தகவல்களை இங்கே கண்டறியவும்',
    view_all_categories: 'அனைத்து பிரிவுகள்',
    section_latest_posts: 'சமீபத்திய வலைப்பதிவு பதிவுகள்',
    section_posts_sub:
      'இரங்கல், நினைவு நாள், கவிதைகள் மற்றும் ஆறுதல் தரும் பயனுள்ள கட்டுரைகள்',
    view_all_posts: 'அனைத்து கட்டுரைகளையும் காண்க',

    about_title: 'எங்களை பற்றி',
    about_subtitle: 'Shradhanjali Msg — ஒரு உணர்வுப்பூர்வ முயற்சி',
    about_mission_quote:
      'எங்கள் நோக்கம் தகவல்களைப் பகிர்வது மட்டுமல்ல, துயரத்தின் போது ஒருவருக்கொருவர் தோள் கொடுத்து நிற்பதும் ஆகும்.',
    about_mission_sub:
      'உங்களிடம் ஏதேனும் கேள்விகள் அல்லது பரிந்துரைகள் இருந்தால் தயங்காமல் எங்களைத் தொடர்பு கொள்ளவும்.',
    contact_us_btn: 'எங்களைத் தொடர்பு கொள்ளவும்',

    article_language_notice: 'இரங்கல் மற்றும் நினைவுச் செய்தி (அசல் குஜராத்தி இலக்கியம்)',
    article_language_desc:
      'இலக்கிய புனிதத்தையும் அசல் உணர்வுகளையும் பாதுகாக்க இரங்கல் செய்திகள் அசல் குஜராத்தி மொழியிலேயே வைக்கப்பட்டுள்ளன, தளத்தின் பயன்பாடு உங்கள் மொழியில் மொழிபெயர்க்கப்பட்டுள்ளது.',
    copy_article: 'செய்தியை நகலெடு',
    copied: 'நகலெடுக்கப்பட்டது!',
    share_whatsapp: 'WhatsApp இல் பகிரவும்',
    share_facebook: 'Facebook இல் பகிரவும்',
    copy_link: 'இணைப்பை நகலெடு',
    quick_actions: 'விரைவுச் செயல்பாடுகள்',
    read_more: 'மேலும் வாசிக்க',
    minutes_read: 'நிமிட வாசிப்பு',

    cat_shradhanjali: 'இரங்கல் செய்திகள்',
    cat_punyatithi: 'நினைவு நாள்',
    cat_shayari: 'கவிதைகள் & வரிகள்',
    cat_information: 'தகவல் & சடங்குகள்',
    cat_vishesh_lekh: 'சிறப்புக் கட்டுரைகள்',
    cat_prathana: 'பிரார்த்தனை கூட்டம்',

    copyright_text: '© 2026 Shradhanjali Msg. அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
    all_rights_reserved: 'அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டவை.',
  },
};
