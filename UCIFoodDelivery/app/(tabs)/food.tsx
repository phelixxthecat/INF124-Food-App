import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { appStyles, UCIColors } from '../../constants/appStyles';
import { getSessionJSON, SESSION_KEYS, setSessionJSON } from '../../src/sessionStore';

type MenuItem = {
  _id: string;
  restaurantId: string;
  name: string;
  description?: string;
  price: number;
  category?: string;
};

type SelectedRestaurant = {
  restaurantId: string;
  restaurantName: string;
};

type CheckoutCartItem = {
  menuItemId: string;
  name: string;
  price: number;
  quantity: number;
};

type CheckoutCart = {
  restaurantId: string;
  restaurantName: string;
  items: CheckoutCartItem[];
};

export default function FoodPage() {
  const router = useRouter();
  const params = useLocalSearchParams<{
    restaurantId?: string;
    restaurantName?: string;
  }>();

  const [selectedRestaurant, setSelectedRestaurant] =
    useState<SelectedRestaurant | null>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [cart, setCart] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const cartCount = useMemo(
    () => Object.values(cart).reduce((sum, qty) => sum + qty, 0),
    [cart]
  );

  useEffect(() => {
    const storedRestaurant = getSessionJSON<SelectedRestaurant>(
      SESSION_KEYS.selectedRestaurant
    );

    const resolvedRestaurant: SelectedRestaurant | null =
      params.restaurantId && params.restaurantName
        ? {
            restaurantId: String(params.restaurantId),
            restaurantName: String(params.restaurantName),
          }
        : storedRestaurant;

    if (!resolvedRestaurant) {
      setError('No restaurant selected. Please return to Home and choose one.');
      setLoading(false);
      return;
    }

    setSelectedRestaurant(resolvedRestaurant);
    fetchRestaurantMenu(resolvedRestaurant);
  }, [params.restaurantId, params.restaurantName]);

  const fetchRestaurantMenu = async (restaurant: SelectedRestaurant) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(
        `http://18.222.199.221:5000/api/menu/restaurant/${restaurant.restaurantId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch menu items');
      }

      const data = (await response.json()) as MenuItem[];
      setMenuItems(data);

      setSessionJSON(SESSION_KEYS.restaurantMenu, {
        restaurant,
        items: data,
      });
    } catch (fetchError) {
      console.error('Failed to fetch menu:', fetchError);
      setError('Unable to load the menu right now.');
    } finally {
      setLoading(false);
    }
  };

  const addToCart = (menuItemId: string) => {
    setCart((prev) => ({
      ...prev,
      [menuItemId]: (prev[menuItemId] ?? 0) + 1,
    }));
  };

  const removeFromCart = (menuItemId: string) => {
    setCart((prev) => {
      const nextQuantity = (prev[menuItemId] ?? 0) - 1;

      if (nextQuantity <= 0) {
        const { [menuItemId]: _removed, ...rest } = prev;
        return rest;
      }

      return {
        ...prev,
        [menuItemId]: nextQuantity,
      };
    });
  };

  const goToCheckout = () => {
    if (!selectedRestaurant) {
      return;
    }

    const checkoutItems: CheckoutCartItem[] = menuItems
      .filter((item) => (cart[item._id] ?? 0) > 0)
      .map((item) => ({
        menuItemId: item._id,
        name: item.name,
        price: item.price,
        quantity: cart[item._id],
      }));

    if (checkoutItems.length === 0) {
      return;
    }

    const checkoutCart: CheckoutCart = {
      restaurantId: selectedRestaurant.restaurantId,
      restaurantName: selectedRestaurant.restaurantName,
      items: checkoutItems,
    };

    setSessionJSON(SESSION_KEYS.checkoutCart, checkoutCart);
    router.push('/Checkout' as any);
  };

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  return (
    <View style={appStyles.screen}>
      <Text style={appStyles.pageLabel}>Food Page</Text>

      <View style={appStyles.card}>
        <ScrollView contentContainerStyle={styles.content}>
          <Pressable
            style={appStyles.backButton}
            onPress={() => router.navigate('/home')}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={UCIColors.navy}
            />
          </Pressable>
          <Text style={appStyles.logo}>ZotEats</Text>
          <Text style={appStyles.title}>
            {selectedRestaurant?.restaurantName ?? 'Food Delivery'}
          </Text>

          <View style={styles.cartPill}>
            <Text style={styles.cartText}>Cart: {cartCount}</Text>
          </View>

          {loading ? (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={UCIColors.navy} />
              <Text style={styles.loadingText}>Loading menu items...</Text>
            </View>
          ) : null}

          {!loading && error ? (
            <Text style={styles.errorText}>{error}</Text>
          ) : null}

          {!loading && !error && menuItems.length === 0 ? (
            <Text style={styles.emptyText}>
              No menu items available for this restaurant.
            </Text>
          ) : null}

          {!loading && !error
            ? menuItems.map((item) => {
                const quantity = cart[item._id] ?? 0;

                return (
                  <View key={item._id} style={styles.foodCard}>
                    <View style={styles.foodImage}>
                      <Text style={styles.foodImageLetter}>
                        {item.name.charAt(0)}
                      </Text>
                    </View>

                    <View style={styles.foodInfo}>
                      <Text style={styles.foodName}>{item.name}</Text>

                      {item.category ? (
                        <Text style={styles.foodCategory}>{item.category}</Text>
                      ) : null}

                      <Text style={styles.foodPrice}>
                        {formatPrice(item.price)}
                      </Text>

                      {item.description ? (
                        <Text style={styles.description}>{item.description}</Text>
                      ) : null}

                      <View style={styles.cartActions}>
                        <Pressable
                          style={styles.addButton}
                          onPress={() => addToCart(item._id)}
                        >
                          <Text style={styles.addButtonText}>Add to Cart</Text>
                        </Pressable>

                        {quantity > 0 ? (
                          <Pressable
                            style={styles.removeButton}
                            onPress={() => removeFromCart(item._id)}
                          >
                            <Text style={styles.removeButtonText}>
                              Remove ({quantity})
                            </Text>
                          </Pressable>
                        ) : null}
                      </View>
                    </View>
                  </View>
                );
              })
            : null}

          <Pressable
            style={[
              appStyles.primaryButton,
              cartCount === 0 && styles.checkoutDisabled,
            ]}
            onPress={goToCheckout}
            disabled={cartCount === 0}
          >
            <Text style={appStyles.primaryButtonText}>Go to Checkout</Text>
          </Pressable>
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

  loadingContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 18,
  },

  loadingText: {
    marginTop: 10,
    color: UCIColors.textGray,
    fontWeight: '600',
  },

  errorText: {
    color: '#C0392B',
    fontWeight: '700',
    marginBottom: 14,
  },

  emptyText: {
    color: UCIColors.textGray,
    marginBottom: 16,
    fontWeight: '700',
  },

  cartPill: {
    backgroundColor: UCIColors.gold,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 18,
    marginBottom: 24,
  },

  cartText: {
    color: UCIColors.navy,
    fontWeight: '800',
  },

  foodCard: {
    width: 300,
    flexDirection: 'row',
    backgroundColor: UCIColors.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 14,
    marginBottom: 16,
  },

  foodImage: {
    width: 80,
    height: 80,
    borderRadius: 16,
    backgroundColor: UCIColors.cream,
    borderWidth: 1,
    borderColor: UCIColors.gold,
    justifyContent: 'center',
    alignItems: 'center',
  },

  foodImageLetter: {
    color: UCIColors.navy,
    fontSize: 30,
    fontWeight: '900',
  },

  foodInfo: {
    flex: 1,
    marginLeft: 14,
  },

  foodName: {
    fontSize: 16,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  foodCategory: {
    fontSize: 12,
    fontWeight: '700',
    color: UCIColors.gold,
    marginTop: 3,
  },

  foodPrice: {
    fontSize: 14,
    fontWeight: '700',
    color: UCIColors.textGray,
    marginTop: 4,
    marginBottom: 6,
  },

  description: {
    color: UCIColors.textGray,
    fontSize: 12,
    marginBottom: 10,
  },

  cartActions: {
    gap: 8,
  },

  addButton: {
    backgroundColor: UCIColors.navy,
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },

  addButtonText: {
    color: UCIColors.white,
    fontWeight: '800',
    fontSize: 12,
  },

  removeButton: {
    backgroundColor: '#E9EEF8',
    borderRadius: 12,
    paddingVertical: 8,
    alignItems: 'center',
  },

  removeButtonText: {
    color: UCIColors.navy,
    fontWeight: '700',
    fontSize: 12,
  },

  checkoutDisabled: {
    opacity: 0.55,
  },
});