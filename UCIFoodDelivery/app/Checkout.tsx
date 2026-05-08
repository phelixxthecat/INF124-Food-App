import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Keyboard, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import DashedLine from 'react-native-dashed-line';

export default function Checkout() {
  const [text, onChangeText] = React.useState('')
  return (
        <View>
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}keyboardVerticalOffset={90}>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <ScrollView>
                <View style={style.header}>
                  <Text style={style.header}> Pick up At </Text>
                  <View style={style.container}>
                    <Feather name="map-pin" size={19} color="black" />
                    <Text> 123 Address </Text>
                  </View>
                </View>

                <Text style={style.importantText}>Cart</Text>
                <View style={style.line}></View>
                <Text style={style.importantText}>Restaurant Name</Text>

                <View style={style.container}>
                  <View style={style.itemIconPlaceholder}></View>
                  <View style={style.containerCol}>
                    <Text style={style.significantText}>Item Name</Text>
                    <Text style={{marginLeft: 20, fontWeight: 100}}>Description</Text>
                    <View style={style.container}>
                      <TouchableOpacity style={style.minusIcon}>
                        <Feather name="minus-circle" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{marginTop: 10, position: 'absolute', right: 60}}>1</Text>
                      <TouchableOpacity style={style.plusIcon}>
                        <Feather name="plus-circle" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={style.container}>
                  <View style={style.itemIconPlaceholder}></View>
                  <View style={style.containerCol}>
                    <Text style={style.significantText}>Item Name</Text>
                    <Text style={{marginLeft: 20, fontWeight: 100}}>Description</Text>
                    <View style={style.container}>
                      <TouchableOpacity style={style.minusIcon}>
                        <Feather name="minus-circle" size={24} color="black" />
                      </TouchableOpacity>
                      <Text style={{marginTop: 10, position: 'absolute', right: 60}}>1</Text>
                      <TouchableOpacity style={style.plusIcon}>
                        <Feather name="plus-circle" size={24} color="black" />
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <View style={[style.line, {marginTop: 30}]}></View>
                
                <Text style={style.importantText}>Summary</Text>

                <View style={style.container}>
                  <View style={style.couponShape}></View>
                  <Ionicons style={{marginLeft: -300, marginTop: 22 , transform: [{scaleX: -1}]}}name="pricetag-outline" size={24} color="black" />
                  <TextInput style={{marginTop:8, marginLeft:10}}placeholder="Apply Coupon" onChangeText={newText=>onChangeText(newText)} value={text}></TextInput>
                </View>
                
                <View style={style.container}>
                  <Text style={style.infoText}>Subtotal</Text>
                  <Text style={{marginTop:20, position: 'absolute', right: 30}}>$20.00</Text> 
                </View>
                <View style={style.container}>
                  <Text style={style.infoText}>Tax</Text>
                  <Text style={{marginTop:20, position: 'absolute', right: 30}}>$2.00</Text>
                </View>
                <View style={style.container}>
                  <Text style={style.infoText}>Delivery</Text>
                  <Text style={{marginTop:20, position: 'absolute', right: 30}}>$2.99</Text> 
                </View>

                <DashedLine style={{marginTop:20, marginHorizontal: 20}} dashLength={3} dashThickness={2} dashGap={1} dashColor='#9d9d9d' />

                <View style={style.container}>
                  <Text style={style.infoText}>Total</Text>
                  <Text style={{marginTop:20, position: 'absolute', right: 30}}>$24.99</Text> 
                </View>

                <TouchableOpacity style={style.continueButton}>
                  <Text style={style.continueText}>Continue</Text>
                </TouchableOpacity>
              </ScrollView>
            </TouchableWithoutFeedback>
          </KeyboardAvoidingView>
        </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row'
  },
  containerCol: {
    flex: 1,
    flexDirection: 'column'
  },
  header: {
    alignItems: 'center',
    marginTop: 10,
    fontWeight: 'bold'
  },
  importantText: {
    fontWeight: 'bold',
    fontSize: 28,
    marginLeft: 20,
    marginBottom: 5
  },
  line: {
    backgroundColor: '#dddddd',
    height: 3,
    marginBottom: 15
  },
  itemIconPlaceholder: {
    backgroundColor: '#9d9d9d',
    height: 80,
    width: 80,
    marginTop: 20,
    marginLeft: 30,
    borderRadius: 20
  },
  significantText: {
    fontWeight: 700,
    fontSize: 15,
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 5
  },
  minusIcon: {
    marginTop: 10,
    position: 'absolute',
    right: 85
  },
  plusIcon: {
    marginTop: 10,
    position: 'absolute',
    right: 19
  },
  couponShape: {
    backgroundColor: 'transparent',
    borderColor: '#9d9d9d',
    borderWidth: 2,
    height: 50,
    width: 320,
    marginTop: 10,
    marginLeft: 20,
    borderRadius: 20
  },
  infoText: {
    fontWeight: 'bold',
    marginTop: 20,
    marginLeft: 30,
  },
  continueButton: {
    backgroundColor: '#9d9d9d',
    borderRadius: 40,
    height: 50,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 50
  },
  continueText: {
    fontWeight: 'bold',
    fontSize: 30,
    letterSpacing: 2.5,
    textAlign: 'center'
  }
})