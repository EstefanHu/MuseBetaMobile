import React, { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import {
  Provider as AuthProvider,
  Context as AuthContext
} from './src/providers/AuthProvider.js';
import {
  Provider as LocationProvider,
  Context as LocationContext
} from './src/providers/LocationProvider.js';
import { Provider as StoryProvider } from './src/providers/StoryProvider.js';
import { Provider as ProfileProvider } from './src/providers/ProfileProvider.js';
import { Provider as JourneyProvider } from './src/providers/JourneyProvider.js';
import { Provider as LayoutProvider } from './src/providers/LayoutProvider.js';

import { AuthStack } from './src/stacks/AuthStack.js';
import { RootStack } from './src/stacks/RootStack.js';

const App = () => {
  const { state: { token }, tryLocalLogin } = useContext(AuthContext);
  const { approximateLocation } = useContext(LocationContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await tryLocalLogin();
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    approximateLocation();
  }, []);

  if (isLoading) return null;

  return (
    <NavigationContainer>
      {token ? <RootStack /> : <AuthStack />}
    </NavigationContainer>
  );
}

export default () => {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <LocationProvider>
          <StoryProvider>
            <ProfileProvider>
              <JourneyProvider>
                <LayoutProvider>
                  {/* <React.StrictMode> */}
                  <App />
                  {/* </React.StrictMode> */}
                </LayoutProvider>
              </JourneyProvider>
            </ProfileProvider>
          </StoryProvider>
        </LocationProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}