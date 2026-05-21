import { StyleSheet } from 'react-native';

export const UCIColors = {
  navy: '#003D7C',
  blue: '#0064A4',
  gold: '#FFD200',
  darkGold: '#F2A900',
  cream: '#FFF8E7',
  white: '#FFFFFF',
  black: '#111111',
  gray: '#E5E5E5',
  textGray: '#666666',
};

export const appStyles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: UCIColors.cream,
    paddingTop: 38,
    alignItems: 'center',
  },

  pageLabel: {
    width: 330,
    color: UCIColors.blue,
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  card: {
    width: 330,
    height: 725,
    backgroundColor: UCIColors.white,
    borderRadius: 28,
    alignItems: 'center',
    position: 'relative',
    shadowColor: '#000',
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 6 },
    elevation: 6,
    borderWidth: 1,
    borderColor: '#eee',
  },

  backButton: {
    position: 'absolute',
    top: 22,
    left: 20,
    zIndex: 10,
    backgroundColor: UCIColors.gray,
    width: 38,
    height: 38,
    borderRadius: 19,
    justifyContent: 'center',
    alignItems: 'center',
  },

  logo: {
    marginTop: 80,
    fontSize: 38,
    fontWeight: '800',
    color: UCIColors.navy,
  },

  title: {
    fontSize: 26,
    fontWeight: '800',
    color: UCIColors.navy,
    marginBottom: 24,
  },

  subtitle: {
    fontSize: 14,
    fontWeight: '700',
    color: UCIColors.textGray,
  },

  input: {
    width: '100%',
    height: 42,
    borderWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#FAFAFA',
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 18,
    color: UCIColors.black,
  },

  label: {
    fontSize: 12,
    fontWeight: '700',
    color: UCIColors.navy,
    marginBottom: 6,
  },

  primaryButton: {
    width: 210,
    height: 50,
    backgroundColor: UCIColors.navy,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryButtonText: {
    color: UCIColors.white,
    fontSize: 14,
    fontWeight: '800',
  },

  secondaryButton: {
    width: 210,
    height: 50,
    backgroundColor: UCIColors.gold,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  secondaryButtonText: {
    color: UCIColors.navy,
    fontSize: 14,
    fontWeight: '800',
  },

  outlineButton: {
    width: 210,
    height: 50,
    backgroundColor: UCIColors.white,
    borderWidth: 2,
    borderColor: UCIColors.navy,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  outlineButtonText: {
    color: UCIColors.navy,
    fontSize: 14,
    fontWeight: '800',
  },

  grayBox: {
    backgroundColor: UCIColors.gray,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: '#ccc',
  },
});