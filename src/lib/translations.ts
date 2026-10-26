export type LanguageCode = 'gu' | 'en' | 'hi' | 'mr';

export interface LanguageInfo {
  code: LanguageCode;
  name: string;
  nativeName: string;
  flagEmoji?: string;
}

export const SUPPORTED_LANGUAGES: LanguageInfo[] = [
  { code: 'gu', name: 'Gujarati', nativeName: 'ગુજરાતી' },
  { code: 'en', name: 'English', nativeName: 'English' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी' },
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
  hero_heading_1: string;
  hero_heading_2: string;
  hero_subtitle: string;
  hero_quote: string;

  // Homepage Sections
  section_featured_categories: string;
  section_categories_sub: string;
  view_all_categories: string;
  section_latest_posts: string;
  section_posts_sub: string;
  view_all_posts: string;

  // Info Strip
  info_tribute_title: string;
  info_tribute_desc: string;
  info_rituals_title: string;
  info_rituals_desc: string;
  info_trust_title: string;
  info_trust_desc: string;
  info_share_title: string;
  info_share_desc: string;

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
  gu: {
    brand_name: 'શ્રદ્ધાંજલિ',
    brand_tagline: 'ભાવપૂર્ણ શ્રદ્ધાંજલિ સંદેશ',
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
    hero_heading_1: 'પ્રિયજનની સ્મૃતિઓ',
    hero_heading_2: 'ક્યારેય ભૂલાતી નથી...',
    hero_subtitle:
      'આપણી પ્રિયજનોને યાદ રાખવું એ માત્ર સંસ્મરણ નથી, પણ એ તેમની પ્રત્યેની આપણી અખંડ શ્રદ્ધાંજલિ છે.',
    hero_quote:
      'યાદો એ જીવનની સૌથી\nસુંદર સંપત્તિ છે,\nજેને ક્યારેય કોઈ છીનવી શકતું નથી.',

    section_featured_categories: 'પ્રમુખ કેટેગરીઝ',
    section_categories_sub:
      'તમારી જરૂરિયાત મુજબ શ્રદ્ધાંજલિ સંદેશ અને માહિતી મેળવો',
    view_all_categories: 'બધી કેટેગરીઝ',
    section_latest_posts: 'બ્લોગ પોસ્ટ્સ',
    section_posts_sub:
      'શ્રદ્ધાંજલિ, પુણ્યતિથિ, શાયરી અને ઉપયોગી માહિતી ભરપૂર 12 લેખો',
    view_all_posts: 'બધી પોસ્ટ્સ',

    info_tribute_title: 'ભાવપૂર્ણ શ્રદ્ધાંજલિ',
    info_tribute_desc: 'દરેક પ્રિયજનને અમારી તરફથી હૃદયપૂર્વક શ્રદ્ધાંજલિ.',
    info_rituals_title: 'ઉપયોગી માહિતી',
    info_rituals_desc: 'અંતિમ સંસ્કાર, વિધિ અને મહત્વપૂર્ણ માહિતી એક જ જગ્યાએ.',
    info_trust_title: 'વિશ્વસનીય માહિતી',
    info_trust_desc: 'સચોટ અને પ્રામાણિક માહિતી માટે અમારી પ્રાથમિકતા.',
    info_share_title: 'સોશિયલ શેરિંગ',
    info_share_desc: 'મનની વાતો જાતે શેર કરો અને અન્ય સુધી પહોંચાડો.',

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

    copyright_text: '© 2025 શ્રદ્ધાંજલિ. સર્વ હકો સુરક્ષિત.',
    all_rights_reserved: 'સર્વ હકો સુરક્ષિત.',
  },

  en: {
    brand_name: 'Shradhanjali',
    brand_tagline: 'Heartfelt Memorial Tributes',
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

    hero_badge: '|| IN LOVING MEMORY ||',
    hero_heading_1: 'Precious Memories of Loved Ones',
    hero_heading_2: 'Are Never Forgotten...',
    hero_subtitle:
      'Remembering those dear to us is not merely recollection, but our eternal tribute of love, honor, and gratitude.',
    hero_quote:
      'Memories are life’s most\nprecious treasure,\nwhich no one can ever take away.',

    section_featured_categories: 'Featured Categories',
    section_categories_sub:
      'Find heartfelt condolence tributes and meaningful guidance for every occasion',
    view_all_categories: 'All Categories',
    section_latest_posts: 'Latest Blog Posts',
    section_posts_sub:
      'Thoughtful memorial messages, punyatithi tributes, and comforting articles',
    view_all_posts: 'All Posts',

    info_tribute_title: 'Heartfelt Condolences',
    info_tribute_desc: 'Sincere tribute messages honoring every precious life with love.',
    info_rituals_title: 'Memorial Rituals & Guidance',
    info_rituals_desc: 'Solemn anniversary remembrance and respectful guidance in one place.',
    info_trust_title: 'Authenticity & Trust',
    info_trust_desc: 'Dedicated to preserving cultural sanctity and genuine literary expressions.',
    info_share_title: 'Easy Solace Sharing',
    info_share_desc: 'Comforting verses and cards ready to share with family and friends.',

    about_title: 'About Us',
    about_subtitle: 'Shradhanjali — A Compassionate Effort',
    about_mission_quote:
      'Our purpose is not just to share information, but to stand together and support one another through grief.',
    about_mission_sub:
      'If you have questions, need guidance, or wish to contribute, we welcome you to reach out to us.',
    contact_us_btn: 'Contact Us',

    article_language_notice: 'Memorial & Tribute Message (Original Gujarati Literature)',
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
    cat_punyatithi: 'Punyatithi',
    cat_shayari: 'Memorial Shayari',
    cat_information: 'Rituals & Info',
    cat_vishesh_lekh: 'Special Tributes',
    cat_prathana: 'Prarthana & Prayers',

    copyright_text: '© 2025 Shradhanjali. All rights reserved.',
    all_rights_reserved: 'All rights reserved.',
  },

  hi: {
    brand_name: 'श्रद्धांजलि',
    brand_tagline: 'भावपूर्ण श्रद्धांजलि संदेश',
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
    hero_heading_1: 'प्रियजनों की स्मृतियाँ',
    hero_heading_2: 'कभी भुलाई नहीं जातीं...',
    hero_subtitle:
      'अपने प्रियजनों को याद करना केवल स्मरण नहीं, बल्कि उनके प्रति हमारी अखंड श्रद्धांजलि और कृतज्ञता है।',
    hero_quote:
      'यादें जीवन की सबसे\nअनमोल संपत्ति हैं,\nजिसे कभी कोई छीन नहीं सकता।',

    section_featured_categories: 'प्रमुख श्रेणियाँ',
    section_categories_sub:
      'अपनी आवश्यकतानुसार श्रद्धांजलि संदेश और जानकारी प्राप्त करें',
    view_all_categories: 'सभी श्रेणियाँ',
    section_latest_posts: 'ब्लॉग पोस्ट्स',
    section_posts_sub:
      'श्रद्धांजलि, पुण्यतिथि, शायरी और संबल देने वाली उपयोगी सामग्री से भरपूर लेख',
    view_all_posts: 'सभी लेख',

    info_tribute_title: 'अपार श्रद्धांजलि',
    info_tribute_desc: 'प्रत्येक प्रियजन के प्रति हमारी ओर से हृदयस्पर्शी श्रद्धांजलि।',
    info_rituals_title: 'उपयोगी जानकारी',
    info_rituals_desc: 'अंतिम संस्कार, विधि और महत्वपूर्ण जानकारी एक ही स्थान पर।',
    info_trust_title: 'विश्वसनीय जानकारी',
    info_trust_desc: 'सटीक और प्रामाणिक जानकारी हमारी सर्वोच्च प्राथमिकता है।',
    info_share_title: 'सोशल शेयरिंग',
    info_share_desc: 'संवेदना और श्रद्धांजलि संदेश सरलता से साझा करें।',

    about_title: 'हमारे बारे में',
    about_subtitle: 'श्रद्धांजलि — एक भावनात्मक प्रयास',
    about_mission_quote:
      'हमारा उद्देश्य केवल जानकारी साझा करना नहीं, बल्कि दुख की घड़ी में एक-दूसरे का संबल बनना है।',
    about_mission_sub:
      'यदि आपके पास कोई प्रश्न या सुझाव है, तो कृपया हमसे संपर्क करें।',
    contact_us_btn: 'हमसे संपर्क करें',

    article_language_notice: 'श्रद्धांजलि संदेश (मूल गुजराती साहित्य)',
    article_language_desc:
      'साहित्यिक गरिमा और मूल संवेदनाओं को अक्षुण्ण रखने के लिए श्रद्धांजलि संदेश मूल गुजराती में उपलब्ध हैं, जबकि यूजर इंटरफेस आपकी सुविधा हेतु अनुवादित है।',
    copy_article: 'संदेश कॉपी करें',
    copied: 'कॉपी हो गया!',
    share_whatsapp: 'WhatsApp पर शेयर करें',
    share_facebook: 'Facebook पर शेयर करें',
    copy_link: 'लिंक कॉपी करें',
    quick_actions: 'त्वरित क्रियाएँ',
    read_more: 'और पढ़ें',
    minutes_read: 'मिनट का पठन',

    cat_shradhanjali: 'श्रद्धांजलि संदेश',
    cat_punyatithi: 'पुण्यतिथि',
    cat_shayari: 'शायरी व पंक्तियाँ',
    cat_information: 'जानकारी व विधि',
    cat_vishesh_lekh: 'विशेष लेख',
    cat_prathana: 'प्रार्थना सभा',

    copyright_text: '© 2025 श्रद्धांजलि. सर्वाधिकार सुरक्षित।',
    all_rights_reserved: 'सर्वाधिकार सुरक्षित।',
  },

  mr: {
    brand_name: 'श्रद्धांजली',
    brand_tagline: 'भावपूर्ण श्रद्धांजली संदेश',
    brand_description:
      'आपल्या प्रियजनांच्या स्मृती जतन करण्यासाठी आणि भावना शब्दात व्यक्त करण्यासाठी श्रद्धांजली संदेश, पुण्यतिथी स्मरण आणि दिलासा देणारे व्यासपीठ.',

    nav_home: 'होम',
    nav_categories: 'विभाग',
    nav_blog: 'ब्लॉग',
    nav_about: 'आमच्याबद्दल',
    nav_contact: 'संपर्क',
    nav_privacy: 'गोपनीयता धोरण',
    nav_terms: 'नियम आणि अटी',
    nav_disclaimer: 'अस्वीकरण',
    nav_admin: 'व्यवस्थापक लॉगिन',

    search_placeholder: 'श्रद्धांजली संदेश, पुण्यतिथी, शायरी किंवा विषय शोधा...',
    search_button: 'शोधा',
    theme_light: 'लाइट मोड',
    theme_dark: 'डार्क मोड',
    theme_switch_to_light: 'लाइट मोड सुरू करा',
    theme_switch_to_dark: 'डार्क मोड सुरू करा',
    language_select: 'भाषा निवडा',

    hero_badge: '|| भावपूर्ण श्रद्धांजली ||',
    hero_heading_1: 'आपल्या प्रियजनांच्या आठवणी',
    hero_heading_2: 'कधीही विसरल्या जात नाहीत...',
    hero_subtitle:
      'आपल्या प्रियजनांची आठवण ठेवणे हे केवळ स्मरण नसून, त्यांच्याप्रती आपली अखंड श्रद्धांजली आणि कृतज्ञता आहे.',
    hero_quote:
      'आठवणी ही जीवनाची सर्वात\nमौल्यवान संपत्ती आहे,\nजी कधीही कोणी हिरावून घेऊ शकत नाही.',

    section_featured_categories: 'प्रमुख विभाग',
    section_categories_sub:
      'आपल्या गरजेनुसार श्रद्धांजली संदेश आणि माहिती मिळवा',
    view_all_categories: 'सर्व विभाग',
    section_latest_posts: 'ब्लॉग पोस्ट्स',
    section_posts_sub:
      'श्रद्धांजली, पुण्यतिथी, शायरी आणि धीर देणाऱ्या उपयुक्त लेखांचा संग्रह',
    view_all_posts: 'सर्व लेख',

    info_tribute_title: 'अपार श्रद्धांजली',
    info_tribute_desc: 'प्रत्येक प्रिय व्यक्तीप्रती आमच्याकडून मनापासून श्रद्धांजली.',
    info_rituals_title: 'उपयुक्त माहिती',
    info_rituals_desc: 'अंतिम संस्कार, विधी आणि महत्त्वाची माहिती एकाच ठिकाणी.',
    info_trust_title: 'विश्वासार्ह माहिती',
    info_trust_desc: 'अचूक आणि प्रामाणिक माहिती हीच आमची प्राथमिकता आहे.',
    info_share_title: 'सोशल शेअरिंग',
    info_share_desc: 'आपल्या भावना आणि श्रद्धांजली संदेश सहज शेअर करा.',

    about_title: 'आमच्याबद्दल',
    about_subtitle: 'श्रद्धांजली — एक भावनिक प्रयत्न',
    about_mission_quote:
      'आमचा उद्देश केवळ माहिती देणे हा नसून दुःखाच्या काळात एकमेकांना आधार देणे हा आहे.',
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

    copyright_text: '© 2025 श्रद्धांजली. सर्व हक्क सुरक्षित.',
    all_rights_reserved: 'सर्व हक्क सुरक्षित.',
  },
};
