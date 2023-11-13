import {ImageBackground, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {Header} from '../../components';
import Contacts from 'react-native-contacts';

export default function ContactList(): JSX.Element {
  const [contacts, setContacts] = useState<any[]>([]);

  useEffect(() => {
    // Request permission and load contacts
    Contacts.checkPermission().then((permission: any) => {
      if (permission === 'authorized') {
        // Permission already granted, load contacts
        loadContacts();
      } else {
        // Request permission
        Contacts.requestPermission().then((newPermission: any) => {
          if (newPermission === 'authorized') {
            // Permission granted, load contacts
            loadContacts();
          } else {
            // Handle the case where the user denied permission
            console.warn('Permission denied');
          }
        });
      }
    });
  }, []);

  const loadContacts = () => {
    Contacts.getAll().then(contacts => {
      console.log(
        '🚀 ~ file: index.tsx:34 ~ Contacts.getAll ~ contacts:',
        JSON.stringify(contacts),
      );
      setContacts(contacts);
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/contactListWallpaper.jpg')}
        style={styles.backImage}
        blurRadius={40}>
        <Header title="Contacts" />
        <View style={styles.mainView}>
          <Text style={styles.text}>Open App.tsx to start creating app</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
