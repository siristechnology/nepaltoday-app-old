import React from 'react'
import { ScrollView } from 'react-native'
import RadioCard from './radioCard'
import { useScrollToTop } from '@react-navigation/native'

const RadioListContainer = (props) => {
	
	const ref = React.useRef(null)
	useScrollToTop(ref)

	return (
		<ScrollView ref={ref} style={{ marginBottom: 110, paddingTop: 10 }}>
			{props.fmList.map((fm, i) => (
				<RadioCard 
					key={i} 
					channel={fm} 
					onFMSelect={props.onFMSelect} 
					initSuccess={props.initSuccess}
					currentChannelId={props.currentChannelId} 
				/>
			))}
		</ScrollView>
	)
}

export default RadioListContainer