/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';

import {
  Button,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import udp from 'react-native-udp';

function App(): JSX.Element {
  const [ip, setIp] = useState('13.126.248.48');
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
        <Text>Hermes: {!!global.HermesInternal ? 'enabled' : 'disabled'}</Text>
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
});

export default App;
