import { useState } from "react";
import { View, StyleSheet } from "react-native";
import { SelectList } from "react-native-dropdown-select-list";

export default function RoomSelection() {
  const [selectedRoom, setSelectedRoom] = useState(null);

  const data = [
    { key: 1, value: '101' },
    { key: 2, value: '102' },
    { key: 3, value: '103' },
    { key: 4, value: '104' },
    { key: 5, value: '105' },
    { key: 6, value: '106' },
  ];

  return (
    <View style={styles.container}>
      <SelectList
        setSelected={setSelectedRoom}
        data={data}
        placeholder="Sala"
        boxStyles={styles.selectBox}
        dropdownStyles={styles.dropdown}
        dropdownItemStyles={styles.dropdownItem}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  selectBox: {
    borderWidth: 1,
    borderColor: 'gray',
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
  dropdown: {
    backgroundColor: 'white',
    borderColor: 'gray',
    elevation: 5,
  },
  dropdownItem: {
    padding: 10,
  },
});
