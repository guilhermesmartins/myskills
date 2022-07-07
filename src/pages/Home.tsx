import React, {useState, useEffect} from 'react';
import {
  Text,
  StyleSheet,
  SafeAreaView,
  TextInput,
  FlatList,
} from 'react-native';
import {Button} from '../components/Button';
import {SkillCard} from '../components/SkillCard';

interface SkillData {
  id: string;
  name: string;
  date: Date;
}

export default function Home() {
  const [newSkill, setNewSkill] = useState('');
  const [mySkills, setMySkills] = useState<SkillData[]>([]);
  const [greetings, setGreetings] = useState('');

  function handleAddNewSkill() {
    const data = {
      id: String(new Date().getTime()),
      name: newSkill,
    }
    setMySkills(oldState => [...oldState, newSkill]);
  }

  useEffect(() => {
    const currentHour = new Date().getHours();

    if (currentHour < 12) {
      setGreetings('Bom dia');
      return;
    }

    setGreetings('Bom não dia');
  }, [mySkills]);

  return (
    <>
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>React Native</Text>
        <TextInput
          style={styles.input}
          placeholder="New skill"
          placeholderTextColor="#999"
          onChangeText={setNewSkill}
        />

        <Button onPress={handleAddNewSkill} />

        <Text style={[styles.title, {marginTop: 50}]}>{newSkill}</Text>

        <Text style={styles.greetings}>{greetings}</Text>

        <FlatList
          data={mySkills}
          keyExtractor={item => item.id}
          renderItem={({item}) => <SkillCard key={item} skill={item} />}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center',
    backgroundColor: '#121015',
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    backgroundColor: '#1F1e25',
    color: '#fff',
    fontSize: 18,
    marginTop: 30,
    padding: 25,
    borderRadius: 7,
  },
  greetings: {
    color: '#FFF',
  },
});
