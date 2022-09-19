import React, { useEffect } from 'react'
import { View, Text } from 'react-native'

export default function MainPage({ route, navigation }) {

	// route and navigation is default props from react-navigation

	// push -> navigation.push("route_name")
	// push with props -> navigation.push("route_name",{ params })
	// recieve props from navigation -> route.params
	// pop -> navigation.pop()
	// replace -> navigation.replace("route_name")
	// reset -> navigation.reset({ index: 0, routes: [{ name: "route_name" }]})

	useEffect(() => {
		// console.log("route : ", route)
		// console.log("navigation : ", navigation)
	}, [])

	return (
		<View>
			<Text>MainPage</Text>
		</View>
	)
}
