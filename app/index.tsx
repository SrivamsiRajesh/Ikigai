import { ScrollView, Text, View, ImageBackground, StatusBar, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function App() {
  return (
    <View className="flex-1">
      <StatusBar hidden={true} barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <ImageBackground source={require('../assets/images/splash.png')} style={{ flex: 1, shadowOpacity: 0.5 }} resizeMode="cover">
        <SafeAreaView className="flex-1">
          <ScrollView contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between', paddingVertical: 60 }}>
            <View className="items-start px-6">
              <Text className="text-white font-light text-4xl leading-tight mb-6">
                Find Balance in{'\n'}your life with{'\n'}equilibrium.
              </Text>
              <Text className="text-white text-sm opacity-70 leading-relaxed">
                Take a moment for yourself.{'\n'}Reflect, recharge, and realign.{'\n'}Your balance starts here.
              </Text>
            </View>
            
            <View className="items-center px-6 pb-8">
              <TouchableOpacity className="bg-black/30 rounded-full px-12 py-4">
                <Text className="text-white font-normal text-base">
                  Start Now
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </ImageBackground>
    </View>
  );
}