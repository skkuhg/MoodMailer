import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from 'react-native';

// Import screens
import { ComposeScreen } from './src/screens/ComposeScreen';
import { VaultScreen } from './src/screens/VaultScreen';
import { InboxScreen } from './src/screens/InboxScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

// Import stores
import { useUserStore, useMessageStore } from './src/store';

// Import services
import { NotificationService } from './src/services/notificationService';

// NativeWind CSS
import './global.css';

const Tab = createBottomTabNavigator();

export default function App() {
  const { loadUserPreferences, user } = useUserStore();
  const { loadMessages, markAsDelivered } = useMessageStore();

  useEffect(() => {
    // Initialize app
    const initializeApp = async () => {
      try {
        // Load user preferences
        await loadUserPreferences();
        
        // Load messages
        await loadMessages();
        
        // Request notification permissions
        await NotificationService.requestPermissions();
        
        // Set up notification response listener
        const subscription = NotificationService.addNotificationResponseListener(
          (response) => {
            const { messageId } = response.notification.request.content.data;
            if (messageId) {
              // Mark message as delivered when notification is tapped
              markAsDelivered(messageId);
            }
          }
        );

        return () => subscription.remove();
      } catch (error) {
        console.error('Failed to initialize app:', error);
      }
    };

    initializeApp();
  }, [loadUserPreferences, loadMessages, markAsDelivered]);

  // Show loading screen while app initializes
  if (!user) {
    return (
      <View className="flex-1 justify-center items-center bg-indigo-600">
        <Text className="text-4xl mb-4">✉️</Text>
        <Text className="text-2xl font-bold text-white mb-2">MoodMailer</Text>
        <Text className="text-indigo-100">Loading...</Text>
      </View>
    );
  }

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string;

            switch (route.name) {
              case 'Compose':
                iconName = focused ? 'create' : 'create-outline';
                break;
              case 'Vault':
                iconName = focused ? 'archive' : 'archive-outline';
                break;
              case 'Inbox':
                iconName = focused ? 'mail' : 'mail-outline';
                break;
              case 'Settings':
                iconName = focused ? 'settings' : 'settings-outline';
                break;
              default:
                iconName = 'help-outline';
            }

            return <Ionicons name={iconName as any} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#6366F1',
          tabBarInactiveTintColor: '#9CA3AF',
          tabBarStyle: {
            backgroundColor: '#FFFFFF',
            borderTopWidth: 1,
            borderTopColor: '#E5E7EB',
            paddingBottom: 8,
            paddingTop: 8,
            height: 70,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '500',
          },
          headerStyle: {
            backgroundColor: '#FFFFFF',
            borderBottomWidth: 1,
            borderBottomColor: '#E5E7EB',
          },
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '600',
            color: '#1F2937',
          },
        })}
      >
        <Tab.Screen 
          name="Compose" 
          component={ComposeScreen}
          options={{
            title: 'New Message',
            headerTitle: 'Write to Future Self',
          }}
        />
        <Tab.Screen 
          name="Vault" 
          component={VaultScreen}
          options={{
            title: 'Vault',
            headerTitle: 'Message Vault',
          }}
        />
        <Tab.Screen 
          name="Inbox" 
          component={InboxScreen}
          options={{
            title: 'Inbox',
            headerTitle: 'Delivered Messages',
          }}
        />
        <Tab.Screen 
          name="Settings" 
          component={SettingsScreen}
          options={{
            title: 'Settings',
            headerTitle: 'Settings',
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
