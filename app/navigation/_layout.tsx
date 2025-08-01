import {View, Text} from 'react-native';
import {Tabs, Redirect} from 'expo-router';

const TabsLayout = () => {
  return (
    <>
    <Tabs>
        <Tabs.Screen name='home' options={{title: 'Home'}} />
        <Tabs.Screen name='water' options={{title: 'Water'}} />
        <Tabs.Screen name='meditate' options={{title: 'Meditate'}} />
        <Tabs.Screen name='fitness' options={{title: 'Fitness'}} />
    </Tabs>
    </>
  )
}

export default TabsLayout