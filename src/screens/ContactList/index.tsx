import {FlatList, Image, ImageBackground, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {ContactItem, Header, NumbersList} from '../../components';
import Contacts from 'react-native-contacts';

export default function ContactList(): JSX.Element {
  const [contacts, setContacts] = useState<any[]>([]);
  const [call, setCall] = useState<{
    condition: boolean;
    phone: any[];
    name: string;
  }>({
    condition: false,
    phone: [],
    name: '',
  });

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
  useEffect(() => {
    console.log('🚀 ~ file: index.tsx:51 ~ useEffect ~ call:', call);
  }, [call]);
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/contactListWallpaper.jpg')}
        style={styles.backImage}
        blurRadius={40}>
        <Header title="Contacts" />
        <View style={styles.mainView}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={contacts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <ContactItem
                name={item?.jobTitle}
                image={item?.thumbnailPath}
                phone={item?.phoneNumbers}
                onCallPress={() =>
                  setCall({
                    condition: true,
                    phone: item?.phoneNumbers,
                    name: item?.jobTitle == '' ? 'Unknown' : item?.jobTitle,
                  })
                }
              />
            )}
          />
        </View>
        <NumbersList
          visible={call.condition}
          name={call.name}
          numbers={call.phone}
          onClose={() => setCall({condition: false, phone: [], name: ''})}
        />
      </ImageBackground>
    </View>
  );
}
