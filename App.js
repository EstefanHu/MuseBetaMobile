import React, { useState, useEffect, useContext } from 'react';

import {
  Provider as AuthProvider,
  Context as AuthContext
} from './src/providers/AuthProvider.js';
import { Provider as LocationProvider } from './src/providers/LocationProvider.js';
import { Provider as StoryProvider } from './src/providers/StoryProvider.js';
import { Provider as NewStoryProvider } from './src/providers/NewStoryProvider.js';
import { Provider as ProfileProvider } from './src/providers/ProfileProvider.js';

import { BottomTabs } from './src/layout/BottomTabs.js';
import { AuthStack } from './src/stacks/AuthStack.js';

const App = () => {
  const { state, tryLocalLogin } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      await tryLocalLogin();
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