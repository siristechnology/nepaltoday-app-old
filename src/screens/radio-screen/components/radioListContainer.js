import React from 'react'
import { FlatList, ScrollView } from 'react-navigation'
import RadioCard from './radioCard'

const RadioListContainer = (props) => {
    return(
        <ScrollView style={{marginBottom:110,paddingTop:10}}>
            {props.fmList.map((fm,i)=>(
                <RadioCard
                    key={i}
                    channel={fm}
                    onFMSelect={props.onFMSelect}
                />
            ))}
        </ScrollView>
    )
}

export default RadioListContainer