import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef, useState } from 'react';
import {
  Image,
  ImageSourcePropType,
  Linking,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

type Language = 'tr' | 'en';

const serviceIcons = ['desktop', 'calendar-check-o', 'qrcode', 'sliders'] as const;

const copy = {
  tr: {
    metaTitle: 'Frog Yazılım Çözümleri',
    brandSub: 'Yazılım çözümleri',
    nav: {
      services: 'Hizmetler',
      contact: 'İletişim',
    },
    hero: {
      title: 'İşletmenize özel yazılım çözümleri.',
      text:
        'FROG; işletmeler için randevu sistemleri, QR menüler, yönetim panelleri ve kurumsal dijital altyapılar geliştirir. Amacımız kalabalık değil, net çalışan ve sürdürülebilir yazılım çözümleri kurmak.',
      cta: 'Teklif Al',
    },
    servicesEyebrow: 'Hizmetler',
    servicesTitle: 'İhtiyacın olan temel dijital çözümleri tek yerde topluyoruz.',
    servicesText: 'Her proje mobil uyum, temiz arayüz, hızlı iletişim ve yayına hazır teslim mantığıyla ilerler.',
    services: [
      {
        title: 'Kurumsal Web Siteleri',
        body: 'Markanız için güven veren, hızlı ve ölçeklenebilir yazılım çözümleri geliştiriyoruz.',
      },
      {
        title: 'Randevu Sistemleri',
        body: 'Berber, kuaför, klinik ve hizmet işleri için sade rezervasyon akışları hazırlıyoruz.',
      },
      {
        title: 'QR Menü',
        body: 'Kafe ve restoranlar için kolay güncellenen, mobil uyumlu menü deneyimleri kuruyoruz.',
      },
      {
        title: 'Yönetim Panelleri',
        body: 'Apartman, site ve işletme operasyonları için kullanımı kolay panel ekranları tasarlıyoruz.',
      },
    ],
    processSteps: ['Keşif', 'Tasarım', 'Geliştirme', 'Yayın'],
    referencesEyebrow: 'Referanslar',
    referencesTitle: 'Gerçek projeler üzerinden güven veren bir vitrin.',
    references: [
      {
        title: 'Pisagor Danışmanlık',
        body: 'Kurumsal tanıtım ve hizmet vitrini.',
      },
      {
        title: 'Webey',
        body: 'Berber ve kuaförler için randevu deneyimi.',
      },
    ],
    contactEyebrow: 'İletişim',
    contactTitle: 'Projeni netleştirelim.',
    contactText:
      'Randevu sistemi, QR menü, yönetim paneli veya özel yazılım ihtiyacın varsa WhatsApp üzerinden hızlı bilgi alabilirsin.',
    contactButton: "WhatsApp'tan Yaz",
  },
  en: {
    metaTitle: 'Frog Software Solutions',
    brandSub: 'Software solutions',
    nav: {
      services: 'Services',
      contact: 'Contact',
    },
    hero: {
      title: 'Custom software solutions for your business.',
      text:
        'FROG builds appointment systems, QR menus, management panels, and digital infrastructure for businesses. Our focus is clear, sustainable software that works.',
      cta: 'Get a Quote',
    },
    servicesEyebrow: 'Services',
    servicesTitle: 'We bring the core digital solutions you need into one place.',
    servicesText: 'Every project is planned around mobile usability, clean interfaces, fast communication, and launch-ready delivery.',
    services: [
      {
        title: 'Corporate Websites',
        body: 'We build fast, scalable software experiences that help your brand feel credible online.',
      },
      {
        title: 'Appointment Systems',
        body: 'Simple booking flows for barbers, salons, clinics, and service businesses.',
      },
      {
        title: 'QR Menus',
        body: 'Mobile-friendly menu experiences for cafes and restaurants that are easy to update.',
      },
      {
        title: 'Management Panels',
        body: 'Clean admin panels for apartments, sites, and business operations.',
      },
    ],
    processSteps: ['Discovery', 'Design', 'Development', 'Launch'],
    referencesEyebrow: 'References',
    referencesTitle: 'A credible showcase built around real projects.',
    references: [
      {
        title: 'Pisagor Consulting',
        body: 'Corporate presentation and service showcase.',
      },
      {
        title: 'Webey',
        body: 'Appointment experience for barbers and salons.',
      },
    ],
    contactEyebrow: 'Contact',
    contactTitle: "Let's clarify your project.",
    contactText:
      'If you need an appointment system, QR menu, management panel, or custom software, you can get quick information through WhatsApp.',
    contactButton: 'Message on WhatsApp',
  },
} satisfies Record<Language, {
  metaTitle: string;
  brandSub: string;
  nav: { services: string; contact: string };
  hero: { title: string; text: string; cta: string };
  servicesEyebrow: string;
  servicesTitle: string;
  servicesText: string;
  services: { title: string; body: string }[];
  processSteps: string[];
  referencesEyebrow: string;
  referencesTitle: string;
  references: { title: string; body: string }[];
  contactEyebrow: string;
  contactTitle: string;
  contactText: string;
  contactButton: string;
}>;

const referenceAssets: { image: ImageSourcePropType; logo: ImageSourcePropType }[] = [
  {
    image: require('./assets/references/pisagor.png') as ImageSourcePropType,
    logo: require('./assets/pisagorlogo.webp') as ImageSourcePropType,
  },
  {
    image: require('./assets/references/webey.png') as ImageSourcePropType,
    logo: require('./assets/webeylogo.png') as ImageSourcePropType,
  },
];

const heroImages: { title: string; source: ImageSourcePropType }[] = [
  {
    title: 'Dijital çalışma alanı',
    source: require('./assets/hero/workspace-nature.jpg') as ImageSourcePropType,
  },
  {
    title: 'Tasarım ve geliştirme',
    source: require('./assets/hero/design-workspace.jpg') as ImageSourcePropType,
  },
  {
    title: 'Responsive deneyim',
    source: require('./assets/hero/responsive-preview.jpg') as ImageSourcePropType,
  },
];


function FrogEmblem({ size = 44 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 96 96" fill="none">
      <Defs>
        <LinearGradient id="frogEmblemBg" x1="16" y1="12" x2="80" y2="84" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#0F241D" />
          <Stop offset="1" stopColor="#1A5F42" />
        </LinearGradient>
      </Defs>
      <Rect x="7" y="7" width="82" height="82" rx="18" fill="url(#frogEmblemBg)" />
      <Rect x="8.5" y="8.5" width="79" height="79" rx="16.5" stroke="#C8F1D5" strokeOpacity="0.22" strokeWidth="3" />
      <Path d="M27 70V28H67" stroke="#F6FFF8" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <Path d="M28 49H61" stroke="#F6FFF8" strokeWidth="7" strokeLinecap="round" />
      <Path d="M34 70V54H61" stroke="#7BE09B" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
      <Circle cx="68" cy="28" r="5" fill="#7BE09B" />
    </Svg>
  );
}
type SectionKey = 'services' | 'references' | 'contact';

export default function App() {
  const { width } = useWindowDimensions();
  const scrollRef = useRef<ScrollView>(null);
  const [typedTitleLength, setTypedTitleLength] = useState(0);
  const [activeHeroImageIndex, setActiveHeroImageIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('tr');
  const sectionY = useRef<Record<SectionKey, number>>({
    services: 0,
    references: 0,
    contact: 0,
  });

  const isDesktop = width >= 960;
  const isTablet = width >= 720;
  const contentWidth = Math.min(Math.max(width - (width < 520 ? 32 : 56), 0), 1120);
  const pageCopy = copy[language];

  useEffect(() => {
    if (Platform.OS === 'web' && typeof document !== 'undefined') {
      document.title = pageCopy.metaTitle;

      const faviconHref = '/assets/?unstable_path=.%2Fassets%2Ffavicon.png';
      const existingIcon = document.querySelector<HTMLLinkElement>('link[rel="icon"], link[rel="shortcut icon"]');
      const iconLink = existingIcon ?? document.createElement('link');
      iconLink.rel = 'icon';
      iconLink.type = 'image/png';
      iconLink.href = faviconHref;

      if (!existingIcon) {
        document.head.appendChild(iconLink);
      }
    }
  }, [pageCopy.metaTitle]);


  useEffect(() => {
    setTypedTitleLength(0);

    const timers = Array.from({ length: pageCopy.hero.title.length }, (_, index) =>
      setTimeout(() => setTypedTitleLength(index + 1), 55 * (index + 1))
    );

    return () => timers.forEach((timer) => clearTimeout(timer));
  }, [pageCopy.hero.title]);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroImageIndex((current) => (current + 1) % heroImages.length);
    }, 3600);

    return () => clearInterval(timer);
  }, []);

  const activeHeroImage = heroImages[activeHeroImageIndex];
  const typedHeroTitle = pageCopy.hero.title.slice(0, typedTitleLength);

  const openWhatsApp = () => Linking.openURL('https://wa.me/905319843906');
  const scrollTo = (key: SectionKey) => {
    scrollRef.current?.scrollTo({
      y: Math.max(sectionY.current[key] - 18, 0),
      animated: true,
    });
  };

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <ScrollView ref={scrollRef} showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
          <View style={[styles.header, !isTablet && styles.headerMobile, { width: contentWidth }]}>
            <Pressable onPress={() => scrollRef.current?.scrollTo({ y: 0, animated: true })} style={styles.brand}>
              <FrogEmblem size={44} />
              <View>
                <Text style={styles.brandName}>FROG</Text>
                <Text style={styles.brandSub}>{pageCopy.brandSub}</Text>
              </View>
            </Pressable>

            <View style={[styles.nav, !isTablet && styles.navMobile]}>
              <NavLink label={pageCopy.nav.services} onPress={() => scrollTo('services')} />
              <NavLink label={pageCopy.nav.contact} onPress={() => scrollTo('contact')} />
              <LanguageSwitch language={language} onChange={setLanguage} />
            </View>
          </View>

          <View style={[styles.hero, !isDesktop && styles.heroMobile, { width: contentWidth }]}>
            <View style={styles.heroCopy}>
              <Text style={[styles.heroTitle, !isTablet && styles.heroTitleMobile]}>
                {typedHeroTitle}
                {typedTitleLength < pageCopy.hero.title.length ? <Text style={styles.typeCursor}>|</Text> : null}
              </Text>
              <Text style={styles.heroText}>{pageCopy.hero.text}</Text>

              <View style={[styles.heroActions, !isTablet && styles.heroActionsMobile]}>
                <Pressable onPress={openWhatsApp} style={styles.primaryButton}>
                  <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                  <Text style={styles.primaryButtonText}>{pageCopy.hero.cta}</Text>
                </Pressable>
              </View>
            </View>

            <View style={styles.heroPanel}>
              <Image source={activeHeroImage.source} style={styles.heroImage} resizeMode="cover" />
              <View style={styles.heroImageDots}>
                {heroImages.map((image, index) => (
                  <View
                    key={image.title}
                    style={[styles.heroImageDot, index === activeHeroImageIndex && styles.heroImageDotActive]}
                  />
                ))}
              </View>
            </View>
          </View>

          <View
            style={[styles.section, { width: contentWidth }]}
            onLayout={(event) => {
              sectionY.current.services = event.nativeEvent.layout.y;
            }}
          >
            <SectionHeader
              eyebrow={pageCopy.servicesEyebrow}
              title={pageCopy.servicesTitle}
              text={pageCopy.servicesText}
            />

            <View style={[styles.serviceGrid, !isDesktop && styles.serviceGridMobile]}>
              {pageCopy.services.map((service, index) => (
                <View key={service.title} style={styles.serviceCard}>
                  <View style={styles.serviceIcon}>
                    <FontAwesome name={serviceIcons[index]} size={20} color="#1D7A51" />
                  </View>
                  <Text style={styles.serviceTitle}>{service.title}</Text>
                  <Text style={styles.serviceBody}>{service.body}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={[styles.band, { width: contentWidth }]}>
            {pageCopy.processSteps.map((step, index) => (
              <View key={step} style={styles.processItem}>
                <Text style={styles.processIndex}>0{index + 1}</Text>
                <Text style={styles.processText}>{step}</Text>
              </View>
            ))}
          </View>

          <View
            style={[styles.section, { width: contentWidth }]}
            onLayout={(event) => {
              sectionY.current.references = event.nativeEvent.layout.y;
            }}
          >
            <SectionHeader
              eyebrow={pageCopy.referencesEyebrow}
              title={pageCopy.referencesTitle}
            />

            <View style={[styles.referenceGrid, !isDesktop && styles.referenceGridMobile]}>
              {pageCopy.references.map((reference, index) => (
                <View key={reference.title} style={styles.referenceCard}>
                  <View style={styles.referenceLogoWrap}>
                    <Image source={referenceAssets[index].logo} style={styles.referenceLogo} resizeMode="contain" />
                  </View>
                  <View style={styles.referenceImageWrap}>
                    <Image source={referenceAssets[index].image} style={styles.referenceImage} resizeMode="cover" />
                  </View>
                  <Text style={styles.referenceTitle}>{reference.title}</Text>
                  <Text style={styles.referenceBody}>{reference.body}</Text>
                </View>
              ))}
            </View>
          </View>

          <View
            style={[styles.contact, !isDesktop && styles.contactMobile, { width: contentWidth }]}
            onLayout={(event) => {
              sectionY.current.contact = event.nativeEvent.layout.y;
            }}
          >
            <View style={styles.contactCopy}>
              <Text style={styles.contactEyebrow}>{pageCopy.contactEyebrow}</Text>
              <Text style={styles.contactTitle}>{pageCopy.contactTitle}</Text>
              <Text style={styles.contactText}>{pageCopy.contactText}</Text>
            </View>
            <Pressable onPress={openWhatsApp} style={styles.contactButton}>
              <FontAwesome name="whatsapp" size={20} color="#FFFFFF" />
              <Text style={styles.contactButtonText}>{pageCopy.contactButton}</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}



function LanguageSwitch({ language, onChange }: { language: Language; onChange: (language: Language) => void }) {
  return (
    <View style={styles.languageSwitch}>
      <Pressable onPress={() => onChange('tr')} style={styles.languageOption}>
        <Text style={[styles.languageText, language === 'tr' && styles.languageTextActive]}>TR</Text>
      </Pressable>
      <Text style={styles.languageDivider}>|</Text>
      <Pressable onPress={() => onChange('en')} style={styles.languageOption}>
        <Text style={[styles.languageText, language === 'en' && styles.languageTextActive]}>EN</Text>
      </Pressable>
    </View>
  );
}
function NavLink({ label, onPress }: { label: string; onPress: () => void }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Pressable
      onPress={onPress}
      onHoverIn={() => setIsHovered(true)}
      onHoverOut={() => setIsHovered(false)}
      style={styles.navButton}
    >
      {({ pressed }) => {
        const isActive = isHovered || pressed;

        return (
          <>
            <Text style={[styles.navText, isActive && styles.navTextActive]}>{label}</Text>
            <View style={[styles.navUnderline, isActive && styles.navUnderlineActive]} />
          </>
        );
      }}
    </Pressable>
  );
}
function SectionHeader({ eyebrow, title, text }: { eyebrow: string; title: string; text?: string }) {
  return (
    <View style={styles.sectionHeader}>
      <Text style={styles.eyebrow}>{eyebrow}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
      {text ? <Text style={styles.sectionText}>{text}</Text> : null}
    </View>
  );
}

const fontFamily = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif',
  default: 'Segoe UI',
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },
  app: {
    flex: 1,
    backgroundColor: '#F7F8F4',
  },
  scrollContent: {
    alignItems: 'center',
    paddingBottom: 56,
  },
  header: {
    minHeight: 72,
    marginTop: 22,
    paddingHorizontal: 0,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  headerMobile: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    gap: 16,
  },
  brand: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  brandName: {
    color: '#10231B',
    fontSize: 30,
    lineHeight: 32,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily,
  },
  brandSub: {
    color: '#66746D',
    fontSize: 13,
    marginTop: 2,
    fontFamily,
  },
  nav: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
  },
  navMobile: {
    width: '100%',
    flexWrap: 'wrap',
    gap: 16,
  },
  languageSwitch: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 7,
    marginLeft: 8,
  },
  languageOption: {
    minHeight: 30,
    justifyContent: 'center',
  },
  languageText: {
    color: '#7A8780',
    fontSize: 13,
    fontWeight: '900',
    letterSpacing: 0.6,
    fontFamily,
  },
  languageTextActive: {
    color: '#1D7A51',
  },
  languageDivider: {
    color: '#B8C3BD',
    fontSize: 13,
    fontWeight: '800',
    fontFamily,
  },  navButton: {
    minHeight: 34,
    paddingHorizontal: 0,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  navText: {
    color: '#405149',
    fontSize: 14,
    fontWeight: '800',
    letterSpacing: 0.2,
    fontFamily,
  },
  navTextActive: {
    color: '#10231B',
  },
  navUnderline: {
    width: 0,
    height: 2,
    borderRadius: 999,
    backgroundColor: '#1D7A51',
  },
  navUnderlineActive: {
    width: '100%',
  },
  hero: {
    paddingTop: 72,
    paddingBottom: 52,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 46,
  },
  heroMobile: {
    paddingTop: 42,
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  heroCopy: {
    flex: 1,
    maxWidth: 610,
  },
  eyebrow: {
    color: '#1D7A51',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontFamily,
  },
  heroTitle: {
    color: '#10231B',
    fontSize: 64,
    lineHeight: 68,
    fontWeight: '900',
    marginTop: 14,
    fontFamily,
  },
  heroTitleMobile: {
    fontSize: 42,
    lineHeight: 46,
  },
  typeCursor: {
    color: '#1D7A51',
  },
  heroText: {
    color: '#52635A',
    fontSize: 18,
    lineHeight: 30,
    marginTop: 20,
    maxWidth: 560,
    fontFamily,
  },
  heroActions: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 30,
    alignItems: 'center',
  },
  heroActionsMobile: {
    alignItems: 'stretch',
    flexDirection: 'column',
  },
  primaryButton: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#1D7A51',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    fontFamily,
  },
  secondaryButton: {
    minHeight: 52,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DCE4D8',
    alignItems: 'center',
    justifyContent: 'center',
  },
  secondaryButtonText: {
    color: '#10231B',
    fontSize: 15,
    fontWeight: '900',
    fontFamily,
  },
  heroPanel: {
    flex: 1,
    maxWidth: 480,
    padding: 14,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#DDE7D8',
    shadowColor: '#1D2B24',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: 14 },
  },
  heroImage: {
    width: '100%',
    height: 320,
    borderRadius: 16,
    backgroundColor: '#EAEFE7',
  },
  heroImageDots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 8,
    marginTop: 12,
  },
  heroImageDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#C9D8CF',
  },
  heroImageDotActive: {
    width: 22,
    backgroundColor: '#1D7A51',
  },
  section: {
    marginTop: 48,
  },
  sectionHeader: {
    maxWidth: 760,
  },
  sectionTitle: {
    color: '#10231B',
    fontSize: 38,
    lineHeight: 44,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  sectionText: {
    color: '#5C6B64',
    fontSize: 17,
    lineHeight: 28,
    marginTop: 12,
    fontFamily,
  },
  serviceGrid: {
    marginTop: 24,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceGridMobile: {
    flexDirection: 'column',
  },
  serviceCard: {
    flexGrow: 1,
    flexBasis: 250,
    minHeight: 210,
    padding: 22,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E8DD',
  },
  serviceIcon: {
    width: 46,
    height: 46,
    borderRadius: 12,
    backgroundColor: '#EAF5EE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTitle: {
    color: '#10231B',
    fontSize: 21,
    lineHeight: 26,
    fontWeight: '900',
    marginTop: 18,
    fontFamily,
  },
  serviceBody: {
    color: '#617069',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 10,
    fontFamily,
  },
  band: {
    marginTop: 56,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#DDE7D8',
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#F7F8F4',
  },
  processItem: {
    flex: 1,
    minWidth: 170,
    minHeight: 112,
    paddingVertical: 22,
    paddingHorizontal: 24,
    borderRightWidth: 1,
    borderColor: '#DDE7D8',
    justifyContent: 'space-between',
  },
  processIndex: {
    color: '#1D7A51',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.2,
    fontFamily,
  },
  processText: {
    color: '#10231B',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '900',
    fontFamily,
  },
  referenceGrid: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 18,
  },
  referenceGridMobile: {
    flexDirection: 'column',
  },
  referenceCard: {
    flex: 1,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E8DD',
  },
  referenceLogoWrap: {
    height: 58,
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  referenceLogo: {
    width: 180,
    height: 42,
  },
  referenceImageWrap: {
    height: 260,
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#EAEFE7',
  },
  referenceImage: {
    width: '100%',
    height: '100%',
  },
  referenceTitle: {
    color: '#10231B',
    fontSize: 22,
    fontWeight: '900',
    marginTop: 18,
    fontFamily,
  },
  referenceBody: {
    color: '#5D6C65',
    fontSize: 15,
    lineHeight: 24,
    marginTop: 8,
    fontFamily,
  },
  contact: {
    marginTop: 64,
    padding: 28,
    borderRadius: 22,
    backgroundColor: '#1D7A51',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 24,
  },
  contactMobile: {
    flexDirection: 'column',
    alignItems: 'stretch',
  },
  contactCopy: {
    flex: 1,
  },
  contactEyebrow: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.8,
    textTransform: 'uppercase',
    fontFamily,
  },
  contactTitle: {
    color: '#FFFFFF',
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  contactText: {
    color: 'rgba(255,255,255,0.82)',
    fontSize: 16,
    lineHeight: 26,
    marginTop: 10,
    maxWidth: 660,
    fontFamily,
  },
  contactButton: {
    minHeight: 54,
    paddingHorizontal: 22,
    borderRadius: 12,
    backgroundColor: '#10231B',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  contactButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '900',
    fontFamily,
  },
});

































