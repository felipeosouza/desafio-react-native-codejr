import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFonts } from 'expo-font';
import { AppContextProvider } from './Context';

//Components
import NavBar from './components/NavBar';

//Screens
import HomeScreen from './screens/HomeScreen';
import ManageMembers from './screens/ManageMembers';
import CreateUpdateForm from './screens/CreateUpdateForm';
import ReadDeleteCard from './screens/ReadDeleteCard';
import ContactScreen from './screens/ContactScreen';


function App() {
  //Carregando fontes
  const [fontsLoaded, error] = useFonts({
    'Khand-Bold': require("..//assets/fonts/Khand-Bold.ttf"),
    'Khand-Light': require("..//assets/fonts/Khand-Light.ttf"),
    'Khand-Medium': require("..//assets/fonts/Khand-Medium.ttf"),
    'Khand-Regular': require("..//assets/fonts/Khand-Regular.ttf"),
    'Khand-SemiBold': require("..//assets/fonts/Khand-SemiBold.ttf")
  })

  if (!fontsLoaded || error) {
    return null
  }

  //Navegação
  const Stack = createStackNavigator();

  //const initialRouteName = 'CreateUpdateForm'
  const initialRouteName = 'LoginScreen'

  return (
    <NavigationContainer>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar backgroundColor='#292929' style='light' />
        <Stack.Navigator
          initialRouteName={initialRouteName}
          screenOptions={({ navigation }) => ({
            //Função para navegar pra tela de membros pela NavBar
            header: () => <NavBar navigate={(name, params) => navigation.navigate(name, params)} />,
          })
          }
        >
          <Stack.Screen
            name='Home'
            component={HomeScreen}
          />
          <Stack.Screen
            name='ManageMembers'
            component={ManageMembers}
          />
          <Stack.Screen
            name='Contact'
            component={ContactScreen}
          />
          <Stack.Screen
            name='CreateUpdateForm'
            component={CreateUpdateForm}
            options={{
              header: () => null,
              presentation: 'transparentModal'
            }}
          />
          <Stack.Screen
            name='ReadDeleteCard'
            component={ReadDeleteCard}
            options={{
              header: () => null,
              presentation: 'transparentModal'
            }}
          />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  )
}

export default function AppWithContext() {
  return <AppContextProvider>
    <App />
  </AppContextProvider>
}
