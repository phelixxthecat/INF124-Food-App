import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { appStyles, UCIColors } from '../../../constants/appStyles';

export default function SavedLocations() {
  const router = useRouter();

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Saved Locations</Text>

      <View style={appStyles.card}>
        <Pressable
          style={appStyles.backButton}
          onPress={() => router.back()}
        >
          <Ionicons
            name="arrow-back"
            size={24}
            color={UCIColors.navy}
          />
        </Pressable>

        <ScrollView
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={appStyles.title}>Saved Locations</Text>

          {[
            'Engineering Hall',
            'Langson Library',
            'Student Center',
            'Mesa Court',
          ].map((location) => (
            <View key={location} style={styles.locationCard}>
              <Ionicons
                name="location"
                size={24}
                color={UCIColors.navy}
              />

              <View style={styles.locationInfo}>
                <Text style={styles.locationName}>
                  {location}
                </Text>

                <Text style={styles.locationSubtext}>
                  UCI Campus Pickup Spot
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    paddingBottom: 40,
  },

  locationCard: {
    width: 260,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: UCIColors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 16,
    marginBottom: 14,
  },

  locationInfo: {
    marginLeft: 14,
  },

  locationName: {
    fontSize: 15,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  locationSubtext: {
    marginTop: 4,
    fontSize: 12,
    color: UCIColors.textGray,
  },
});