// app/index.tsx
import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  ScrollView, 
  StyleSheet,
  Pressable,
  Alert
} from 'react-native';

const SmartBudgetAllocator = () => {
  const [amount, setAmount] = useState('');
  const [activeTab, setActiveTab] = useState('investment');
  const [showResults, setShowResults] = useState(false);
  const [allocations, setAllocations] = useState({
    investment: 0,
    tithe: 0,
    emergency: 0,
    wants: 0
  });

  const tabs = [
    { id: 'investment', label: 'Investment', percentage: '50%' },
    { id: 'tithe', label: 'Tithe', percentage: '10%' },
    { id: 'emergency', label: 'Emergency', percentage: '15%' },
    { id: 'wants', label: 'Wants', percentage: '25%' },
  ];

  const handleAllocate = () => {
    const numericAmount = parseFloat(amount);
    
    if (isNaN(numericAmount) || numericAmount <= 0) {
      Alert.alert('Error', 'Please enter a valid amount greater than 0');
      return;
    }

    const newAllocations = {
      investment: numericAmount * 0.50,
      tithe: numericAmount * 0.10,
      emergency: numericAmount * 0.15,
      wants: numericAmount * 0.25
    };

    setAllocations(newAllocations);
    setShowResults(true);
  };

  const formatCurrency = (value: number) => {
    return `₵${value.toFixed(2)}`;
  };

  return (
    <ScrollView 
      contentContainerStyle={styles.container}
      keyboardShouldPersistTaps="handled"
    >
       <View style={styles.logoContainer}>
        <View style={styles.logo}>
          <Text style={styles.logoText}>₵</Text>
        </View>
      </View>
      
      <Text style={styles.title}>Smart Budget Allocator</Text>
      <Text style={styles.tagline}>Enter your amount and let us help you distribute it wisely</Text>
      
      <View style={styles.card}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Enter Amount (GHS)</Text>
          <View style={styles.inputContainer}>
            <Text style={styles.currencySymbol}>₵</Text>
            <TextInput
              style={styles.input}
              placeholder="0.00"
              keyboardType="numeric"
              value={amount}
              onChangeText={setAmount}
              placeholderTextColor="#999"
            />
          </View>
        </View>
        
        <TouchableOpacity style={styles.button} onPress={handleAllocate}>
          <Text style={styles.buttonText}>Allocate</Text>
        </TouchableOpacity>
        
        {showResults && (
          <View style={styles.tabsContainer}>
            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.tabsHeader}
            >
              {tabs.map(tab => (
                <Pressable
                  key={tab.id}
                  style={[styles.tabBtn, activeTab === tab.id && styles.activeTabBtn]}
                  onPress={() => setActiveTab(tab.id)}
                >
                  <Text style={[styles.tabBtnText, activeTab === tab.id && styles.activeTabBtnText]}>
                    {tab.label}
                  </Text>
                </Pressable>
              ))}
            </ScrollView>
            
            <View style={styles.tabContent}>
              <View style={styles.resultItem}>
                <Text style={styles.resultCategory}>Allocated Amount</Text>
                <Text style={styles.resultPercent}>
                  {tabs.find(tab => tab.id === activeTab)?.percentage}
                </Text>
              </View>
              <View style={styles.resultItem}>
                <Text style={styles.resultCategory}>Amount:</Text>
                <Text style={styles.resultAmount}>
                  {formatCurrency(allocations[activeTab as keyof typeof allocations])}
                </Text>
              </View>
            </View>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

// Your StyleSheet remains the same
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f7fa',
    padding: 20,
    alignItems: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6c5ce7',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 5,
  },
  logoText: {
    color: 'white',
    fontSize: 30,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#6c5ce7',
    marginTop: 10,
    textAlign: 'center',
  },
  tagline: {
    textAlign: 'center',
    color: '#666',
    marginBottom: 30,
    fontSize: 16,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.1,
    shadowRadius: 30,
    elevation: 5,
    padding: 30,
    marginBottom: 20,
  },
  inputGroup: {
    marginBottom: 30,
  },
  label: {
    marginBottom: 8,
    fontWeight: '600',
    color: '#343a40',
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
  },
  currencySymbol: {
    position: 'absolute',
    left: 15,
    zIndex: 1,
    fontWeight: 'bold',
    color: '#6c5ce7',
    fontSize: 18,
  },
  input: {
    flex: 1,
    padding: 15,
    paddingLeft: 40,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    fontSize: 18,
    backgroundColor: '#f8f9fa',
    color: '#343a40',
  },
  button: {
    backgroundColor: '#6c5ce7',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#6c5ce7',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
  tabsContainer: {
    marginTop: 30,
  },
  tabsHeader: {
    paddingVertical: 5,
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    paddingHorizontal: 5, // Added some horizontal padding
  },
  tabBtn: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 5,
    // Added transition-like properties for smooth state changes
    transitionProperty: 'all',
    transitionDuration: '200ms',
  },
  activeTabBtn: {
    backgroundColor: '#6c5ce7',
    shadowColor: '#6c5ce7',
    shadowOffset: { 
      width: 0, 
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 6,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
    // Optional: transform effect to "lift" the tab
    transform: [{ translateY: -1 }],
  },
  tabBtnText: {
    fontWeight: '600',
    color: '#343a40',
    textAlign: 'center',
  },
  activeTabBtnText: {
    color: 'white',
    // Optional: slightly bolden the active tab text
    fontWeight: '700',
  },
  tabContent: {
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  resultItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  resultCategory: {
    fontWeight: '600',
    color: '#343a40',
    fontSize: 16,
  },
  resultPercent: {
    color: '#6c5ce7',
    fontWeight: '700',
    fontSize: 14,
  },
  resultAmount: {
    fontWeight: '700',
    color: '#343a40',
    fontSize: 18,
  },
});

export default SmartBudgetAllocator;