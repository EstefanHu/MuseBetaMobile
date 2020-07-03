import React, { useState, useEffect, useContext } from 'react';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './src/providers/AuthProvider.js';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { Provider as LocationProvider } from './src/providers/LocationProvider.js';
import { Provider as StoryProvider } from './src/providers/StoryProvider.js';
import { Provider as NewStoryProvider } from './src/providers/NewStoryProvider.js';
import { Provider as ProfileProvider } from './src/providers/ProfileProvider.js';

import { BottomTabs } from './src/layout/BottomTabs.js';
import { AuthStack } from './src/stacks/AuthStack.js';
import { WelcomeStack } from './src/stacks/WelcomeStack.js';

const App = () => {
  const { state: { token }, tryLocalLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await tryLocalLogin();
      setIsLoading(false);
    })();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      {/* {token ? <BottomTabs /> : <AuthStack />} */}
      <WelcomeStack />
    </NavigationContainer>
  );
}

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LocationProvider>
          <StoryProvider>
            <NewStoryProvider>
              <ProfileProvider>
                  {/* <React.StrictMode> */}
                  <App />
                  {/* </React.StrictMode> */}
              </ProfileProvider>
            </NewStoryProvider>
          </StoryProvider>
        </LocationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}