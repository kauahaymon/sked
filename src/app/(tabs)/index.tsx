import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import dataList from '../../data/dataList'
import Activity from '../../components/Activity';
import { Link } from 'expo-router';
import FormScreen from '../form';
import { useState } from 'react';
import AddButton from '../../components/Addbutton';

export default function ActivityScreen() {
  const [formShown, setFormShown] = useState(false)

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Text>Pendentes</Text>
      </View>
      <StatusBar style="auto" />

      <FormScreen isVisible={formShown} onCancel={() => setFormShown(!formShown)} />

      <View style={styles.list}>
        <FlatList data={dataList}
          extraData={(item: any) => item.id}
          renderItem={(obj) => <Activity {...obj.item} />}
        />
      </View>
      <AddButton show={() => setFormShown(!formShown)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  header: {
    width: '100%',
    height: 55,
    backgroundColor: 'gray'
  },
  list: {
    flex: 3
  }
});
