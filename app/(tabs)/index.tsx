import { StatusBar } from 'expo-status-bar';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Activity from '../../components/Activity';
import FormScreen from '../form';
import { useContext, useState } from 'react';
import AddButton from '../../components/Addbutton';
import { ActivityContext } from '../context/ActivityProvider';

export default function ActivityScreen() {

  const { activity }: any = useContext(ActivityContext)
  const [formShown, setFormShown] = useState(false)
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.days}>
        <TouchableOpacity style={[styles.peddingStyle, { backgroundColor: '#8226b6' }]}>
          <Text style={{ color: 'white' }}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.peddingStyle}>
          <Text style={styles.daysText}>Tomorrow</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.peddingStyle}>
          <Text style={styles.daysText}>Other</Text>
        </TouchableOpacity>
      </View>
      <StatusBar style="auto" />

      <View style={styles.list}>
        <FlatList data={activity}
          extraData={(item: any) => item.id}
          renderItem={(obj) => <Activity {...obj.item} />}
        />
      </View>
      <FormScreen isVisible={formShown} onCancel={() => setFormShown(!formShown)} />

      <AddButton show={() => setFormShown(!formShown)} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fcfcfc'
  },
  header: {
    width: '100%',
    height: 55,
    backgroundColor: 'gray'
  },
  days: {
    marginTop: 10,
    flexDirection: 'row',
    marginHorizontal: 13,
  },
  peddingStyle: {
    marginRight: 16,
    paddingHorizontal: 10,
    paddingVertical: 3,
    backgroundColor: '#d9d9d9',
    borderRadius: 20,
  },
  daysText: {
    color: '#2b2b2b'
  },
  list: {
    flex: 1,
    marginHorizontal: 13,
    marginVertical: 13
  }
});
