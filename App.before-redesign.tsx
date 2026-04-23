import { FontAwesome } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useMemo, useRef, useState } from 'react';
import {
  Animated,
  Easing,
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
import Svg, { Circle, Ellipse, Path } from 'react-native-svg';

const services = [
  'Site / apartman yönetim sistemi',
  'Kafe ve restaurant QR code menü hazırlama',
  'Her sektöre özel kurumsal web sitesi',
  'Şahıslara özel, mesleğine uygun web siteleri',
  'Berber / kuaför randevu sistemi (Webey)',
];

const references = [
  {
    title: 'Pisagor Danışmanlık',
    subtitle: 'Kurumsal tanıtım, hizmet menüsü ve iletişim odaklı firma sitesi',
    accent: '#E3B24A',
    image: require('./assets/references/pisagor.png') as ImageSourcePropType,
  },
  {
    title: 'Webey',
    subtitle: 'Berber ve kuaför randevu platformu, arama ve listeleme deneyimi',
    accent: '#2ECFE3',
    image: require('./assets/references/webey.png') as ImageSourcePropType,
  },
];

const partnerLogos = [
  {
    name: 'Pisagor Danışmanlık',
    image: require('./assets/pisagorlogo.webp') as ImageSourcePropType,
  },
  {
    name: 'Webey',
    image: require('./assets/webeylogo.png') as ImageSourcePropType,
  },
];

function FrogLogo({ size = 58 }: { size?: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 64 64" fill="none">
      <Path
        d="M32 7L44 11L54 22V39L44 52L32 57L20 52L10 39V22L20 11L32 7Z"
        fill="#7AD249"
      />
      <Path
        d="M19 23C20.5 18.5 24.5 16 29 16H35C39.5 16 43.5 18.5 45 23L47.5 31.5L45 42C43.2 46.8 38.6 50 33.4 50H30.6C25.4 50 20.8 46.8 19 42L16.5 31.5L19 23Z"
        fill="#8AE35A"
      />
      <Ellipse cx="25" cy="21" rx="5.5" ry="6.5" fill="#8AE35A" />
      <Ellipse cx="39" cy="21" rx="5.5" ry="6.5" fill="#8AE35A" />
      <Path d="M20.5 18.5L25 14L29 18.5" stroke="#0C1711" strokeWidth="2" strokeLinecap="round" />
      <Path d="M35 18.5L39 14L43.5 18.5" stroke="#0C1711" strokeWidth="2" strokeLinecap="round" />
      <Circle cx="25" cy="23.5" r="2.8" fill="#0C1711" />
      <Circle cx="39" cy="23.5" r="2.8" fill="#0C1711" />
      <Circle cx="25.8" cy="22.7" r="0.9" fill="#FFFFFF" />
      <Circle cx="39.8" cy="22.7" r="0.9" fill="#FFFFFF" />
      <Path d="M28 40C30.4 41.6 33.6 41.6 36 40" stroke="#0C1711" strokeWidth="2.4" strokeLinecap="round" />
      <Path
        d="M17.5 31H46.5"
        stroke="#0C1711"
        strokeOpacity="0.18"
        strokeWidth="1.4"
        strokeLinecap="round"
      />
    </Svg>
  );
}

function FloatingOrb({
  size,
  color,
  top,
  left,
  duration,
}: {
  size: number;
  color: string;
  top: number;
  left: number;
  duration: number;
}) {
  const drift = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(drift, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(drift, {
          toValue: 0,
          duration,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [drift, duration]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.orb,
        {
          width: size,
          height: size,
          borderRadius: size / 2,
          backgroundColor: color,
          top,
          left,
          transform: [
            {
              translateY: drift.interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 12],
              }),
            },
            {
              translateX: drift.interpolate({
                inputRange: [0, 1],
                outputRange: [-8, 8],
              }),
            },
          ],
        },
      ]}
    />
  );
}

function ReferenceMockup({
  title,
  subtitle,
  accent,
  image,
}: {
  title: string;
  subtitle: string;
  accent: string;
  image: ImageSourcePropType;
}) {
  return (
    <View style={[styles.referenceCard, { borderColor: `${accent}55` }]}>
      <View style={styles.referenceTopBar}>
        <View style={styles.referenceTopDots}>
          <View style={[styles.topDot, { backgroundColor: accent }]} />
          <View style={[styles.topDot, styles.topDotMuted]} />
          <View style={[styles.topDot, styles.topDotMuted]} />
        </View>
        <Text style={[styles.referenceUrl, { color: accent }]}>canlı proje önizleme</Text>
      </View>

      <View style={styles.referencePreviewFrame}>
        <Image source={image} style={styles.referenceImage} resizeMode="contain" />
      </View>

      <View style={styles.referenceMeta}>
        <View style={[styles.referenceAccentLine, { backgroundColor: accent }]} />
        <View style={styles.referenceHeroCopy}>
          <Text style={styles.referenceTitle}>{title}</Text>
          <Text style={styles.referenceSubtitle}>{subtitle}</Text>
        </View>
      </View>
    </View>
  );
}

function LogoMarquee() {
  const translateX = useRef(new Animated.Value(0)).current;
  const logoWidth = 220;
  const logoGap = 18;
  const cycleWidth = partnerLogos.length * (logoWidth + logoGap);

  useEffect(() => {
    Animated.loop(
      Animated.timing(translateX, {
        toValue: -cycleWidth,
        duration: 9000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [cycleWidth, translateX]);

  return (
    <View style={styles.logoMarqueeViewport}>
      <Animated.View style={[styles.logoMarqueeTrack, { transform: [{ translateX }] }]}>
        {[0, 1].map((copyIndex) => (
          <View key={copyIndex} style={styles.logoSequence}>
            {partnerLogos.map((logo) => (
              <View key={`${copyIndex}-${logo.name}`} style={[styles.logoBadge, { width: logoWidth, marginRight: logoGap }]}>
                <Image source={logo.image} style={styles.partnerLogoImage} resizeMode="contain" />
              </View>
            ))}
          </View>
        ))}
      </Animated.View>
    </View>
  );
}

function ReferencesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const timer = setInterval(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: 220,
          useNativeDriver: true,
        }),
        Animated.timing(translateY, {
          toValue: 12,
          duration: 220,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveIndex((current) => (current + 1) % references.length);
        opacity.setValue(0);
        translateY.setValue(12);
        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: 320,
            useNativeDriver: true,
          }),
          Animated.timing(translateY, {
            toValue: 0,
            duration: 320,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
        ]).start();
      });
    }, 2600);

    return () => clearInterval(timer);
  }, [opacity, translateY]);

  const activeReference = references[activeIndex];

  return (
    <View style={styles.showcaseShell}>
      <View style={styles.showcaseHeader}>
        <View>
          <Text style={styles.eyebrow}>Referans Siteler</Text>
          <Text style={styles.showcaseTitle}>Pisagor ve Webey ekranları dönüyor</Text>
        </View>
        <View style={styles.dotRow}>
          {references.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.carouselDot,
                index === activeIndex && { backgroundColor: activeReference.accent, width: 28 },
              ]}
            />
          ))}
        </View>
      </View>

      <Animated.View style={{ opacity, transform: [{ translateY }] }}>
        <ReferenceMockup {...activeReference} />
      </Animated.View>
    </View>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const isDesktop = width >= 1000;
  const isTablet = width >= 720;
  const contentWidth = Math.min(width - 32, 1180);
  const heroTitleSize = width >= 900 ? 60 : 42;
  const heroLineHeight = width >= 900 ? 68 : 50;
  const serviceColumns = useMemo(() => (isDesktop ? 2 : 1), [isDesktop]);
  const openWhatsApp = () => Linking.openURL('https://wa.me/905319843906');

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="light" />
      <View style={styles.app}>
        <FloatingOrb size={220} color="rgba(76, 205, 255, 0.12)" top={70} left={-40} duration={5200} />
        <FloatingOrb size={170} color="rgba(255, 176, 112, 0.1)" top={860} left={width * 0.72} duration={4600} />
        <FloatingOrb size={130} color="rgba(124, 255, 179, 0.1)" top={1360} left={width * 0.08} duration={5000} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.topHeader, { width: contentWidth }]}>
            <View style={styles.brandBlock}>
              <View style={styles.logoWrap}>
                <FrogLogo size={56} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Modern web studio</Text>
              </View>
            </View>

            <View style={styles.headerActions}>
              <Pressable style={styles.headerGhostButton}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={openWhatsApp} style={styles.headerPrimaryButton}>
                <FontAwesome name="whatsapp" size={18} color="#08110C" />
                <Text style={styles.headerPrimaryText}>WhatsApp</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.hero, { width: contentWidth, flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={[styles.heroCopy, { paddingRight: isDesktop ? 28 : 0 }]}>
              <Text style={styles.kicker}>FROG DIGITAL</Text>
              <Text style={[styles.title, { fontSize: heroTitleSize, lineHeight: heroLineHeight }]}>
                Kurumsal ve
                {'\n'}
                sektörünüze uygun
                {'\n'}
                modern web çözümleri
              </Text>
              <Text style={styles.description}>
                FROG markasını minimal ve güçlü bir kimlikle konumladım. Apartman yönetim sistemi, QR code menü,
                kurumsal firma siteleri, mesleğe özel web siteleri ve berber randevu sistemleri için modern arayüzler
                geliştiriyoruz.
              </Text>

              <View style={[styles.heroActions, { flexDirection: isTablet ? 'row' : 'column' }]}>
                <Pressable onPress={openWhatsApp} style={[styles.button, styles.primaryButton]}>
                  <Text style={styles.primaryButtonText}>Teklif Al</Text>
                </Pressable>
                <Pressable style={[styles.button, styles.secondaryButton]}>
                  <Text style={styles.secondaryButtonText}>Referansları İncele</Text>
                </Pressable>
              </View>
            </View>

            <View style={[styles.heroVisual, { marginTop: isDesktop ? 0 : 28, width: isDesktop ? 500 : '100%' }]}>
              <ReferencesShowcase />
            </View>
          </View>

          <View style={[styles.section, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>Hizmetlerimiz</Text>
            <Text style={styles.sectionTitle}>Sunduğunuz hizmetleri doğrudan öne çıkaran net yapı</Text>
            <View style={[styles.servicesWrap, { flexDirection: isDesktop ? 'row' : 'column' }]}>
              <View style={styles.servicesColumn}>
                {services.slice(0, Math.ceil(services.length / serviceColumns)).map((service) => (
                  <View key={service} style={styles.serviceListItem}>
                    <View style={styles.serviceBullet} />
                    <Text style={styles.serviceListText}>{service}</Text>
                  </View>
                ))}
              </View>
              {isDesktop ? (
                <View style={styles.servicesColumn}>
                  {services.slice(Math.ceil(services.length / serviceColumns)).map((service) => (
                    <View key={service} style={styles.serviceListItem}>
                      <View style={styles.serviceBullet} />
                      <Text style={styles.serviceListText}>{service}</Text>
                    </View>
                  ))}
                </View>
              ) : null}
            </View>
          </View>

          <View style={[styles.section, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>Referanslar</Text>
            <Text style={styles.sectionTitle}>Burada referans projelerinizin görünümleri dönüyor</Text>
            <Text style={styles.referenceNote}>
              Gerçek ekran görüntülerini kendin koymak istersen şu klasöre bırak:
              {'\n'}
              `C:\Users\yunus\Desktop\FROG\assets\references`
              {'\n'}
              Dosya adları:
              {'\n'}
              `pisagor.png`
              {'\n'}
              `webey.png`
              {'\n'}
              Bu iki dosyayı aynı isimlerle değiştirmen yeterli.
            </Text>
            <ReferencesShowcase />
            <View style={styles.logoMarqueeSection}>
              <Text style={styles.logoMarqueeLabel}>Referans Logoları</Text>
              <LogoMarquee />
            </View>
          </View>

          <View style={[styles.cta, { width: contentWidth }]}>
            <Text style={styles.ctaEyebrow}>Sonraki Adım</Text>
            <Text style={styles.ctaTitle}>Şirket adını, telefon numarasını ve renk seçimini verirsen metinleri tamamen markana göre kapatırım.</Text>
            <Text style={styles.ctaText}>
              Elinde referans ekran görüntüleri varsa `assets/references` altına koyup dönen alanları doğrudan gerçek
              projelerle değiştirebilirim.
            </Text>
          </View>
        </ScrollView>

        <Pressable onPress={openWhatsApp} style={styles.whatsAppButton}>
          <FontAwesome name="whatsapp" size={22} color="#FFFFFF" />
          <Text style={styles.whatsAppText}>WhatsApp</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const fontFamily = Platform.select({
  ios: 'Avenir Next',
  android: 'sans-serif-medium',
  default: '"Trebuchet MS", "Segoe UI", sans-serif',
});

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: '#09110B',
  },
  app: {
    flex: 1,
    backgroundColor: '#09110B',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 64,
  },
  orb: {
    position: 'absolute',
    opacity: 1,
  },
  hero: {
    paddingTop: 26,
    alignItems: 'stretch',
    justifyContent: 'space-between',
  },
  topHeader: {
    marginTop: 18,
    marginBottom: 10,
    paddingHorizontal: 18,
    paddingVertical: 16,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 18,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  logoWrap: {
    width: 62,
    height: 62,
    borderRadius: 18,
    backgroundColor: 'rgba(138, 227, 90, 0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  brandTitle: {
    color: '#F4FBF2',
    fontSize: 22,
    fontWeight: '800',
    letterSpacing: 0.8,
    fontFamily,
  },
  brandSub: {
    color: '#94A994',
    fontSize: 13,
    marginTop: 2,
    fontFamily,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerGhostButton: {
    minHeight: 46,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 18,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.03)',
  },
  headerGhostText: {
    color: '#DDE8DC',
    fontSize: 14,
    fontWeight: '700',
    fontFamily,
  },
  headerPrimaryButton: {
    minHeight: 46,
    borderRadius: 999,
    paddingHorizontal: 18,
    backgroundColor: '#8AE35A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  headerPrimaryText: {
    color: '#08110C',
    fontSize: 14,
    fontWeight: '800',
    fontFamily,
  },
  heroCopy: {
    flex: 1,
    maxWidth: 620,
  },
  heroVisual: {
    maxWidth: 520,
  },
  kicker: {
    color: '#8AE35A',
    letterSpacing: 2.6,
    fontSize: 12,
    fontWeight: '700',
    marginBottom: 18,
    fontFamily,
  },
  title: {
    color: '#F6FBFF',
    fontWeight: '800',
    letterSpacing: -1.4,
    fontFamily,
  },
  description: {
    color: '#AABBCD',
    fontSize: 17,
    lineHeight: 30,
    marginTop: 18,
    maxWidth: 560,
    fontFamily,
  },
  heroActions: {
    gap: 14,
    marginTop: 30,
    alignItems: 'flex-start',
  },
  button: {
    minHeight: 52,
    borderRadius: 18,
    paddingHorizontal: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#8AE35A',
  },
  secondaryButton: {
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(138, 227, 90, 0.24)',
  },
  primaryButtonText: {
    color: '#08110C',
    fontSize: 15,
    fontWeight: '800',
    fontFamily,
  },
  secondaryButtonText: {
    color: '#E8F3FF',
    fontSize: 15,
    fontWeight: '700',
    fontFamily,
  },
  section: {
    marginTop: 68,
  },
  sectionEyebrow: {
    color: '#8AE35A',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontWeight: '700',
    fontFamily,
  },
  sectionTitle: {
    color: '#F6FBFF',
    fontSize: 36,
    lineHeight: 44,
    fontWeight: '800',
    maxWidth: 820,
    fontFamily,
  },
  servicesWrap: {
    marginTop: 26,
    gap: 18,
  },
  servicesColumn: {
    flex: 1,
    gap: 14,
  },
  serviceListItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 14,
    borderRadius: 22,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    paddingHorizontal: 18,
    paddingVertical: 18,
  },
  serviceBullet: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#8AE35A',
    marginTop: 6,
  },
  serviceListText: {
    flex: 1,
    color: '#F0F7FF',
    fontSize: 18,
    lineHeight: 28,
    fontWeight: '700',
    fontFamily,
  },
  showcaseShell: {
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.04)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    padding: 22,
  },
  showcaseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 14,
    alignItems: 'flex-start',
    marginBottom: 18,
  },
  eyebrow: {
    color: '#8AE35A',
    fontSize: 11,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 8,
    fontWeight: '700',
    fontFamily,
  },
  showcaseTitle: {
    color: '#F6FBFF',
    fontSize: 26,
    lineHeight: 34,
    fontWeight: '800',
    maxWidth: 250,
    fontFamily,
  },
  dotRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginTop: 4,
  },
  carouselDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.2)',
  },
  referenceCard: {
    borderRadius: 24,
    borderWidth: 1,
    padding: 16,
    backgroundColor: '#101712',
  },
  referencePreviewFrame: {
    height: 280,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.06)',
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 6,
  },
  referenceImage: {
    width: '100%',
    height: '100%',
  },
  referenceTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
    marginBottom: 16,
  },
  referenceTopDots: {
    flexDirection: 'row',
    gap: 6,
  },
  topDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  topDotMuted: {
    backgroundColor: 'rgba(255,255,255,0.16)',
  },
  referenceUrl: {
    fontSize: 11,
    letterSpacing: 1.2,
    fontWeight: '700',
    fontFamily,
  },
  referenceHeroBlock: {
    display: 'none',
  },
  referenceMeta: {
    marginTop: 16,
    flexDirection: 'row',
    gap: 14,
  },
  referenceAccentLine: {
    width: 6,
    borderRadius: 999,
    minHeight: 58,
  },
  referenceHeroCopy: {
    flex: 1,
  },
  referenceTitle: {
    color: '#FCFEFF',
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '800',
    marginBottom: 8,
    fontFamily,
  },
  referenceSubtitle: {
    color: '#C6D6E7',
    fontSize: 14,
    lineHeight: 22,
    fontFamily,
  },
  referenceNote: {
    color: '#B4C4D6',
    fontSize: 15,
    lineHeight: 26,
    marginTop: 14,
    marginBottom: 22,
    maxWidth: 780,
    fontFamily,
  },
  logoMarqueeSection: {
    marginTop: 26,
  },
  logoMarqueeLabel: {
    color: '#E9F2E5',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 14,
    fontFamily,
  },
  logoMarqueeViewport: {
    overflow: 'hidden',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.08)',
    backgroundColor: 'rgba(255,255,255,0.03)',
    paddingVertical: 18,
  },
  logoMarqueeTrack: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoSequence: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoBadge: {
    height: 74,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 22,
  },
  partnerLogoImage: {
    width: '100%',
    height: 34,
    tintColor: '#111111',
    opacity: 0.92,
  },
  cta: {
    marginTop: 68,
    borderRadius: 30,
    paddingHorizontal: 24,
    paddingVertical: 30,
    backgroundColor: 'rgba(138, 227, 90, 0.08)',
    borderWidth: 1,
    borderColor: 'rgba(138, 227, 90, 0.16)',
  },
  ctaEyebrow: {
    color: '#B8F18D',
    fontSize: 12,
    letterSpacing: 2,
    textTransform: 'uppercase',
    marginBottom: 10,
    fontWeight: '700',
    fontFamily,
  },
  ctaTitle: {
    color: '#FCFEFF',
    fontSize: 30,
    lineHeight: 38,
    fontWeight: '800',
    maxWidth: 920,
    fontFamily,
  },
  ctaText: {
    color: '#C1D4E5',
    fontSize: 15,
    lineHeight: 26,
    marginTop: 12,
    maxWidth: 860,
    fontFamily,
  },
  whatsAppButton: {
    position: 'absolute',
    right: 24,
    bottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#22C55E',
    paddingHorizontal: 18,
    paddingVertical: 14,
    borderRadius: 999,
    shadowColor: '#000000',
    shadowOpacity: 0.28,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 10 },
  },
  whatsAppText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '800',
    fontFamily,
  },
});
