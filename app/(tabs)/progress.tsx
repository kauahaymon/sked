import { useState } from "react";
import { Button, Modal, View, Text, TouchableWithoutFeedback } from "react-native";

export default function Progress() {
  const [isModal1Visible, setIsModal1Visible] = useState(false)
  const [isModal2Visible, setIsModal2Visible] = useState(false)

  return (
    <View style={{ flex: 1, backgroundColor: 'plum', paddingTop: 30, padding: 60 }}>
      <Button title="open modal" onPress={() => setIsModal1Visible(true)} />

      <Modal visible={isModal1Visible} onRequestClose={() => setIsModal1Visible(false)} animationType="fade">
        <TouchableWithoutFeedback onPress={() => setIsModal1Visible(false)}>
          <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'flex-end' }} >
            <View style={{ height: 200, width: '100%', backgroundColor: 'white' }}>
              <Text>Modal 1</Text>
              <Button title="close" onPress={() => setIsModal1Visible(false)} />
              <Button title="open new modal" onPress={() => setIsModal2Visible(true)} />
            </View>
            <Modal visible={isModal2Visible} onRequestClose={() => setIsModal2Visible(false)} animationType="fade">
              <TouchableWithoutFeedback onPress={() => setIsModal2Visible(false)}>
                <View style={{ flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.6)', justifyContent: 'center' }}>
                  <View style={{ width: '100%', height: 200, backgroundColor: 'lightgreen' }}>
                    <Button title="close" onPress={() => setIsModal2Visible(false)}>
                    </Button>
                  </View>
                </View>
              </TouchableWithoutFeedback>

            </Modal>
          </View>
        </TouchableWithoutFeedback>
      </Modal >
    </View >
  )
}