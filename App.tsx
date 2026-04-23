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
import Svg, { Circle, Defs, LinearGradient, Path, Stop, Text as SvgText } from 'react-native-svg';

const services = [
  {
    title: 'Kurumsal Web Siteleri',
    body: 'Sadece güzel görünen değil, güven veren, hızlı ve dönüşüm odaklı tanıtım siteleri tasarlıyoruz.',
    accent: '#39C986',
    icon: 'desktop',
    tag: 'Kurumsal vitrin',
    variant: 'corporate',
  },
  {
    title: 'Randevu ve Rezervasyon',
    body: 'Berber, kuaför, klinik ve hizmet işleri için temiz ve hızlı rezervasyon akışları kuruyoruz.',
    accent: '#4EA7D8',
    icon: 'calendar-check-o',
    tag: 'Akış tasarımı',
    variant: 'booking',
  },
  {
    title: 'QR Menü ve İşletme Ekranları',
    body: 'Müşterinin ilk temas anını daha premium gösteren mobil uyumlu menü ve vitrin deneyimleri hazırlıyoruz.',
    accent: '#F4B85E',
    icon: 'qrcode',
    tag: 'Mobil deneyim',
    variant: 'menu',
  },
  {
    title: 'Yönetim Panelleri',
    body: 'Site, apartman ve özel operasyonlar için sade ama güçlü yönetim ekranları tasarlıyoruz.',
    accent: '#C58BE8',
    icon: 'sliders',
    tag: 'Operasyon ekranı',
    variant: 'panel',
  },
];

const processSteps = [
  {
    title: 'Keşif ve Planlama',
    body: 'Marka dili, hedef kitle, ihtiyaçlar ve sayfa yapısı netleştirilir.',
    output: 'İçerik planı ve yön haritası',
    icon: 'search',
  },
  {
    title: 'Arayüz Tasarımı',
    body: 'Renk, tipografi, ana ekran ve kullanıcı akışı modern bir tasarım diline dönüştürülür.',
    output: 'Premium arayüz taslağı',
    icon: 'paint-brush',
  },
  {
    title: 'Geliştirme',
    body: 'Mobil uyumlu, hızlı ve temiz kodlu çalışan web deneyimi hazırlanır.',
    output: 'Yayına hazır çalışan site',
    icon: 'code',
  },
  {
    title: 'Yayın ve Kontrol',
    body: 'Son kontroller, iletişim akışları, performans ve yayın hazırlığı tamamlanır.',
    output: 'Canlıya alınmaya hazır proje',
    icon: 'rocket',
  },
];

const metrics = [
  { value: '04', label: 'Ana hizmet alanı' },
  { value: '03', label: 'Canlı referans sahnesi' },
  { value: '24/7', label: 'WhatsApp ulaşım akışı' },
];

type ReferenceItem = {
  title: string;
  subtitle: string;
  accent: string;
  stat: string;
  image?: ImageSourcePropType;
  logoImage?: ImageSourcePropType;
  logo?: 'elementa';
};

const references: ReferenceItem[] = [
  {
    title: 'Pisagor Danışmanlık',
    subtitle: 'Kurumsal güven, hizmet akışı ve net iletişim odaklı tanıtım sitesi.',
    accent: '#F4B85E',
    image: require('./assets/references/pisagor.png') as ImageSourcePropType,
    logoImage: require('./assets/pisagorlogo.webp') as ImageSourcePropType,
    stat: 'Kurumsal kimlik',
  },
  {
    title: 'Webey',
    subtitle: 'Berber ve kuaförler için daha hızlı keşfetme ve randevu deneyimi.',
    accent: '#4EA7D8',
    image: require('./assets/references/webey.png') as ImageSourcePropType,
    logoImage: require('./assets/webeylogo.png') as ImageSourcePropType,
    stat: 'Rezervasyon akışı',
  },
  {
    title: 'Elementa Eğitim & Danışmanlık',
    subtitle: 'Eğitim ve danışmanlık markası için sade, güven veren ve prestijli dijital vitrin.',
    accent: '#CBA65B',
    logo: 'elementa',
    stat: 'Eğitim & danışmanlık',
  },
];

const partnerLogos: ReferenceItem[] = [references[0], references[1], references[2]];

function FrogLogo({ size = 72 }: { size?: number }) {
  const width = size * 2.55;
  const height = size;

  return (
    <Svg width={width} height={height} viewBox="0 0 184 72" fill="none">
      <Defs>
        <LinearGradient id="frogWordmarkArc" x1="20" y1="12" x2="128" y2="28" gradientUnits="userSpaceOnUse">
          <Stop stopColor="#E9F8DE" />
          <Stop offset="0.6" stopColor="#39C986" />
          <Stop offset="1" stopColor="#4EA7D8" />
        </LinearGradient>
      </Defs>
      <Path
        d="M38 26C57 8 84 7 108 24"
        stroke="url(#frogWordmarkArc)"
        strokeWidth="3"
        strokeLinecap="round"
        strokeDasharray="5 8"
      />
      <Circle cx="111" cy="25" r="4" fill="#39C986" />
      <Path
        d="M112 24C114.9 20.6 119.9 20.2 123.3 23.1C126.7 26 127.1 31 124.2 34.4C121.3 37.8 116.3 38.2 112.9 35.3C109.5 32.4 109.1 27.4 112 24Z"
        fill="rgba(57,201,134,0.18)"
      />
      <SvgText
        x="8"
        y="54"
        fill="#15352D"
        fontSize="35"
        fontWeight="800"
        fontFamily="Trebuchet MS, Segoe UI, sans-serif"
        letterSpacing="8"
      >
        FROG
      </SvgText>
      <Circle cx="113.8" cy="43.2" r="3.2" fill="#39C986" />
      <Circle cx="121.8" cy="43.2" r="3.2" fill="#39C986" />
      <Circle cx="115" cy="42.4" r="1.1" fill="#17342D" />
      <Circle cx="123" cy="42.4" r="1.1" fill="#17342D" />
    </Svg>
  );
}

function ElementaLogo({ width = 300 }: { width?: number }) {
  const height = width * 0.32;

  return (
    <Svg width={width} height={height} viewBox="0 0 300 96" fill="none">
      <SvgText
        x="0"
        y="52"
        fill="#CBA65B"
        fontSize="34"
        fontWeight="800"
        fontFamily="Trebuchet MS, Segoe UI, sans-serif"
        letterSpacing="4"
      >
        ELEMENTA
      </SvgText>
      <SvgText
        x="2"
        y="78"
        fill="#CBA65B"
        fontSize="13"
        fontWeight="700"
        fontFamily="Trebuchet MS, Segoe UI, sans-serif"
        letterSpacing="3"
      >
        EĞİTİM &amp; DANIŞMANLIK
      </SvgText>
      <Path d="M215 8L292 48L215 88V8Z" stroke="#CBA65B" strokeWidth="7" strokeLinejoin="round" />
      <Path d="M236 35L263 48L236 61V35Z" fill="#CBA65B" />
      <Path d="M215 8V88" stroke="#CBA65B" strokeWidth="7" strokeLinecap="round" />
    </Svg>
  );
}

function ReferenceVisual({ reference }: { reference: ReferenceItem }) {
  if (reference.logo === 'elementa') {
    return (
      <View style={styles.elementaMockup}>
        <View style={styles.elementaMockupNav}>
          <ElementaLogo width={150} />
          <View style={styles.elementaMockupMenu}>
            <View style={[styles.elementaMockupMenuLine, styles.elementaMockupMenuLineActive]} />
            <View style={styles.elementaMockupMenuLine} />
            <View style={styles.elementaMockupMenuLine} />
          </View>
          <View style={styles.elementaMockupButton}>
            <FontAwesome name="envelope" size={11} color="#FFFFFF" />
          </View>
        </View>
        <View style={styles.elementaMockupHero}>
          <View style={styles.elementaPhotoBlock} />
          <View style={styles.elementaHeroOverlay} />
          <View style={styles.elementaHeroCopy}>
            <Text style={styles.elementaHeroPill}>ELEMENTA EĞİTİM & DANIŞMANLIK</Text>
            <Text style={styles.elementaHeroTitle}>
              Hedefinize uygun <Text style={styles.elementaHeroHighlight}>eğitim yol haritasını</Text> birlikte planlayalım
            </Text>
            <Text style={styles.elementaHeroText}>
              Kurumsal ve bireysel ihtiyaçlara özel, ölçülebilir ve sürdürülebilir eğitim çözümleri.
            </Text>
          </View>
        </View>
      </View>
    );
  }

  if (reference.image) {
    return <Image source={reference.image} style={styles.referenceImage} resizeMode="contain" />;
  }

  return null;
}

function PartnerLogo({ reference }: { reference: ReferenceItem }) {
  if (reference.logo === 'elementa') {
    return <ElementaLogo width={170} />;
  }

  if (reference.logoImage) {
    return <Image source={reference.logoImage} style={styles.partnerLogoImage} resizeMode="contain" />;
  }

  return null;
}

function AnimatedGlow({
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
        styles.glow,
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
                outputRange: [-22, 20],
              }),
            },
            {
              translateX: drift.interpolate({
                inputRange: [0, 1],
                outputRange: [-12, 12],
              }),
            },
            {
              scale: drift.interpolate({
                inputRange: [0, 1],
                outputRange: [0.94, 1.06],
              }),
            },
          ],
          opacity: drift.interpolate({
            inputRange: [0, 1],
            outputRange: [0.45, 0.9],
          }),
        },
      ]}
    />
  );
}

function ShineSweep({ duration = 2800, delay = 0 }: { duration?: number; delay?: number }) {
  const sweep = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(sweep, {
          toValue: 1,
          duration,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(sweep, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
        Animated.delay(900),
      ])
    ).start();
  }, [delay, duration, sweep]);

  return (
    <Animated.View
      pointerEvents="none"
      style={[
        styles.shineSweep,
        {
          transform: [
            {
              translateX: sweep.interpolate({
                inputRange: [0, 1],
                outputRange: [-180, 520],
              }),
            },
            { rotate: '-18deg' },
          ],
          opacity: sweep.interpolate({
            inputRange: [0, 0.25, 0.72, 1],
            outputRange: [0, 0.55, 0.25, 0],
          }),
        },
      ]}
    />
  );
}

function AnimatedPressable({
  children,
  onPress,
  style,
  pulse = false,
}: {
  children: React.ReactNode;
  onPress: () => void;
  style?: object | object[];
  pulse?: boolean;
}) {
  const press = useRef(new Animated.Value(1)).current;
  const glow = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!pulse) return;

    Animated.loop(
      Animated.sequence([
        Animated.timing(glow, {
          toValue: 1,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(glow, {
          toValue: 0,
          duration: 1600,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [glow, pulse]);

  const animateTo = (value: number) => {
    Animated.spring(press, {
      toValue: value,
      friction: 6,
      tension: 120,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={{
        transform: [
          {
            scale: pulse
              ? Animated.multiply(
                  press,
                  glow.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.035],
                  })
                )
              : press,
          },
        ],
      }}
    >
      <Pressable onPress={onPress} onPressIn={() => animateTo(0.96)} onPressOut={() => animateTo(1)} style={style}>
        {children}
      </Pressable>
    </Animated.View>
  );
}

function FloatingWhatsAppButton({ onPress }: { onPress: () => void }) {
  const bob = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bob, {
          toValue: 1,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(bob, {
          toValue: 0,
          duration: 1500,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [bob]);

  return (
    <Animated.View
      style={[
        styles.whatsAppButton,
        {
          transform: [
            {
              translateY: bob.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -7],
              }),
            },
            {
              scale: bob.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 1.04],
              }),
            },
          ],
        },
      ]}
    >
      <Pressable onPress={onPress} style={styles.whatsAppButtonPressable}>
        <FontAwesome name="whatsapp" size={22} color="#FFFFFF" />
        <Text style={styles.whatsAppText}>WhatsApp</Text>
      </Pressable>
    </Animated.View>
  );
}

function HeroArtwork({ isDesktop }: { isDesktop: boolean }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const ring = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.parallel([
        Animated.sequence([
          Animated.timing(pulse, {
            toValue: 1,
            duration: 2200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
          Animated.timing(pulse, {
            toValue: 0,
            duration: 2200,
            easing: Easing.inOut(Easing.quad),
            useNativeDriver: true,
          }),
        ]),
        Animated.sequence([
          Animated.timing(ring, {
            toValue: 1,
            duration: 2600,
            easing: Easing.out(Easing.cubic),
            useNativeDriver: true,
          }),
          Animated.timing(ring, {
            toValue: 0,
            duration: 0,
            useNativeDriver: true,
          }),
          Animated.delay(300),
        ]),
      ])
    ).start();

    Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 7600,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [orbit, pulse, ring]);

  return (
    <View style={[styles.heroArtwork, !isDesktop && styles.heroArtworkMobile]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.orbitRing,
          !isDesktop && styles.orbitRingMobile,
          {
            transform: [
              {
                rotate: orbit.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.orbitDot, styles.orbitDotPrimary]} />
        <View style={[styles.orbitDot, styles.orbitDotSecondary]} />
      </Animated.View>
      <Animated.View
        style={[
          styles.ring,
          !isDesktop && styles.ringMobile,
          {
            transform: [
              {
                scale: ring.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.82, 1.22],
                }),
              },
            ],
            opacity: ring.interpolate({
              inputRange: [0, 1],
              outputRange: [0.32, 0],
            }),
          },
        ]}
      />
      <Animated.View
        style={[
          styles.heroCore,
          !isDesktop && styles.heroCoreMobile,
          {
            transform: [
              {
                translateY: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -8],
                }),
              },
              {
                scale: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.04],
                }),
              },
            ],
          },
        ]}
      >
        <ShineSweep duration={3200} />
        <View style={styles.deviceTopBar}>
          <View style={styles.deviceDots}>
            <View style={[styles.deviceDot, { backgroundColor: '#F7A96D' }]} />
            <View style={[styles.deviceDot, { backgroundColor: '#F1C95C' }]} />
            <View style={[styles.deviceDot, { backgroundColor: '#39C986' }]} />
          </View>
          <View style={styles.deviceAddress}>
            <Text style={styles.deviceAddressText}>frog.studio</Text>
          </View>
        </View>

        <View style={[styles.deviceContent, !isDesktop && styles.deviceContentMobile]}>
          <View style={styles.deviceLogoRow}>
            <FrogLogo size={38} />
            <View style={styles.deviceStatusPill}>
              <Text style={styles.deviceStatusText}>LIVE</Text>
            </View>
          </View>
          <Text style={[styles.heroCardTitle, !isDesktop && styles.heroCardTitleMobile]}>
            Kurumsal web ve dijital ürün vitrini
          </Text>
          <Text style={styles.heroCardText}>
            Strateji, tasarım ve geliştirme tek bir premium ekran deneyiminde birleşir.
          </Text>
          <View style={styles.liveWave}>
            <View style={[styles.liveWaveBar, styles.liveWaveBarShort]} />
            <View style={[styles.liveWaveBar, styles.liveWaveBarTall]} />
            <View style={styles.liveWaveBar} />
          </View>
          <View style={[styles.deviceCards, !isDesktop && styles.deviceCardsMobile]}>
            {services.slice(0, 3).map((service) => (
              <AnimatedCard key={service.title} delay={180}>
                <View style={[styles.deviceMiniCard, !isDesktop && styles.deviceMiniCardMobile]}>
                  <View style={[styles.deviceMiniAccent, { backgroundColor: service.accent }]} />
                  <Text style={[styles.deviceMiniTitle, !isDesktop && styles.deviceMiniTitleMobile]}>{service.title}</Text>
                </View>
              </AnimatedCard>
            ))}
          </View>
        </View>
      </Animated.View>

    </View>
  );
}

function ServicesGrid({ isDesktop }: { isDesktop: boolean }) {
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  return (
    <View style={[styles.servicesGrid, !isDesktop && styles.servicesGridMobile]}>
      {services.map((service, index) => (
        <View key={service.title} style={[styles.serviceGridItem, !isDesktop && styles.serviceGridItemMobile]}>
          <FloatingFeatureCard delay={index * 140}>
            <ServiceCard
              service={service}
              index={index}
              isDesktop={isDesktop}
              isFlipped={openServiceIndex === index}
              onToggle={() => setOpenServiceIndex((current) => (current === index ? null : index))}
            />
          </FloatingFeatureCard>
        </View>
      ))}
    </View>
  );
}

function ServiceCard({
  service,
  index,
  isDesktop,
  isFlipped,
  onToggle,
}: {
  service: (typeof services)[number];
  index: number;
  isDesktop: boolean;
  isFlipped: boolean;
  onToggle: () => void;
}) {
  const flip = useRef(new Animated.Value(0)).current;
  const canFlip = Boolean(service.variant);
  const cardStyle = [
    styles.serviceCard,
    !isDesktop && styles.serviceCardMobile,
    !isDesktop && styles.cardFullWidth,
    { borderColor: `${service.accent}44` },
  ];

  useEffect(() => {
    Animated.spring(flip, {
      toValue: isFlipped ? 0 : 1,
      friction: 8,
      tension: 70,
      useNativeDriver: true,
    }).start();
  }, [flip, isFlipped]);

  const toggleFlip = () => {
    if (!canFlip) {
      return;
    }

    onToggle();
  };

  if (!canFlip) {
    return (
      <View style={cardStyle}>
        <ServiceCardFrontContent service={service} index={index} isDesktop={isDesktop} />
      </View>
    );
  }

  const frontRotate = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '0deg'],
  });
  const backRotate = flip.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <Pressable
      onPress={toggleFlip}
      style={[styles.serviceFlipShell, !isDesktop && styles.serviceFlipShellMobile, isFlipped && styles.serviceFlipShellExpanded]}
    >
      <Animated.View
        style={[
          cardStyle,
          styles.serviceFlipFace,
          {
            transform: [{ perspective: 900 }, { rotateY: frontRotate }],
          },
        ]}
      >
        <ServiceCardFrontContent service={service} index={index} isDesktop={isDesktop} />
      </Animated.View>
      <Animated.View
        style={[
          cardStyle,
          styles.serviceFlipFace,
          styles.serviceBackFace,
          {
            transform: [{ perspective: 900 }, { rotateY: backRotate }],
          },
        ]}
      >
        {service.variant === 'corporate' ? (
          <CorporateBackFace />
        ) : service.variant === 'booking' ? (
          <BookingBackFace />
        ) : service.variant === 'panel' ? (
          <PanelBackFace />
        ) : (
          <QRMenuBackFace />
        )}
      </Animated.View>
    </Pressable>
  );
}

function ServiceCardFrontContent({
  service,
  index,
  isDesktop = true,
}: {
  service: (typeof services)[number];
  index: number;
  isDesktop?: boolean;
}) {
  if (service.variant === 'menu') {
    return (
      <>
        <ShineSweep duration={3600} delay={index * 240} />
        <View style={styles.serviceTopRow}>
          <View style={[styles.serviceIconBubble, { backgroundColor: `${service.accent}18` }]}>
            <FontAwesome name={service.icon as React.ComponentProps<typeof FontAwesome>['name']} size={20} color={service.accent} />
          </View>
          <Text style={styles.serviceIndex}>0{index + 1}</Text>
        </View>
        <View style={[styles.serviceAccent, { backgroundColor: service.accent }]} />
        <View style={[styles.serviceCopy, !isDesktop && styles.serviceCopyMobile]}>
          <Text style={styles.serviceKicker}>{service.tag}</Text>
          <Text style={[styles.serviceTitle, !isDesktop && styles.serviceTitleMobile]}>{service.title}</Text>
          <Text style={[styles.serviceBody, !isDesktop && styles.serviceBodyMobile]}>{service.body}</Text>
        </View>
        <View style={styles.serviceChips}>
          <Text style={[styles.serviceChip, { borderColor: `${service.accent}55` }]}>Menü</Text>
          <Text style={styles.serviceChip}>Mobil</Text>
        </View>
        <View style={styles.serviceFooter}>
          <Text style={styles.serviceTag}>Detayı aç</Text>
          <View style={[styles.serviceArrow, { backgroundColor: service.accent }]}>
            <FontAwesome name="refresh" size={15} color="#FFFFFF" />
          </View>
        </View>
      </>
    );
  }

  return (
    <>
      <ShineSweep duration={3600} delay={index * 240} />
      <View style={styles.serviceTopRow}>
        <View style={[styles.serviceIconBubble, { backgroundColor: `${service.accent}18` }]}>
          <FontAwesome name={service.icon as React.ComponentProps<typeof FontAwesome>['name']} size={20} color={service.accent} />
        </View>
        <Text style={styles.serviceIndex}>0{index + 1}</Text>
      </View>
      <View style={[styles.serviceAccent, { backgroundColor: service.accent }]} />
      <View style={[styles.serviceCopy, !isDesktop && styles.serviceCopyMobile]}>
        <Text style={styles.serviceKicker}>{service.tag}</Text>
        <Text style={[styles.serviceTitle, !isDesktop && styles.serviceTitleMobile]}>{service.title}</Text>
        <Text style={[styles.serviceBody, !isDesktop && styles.serviceBodyMobile]}>{service.body}</Text>
      </View>
      <ServiceMiniPreview service={service} />
      <View style={styles.serviceChips}>
        <Text style={[styles.serviceChip, { borderColor: `${service.accent}55` }]}>Tasarım</Text>
        <Text style={styles.serviceChip}>Mobil</Text>
      </View>
      <View style={styles.serviceFooter}>
        <Text style={styles.serviceTag}>Detayı aç</Text>
        <View style={[styles.serviceArrow, { backgroundColor: service.accent }]}>
          <FontAwesome name={service.variant ? 'refresh' : 'long-arrow-right'} size={15} color="#FFFFFF" />
        </View>
      </View>
    </>
  );
}

function QRMenuBackFace() {
  return (
    <View style={styles.qrMenuBack}>
      <View style={styles.qrMenuBackHero}>
        <View>
          <Text style={styles.qrMenuBackBrand}>Ada Bistro</Text>
          <Text style={styles.qrMenuBackTitle}>Taze, hızlı, şık.</Text>
        </View>
        <View style={styles.qrMenuBackQr}>
          <FontAwesome name="qrcode" size={18} color="#111816" />
        </View>
      </View>
      <View style={styles.qrMenuBackSearch}>
        <FontAwesome name="search" size={10} color="#6D746F" />
        <Text style={styles.qrMenuBackSearchText}>Ürün ara</Text>
      </View>
      <View style={styles.qrMenuBackTabs}>
        {['Tümü', 'Kahvaltı', 'Ana', 'Tatlı'].map((item, itemIndex) => (
          <View key={item} style={[styles.qrMenuBackTab, itemIndex === 0 && styles.qrMenuBackTabActive]}>
            <Text style={[styles.qrMenuBackTabText, itemIndex === 0 && styles.qrMenuBackTabTextActive]}>{item}</Text>
          </View>
        ))}
      </View>
      {[
        ['Fesleğenli tavuk bowl', 'ızgara tavuk, pirinç, roka', '₺245'],
        ['Avokadolu tost', 'ekşi maya, yumurta, yeşillik', '₺185'],
        ['Soğuk demleme kahve', 'portakal kabuğu, buz', '₺115'],
        ['San Sebastian', 'frambuaz sos, krema', '₺155'],
      ].map(([title, meta, price]) => (
        <View key={title} style={styles.qrMenuBackProduct}>
          <View style={styles.qrMenuBackImage} />
          <View style={styles.qrMenuBackProductCopy}>
            <Text style={styles.qrMenuBackProductTitle}>{title}</Text>
            <Text style={styles.qrMenuBackProductMeta}>{meta}</Text>
          </View>
          <Text style={styles.qrMenuBackPrice}>{price}</Text>
        </View>
      ))}
      <Text style={styles.qrMenuBackHint}>Tekrar dokun, ön yüze dön</Text>
    </View>
  );
}

function CorporateBackFace() {
  return (
    <View style={styles.corporateBack}>
      <View style={styles.corporateBackTop}>
        <View style={styles.corporateLogoCard}>
          <Image source={require('./assets/pisagorlogo.webp')} style={styles.corporateLogoImage} resizeMode="contain" />
        </View>
        <View style={styles.corporateBackMeta}>
          <Text style={styles.corporateBackEyebrow}>Kurumsal web sitesi</Text>
          <Text style={styles.corporateBackTitle}>Pisagor Danışmanlık</Text>
        </View>
      </View>
      <View style={styles.corporateScreen}>
        <Image source={require('./assets/references/pisagor.png')} style={styles.corporateScreenImage} resizeMode="cover" />
      </View>
      <View style={styles.corporateBackStats}>
        <View style={styles.corporateBackStat}>
          <Text style={styles.corporateBackStatValue}>UI</Text>
          <Text style={styles.corporateBackStatLabel}>Kurumsal vitrin</Text>
        </View>
        <View style={styles.corporateBackStat}>
          <Text style={styles.corporateBackStatValue}>SEO</Text>
          <Text style={styles.corporateBackStatLabel}>Hızlı yapı</Text>
        </View>
      </View>
      <Text style={styles.qrMenuBackHint}>Tekrar dokun, ön yüze dön</Text>
    </View>
  );
}

function BookingBackFace() {
  return (
    <View style={styles.bookingBack}>
      <View style={styles.bookingBackTop}>
        <View style={styles.bookingLogoCard}>
          <Image source={require('./assets/webeylogo.png')} style={styles.bookingLogoImage} resizeMode="contain" />
        </View>
        <View style={styles.bookingBackMeta}>
          <Text style={styles.bookingBackEyebrow}>Randevu deneyimi</Text>
          <Text style={styles.bookingBackTitle}>Webey</Text>
        </View>
      </View>
      <View style={styles.bookingScreen}>
        <Image source={require('./assets/references/webey.png')} style={styles.bookingScreenImage} resizeMode="cover" />
      </View>
      <View style={styles.bookingSlotRow}>
        {['09:30', '11:00', '14:30'].map((slot, index) => (
          <View key={slot} style={[styles.bookingSlot, index === 1 && styles.bookingSlotActive]}>
            <Text style={[styles.bookingSlotText, index === 1 && styles.bookingSlotTextActive]}>{slot}</Text>
          </View>
        ))}
      </View>
      <Text style={styles.qrMenuBackHint}>Tekrar dokun, ön yüze dön</Text>
    </View>
  );
}

function PanelBackFace() {
  return (
    <View style={styles.panelBack}>
      <View style={styles.panelLoginCard}>
        <Text style={styles.panelLoginTitle}>Pisagor Danışmanlık</Text>
        <Text style={styles.panelLoginTitle}>Yönetim Paneli</Text>

        <View style={styles.panelFieldGroup}>
          <Text style={styles.panelFieldLabel}>Kullanıcı Adı</Text>
          <View style={styles.panelInput}>
            <Text style={styles.panelInputText}>admin</Text>
          </View>
        </View>

        <View style={styles.panelFieldGroup}>
          <Text style={styles.panelFieldLabel}>Şifre</Text>
          <View style={styles.panelInput}>
            <Text style={styles.panelInputText}>••••••••</Text>
          </View>
        </View>

        <View style={styles.panelButton}>
          <Text style={styles.panelButtonText}>Giriş Yap</Text>
        </View>
      </View>
      <View style={styles.panelMiniStats}>
        <View style={styles.panelMiniStat}>
          <Text style={styles.panelMiniValue}>Login</Text>
          <Text style={styles.panelMiniLabel}>Güvenli giriş</Text>
        </View>
        <View style={styles.panelMiniStat}>
          <Text style={styles.panelMiniValue}>Admin</Text>
          <Text style={styles.panelMiniLabel}>Yönetim akışı</Text>
        </View>
      </View>
      <Text style={styles.panelBackHint}>Tekrar dokun, ön yüze dön</Text>
    </View>
  );
}

function ServiceMiniPreview({ service }: { service: (typeof services)[number] }) {
  if (service.variant === 'menu') {
    return (
      <View style={styles.qrMenuPreview}>
        <View style={styles.qrMenuHero}>
          <View>
            <Text style={styles.qrMenuBrand}>Ada Bistro</Text>
            <Text style={styles.qrMenuTitle}>Taze, hızlı, şık.</Text>
          </View>
          <View style={styles.qrMenuQr}>
            <FontAwesome name="qrcode" size={14} color="#111816" />
          </View>
        </View>
        <View style={styles.qrMenuTabs}>
          {['Tümü', 'Ana', 'Tatlı'].map((item, itemIndex) => (
            <View key={item} style={[styles.qrMenuTab, itemIndex === 0 && styles.qrMenuTabActive]}>
              <Text style={[styles.qrMenuTabText, itemIndex === 0 && styles.qrMenuTabTextActive]}>{item}</Text>
            </View>
          ))}
        </View>
        <View style={styles.qrMenuProductRow}>
          <View style={styles.qrMenuProductImage} />
          <View style={styles.qrMenuProductCopy}>
            <Text style={styles.qrMenuProductTitle}>Fesleğenli tavuk bowl</Text>
            <Text style={styles.qrMenuProductMeta}>premium menü kartı</Text>
          </View>
          <Text style={styles.qrMenuPrice}>₺245</Text>
        </View>
      </View>
    );
  }

  return null;
}

function FloatingFeatureCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const float = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.delay(delay),
        Animated.timing(float, {
          toValue: 1,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(float, {
          toValue: 0,
          duration: 2200,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [delay, float]);

  return (
    <AnimatedCard delay={delay}>
      <Animated.View
        style={{
          transform: [
            {
              translateY: float.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -8],
              }),
            },
          ],
        }}
      >
        {children}
      </Animated.View>
    </AnimatedCard>
  );
}

function AnimatedCard({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const rise = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.delay(delay),
      Animated.timing(rise, {
        toValue: 1,
        duration: 700,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }),
    ]).start();
  }, [delay, rise]);

  return (
    <Animated.View
      style={{
        opacity: rise,
        transform: [
          {
            translateY: rise.interpolate({
              inputRange: [0, 1],
              outputRange: [28, 0],
            }),
          },
          {
            scale: rise.interpolate({
              inputRange: [0, 1],
              outputRange: [0.96, 1],
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

function ScrollReveal({
  children,
  scrollY,
  start,
  distance = 42,
  side = 0,
}: {
  children: React.ReactNode;
  scrollY: Animated.Value;
  start: number;
  distance?: number;
  side?: number;
}) {
  return (
    <Animated.View
      style={{
        opacity: scrollY.interpolate({
          inputRange: [start, start + 180],
          outputRange: [0, 1],
          extrapolate: 'clamp',
        }),
        transform: [
          {
            translateY: scrollY.interpolate({
              inputRange: [start, start + 180],
              outputRange: [distance, 0],
              extrapolate: 'clamp',
            }),
          },
          {
            translateX: scrollY.interpolate({
              inputRange: [start, start + 180],
              outputRange: [side, 0],
              extrapolate: 'clamp',
            }),
          },
          {
            scale: scrollY.interpolate({
              inputRange: [start, start + 180],
              outputRange: [0.96, 1],
              extrapolate: 'clamp',
            }),
          },
        ],
      }}
    >
      {children}
    </Animated.View>
  );
}

function AboutKineticHero({ scrollY, isDesktop }: { scrollY: Animated.Value; isDesktop: boolean }) {
  const pulse = useRef(new Animated.Value(0)).current;
  const orbit = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulse, {
          toValue: 1,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
        Animated.timing(pulse, {
          toValue: 0,
          duration: 1800,
          easing: Easing.inOut(Easing.sin),
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.timing(orbit, {
        toValue: 1,
        duration: 11000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [orbit, pulse]);

  return (
    <View style={[styles.aboutHeroStage, !isDesktop && styles.aboutHeroStageMobile]}>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.aboutOrbit,
          !isDesktop && styles.aboutOrbitMobile,
          {
            transform: [
              {
                rotate: orbit.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0deg', '360deg'],
                }),
              },
              {
                scale: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 1.035],
                }),
              },
            ],
          },
        ]}
      >
        <View style={[styles.aboutOrbitDot, styles.aboutOrbitDotOne]} />
        <View style={[styles.aboutOrbitDot, styles.aboutOrbitDotTwo]} />
        <View style={[styles.aboutOrbitDot, styles.aboutOrbitDotThree]} />
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutLaptop,
          !isDesktop && styles.aboutLaptopMobile,
          {
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 460],
                  outputRange: [0, -28],
                  extrapolate: 'clamp',
                }),
              },
              {
                rotate: scrollY.interpolate({
                  inputRange: [0, 460],
                  outputRange: ['-3deg', '2deg'],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.aboutLaptopBar}>
          <View style={styles.aboutLaptopDot} />
          <View style={styles.aboutLaptopDot} />
          <View style={styles.aboutLaptopDot} />
        </View>
        <View style={styles.aboutLaptopHero}>
          <View style={[styles.aboutLaptopTitleLine, !isDesktop && styles.aboutLaptopTitleLineMobile]} />
          <View style={styles.aboutLaptopSmallLine} />
        </View>
        <View style={styles.aboutLaptopGrid}>
          <View style={[styles.aboutLaptopTile, styles.aboutLaptopTileGreen]} />
          <View style={[styles.aboutLaptopTile, styles.aboutLaptopTileBlue]} />
          <View style={[styles.aboutLaptopTile, styles.aboutLaptopTileGold]} />
        </View>
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutPhoneMock,
          !isDesktop && styles.aboutPhoneMockMobile,
          {
            transform: [
              {
                translateY: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, -12],
                }),
              },
            ],
          },
        ]}
      >
        <View style={styles.aboutPhoneNotch} />
        <View style={styles.aboutPhoneLine} />
        <View style={styles.aboutPhoneCard} />
        <View style={[styles.aboutPhoneLine, styles.aboutPhoneLineShort]} />
      </Animated.View>

      <Animated.View
        style={[
          styles.aboutScrollBadge,
          !isDesktop && styles.aboutScrollBadgeMobile,
          {
            opacity: scrollY.interpolate({
              inputRange: [0, 220],
              outputRange: [1, 0],
              extrapolate: 'clamp',
            }),
            transform: [
              {
                translateY: pulse.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 8],
                }),
              },
            ],
          },
        ]}
      >
        <Text style={styles.aboutScrollBadgeText}>Aşağı Kaydır</Text>
        <FontAwesome name="angle-down" size={18} color="#15352D" />
      </Animated.View>
    </View>
  );
}

function ReferencesShowcase() {
  const [activeIndex, setActiveIndex] = useState(0);
  const slide = useRef(new Animated.Value(0)).current;
  const logoScroll = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    const id = setInterval(() => {
      Animated.sequence([
        Animated.timing(slide, {
          toValue: 1,
          duration: 240,
          easing: Easing.inOut(Easing.quad),
          useNativeDriver: true,
        }),
        Animated.timing(slide, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ]).start(() => {
        setActiveIndex((current) => (current + 1) % references.length);
      });
    }, 3200);

    return () => clearInterval(id);
  }, [slide]);

  useEffect(() => {
    Animated.loop(
      Animated.timing(logoScroll, {
        toValue: -238 * partnerLogos.length,
        duration: 10000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();
  }, [logoScroll]);

  const active = references[activeIndex];
  const next = references[(activeIndex + 1) % references.length];

  return (
    <View style={styles.referenceShell}>
      <View style={styles.sectionHeaderRow}>
        <View>
          <Text style={styles.sectionEyebrow}>Referans Vitrini</Text>
          <Text style={styles.sectionTitle}>Katmanlı geçişlerle canlı proje sahnesi</Text>
        </View>
        <View style={styles.dotRow}>
          {references.map((item, index) => (
            <View
              key={item.title}
              style={[
                styles.carouselDot,
                index === activeIndex && { width: 34, backgroundColor: active.accent },
              ]}
            />
          ))}
        </View>
      </View>

      <View style={styles.referenceStage}>
        <View style={[styles.referenceGhostCard, { borderColor: `${next.accent}33` }]} />
        <Animated.View
          style={[
            styles.referenceCard,
            {
              borderColor: `${active.accent}66`,
              opacity: slide.interpolate({
                inputRange: [0, 1],
                outputRange: [1, 0.28],
              }),
              transform: [
                {
                  translateY: slide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -18],
                  }),
                },
                {
                  scale: slide.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 0.96],
                  }),
                },
              ],
            },
          ]}
        >
          <View style={styles.referenceTopBar}>
            <View style={styles.referenceTopDots}>
              <View style={[styles.topDot, { backgroundColor: active.accent }]} />
              <View style={[styles.topDot, styles.topDotMuted]} />
              <View style={[styles.topDot, styles.topDotMuted]} />
            </View>
            <Text style={[styles.referenceTopText, { color: active.accent }]}>{active.stat}</Text>
          </View>

          <View style={styles.referenceImageFrame}>
            <ShineSweep duration={3400} delay={300} />
            <ReferenceVisual reference={active} />
          </View>

          <View style={styles.referenceBottom}>
            <View style={[styles.referenceAccent, { backgroundColor: active.accent }]} />
            <View style={styles.referenceCopy}>
              <Text style={styles.referenceTitle}>{active.title}</Text>
              <Text style={styles.referenceSubtitle}>{active.subtitle}</Text>
            </View>
          </View>
        </Animated.View>
      </View>

      <View style={styles.logoMarqueeViewport}>
        <Animated.View style={[styles.logoMarqueeTrack, { transform: [{ translateX: logoScroll }] }]}>
          {[0, 1].map((copyIndex) => (
            <View key={copyIndex} style={styles.logoSequence}>
              {partnerLogos.map((logo, index) => (
                <View key={`${copyIndex}-${index}`} style={styles.logoBadge}>
                  <PartnerLogo reference={logo} />
                </View>
              ))}
            </View>
          ))}
        </Animated.View>
      </View>
    </View>
  );
}

function ServicesPage({
  contentWidth,
  isDesktop,
  isTablet,
  onHome,
  onAbout,
  onServices,
  onReferences,
  onContactPage,
  onContact,
}: {
  contentWidth: number;
  isDesktop: boolean;
  isTablet: boolean;
  onHome: () => void;
  onAbout: () => void;
  onServices: () => void;
  onReferences: () => void;
  onContactPage: () => void;
  onContact: () => void;
}) {
  const useCompactNav = !isDesktop;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <AnimatedGlow size={420} color="rgba(112, 219, 150, 0.24)" top={-90} left={-120} duration={6200} />
        <AnimatedGlow size={340} color="rgba(84, 169, 215, 0.18)" top={360} left={contentWidth * 0.7} duration={5800} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.topHeader, useCompactNav && styles.topHeaderMobile, { width: contentWidth }]}>
            <Pressable onPress={onHome} style={styles.brandBlock}>
              <View style={[styles.logoWrap, !isTablet && styles.logoWrapMobile]}>
                <FrogLogo size={isTablet ? 44 : 36} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Web tasarım ve yazılım ajansı</Text>
              </View>
            </Pressable>

            <View style={[styles.headerActions, useCompactNav && styles.headerActionsMobile]}>
              <Pressable onPress={onHome} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Ana Sayfa</Text>
              </Pressable>
              <Pressable onPress={onAbout} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hakkımızda</Text>
              </Pressable>
              <Pressable onPress={onServices} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hizmetlerimiz</Text>
              </Pressable>
              <Pressable onPress={onReferences} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={onContactPage} style={[styles.headerPrimaryButton, useCompactNav && styles.headerButtonMobile]}>
                <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                <Text style={styles.headerPrimaryText}>Teklif Al</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.servicesPageHero, !isTablet && styles.servicesPageHeroMobile, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>HİZMETLERİMİZ</Text>
            <Text style={[styles.servicesPageTitle, !isTablet && styles.servicesPageTitleMobile]}>
              İşletmenizi dijitalde daha güçlü gösteren çözümler
            </Text>
            <Text style={styles.servicesPageText}>
              FROG; web sitesi, randevu sistemi, QR menü ve yönetim paneli gibi ihtiyaçları modern, hızlı ve güven veren
              arayüzlerle tek çatı altında tasarlar.
            </Text>
          </View>

          <View style={[styles.servicesPageGrid, { width: contentWidth, flexDirection: isDesktop ? 'row' : 'column' }]}>
            {services.map((service, index) => (
              <AnimatedCard key={service.title} delay={index * 100}>
                <View style={[styles.servicesPageCard, !isDesktop && styles.servicesPageCardMobile]}>
                  <ShineSweep duration={3600} delay={index * 220} />
                  <View style={styles.servicesPageCardContent}>
                    <View style={[styles.serviceAccent, { backgroundColor: service.accent }]} />
                    <Text style={styles.servicesPageCardTitle}>{service.title}</Text>
                    <Text style={styles.servicesPageCardText}>{service.body}</Text>
                    <Text style={styles.servicesPageCardNote}>Planlama, tasarım, mobil uyum ve yayına hazırlık dahil.</Text>
                  </View>
                </View>
              </AnimatedCard>
            ))}
          </View>

          <View style={[styles.servicesInfoCta, !isTablet && styles.servicesInfoCtaMobile, { width: contentWidth }]}>
            <Text style={styles.servicesInfoCtaText}>Hangi hizmetin size uygun olduğunu birlikte netleştirelim.</Text>
            <Pressable onPress={onContactPage} style={styles.infoButton}>
              <Text style={styles.infoButtonText}>Hizmetlerimiz Hakkında Bilgi Al</Text>
            </Pressable>
          </View>

          <View style={[styles.servicesPageProcess, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>NASIL İLERLİYORUZ?</Text>
            <View style={[styles.processGrid, !isDesktop && styles.processGridMobile]}>
              {processSteps.map((step, index) => (
                <View key={step.title} style={[styles.processCard, !isDesktop && styles.cardFullWidth]}>
                  <ShineSweep duration={3900} delay={index * 240} />
                  <View style={styles.processTopRow}>
                    <Text style={styles.processIndex}>0{index + 1}</Text>
                    <View style={styles.processIconBubble}>
                      <FontAwesome name={step.icon as React.ComponentProps<typeof FontAwesome>['name']} size={17} color="#133028" />
                    </View>
                  </View>
                  <Text style={styles.processText}>{step.title}</Text>
                  <Text style={styles.processBody}>{step.body}</Text>
                  <View style={styles.processOutput}>
                    <Text style={styles.processOutputLabel}>Çıktı</Text>
                    <Text style={styles.processOutputText}>{step.output}</Text>
                  </View>
                </View>
              ))}
            </View>
            <View style={styles.processSummary}>
              <Text style={styles.processSummaryTitle}>Süreç genelde 3-7 gün içinde netleşir.</Text>
              <Text style={styles.processSummaryText}>
                Projenin kapsamına göre tasarım, geliştirme ve yayın adımlarını birlikte planlıyoruz.
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function ContactPage({
  contentWidth,
  isDesktop,
  isTablet,
  onHome,
  onAbout,
  onServices,
  onReferences,
  onWhatsApp,
}: {
  contentWidth: number;
  isDesktop: boolean;
  isTablet: boolean;
  onHome: () => void;
  onAbout: () => void;
  onServices: () => void;
  onReferences: () => void;
  onWhatsApp: () => void;
}) {
  const useCompactNav = !isDesktop;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <AnimatedGlow size={420} color="rgba(112, 219, 150, 0.24)" top={-80} left={-110} duration={6200} />
        <AnimatedGlow size={320} color="rgba(244, 184, 94, 0.2)" top={420} left={contentWidth * 0.58} duration={5400} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.topHeader, useCompactNav && styles.topHeaderMobile, { width: contentWidth }]}>
            <Pressable onPress={onHome} style={styles.brandBlock}>
              <View style={[styles.logoWrap, !isTablet && styles.logoWrapMobile]}>
                <FrogLogo size={isTablet ? 44 : 36} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Web tasarım ve yazılım ajansı</Text>
              </View>
            </Pressable>

            <View style={[styles.headerActions, useCompactNav && styles.headerActionsMobile]}>
              <Pressable onPress={onHome} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Ana Sayfa</Text>
              </Pressable>
              <Pressable onPress={onAbout} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hakkımızda</Text>
              </Pressable>
              <Pressable onPress={onServices} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hizmetlerimiz</Text>
              </Pressable>
              <Pressable onPress={onReferences} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={onWhatsApp} style={[styles.headerPrimaryButton, useCompactNav && styles.headerButtonMobile]}>
                <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                <Text style={styles.headerPrimaryText}>WhatsApp</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.contactPanel, !isTablet && styles.contactPanelMobile, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>İLETİŞİM</Text>
            <Text style={[styles.contactTitle, !isTablet && styles.contactTitleMobile]}>
              Projenizi konuşalım, size en uygun çözümü birlikte netleştirelim.
            </Text>
            <Text style={styles.contactText}>
              Web sitesi, randevu sistemi, QR menü veya yönetim paneli ihtiyacınız varsa WhatsApp üzerinden hızlıca
              bilgi alabilirsiniz.
            </Text>

            <Pressable onPress={onWhatsApp} style={styles.whatsAppPanelButton}>
              <FontAwesome name="whatsapp" size={22} color="#133028" />
              <Text style={styles.whatsAppPanelText}>WhatsApp'tan Bilgi Al</Text>
            </Pressable>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function AboutPageLegacy({
  contentWidth,
  isDesktop,
  isTablet,
  onHome,
  onAbout,
  onServices,
  onReferences,
  onContact,
}: {
  contentWidth: number;
  isDesktop: boolean;
  isTablet: boolean;
  onHome: () => void;
  onAbout: () => void;
  onServices: () => void;
  onReferences: () => void;
  onContact: () => void;
}) {
  const useCompactNav = !isDesktop;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <AnimatedGlow size={420} color="rgba(112, 219, 150, 0.24)" top={-80} left={-110} duration={6200} />
        <AnimatedGlow size={340} color="rgba(84, 169, 215, 0.17)" top={420} left={contentWidth * 0.62} duration={5800} />

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.topHeader, useCompactNav && styles.topHeaderMobile, { width: contentWidth }]}>
            <Pressable onPress={onHome} style={styles.brandBlock}>
              <View style={[styles.logoWrap, !isTablet && styles.logoWrapMobile]}>
                <FrogLogo size={isTablet ? 44 : 36} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Web tasarım ve yazılım ajansı</Text>
              </View>
            </Pressable>

            <View style={[styles.headerActions, useCompactNav && styles.headerActionsMobile]}>
              <Pressable onPress={onHome} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Ana Sayfa</Text>
              </Pressable>
              <Pressable onPress={onAbout} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hakkımızda</Text>
              </Pressable>
              <Pressable onPress={onServices} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hizmetlerimiz</Text>
              </Pressable>
              <Pressable onPress={onReferences} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={onContact} style={[styles.headerPrimaryButton, useCompactNav && styles.headerButtonMobile]}>
                <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                <Text style={styles.headerPrimaryText}>İletişim</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.aboutPanel, !isTablet && styles.aboutPanelMobile, { width: contentWidth }]}>
            <ShineSweep duration={4200} delay={250} />
            <Text style={styles.sectionEyebrow}>HAKKIMIZDA</Text>
            <Text style={[styles.aboutTitle, !isTablet && styles.aboutTitleMobile]}>
              FROG, işletmelerin dijitalde daha net, daha güvenilir ve daha profesyonel görünmesini sağlar.
            </Text>
            <Text style={styles.aboutText}>
              Web sitesi, randevu sistemi, QR menü ve yönetim paneli gibi ihtiyaçları sade, hızlı ve kullanıcı dostu
              arayüzlerle çözüyoruz. Amacımız sadece güzel görünen ekranlar hazırlamak değil; markanızın dijitalde daha
              profesyonel, ulaşılabilir ve güçlü görünmesini sağlamak.
            </Text>
            <Text style={styles.aboutText}>
              Her projede önce ihtiyacı netleştiriyor, ardından marka diline uygun tasarım ve teknik yapıyı oluşturuyoruz.
              Böylece ortaya hem göze iyi gelen hem de işinizi kolaylaştıran sürdürülebilir bir dijital çözüm çıkıyor.
            </Text>

            <View style={[styles.aboutStatsRow, !isTablet && styles.aboutStatsRowMobile]}>
              <View style={styles.aboutStatCard}>
                <Text style={styles.aboutStatValue}>01</Text>
                <Text style={styles.aboutStatLabel}>Net ihtiyaç analizi</Text>
              </View>
              <View style={styles.aboutStatCard}>
                <Text style={styles.aboutStatValue}>03-07</Text>
                <Text style={styles.aboutStatLabel}>Günde taslak netleştirme</Text>
              </View>
              <View style={styles.aboutStatCard}>
                <Text style={styles.aboutStatValue}>100%</Text>
                <Text style={styles.aboutStatLabel}>Mobil uyum önceliği</Text>
              </View>
            </View>

            <View style={styles.aboutHighlights}>
              <FloatingFeatureCard delay={0}>
                <View style={styles.aboutHighlightCard}>
                  <View style={styles.aboutIconBubble}>
                    <FontAwesome name="compass" size={18} color="#133028" />
                  </View>
                <Text style={styles.aboutHighlightValue}>01</Text>
                <Text style={styles.aboutHighlightText}>Markanın hedefini ve kullanıcısını önce netleştiririz.</Text>
                </View>
              </FloatingFeatureCard>
              <FloatingFeatureCard delay={140}>
                <View style={styles.aboutHighlightCard}>
                  <View style={styles.aboutIconBubble}>
                    <FontAwesome name="magic" size={18} color="#133028" />
                  </View>
                <Text style={styles.aboutHighlightValue}>02</Text>
                <Text style={styles.aboutHighlightText}>Sade ama premium hissettiren arayüzler kurarız.</Text>
                </View>
              </FloatingFeatureCard>
              <FloatingFeatureCard delay={280}>
                <View style={styles.aboutHighlightCard}>
                  <View style={styles.aboutIconBubble}>
                    <FontAwesome name="rocket" size={18} color="#133028" />
                  </View>
                <Text style={styles.aboutHighlightValue}>03</Text>
                <Text style={styles.aboutHighlightText}>Yayına hazır, hızlı ve kullanışlı dijital çözümler teslim ederiz.</Text>
                </View>
              </FloatingFeatureCard>
            </View>

            <View style={[styles.aboutApproach, !isTablet && styles.aboutApproachMobile]}>
              <View style={styles.aboutApproachCopy}>
                <Text style={styles.aboutMiniEyebrow}>YAKLAŞIMIMIZ</Text>
                <Text style={styles.aboutApproachTitle}>Önce anlaşılır, sonra etkileyici.</Text>
                <Text style={styles.aboutApproachText}>
                  FROG tarafında tasarım sadece renk ve görsel seçimi değil; ziyaretçinin neyi nerede göreceğini, hangi
                  adımda iletişime geçeceğini ve markayı nasıl hatırlayacağını planlama işidir.
                </Text>
              </View>
              <View style={styles.aboutTimeline}>
                {['Keşif', 'Tasarım', 'Geliştirme', 'Yayın'].map((item, index) => (
                  <View key={item} style={styles.aboutTimelineItem}>
                    <View style={styles.aboutTimelineDot} />
                    <View style={styles.aboutTimelineTextWrap}>
                      <Text style={styles.aboutTimelineIndex}>0{index + 1}</Text>
                      <Text style={styles.aboutTimelineText}>{item}</Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

function AboutPage({
  contentWidth,
  isDesktop,
  isTablet,
  onHome,
  onAbout,
  onServices,
  onReferences,
  onContact,
}: {
  contentWidth: number;
  isDesktop: boolean;
  isTablet: boolean;
  onHome: () => void;
  onAbout: () => void;
  onServices: () => void;
  onReferences: () => void;
  onContact: () => void;
}) {
  const useCompactNav = !isDesktop;
  const aboutScrollY = useRef(new Animated.Value(0)).current;

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <AnimatedGlow size={460} color="rgba(112, 219, 150, 0.2)" top={-100} left={-130} duration={6200} />
        <AnimatedGlow size={360} color="rgba(84, 169, 215, 0.17)" top={420} left={contentWidth * 0.62} duration={5800} />
        <AnimatedGlow size={280} color="rgba(244, 184, 94, 0.16)" top={900} left={contentWidth * 0.12} duration={5400} />

        <Animated.ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          scrollEventThrottle={16}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: aboutScrollY } } }], { useNativeDriver: true })}
        >
          <View style={[styles.topHeader, useCompactNav && styles.topHeaderMobile, { width: contentWidth }]}>
            <Pressable onPress={onHome} style={styles.brandBlock}>
              <View style={[styles.logoWrap, !isTablet && styles.logoWrapMobile]}>
                <FrogLogo size={isTablet ? 44 : 36} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Web tasarım ve yazılım ajansı</Text>
              </View>
            </Pressable>

            <View style={[styles.headerActions, useCompactNav && styles.headerActionsMobile]}>
              <Pressable onPress={onHome} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Ana Sayfa</Text>
              </Pressable>
              <Pressable onPress={onAbout} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hakkımızda</Text>
              </Pressable>
              <Pressable onPress={onServices} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hizmetlerimiz</Text>
              </Pressable>
              <Pressable onPress={onReferences} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={onContact} style={[styles.headerPrimaryButton, useCompactNav && styles.headerButtonMobile]}>
                <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                <Text style={styles.headerPrimaryText}>İletişim</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.aboutPanel, styles.aboutPanelImmersive, !isTablet && styles.aboutPanelMobile, { width: contentWidth }]}>
            <ShineSweep duration={4200} delay={250} />
            <View style={[styles.aboutHeroSplit, !isDesktop && styles.aboutHeroSplitMobile]}>
              <View style={styles.aboutHeroCopy}>
                <View style={styles.kickerRow}>
                  <View style={styles.kickerDot} />
                  <Text style={styles.kicker}>FROG HAKKINDA</Text>
                </View>
                <Text style={[styles.aboutTitle, styles.aboutHeroTitle, !isTablet && styles.aboutTitleMobile]}>
                  Markanızın dijital vitrinini sahne gibi tasarlıyoruz.
                </Text>
                <Text style={styles.aboutText}>
                  FROG; web sitesi, randevu sistemi, QR menü ve yönetim paneli gibi ihtiyaçları sade ama etkileyici
                  ekranlara dönüştüren butik bir web tasarım ve yazılım ekibidir.
                </Text>
                <Text style={styles.aboutText}>
                  Büyük hero hissi, hareketli görsel anlatım, aşağı indikçe açılan değer blokları ve net iletişim
                  kurgusunu FROG için daha temiz, hızlı ve kullanışlı hale getiriyoruz.
                </Text>
                <View style={[styles.aboutHeroActions, !isTablet && styles.aboutHeroActionsMobile]}>
                  <AnimatedPressable onPress={onContact} style={[styles.button, styles.primaryButton]} pulse>
                    <Text style={styles.primaryButtonText}>Proje Konuşalım</Text>
                  </AnimatedPressable>
                  <AnimatedPressable onPress={onReferences} style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Referansları Gör</Text>
                  </AnimatedPressable>
                </View>
              </View>

              <AboutKineticHero scrollY={aboutScrollY} isDesktop={isDesktop} />
            </View>

            <ScrollReveal scrollY={aboutScrollY} start={80}>
              <View style={[styles.aboutStatsRow, !isTablet && styles.aboutStatsRowMobile]}>
                <View style={styles.aboutStatCard}>
                  <Text style={styles.aboutStatValue}>01</Text>
                  <Text style={styles.aboutStatLabel}>Net ihtiyaç analizi</Text>
                </View>
                <View style={styles.aboutStatCard}>
                  <Text style={styles.aboutStatValue}>03-07</Text>
                  <Text style={styles.aboutStatLabel}>Günde taslak netleştirme</Text>
                </View>
                <View style={styles.aboutStatCard}>
                  <Text style={styles.aboutStatValue}>100%</Text>
                  <Text style={styles.aboutStatLabel}>Mobil uyum önceliği</Text>
                </View>
              </View>
            </ScrollReveal>

            <ScrollReveal scrollY={aboutScrollY} start={210}>
              <View style={styles.aboutHighlights}>
                <FloatingFeatureCard delay={0}>
                  <View style={styles.aboutHighlightCard}>
                    <View style={styles.aboutIconBubble}>
                      <FontAwesome name="compass" size={18} color="#133028" />
                    </View>
                    <Text style={styles.aboutHighlightValue}>STRATEJİ</Text>
                    <Text style={styles.aboutHighlightText}>Markanın hedefini ve kullanıcısını önce netleştiririz.</Text>
                  </View>
                </FloatingFeatureCard>
                <FloatingFeatureCard delay={140}>
                  <View style={styles.aboutHighlightCard}>
                    <View style={styles.aboutIconBubble}>
                      <FontAwesome name="magic" size={18} color="#133028" />
                    </View>
                    <Text style={styles.aboutHighlightValue}>TASARIM</Text>
                    <Text style={styles.aboutHighlightText}>Sade ama premium hissettiren arayüzler kurarız.</Text>
                  </View>
                </FloatingFeatureCard>
                <FloatingFeatureCard delay={280}>
                  <View style={styles.aboutHighlightCard}>
                    <View style={styles.aboutIconBubble}>
                      <FontAwesome name="rocket" size={18} color="#133028" />
                    </View>
                    <Text style={styles.aboutHighlightValue}>YAYIN</Text>
                    <Text style={styles.aboutHighlightText}>Yayına hazır, hızlı ve kullanışlı dijital çözümler teslim ederiz.</Text>
                  </View>
                </FloatingFeatureCard>
              </View>
            </ScrollReveal>

            <ScrollReveal scrollY={aboutScrollY} start={520}>
              <View style={[styles.aboutFocusBand, !isDesktop && styles.aboutFocusBandMobile]}>
                <View style={styles.aboutFocusIntro}>
                  <Text style={styles.aboutMiniEyebrow}>NELERE ODAKLANIYORUZ?</Text>
                  <Text style={styles.aboutFocusTitle}>İlk izlenimi güçlü, kullanımı kolay ekranlar.</Text>
                </View>
                <View style={styles.aboutFocusGrid}>
                  {[
                    ['Net mesaj', 'Ziyaretçi ilk bakışta ne sunduğunuzu anlar.'],
                    ['Akıcı deneyim', 'Sayfa geçişleri, kartlar ve hareketler gözü yormadan akar.'],
                    ['Güven veren dil', 'Kurumsal ama sıcak, sade ama profesyonel bir ton kurulur.'],
                  ].map(([title, text], index) => (
                    <View key={title} style={styles.aboutFocusCard}>
                      <Text style={styles.aboutFocusIndex}>0{index + 1}</Text>
                      <Text style={styles.aboutFocusCardTitle}>{title}</Text>
                      <Text style={styles.aboutFocusCardText}>{text}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollReveal>

            <ScrollReveal scrollY={aboutScrollY} start={920}>
              <View style={[styles.aboutTrustBand, !isDesktop && styles.aboutTrustBandMobile]}>
                <View style={styles.aboutTrustCopy}>
                  <Text style={[styles.aboutMiniEyebrow, styles.aboutTrustEyebrow]}>FROG FARKI</Text>
                  <Text style={styles.aboutTrustTitle}>Görsel etkiyi, net iletişimle dengeleriz.</Text>
                  <Text style={styles.aboutTrustBody}>
                    Hakkımızda sayfası sadece kendimizi anlatan bir alan değil; ziyaretçiye bu ekip benim işimi
                    anlayabilir hissini veren karar ekranıdır.
                  </Text>
                </View>
                <View style={styles.aboutTrustGrid}>
                  {['Şeffaf süreç', 'Mobil öncelik', 'Premium ilk izlenim', 'Hızlı iletişim'].map((item, index) => (
                    <View key={item} style={styles.aboutTrustPill}>
                      <Text style={styles.aboutTrustIndex}>0{index + 1}</Text>
                      <Text style={styles.aboutTrustText}>{item}</Text>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollReveal>

            <ScrollReveal scrollY={aboutScrollY} start={1140}>
              <View style={[styles.aboutApproach, !isTablet && styles.aboutApproachMobile]}>
                <View style={styles.aboutApproachCopy}>
                  <Text style={styles.aboutMiniEyebrow}>YAKLAŞIMIMIZ</Text>
                  <Text style={styles.aboutApproachTitle}>Önce anlaşılır, sonra etkileyici.</Text>
                  <Text style={styles.aboutApproachText}>
                    Tasarım sadece renk ve görsel seçimi değil; ziyaretçinin neyi nerede göreceğini, hangi adımda
                    iletişime geçeceğini ve markayı nasıl hatırlayacağını planlama işidir.
                  </Text>
                </View>
                <View style={styles.aboutTimeline}>
                  {['Keşif', 'Tasarım', 'Geliştirme', 'Yayın'].map((item, index) => (
                    <View key={item} style={styles.aboutTimelineItem}>
                      <View style={styles.aboutTimelineDot} />
                      <View style={styles.aboutTimelineTextWrap}>
                        <Text style={styles.aboutTimelineIndex}>0{index + 1}</Text>
                        <Text style={styles.aboutTimelineText}>{item}</Text>
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </ScrollReveal>
          </View>
        </Animated.ScrollView>
      </View>
    </SafeAreaView>
  );
}

export default function App() {
  const { width } = useWindowDimensions();
  const [currentPage, setCurrentPage] = useState<'home' | 'services' | 'contact' | 'about'>('home');
  const [pendingReferencesScroll, setPendingReferencesScroll] = useState(false);
  const scrollViewRef = useRef<ScrollView>(null);
  const referencesSectionY = useRef(0);
  const isDesktop = width >= 1040;
  const isTablet = width >= 720;
  const useCompactNav = !isDesktop;
  const pageGutter = width < 480 ? 20 : 28;
  const contentWidth = Math.max(Math.min(width - pageGutter, 1180), 0);
  const titleSize = width >= 1100 ? 78 : width >= 780 ? 58 : 42;
  const lineHeight = width >= 1100 ? 82 : width >= 780 ? 62 : 46;
  const openWhatsApp = () => Linking.openURL('https://wa.me/905319843906');
  const scrollToReferences = () => {
    scrollViewRef.current?.scrollTo({
      y: Math.max(referencesSectionY.current - 24, 0),
      animated: true,
    });
  };
  const goToReferences = () => {
    if (currentPage === 'home') {
      scrollToReferences();
      return;
    }

    setPendingReferencesScroll(true);
    setCurrentPage('home');
  };

  useEffect(() => {
    if (currentPage !== 'home' || !pendingReferencesScroll) {
      return;
    }

    const id = setTimeout(() => {
      scrollToReferences();
      setPendingReferencesScroll(false);
    }, 120);

    return () => clearTimeout(id);
  }, [currentPage, pendingReferencesScroll]);

  const heroLines = useMemo(
    () => ['Profesyonel web', 'tasarım ve yazılım', 'ajansı'],
    []
  );

  if (currentPage === 'services') {
    return (
      <ServicesPage
        contentWidth={contentWidth}
        isDesktop={isDesktop}
        isTablet={isTablet}
        onHome={() => setCurrentPage('home')}
        onAbout={() => setCurrentPage('about')}
        onServices={() => setCurrentPage('services')}
        onReferences={goToReferences}
        onContactPage={() => setCurrentPage('contact')}
        onContact={openWhatsApp}
      />
    );
  }

  if (currentPage === 'contact') {
    return (
      <ContactPage
        contentWidth={contentWidth}
        isDesktop={isDesktop}
        isTablet={isTablet}
        onHome={() => setCurrentPage('home')}
        onAbout={() => setCurrentPage('about')}
        onServices={() => setCurrentPage('services')}
        onReferences={goToReferences}
        onWhatsApp={openWhatsApp}
      />
    );
  }

  if (currentPage === 'about') {
    return (
      <AboutPage
        contentWidth={contentWidth}
        isDesktop={isDesktop}
        isTablet={isTablet}
        onHome={() => setCurrentPage('home')}
        onAbout={() => setCurrentPage('about')}
        onServices={() => setCurrentPage('services')}
        onReferences={goToReferences}
        onContact={() => setCurrentPage('contact')}
      />
    );
  }

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar style="dark" />
      <View style={styles.app}>
        <AnimatedGlow size={460} color="rgba(44, 171, 103, 0.14)" top={-120} left={-130} duration={6200} />
        <AnimatedGlow size={420} color="rgba(18, 24, 22, 0.08)" top={360} left={width * 0.62} duration={5800} />
        <AnimatedGlow size={320} color="rgba(244, 184, 94, 0.13)" top={980} left={width * 0.08} duration={5400} />

        <ScrollView ref={scrollViewRef} contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          <View style={[styles.topHeader, useCompactNav && styles.topHeaderMobile, { width: contentWidth }]}>
            <Pressable onPress={() => setCurrentPage('home')} style={styles.brandBlock}>
              <View style={[styles.logoWrap, !isTablet && styles.logoWrapMobile]}>
                <FrogLogo size={isTablet ? 44 : 36} />
              </View>
              <View>
                <Text style={styles.brandTitle}>FROG</Text>
                <Text style={styles.brandSub}>Web tasarım ve yazılım ajansı</Text>
              </View>
            </Pressable>

            <View style={[styles.headerActions, useCompactNav && styles.headerActionsMobile]}>
              <Pressable onPress={() => setCurrentPage('home')} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Ana Sayfa</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentPage('about')} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hakkımızda</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentPage('services')} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Hizmetlerimiz</Text>
              </Pressable>
              <Pressable onPress={goToReferences} style={[styles.headerGhostButton, useCompactNav && styles.headerButtonMobile]}>
                <Text style={styles.headerGhostText}>Referanslar</Text>
              </Pressable>
              <Pressable onPress={() => setCurrentPage('contact')} style={[styles.headerPrimaryButton, useCompactNav && styles.headerButtonMobile]}>
                <FontAwesome name="whatsapp" size={18} color="#FFFFFF" />
                <Text style={styles.headerPrimaryText}>İletişim</Text>
              </Pressable>
            </View>
          </View>

          <View style={[styles.hero, { width: contentWidth, flexDirection: isDesktop ? 'row' : 'column' }]}>
            <View style={[styles.heroCopy, isDesktop && { paddingRight: 28 }]}>
              <View style={styles.kickerRow}>
                <View style={styles.kickerDot} />
                <Text style={styles.kicker}>WEB TASARIM • YAZILIM • DİJİTAL DENEYİM</Text>
              </View>

              {heroLines.map((line, index) => (
                <AnimatedCard key={line} delay={index * 130}>
                  <Text style={[styles.title, { fontSize: titleSize, lineHeight }, !isTablet && styles.titleMobile]}>{line}</Text>
                </AnimatedCard>
              ))}

              <AnimatedCard delay={420}>
                <Text style={[styles.description, !isTablet && styles.descriptionMobile]}>
                  Kurumsal web siteleri, dijital ürünler ve yönetim panelleri için özgün, hızlı ve premium ekranlar
                  tasarlıyoruz.
                </Text>
              </AnimatedCard>

              <AnimatedCard delay={560}>
                <View style={[styles.heroActions, { flexDirection: isTablet ? 'row' : 'column' }]}>
                  <AnimatedPressable onPress={openWhatsApp} style={[styles.button, styles.primaryButton]} pulse>
                    <Text style={styles.primaryButtonText}>Teklif Al</Text>
                  </AnimatedPressable>
                  <AnimatedPressable onPress={scrollToReferences} style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Referansları Aç</Text>
                  </AnimatedPressable>
                  <AnimatedPressable onPress={() => setCurrentPage('services')} style={[styles.button, styles.secondaryButton]}>
                    <Text style={styles.secondaryButtonText}>Hizmetlerimizi Gör</Text>
                  </AnimatedPressable>
                </View>
              </AnimatedCard>

              <View style={[styles.metricsRow, !isTablet && styles.metricsRowMobile]}>
                {metrics.map((item, index) => (
                  <AnimatedCard key={item.label} delay={680 + index * 80}>
                    <View style={styles.metricCard}>
                      <Text style={styles.metricValue}>{item.value}</Text>
                      <Text style={styles.metricLabel}>{item.label}</Text>
                    </View>
                  </AnimatedCard>
                ))}
              </View>
            </View>

            <AnimatedCard delay={260}>
              <HeroArtwork isDesktop={isDesktop} />
            </AnimatedCard>
          </View>

          <View style={[styles.section, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>Hizmetler</Text>
            <Text style={[styles.sectionTitleLarge, !isTablet && styles.sectionTitleLargeMobile]}>
              360 derece dijital ihtiyaçları tek bir vitrinde topluyoruz
            </Text>
            <Text style={styles.sectionText}>
              Her hizmet alanı net bir başlık, güven veren açıklama ve premium kart diliyle ziyaretçiye daha kurumsal
              bir ilk izlenim verir.
            </Text>
            <ServicesGrid isDesktop={isDesktop} />
          </View>

          <View style={[styles.section, { width: contentWidth }]}>
            <Text style={styles.sectionEyebrow}>Akış</Text>
            <Text style={[styles.sectionTitleLarge, !isTablet && styles.sectionTitleLargeMobile]}>
              Proje deneyimini sahne gibi kuruyoruz
            </Text>
            <View style={[styles.processGrid, !isDesktop && styles.processGridMobile]}>
              {processSteps.map((step, index) => (
                <AnimatedCard key={step.title} delay={index * 120}>
                  <View style={[styles.processCard, !isDesktop && styles.cardFullWidth]}>
                    <ShineSweep duration={3900} delay={index * 240} />
                    <View style={styles.processTopRow}>
                      <Text style={styles.processIndex}>0{index + 1}</Text>
                      <View style={styles.processIconBubble}>
                        <FontAwesome name={step.icon as React.ComponentProps<typeof FontAwesome>['name']} size={17} color="#133028" />
                      </View>
                    </View>
                    <Text style={styles.processText}>{step.title}</Text>
                    <Text style={styles.processBody}>{step.body}</Text>
                    <View style={styles.processOutput}>
                      <Text style={styles.processOutputLabel}>Çıktı</Text>
                      <Text style={styles.processOutputText}>{step.output}</Text>
                    </View>
                  </View>
                </AnimatedCard>
              ))}
            </View>
            <View style={styles.processSummary}>
              <Text style={styles.processSummaryTitle}>Süreç genelde 3-7 gün içinde netleşir.</Text>
              <Text style={styles.processSummaryText}>
                Projenin kapsamına göre tasarım, geliştirme ve yayın adımlarını birlikte planlıyoruz.
              </Text>
            </View>
          </View>

          <View
            style={[styles.section, { width: contentWidth }]}
            onLayout={(event) => {
              referencesSectionY.current = event.nativeEvent.layout.y;
            }}
          >
            <ReferencesShowcase />
          </View>

          <AnimatedCard delay={180}>
            <View style={[styles.cta, { width: contentWidth }]}>
              <View style={styles.ctaGlow} />
              <ShineSweep duration={4200} delay={500} />
              <Text style={styles.ctaEyebrow}>Hazırsan sonraki aşama</Text>
              <Text style={styles.ctaTitle}>Bu dili daha da ileri taşıyıp her bölümü markana göre özel hale getirebiliriz.</Text>
              <Text style={styles.ctaText}>
                Renkler, metinler, referanslar ve hareket dili tamamen senin istediğin tarafa göre sertleştirilebilir.
              </Text>
              <AnimatedPressable onPress={openWhatsApp} style={[styles.button, styles.ctaButton, styles.primaryButton]} pulse>
                <Text style={styles.primaryButtonText}>WhatsApp&apos;tan Devam Et</Text>
              </AnimatedPressable>
            </View>
          </AnimatedCard>
        </ScrollView>

        <FloatingWhatsAppButton onPress={openWhatsApp} />
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
    backgroundColor: '#F8F8F5',
  },
  app: {
    flex: 1,
    backgroundColor: '#F8F8F5',
  },
  scrollContent: {
    alignItems: 'center',
    paddingHorizontal: 14,
    paddingBottom: 90,
    backgroundColor: '#F8F8F5',
  },
  glow: {
    position: 'absolute',
  },
  shineSweep: {
    position: 'absolute',
    top: -80,
    bottom: -80,
    width: 82,
    backgroundColor: 'rgba(255,255,255,0.62)',
    zIndex: 5,
  },
  topHeader: {
    marginTop: 16,
    marginBottom: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.94)',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 18,
    shadowColor: '#111816',
    shadowOpacity: 0.08,
    shadowRadius: 20,
    elevation: 5,
  },
  topHeaderMobile: {
    alignItems: 'stretch',
    flexDirection: 'column',
    paddingHorizontal: 14,
    borderRadius: 18,
  },
  brandBlock: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: 14,
  },
  logoWrap: {
    width: 138,
    height: 58,
    borderRadius: 24,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.1)',
  },
  logoWrapMobile: {
    width: 118,
    height: 52,
  },
  brandTitle: {
    color: '#111816',
    fontSize: 24,
    fontWeight: '800',
    letterSpacing: 1,
    fontFamily,
  },
  brandSub: {
    color: '#68716D',
    fontSize: 13,
    marginTop: 3,
    fontFamily,
  },
  headerActions: {
    flexDirection: 'row',
    flexShrink: 1,
    flexWrap: 'wrap',
    gap: 12,
    alignItems: 'center',
    justifyContent: 'flex-end',
    maxWidth: '100%',
  },
  headerActionsMobile: {
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    gap: 8,
  },
  headerButtonMobile: {
    flexGrow: 1,
    flexBasis: 132,
    paddingHorizontal: 14,
  },
  headerGhostButton: {
    minHeight: 48,
    borderRadius: 14,
    paddingHorizontal: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'transparent',
    backgroundColor: 'transparent',
  },
  headerGhostText: {
    color: '#1D2522',
    fontSize: 14,
    fontWeight: '700',
    fontFamily,
  },
  headerPrimaryButton: {
    minHeight: 48,
    borderRadius: 999,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    backgroundColor: '#111816',
  },
  headerPrimaryText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily,
  },
  hero: {
    alignItems: 'stretch',
    justifyContent: 'space-between',
    gap: 36,
    marginTop: 22,
    marginBottom: 58,
  },
  heroCopy: {
    flex: 1,
    justifyContent: 'center',
  },
  kickerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginBottom: 20,
  },
  kickerDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
    backgroundColor: '#1DB66A',
    shadowColor: '#1DB66A',
    shadowOpacity: 0.7,
    shadowRadius: 14,
  },
  kicker: {
    color: '#237A55',
    fontSize: 13,
    letterSpacing: 2.6,
    fontWeight: '800',
    fontFamily,
  },
  title: {
    color: '#111816',
    fontWeight: '900',
    letterSpacing: 0,
    fontFamily,
  },
  titleMobile: {
    letterSpacing: 0,
  },
  description: {
    marginTop: 20,
    maxWidth: 620,
    color: '#555F5A',
    fontSize: 17,
    lineHeight: 29,
    fontFamily,
  },
  descriptionMobile: {
    fontSize: 15,
    lineHeight: 25,
  },
  heroActions: {
    gap: 14,
    marginTop: 28,
    alignItems: 'flex-start',
  },
  button: {
    minHeight: 58,
    borderRadius: 14,
    paddingHorizontal: 26,
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryButton: {
    backgroundColor: '#111816',
    shadowColor: '#111816',
    shadowOpacity: 0.22,
    shadowRadius: 22,
    elevation: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontWeight: '900',
    fontSize: 15,
    fontFamily,
  },
  secondaryButton: {
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.14)',
    backgroundColor: '#FFFFFF',
  },
  secondaryButtonText: {
    color: '#111816',
    fontWeight: '800',
    fontSize: 15,
    fontFamily,
  },
  metricsRow: {
    marginTop: 28,
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  metricsRowMobile: {
    flexDirection: 'column',
  },
  metricCard: {
    minWidth: 170,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
  },
  metricValue: {
    color: '#111816',
    fontSize: 26,
    fontWeight: '900',
    fontFamily,
  },
  metricLabel: {
    color: '#637D71',
    fontSize: 13,
    marginTop: 6,
    fontFamily,
  },
  heroArtwork: {
    width: 520,
    minHeight: 560,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  heroArtworkMobile: {
    width: '100%',
    minHeight: 360,
    overflow: 'hidden',
  },
  ring: {
    position: 'absolute',
    width: 430,
    height: 430,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    backgroundColor: 'rgba(29,182,106,0.06)',
  },
  ringMobile: {
    width: 310,
    height: 310,
  },
  orbitRing: {
    position: 'absolute',
    width: 480,
    height: 480,
    borderRadius: 999,
  },
  orbitRingMobile: {
    width: 340,
    height: 340,
  },
  orbitDot: {
    position: 'absolute',
    borderRadius: 999,
    shadowOpacity: 0.28,
    shadowRadius: 16,
  },
  orbitDotPrimary: {
    top: 8,
    left: 230,
    width: 18,
    height: 18,
    backgroundColor: '#39C986',
    shadowColor: '#39C986',
  },
  orbitDotSecondary: {
    right: 32,
    bottom: 96,
    width: 12,
    height: 12,
    backgroundColor: '#4EA7D8',
    shadowColor: '#4EA7D8',
  },
  heroCore: {
    width: '92%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    borderRadius: 22,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.1)',
    shadowColor: '#111816',
    shadowOpacity: 0.18,
    shadowRadius: 34,
    elevation: 12,
    overflow: 'hidden',
  },
  heroCoreMobile: {
    width: '100%',
  },
  deviceTopBar: {
    minHeight: 54,
    paddingHorizontal: 18,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    backgroundColor: '#111816',
  },
  deviceDots: {
    flexDirection: 'row',
    gap: 7,
  },
  deviceDot: {
    width: 10,
    height: 10,
    borderRadius: 999,
  },
  deviceAddress: {
    flex: 1,
    minHeight: 30,
    borderRadius: 999,
    paddingHorizontal: 14,
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  deviceAddressText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    fontFamily,
  },
  deviceContent: {
    paddingHorizontal: 24,
    paddingVertical: 28,
  },
  deviceContentMobile: {
    paddingHorizontal: 18,
    paddingVertical: 22,
  },
  deviceLogoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    gap: 14,
  },
  deviceStatusPill: {
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 7,
    backgroundColor: '#EAF8EF',
    borderWidth: 1,
    borderColor: 'rgba(57,201,134,0.3)',
  },
  deviceStatusText: {
    color: '#238F61',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily,
  },
  deviceCards: {
    marginTop: 22,
    gap: 12,
  },
  deviceCardsMobile: {
    marginTop: 16,
    gap: 8,
  },
  deviceMiniCard: {
    borderRadius: 18,
    paddingHorizontal: 15,
    paddingVertical: 14,
    backgroundColor: 'rgba(255,255,255,0.68)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.1)',
  },
  deviceMiniCardMobile: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 14,
  },
  deviceMiniAccent: {
    width: 42,
    height: 4,
    borderRadius: 999,
    marginBottom: 10,
  },
  deviceMiniTitle: {
    color: '#111816',
    fontSize: 14,
    fontWeight: '900',
    fontFamily,
  },
  deviceMiniTitleMobile: {
    fontSize: 12,
    lineHeight: 16,
  },
  heroBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: '#F1F4F2',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
  },
  heroBadgeText: {
    color: '#111816',
    fontSize: 12,
    fontWeight: '800',
    letterSpacing: 1.2,
    fontFamily,
  },
  logoHalo: {
    marginTop: 22,
    marginBottom: 18,
    width: 190,
    height: 96,
    borderRadius: 22,
    backgroundColor: '#F4F7F4',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  heroCardTitle: {
    color: '#111816',
    fontSize: 32,
    lineHeight: 38,
    fontWeight: '900',
    fontFamily,
  },
  heroCardTitleMobile: {
    fontSize: 24,
    lineHeight: 30,
  },
  heroCardText: {
    color: '#5C6661',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 14,
    fontFamily,
  },
  liveWave: {
    marginTop: 18,
    flexDirection: 'row',
    alignItems: 'flex-end',
    gap: 7,
  },
  liveWaveBar: {
    width: 54,
    height: 7,
    borderRadius: 999,
    backgroundColor: 'rgba(57,201,134,0.24)',
  },
  liveWaveBarShort: {
    width: 30,
    backgroundColor: 'rgba(78,167,216,0.22)',
  },
  liveWaveBarTall: {
    width: 74,
    backgroundColor: 'rgba(244,184,94,0.28)',
  },
  heroMiniStats: {
    marginTop: 22,
    gap: 12,
  },
  heroMiniStat: {
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56,99,86,0.14)',
  },
  heroMiniValue: {
    color: '#39C986',
    fontSize: 15,
    fontWeight: '800',
    fontFamily,
  },
  heroMiniLabel: {
    color: '#6D8379',
    marginTop: 4,
    fontSize: 13,
    fontFamily,
  },
  floatingPanel: {
    position: 'absolute',
    maxWidth: 210,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    backgroundColor: '#FFFFFF',
  },
  floatingPanelTop: {
    top: 84,
    right: 0,
  },
  floatingPanelBottom: {
    left: 0,
    bottom: 74,
  },
  floatingPanelEyebrow: {
    color: '#111816',
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: '900',
    fontFamily,
  },
  floatingPanelText: {
    color: '#5C6661',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 6,
    fontFamily,
  },
  section: {
    marginTop: 28,
  },
  sectionEyebrow: {
    color: '#2F9D6B',
    fontSize: 13,
    letterSpacing: 2.1,
    fontWeight: '800',
    marginBottom: 12,
    fontFamily,
  },
  sectionTitleLarge: {
    color: '#111816',
    fontSize: 42,
    lineHeight: 48,
    fontWeight: '900',
    maxWidth: 760,
    fontFamily,
  },
  sectionTitleLargeMobile: {
    fontSize: 30,
    lineHeight: 36,
  },
  sectionText: {
    color: '#5C6661',
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 720,
    marginTop: 14,
    fontFamily,
  },
  servicesPageHero: {
    marginTop: 24,
    paddingHorizontal: 28,
    paddingVertical: 34,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
  },
  servicesPageHeroMobile: {
    paddingHorizontal: 20,
    paddingVertical: 26,
    borderRadius: 18,
  },
  servicesPageTitle: {
    color: '#111816',
    fontSize: 48,
    lineHeight: 56,
    fontWeight: '900',
    maxWidth: 900,
    fontFamily,
  },
  servicesPageTitleMobile: {
    fontSize: 31,
    lineHeight: 38,
  },
  servicesPageText: {
    color: '#5C6661',
    fontSize: 17,
    lineHeight: 29,
    maxWidth: 820,
    marginTop: 16,
    fontFamily,
  },
  servicesPageGrid: {
    marginTop: 24,
    gap: 18,
    flexWrap: 'wrap',
  },
  servicesPageCard: {
    width: 280,
    height: 315,
    padding: 24,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  servicesPageCardMobile: {
    width: '100%',
    height: 'auto',
    minHeight: 285,
  },
  servicesPageCardContent: {
    flex: 1,
  },
  servicesPageCardTitle: {
    color: '#111816',
    fontSize: 25,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 12,
    fontFamily,
  },
  servicesPageCardText: {
    color: '#5C6661',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 12,
    fontFamily,
  },
  servicesPageCardNote: {
    color: '#2F9D6B',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 18,
    fontWeight: '800',
    fontFamily,
  },
  infoButton: {
    minHeight: 46,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
    paddingHorizontal: 22,
    backgroundColor: '#6DDD8C',
  },
  infoButtonText: {
    color: '#133028',
    fontSize: 14,
    fontWeight: '900',
    fontFamily,
  },
  servicesInfoCta: {
    marginTop: 18,
    paddingHorizontal: 24,
    paddingVertical: 22,
    borderRadius: 28,
    backgroundColor: 'rgba(109,221,140,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(109,221,140,0.24)',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 16,
    flexWrap: 'wrap',
  },
  servicesInfoCtaMobile: {
    alignItems: 'stretch',
    borderRadius: 24,
  },
  servicesInfoCtaText: {
    color: '#15352D',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '900',
    fontFamily,
  },
  servicesPageProcess: {
    marginTop: 34,
  },
  contactPanel: {
    marginTop: 42,
    paddingHorizontal: 34,
    paddingVertical: 42,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.14)',
  },
  contactPanelMobile: {
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderRadius: 28,
  },
  contactTitle: {
    color: '#15352D',
    fontSize: 46,
    lineHeight: 54,
    fontWeight: '900',
    maxWidth: 900,
    fontFamily,
  },
  contactTitleMobile: {
    fontSize: 31,
    lineHeight: 38,
  },
  contactText: {
    color: '#60786D',
    fontSize: 17,
    lineHeight: 29,
    maxWidth: 760,
    marginTop: 16,
    fontFamily,
  },
  whatsAppPanelButton: {
    alignSelf: 'flex-start',
    minHeight: 58,
    borderRadius: 999,
    marginTop: 28,
    paddingHorizontal: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#6DDD8C',
  },
  whatsAppPanelText: {
    color: '#133028',
    fontSize: 15,
    fontWeight: '900',
    fontFamily,
  },
  aboutPanel: {
    marginTop: 42,
    paddingHorizontal: 34,
    paddingVertical: 42,
    borderRadius: 38,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.14)',
    overflow: 'hidden',
  },
  aboutPanelMobile: {
    paddingHorizontal: 22,
    paddingVertical: 30,
    borderRadius: 28,
  },
  aboutPanelImmersive: {
    paddingHorizontal: 28,
    paddingVertical: 34,
    backgroundColor: 'rgba(255,255,255,0.66)',
  },
  aboutHeroSplit: {
    flexDirection: 'row',
    gap: 30,
    alignItems: 'center',
    minHeight: 520,
  },
  aboutHeroSplitMobile: {
    flexDirection: 'column',
    minHeight: 0,
    gap: 24,
  },
  aboutHeroCopy: {
    flex: 1,
    minWidth: 280,
  },
  aboutHeroTitle: {
    marginTop: 14,
  },
  aboutHeroActions: {
    flexDirection: 'row',
    gap: 12,
    flexWrap: 'wrap',
    marginTop: 26,
  },
  aboutHeroActionsMobile: {
    flexDirection: 'column',
  },
  aboutHeroStage: {
    flex: 1,
    minWidth: 360,
    height: 430,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutHeroStageMobile: {
    minWidth: 0,
    width: '100%',
    height: 300,
    overflow: 'hidden',
  },
  aboutHeroVisualRow: {
    height: 330,
    marginBottom: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutHeroVisualRowMobile: {
    height: 280,
    marginBottom: 12,
  },
  aboutHeroVisual: {
    width: '100%',
    maxWidth: 520,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  aboutOrbit: {
    position: 'absolute',
    width: 328,
    height: 328,
    borderRadius: 164,
    borderWidth: 1,
    borderColor: 'rgba(57,201,134,0.22)',
    backgroundColor: 'rgba(78,167,216,0.05)',
  },
  aboutOrbitMobile: {
    width: 260,
    height: 260,
    borderRadius: 130,
  },
  aboutOrbitDot: {
    position: 'absolute',
    width: 16,
    height: 16,
    borderRadius: 999,
    shadowColor: '#39C986',
    shadowOpacity: 0.28,
    shadowRadius: 16,
    elevation: 4,
  },
  aboutOrbitDotOne: {
    top: 22,
    left: 78,
    backgroundColor: '#39C986',
  },
  aboutOrbitDotTwo: {
    right: 28,
    top: 122,
    backgroundColor: '#4EA7D8',
  },
  aboutOrbitDotThree: {
    bottom: 35,
    left: 118,
    backgroundColor: '#F4B85E',
  },
  aboutDevice: {
    width: 300,
    minHeight: 210,
    padding: 18,
    borderRadius: 28,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
    shadowColor: '#111816',
    shadowOpacity: 0.12,
    shadowRadius: 28,
    elevation: 6,
  },
  aboutDeviceTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  aboutDeviceLogo: {
    width: 42,
    height: 42,
    borderRadius: 14,
    backgroundColor: '#6DDD8C',
  },
  aboutDeviceNav: {
    flex: 1,
    gap: 8,
  },
  aboutDeviceNavLine: {
    height: 9,
    borderRadius: 999,
    backgroundColor: 'rgba(21,53,45,0.13)',
  },
  aboutDeviceNavLineShort: {
    width: '64%',
  },
  aboutDeviceHeroLine: {
    width: '84%',
    height: 18,
    borderRadius: 999,
    marginTop: 24,
    backgroundColor: 'rgba(57,201,134,0.22)',
  },
  aboutDeviceHeroLineSmall: {
    width: '58%',
    height: 10,
    borderRadius: 999,
    marginTop: 12,
    backgroundColor: 'rgba(78,167,216,0.18)',
  },
  aboutDeviceGrid: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 10,
  },
  aboutDeviceTile: {
    flex: 1,
    height: 54,
    borderRadius: 16,
  },
  aboutDeviceTileGreen: {
    backgroundColor: 'rgba(109,221,140,0.45)',
  },
  aboutDeviceTileBlue: {
    backgroundColor: 'rgba(78,167,216,0.32)',
  },
  aboutDeviceTileGold: {
    backgroundColor: 'rgba(244,184,94,0.35)',
  },
  aboutFloatingBadge: {
    position: 'absolute',
    minHeight: 44,
    borderRadius: 999,
    paddingHorizontal: 14,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
    shadowColor: '#111816',
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 4,
  },
  aboutFloatingBadgeOne: {
    top: 54,
    left: 32,
  },
  aboutFloatingBadgeTwo: {
    right: 28,
    bottom: 54,
  },
  aboutFloatingBadgeText: {
    color: '#15352D',
    fontSize: 12,
    fontWeight: '900',
    fontFamily,
  },
  aboutLaptop: {
    width: 340,
    minHeight: 230,
    padding: 18,
    borderRadius: 30,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
    shadowColor: '#111816',
    shadowOpacity: 0.14,
    shadowRadius: 32,
    elevation: 7,
  },
  aboutLaptopMobile: {
    width: 260,
    minHeight: 196,
    padding: 14,
    borderRadius: 24,
  },
  aboutLaptopBar: {
    height: 28,
    borderRadius: 16,
    backgroundColor: 'rgba(21,53,45,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    gap: 7,
  },
  aboutLaptopDot: {
    width: 8,
    height: 8,
    borderRadius: 999,
    backgroundColor: '#6DDD8C',
  },
  aboutLaptopHero: {
    marginTop: 20,
    padding: 18,
    borderRadius: 22,
    backgroundColor: 'rgba(57,201,134,0.12)',
  },
  aboutLaptopTitleLineMobile: {
    height: 16,
  },
  aboutLaptopTitleLine: {
    width: '78%',
    height: 20,
    borderRadius: 999,
    backgroundColor: '#15352D',
  },
  aboutLaptopSmallLine: {
    width: '55%',
    height: 10,
    borderRadius: 999,
    marginTop: 12,
    backgroundColor: 'rgba(21,53,45,0.18)',
  },
  aboutLaptopGrid: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 10,
  },
  aboutLaptopTile: {
    flex: 1,
    height: 58,
    borderRadius: 17,
  },
  aboutLaptopTileGreen: {
    backgroundColor: 'rgba(109,221,140,0.48)',
  },
  aboutLaptopTileBlue: {
    backgroundColor: 'rgba(78,167,216,0.34)',
  },
  aboutLaptopTileGold: {
    backgroundColor: 'rgba(244,184,94,0.36)',
  },
  aboutPhoneMock: {
    position: 'absolute',
    right: 18,
    bottom: 34,
    width: 104,
    height: 184,
    padding: 12,
    borderRadius: 28,
    backgroundColor: '#15352D',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.45)',
    shadowColor: '#111816',
    shadowOpacity: 0.18,
    shadowRadius: 22,
    elevation: 6,
  },
  aboutPhoneMockMobile: {
    right: 6,
    bottom: 28,
    width: 82,
    height: 148,
    padding: 10,
    borderRadius: 22,
  },
  aboutPhoneNotch: {
    alignSelf: 'center',
    width: 34,
    height: 5,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.38)',
  },
  aboutPhoneLine: {
    height: 9,
    borderRadius: 999,
    marginTop: 18,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },
  aboutPhoneLineShort: {
    width: '62%',
  },
  aboutPhoneCard: {
    height: 70,
    borderRadius: 18,
    marginTop: 14,
    backgroundColor: '#6DDD8C',
  },
  aboutScrollBadge: {
    position: 'absolute',
    left: 20,
    bottom: 36,
    minHeight: 44,
    borderRadius: 999,
    paddingHorizontal: 15,
    backgroundColor: 'rgba(255,255,255,0.88)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  aboutScrollBadgeMobile: {
    left: 8,
    bottom: 26,
  },
  aboutScrollBadgeText: {
    color: '#15352D',
    fontSize: 12,
    fontWeight: '900',
    fontFamily,
  },
  aboutTitle: {
    color: '#15352D',
    fontSize: 46,
    lineHeight: 54,
    fontWeight: '900',
    maxWidth: 950,
    fontFamily,
  },
  aboutTitleMobile: {
    fontSize: 31,
    lineHeight: 38,
  },
  aboutText: {
    color: '#60786D',
    fontSize: 17,
    lineHeight: 30,
    maxWidth: 900,
    marginTop: 18,
    fontFamily,
  },
  aboutStatsRow: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 14,
    flexWrap: 'wrap',
  },
  aboutStatsRowMobile: {
    flexDirection: 'column',
  },
  aboutStatCard: {
    minWidth: 190,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
  },
  aboutStatValue: {
    color: '#2F9D6B',
    fontSize: 27,
    fontWeight: '900',
    fontFamily,
  },
  aboutStatLabel: {
    color: '#60786D',
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    fontWeight: '800',
    fontFamily,
  },
  aboutHighlights: {
    marginTop: 30,
    flexDirection: 'row',
    gap: 16,
    flexWrap: 'wrap',
  },
  aboutHighlightCard: {
    width: 260,
    minHeight: 130,
    padding: 20,
    borderRadius: 26,
    backgroundColor: 'rgba(109,221,140,0.14)',
    borderWidth: 1,
    borderColor: 'rgba(109,221,140,0.22)',
    overflow: 'hidden',
  },
  aboutIconBubble: {
    width: 40,
    height: 40,
    borderRadius: 999,
    backgroundColor: '#6DDD8C',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },
  aboutHighlightValue: {
    color: '#4EA7D8',
    fontSize: 15,
    fontWeight: '900',
    letterSpacing: 2,
    fontFamily,
  },
  aboutHighlightText: {
    color: '#15352D',
    fontSize: 18,
    lineHeight: 26,
    fontWeight: '900',
    marginTop: 14,
    fontFamily,
  },
  aboutFocusBand: {
    marginTop: 34,
    padding: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.76)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'stretch',
  },
  aboutFocusBandMobile: {
    flexDirection: 'column',
    padding: 20,
  },
  aboutFocusIntro: {
    flex: 0.85,
    minWidth: 240,
  },
  aboutFocusTitle: {
    color: '#15352D',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  aboutFocusGrid: {
    flex: 1.15,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  aboutFocusCard: {
    flexGrow: 1,
    flexBasis: 180,
    minHeight: 132,
    padding: 16,
    borderRadius: 22,
    backgroundColor: 'rgba(78,167,216,0.09)',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.16)',
  },
  aboutFocusIndex: {
    color: '#2F9D6B',
    fontSize: 12,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily,
  },
  aboutFocusCardTitle: {
    color: '#15352D',
    fontSize: 17,
    lineHeight: 22,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  aboutFocusCardText: {
    color: '#60786D',
    fontSize: 14,
    lineHeight: 22,
    marginTop: 8,
    fontFamily,
  },
  aboutTrustBand: {
    marginTop: 34,
    padding: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(21,53,45,0.94)',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'stretch',
    overflow: 'hidden',
  },
  aboutTrustBandMobile: {
    flexDirection: 'column',
    padding: 20,
  },
  aboutTrustCopy: {
    flex: 1.15,
  },
  aboutTrustEyebrow: {
    color: '#6DDD8C',
  },
  aboutTrustTitle: {
    color: '#FFFFFF',
    fontSize: 30,
    lineHeight: 36,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  aboutTrustBody: {
    color: 'rgba(255,255,255,0.72)',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 12,
    fontFamily,
  },
  aboutTrustGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  aboutTrustPill: {
    width: 170,
    minHeight: 74,
    padding: 14,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.14)',
  },
  aboutTrustIndex: {
    color: '#6DDD8C',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily,
  },
  aboutTrustText: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 20,
    marginTop: 8,
    fontWeight: '900',
    fontFamily,
  },
  aboutApproach: {
    marginTop: 32,
    padding: 24,
    borderRadius: 30,
    backgroundColor: 'rgba(78,167,216,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.18)',
    flexDirection: 'row',
    gap: 24,
    alignItems: 'stretch',
  },
  aboutApproachMobile: {
    flexDirection: 'column',
    padding: 20,
  },
  aboutApproachCopy: {
    flex: 1.3,
  },
  aboutMiniEyebrow: {
    color: '#287FAE',
    fontSize: 12,
    letterSpacing: 1.8,
    fontWeight: '900',
    fontFamily,
  },
  aboutApproachTitle: {
    color: '#15352D',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  aboutApproachText: {
    color: '#60786D',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 12,
    fontFamily,
  },
  aboutTimeline: {
    flex: 1,
    gap: 12,
  },
  aboutTimelineItem: {
    flexDirection: 'row',
    gap: 12,
    alignItems: 'center',
    padding: 12,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.68)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.1)',
  },
  aboutTimelineDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: '#39C986',
  },
  aboutTimelineTextWrap: {
    flex: 1,
  },
  aboutTimelineIndex: {
    color: '#4EA7D8',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.4,
    fontFamily,
  },
  aboutTimelineText: {
    color: '#15352D',
    fontSize: 15,
    marginTop: 2,
    fontWeight: '900',
    fontFamily,
  },
  servicesGrid: {
    marginTop: 30,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 18,
    justifyContent: 'space-between',
  },
  servicesGridMobile: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  serviceGridItem: {
    width: 270,
  },
  serviceGridItemMobile: {
    width: '100%',
    alignSelf: 'stretch',
  },
  serviceCard: {
    width: 270,
    height: 365,
    padding: 20,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    shadowColor: '#111816',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 4,
    overflow: 'hidden',
    justifyContent: 'flex-start',
  },
  serviceCardMobile: {
    width: '100%',
    height: 'auto',
    minHeight: 365,
  },
  cardFullWidth: {
    width: '100%',
    minHeight: 365,
  },
  serviceFlipShell: {
    width: 270,
    height: 365,
    position: 'relative',
  },
  serviceFlipShellMobile: {
    width: '100%',
    minHeight: 365,
  },
  serviceFlipShellExpanded: {
    height: 550,
    zIndex: 20,
  },
  serviceFlipFace: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    backfaceVisibility: 'hidden',
  },
  serviceBackFace: {
    padding: 0,
    overflow: 'hidden',
  },
  serviceTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  serviceIconBubble: {
    width: 44,
    height: 44,
    borderRadius: 13,
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceIndex: {
    color: 'rgba(17,24,22,0.2)',
    fontSize: 28,
    fontWeight: '900',
    fontFamily,
  },
  serviceAccent: {
    width: 44,
    height: 4,
    borderRadius: 999,
    marginBottom: 16,
  },
  serviceTextOnlyTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  qrFrontTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  qrFrontIconStack: {
    width: 58,
    height: 66,
    position: 'relative',
  },
  qrFrontPhone: {
    width: 50,
    height: 62,
    borderRadius: 16,
    backgroundColor: '#F4B85E',
    borderWidth: 1,
    borderColor: 'rgba(155,86,61,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F4B85E',
    shadowOpacity: 0.25,
    shadowRadius: 18,
  },
  qrFrontDot: {
    position: 'absolute',
    right: 0,
    bottom: 5,
    width: 18,
    height: 18,
    borderRadius: 999,
    backgroundColor: '#111816',
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  qrFrontCopy: {
    flex: 1,
  },
  qrFrontFeatureList: {
    gap: 9,
    marginTop: 18,
  },
  qrFrontFeature: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  qrFrontFeatureDot: {
    width: 7,
    height: 7,
    borderRadius: 999,
    backgroundColor: '#F4B85E',
  },
  qrFrontFeatureText: {
    color: '#4E5752',
    fontSize: 12,
    fontWeight: '800',
    fontFamily,
  },
  qrFrontFooter: {
    marginTop: 'auto',
    padding: 14,
    borderRadius: 16,
    backgroundColor: '#111816',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qrFrontFooterTitle: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    fontFamily,
  },
  qrFrontFooterText: {
    color: 'rgba(255,255,255,0.62)',
    fontSize: 11,
    marginTop: 3,
    fontWeight: '800',
    fontFamily,
  },
  qrFrontFlipButton: {
    width: 36,
    height: 36,
    borderRadius: 999,
    backgroundColor: '#F4B85E',
    alignItems: 'center',
    justifyContent: 'center',
  },
  serviceTextOnlyLabel: {
    color: '#9B563D',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    fontFamily,
  },
  serviceTextOnlyIndex: {
    color: 'rgba(17,24,22,0.14)',
    fontSize: 36,
    lineHeight: 38,
    fontWeight: '900',
    fontFamily,
  },
  serviceTextOnlyCopy: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: 8,
  },
  serviceTextOnlyNote: {
    color: '#8A6A4D',
    fontSize: 13,
    lineHeight: 22,
    marginTop: 18,
    fontWeight: '800',
    fontFamily,
  },
  serviceCopy: {
    height: 164,
  },
  serviceCopyMobile: {
    height: 'auto',
    minHeight: 0,
  },
  serviceKicker: {
    color: '#237A55',
    fontSize: 11,
    fontWeight: '900',
    letterSpacing: 1.5,
    marginBottom: 10,
    textTransform: 'uppercase',
    fontFamily,
  },
  serviceTitle: {
    color: '#111816',
    fontSize: 22,
    lineHeight: 27,
    fontWeight: '900',
    minHeight: 56,
    fontFamily,
  },
  serviceTitleMobile: {
    minHeight: 0,
  },
  serviceBody: {
    color: '#5C6661',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 10,
    minHeight: 92,
    fontFamily,
  },
  serviceBodyMobile: {
    minHeight: 0,
  },
  serviceChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    height: 34,
    marginTop: 8,
    alignItems: 'flex-start',
  },
  qrMenuPreview: {
    marginTop: 14,
    borderRadius: 14,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    backgroundColor: '#F1EFE8',
  },
  qrMenuHero: {
    minHeight: 58,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#211F1A',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qrMenuBrand: {
    color: '#F7F2E8',
    fontSize: 8,
    fontWeight: '900',
    letterSpacing: 1.2,
    textTransform: 'uppercase',
    fontFamily,
  },
  qrMenuTitle: {
    color: '#FFFFFF',
    fontSize: 15,
    lineHeight: 18,
    fontWeight: '900',
    marginTop: 3,
    fontFamily,
  },
  qrMenuQr: {
    width: 26,
    height: 26,
    borderRadius: 7,
    backgroundColor: '#F6EFE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrMenuTabs: {
    flexDirection: 'row',
    gap: 5,
    paddingHorizontal: 9,
    paddingTop: 8,
    paddingBottom: 5,
  },
  qrMenuTab: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  qrMenuTabActive: {
    backgroundColor: '#24483F',
  },
  qrMenuTabText: {
    color: '#5C6661',
    fontSize: 7,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuTabTextActive: {
    color: '#FFFFFF',
  },
  qrMenuProductRow: {
    marginHorizontal: 9,
    marginBottom: 9,
    padding: 7,
    borderRadius: 10,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  qrMenuProductImage: {
    width: 38,
    height: 34,
    borderRadius: 8,
    backgroundColor: '#B8A27D',
  },
  qrMenuProductCopy: {
    flex: 1,
  },
  qrMenuProductTitle: {
    color: '#111816',
    fontSize: 8,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuProductMeta: {
    color: '#7A817C',
    fontSize: 7,
    marginTop: 2,
    fontFamily,
  },
  qrMenuPrice: {
    color: '#9B563D',
    fontSize: 8,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuBack: {
    flex: 1,
    backgroundColor: '#F1EFE8',
  },
  qrMenuBackList: {
    flex: 1,
  },
  qrMenuBackHero: {
    minHeight: 138,
    padding: 18,
    backgroundColor: '#211F1A',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  qrMenuBackBrand: {
    color: '#E7DDC9',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.7,
    textTransform: 'uppercase',
    fontFamily,
  },
  qrMenuBackTitle: {
    color: '#FFFFFF',
    fontSize: 31,
    lineHeight: 34,
    maxWidth: 170,
    fontWeight: '900',
    marginTop: 10,
    fontFamily,
  },
  qrMenuBackQr: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#F6EFE2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrMenuBackSearch: {
    marginHorizontal: 12,
    marginTop: -18,
    minHeight: 36,
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 10,
  },
  qrMenuBackSearchText: {
    color: '#6D746F',
    fontSize: 10,
    fontWeight: '800',
    fontFamily,
  },
  qrMenuBackTabs: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
    paddingHorizontal: 12,
    paddingTop: 14,
    paddingBottom: 10,
  },
  qrMenuBackTab: {
    paddingHorizontal: 9,
    paddingVertical: 5,
    borderRadius: 999,
    backgroundColor: '#FFFFFF',
  },
  qrMenuBackTabActive: {
    backgroundColor: '#24483F',
  },
  qrMenuBackTabText: {
    color: '#5C6661',
    fontSize: 8,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuBackTabTextActive: {
    color: '#FFFFFF',
  },
  qrMenuBackProduct: {
    marginHorizontal: 12,
    marginBottom: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 9,
  },
  qrMenuBackImage: {
    width: 50,
    height: 46,
    borderRadius: 10,
    backgroundColor: '#B8A27D',
  },
  qrMenuBackProductCopy: {
    flex: 1,
  },
  qrMenuBackProductTitle: {
    color: '#111816',
    fontSize: 11,
    lineHeight: 14,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuBackProductMeta: {
    color: '#7A817C',
    fontSize: 8,
    marginTop: 3,
    fontFamily,
  },
  qrMenuBackPrice: {
    color: '#9B563D',
    fontSize: 10,
    fontWeight: '900',
    fontFamily,
  },
  qrMenuBackHint: {
    color: '#6A6257',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 12,
    fontFamily,
  },
  corporateBack: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F6F7F4',
  },
  corporateBackTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  corporateLogoCard: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  corporateLogoImage: {
    width: '100%',
    height: '100%',
  },
  corporateBackMeta: {
    flex: 1,
  },
  corporateBackEyebrow: {
    color: '#237A55',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontFamily,
  },
  corporateBackTitle: {
    color: '#111816',
    fontSize: 22,
    lineHeight: 26,
    fontWeight: '900',
    marginTop: 5,
    fontFamily,
  },
  corporateScreen: {
    height: 330,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.1)',
    backgroundColor: '#FFFFFF',
  },
  corporateScreenImage: {
    width: '100%',
    height: '100%',
  },
  corporateBackStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 12,
  },
  corporateBackStat: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
  },
  corporateBackStatValue: {
    color: '#111816',
    fontSize: 15,
    fontWeight: '900',
    fontFamily,
  },
  corporateBackStatLabel: {
    color: '#68716D',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '800',
    fontFamily,
  },
  bookingBack: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F5FAFD',
  },
  bookingBackTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 14,
  },
  bookingLogoCard: {
    width: 58,
    height: 58,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.18)',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },
  bookingLogoImage: {
    width: '100%',
    height: '100%',
  },
  bookingBackMeta: {
    flex: 1,
  },
  bookingBackEyebrow: {
    color: '#287FAE',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.4,
    textTransform: 'uppercase',
    fontFamily,
  },
  bookingBackTitle: {
    color: '#111816',
    fontSize: 24,
    lineHeight: 28,
    fontWeight: '900',
    marginTop: 5,
    fontFamily,
  },
  bookingScreen: {
    height: 330,
    borderRadius: 18,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.2)',
    backgroundColor: '#FFFFFF',
  },
  bookingScreenImage: {
    width: '100%',
    height: '100%',
  },
  bookingSlotRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  bookingSlot: {
    flex: 1,
    minHeight: 38,
    borderRadius: 12,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.16)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  bookingSlotActive: {
    backgroundColor: '#4EA7D8',
  },
  bookingSlotText: {
    color: '#287FAE',
    fontSize: 11,
    fontWeight: '900',
    fontFamily,
  },
  bookingSlotTextActive: {
    color: '#FFFFFF',
  },
  panelBack: {
    flex: 1,
    padding: 16,
    backgroundColor: '#062F49',
    justifyContent: 'space-between',
  },
  panelLoginCard: {
    paddingHorizontal: 18,
    paddingVertical: 24,
    borderRadius: 18,
    backgroundColor: '#FFFFFF',
    borderTopWidth: 4,
    borderTopColor: '#D0AD36',
    shadowColor: '#001A2A',
    shadowOpacity: 0.28,
    shadowRadius: 22,
  },
  panelLoginTitle: {
    color: '#D0AD36',
    fontSize: 21,
    lineHeight: 25,
    fontWeight: '900',
    textAlign: 'center',
    fontFamily,
  },
  panelFieldGroup: {
    marginTop: 18,
  },
  panelFieldLabel: {
    color: '#073954',
    fontSize: 12,
    fontWeight: '900',
    marginBottom: 8,
    letterSpacing: 0.6,
    fontFamily,
  },
  panelInput: {
    minHeight: 42,
    borderRadius: 8,
    backgroundColor: '#E9EEF6',
    borderWidth: 1,
    borderColor: '#D8E0EA',
    justifyContent: 'center',
    paddingHorizontal: 12,
  },
  panelInputText: {
    color: '#111816',
    fontSize: 13,
    fontWeight: '800',
    fontFamily,
  },
  panelButton: {
    minHeight: 46,
    borderRadius: 9,
    backgroundColor: '#073954',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 18,
  },
  panelButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '900',
    fontFamily,
  },
  panelMiniStats: {
    flexDirection: 'row',
    gap: 10,
    marginTop: 14,
  },
  panelMiniStat: {
    flex: 1,
    padding: 12,
    borderRadius: 14,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.16)',
  },
  panelMiniValue: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '900',
    fontFamily,
  },
  panelMiniLabel: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 10,
    marginTop: 4,
    fontWeight: '800',
    fontFamily,
  },
  panelBackHint: {
    color: 'rgba(255,255,255,0.68)',
    fontSize: 9,
    fontWeight: '800',
    textAlign: 'center',
    marginTop: 12,
    fontFamily,
  },
  serviceChip: {
    color: '#27312D',
    fontSize: 10,
    fontWeight: '800',
    paddingHorizontal: 9,
    paddingVertical: 6,
    borderRadius: 999,
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.1)',
    backgroundColor: '#F7F8F6',
    fontFamily,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 14,
    minHeight: 38,
    paddingLeft: 12,
    paddingRight: 5,
    paddingVertical: 4,
    borderRadius: 999,
    backgroundColor: 'rgba(255,255,255,0.74)',
    borderWidth: 1,
    borderColor: 'rgba(18,24,22,0.08)',
  },
  serviceTag: {
    color: '#111816',
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 0.8,
    flexShrink: 1,
    fontFamily,
  },
  serviceArrow: {
    width: 30,
    height: 30,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 8,
  },
  processGrid: {
    marginTop: 24,
    flexDirection: 'row',
    gap: 18,
    flexWrap: 'wrap',
  },
  processGridMobile: {
    flexDirection: 'column',
  },
  processCard: {
    width: 280,
    minHeight: 300,
    padding: 22,
    borderRadius: 28,
    backgroundColor: 'rgba(78,167,216,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(78,167,216,0.18)',
    justifyContent: 'space-between',
    overflow: 'hidden',
  },
  processTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  processIndex: {
    color: '#4EA7D8',
    fontSize: 15,
    letterSpacing: 2,
    fontWeight: '900',
    fontFamily,
  },
  processIconBubble: {
    width: 38,
    height: 38,
    borderRadius: 999,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6DDD8C',
  },
  processText: {
    color: '#17352E',
    fontSize: 22,
    lineHeight: 29,
    marginTop: 22,
    fontWeight: '900',
    fontFamily,
  },
  processBody: {
    color: '#60786D',
    fontSize: 14,
    lineHeight: 23,
    marginTop: 12,
    fontFamily,
  },
  processOutput: {
    marginTop: 20,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: 'rgba(56,99,86,0.12)',
  },
  processOutputLabel: {
    color: '#2F9D6B',
    fontSize: 11,
    letterSpacing: 1.5,
    fontWeight: '900',
    fontFamily,
  },
  processOutputText: {
    color: '#15352D',
    fontSize: 13,
    lineHeight: 21,
    marginTop: 6,
    fontWeight: '800',
    fontFamily,
  },
  processSummary: {
    marginTop: 18,
    paddingHorizontal: 22,
    paddingVertical: 20,
    borderRadius: 26,
    backgroundColor: 'rgba(109,221,140,0.16)',
    borderWidth: 1,
    borderColor: 'rgba(109,221,140,0.24)',
  },
  processSummaryTitle: {
    color: '#15352D',
    fontSize: 20,
    fontWeight: '900',
    fontFamily,
  },
  processSummaryText: {
    color: '#60786D',
    fontSize: 14,
    lineHeight: 24,
    marginTop: 8,
    fontFamily,
  },
  referenceShell: {
    width: '100%',
  },
  sectionHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    gap: 18,
    flexWrap: 'wrap',
  },
  sectionTitle: {
    color: '#15352D',
    fontSize: 34,
    lineHeight: 40,
    fontWeight: '900',
    maxWidth: 620,
    fontFamily,
  },
  dotRow: {
    flexDirection: 'row',
    gap: 8,
    alignItems: 'center',
  },
  carouselDot: {
    width: 12,
    height: 12,
    borderRadius: 999,
    backgroundColor: 'rgba(56,99,86,0.2)',
  },
  referenceStage: {
    marginTop: 26,
    minHeight: 470,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  referenceGhostCard: {
    position: 'absolute',
    width: '92%',
    height: 380,
    borderRadius: 34,
    backgroundColor: 'rgba(255,255,255,0.58)',
    borderWidth: 1,
    transform: [{ translateY: 18 }, { scale: 0.96 }],
  },
  referenceCard: {
    width: '100%',
    minHeight: 410,
    borderRadius: 36,
    padding: 18,
    backgroundColor: 'rgba(255, 255, 255, 0.92)',
    borderWidth: 1,
  },
  referenceTopBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    backgroundColor: 'rgba(56,99,86,0.18)',
  },
  referenceTopText: {
    fontSize: 12,
    letterSpacing: 1.2,
    fontWeight: '800',
    fontFamily,
  },
  referenceImageFrame: {
    borderRadius: 28,
    overflow: 'hidden',
    padding: 18,
    backgroundColor: 'rgba(255,255,255,0.58)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.12)',
  },
  referenceImage: {
    width: '100%',
    height: 240,
  },
  elementaMockup: {
    width: '100%',
    height: 240,
    borderRadius: 22,
    overflow: 'hidden',
    backgroundColor: '#EEF0EE',
  },
  elementaMockupNav: {
    height: 52,
    paddingHorizontal: 14,
    backgroundColor: '#FFFFFF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  elementaMockupMenu: {
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  elementaMockupMenuLine: {
    width: 34,
    height: 5,
    borderRadius: 999,
    backgroundColor: '#C9D0D0',
  },
  elementaMockupMenuLineActive: {
    backgroundColor: '#001A36',
  },
  elementaMockupButton: {
    width: 48,
    height: 30,
    borderRadius: 999,
    backgroundColor: '#001A36',
    alignItems: 'center',
    justifyContent: 'center',
  },
  elementaMockupHero: {
    flex: 1,
    position: 'relative',
    overflow: 'hidden',
    backgroundColor: '#151515',
  },
  elementaPhotoBlock: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: '#5E625C',
  },
  elementaHeroOverlay: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0,
    backgroundColor: 'rgba(0,0,0,0.58)',
  },
  elementaHeroCopy: {
    position: 'absolute',
    left: 22,
    right: 22,
    top: 34,
  },
  elementaHeroPill: {
    alignSelf: 'flex-start',
    color: '#FFFFFF',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    borderRadius: 999,
    paddingHorizontal: 14,
    paddingVertical: 6,
    fontSize: 10,
    fontWeight: '900',
    letterSpacing: 1.2,
    fontFamily,
  },
  elementaHeroTitle: {
    maxWidth: 440,
    color: '#FFFFFF',
    fontSize: 27,
    lineHeight: 31,
    fontWeight: '900',
    marginTop: 14,
    fontFamily,
  },
  elementaHeroHighlight: {
    color: '#D9BA62',
  },
  elementaHeroText: {
    maxWidth: 440,
    color: '#E7E7E7',
    fontSize: 12,
    lineHeight: 19,
    marginTop: 10,
    fontWeight: '700',
    fontFamily,
  },
  referenceBottom: {
    marginTop: 18,
    flexDirection: 'row',
    gap: 16,
    alignItems: 'flex-start',
  },
  referenceAccent: {
    width: 5,
    height: 86,
    borderRadius: 999,
  },
  referenceCopy: {
    flex: 1,
  },
  referenceTitle: {
    color: '#15352D',
    fontSize: 28,
    lineHeight: 34,
    fontWeight: '900',
    fontFamily,
  },
  referenceSubtitle: {
    color: '#60786D',
    fontSize: 15,
    lineHeight: 25,
    marginTop: 8,
    fontFamily,
  },
  logoMarqueeViewport: {
    marginTop: 24,
    overflow: 'hidden',
  },
  logoMarqueeTrack: {
    flexDirection: 'row',
  },
  logoSequence: {
    flexDirection: 'row',
  },
  logoBadge: {
    width: 220,
    height: 92,
    marginRight: 18,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.72)',
    borderWidth: 1,
    borderColor: 'rgba(56,99,86,0.14)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 18,
  },
  partnerLogoImage: {
    width: '100%',
    height: 42,
  },
  cta: {
    marginTop: 34,
    borderRadius: 38,
    paddingHorizontal: 26,
    paddingVertical: 32,
    backgroundColor: '#EAF7EE',
    borderWidth: 1,
    borderColor: 'rgba(57,201,134,0.2)',
    overflow: 'hidden',
    shadowColor: '#20483F',
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 6,
  },
  ctaGlow: {
    position: 'absolute',
    top: -80,
    right: -30,
    width: 260,
    height: 260,
    borderRadius: 999,
    backgroundColor: 'rgba(57,201,134,0.16)',
  },
  ctaEyebrow: {
    color: '#2C9B68',
    fontSize: 13,
    letterSpacing: 2,
    fontWeight: '900',
    fontFamily,
  },
  ctaTitle: {
    color: '#15352D',
    fontSize: 38,
    lineHeight: 45,
    fontWeight: '900',
    maxWidth: 860,
    marginTop: 12,
    fontFamily,
  },
  ctaText: {
    color: '#5F766C',
    fontSize: 16,
    lineHeight: 28,
    maxWidth: 760,
    marginTop: 14,
    marginBottom: 24,
    fontFamily,
  },
  ctaButton: {
    alignSelf: 'flex-start',
  },
  whatsAppButton: {
    position: 'absolute',
    right: 18,
    bottom: 18,
    backgroundColor: '#24B765',
    borderRadius: 999,
    shadowColor: '#24B765',
    shadowOpacity: 0.32,
    shadowRadius: 20,
    elevation: 12,
  },
  whatsAppButtonPressable: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 18,
    paddingVertical: 14,
  },
  whatsAppText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
    fontFamily,
  },
});
