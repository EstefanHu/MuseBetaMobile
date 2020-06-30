import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Provider as AuthProvider } from './src/providers/AuthProvider.js';
import { Provider as LocationProvider } from './src/providers/LocationProvider.js';
import { Provider as StoryProvider } from './src/providers/StoryProvider.js';
import { Provider as NewStoryProvider } from './src/providers/NewStoryProvider.js';
import { Provider as ProfileProvider } from './src/providers/ProfileProvider.js';

import { BottomTabs } from './src/layout/BottomTabs.js';
import { AuthStack } from './src/stacks/AuthStack.js';

const App = () => {
  const { state, tryLocalSignin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async function authenticate() {
      await tryLocalSignin();
      setIsLoading(false);
    })();
  }, []);

  // Loading Screen
  if (isLoading) return null;

  return (
    <NavigationContainer>
      {state.token ? <BottomTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <AuthProvider>
      <LocationProvider>
        <StoryProvider>
          <NewStoryProvider>
            <ProfileProvider>
              <React.StrictMode>
                <App />
              </React.StrictMode>
            </ProfileProvider>
          </NewStoryProvider>
        </StoryProvider>
      </LocationProvider>
    </AuthProvider>
  )
}