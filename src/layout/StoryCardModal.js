import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
  TouchableWithoutFeedback,
  Share
} from 'react-native';
import {
  MaterialCommunityIcons
} from '@expo/vector-icons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modal: {
    width: Dimensions.get('window').width,
    backgroundColor: 'white',
    paddingVertical: 10,
  },
  options: {
    justifyContent: 'space-evenly',
    borderBottomColor: 'lightgrey',
    borderBottomWidth: 1,
  },
  optionButton: {
    paddingHorizontal: 15,
    paddingVertical: 6,
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionLabel: {
    fontSize: 18,
    marginLeft: 30,
  },
});

export const StoryCardModal = ({ route, navigation }) => {
  const { storyId } = route.params;
  const SIZE = 30;
  const COLOR = 'grey';

  const onShare = async () => {
    try {
      await Share.share({
        message: 'Check out this story from :Muse!',
        title: 'Project:Muse'
      }, {
        excludedActivityTypes: [
          'com.apple.UIKit.activity.PostToWeibo',
          'com.apple.UIKit.activity.Print',
          'com.apple.UIKit.activity.CopyToPasteboard',
          'com.apple.UIKit.activity.AssignToContact',
          'com.apple.UIKit.activity.SaveToCameraRoll',
          'com.apple.UIKit.activity.AddToReadingList',
          'com.apple.UIKit.activity.PostToFlickr',
          'com.apple.UIKit.activity.PostToVimeo',
          'com.apple.UIKit.activity.PostToTencentWeibo',
          'com.apple.UIKit.activity.AirDrop',
          'com.apple.UIKit.activity.OpenInIBooks',
          'com.apple.UIKit.activity.MarkupAsPDF',
          'com.apple.reminders.RemindersEditorExtension',
          'com.apple.mobilenotes.SharingExtension',
          'com.apple.mobileslideshow.StreamShareService',
          'com.linkedin.LinkedIn.ShareExtension',
          'pinterest.ShareExtension',
          'com.google.GooglePlus.ShareExtension',
          'com.tumblr.tumblr.Share-With-Tumblr',
          'net.whatsapp.WhatsApp.ShareExtension',
        ]
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <TouchableWithoutFeedback onPress={() => navigation.pop()}>
      <View style={styles.container}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.options}>
            <TouchableOpacity onPress={onShare}>
              <View style={styles.optionButton}>
                <MaterialCommunityIcons name='share' size={SIZE} color={COLOR} />
                <Text style={styles.optionLabel}>Share</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ReportModal', { storyId })}>
              <View style={styles.optionButton}>
                <MaterialCommunityIcons name='flag' size={SIZE} color={COLOR} />
                <Text style={styles.optionLabel}>Report</Text>
              </View>
            </TouchableOpacity>
          </View>
          <TouchableOpacity onPress={() => navigation.pop()}>
            <View style={styles.optionButton}>
              <MaterialCommunityIcons name='close' size={SIZE} color={COLOR} />
              <Text style={styles.optionLabel}>Cancel</Text>
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      </View>
    </TouchableWithoutFeedback>
  );
};