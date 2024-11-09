import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import dataList from '../data/dataList'
import Activity from '../components/Activity';

export default function ActivityScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <Text>Atividades</Text>
      <StatusBar style="auto" />

      <View>
        <FlatList data={dataList}
          extraData={(item: any) => item.id}
          renderItem={(obj) => <Activity {...obj.item}/>}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});
