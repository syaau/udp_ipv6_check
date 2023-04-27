/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import type {PropsWithChildren} from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import udp from 'react-native-udp';

function App(): JSX.Element {
  const [ip, setIp] = useState('');
  const [port, setPort] = useState('3000');
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    padding: 10,
  };

  function sendData() {
    const sock = udp.createSocket({
      type: 'udp4'
    });

    sock.bind(() => {
      sock.send('Hello World', 0, undefined, parseInt(port), ip, (err) => {
        if (err) {
          console.error(err);
        }
        sock.close();
      });
    });
  }

  return (
    <SafeAreaView style={backgroundStyle}>
      <View style={{padding: 10, backgroundColor: 'white'}}>
        <Text>IP</Text>
        <TextInput style={styles.input} value={ip} onChangeText={setIp} />
        <Text>Port</Text>
        <TextInput style={styles.input} value={port} onChangeText={setPort} />

        <Button onPress={sendData} title="Send UDP Data" />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  input: {
    padding: 4,
    borderWidth: 1,
    borderColor: 'black',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
