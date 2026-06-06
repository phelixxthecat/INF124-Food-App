import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { appStyles, UCIColors } from '../../constants/appStyles';

type Restaurant = {
  _id: string;
  name: string;
  description?: string;
  cuisine?: string;
  location?: string;
  rating?: number;
};

export default function HomePage() {
  const router = useRouter();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);

  const [menuVisible, setMenuVisible] = useState(false);
  const menuNavigation = [
    {
      title: 'Profile',
      route: '/(tabs)/ProfilePages/profile',
    },
    {
      title: 'About Us',
      route: '/(tabs)/OnboardingPages/aboutUs',
    },
    {
      title: 'Contact Us',
      route: '/(tabs)/AboutUsPages/contactPage',
    },
  ];

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const response = await fetch(
        'http://localhost:5000/api/restaurants'
      );

      const data = await response.json();

      setRestaurants(data);
    } catch (error) {
      console.error('Failed to fetch restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const openRestaurant = (restaurant: Restaurant) => {
    router.push({
      pathname: '/food',
      params: {
        restaurantId: restaurant._id,
        restaurantName: restaurant.name,
      },
    } as any);
  };

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Home</Text>

      <View style={appStyles.card}>
        {/* Menu navigation dropdown */}
        <Pressable
          style={styles.menuButton}
          onPress={() => setMenuVisible(!menuVisible)}
        >
          <Ionicons
            name="menu"
            size={32}
            color={UCIColors.navy}
          />
        </Pressable>
        {menuVisible && (
          <View style={styles.menu}>
            <View style={styles.divider} />
            {menuNavigation.map((item) => (
              <Pressable
                key={item.title}
                onPress={() => {
                  setMenuVisible(false);
                  router.push(item.route as any);
                }}
              >
                <Text style={styles.menuItem}>{item.title}</Text>
                <View style={styles.divider} />
              </Pressable>
              
            ))}
          </View>
        )}

        <Text style={appStyles.logo}>ZotEats</Text>

        <Text style={styles.subtitle}>
          Restaurants Near You
        </Text>

        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator
              size="large"
              color={UCIColors.navy}
            />
            <Text style={styles.loadingText}>
              Loading restaurants...
            </Text>
          </View>
        ) : (
          <ScrollView
            contentContainerStyle={styles.content}
            showsVerticalScrollIndicator={false}
          >
            {restaurants.length === 0 ? (
              <Text style={styles.emptyText}>
                No restaurants available.
              </Text>
            ) : (
              restaurants.map((restaurant) => (
                <Pressable
                  key={restaurant._id}
                  style={styles.restaurantCard}
                  onPress={() => openRestaurant(restaurant)}
                >
                  <View style={styles.headerRow}>
                    <Text style={styles.restaurantName}>
                      {restaurant.name}
                    </Text>

                    <View style={styles.ratingContainer}>
                      <Ionicons
                        name="star"
                        size={14}
                        color={UCIColors.gold}
                      />

                      <Text style={styles.ratingText}>
                        {restaurant.rating ?? 4.5}
                      </Text>
                    </View>
                  </View>

                  <Text style={styles.cuisine}>
                    {restaurant.cuisine || 'Restaurant'}
                  </Text>

                  <View style={styles.locationRow}>
                    <Ionicons
                      name="location-outline"
                      size={15}
                      color={UCIColors.textGray}
                    />

                    <Text style={styles.locationText}>
                      {restaurant.location ||
                        'Near UCI Campus'}
                    </Text>
                  </View>

                  {restaurant.description ? (
                    <Text style={styles.description}>
                      {restaurant.description}
                    </Text>
                  ) : null}
                </Pressable>
              ))
            )}
          </ScrollView>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1000,
  },
  menu: {
  position: 'absolute',
  top: 55,
  left: 20,
  backgroundColor: UCIColors.cream,
  borderRadius: 10,
  padding: 8,
  elevation: 5,
  zIndex: 1000,
},
menuItem: {
  paddingVertical: 8,
  paddingHorizontal: 10,
  color: UCIColors.navy,
  fontWeight: '600',
},
divider: {
  height: 2,
  backgroundColor: UCIColors.blue,
  marginVertical: 4,
},
  subtitle: {
    marginTop: 8,
    marginBottom: 20,
    fontSize: 16,
    fontWeight: '700',
    color: UCIColors.textGray,
  },

  content: {
    paddingBottom: 30,
    alignItems: 'center',
  },

  loadingContainer: {
    alignItems: 'center',
    marginTop: 40,
  },

  loadingText: {
    marginTop: 12,
    color: UCIColors.textGray,
    fontWeight: '600',
  },

  emptyText: {
    color: UCIColors.textGray,
    marginTop: 30,
    fontSize: 15,
  },

  restaurantCard: {
    width: 300,
    backgroundColor: UCIColors.cream,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    padding: 16,
    marginBottom: 14,
  },

  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  restaurantName: {
    flex: 1,
    color: UCIColors.navy,
    fontSize: 18,
    fontWeight: '900',
  },

  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },

  ratingText: {
    fontWeight: '800',
    color: UCIColors.navy,
  },

  cuisine: {
    marginTop: 6,
    color: UCIColors.textGray,
    fontWeight: '700',
  },

  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },

  locationText: {
    marginLeft: 4,
    color: UCIColors.textGray,
    fontSize: 13,
  },

  description: {
    marginTop: 10,
    color: UCIColors.textGray,
    fontSize: 13,
    lineHeight: 18,
  },
});