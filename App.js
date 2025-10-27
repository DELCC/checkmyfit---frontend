import DesignKit from "./screens/DesignKit";
import AIStylist from "./screens/AIStylist";
import Wardrobe from "./screens/Wardrobe";
import Profile from "./screens/Profile";
import Profiles from "./screens/Profiles";
import Auth from "./screens/Auth";
import Signup from "./screens/Signup";
import EditProfile from "./screens/EditProfile";
<<<<<<< HEAD
import HomeScreen from "./screens/Home";
=======
>>>>>>> b61213dfadc7b7ede8c85fbd97c8ebc794113e1e
import { Home, ShoppingBag, Camera, Users, User } from "lucide-react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import users from "./reducers/users";


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const store = configureStore({
  reducer: { users },
});

export default function App() {
  function TabNavigator() {
    return (
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: "#00A6A6",
          tabBarInactiveTintColor: "#6b7280",
        }}
      >
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: () => <Home color="#00A6A6" size={28} />, // couleur et taille fixes
          }}
        />
        <Tab.Screen
          name="Wardrobe"
          component={Wardrobe}
          options={{
            tabBarIcon: () => <ShoppingBag color="#FF7F50" size={24} />, // couleur et taille différentes
          }}
        />
        <Tab.Screen
          name="AIStylist"
          component={AIStylist}
          options={{
            tabBarIcon: () => <Camera color="#8A2BE2" size={26} />,
          }}
        />
        <Tab.Screen
          name="DesignKit"
          component={DesignKit}
          options={{
            tabBarIcon: () => <Users color="#20B2AA" size={30} />,
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: () => <User color="#20B2AA" size={30} />,
          }}
        />
      </Tab.Navigator>
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
<<<<<<< HEAD
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Signup" component={Signup} />
          <Stack.Screen name="Home" component={TabNavigator} />
=======
          <Stack.Screen name="MainTabs" component={TabNavigator} />
          <Stack.Screen name="Auth" component={Auth} />
          <Stack.Screen name="Signup" component={Signup} />
>>>>>>> b61213dfadc7b7ede8c85fbd97c8ebc794113e1e
          <Stack.Screen name="EditProfile" component={EditProfile} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });
