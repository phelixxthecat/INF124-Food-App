import React from 'react';
import {StyleSheet, TouchableOpacity, View, ScrollView, Text, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function OrderTracking() {
  return (
    <View style={styles.container}>
      <ScrollView>
        {/* Header */}
        <View style={styles.header}>
            <TouchableOpacity style={styles.iconButton}>
                <Ionicons name="arrow-back-circle-outline" size={24} color="#333" />
            </TouchableOpacity>

            <Text style={styles.headerText}>Order Tracking</Text>
        </View>

        {/* Map Placeholder */}
        <View style={styles.mapContainer}>
            <Image source={require('../assets/images/map-placeholder.png')} style={styles.mapImage} />
        </View>


        {/* Delivery ETA */}
        <View style={styles.etaContainer}>
          <View style={styles.etaBar}>
              <Text style={styles.etaText}>Estimated Arrival Time:</Text>
              <Text style={styles.etaTime}>10 mins</Text>
          </View>
          
          <View style={styles.statusContainer}>
              <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>Order Placed</Text>
                  <Text style={styles.statusSubText}>11:26pm</Text>
                </View>
            </View>

            <View style={styles.statusItem}>
                <Ionicons name="checkmark-circle" size={24} color="#4CAF50" />
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>On the Way</Text>
                  <Text style={styles.statusSubText}>11:32pm</Text>
                </View>
            </View>

            <View style={styles.statusItem}>
                <Ionicons name="ellipse" size={24} color="#FFC107" />
                <View style={styles.statusTextContainer}>
                  <Text style={styles.statusText}>Out for Delivery</Text>
                </View>
            </View>
          </View>

          {/* Driver Contact */}
          <View style={styles.contactContainer}>
            <Image source={require('../assets/images/driver-avatar.png')} style={styles.driverAvatar} />
            <View style={styles.driverInfo}>
                <Text style={styles.driverName}>John Doe</Text>
              </View>
              <TouchableOpacity style={styles.contactButton}>
                <Ionicons name="call-sharp" size={20} color="#fff" />
                <Text style={styles.contactText}>Contact Driver</Text>
              </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 16,
  },
  iconButton: {
    padding: 8,
  },
  mapContainer: {
    height: 325,
    margin: 5,
    borderRadius: 8,
    overflow: 'hidden',
  },
  mapImage: {
    width: '100%',
    height: '100%',
  },
  etaBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  etaText: {
    fontSize: 20,
    color: '#555',
  },
  etaTime: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#545454',
    marginVertical: 8,
  },
  etaContainer: {
    paddingHorizontal: 0,
    paddingVertical: 0,
  },
  statusContainer: {
    paddingHorizontal: 50,
    paddingVertical: 20,
  },
  statusTextContainer: {
    marginLeft: 8,
  },
  statusItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 6,
  },
  statusText: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333333',
  },
  statusSubText: {
    marginLeft: 8,
    fontSize: 12,
    color: '#808080',
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: '#f5f5f5',
  },
  driverAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  driverInfo: {
    flex: 1,
    marginLeft: 16,
  },
  driverName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4f4f4f',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
  },
  contactText: {
    color: '#fff',
    marginLeft: 8,
    fontSize: 14,
  },
});