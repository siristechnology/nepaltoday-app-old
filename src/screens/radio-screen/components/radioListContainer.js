import React from 'react'
import { ScrollView } from 'react-native'
import RadioCard from './radioCard'

const RadioListContainer = (props) => {
	return (
		<ScrollView style={{ marginBottom: 110, paddingTop: 10 }}>
			{props.fmList.map((fm, i) => (
				<RadioCard key={i} channel={fm} onFMSelect={props.onFMSelect} initSuccess={props.initSuccess} />
			))}
		</ScrollView>
	)
}

export default RadioListContainer
