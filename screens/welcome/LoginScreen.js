import {
    SafeAreaView,
    StyleSheet,
    Text,
    Image,
    TouchableOpacity,
    View, StatusBar, Alert, KeyboardAvoidingView,
} from "react-native";
import React, {useState} from "react";
import Spacing from "../../constants/Spacing";
import FontSize from "../../constants/FontSize";
import Colors from "../../constants/Colors";
import AppTextInput from "../../components/AppTextInput";
import logo from "../../assets/logo.png";
import {COLOURS} from "../../components/database/Database";
import {login} from "../../handler/firebase-handler";


const LoginScreen = ({ navigation: { navigate } }) => {
    const [email, setEmail] = useState('admin@gmail.com');
    const [password, setPassword] = useState('adminuser');

    const handleLogin = async () => {
        try {
            await login(email, password);
            navigate("Home");
        } catch (error) {
            Alert.alert('Error', error.errorMessage);
        }
    };


    return (
        <SafeAreaView style={styles.safeArea}>
            <StatusBar backgroundColor={COLOURS.black} barStyle="light-content"/>
            <View style={styles.outerView}>
                <View style={styles.logoContainer}>
                    <Image style={styles.image} source={logo} />
                    <Text style={styles.loginText}>Login</Text>
                </View>
                <View style={styles.inputContainer}>
                    <AppTextInput placeholder="Email" onChangeText={text => setEmail(text)} value={email}/>
                    <AppTextInput placeholder="Password" onChangeText={text => setPassword(text)} secureTextEntry value={password} />
                </View>
                <View style={styles.forgotPasswordContainer}>
                    <Text style={styles.forgotPasswordText}>Forgot your password ?</Text>
                </View>
                <TouchableOpacity style={styles.signInButton} onPress={handleLogin}>
                    <Text style={styles.signInText}>Sign in</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.registerButton} onPress={() => navigate("Register")}>
                    <Text style={styles.registerText}>Create new account</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
};

export default LoginScreen;

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
    },
    outerView: {
        padding: Spacing * 2,
    },
    logoContainer: {
        alignItems: "center",
    },
    image: {
        width: 200,
        height: 200,
    },
    loginText: {
        fontSize: FontSize.xLarge,
        color: Colors.primary,
    },
    inputContainer: {
        marginVertical: Spacing * 3,
    },
    forgotPasswordContainer: {
        alignSelf: 'flex-end',
    },
    forgotPasswordText: {
        fontSize: FontSize.small,
        color: Colors.primary,
    },
    signInButton: {
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
    signInText: {
        color: Colors.onPrimary,
        textAlign: "center",
        fontSize: FontSize.large,
    },
    registerButton: {
        padding: Spacing,
    },
    registerText: {
        color: Colors.text,
        textAlign: "center",
        fontSize: FontSize.small,
    },
});
