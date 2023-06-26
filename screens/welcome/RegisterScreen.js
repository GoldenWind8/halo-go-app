import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import React, {useState} from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import Font from "../../constants/Font";
import AppTextInput from "../../components/AppTextInput";
import {register} from "../../handler/firebase-handler";


const RegisterScreen = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleRegister = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        register(email, password)
            .then((user) => {
                console.log('Registered user', user);
                navigate('Login'); // or wherever you want to navigate after successful registration
            })
            .catch((error) => {
                console.error('Registration failed', error);
                alert(`Registration failed: ${error.errorMessage}`);
            });
    };

    return (
        <View style={styles.container}>
            <View style={styles.innerContainer}>
                <View style={styles.centeredView}>
                    <Text style={styles.createAccountText}>Create account</Text>
                    <Text style={styles.createAccountDescription}>Create an account using an Email OR Number</Text>
                </View>
                <View style={styles.inputContainer}>
                    <AppTextInput placeholder="Email" onChangeText={text => setEmail(text)} value={email} />
                    <AppTextInput placeholder="Password" onChangeText={text => setPassword(text)} value={password} />
                    <AppTextInput placeholder="Confirm Password" onChangeText={text => setConfirmPassword(text)} value={confirmPassword} />
                    <AppTextInput placeholder="Number" />
                </View>
                <TouchableOpacity onPress={handleRegister}  style={styles.signupButton}>
                    <Text style={styles.signupButtonText}>Sign up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigate("Login")}
                    style={styles.loginButton}
                >
                    <Text style={styles.loginButtonText}>Already have an account</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    innerContainer: {
        padding: Spacing * 2,
    },
    centeredView: {
        alignItems: "center",
    },
    createAccountText: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
        marginVertical: Spacing * 3,
    },
    createAccountDescription: {
        fontSize: FontSize.small,
        maxWidth: "80%",
        textAlign: "center",
    },
    inputContainer: {
        marginVertical: Spacing * 3,
    },
    signupButton: {
        padding: Spacing * 2,
        backgroundColor: Colors.primary,
        marginVertical: Spacing * 3,
        borderRadius: Spacing,
        shadowColor: Colors.primary,
        shadowOffset: {
            width: 0,
            height: Spacing,
        },
        shadowOpacity: 0.3,
        shadowRadius: Spacing,
    },
    signupButtonText: {
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.large,
    },
    loginButton: {
        padding: Spacing,
    },
    loginButtonText: {
        color: Colors.text,
        textAlign: "center",
        fontSize: FontSize.small,
    },
});

export default RegisterScreen;
