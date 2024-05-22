import {
  FlatList,
  Image,
  ImageBackground,
  View,
  ScrollView,
  RefreshControl,
  TouchalbeOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {styles} from './style';
import {ContactItem, Header, NumbersList} from '../../components';
import Contacts from 'react-native-contacts';
import {SearchBar} from 'react-native-elements';
import {Text, Waves, Button} from '../../components';
//@ts-ignore
export default function ContactList({navigation}): JSX.Element {
  const [contacts, setContacts] = useState<any[]>([]);
  const [refresh, setRefresh] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isPaused, setIsPaused] = useState<boolean>(false);
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
            setRefresh(false);
          } else {
            // Handle the case where the user denied permission
            console.warn('Permission denied');
          }
        });
      }
    });
  }, [refresh === true]);

  const loadContacts = () => {
    Contacts.getAll()
      .then(contacts => {
        console.log(
          '🚀 ~ file: index.tsx:34 ~ Contacts.getAll ~ contacts:',
          JSON.stringify(contacts),
        );
        setContacts(contacts);
      })
      .catch(err => {
        console.log('🚀 ~ file: index.tsx:49 ~ Contacts.getAll ~ err:', err);
      });
  };
  const loadContactsByName = (name: string) => {
    if (name.length !== 0) {
      Contacts.getContactsMatchingString(name)
        .then(contacts => {
          contacts;
          console.log(
            '🚀 ~ file: index.tsx:67 ~ Contacts.getContactsMatchingString ~ contacts:',
            JSON.stringify(contacts),
          );
          setContacts(contacts);
        })
        .catch(err => {
          console.log(
            '🚀 ~ file: index.tsx:72 ~ loadContactsByName ~ err:',
            err,
          );
        });
    } else {
      loadContacts();
    }
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/images/contactListWallpaper.jpg')}
        style={styles.backImage}
        blurRadius={40}>
        <Header title="Contacts" />
        <SearchBar
          placeholder="Search by name"
          containerStyle={styles.searchBarContainerStyle}
          inputContainerStyle={styles.searchBarInputContainerStyle}
          inputStyle={styles.searchBarInputStyle}
          leftIconContainerStyle={styles.searchBarLeftIconContainerStyle}
          value={searchQuery}
          //@ts-ignore
          onChangeText={(e: string) => {
            setSearchQuery(e);
            loadContactsByName(e);
          }}
          // round
        />
        <ScrollView
          style={styles.mainView}
          // contentContainerStyle={{flexDirection: 'row'}}
          refreshControl={
            <RefreshControl
              refreshing={refresh}
              onRefresh={() => {
                setRefresh(true);
                setTimeout(() => {
                  setRefresh(false);
                }, 1000);
              }}
            />
          }>
          {contacts.map((item, index) => {
            return (
              <ContactItem
                key={index}
                name={item?.displayName}
                image={item?.thumbnailPath}
                phone={item?.phoneNumbers}
                onCallPress={() =>
                  setCall({
                    condition: true,
                    phone: item?.phoneNumbers,
                    name:
                      item?.displayName == '' || item?.displayName == undefined
                        ? 'Unknown'
                        : item?.displayName,
                  })
                }
              />
            );
          })}
          {/* <Waves
            waveDuration={300}
            paused={isPaused}
            noOfWaves={14}
          />
          <Button
            text={isPaused ? 'Play' : 'Pause'}
            onPress={() => setIsPaused(!isPaused)}
          />*/}
        </ScrollView>
        <NumbersList
          visible={call.condition}
          name={call.name}
          numbers={call.phone}
          onClose={() => setCall({...call, condition: false})}
          onCall={e => {
            navigation.navigate('Outcoming', {name: call.name, phone: e});
          }}
        />
      </ImageBackground>
    </View>
  );
}
