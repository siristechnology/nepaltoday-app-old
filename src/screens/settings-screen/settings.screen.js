import React, { useState } from 'react'
import { Linking, StyleSheet, TouchableOpacity, View } from 'react-native'
import { Divider, Switch, Text, useTheme } from 'react-native-paper'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MIcon from 'react-native-vector-icons/MaterialCommunityIcons'

const PlayStoreLink = 'https://play.google.com/store/apps/details?id=com.siristechnology.nepaltodayapp'

const SettingsScreen = (props) => {

    const [darkMode, setDarkMode] = useState(props.route.params.darkMode)

    const theme = useTheme()

    const toggleMode = (mode) => {
        setDarkMode(mode)
        props.route.params.onModeChange(mode)
    }

    const BackIcon = (
		<AntDesign
			name="back"
			size={24}
			color="grey"
			onPress={() => props.navigation.goBack()}
			style={styles.backIcon}
		/>
	)

    const headerComponent = (
        <View style={[styles.header,{backgroundColor:theme.colors.header}]}>
            {BackIcon}
            <Text style={styles.headerText}>
                Settings
            </Text>
        </View>
    )

    const onRateClick = () => {
        Linking.openURL(PlayStoreLink)
    }

    return (
        <View style={styles.container}>
            {headerComponent}
            <TouchableOpacity
                style={[styles.options,{justifyContent: 'space-between'}]}
                activeOpacity={0.6}
                onPress={()=>toggleMode(!darkMode)}
            >
                <View style={styles.darkModeView}>
                    <MIcon
                        name='weather-night'
                        size={20}
                        color={theme.colors.secondary}
                        style={styles.optionIcon}
                    />
                    <Text
                        style={styles.optionText}
                    >
                        Dark mode
                    </Text>
                </View>
                <Switch
                    value={darkMode}
                    onValueChange={(mode)=>toggleMode(mode)}
                    color='#1976D2'
                />
            </TouchableOpacity>
            <Divider style={styles.divider}/>
            <TouchableOpacity
                style={styles.options}
                activeOpacity={0.6}
                onPress={onRateClick}
            >
                <MIcon
                    name='star-outline'
                    size={20}
                    color={theme.colors.secondary}
                    style={styles.optionIcon}
                />
                <Text
                    style={styles.optionText}
                >
                    Rate our app
                </Text>
            </TouchableOpacity>
            <Divider style={styles.divider}/>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 2
    },
    headerText: {
        fontSize: 20,
        fontWeight: '700',
        marginLeft: 20,
        opacity: 0.7
    },
    backIcon: {
        padding: 8,
    },
    options: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 10,
        paddingHorizontal: 20
    },
    optionIcon: {
        opacity: 0.8
    },
    optionText: {
        fontSize: 17,
        opacity: 0.8,
        marginLeft: 25
    },
    divider: {
        marginHorizontal: 15,
        marginVertical: 2
    },
    darkModeView: {
        flexDirection: 'row',
        alignItems: 'center',
    }
})

export default SettingsScreen