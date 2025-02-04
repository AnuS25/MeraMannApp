import React, { useState, useEffect } from 'react';
import { View, Button, Text, TouchableOpacity, StyleSheet, Dimensions, Alert } from 'react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import Sound from 'react-native-sound'; // Using react-native-sound for audio

const words = ['Self-care', 'Resilience', 'Stress', 'Mindfulness', 'Anxiety', 'Support', 'Gratitude', 'Meditation', 'Hope', 'Balance', 'Joy', 'Calm']; // More words
const categories = {
    emotions: ['Stress', 'Anxiety', 'Joy', 'Gratitude'],
    coping: ['Mindfulness', 'Meditation', 'Resilience', 'Self-care'],
    affirmations: ['Hope', 'Balance', 'Support', 'Calm'],
};

const gridSize = 4; // Adjust grid size
const { width } = Dimensions.get('window'); // Get screen width

export default function TherapeuticWordSearch() {
    const [foundWords, setFoundWords] = useState([]);
    const [grid, setGrid] = useState([]);
    const [category, setCategory] = useState('emotions'); // Default category
    const [confetti, setConfetti] = useState(null);
    const [timer, setTimer] = useState(60); // Timer starts at 60 seconds
    const [hintCount, setHintCount] = useState(3); // Allow 3 hints
    const [isTimerActive, setIsTimerActive] = useState(false);

    // useEffect with category as dependency
    useEffect(() => {
        const generateGrid = () => {
            const selectedWords = categories[category] || words; // Select words based on category
            const shuffledWords = [...selectedWords].sort(() => 0.5 - Math.random()); // Shuffle words
            const newGrid = [];
            for (let i = 0; i < gridSize * gridSize; i++) {
                newGrid.push(shuffledWords[i % shuffledWords.length]); // Cycle through words if needed
            }
            setGrid(newGrid);
        };

        generateGrid(); // Call the function

    }, [category]); // Only include 'category' as a dependency

    useEffect(() => {
        if (isTimerActive && timer > 0) {
            const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
            return () => clearInterval(interval);
        }
        if (timer === 0) {
            Alert.alert('Time\'s Up!', 'You didn\'t complete the word search in time.');
        }
    }, [isTimerActive, timer]);

    const handleWordFound = (word) => {
        if (!foundWords.includes(word)) {
            setFoundWords([...foundWords, word]);
            if (foundWords.length === words.length - 1) {
                confetti.start();
            }
            playSound('correct');
        }
    };

    const handleReset = () => {
        setFoundWords([]);
        setTimer(60); // Reset timer
        setIsTimerActive(true); // Restart the timer
    };

    const useHint = () => {
        if (hintCount > 0) {
            setHintCount(hintCount - 1);
            const hintWord = words.find((word) => !foundWords.includes(word));
            Alert.alert('Hint', `The first letter of a word is: ${hintWord[0]}`);
        } else {
            Alert.alert('No Hints Left', 'You have used all your hints.');
        }
    };

    // Play sound using react-native-sound
    const playSound = (type) => {
        const soundPath = type === 'correct' ? 'correct.mp3' : 'error.mp3';
        const sound = new Sound(soundPath, Sound.MAIN_BUNDLE, (error) => {
            if (error) {
                console.log('Sound loading error: ', error);
            } else {
                sound.play();
            }
        });
    };

    const handleCategoryChange = (newCategory) => {
        setCategory(newCategory);
        setFoundWords([]);
        setTimer(60); // Reset timer
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Mental Wellness Word Search</Text>
            <Text style={styles.subtitle}>Find the words related to mental wellness!</Text>
            <Text style={styles.timer}>Time Left: {timer}s</Text>

            <View style={styles.categoryButtons}>
                <Button title="Emotions" onPress={() => handleCategoryChange('emotions')} />
                <Button title="Coping" onPress={() => handleCategoryChange('coping')} />
                <Button title="Affirmations" onPress={() => handleCategoryChange('affirmations')} />
            </View>

            <View style={styles.grid}>
                {grid.map((word, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[styles.gridItem, foundWords.includes(word) && styles.foundWord]}
                        onPress={() => handleWordFound(word)}
                    >
                        <Text style={styles.gridItemText}>{word}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            <Text style={styles.foundWords}>Found Words: {foundWords.join(', ')}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Use Hint" onPress={useHint} color="#FFD700" />
                <Button title="Reset" onPress={handleReset} color="#007AFF" />
            </View>

            <ConfettiCannon
                ref={setConfetti}
                style={styles.confetti}
                count={200}
                origin={{ x: -10, y: 0 }}
                fallSpeed={2}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F8FF',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 10,
        color: '#333',
    },
    subtitle: {
        fontSize: 18,
        marginBottom: 20,
        color: '#555',
    },
    timer: {
        fontSize: 18,
        color: '#D2691E',
        marginBottom: 20,
    },
    categoryButtons: {
        flexDirection: 'row',
        marginBottom: 20,
        justifyContent: 'space-evenly',
        width: width * 0.8,
    },
    grid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        width: width * 0.8,
    },
    gridItem: {
        width: (width * 0.8) / gridSize - 10,
        height: (width * 0.8) / gridSize - 10,
        margin: 5,
        backgroundColor: '#E0F2F7',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#ADD8E6',
    },
    gridItemText: {
        fontSize: 16,
        color: '#333',
        textAlign: 'center',
    },
    foundWords: {
        marginTop: 20,
        fontSize: 18,
        color: '#228B22',
    },
    foundWord: {
        backgroundColor: '#90EE90',
    },
    buttonContainer: {
        marginTop: 20,
    },
    confetti: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
    },
});
