import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StatusBar, Platform, Image, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import * as Google from 'expo-auth-session/providers/google';
import * as Facebook from 'expo-auth-session/providers/facebook';

console.disableYellowBox = true;
WebBrowser.maybeCompleteAuthSession();

export default function App() {

	const [googleAuthRequest, googleAuthResponse, googleAuthPromptAsync] = Google.useAuthRequest({
		expoClientId: "173074543319-fkd5q0m8mcjuu76k0q7ail2on2li9c11.apps.googleusercontent.com",
		androidClientId: "173074543319-ge4r0mefcn8kd9fq7k8v9gi402jpvju1.apps.googleusercontent.com",
	});
	const [googleUserInfo, setGoogleUserInfo] = useState(null)

	const [facebookAuthRequest, facebookAuthResponse, facebookAuthPromptAsync] = Facebook.useAuthRequest({
		clientId: "606107717719562",
		redirectUri: AuthSession.makeRedirectUri({ useProxy: true })
	}, { useProxy: true });
	const [facebookUserInfo, setFacebookUserInfo] = useState(null)

	useEffect(() => {
		// console.log("google auth response : ", googleAuthResponse)
		if (googleAuthResponse?.type === "success") {
			const { authentication } = googleAuthResponse
			onFetchGoogleData(authentication.accessToken)
		} else {
			// DO SOMETHING
		}
	}, [googleAuthResponse])

	useEffect(() => {
		// console.log("facebook auth response : ", facebookAuthResponse)
		if (facebookAuthResponse?.type === "success") {
			const { authentication } = facebookAuthResponse;
			onFetchFacebookData(authentication.accessToken)
		} else {
			// DO SOMETHING
		}
	}, [facebookAuthResponse])

	const onFetchGoogleData = async (token) => {
		const userResponse = await fetch("https://www.googleapis.com/userinfo/v2/me", {
			headers: { Authorization: `Bearer ${token}` }
		})
		userResponse.json().then((res) => {
			// console.log("userResponse (google) res : ", res)
			setGoogleUserInfo(res)
		})
	}

	const onFetchFacebookData = async (token) => {
		const userResponse = await fetch(`https://graph.facebook.com/me?fields=id,name,email,birthday,picture.type(large)&access_token=` + token)
		userResponse.json().then((res) => {
			// console.log("userResponse (facebook) res : ", res)
			setFacebookUserInfo(res)
		})
	}

	const clearInfo = () => {
		setGoogleUserInfo(null)
		setFacebookUserInfo(null)
	}

	return (
		<View style={{ flex: 1 }}>
			{
				Platform.OS === "android" ?
					<StatusBar backgroundColor={"black"} />
					:
					<View style={{ width: "100%", height: Constants.statusBarHeight, backgroundColor: "black" }} />
			}
			<View style={styles.container}>
				<View style={{ padding: 20, flexDirection: "row", justifyContent: "space-around", alignItems: "center" }}>
					<TouchableOpacity style={[styles.authButton, { backgroundColor: "white" }]} onPress={() => googleAuthPromptAsync()}>
						<Text style={{ color: "black" }}>Google Sign in</Text>
					</TouchableOpacity>
					<TouchableOpacity style={[styles.authButton, { backgroundColor: "#4267B2" }]} onPress={() => facebookAuthPromptAsync()}>
						<Text style={{ color: "white" }}>Facebook Sign in</Text>
					</TouchableOpacity>
				</View>
				<View style={{ padding: 20, justifyContent: "center", alignItems: "center" }}>
					{
						googleUserInfo &&
						<>
							<Image source={{ uri: googleUserInfo.picture }} style={{ width: 100, height: 100, borderRadius: 5 }} resizeMode={"cover"} />
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>name : {googleUserInfo.name}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>given_name : {googleUserInfo.given_name}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>family_name : {googleUserInfo.family_name}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>email : {googleUserInfo.email}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>id : {"xxxxxxxxxxxxxxxx"}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>locale : {googleUserInfo.locale}</Text>
						</>
					}
					{
						facebookUserInfo &&
						<>
							<Image source={{ uri: facebookUserInfo.picture.data.url }} style={{ width: 100, height: 100, borderRadius: 5 }} resizeMode={"cover"} />
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>name : {facebookUserInfo.name}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>email : {facebookUserInfo.email}</Text>
							<Text style={{ color: "black", fontSize: 16, marginTop: 8 }}>id : {"xxxxxxxxxxxxxxxx"}</Text>
						</>
					}
				</View>
				{
					(googleUserInfo || facebookUserInfo) &&
					<TouchableOpacity style={styles.clearButton} onPress={clearInfo}>
						<Text>Clear</Text>
					</TouchableOpacity>
				}
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingTop: "20%"
	},
	authButton: {
		backgroundColor: "white",
		width: "45%",
		height: 50,
		justifyContent: "center",
		alignItems: "center",
		borderRadius: 6,
		shadowColor: "#000",
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 3.84,
		elevation: 5,
	},
	clearButton: {
		margin: 20,
		padding: 20,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: "black",
		borderRadius: 5
	}
})