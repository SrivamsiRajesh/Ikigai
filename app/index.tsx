import React, { useState, useRef, useEffect } from 'react';
import {
  ScrollView,
  Text,
  View,
  ImageBackground,
  StatusBar,
  TouchableOpacity,
  Dimensions,
  Modal,
  Animated,
  PanResponder,
  Easing,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Svg, { Path } from 'react-native-svg';
import {
  useFonts,
  Manrope_300Light,
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
} from '@expo-google-fonts/manrope';

const { width, height } = Dimensions.get('window');

const GoogleIcon = ({ size = 24 }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24">
    <Path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
    <Path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
    <Path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
    <Path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
  </Svg>
);

type SignupModalProps = {
  visible: boolean;
  onClose: () => void;
};

const SignupModal = ({ visible, onClose }: SignupModalProps) => {
  const slideAnim = useRef(new Animated.Value(height)).current;
  const backdropOpacity = useRef(new Animated.Value(0)).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => gestureState.dy > 0 && gestureState.vy > 0,
    onPanResponderMove: (evt, gestureState) => {
      if (gestureState.dy > 0) slideAnim.setValue(gestureState.dy);
    },
    onPanResponderRelease: (evt, gestureState) => {
      if (gestureState.dy > 100 || gestureState.vy > 1.5) closeModal();
      else {
        Animated.spring(slideAnim, {
          toValue: 0,
          useNativeDriver: false,
          tension: 100,
          friction: 8,
        }).start();
      }
    },
  });

  const openModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 400,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
    ]).start();
  };

  const closeModal = () => {
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue: height,
        duration: 300,
        easing: Easing.in(Easing.cubic),
        useNativeDriver: false,
      }),
      Animated.timing(backdropOpacity, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start(onClose);
  };

  useEffect(() => {
    if (visible) openModal();
    else {
      slideAnim.setValue(height);
      backdropOpacity.setValue(0);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <Modal transparent visible={visible} animationType="none" onRequestClose={closeModal}>
      <View style={{ flex: 1 }}>
        <Animated.View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.5)', opacity: backdropOpacity }}>
          <TouchableOpacity style={{ flex: 1 }} activeOpacity={1} onPress={closeModal} />
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            borderTopLeftRadius: 24,
            borderTopRightRadius: 24,
            paddingBottom: 40,
            transform: [{ translateY: slideAnim }],
            shadowColor: '#000',
            shadowOffset: { width: 0, height: -4 },
            shadowOpacity: 0.1,
            shadowRadius: 12,
            elevation: 12,
          }}
          {...panResponder.panHandlers}
        >
          <View className="items-center pt-4 pb-6">
            <View className="w-12 h-1 bg-gray-300 rounded-full" />
          </View>

          <View className="px-8">
            <Text style={{ fontFamily: 'Manrope_600SemiBold', fontSize: 24, textAlign: 'center', marginBottom: 12, color: '#1F2937' }}>
              Begin Your Journey
            </Text>
            <Text style={{ fontFamily: 'Manrope_400Regular', fontSize: 16, textAlign: 'center', lineHeight: 24, color: '#6B7280', marginBottom: 32 }}>
Discover your ikigai and find balance
in life's beautiful moments
            </Text>

            <TouchableOpacity
              className="bg-white border border-gray-200 rounded-2xl px-6 py-4 mb-4 flex-row items-center justify-center"
              activeOpacity={0.8}
              style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8, elevation: 3 }}
            >
              <GoogleIcon size={20} />
              <Text style={{ fontFamily: 'Manrope_500Medium', color: '#374151', fontSize: 16, marginLeft: 12 }}>
                Continue with Google
              </Text>
            </TouchableOpacity>

            <View className="flex-row items-center my-6">
              <View className="flex-1 h-px bg-gray-200" />
              <Text style={{ fontFamily: 'Manrope_300Light', color: '#9CA3AF', marginHorizontal: 16 }}>or</Text>
              <View className="flex-1 h-px bg-gray-200" />
            </View>

            <TouchableOpacity className="bg-gray-900 rounded-2xl px-6 py-4 mb-6" activeOpacity={0.8}>
              <Text style={{ fontFamily: 'Manrope_500Medium', color: 'white', fontSize: 16, textAlign: 'center' }}>
                Continue with Email
              </Text>
            </TouchableOpacity>

            <Text style={{ fontFamily: 'Manrope_300Light', fontSize: 12, color: '#9CA3AF', textAlign: 'center', lineHeight: 20 }}>
              By continuing, you agree to our{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#4B5563' }}>Terms of Service</Text> and{' '}
              <Text style={{ textDecorationLine: 'underline', color: '#4B5563' }}>Privacy Policy</Text>
            </Text>
          </View>
        </Animated.View>
      </View>
    </Modal>
  );
};

export default function App() {
  const [showModal, setShowModal] = useState(false);
  const [fontsLoaded] = useFonts({
    Manrope_300Light,
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="flex-1">
      <StatusBar hidden translucent backgroundColor="transparent" />
      <ImageBackground
        source={require('../assets/images/try.png')}
        style={{ flex: 1 }}
        resizeMode="cover"
      >
        <View className="absolute inset-0 bg-black/40" />

        <SafeAreaView className="flex-1">
          <ScrollView
            contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingTop: height * 0.16, paddingBottom: height * 0.08 }}
            showsVerticalScrollIndicator={false}
          >
            <View className="flex-1 justify-center px-8">
              <View className="mb-24">
                <Text style={{ fontFamily: 'Manrope_300Light', color: 'rgba(255,255,255,0.7)', fontSize: 12, letterSpacing: 3, marginBottom: 8 }}>
                  IKIGAI
                </Text>
                <View className="w-12 h-px bg-white/40 mb-2" />
                <Text style={{ fontFamily: 'Manrope_300Light', color: 'rgba(255,255,255,0.5)', fontSize: 12, letterSpacing: 1 }}>
                  生き甲斐
                </Text>
              </View>

              <View className="mb-10 mt-12">
                <Text style={{ fontFamily: 'Manrope_600SemiBold', color: 'white', fontSize: 40, lineHeight: 46, textShadowColor: 'rgba(0,0,0,0.2)', textShadowOffset: { width: 0, height: 2 }, textShadowRadius: 4 }}>
                  Find Balance in your life
                </Text>
              </View>

              <View className="mb-10 mt-4">
                <View className="border-l border-white/30 pl-4 max-w-[260px]">
                  <Text style={{ fontFamily: 'Manrope_300Light', color: 'rgba(255,255,255,0.7)', fontSize: 14, fontStyle: 'italic', lineHeight: 24 }}>
                    "Your ikigai is at the intersection of what you love and what the world needs."
                  </Text>
                </View>
              </View>

              <View className="items-center">
                <TouchableOpacity
                  className="bg-white/10 rounded-full px-8 py-4 border border-white/20 mb-4"
                  activeOpacity={0.8}
                  onPress={() => setShowModal(true)}
                  style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 12, elevation: 6 }}
                >
                  <Text style={{ fontFamily: 'Manrope_400Regular', color: 'white', fontSize: 16, letterSpacing: 1 }}>
                    Begin Journey
                  </Text>
                </TouchableOpacity>

                <Text style={{ fontFamily: 'Manrope_300Light', color: 'rgba(255,255,255,0.4)', fontSize: 12, letterSpacing: 1, marginBottom: 8 }}>
                  Start your ikigai discovery
                </Text>

                <View className="w-16 h-px bg-white/30" />
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>

      <SignupModal visible={showModal} onClose={() => setShowModal(false)} />
    </View>
  );
}
