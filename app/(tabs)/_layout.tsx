import { Tabs } from 'expo-router';
import { FontAwesome } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Ana Sayfa',
          tabBarIcon: ({ color }) => <FontAwesome name="home" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="members"
        options={{
          title: 'Üyeler',
          tabBarIcon: ({ color }) => <FontAwesome name="users" size={24} color={color} />,
        }}
      />
     <Tabs.Screen
     name="add-member"
     options={{
       title: 'Yeni Üye Ekle',
       tabBarIcon: ({ color }) => <FontAwesome name="plus" size={24} color={color} />,
     }}
   />
 </Tabs>
  );
}
